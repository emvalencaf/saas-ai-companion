'use client';

// hooks
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

// ui components
import { Button } from "@/components/ui/button";

// custom components
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";

// libs
import { cn } from "@/lib/utils";

// animations
import { BeatLoader } from "react-spinners";
import { Copy } from "lucide-react";

// interfaces
export interface IChatMessageProps {
    role: "system" | "user";
    content?: string;
    isLoading?: boolean;
    src?: string;
};

const ChatMessage: React.FC<IChatMessageProps> = ({
    role,
    content,
    isLoading,
    src,
}) => {

    const { toast, } = useToast();
    const { theme, } = useTheme();

    const onCopy = () => {
        if (!content) return;

        navigator.clipboard.writeText(content);

        toast({
            description: "Message copied to lcipboard!",
        });
    }

    return (
        <div className={cn("group flex items-start gap-x-3 py-4 w-full", role === "user" && "justify-end")}>
            {role !== "user" && src && <BotAvatar src={src} />}
            <div className="rounded-md px-5 py-2 max-w-sm text-sm bg-primary/10">
                {isLoading ? <BeatLoader size={5} color={theme === "light" ? "black" : "white"} /> : content}
            </div>
            {role === "user" && <UserAvatar />}
            {role !== "user" && !isLoading && (
                <Button
                    onClick={onCopy}
                    className="opacity-0 group-hover:opacity-100 transition"
                    variant="ghost"
                    size="icon"
                >
                    <Copy className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};

export default ChatMessage;
