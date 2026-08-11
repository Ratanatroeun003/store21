"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signout } from "@/app/_actions/auth-action";
export function Signout() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleSignout = () => {
        startTransition(async () => {
            await signout();
            router.push("/auth");
        });
    };
    return (
        <Button
            onClick={handleSignout}
            variant="destructive"
            disabled={isPending}
        >
            {isPending ? "Logging out..." : "Sign Out"}
        </Button>
    );
}
