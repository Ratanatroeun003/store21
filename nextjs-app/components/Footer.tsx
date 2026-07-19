"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/site-config";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-slate-900 bg-slate-200 text-slate-950">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Column 1: ឈ្មោះហាង និងការពិពណ៌នា */}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="text-xl font-bold  text-blue-700 hover:opacity-80 transition"
                    >
                        {SITE_CONFIG.name}
                    </Link>
                    <p className="text-sm leading-relaxed">
                        {SITE_CONFIG.description}
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                        Quick Links
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm">
                        {SITE_CONFIG.pageLinks.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className=" hover:text-blue-400 transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact Us */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold  uppercase tracking-wider">
                        Contact Us
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        {SITE_CONFIG.contact.map(
                            ({ label, icon: Icon }, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2.5"
                                >
                                    <Icon
                                        size={16}
                                        className="text-blue-400 shrink-0"
                                    />
                                    <span className="break-all">{label}</span>
                                </li>
                            ),
                        )}
                    </ul>
                </div>

                {/* Column 4: Follow Us */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                        Follow Us
                    </h3>
                    <div className="flex gap-2">
                        {SITE_CONFIG.socials.map(
                            ({ name, href, icon: Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={name}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full border-slate-800 hover:bg-white hover:text-blue-700 hover:border-blue-500 transition-all duration-300"
                                    >
                                        <Icon size={16} />
                                    </Button>
                                </a>
                            ),
                        )}
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-950">
                <p>
                    © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
