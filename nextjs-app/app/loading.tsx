import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-200">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                    <div className="absolute inset-0 h-10 w-10 animate-ping rounded-full bg-blue-500/20" />
                </div>
                <p className="text-sm font-medium text-slate-400 tracking-wide">
                    Loading...
                </p>
            </div>
        </div>
    );
}
