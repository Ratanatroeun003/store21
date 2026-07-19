import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StoreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-full flex flex-col">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
        </div>
    );
}
