enum SocketEvent {
    CONNECTION = "connection",
    CONNECT_USER = "connectUser",
    DISCONNECT = "disconnect",
    UPDATE_STATUS = "updateStatus",
    USER_LIST = "userList",
    P2P_CHAT_MSG_CREATED = "chatP2pCreated",
    P2P_CHAT_MSG = "chatP2pMsg",
    CREATE_CHATROOM = "createChatroom",
    CHATROOM_CREATED = "chatroomCreated",
}

export default SocketEvent;