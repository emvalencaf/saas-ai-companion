'use client';

// hooks
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// ui components
import { Button } from "@/components/ui/button";

// icons
import { Sparkles } from "lucide-react";
import axios from "axios";

// interfaces
export interface ISubscriptionButtonProps {
    isPro: boolean;
};

const SubscriptionButton: React.FC<ISubscriptionButtonProps> = ({
    isPro = false,
}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast, } = useToast();

    const onClick = async () => {
        setIsLoading(true);
        try {

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;

        } catch (error: any) {
            console.log("[SUBSCRIPTION_BUTTON_ERROR]:", error);// dev log
            toast({
                variant: "destructive",
                description: "Something went wrong!",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button onClick={onClick} size="sm" variant={isPro ? "default" : "premium"} disabled={isLoading}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
        </Button>
    );
};

export default SubscriptionButton;
