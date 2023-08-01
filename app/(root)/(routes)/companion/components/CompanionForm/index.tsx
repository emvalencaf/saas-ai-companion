'use client';

// hooks
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// ui hooks
import { useToast } from "@/components/ui/use-toast";

// axios
import axios from 'axios';

// ui components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


// custom components
import ImageUpload from "@/components/ImageUpload";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required."
    }),
    description: z.string().min(1, {
        message: "Description is required."
    }),
    instructions: z.string().min(200, {
        message: "Instructions requires at lest 200 characters."
    }),
    seed: z.string().min(200, {
        message: "Seed requires at lest 200 characters."
    }),
    src: z.string().min(1, {
        message: "Image is required.",
    }),
    categoryId: z.string().min(1, {
        message: "Category is required.",
    })
})

// icons
import { Wand2 } from "lucide-react";

// constants
import { PREAMBLE, SEED_CHAT } from "@/constants";

// interfaces
import { Category, Companion } from "@prisma/client";

export interface ICompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
};

const CompanionForm: React.FC<ICompanionFormProps> = ({ initialData, categories, }) => {

    // toast
    const { toast } = useToast();

    // router
    const router = useRouter();

    // states form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    // handle on submit
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (isLoading) return toast({
            variant: "destructive",
            description: "You cannot create/update more than one companion at once",
        });

        try {

            // update or create a companion
            initialData ?
                await axios.patch(`/api/companion/${initialData.id}`, values)
                : await axios.post(`/api/companion`, values);

            toast({
                description: "Success",
            });

            // refresh data from db 
            router.refresh();
            router.push("/");

        } catch (error: any) {
            console.log("[AI-COMPANION_ERROR]:", error);
            toast({
                variant: "destructive",
                description: "Something went wrong",
            })
        }
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                General Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                General information about your Companion
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="src"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Elon Musk"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your AI Companion will be named.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="CEO & Founder of Tesla and SpaceX, Twitter owner"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for your AI Companion.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div
                        className="space-y-2 w-full"
                    >
                        <div>
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed instructions for AI Behaviour
                            </p>
                            <Separator className="bg-primary/10" />
                        </div>
                    </div>
                    <FormField
                        name="instructions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-ground resize-none"
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your AI Companion&apos;s backstory and relevant details.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>
                                    Example Conversation
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-ground resize-none"
                                        disabled={isLoading}
                                        placeholder={SEED_CHAT}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Write couple of examples of a human chatting with your AI companion, write expected answers.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>
                            {initialData ? "Edit your companion" : "Create your companion"}
                            <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    );
};

export default CompanionForm;
