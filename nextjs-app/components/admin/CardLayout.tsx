import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
interface props {
    desc: string;
    title: number;
}

const CardLayout = ({ desc, title }: props) => {
    return (
        <Card className="border-blue-600 border-2 bg-accent/10 shadow-lg shadow-blue-600/10 backdrop-blur-sm">
            <CardHeader>
                <CardDescription className="text-pink-800 text-xs font-semibold uppercase tracking-widest">
                    {desc}
                </CardDescription>
                <CardTitle className="text-5xl font-bold text-slate-950 mx-auto tracking-tight">
                    {title}
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

export default CardLayout;
