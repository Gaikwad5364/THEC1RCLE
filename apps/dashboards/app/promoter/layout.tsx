"use client";

import { useDashboardAuth } from "../../components/providers/DashboardAuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PromoterSidebar from "../../components/promoter-layout/PromoterSidebar";
import { Bell, Menu, X } from "lucide-react";

export default function PromoterLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useDashboardAuth();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Loading Sales Console...</p>
            </div>
        </div>
    );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <PromoterSidebar />
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden h-16 border-b border-white/10 flex items-center justify-between px-4 bg-zinc-950 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">P</span>
                    <span className="font-bold text-white">Promoter</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black pt-16 lg:hidden">
                    <PromoterSidebar />
                    {/* Note: Sidebar has fixed position, we might need adjustments for mobile reuse logic or just render distinct mobile nav. 
                        For now, assuming sidebar is reused but we need to ensure z-index aligns. 
                        Actually sidebar is fixed left-0. On mobile it might overlay or we toggle display.
                        Let's keep it simple: Hide normal sidebar on mobile, show this overlay logic if needed, or just let Sidebar handle responsiveness if we coded it that way?
                        Sidebar currently has `w-64 fixed hidden lg:flex`.
                        I will just render a Mobile Nav here.
                    */}
                </div>
            )}

            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="hidden lg:flex h-16 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40 px-8 items-center justify-end gap-6">
                    <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                        <div className="text-right">
                            <p className="text-sm font-bold text-white leading-none mb-1">{profile?.displayName}</p>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Silver Promoter</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                            {profile?.displayName?.charAt(0) || "P"}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden relative">
                    <div className="relative z-10 max-w-5xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
