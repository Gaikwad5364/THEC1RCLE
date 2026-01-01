"use client";

import { useDashboardAuth } from "@/components/providers/DashboardAuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ClubGuard({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useDashboardAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace("/login");
                return;
            }

            // Check if user has club access
            if (profile?.role !== "club_manager" && profile?.role !== "staff") {
                router.replace("/unauthorized");
                return;
            }

            // Ensure they have a clubId
            if (!profile?.clubId) {
                router.replace("/setup");
                return;
            }
        }
    }, [user, profile, loading, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500" />
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                        Verifying Access...
                    </p>
                </div>
            </div>
        );
    }

    if (!user || !profile || !profile.clubId) {
        return null;
    }

    return <>{children}</>;
}
