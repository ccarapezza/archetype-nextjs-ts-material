import React from "react";
import UserChatState from '@/src/enums/UserChatState';
import { Avatar, Badge, styled } from '@mui/material';
import StatusMenu from "./MainChat/StatusMenu";
import StatusDataList from "./MainChat/StatusDataList";

interface Props {
    state: UserChatState;
    src?: string;
    alt?: string;
    children?: React.ReactNode;
}

const ChatAvatar: React.FC<Props> = (props: Props) => {
  const { state, src, alt, children } = props;
  const statesMap = {
    [UserChatState.Online]: StatusDataList.find((state) => state.state === UserChatState.Online),
    [UserChatState.Away]: StatusDataList.find((state) => state.state === UserChatState.Away),
    [UserChatState.Busy]: StatusDataList.find((state) => state.state === UserChatState.Busy),
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: state === UserChatState.Online ? '#44b700' : state === UserChatState.Away ? '#fbc02d' : state === UserChatState.Busy ? '#f50057' : '#44b700',
          color: state === UserChatState.Online ? '#44b700' : state === UserChatState.Away ? '#fbc02d' : state === UserChatState.Busy ? '#f50057' : '#44b700',
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

    return (<StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
        className="max-h-9"
      >
        <Avatar src={src} alt={alt}>{children}</Avatar>
      </StyledBadge>
    );
}

export default ChatAvatar;