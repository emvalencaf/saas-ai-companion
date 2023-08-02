'use client';

// hooks
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";

// custom chat components
import ChatHeader from "../ChatHeader";
import ChatMessages from "../ChatMessages";
import ChatForm from "../ChatForm";

// interfaces
import { Companion, Message } from "@prisma/client";
import { IChatMessageProps } from "../ChatMessages/components/ChatMessage";

export interface IChatClientProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number,
        };
    };
}


const ChatClient: React.FC<IChatClientProps> = ({ companion, }) => {

    const router = useRouter();

    const [messages, setMessages] = useState<IChatMessageProps[]>(companion.messages);

    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(_prompt, completion) {
            const systemMessage: IChatMessageProps = {
                role: "system",
                content: completion,
            };

            setMessages((current) => [...current, systemMessage,]);
            setInput("");

            router.refresh();
        }
    });

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        const userMessage: IChatMessageProps = {
            role: "user",
            content: input,
        };

        setMessages((current) => [...current, userMessage,]);

        handleSubmit(e);
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion} />
            <ChatMessages
                companion={companion}
                isLoading={isLoading}
                messages={messages}
            />
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default ChatClient;
