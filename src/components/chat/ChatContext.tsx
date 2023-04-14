import SocketEvent from '@/src/enums/SocketEvent';
import UserChatState from '@/src/enums/UserChatState';
import { User, Chat, Message } from '@/src/socket/socketModels';
import { useSession } from 'next-auth/react';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { Socket } from "socket.io-client";
import io from "socket.io-client";

let socket: Socket;

interface ChatContextType {
  connected: boolean;
  chats: Chat[];
  openedChats: Chat[],
  usersList: User[],
  openChat: (user: User) => void;
  closeChat: (user: User) => void;
  sendMessage: (receiverId: string, message: string) => void;
}

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextType>({
  connected: false,
  chats: [],
  openedChats: [],
  usersList: [],
  openChat: () => { },
  closeChat: () => { },
  sendMessage: () => { },
});

const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { data: session } = useSession();
  const [usersList, setUsersList] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [openedChats, setOpenedChats] = useState<Chat[]>([]);
  const [openedChatIds, setOpenedChatIds] = useState<string[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    socketInitializer();
    return () => {
      socket?.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/protected/socket");

    socket = io();

    socket.on("connect", () => {
      console.log("connected");
      socket.emit(SocketEvent.CONNECT_USER, UserChatState.Online);
      setConnected(true);
    });

    socket.on(SocketEvent.USER_LIST, (users: User[]) => {
      // we get the data here
      console.log(users);
      setUsersList(users?.filter(user => user.email !== session?.user?.email));
    });
  }

  useEffect(() => {
    if(socket){
      socket.off(SocketEvent.P2P_CHAT_MSG_CREATED);
      socket.on(SocketEvent.P2P_CHAT_MSG_CREATED, messageReceivedSimple);
    }
  }, [chats, openedChatIds, socket]);

  useEffect(() => {
    const filteredChats = chats.filter((chat) => openedChatIds.includes(chat.user.email));
    setOpenedChats(filteredChats);

  }, [chats, openedChatIds]);

  const messageReceivedSimple = (message: Message) => {
    openChat(message.sender);
    addMessage(message);
  }

  const isChatExist = (receiverEmail: string) => {
    return chats.some((chat) => chat.user.email === receiverEmail);
  };

  const addChat = (user: User, messages: Message[] = []) => {
    const newChat: Chat = {
      user: user,
      messages: messages,
    };
    setChats([...chats, newChat]);
  };

  const openChat = (receiverUser: User) => {
    if (!openedChatIds.includes(receiverUser.email)) {
      setOpenedChatIds([...openedChatIds, receiverUser.email]);
      if (!isChatExist(receiverUser.email)) {
        addChat(receiverUser);
      }
    }
  };

  const closeChat = (receiverUser: User) => {
    setOpenedChatIds(openedChatIds.filter((email) => email !== receiverUser.email));
  };

  const addMessage = (message: Message, receiverEmail: string|null = null) => {
    if(!receiverEmail){
      receiverEmail = message.sender.email;
    }
    setChats(oldChats => {
      return oldChats.map((chat) => {
        if (chat.user.email === receiverEmail) {
          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        }
        return chat;
      });
    });
  };

  const sendMessage = (receiverEmail: string, message: string) => {
    socket.emit(SocketEvent.P2P_CHAT_MSG, receiverEmail, message, (message:Message) => {
      addMessage(message, receiverEmail);
    });
  };

  return (
    <ChatContext.Provider value={{connected, chats, openChat, closeChat, sendMessage, openedChats, usersList }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;