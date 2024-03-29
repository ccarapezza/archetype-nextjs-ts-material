import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, } from '@mui/material';

export default function UserAvatar(props: React.ComponentProps<any>) {
    const { data: session, status } = useSession();
    return (
        session?.user?.image ?
            <Avatar alt={session.user.image} src={session.user.image} {...props} >{session.user.name?.slice(0,1)}</Avatar>
            :
            <Avatar {...props} >{session?.user?.name?.slice(0,1)}</Avatar>
    );
}