
import { Socket, Server as SocketIOServer } from "socket.io";

export default (io: SocketIOServer, socket: Socket) => {
    const createdMessage = (msg: String) => {
        console.log("newIncomingMessage")
      socket.broadcast.emit("newIncomingMessage", msg);
    };
  
    socket.on("createdMessage", createdMessage);
};