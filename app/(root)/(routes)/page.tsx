
// custom components
import SearchInput from "@/components/inputs/SearchInput";

// interfaces
export interface IRootPageProps {
    params: {
        id: string,
    },
}

const RootPage: React.FC<IRootPageProps> = ({ params }) => {
    return (
        <div className="h-full p-4 space-y-2">
           <SearchInput />
        </div>
    );
};

export default RootPage;
