'use client';

// hooks
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuth, } from "@clerk/nextjs";

// axios
import axios from "axios";

// ui components
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// custom components
import BotAvatar from "@/components/BotAvatar";

// icons
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from "lucide-react";

// interfaces
import { Companion, Message } from "@prisma/client";

export interface IChatHeaderProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number,
        };
    };
};

const ChatHeader: React.FC<IChatHeaderProps> = ({ companion, }) => {

    // controller navigation
    const router = useRouter();

    // user id of signed in user
    const { userId,} = useAuth();

    // toast controller
    const { toast } = useToast();


    const onDelete = async () => {
        try {
            
            await axios.delete(`/api/companions/${companion.id}`);

            toast({
                description: "Success!",
            });

            router.refresh();
            router.push("/");
        } catch (error: any) {
            console.log("[CHAT-AI-COMPANION_ERROR]: ", error); // DEV LOG
            toast({
                description: "Something went wrong!",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <BotAvatar src={companion.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-xs text-muted-foregound">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {companion._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {companion.userName}
                    </p>
                </div>
            </div>
            {userId === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};

export default ChatHeader;
