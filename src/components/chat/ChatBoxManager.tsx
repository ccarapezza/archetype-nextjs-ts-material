import React, { useContext } from 'react'
import P2PChatBox from './P2PChatBox'
import { ChatContext } from './ChatContext';

function ChatBoxManager() {
    const chatContext = useContext(ChatContext);
    return (<>
        {
            chatContext.openedChats.map((chat) => {
                return <P2PChatBox key={"chat-" + chat.user.email} chat={chat} />
            })
        }
    </>)
}

export default ChatBoxManager