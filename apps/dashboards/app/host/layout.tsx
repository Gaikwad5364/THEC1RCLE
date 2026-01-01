"use client";

import { useDashboardAuth } from "../../components/providers/DashboardAuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HostSidebar from "../../components/host-layout/HostSidebar";
import { Bell, Search } from "lucide-react";

export default function HostLayout({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useDashboardAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Loading Console...</p>
            </div>
        </div>
    );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
            <HostSidebar />

            <div className="pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span className="bg-zinc-900 border border-white/10 px-2 py-1 rounded text-xs font-mono">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                        <span className="text-zinc-500">Event Operator Console</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Status Indicators */}
                        <div className="flex items-center gap-4 mr-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">System Live</span>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative hidden md:block group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search events, promoters..."
                                className="bg-zinc-900/50 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black"></span>
                        </button>

                        {/* Profile Pill */}
                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-white leading-none mb-1">{profile?.displayName}</p>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Host Admin</p>
                            </div>
                            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                                {profile?.displayName?.charAt(0) || "H"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-x-hidden relative">
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
