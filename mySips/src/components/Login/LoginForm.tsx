import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { doSignInWithEmailAndPassword } from "@/firebase/Auth";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z
        .string()
        .min(8, "Strings must be between 8 and 50 characters")
        .max(50),
});

function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmitHandler(values: z.infer<typeof formSchema>) {
        const response = await doSignInWithEmailAndPassword(
            values.email,
            values.password
        );
        setErrorMessage(
            !response || response.status === false
                ? "Incorrect email or password"
                : ""
        );
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="space-y-8 mx-auto"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Email"
                                    {...field}
                                    className="text-black"
                                />
                            </FormControl>
                            {fieldState.error && (
                                <p className="text-red-500">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                    className="text-black"
                                />
                            </FormControl>
                            {fieldState.error && (
                                <p className="text-red-500">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-pastel-pink to-pastel-orange w-full"
                >
                    Log In
                </Button>
            </form>
        </Form>
    );
}
export default LoginForm;
