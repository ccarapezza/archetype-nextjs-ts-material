import React from "react";
import UserChatState from '@/src/enums/UserChatState';
import { Avatar, Badge, styled } from '@mui/material';

interface Props {
    state: UserChatState;
    src?: string;
    alt?: string;
    children?: React.ReactNode;
}

const ChatAvatar: React.FC<Props> = (props: Props) => {
  const { state, src, alt, children } = props;
  const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: state === UserChatState.Online ? '#44b700' : state === UserChatState.Away ? '#f50057' : state === UserChatState.Busy ? '#fbc02d' : '#44b700',
          color: state === UserChatState.Online ? '#44b700' : state === UserChatState.Away ? '#f50057' : state === UserChatState.Busy ? '#fbc02d' : '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
          },
        }
    }));

    let indicatorColor = null;
    if (state === UserChatState.Online) {
        indicatorColor = 'bg-green-500';
    } else if (state === UserChatState.Away) {
        indicatorColor = 'bg-red-500';
    } else if (state === UserChatState.Busy) {
        indicatorColor = 'bg-yellow-500';
    }

    return (<StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
      >
        <Avatar src={src} alt={alt}>{children}</Avatar>
      </StyledBadge>
    );
}

export default ChatAvatar;