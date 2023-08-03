"use client";

import { Menu } from "./components";

// interfaces
export interface ISidebarProps {
    isPro: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({
    isPro,
}) => {
    return <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
        <div className="p-3 flex-1 flex justify-center">
            <div className="space-y-2">
                <Menu isPro={isPro} />
            </div>
        </div>
    </div>;
};

export default Sidebar;
