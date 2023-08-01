
// actions
import { getCompanionById } from "@/actions/companion";
import { getCategories } from "@/actions/category";

// custom companion components
import CompanionForm from "../components/CompanionForm";

// interfaces
export interface ICompanionIdPageProps {
    params: {
        companionId: string,
    },
}

const CompanionIdPage: React.FC<ICompanionIdPageProps> = async ({ params }) => {

    // TODO: Check subscription

    const companion = await getCompanionById(params.companionId);

    const categories = await getCategories();

    return (
        <CompanionForm
            initialData={companion}
            categories={categories}
        />
    );
};

export default CompanionIdPage;
