import React, { useState, useEffect, useRef, useContext } from "react";
import { useSession } from 'next-auth/react';
import { List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ChatAvatar from "./ChatAvatar";
import CardWindow from "../CardWindow";
import { ChatContext } from "./ChatContext";
import { User } from "@/src/socket/socketModels";
// component
const MainChatBox: React.FC = () => {
    const chatContext = useContext(ChatContext);
    
    const openChat = ( user: User ) => {
        chatContext.openChat(user);
    }

    return (<CardWindow title="Chat">
        <List className="w-full select-none ">
            {chatContext.usersList?.map((user, index) => (
                <ListItem key={index} className="py-0 cursor-pointer hover:bg-slate-100 rounded" onDoubleClick={()=>{openChat(user)}}>
                    <ListItemAvatar className="flex-shrink-0">
                        <ChatAvatar alt={user.name} src={user.avatar!} state={user.status}>{user.name[0].toUpperCase()}</ChatAvatar>
                    </ListItemAvatar>
                    <ListItemText
                        className="pl-2 my-0"
                        primary={user.name}
                        secondary={
                            <React.Fragment>
                                <Typography component="span" variant="caption" color="text-gray">
                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            ))}
        </List>
    </CardWindow>);
};

export default MainChatBox;
