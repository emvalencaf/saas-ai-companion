'use client';

import React, { useState } from "react";

// hooks
import { useToast } from "@/components/ui/use-toast";

// custom hooks
import { useProModal, } from "@/hooks";

// axios
import axios from "axios";

// ui components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Modal from "../Modal";

// interfaces
export interface IProModalProps { };

const ProModal: React.FC<IProModalProps> = () => {

    const proModal = useProModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast, } = useToast();

    const onSubscribe = async () => {
        setIsLoading(true);
        try {

            const response = await axios.get("/api/stripe");

            console.log(response);

            window.location.href = response.data.url;

        } catch (error: any) {
            console.log("[PRO_MODAL_ERROR]:", error);
            toast({
                variant: "destructive",
                description: "Something went wrong!",
            });
        } finally {
            setIsLoading(true);
        }
    }

    return (
        <Modal
            isOpen={proModal.isOpen}
            onClose={proModal.onClose}
            title="Upgrade to Pro"
            description={
                <>
                    Create <span className="text-sky-500 mx-1 font-medium">Custom AI</span> Companions!
                </>
            }
            body={<p className="text-2xl font-medium">
                $9
                <span className="text-sm font-normal">
                    .99/month
                </span>
            </p>}
            actionLabel="Subscribe"
            isDisabled={isLoading}
            onAction={onSubscribe}
        />
    );
};

export default ProModal;
