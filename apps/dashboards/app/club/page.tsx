"use client";

import {
    Users,
    Ticket,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    MoreHorizontal
} from "lucide-react";

export default function ClubDashboardHome() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Command Center</h1>
                    <p className="text-slate-500 text-sm mt-1">Friday, Jan 1 • <span className="text-emerald-600 font-semibold">Club Open</span></p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                        Refresh Data
                    </button>
                    <button className="px-4 py-2 bg-slate-900 border border-transparent rounded-lg text-sm font-semibold text-white hover:bg-slate-800 shadow-sm">
                        Pause Entries
                    </button>
                </div>
            </div>

            {/* Live Vital Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Live Entry Count", value: "482", sub: "/ 600 Capacity", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Tickets Scanned", value: "312", sub: "85% of Sold", icon: Ticket, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Tables Occupied", value: "14", sub: "Total 18", icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Current Revenue", value: "₹2.4L", sub: "+12% vs Last Fri", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live</span>
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
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">LIVE NOW</span>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="h-32 w-32 bg-slate-900 rounded-xl flex-shrink-0" />
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900">Techno Bunker: Berlin Edition</h3>
                                <p className="text-slate-500 text-sm mt-1">Hosted by <span className="font-semibold text-indigo-600">Deep Tech India</span></p>

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
                            <button className="text-sm font-semibold text-indigo-600 hover:underline">Manage Tables →</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${i < 5 ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'} flex flex-col items-center justify-center text-center`}>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">VIP-{i + 1}</p>
                                    <p className={`text-sm font-bold ${i < 5 ? 'text-red-600' : 'text-slate-900'}`}>{i < 5 ? 'OCCUPIED' : 'AVAILABLE'}</p>
                                </div>
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
                        <button className="w-full mt-6 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">+ Assign Staff</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Ops Log</h2>
                        <div className="space-y-4">
                            {[
                                { time: "10:45 PM", text: "VIP Group (Sharma) Arrived", type: "info" },
                                { time: "10:12 PM", text: "Bar 2 Keg Refill Requested", type: "alert" },
                                { time: "09:30 PM", text: "Doors Open", type: "success" },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="h-2 w-2 rounded-full bg-slate-300 my-1.5" />
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
