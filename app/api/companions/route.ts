// next server
import { NextResponse } from 'next/server';

// auth clek
import { currentUser } from '@clerk/nextjs';

// actions
import { createCompanion } from "@/actions/companion";

export async function POST(
    req: Request
) {
    try {

        const body = await req.json();

        const user = await currentUser();

        // data from front-end
        const { src, name, description, instructions, seed, categoryId, } = body;

        // check if there's an user
        if (!user || !user.id || !user.firstName) return new NextResponse("Unauthorized", { status: 401, });

        // validate data from front-end
        if (!src || !name || !description || !instructions || !seed || !categoryId) return new NextResponse("Missing required fields", { status: 400, });

        // TODO: Check for user subscription

        // create a companion
        const companion = await createCompanion({
            name,
            categoryId,
            src,
            userId: user.id,
            userName: user.firstName,
            description,
            instructions,
            seed,
        });


        return NextResponse.json(companion);
    } catch (error: any) {
        console.log('[AI-COMPANION_POST_ERROR]: ', error);// dev log
        return new NextResponse('Internal error', { status: 500 })
    }
}