
// clerk
import { auth, currentUser } from "@clerk/nextjs";

// ai tools
import { StreamingTextResponse, LangChainStream, } from "ai";

// langchain
import { CallbackManager } from "langchain/callbacks";
import { Replicate, } from "langchain/llms/replicate";

// Next
import { NextResponse } from "next/server";

// libs
import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";
import { updateCompanionMessages } from "../../../../actions/companion";

export async function POST(
    req: Request,
    params: {
        chatId: string,
    },
) {
    try {

        const { chatId } = params;

        const { prompt, } = await req.json();

        const user = await currentUser();

        if (!user || !user.firstName || !user.id) return new NextResponse("Unauthorized", { status: 401, });

        const identifier = req.url + "-" + user.id;

        const { success, } = await rateLimit(identifier);

        if (!success) return new NextResponse("Rate limit exceeded", { status: 429, });

        const companion = await updateCompanionMessages(chatId, user.id, {
            content: prompt,
            role: "user",
        });

        if (!companion) return new NextResponse("Companion not found", { status: 404, });

        const name = companion.id;
        const companion_file_name = name + ".txt";

        const companionKey = {
            companionName: name,
            userId: user.id,
            modelName: "llama2-13b",
        };

        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(companionKey);

        if (records.length === 0)
            await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);

        await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            companion_file_name,
        );

        let relevanHistory = "";

        if (!!similarDocs && similarDocs.length !== 0)
            relevanHistory = similarDocs.map((doc) => doc.pageContent).join("\n");

        const { handlers, } = LangChainStream();

        const model = new Replicate({
            model:
                "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: {
                max_length: 2048,
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers),
        });

        model.verbose = true;

        const resp = String(
            await model
                .call(
                    `
                    ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${name}: prefix.

                    ${companion.instructions}

                    Below are the relevant details about ${name}'s past and the conversation you are in.
                    ${relevanHistory}

                    ${recentChatHistory}\n${name}:
                    `,
                )
                .catch((err) => console.log(err)),
        );

        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        await memoryManager.writeToHistory("" + response.trim(), companionKey);

        var Readble = require("stream").Readble;

        let s = new Readble();
        s.push(response);
        s.push(null);

        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory("" + response.trim(), companionKey);

            await updateCompanionMessages(chatId, user.id, {
                content: response.trim(),
                role: "system",
            });
        }


        return new StreamingTextResponse(s);
    } catch (error: any) {
        console.log('[CHAT_POST_ERROR]:', error);// dev log
        return new NextResponse('Internal error', { status: 500 })
    }
}