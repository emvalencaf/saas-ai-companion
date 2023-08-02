// actions
import { getCompanionByIdAndMessages } from "@/actions/companion";

// clerk tools
import { auth, redirectToSignIn } from "@clerk/nextjs";

// next tools
import { redirect } from "next/navigation";

// custom chat components
import ChatClient from "./components/ChatClient";


// interfaces
export interface IChatIdPageProps {
    params: {
        chatId: string,
    },
}

const ChatIdPage: React.FC<IChatIdPageProps> = async ({ params }) => {

    const { userId, } = auth();

    if (!userId) return redirectToSignIn();

    const companion = await getCompanionByIdAndMessages(params.chatId, userId);

    if (!companion) return redirect("/")

    return (
        <ChatClient companion={companion} />
    );
};

export default ChatIdPage;
