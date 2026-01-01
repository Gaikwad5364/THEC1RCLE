"use client";

import { useDashboardAuth } from "../../components/providers/DashboardAuthProvider";
import {
    Plus,
    CalendarPlus,
    UserPlus,
    Share2,
    TrendingUp,
    Ticket,
    Users,
    AlertCircle,
    ArrowRight,
    Clock,
    CheckCircle2,
    Building2
} from "lucide-react";
import Link from "next/link";

export default function HostDashboardHome() {
    const { profile } = useDashboardAuth();

    // Mock Data for "At-a-glance"
    const stats = [
        {
            label: "Tonight's Revenue",
            value: "₹0",
            change: "+0%",
            trend: "neutral",
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            label: "Tickets Sold Today",
            value: "0",
            change: "No events live",
            trend: "neutral",
            icon: Ticket,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            label: "Active Promoters",
            value: "0",
            change: "Network inactive",
            trend: "down",
            icon: Users,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            label: "Club Approvals",
            value: "0",
            change: "All cleared",
            trend: "neutral",
            icon: CheckCircle2,
            color: "text-zinc-400",
            bg: "bg-zinc-500/10",
            border: "border-zinc-500/20"
        },
    ];

    const alerts = [
        { id: 1, type: "warning", message: "Complete your host profile to verify payments.", action: "Verify Now" },
        { id: 2, type: "info", message: "New feature: Multi-tier tickets are now available.", action: "Learn More" },
    ];

    const upcomingEvents = [
        // { id: 1, name: "Neon Jungle", date: "Fri, Oct 24", venue: "Soho Club", status: "Approved", sold: 142, capacity: 300 }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Welcome back, {profile?.displayName?.split(' ')[0] || 'Host'}
                    </h1>
                    <p className="text-zinc-400 mt-1 flex items-center gap-2">
                        System Operational
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </p>
                </div>
                <Link
                    href="/host/create"
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40"
                >
                    <Plus className="w-4 h-4" />
                    Create New Event
                </Link>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl bg-zinc-900/50 border ${stat.border} relative overflow-hidden group`}>
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <stat.icon className={`w-16 h-16 ${stat.color}`} />
                        </div>
                        <div className="relative z-10">
                            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
                            <p className="text-xs font-medium text-zinc-500 mt-2 flex items-center gap-1">
                                {stat.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Alerts Section */}
                    {alerts.length > 0 && (
                        <div className="space-y-3">
                            {alerts.map(alert => (
                                <div key={alert.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className={`w-5 h-5 ${alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
                                        <p className="text-sm font-medium text-zinc-200">{alert.message}</p>
                                    </div>
                                    <button className="text-xs font-bold text-white bg-white/5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                                        {alert.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Link href="/host/create" className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-indigo-500/50 hover:bg-zinc-800 transition-all group flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-indigo-600/20 group-hover:scale-110 transition-all flex items-center justify-center">
                                <Plus className="w-6 h-6 text-white group-hover:text-indigo-400" />
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">Create Event</span>
                        </Link>

                        <Link href="/host/partnerships" className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all group flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-emerald-600/20 group-hover:scale-110 transition-all flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white group-hover:text-emerald-400" />
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">Request Slot</span>
                        </Link>

                        <button className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-amber-500/50 hover:bg-zinc-800 transition-all group flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-amber-600/20 group-hover:scale-110 transition-all flex items-center justify-center">
                                <UserPlus className="w-6 h-6 text-white group-hover:text-amber-400" />
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">Add Promoter</span>
                        </button>

                        <button className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-blue-500/50 hover:bg-zinc-800 transition-all group flex flex-col items-center justify-center gap-3 text-center min-h-[140px]">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all flex items-center justify-center">
                                <Share2 className="w-6 h-6 text-white group-hover:text-blue-400" />
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">Share Profile</span>
                        </button>
                    </div>

                    {/* Recent Events / Empty State */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden min-h-[300px] flex flex-col">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-white text-lg">Upcoming Events</h3>
                            <Link href="/host/events" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                View Calendar <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            {upcomingEvents.length === 0 ? (
                                <div className="max-w-xs space-y-4">
                                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CalendarPlus className="w-8 h-8 text-zinc-500" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">No Upcoming Events</h4>
                                    <p className="text-zinc-500 text-sm">Your pipeline is empty. Start by creating a draft or requesting a slot from a partner club.</p>
                                    <Link href="/host/create" className="inline-block px-6 py-2 bg-white text-black font-bold text-sm rounded-full hover:scale-105 transition-transform">
                                        Create Draft
                                    </Link>
                                </div>
                            ) : (
                                <div className="w-full">
                                    {/* Event List would go here */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Column (1/3) */}
                <div className="space-y-6">
                    {/* Activity Feed Placeholder */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-zinc-400" />
                            Recent Activity
                        </h3>
                        <div className="space-y-6 relative before:absolute before:left-[9px] before:top-8 before:bottom-0 before:w-px before:bg-zinc-800">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-zinc-900 border-2 border-zinc-700 z-10" />
                                    <p className="text-sm text-zinc-300">
                                        <span className="font-bold text-white">You</span> logged into the console.
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1">Just now</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Network Status */}
                    <div className="bg-gradient-to-br from-indigo-900/20 to-violet-900/20 border border-indigo-500/20 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-2">Promoter Network</h3>
                        <p className="text-sm text-zinc-400 mb-6">
                            You have <span className="text-white font-bold">0 active</span> promoters helping you sell tickets.
                        </p>
                        <button className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-sm font-bold rounded-xl transition-colors">
                            Manage Network
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
