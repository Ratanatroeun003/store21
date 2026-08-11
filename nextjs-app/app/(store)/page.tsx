import Item from "@/components/Item";
import { getItems } from "../_actions/item-action";
const page = async () => {
    const res = await getItems();
    const items = res.success ? res.items : [];
    return (
        <div className="w-full bg-gray-400 py-12 px-4 min-h-screen antialiased">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-xl font-bold text-gray-700 mb-6 border-b border-slate-900 pb-4 tracking-wide">
                    ALL ITEMS
                </h2>
                <Item items={items} />
            </div>
        </div>
    );
};
export default page;
