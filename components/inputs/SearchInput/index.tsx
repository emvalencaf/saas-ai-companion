"use client";

// hooks
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// custom hooks
import { useDebounce } from "@/hooks";

// ui components
import { Input } from "@/components/ui/input";

// query string
import qs from "query-string";

// icons
import { Search } from "lucide-react";

// interfaces
import { ChangeEventHandler, useEffect, useState } from "react";

export interface ISearchInputProps {}

const SearchInput: React.FC<ISearchInputProps> = ({}) => {
    // router navigation controller
    const router = useRouter();

    // search params
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    // states
    const [value, setValue] = useState<string>(name || "");

    // get debounced value
    const debouncedValue = useDebounce<string>({
        value,
        delay: 500,
    });

    // on change
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setValue(e.target.value);

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    }, [categoryId, debouncedValue, router]);

    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input
                placeholder="Search..."
                className="pl-10 bg-primary/10"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default SearchInput;
