// nextjs
import { redirect } from "next/navigation";

// actions
import { getCompanionById } from "@/actions/companion";
import { getCategories } from "@/actions/category";

// clerk
import { auth, redirectToSignIn } from "@clerk/nextjs";

// custom companion components
import CompanionForm from "../components/CompanionForm";

// libs
import { checkSubscription } from "@/lib/subscription";

// interfaces
export interface ICompanionIdPageProps {
    params: {
        companionId: string,
    },
}

const CompanionIdPage: React.FC<ICompanionIdPageProps> = async ({ params }) => {

    const { userId, } = auth();

    
    // check if user is signed in
    if (!userId) return redirectToSignIn();
    
    // check subscription
    const validSubscription = await checkSubscription();

    if (!validSubscription) return redirect("/");

    // only fetch companion data of companion owned by signed in user
    const companion = await getCompanionById(params.companionId, userId, true);

    const categories = await getCategories();

    return (
        <CompanionForm
            initialData={companion}
            categories={categories}
        />
    );
};

export default CompanionIdPage;
