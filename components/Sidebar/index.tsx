"use client";

import { navRoutes } from "../../constants";
import {Menu} from "./components";

// interfaces
export interface ISidebarProps {}

const Sidebar: React.FC<ISidebarProps> = ({}) => {
    return <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
        <div className="p-3 flex-1 flex justify-center">
            <div className="space-y-2">
                <Menu />
            </div>
        </div>
    </div>;
};

export default Sidebar;
