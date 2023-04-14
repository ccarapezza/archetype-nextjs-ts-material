
import SocketEvent from "@/src/enums/SocketEvent";
import RedisManager from "@/src/redis/RedisManager";
import { Session } from "next-auth";
import { Socket, Server as SocketIOServer } from "socket.io";

const redisClient = RedisManager.getInstance();

export default (io: SocketIOServer, socket: Socket) => {
    // Manejamos la creación de un chat entre dos usuarios
    socket.on(SocketEvent.CREATE_CHATROOM, (participants: string[]) => {

      const chatId = `chat:${socket.id}:${Date.now()}`;
      const chatName = `Chat ${socket.id} - ${Date.now()}`;
      redisClient.hget('users', socket.id, async (err, user) => {
        redisClient.hmset(chatId, { name: chatName, participants: JSON.stringify(participants) });
        console.log(`Usuario ${user} creó un chat con ${participants.reduce((acc, participantId) => acc+(acc===""?"":", ")+participantId, '')}`);
        // Enviamos el chat al usuario que inició el chat
        socket.emit(SocketEvent.CHATROOM_CREATED, chatId);
        for (let i = 0; i < participants.length; i++) {
          // Enviar chat a los participantes
          participants.forEach((participantId) => {
            io.to(participantId).emit(SocketEvent.CHATROOM_CREATED, chatId);
          });
        }
      });
    });
};