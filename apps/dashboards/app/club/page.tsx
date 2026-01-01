

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users,
    Ticket,
    CreditCard,
    ArrowUpRight,
    Search,
    RefreshCw,
    PauseCircle,
    PlayCircle,
    PlusCircle,
    ArrowRight
} from "lucide-react";

export default function ClubDashboardHome() {
    const [isLoading, setIsLoading] = useState(false);
    const [entriesPaused, setEntriesPaused] = useState(false);
    const [stats, setStats] = useState({
        liveCount: 482,
        ticketsScanned: 312,
        tablesOccupied: 14,
        revenue: 2.4
    });

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate data fetch
        setTimeout(() => {
            setStats(prev => ({
                liveCount: prev.liveCount + Math.floor(Math.random() * 10),
                ticketsScanned: prev.ticketsScanned + Math.floor(Math.random() * 5),
                tablesOccupied: prev.tablesOccupied,
                revenue: prev.revenue + 0.1
            }));
            setIsLoading(false);
        }, 800);
    };

    const togglePause = () => {
        setEntriesPaused(!entriesPaused);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Command Center</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Friday, Jan 1 •
                        <span className={`font-semibold ml-2 ${entriesPaused ? "text-amber-600" : "text-emerald-600"}`}>
                            {entriesPaused ? "Entries Paused" : "Club Open"}
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all active:scale-95"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                        {isLoading ? "Refreshing..." : "Refresh Data"}
                    </button>
                    <button
                        onClick={togglePause}
                        className={`flex items-center gap-2 px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white shadow-sm transition-all active:scale-95 ${entriesPaused ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-slate-800"
                            }`}
                    >
                        {entriesPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                        {entriesPaused ? "Resume Entries" : "Pause Entries"}
                    </button>
                </div>
            </div>

            {/* Live Vital Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Live Entry Count", value: stats.liveCount, sub: "/ 600 Capacity", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Tickets Scanned", value: stats.ticketsScanned, sub: "85% of Sold", icon: Ticket, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Tables Occupied", value: stats.tablesOccupied, sub: "Total 18", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Current Revenue", value: `₹${stats.revenue.toFixed(2)}L`, sub: "+12% vs Last Fri", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Live
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                            <p className="text-xs font-medium text-slate-400 mt-2">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Operational Split */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Events & Ops */}
                <div className="xl:col-span-2 space-y-8">

                    {/* Active Event Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Tonight's Event</h2>
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 animate-pulse">LIVE NOW</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="h-32 w-full sm:w-32 bg-slate-900 rounded-xl flex-shrink-0 flex items-center justify-center">
                                <span className="text-white font-bold text-xs uppercase tracking-widest opacity-50">Cover Art</span>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Techno Bunker: Berlin Edition</h3>
                                        <p className="text-slate-500 text-sm mt-1">Hosted by <span className="font-semibold text-indigo-600">Deep Tech India</span></p>
                                    </div>
                                    <Link href="/club/events/techno-bunker" className="hidden sm:flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                                        Manage Event <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-bold">Promoters</p>
                                        <p className="text-lg font-bold text-slate-900">12 Active</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-bold">Guestlist</p>
                                        <p className="text-lg font-bold text-slate-900">450 Pax</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-xs text-slate-500 uppercase font-bold">VIPs</p>
                                        <p className="text-lg font-bold text-slate-900">4 Expected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Status (Mini) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Table Overview</h2>
                            <Link href="/club/tables" className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1">
                                Manage Tables <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <button key={i} className={`p-4 rounded-xl border transition-all hover:scale-105 active:scale-95 ${i < 5 ? 'bg-red-50 border-red-100 hover:bg-red-100' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'} flex flex-col items-center justify-center text-center`}>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">VIP-{i + 1}</p>
                                    <p className={`text-sm font-bold ${i < 5 ? 'text-red-600' : 'text-slate-900'}`}>{i < 5 ? 'OCCUPIED' : 'AVAILABLE'}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right: Staff & Logs */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Staff on Duty</h2>
                        <div className="space-y-4">
                            {[
                                { name: "Rajesh K.", role: "Floor Manager", status: "Active" },
                                { name: "Sarah M.", role: "Gate Security", status: "Active" },
                                { name: "Mike T.", role: "Bar Head", status: "Break" },
                            ].map((staff, i) => (
                                <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {staff.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                                            <p className="text-xs text-slate-500">{staff.role}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                        {staff.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Link href="/club/staff" className="flex items-center justify-center gap-2 w-full mt-6 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <PlusCircle className="w-4 h-4" />
                            Assign Staff
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Ops Log</h2>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                { time: "10:45 PM", text: "VIP Group (Sharma) Arrived", type: "info" },
                                { time: "10:12 PM", text: "Bar 2 Keg Refill Requested", type: "alert" },
                                { time: "09:30 PM", text: "Doors Open", type: "success" },
                                { time: "09:15 PM", text: "Sound Check Complete", type: "info" },
                                { time: "09:00 PM", text: "Staff Briefing Done", type: "info" },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className={`h-2 w-2 rounded-full my-1.5 ${log.type === 'alert' ? 'bg-red-500' :
                                            log.type === 'success' ? 'bg-emerald-500' : 'bg-slate-300'
                                            }`} />
                                        <div className="w-px h-full bg-slate-100" />
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-xs font-bold text-slate-400">{log.time}</p>
                                        <p className="text-sm text-slate-700 font-medium">{log.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
