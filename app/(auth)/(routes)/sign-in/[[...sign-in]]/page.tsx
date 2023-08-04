'use client';

// hooks
import { useState, useEffect, } from 'react';

// clerk components
import { SignIn } from "@clerk/nextjs";

// auth components
import DemoSignInButton from '@/app/(auth)/components/DemoSignInButton';

// interfaces
export interface ISignInPageProps { }

const SignInPage: React.FC<ISignInPageProps> = ({ }) => {

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => setIsMounted(true),
        []);

    if (!isMounted) return null;

    return (
        <div className="flex flex-col gap-6">
            <SignIn
                path={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
                signUpUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
                afterSignInUrl={`${process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}`}
            />
            <DemoSignInButton />
        </div>
    );
};

export default SignInPage;
