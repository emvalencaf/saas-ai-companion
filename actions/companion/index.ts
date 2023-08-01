
// lib
import prismadb from "@/lib/prismadb"

// interface
import { Companion } from "@prisma/client";

export const getCompanionById = async (companionId: string): Promise<Companion | null> => {
    
    const companion = await prismadb.companion.findUnique({
        where: {
            id: companionId,
        },
    });

    return companion;
}