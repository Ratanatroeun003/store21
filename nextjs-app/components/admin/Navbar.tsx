"use client";
import { Signout } from "@/components/Signout";
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
            <Signout />
        </header>
    );
}
