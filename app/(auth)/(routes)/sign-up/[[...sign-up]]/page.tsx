import { SignUp } from "@clerk/nextjs";

// interfaces
export interface ISignInPageProps {
    params: {
        id: string;
    };
}

const SignUpPage: React.FC<ISignInPageProps> = ({ params }) => {
    return (
        <SignUp
            path={`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!!}`}
            signInUrl={`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!!}`}
            afterSignInUrl={`${process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL!!}`}
        />
    );
};

export default SignUpPage;
