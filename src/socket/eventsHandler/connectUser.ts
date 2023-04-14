
import SocketEvent from "@/src/enums/SocketEvent";
import UserChatState from "@/src/enums/UserChatState";
import RedisManager from "@/src/redis/RedisManager";
import { Socket, Server as SocketIOServer } from "socket.io";

const redisClient = RedisManager.getInstance();

export default async (io: SocketIOServer, socket: Socket) => {
  // Manejamos la conexión del usuario
  socket.on(SocketEvent.CONNECT_USER, (status: UserChatState = UserChatState.Online) => {
    const user = socket.data.user;
    user.status = status;
    // Agregamos el usuario al objeto de usuarios conectados
    redisClient.hset(`user:${user.email.toLowerCase()}`, user).then(async () => {
      // Actualizar usuarios conectados
      const users = [];
      const hashes = await redisClient.keys('user:*');
      for (const hash of hashes) {
        const usuario = await redisClient.hgetall(hash);
        users.push(usuario);
      }
      // Enviamos la lista de usuarios conectados y su estado a todos los clientes
      io.emit(SocketEvent.USER_LIST, users);
    });
    
  });
};