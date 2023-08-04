// actions
import { getCategories } from "@/actions/category";
import { getCompanions } from "@/actions/companion";

// custom components
import SearchInput from "@/components/inputs/SearchInput";
import Categories from "@/components/Categories";
import Companions from "@/components/Companions";


// interfaces
export interface IRootPageProps {
    searchParams: {
        categoryId: string,
        name: string,
    },
}

const RootPage: React.FC<IRootPageProps> = async ({ searchParams, }) => {


    const { categoryId, name } = searchParams;

    // get companions
    const companions = await getCompanions({
        categoryId,
        name,
    });

    // get categories
    const categories = await getCategories();

    return (
        <div className="h-full p-4 space-y-2">
           <SearchInput />
           <Categories data={categories} />
           <Companions data={companions} />
        </div>
    );
};

export default RootPage;
