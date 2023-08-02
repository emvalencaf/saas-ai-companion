// next server
import { NextResponse } from 'next/server';

// auth clek
import { auth, currentUser } from '@clerk/nextjs';

// actions
import { deleteCompanion, getCompanionById, partialUpdateCompanion } from "@/actions/companion";

// Update
export async function PATCH(
    req: Request,
    { params }: {
        params: {
            companionId: string,
        },
    },
) {
    try {

        // check if there's a companion id params
        if (!params.companionId) return new NextResponse("Companion ID is required", { status: 401, });

        const { companionId } = params;

        const body = await req.json();

        const user = await currentUser();

        // data from front-end
        const { src, name, description, instructions, seed, categoryId, } = body;

        // check if there's an user
        if (!user || !user.id || !user.firstName) return new NextResponse("Unauthorized", { status: 401, });

        // validate data from front-end
        if (!src || !name || !description || !instructions || !seed || !categoryId) return new NextResponse("Missing required fields", { status: 400, });

        // TODO: Check for user subscription

        // partial update a companion
        const companion = await partialUpdateCompanion(companionId, {
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
        console.log('[AI-COMPANION_PATCH_ERROR]: ', error);// dev log
        return new NextResponse('Internal error', { status: 500 })
    }
}

// DELETE
export async function DELETE(
    req: Request,
    { params }: {
        params: {
            companionId: string,
        },
    },
) {
    try {

        // get user id
        const { userId, } = auth();
      
        // check if user is signed in
        if (!userId) return new NextResponse("Unauthorized", { status: 401, });

        const companion = await getCompanionById(params.companionId);

        if (!companion) return new NextResponse("companion doesn't exists", { status: 404, });

        if (companion.userId !== userId) return new NextResponse("You cannot delete a companion that isn't yours", { status: 401, });

        const deleted = await deleteCompanion(params.companionId, userId);

        return NextResponse.json(deleted);
        
    } catch (error: any) {
        console.log('[AI-COMPANION_DELETE_ERROR]:', error);// dev log
        return new NextResponse('Internal error', { status: 500 })
    }
}