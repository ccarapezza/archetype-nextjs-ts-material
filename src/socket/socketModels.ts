import UserChatState from "../enums/UserChatState";

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    status: UserChatState;
}

type Message = {
    text: string;
    sender: User;
    timestamp: number;
}

type Chat = {
    user: User;
    messages: Message[];
}

export type {
    User,
    Message,
    Chat
};