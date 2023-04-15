import UserChatState from "@/src/enums/UserChatState";

export default [
    {
        classColor: "text-green-500",
        state: UserChatState.Online,
        stateName: "Disponible"
    },
    {
        classColor: "text-yellow-400",
        state: UserChatState.Away,
        stateName: "Ausente"
    },
    {
        classColor: "text-red-500",
        state: UserChatState.Busy,
        stateName: "Ocupado",
    },
]