
// lib
import prismadb from "@/lib/prismadb"

// interface
import { Companion, Message } from "@prisma/client";
import { IChatMessageProps } from "../../app/(chat)/(routes)/chat/[chatId]/components/ChatMessages/components/ChatMessage";

// Read
export const getCompanionById = async (companionId: string, userId?: string, isNeedAuth?: boolean,): Promise<Companion | null> => {

    const where = isNeedAuth ? {
        id: companionId,
        userId,
    }: {
        id: companionId,
    };

    const companion = await prismadb.companion.findUnique({
        where: where,
    });

    return companion;
}

export const getCompanionByIdAndMessages = async (companionId: string, userId: string): Promise<Companion & {
    messages: Message[];
    _count: {
        messages: number;
    };
} | null> => {

    const companion = await prismadb.companion.findUnique({
        where: {
            id: companionId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                where: {
                    userId,
                },
            },
            _count: {
                select: {
                    messages: true,
                },
            },
        },
    });

    return companion;
}

export const getCompanions = async ({
    categoryId,
    name,
}: {
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
            userId,// only updated signed in user's companion
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

export const updateCompanionMessages = async (companionId: string, userId: string, message: {
    content: string,
    role: "user" | "system",
},) => {

    const companion = await prismadb.companion.update({
        where: {
            id: companionId,
        },
        data: {
            messages: {
                create: {
                    content: message.content,
                    role: message.role,
                    userId,
                }
            }
        }
    });

    return companion;

}

// Delete
export const deleteCompanion = async (companionId: string, userId: string,) => {
    
    const companion = await prismadb.companion.delete({
        where: {
            userId,
            id: companionId,
        },
    });

    return companion;
}