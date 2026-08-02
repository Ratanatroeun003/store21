import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
export default async function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    return (
        <div className="min-h-full flex flex-col">
            <Navbar user={user} />
            <main className="grow">{children}</main>
            <Footer />
        </div>
    );
}
