import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { requireAdmin } from "@/lib/auth";
import { AdminProvider } from "@/context/AdminContext";
import { index } from "../(store)/action";
export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const admin = await requireAdmin();
    const res = await index();
    if (!res.success) {
        console.error(res.message);
    }
    const items = res.success ? res.items : [];
    return (
        <AdminProvider initialItems={items}>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col w-full">
                    <Navbar />
                    <main className="p-6 flex-1 overflow-y-auto bg-cyan-100">
                        {children}
                    </main>
                </div>
            </div>
        </AdminProvider>
    );
}
