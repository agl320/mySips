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
import { doCreateUserWithEmailAndPassword } from "@/firebase/Auth";
import { useState } from "react";

const formSchema = z
    .object({
        email: z.string().min(2).max(50),
        username: z.string().min(2).max(50),
        password: z
            .string()
            .min(8, "String must be between 8 and 50 characters")
            .max(50),
        passwordVerify: z.string().min(8).max(50),
    })
    .refine((data) => data.password === data.passwordVerify, {
        message: "Strings don't match",
        path: ["passwordVerify"],
    });

function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            passwordVerify: "",
        },
    });

    async function onSubmitHandler(values: z.infer<typeof formSchema>) {
        const response = await doCreateUserWithEmailAndPassword(
            values.email,
            values.username,
            values.password
        );
        setErrorMessage(
            !response || response.status === false
                ? "Registration failed. Please try again."
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
                    name="username"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Username"
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
                <FormField
                    control={form.control}
                    name="passwordVerify"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Re-type Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Re-type Password"
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
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
