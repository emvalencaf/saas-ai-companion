"use client";

// custom components
import MenuLink from "../MenuLink";

// constants
import { navRoutes } from "@/constants";

// interfaces
export interface IMenuProps {}

const Menu: React.FC<IMenuProps> = ({}) => {
    return (
        <>
            {navRoutes.map((route, i) => (
                <MenuLink key={`${route.href}-${i}`} {...route} />
            ))}
        </>
    );
};

export default Menu;
