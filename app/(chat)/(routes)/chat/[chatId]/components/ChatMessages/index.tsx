'use client';

// hooks
import { ElementRef, useEffect, useRef, useState } from "react";

// custom chat message components
import ChatMessage, { IChatMessageProps } from "./components/ChatMessage";

// interfaces
import { Companion } from "@prisma/client";

export interface IChatMessagesProps {
    companion: Companion;
    messages: IChatMessageProps[];
    isLoading: boolean;
};

const ChatMessages: React.FC<IChatMessagesProps> = ({ companion, isLoading, messages, }) => {

    const scrollRef = useRef<ElementRef<"div">>(null);

    // fake message
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {

        const timeout = setTimeout(() => setFakeLoading(false), 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {

        scrollRef?.current?.scrollIntoView({ behavior: "smooth", });

    }, []);

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage isLoading={fakeLoading} src={companion.src} role="system" content={`Hello, I'm ${companion.name}, ${companion.description}`} />
            {
                messages.map((message) => (
                    <ChatMessage
                        key={`${message.content}-${Date.now()}`}
                        role={message.role}
                        content={message.content}
                        src={message.src}
                    />
                ))
            }
            {
                isLoading && (
                    <ChatMessage
                        role="system"
                        src={companion.src}
                        isLoading
                    />
                )
            }
            <div ref={scrollRef} />
        </div>
    );
};

export default ChatMessages;
