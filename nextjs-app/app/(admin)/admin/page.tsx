"use client";
import CardLayout from "@/components/admin/CardLayout";
import { useAdmin } from "@/context/AdminContext";
const AdminPage = () => {
    const { items } = useAdmin();
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-w-7xl">
            <CardLayout desc="Items" title={items.length} />
        </div>
    );
};
export default AdminPage;
