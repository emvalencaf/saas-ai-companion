'use client';

// modals components
import ProModal from "@/components/modals/ProModal";
import { useEffect, useState } from "react";

// interfaces
export interface IModalProviderProps {
};

const ModalProvider: React.FC<IModalProviderProps> = ({ }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <ProModal />
        </>
    );
};

export default ModalProvider;
