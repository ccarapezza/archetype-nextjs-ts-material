import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { Avatar, Box, Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Divider from '@mui/material/Divider';

export default function UserAvatarMenu() {
    const { data: session, status } = useSession();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    return (<>
        {session?.user &&
            <>
                <IconButton color="inherit" sx={{ p: 0.5 }} onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{setAnchorEl(event?.currentTarget);}}>
                    <Avatar alt={session.user.name?.charAt(0)!} src={session.user.image!} >
                        {session.user.name?.charAt(0)}
                    </Avatar>
                </IconButton>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={()=>setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box className='flex justify-center items-center flex-col' margin={2}>
                        <Avatar className="shadow-md" alt={session.user.name?.charAt(0)!} src={session.user.image!} sx={{ width: 64, height: 64 }}>
                            {session.user.name?.charAt(0)}
                        </Avatar>
                        <Typography fontWeight={700} className="mt-3 flex-nowrap">{session.user.name}</Typography>
                        <Typography component="span" sx={{fontSize: 12}} fontWeight={500}>
                            <FontAwesomeIcon className='mr-1' icon={faEnvelope}/>{session.user.email}
                        </Typography>
                        <Button
                            className='mt-4 self-center w-fit'
                            variant='outlined'
                            color='secondary'
                            startIcon={<FontAwesomeIcon icon={faSignOut} />}
                            onClick={(e) => {
                                e.preventDefault();
                                signOut();
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Popover>
            </>
        }
    </>
    )
}
