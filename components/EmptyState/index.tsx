'use client';

// next components
import Image from "next/image";

// interfaces
export interface IEmptyStateProps {
    description?: string;
};

const EmptyState: React.FC<IEmptyStateProps> = ({ description = '' }) => {
    return (
        <div className="pt-10 flex flex-col items-center justify-center space-y-3">
            <div className="relative w-60 h-60">
                <Image fill className="grayscale" alt="Empty" src="/assets/empty.png" />
            </div>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
};

export default EmptyState;
