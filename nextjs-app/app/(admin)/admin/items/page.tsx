import { getItems } from "@/app/_actions/item-action";
import Items from "@/components/admin/Item";
const page = async () => {
    const res = await getItems();
    const items = res.success ? res.items : [];
    return (
        <div>
            <Items items={items} />
        </div>
    );
};

export default page;
