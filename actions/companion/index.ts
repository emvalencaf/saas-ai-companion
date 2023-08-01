
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