// This is an example of to protect an API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/src/pages/api/auth/[...nextauth]"
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer, Socket } from "net";
import { Server as NetServerHttp } from "http";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import messageHandler from "@/src/socket/messageHandler";

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
  const session = await getServerSession(req, res, authOptions)

  if (session) {

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

    const onConnection = (socket: any) => {
      messageHandler(io, socket);
    };

    // Define actions inside
    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  })
}