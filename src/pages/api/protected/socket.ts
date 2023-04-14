import { NextApiRequest } from "next";
import { Server as ServerIO, Socket as SocketIO } from "socket.io";
import { Server as NetServer, Socket } from "net";
import { Server as NetServerHttp } from "http";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import connectUser from "@/src/socket/eventsHandler/connectUser";
import createChat from "@/src/socket/eventsHandler/createChat";
import disconnectUser from "@/src/socket/eventsHandler/disconnectUser";
import updateStatus from "@/src/socket/eventsHandler/updateStatus";
import SocketEvent from "@/src/enums/SocketEvent";
import authMiddleware from "@/src/socket/authMiddleware";
import p2pMessage from "@/src/socket/eventsHandler/p2pMessage";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  // adapt Next's net Server to http Server
  const httpServer: NetServerHttp = res.socket.server as any;
  const io = new ServerIO(httpServer);
  res.socket.server.io = io;

  io.use(async (socket, next) => {
    authMiddleware(socket, next);
  });

  io.on(SocketEvent.CONNECTION, async (socket) => {
    console.log("Nuevo usuario conectado ", socket.data.user.name);
    connectUser(io, socket);
    createChat(io, socket);
    p2pMessage(io, socket);
    disconnectUser(io, socket);
    updateStatus(io, socket);
  });

  console.log("Setting up socket");
  res.end();
}