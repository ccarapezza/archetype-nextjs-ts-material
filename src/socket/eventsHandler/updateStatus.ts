
import SocketEvent from "@/src/enums/SocketEvent";
import RedisManager from "@/src/redis/RedisManager";
import { Session } from "next-auth";
import { Socket, Server as SocketIOServer } from "socket.io";

const redisClient = RedisManager.getInstance();

export default (io: SocketIOServer, socket: Socket) => {
    // Manejamos la actualización del estado del usuario
    socket.on(SocketEvent.UPDATE_STATUS, (status: string) => {
      console.log(`Usuario ${socket.data.user.email} actualizó su estado a ${status}`);
      // Actualizamos el estado del usuario en el objeto de usuarios conectados
      redisClient.hset(`user:${socket.data.user.email}`, 'status', status).then(async () => {
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