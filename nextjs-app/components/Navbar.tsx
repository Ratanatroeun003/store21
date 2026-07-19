"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/data/site-config";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 w-full border-b border-slate-800 bg-slate-200 backdrop-blur-sm z-50 text-slate-950">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                {/* ឡូហ្គោ */}
                <Link
                    href="/"
                    className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition"
                >
                    {SITE_CONFIG.name}
                </Link>

                {/* 💻 Desktop Menu */}
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
                                                    ? "bg-blue-600 hover:bg-blue-700"
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
                    <Link href="/admin">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-blue-400 font-bold border-blue-500/30 bg-blue-500/5 hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                            <ShieldUser size={14} />
                            <span>Admin only</span>
                        </Button>
                    </Link>
                </div>
                <div className="flex md:hidden items-center gap-2">
                    <Link href="/admin">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-400 hover:bg-slate-900"
                        >
                            <ShieldUser size={20} />
                        </Button>
                    </Link>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-slate-900"
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
                                                            : " hover:text-white hover:bg-blue-700"
                                                    }`}
                                                >
                                                    <Icon size={18} />
                                                    <span>{label}</span>
                                                </Button>
                                            </Link>
                                        );
                                    },
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
