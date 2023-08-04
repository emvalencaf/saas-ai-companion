"use client";

// ui components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// custom components
import Sidebar from "@/components/Sidebar";

// icons
import { Menu } from "lucide-react";

// interfaces
export interface IMobileSidebarProps {
    isPro: boolean;
}

const MobileSidebar: React.FC<IMobileSidebarProps> = ({
    isPro,
}) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <Sidebar isPro={isPro} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
