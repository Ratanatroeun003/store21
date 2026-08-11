"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/data/site-config";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <aside>
            <div
                className="
                hidden md:flex flex-col justify-between
                sticky left-0 top-0
                h-screen w-64
                bg-slate-200
                border-r border-slate-900
                p-5 antialiased select-none
                "
            >
                <div className="w-full">
                    <h1 className="text-xl font-bold mb-8 px-2 mx-auto tracking-wide">
                        Admin Panel
                    </h1>

                    <nav className="space-y-1">
                        {SITE_CONFIG.adminLink.map(
                            ({ label, href, icon: Icon }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`
                                    flex items-center gap-3
                                    px-4 py-2.5
                                    rounded-xl text-sm font-medium
                                    transition-all duration-200 group
                                    ${
                                        isActive
                                            ? "bg-blue-600 text-gray-950 shadow-lg shadow-blue-600/10 font-semibold"
                                            : "text-slate-900 hover:bg-slate-900 hover:text-slate-100"
                                    }
                                    `}
                                    >
                                        <Icon
                                            size={18}
                                            className={
                                                isActive
                                                    ? "text-slate-950"
                                                    : "text-slate-900 group-hover:text-blue-500"
                                            }
                                        />
                                        {label}
                                    </Link>
                                );
                            },
                        )}
                    </nav>
                </div>
            </div>
            <div className="md:hidden fixed top-3 left-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white h-10 w-10 rounded-xl"
                        >
                            <Menu size={22} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-64 bg-slate-200 border-slate-900 p-5 flex flex-col justify-between"
                    >
                        <div className="w-full">
                            <SheetTitle className="text-xl font-bold text-gray-950 tracking-wide px-2 mt-2 uppercase">
                                Admin Panel
                            </SheetTitle>

                            <nav className="space-y-1 mt-6">
                                {SITE_CONFIG.adminLink.map(
                                    ({ label, href, icon: Icon }) => {
                                        const isActive = pathname === href;
                                        return (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setOpen(false)}
                                                className={`
                                            flex items-center gap-3
                                            px-4 py-2.5
                                            rounded-xl text-sm font-medium
                                            transition-all duration-200 group
                                            ${
                                                isActive
                                                    ? "bg-blue-600 text-gray-950 shadow-lg shadow-blue-600/10 font-semibold"
                                                    : "text-slate-900 hover:bg-slate-950 hover:text-slate-100"
                                            }
                                            `}
                                            >
                                                <Icon
                                                    size={18}
                                                    className={
                                                        isActive
                                                            ? "text-slate-950"
                                                            : "text-slate-900 group-hover:text-blue-500"
                                                    }
                                                />
                                                {label}
                                            </Link>
                                        );
                                    },
                                )}
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </aside>
    );
}
