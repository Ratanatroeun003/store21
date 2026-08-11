"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, SigninInput } from "@/lib/validations/auth";
import { signin } from "@/app/_actions/auth-action";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldSet,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Loader2, Eye, EyeOff } from "lucide-react";
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SigninInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: SigninInput) => {
        const res = await signin(data);
        if (res.success) {
            toast.success(res.message);
            router.push("/");
        } else {
            toast.error(res.message);
        }
    };
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Card className="w-full max-w-md border-slate-800/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">
                        Welcome back
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="px-6 pb-6">
                        <FieldSet disabled={isSubmitting}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input {...register("email")} />
                                    <FieldError>
                                        {errors.email?.message}
                                    </FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...register("password")}
                                            className="pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden"
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-0 right-0 h-full px-3"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <FieldError>
                                        {errors.password?.message}
                                    </FieldError>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>
                    <CardFooter className="flex-col gap-4 border-t border-slate-800/60 bg-transparent py-5">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default SignIn;
