// next server
import { NextResponse } from 'next/server';

// clerk
import { auth, currentUser } from '@clerk/nextjs';

// libs
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import prismadb from '@/lib/prismadb';

const settingsUrl = absoluteUrl("/settings");

export async function GET(
    req: Request,
) {
    try {

        const { userId, } = auth();
        const user = await currentUser();

        if (!userId || !user) return new NextResponse("Unauthorized", { status: 401, });

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId,
            },
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url, }));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card",],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Companion Pro",
                            description: "Create Custom AI Companions",
                        },
                        unit_amount: 999,// USD $ 9.99
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession, }));
    } catch (error: any) {
        console.log('[STRIPE_GET_ERROR]:', error);// DEV LOG
        return new NextResponse('Internal error', { status: 500 });
    }
}