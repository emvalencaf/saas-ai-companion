'use client';

// custom chat components
import ChatHeader from "../ChatHeader";

// interfaces
import { Companion, Message } from "@prisma/client";

export interface IChatClientProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number,
        };
    };
}


const ChatClient: React.FC<IChatClientProps> = ({ companion, }) => {
    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion} />
        </div>
    );
};

export default ChatClient;
