import React, { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useSession } from 'next-auth/react';

let socket: Socket;

type Message = {
    user: string;
    message: string;
};

// component
const GlobalChatBox: React.FC = () => {
    const { data: session, status } = useSession();
    const inputRef = useRef(null);

    const [connected, setConnected] = useState<Boolean>(false);

    // init chat and message
    const [chat, setChat] = useState<Message[]>([]);
    const [msg, setMsg] = useState<string>("");
    const [user, setUser] = useState<string>("");

    useEffect(() => {
        socketInitializer();
        return () => {
            socket?.disconnect();
        };
    }, []);

    useEffect(() => {
        if(status === "authenticated" && session?.user?.name){
            setUser(session?.user?.name!);
        }
    }, [session, session?.user?.name]);

    async function socketInitializer() {
        await fetch("/api/protected/socket");

        socket = io();

        socket.on("connect", () => {
            console.log("connected");
            setConnected(true);
        });

        socket.on("newIncomingMessage", (msg: Message) => {
            // we get the data here
            console.log(msg);
            setChat((currentMsg: Message[]) => [
                ...currentMsg,
                { user: msg.user, message: msg.message },
            ]);
        });
    }

    const sendMessage = async () => {
        socket.emit("createdMessage", { user: session?.user?.name, message: msg });
        setChat((currentMsg: Message[]) => [
            ...currentMsg,
            { user: user, message: msg },
        ]);
        setMsg("");
    };

    return (
        <div className="flex flex-col w-full h-auto">
            <div className="flex flex-col flex-1 bg-gray-200">
                <div className="flex-1 p-4 font-mono">
                    {chat.length ? (
                        chat.map((chat, i) => (
                            <div key={"msg_" + i} className="mt-1">
                                <span className={chat.user === user ? `text-red-500` : `text-black`}>
                                    {chat.user === user ? "Me" : chat.user}
                                </span>
                                : {chat.message}
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-center text-gray-400 py-6">
                            No chat messages
                        </div>
                    )}
                </div>
                <div className="bg-gray-400 p-4 h-20 sticky bottom-0">
                    <div className="flex flex-row flex-1 h-full divide-gray-200 divide-x">
                        <div className="pr-2 flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={msg}
                                placeholder={connected ? "Type a message..." : "Connecting..."}
                                className="w-full h-full rounded shadow border-gray-400 border px-2"
                                disabled={!connected}
                                onChange={(e) => {
                                    setMsg(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-stretch pl-2">
                            <button
                                className="bg-blue-500 rounded shadow text-sm text-white h-full px-2"
                                onClick={sendMessage}
                                disabled={!connected}
                            >
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalChatBox;
