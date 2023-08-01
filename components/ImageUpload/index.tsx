'use client';

// hooks
import { useEffect, useState } from "react";

// next components
import Image from "next/image";

// next-cloudinary components
import { CldUploadButton } from "next-cloudinary";

// interfaces
export interface IImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
};

const ImageUpload: React.FC<IImageUploadProps> = ({ value, onChange, disabled, }) => {

    // handle hydration error to avoid conflict between client and server side render
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton onUpload={(result: any) => onChange(result.info.secure_url)} options={{
                maxFiles: 1,
            }} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!!}>
                <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
                    <div className="relative h-40 w-40">
                        <Image
                            fill
                            alt="Upload"
                            src={value || "/assets/placeholder.svg"}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </CldUploadButton>
        </div>
    );
};

export default ImageUpload;
