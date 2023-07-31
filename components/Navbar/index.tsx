"use client";

// next components
import Link from "next/link";

// clerk components
import { UserButton } from "@clerk/nextjs";

// ui components
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

// custom navbar components 
import { MobileSidebar } from "./components";

// icons
import { Sparkles } from "lucide-react";

// libs
import { cn } from "@/lib/utils";

// fonts
import { Poppins } from "next/font/google";

const font = Poppins({
    weight: "600",
    subsets: ["latin"],
});

// interfaces
export interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = ({}) => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
            <div className="flex items-center">
                <MobileSidebar />
                <Link href="/">
                    <h1
                        className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary",
                            font.className
                        )}
                    >
                        Companion.ai
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <Button variant="premium" size="sm">
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white ml-2" />
                </Button>
                <ModeToggle />
                <UserButton />
            </div>
        </div>
    );
};

export default Navbar;
