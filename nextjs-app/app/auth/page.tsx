"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "./action";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
const initialState = { success: false, message: undefined };
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-400 px-4">
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
            <div className="relative z-10 w-full max-w-sm">
                {/* Back to home link */}
                <Link
                    href="/"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-slate-950 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                <form
                    action={formAction}
                    className="relative z-10 w-full max-w-sm"
                >
                    <Card className="border-slate-800/80 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold text-white">
                                Welcome back
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-5">
                                {state.message && (
                                    <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                                        {state.message}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-slate-300 py-2"
                                    >
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            disabled={isPending}
                                            className="border-slate-800 bg-slate-950/50 pl-9 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="text-slate-300 py-2"
                                        >
                                            Password
                                        </Label>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            disabled={isPending}
                                            className="border-slate-800 bg-slate-950/50 pl-9 pr-9 text-white focus-visible:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((v) => !v)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-4 border-t border-slate-800/60 bg-transparent py-5">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
