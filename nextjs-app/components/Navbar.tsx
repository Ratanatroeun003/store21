"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldUser, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/data/site-config";
import { logout } from "@/app/_actions/auth-action";

interface UserType {
    name: string;
    email: string;
    is_admin: boolean;
}

export default function Navbar({ user }: { user?: UserType | null }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 w-full border-b border-slate-800 bg-slate-200 backdrop-blur-sm z-50 text-slate-950">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition"
                >
                    {SITE_CONFIG.name}
                </Link>

                {/* ===== DESKTOP MENU ===== */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-1">
                        {SITE_CONFIG.pageLinks.map(
                            ({ label, href, icon: Icon }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link key={href} href={href}>
                                        <Button
                                            variant={
                                                isActive ? "default" : "ghost"
                                            }
                                            className={`gap-2 text-sm font-medium text-gray-950 ${
                                                isActive
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "hover:text-white hover:bg-blue-600"
                                            }`}
                                        >
                                            <Icon size={16} />
                                            <span>{label}</span>
                                        </Button>
                                    </Link>
                                );
                            },
                        )}
                    </div>

                    {/* 💡 AUTH CONDITION: ឆែកថាមាន User log in ដែរឬទេ */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* ប្រសិនបើជា Admin ឱ្យបង្ហាញ Admin Dashboard Icon */}
                            {user.is_admin && (
                                <Link href="/admin">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5 text-blue-600 font-bold border-blue-500/30 bg-blue-500/10 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                    >
                                        <ShieldUser size={14} />
                                        <span>Dashboard</span>
                                    </Button>
                                </Link>
                            )}
                            <form action={logout}>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    size="sm"
                                    className="gap-1.5 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <LogOut size={14} />
                                    <span>Logout</span>
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <Link href="/auth">
                            <Button
                                size="sm"
                                className="gap-1.5 bg-blue-600 text-white hover:bg-blue-700"
                            >
                                <LogIn size={14} />
                                <span>Login</span>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* ===== MOBILE MENU ===== */}
                <div className="flex md:hidden items-center gap-2">
                    {user?.is_admin && (
                        <Link href="/admin">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-blue-600 hover:bg-slate-300"
                            >
                                <ShieldUser size={20} />
                            </Button>
                        </Link>
                    )}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-700 hover:text-black hover:bg-slate-300"
                            >
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[280px] bg-slate-200 text-gray-950 border-slate-800"
                        >
                            <SheetTitle className="text-center text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mt-2">
                                {SITE_CONFIG.name}
                            </SheetTitle>
                            <div className="flex flex-col gap-3 mt-6">
                                {SITE_CONFIG.pageLinks.map(
                                    ({ label, href, icon: Icon }) => {
                                        const isActive = pathname === href;
                                        return (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Button
                                                    variant={
                                                        isActive
                                                            ? "default"
                                                            : "ghost"
                                                    }
                                                    className={`w-full justify-start gap-3 py-6 ${
                                                        isActive
                                                            ? "bg-blue-600 text-white"
                                                            : "hover:text-white hover:bg-blue-700"
                                                    }`}
                                                >
                                                    <Icon size={18} />
                                                    <span>{label}</span>
                                                </Button>
                                            </Link>
                                        );
                                    },
                                )}
                                <div className="mt-4 pt-4 border-t border-slate-300">
                                    {user ? (
                                        <form action={logout}>
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                className="w-full justify-start gap-3 py-6 bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                <LogOut size={18} />
                                                <span>Logout</span>
                                            </Button>
                                        </form>
                                    ) : (
                                        <Link
                                            href="/auth"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Button className="w-full justify-start gap-3 py-6 bg-blue-600 text-white hover:bg-blue-700">
                                                <LogIn size={18} />
                                                <span>Login</span>
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
