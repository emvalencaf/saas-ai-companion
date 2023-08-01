// libs
import prismadb from "@/lib/prismadb";

// interface
import { Category } from "@prisma/client";

export const getCategories = async ():Promise<Category[]> => {
    
    const categories = await prismadb.category.findMany();

    return categories;
};