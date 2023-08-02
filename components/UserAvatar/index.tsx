'use client';

// ui components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const UserAvatar: React.FC = ({ }) => {

    const { user, } = useUser();

    return (
        <Avatar className="h-12 w-12">
            <AvatarImage src={user?.imageUrl} />
        </Avatar>
    );
};

export default UserAvatar;
