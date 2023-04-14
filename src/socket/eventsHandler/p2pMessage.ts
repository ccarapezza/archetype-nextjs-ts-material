
import SocketEvent from "@/src/enums/SocketEvent";
import RedisManager from "@/src/redis/RedisManager";
import { Socket, Server as SocketIOServer } from "socket.io";
import { Message, User } from "../socketModels";

const redisClient = RedisManager.getInstance();

export default (io: SocketIOServer, socket: Socket) => {
    // Manejamos el envío de mensajes
    socket.on(SocketEvent.P2P_CHAT_MSG, async (receiverEmail: string, message: string, callback: (message:Message) => {}) => {
        const user = await redisClient.hgetall(`user:${receiverEmail.toLowerCase()}`);
        // Enviamos el mensaje al destinatario
        const messageObj : Message = {
            text: message,
            sender: socket.data.user,
            timestamp: Date.now()
        }
        io.to(user.id).emit(SocketEvent.P2P_CHAT_MSG_CREATED, messageObj);
        callback(messageObj);
    });
};