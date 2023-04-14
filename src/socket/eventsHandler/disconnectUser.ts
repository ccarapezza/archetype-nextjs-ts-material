
import SocketEvent from "@/src/enums/SocketEvent";
import RedisManager from "@/src/redis/RedisManager";
import { Session } from "next-auth";
import { Socket, Server as SocketIOServer } from "socket.io";

const redisClient = RedisManager.getInstance();

export default (io: SocketIOServer, socket: Socket) => {
  // Manejamos la desconexión del usuario
  socket.on(SocketEvent.DISCONNECT, () => {
    const user = socket.data.user;
    console.log(`Usuario desconectado user:${user.email.toLowerCase()}`);
    // Eliminamos el usuario del objeto de usuarios conectados
    redisClient.del(`user:${user.email.toLowerCase()}`).then(async (deleted) => {
      if(deleted){
        // Actualizar usuarios conectados
        const users = [];
        const hashes = await redisClient.keys('user:*');
        for (const hash of hashes) {
          const usuario = await redisClient.hgetall(hash);
          users.push(usuario);
        }
        // Enviamos la lista de usuarios conectados y su estado a todos los clientes
        io.emit(SocketEvent.USER_LIST, users);
      }
    });

  });
};