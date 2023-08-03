"use client";

// hooks
import { usePathname, useRouter } from "next/navigation";

// custom hooks
import { useProModal } from "@/hooks";

// libs
import { cn } from "@/lib/utils";

// interfaces
import { LucideIcon } from "lucide-react";

export interface IMenuLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isPro: boolean;
    pro: boolean;
}

const MenuLink: React.FC<IMenuLinkProps> = ({ href, icon: Icon, label, isPro, pro, }) => {

    // get the pathname
    const pathname = usePathname();

    // router navigate controller
    const router = useRouter();

    // pro modal controller
    const proModal = useProModal();

    // navigate event
    const onNavigate = (url: string, isPro: boolean) => {
        
        // if is a protected route for premium user open up pro modal
        if (pro && !isPro) return proModal.onOpen();

        return router.push(url);
    }

    return (
        <div
            className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === href && "bg-primary/10 text-primary"
            )}
            onClick={() => onNavigate(href, isPro)}
        >
            <div className="flex flex-col gap-y-2 items-center flex-1">
                <Icon className="h-5 w-5" />
                {label}
            </div>
        </div>
    );
};

export default MenuLink;
