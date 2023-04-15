import React, { useState, useEffect, useRef, useContext } from "react";
import { useSession } from 'next-auth/react';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from "@mui/material";
import ChatAvatar from "../ChatAvatar";
import CardWindow from "../../CardWindow";
import { ChatContext } from "../ChatContext";
import { User } from "@/src/socket/socketModels";
import UserAvatar from "../../UserAvatar";
import { Circle, Cloud, ContentCopy, ContentCut, ContentPaste, Logout, MoreVert } from "@mui/icons-material";
import StatusMenu from "./StatusMenu";
import StatusDataList from "./StatusDataList";
// component
const MainChatBox: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const chatContext = useContext(ChatContext);
    const { data: session, status } = useSession();

    const openChat = (user: User) => {
        chatContext.openChat(user);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<CardWindow title="Chat" className="h-96">
        <Box className="bg-gray-200 px-2 py-3 drop-shadow-lg flex justify-between items-center select-none rounded-r-full mr-1">
            <Box className="flex justify-between items-center select-none">
                <ChatAvatar
                    alt={chatContext?.user?.name!}
                    src={chatContext?.user?.avatar!}
                    state={chatContext?.user?.status!}>{chatContext?.user?.name[0].toUpperCase()}
                </ChatAvatar>
                <Box className="flex flex-col px-4 py-0 my-0">
                    <Typography variant="body1" color="text-gray">
                        {chatContext?.user?.name}
                    </Typography>
                    <Typography component="span" variant="caption" color="text-gray">
                        {StatusDataList.find((status) => status.state === chatContext?.user?.status)?.stateName}
                    </Typography>
                </Box>
            </Box>
            <StatusMenu/>
        </Box>
        <List className="w-full select-none">
            {chatContext.usersList?.map((user, index) => (
                <ListItem key={"user-" + user.name} className="py-0 cursor-pointer hover:bg-slate-100 rounded" onDoubleClick={() => { openChat(user) }}>
                    <ListItemAvatar className="flex-shrink-0">
                        <ChatAvatar alt={user.name} src={user.avatar!} state={user.status}>{user.name?.charAt(0).toUpperCase()}</ChatAvatar>
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
