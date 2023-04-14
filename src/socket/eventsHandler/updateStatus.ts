
import SocketEvent from "@/src/enums/SocketEvent";
import RedisManager from "@/src/redis/RedisManager";
import { Session } from "next-auth";
import { Socket, Server as SocketIOServer } from "socket.io";

const redisClient = RedisManager.getInstance();

export default (io: SocketIOServer, socket: Socket) => {
    // Manejamos la actualización del estado del usuario
    socket.on(SocketEvent.UPDATE_STATUS, (status: string) => {
      console.log(`Usuario ${socket.id} actualizó su estado a ${status}`);
      // Actualizamos el estado del usuario en el objeto de usuarios conectados
      redisClient.hset(`user:${socket.id}`, 'status', status);
      // Enviamos la lista de usuarios conectados y su estado a todos los clientes
      redisClient.hgetall('user:*', (err, users) => {
        io.emit(SocketEvent.USER_LIST, users);
      });
    });
};