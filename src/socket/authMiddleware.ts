import cookie from "cookie";
import { getToken } from "next-auth/jwt";
import { Socket } from "socket.io";
import { NextApiRequest } from "next";
import { ExtendedError } from "socket.io/dist/namespace";
import { User } from "./socketModels";
import UserChatState from "../enums/UserChatState";

const authMiddleware = async (socket: Socket, next: (err?: ExtendedError) => void) => {
    var cookies = cookie.parse(socket.handshake.headers.cookie!); 
    try {
        const userData = await getToken({ req:{
          cookies: cookies,
          headers: socket.handshake.headers
        } as NextApiRequest });

        const user : User = {
            id: socket.id,
            name: userData?.name!,
            email: userData?.email!,
            avatar: userData?.picture,
            status: UserChatState.Online
        }
        socket.data.user = user;

    } catch (err) {
        return next(new Error("NOT AUTHORIZED"));
    }
    next();
}

export default authMiddleware;