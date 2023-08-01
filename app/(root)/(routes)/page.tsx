// actions
import { getCategories } from "@/actions/category";

// custom components
import SearchInput from "@/components/inputs/SearchInput";
import Categories from "@/components/Categories";


// interfaces
export interface IRootPageProps {
    params: {
        id: string,
    },
}

const RootPage: React.FC<IRootPageProps> = async ({ params }) => {

    const categories = await getCategories();

    return (
        <div className="h-full p-4 space-y-2">
           <SearchInput />
           <Categories data={categories} />
        </div>
    );
};

export default RootPage;
