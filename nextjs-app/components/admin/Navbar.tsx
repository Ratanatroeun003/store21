"use client";
import { Bell, User } from "lucide-react";
export default function Navbar() {
    return (
        <header
            className="
        sticky top-0 z-40 inset-x-0
        h-16
        w-full
        bg-slate-200
        border-b border-slate-800
        flex items-center justify-end md:justify-between
        px-6
        gap-6
        "
        >
            <h2
                className="
            text-slate-950 font-semibold
            "
            >
                Dashboard
            </h2>
            <div className="flex gap-2">
                <button
                    className="
                text-slate-950
                hover:text-white
                "
                >
                    <Bell size={20} />
                </button>

                <div
                    className="
                flex items-center gap-2
                text-slate-950
                "
                >
                    <User size={20} />
                    <span>Admin</span>
                </div>
            </div>
        </header>
    );
}
