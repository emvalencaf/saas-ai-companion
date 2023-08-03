'use client';

// ui components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// interfaces
export interface IModalProps {
    title: string;
    description: React.ReactElement;
    isOpen: boolean;
    body: React.ReactNode;
    onAction: () => void;
    onClose: () => void;
    actionLabel: string;
    isDisabled?: boolean;
};

const Modal: React.FC<IModalProps> = ({ title, description, isOpen, body, isDisabled, onAction, onClose, actionLabel, }) => {
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    {body}
                    <Button onClick={onAction} disabled={isDisabled} variant="premium">
                        {actionLabel}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
