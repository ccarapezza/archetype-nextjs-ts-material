import { Circle, Logout, MoreVert } from '@mui/icons-material'
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material'
import React, { useContext } from 'react'
import { useSession } from 'next-auth/react';
import { ChatContext } from '../ChatContext';
import UserChatState from '@/src/enums/UserChatState';
import StatusDataList from './StatusDataList';


function StatusMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const chatContext = useContext(ChatContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVert />
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >

            <MenuList>
                {StatusDataList.map((state, index) => {
                    return (
                        <MenuItem key={state.stateName+"-"+index} onClick={() => { chatContext.updateStatus(state.state); handleClose(); }}>
                            <ListItemIcon>
                                <Circle className={state.classColor} />
                            </ListItemIcon>
                            <ListItemText>{state.stateName}</ListItemText>
                        </MenuItem>
                    )
                })}
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Desconectar</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    </>)
}

export default StatusMenu