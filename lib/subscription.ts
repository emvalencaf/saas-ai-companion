// clerk
import { auth } from "@clerk/nextjs";

// libs
import prismadb from "@/lib/prismadb";
import { getUserSubscription } from "../actions/userSubscription";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    
    const { userId, } = auth();

    if (!userId) return false;

    const userSubscription = await getUserSubscription(userId);

    if (!userSubscription) return false;

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
}