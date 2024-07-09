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
import { doCreateUserWithEmailAndPassword } from "../../firebase/Auth";

const formSchema = z
    .object({
        email: z.string().min(2).max(50),
        username: z.string().min(2).max(50),
        password: z.string().min(8).max(50),
        passwordVerify: z.string().min(8).max(50),
    })
    .refine((data) => data.password === data.passwordVerify, {
        message: "Passwords don't match",
        path: ["passwordVerify"],
    });

function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            passwordVerify: "",
        },
    });

    function onSubmitHandler(values: z.infer<typeof formSchema>) {
        doCreateUserWithEmailAndPassword(values.email, values.password);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordVerify"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Re-type Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Re-type Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
export default RegisterForm;
