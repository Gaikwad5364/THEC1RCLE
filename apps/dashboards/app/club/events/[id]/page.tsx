"use client";

import { useState } from "react";
import {
    Calendar,
    MapPin,
    Users,
    Ticket,
    CreditCard,
    Search,
    Download,
    Filter,
    ArrowLeft,
    Share2,
    Edit3
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventDetailsPage({ params }: { params: { id: string } }) {
    // In real app, fetch event by params.id
    // Mocking based on URL for demo
    const eventParams = useParams();
    const eventId = params?.id || eventParams?.id || "unknown-event";
    const eventName = eventId.toString().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/club" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200">Live Now</span>
                            <span className="text-slate-400 text-sm">Event ID: #{eventId.toString().substring(0, 6).toUpperCase()}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">{eventName}</h1>
                        <div className="flex items-center gap-4 mt-2 text-slate-500 text-sm font-medium">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Today, 10:00 PM</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Main Hall</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                            <Share2 className="w-4 h-4" /> Share Link
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 shadow-md">
                            <Edit3 className="w-4 h-4" /> Edit Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Revenue", value: "₹2.4L", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Tickets Sold", value: "312", icon: Ticket, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Guests Inside", value: "245", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Guestlist", value: "850", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex gap-8">
                    {["Overview", "Guestlist", "Promoters", "Insights"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === tab.toLowerCase()
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-lg font-bold text-slate-900">Live Activity Feed</h3>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                                {[
                                    { time: "Just now", text: "VIP Table 4 occupied by Sharma Group (6 pax)", type: "checkin" },
                                    { time: "2m ago", text: "Ticket #8821 scanned at Main Gate", type: "scan" },
                                    { time: "5m ago", text: "Promoter Rahul sold 2x VIP Tickets", type: "sale" },
                                    { time: "12m ago", text: "Bar inventory alert: Vodka running low", type: "alert" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="min-w-[60px] text-xs font-bold text-slate-400 text-right pt-1">{item.time}</div>
                                        <div className={`p-2 rounded-full ${item.type === 'alert' ? 'bg-red-100 text-red-600' :
                                                item.type === 'sale' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            <div className="w-2 h-2 rounded-full bg-current" />
                                        </div>
                                        <div className="pb-4 border-b border-slate-100 flex-1 last:border-0">
                                            <p className="text-sm font-medium text-slate-800">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Buyers */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900">Recent Buyers</h3>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                                U{i + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">User Name {i + 1}</p>
                                                <p className="text-xs text-slate-500">2x General Admission</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-emerald-600">+₹2000</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "guestlist" && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                            <div className="relative max-w-sm w-full">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search guests..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm" />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
                                <Download className="w-4 h-4" /> Export CSV
                            </button>
                        </div>
                        <div className="p-8 text-center text-slate-500 text-sm">
                            <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                            <p>Full guestlist data will appear here.</p>
                        </div>
                    </div>
                )}

                {activeTab === "promoters" && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
                        <p>Promoter performance tracking module.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
