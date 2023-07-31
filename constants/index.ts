// interfaces
import { Home, LucideIcon, Plus, Settings } from "lucide-react";

interface INavRoutesProps {
    icon: LucideIcon;
    href: string;
    label: string;
    isPro: boolean;
}

// constants objects
export const navRoutes: INavRoutesProps[] = [
    {
        icon: Home,
        href: "/",
        label: "Home",
        isPro: false,
    },
    {
        icon: Plus,
        href: "/companion/new",
        label: "Create",
        isPro: true,
    },
    {
        icon: Settings,
        href: "/settings",
        label: "Settings",
        isPro: false,
    },
];
