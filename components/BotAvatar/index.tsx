'use client';

// ui components
import { Avatar, AvatarImage } from "@/components/ui/avatar";

// interfaces
export interface IBotAvatarProps {
    src: string;
};

const BotAvatar: React.FC<IBotAvatarProps> = ({ src, }) => {
    return (
        <Avatar className="h-12 w-12">
            <AvatarImage src={src} />
        </Avatar>
    );
};

export default BotAvatar;
