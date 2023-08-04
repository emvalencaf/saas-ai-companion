"use client";

// hooks
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
// ui components
import { Button } from "@/components/ui/button";

// constants
import { DEMOAccount } from "./constants";

// utils


const DemoSignInButton: React.FC = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast, } = useToast();

    const { signIn, isLoaded, setActive } = useSignIn();

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            if (!isLoaded) return;

            const result = await signIn.create({
                identifier: DEMOAccount.email,
                password: DEMOAccount.password,
            });

            if (result.status !== "complete") return console.log(result);

            await setActive({ session: result.createdSessionId });

            router.push("/");
        } catch (error: any) {
            console.log("[DEMO_BUTTON_ERROR]: ", error);
            toast({
                description: "Something went wrong!",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            disabled={isLoading}
            variant="default"
            onClick={handleSignIn}
        >
            {isLoading ? "Signing in" : "Sign in with a DEMO Account"}
        </Button>
    );
};

export default DemoSignInButton;
