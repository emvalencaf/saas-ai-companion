
// lib
import prismadb from "@/lib/prismadb"

// interface
import { Companion } from "@prisma/client";

// Read
export const getCompanionById = async (companionId: string): Promise<Companion | null> => {

    const companion = await prismadb.companion.findUnique({
        where: {
            id: companionId,
        },
    });

    return companion;
}

export const getCompanions = async ({
    categoryId,
    name,
} : {
    categoryId?: string,
    name?: string,
}): Promise<(Companion & {
    _count: {
        messages: number,
    },
})[]> => {

    const companions = await prismadb.companion.findMany({
        where: {
            categoryId,
            name: {
                search: name,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {// messages relations to the companion
                select: {
                    messages: true,
                },
            },
        },
    });

    return companions;
}

// Create
export const createCompanion = async ({
    categoryId,
    userId,
    userName,
    src,
    description,
    instructions,
    seed,
    name,
}: Pick<Companion, "categoryId" | "name" | "userName" | "userId" | "src" | "seed" | "description" | "instructions">): Promise<Companion> => {

    const companion = await prismadb.companion.create({
        data: {
            categoryId,
            userId,
            userName,
            src,
            description,
            instructions,
            seed,
            name,
        },
    });

    return companion;
}

// Update
export const partialUpdateCompanion = async (companionId: string, {
    categoryId,
    userId,
    userName,
    src,
    description,
    instructions,
    seed,
    name,
}: Pick<Companion, "categoryId" | "name" | "userName" | "userId" | "src" | "seed" | "description" | "instructions">): Promise<Companion> => {

    const companion = await prismadb.companion.update({
        where: {
            id: companionId,
        },
        data: {
            categoryId,
            userId,
            userName,
            src,
            description,
            instructions,
            seed,
            name,
        },
    });

    return companion;
}