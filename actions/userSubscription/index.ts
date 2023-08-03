
// libs
import prismadb from "@/lib/prismadb";
import { UserSubscription } from "@prisma/client";

export const getUserSubscription = async (userId: string,) => {

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId,
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true,
        },
    });

    return userSubscription;
}