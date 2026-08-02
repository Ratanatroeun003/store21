import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { verify } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await verify();
    if (!user.is_admin) {
        redirect("/unauthorized");
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col w-full">
                <Navbar />
                <main className="p-6 flex-1 overflow-y-auto bg-cyan-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
