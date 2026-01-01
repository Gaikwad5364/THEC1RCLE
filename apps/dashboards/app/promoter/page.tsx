"use client";

import { useDashboardAuth } from "../../components/providers/DashboardAuthProvider";
import {
    Wallet,
    Ticket,
    TrendingUp,
    Link as LinkIcon,
    Copy,
    ArrowRight,
    QrCode
} from "lucide-react";
import Link from "next/link";

export default function PromoterDashboardHome() {
    const { profile } = useDashboardAuth();

    // Mock Stats
    const stats = [
        { label: "Earnings Today", value: "₹0", icon: Wallet, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "This Month", value: "₹0", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "Tickets Sold", value: "0", icon: Ticket, color: "text-blue-400", bg: "bg-blue-400/10" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Hello, {profile?.displayName?.split(' ')[0] || 'Promoter'} 👋
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Let's make some money today.
                </p>
            </div>

            {/* Earnings Cards - Mobile Friendly Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {/* Main Earning Card - Full Width on Mobile */}
                <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-zinc-900 border border-emerald-500/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Wallet className="w-5 h-5 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Earnings Today</span>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight">₹0</h2>
                        <p className="text-xs text-zinc-400 mt-2">No sales yet</p>
                    </div>
                </div>

                {/* Secondary Stats */}
                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">This Month</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">₹0</h2>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                        <Ticket className="w-5 h-5 text-amber-400" />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tickets Sold</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">0</h2>
                </div>
            </div>

            {/* Quick Actions */}
            <h3 className="font-bold text-white text-lg mt-8">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-emerald-500/50 transition-all flex flex-col items-center gap-2 text-center group">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                        <LinkIcon className="w-5 h-5 text-white group-hover:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Copy Link</span>
                </button>
                <button className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-purple-500/50 transition-all flex flex-col items-center gap-2 text-center group">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                        <QrCode className="w-5 h-5 text-white group-hover:text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Share QR</span>
                </button>
            </div>

            {/* Recent Sales List Placeholder */}
            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 mt-8 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold text-white">Recent Sales</h3>
                    <Link href="/promoter/stats" className="text-xs font-bold text-emerald-500 hover:text-emerald-400">View All</Link>
                </div>
                <div className="p-8 text-center">
                    <p className="text-zinc-500 text-sm">No sales recorded today.</p>
                </div>
            </div>
        </div>
    );
}
