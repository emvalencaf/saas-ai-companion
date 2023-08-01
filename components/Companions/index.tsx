'use client';

// next components
import Link from "next/link";
import Image from "next/image";

// ui components
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

// custom components
import EmptyState from "@/components/EmptyState";

// icons
import { MessageSquare } from "lucide-react";

// interfaces
import { Companion } from "@prisma/client";

export interface ICompanionsProps {
    data: (Companion & {
        _count: {
            messages: number,
        },
    })[];
};

const Companions: React.FC<ICompanionsProps> = ({ data, }) => {

    if (!data || data.length === 0) return <EmptyState description="No companions found." />

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
            {data.map((item) => (
                <Card key={item.id} className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0">
                    <Link href={`/chat/${item.id}`}>
                        <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                            <div className="relative w-32 h-32">
                                <Image src={item.src} fill className="rounded-xl object-cover" alt="Companion" />
                            </div>
                            <p className="font-bold">
                                {item.name}
                            </p>
                            <p className="text-xs">
                                {item.description}
                            </p>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                            <p className="lowercase">
                                @{item.userName}
                            </p>
                            <div className="flex items-center">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {item._count.messages}
                            </div>
                        </CardFooter>
                    </Link>
                </Card>
            ))}
        </div>
    );
};

export default Companions;