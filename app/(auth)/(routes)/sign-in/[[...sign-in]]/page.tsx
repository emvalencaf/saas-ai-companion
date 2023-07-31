import { SignIn } from "@clerk/nextjs";

// interfaces
export interface ISignInPageProps {
    params: {
        id: string;
    };
}

const SignInPage: React.FC<ISignInPageProps> = ({ params }) => {
    return (
        <SignIn
            path={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`}
            signUpUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}`}
            afterSignInUrl={`${process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}`}
        />
    );
};

export default SignInPage;
