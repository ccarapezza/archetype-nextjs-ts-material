import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { ChatContext } from './ChatContext';
import { Chat, Message } from '@/src/socket/socketModels';
import ChatAvatar from './ChatAvatar';

interface Props {
    chat: Chat;
}

interface MessageProps {
    message: Message;
}
// component
const P2PChatBox: React.FC<Props> = ({ chat }) => {
    const listRef = useRef<HTMLElement>(null);
    const formInputRef = useRef<HTMLFormElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const [sendDisabled, setSendDisabled] = useState<boolean>(true);
    //const [message, setMessage] = useState<string>('');
    const chatContext = useContext(ChatContext);

    const IncommingMessage: React.FC<MessageProps> = ({message}) => {
        return (
            <Box className="flex flex-col items-start mb-4">
                <Box className="bg-gray-200 rounded-lg p-2 max-w-xs break-word">
                    <Typography>
                        {message.text}
                    </Typography>
                    <Typography variant="caption" className=" text-gray-400 float-right">
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                </Box>
            </Box>
        )
    }

    const OutgoingMessage: React.FC<MessageProps> = ({message}) => {
        return (
            <Box className="flex flex-col items-end mb-4">
                <Box className="bg-blue-600 rounded-lg p-2 max-w-xs break-word text-white">
                    <Typography>
                        {message.text}
                    </Typography>
                    <Typography variant="caption" className="text-blue-400 float-right">
                        {new Date(message.timestamp).getHours() + ":" + new Date(message.timestamp).getMinutes()}
                    </Typography>
                </Box>
            </Box>
        )
    }

    const handleClose = () => {
        chatContext.closeChat(chat.user)
    };

    const sendMessage = () => {
        const message = messageInputRef.current?.value;
        if (message) {
            chatContext.sendMessage(chat.user.email, message);
            setSendDisabled(true);
            formInputRef.current?.reset();
        }
    };

    useEffect(() => {
        listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
    }, [chat.messages]);

    return (
        <Paper className="flex flex-col bg-white h-96" elevation={4}>
            {/* Header */}
            <Box className="h-14 bg-blue-500 text-white flex items-center justify-between px-4 rounded-t">
                <Box className="flex items-center">
                    <ChatAvatar src={chat.user.avatar!} alt={chat.user.name} state={chat.user.status}>{chat.user.name?.charAt(0).toUpperCase()}</ChatAvatar>
                    <Typography variant="subtitle1" className="ml-4">
                        {chat.user.name}
                    </Typography>
                </Box>
                <Box>
                    <IconButton aria-label="Close" onClick={() => { handleClose() }}>
                        <Close />
                    </IconButton>
                </Box>
            </Box>

            {/* Chat container */}
            <Box ref={listRef} className="flex-1 overflow-y-auto p-4 py-0">
                <List className='pb-0'>
                    {chat.messages.map((message, index) => {
                        if (message.sender.email !== chat.user.email) {
                            return <OutgoingMessage key={"outgoing-"+index} message={message}/>
                        } else {
                            return <IncommingMessage key={"incoming-"+index} message={message} />
                        }
                    })}
                </List>
            </Box>

            {/* Input container */}
            <Box ref={formInputRef} onSubmit={(e)=>{sendMessage(); e.preventDefault(); }} component="form" autoComplete="off" className="h-16 bg-gray-100 flex items-center px-4 rounded-b">
                <TextField
                    size='small'
                    className="flex-1 mr-4 bg-white border border-gray-400 rounded mr-2 my-2"
                    type="text" placeholder="Type a message..."
                    inputRef={messageInputRef}
                    onChange={(e) => {
                        setSendDisabled(e.target.value?false:true);
                    }}
                />
                <IconButton aria-label="Expand" onClick={()=>{sendMessage()}} disabled={sendDisabled} >
                    <Send />
                </IconButton>
            </Box>
        </Paper>
    );
}

export default P2PChatBox;