"use client";

// custom components
import MenuLink from "../MenuLink";

// constants
import { navRoutes } from "@/constants";

// interfaces
export interface IMenuProps {
    isPro: boolean;
}

const Menu: React.FC<IMenuProps> = ({
    isPro,
}) => {
    return (
        <>
            {navRoutes.map((route, i) => (
                <MenuLink key={`${route.href}-${i}`} {...route} isPro={isPro} />
            ))}
        </>
    );
};

export default Menu;
