"use client";

import { useState } from "react";
import {
    Calendar,
    MapPin,
    Ticket,
    Link as LinkIcon,
    Share2,
    CheckCircle2,
    Info
} from "lucide-react";
import Link from "next/link";

// Mock Data - In real app, fetch from /api/promoter/events
const MOCK_EVENTS = [
    {
        id: 1,
        title: "Techno Bunker",
        date: "Tonight, 10:00 PM",
        venue: "Tryst Mumbai",
        price: "₹2000",
        commission: "10%",
        potentialEarnings: "₹200/tkt",
        sold: 12,
        status: "Live",
        image: "gradient-to-br from-purple-900 to-indigo-900",
        link: "https://c1rcle.com/e/techno-bunker?ref=PROMO123"
    },
    {
        id: 2,
        title: "Sunday Sundowner",
        date: "Sun, Oct 26 • 4:00 PM",
        venue: "Dragonfly Experience",
        price: "₹1500",
        commission: "15%",
        potentialEarnings: "₹225/tkt",
        sold: 5,
        status: "Selling Fast",
        image: "gradient-to-br from-orange-900 to-red-900",
        link: "https://c1rcle.com/e/sundowner?ref=PROMO123"
    },
    {
        id: 3,
        title: "Deep House Dive",
        date: "Fri, Oct 31 • 9:00 PM",
        venue: "AntiSocial",
        price: "₹1000",
        commission: "10%",
        potentialEarnings: "₹100/tkt",
        sold: 0,
        status: "Upcoming",
        image: "gradient-to-br from-blue-900 to-cyan-900",
        link: "https://c1rcle.com/e/deep-house?ref=PROMO123"
    }
];

export default function ActiveEventsPage() {
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleCopy = (id: number, link: string) => {
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Active Events</h1>
                    <p className="text-zinc-400 text-sm">Start selling to earn commissions.</p>
                </div>
                <div className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        {MOCK_EVENTS.length} Live
                    </span>
                </div>
            </div>

            {/* Event List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all group">

                        {/* Event Cover (Abstract Gradient) */}
                        <div className={`h-28 bg-${event.image} relative p-4 flex items-start justify-between`}>
                            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                {event.status}
                            </span>
                            <div className="bg-emerald-500 text-black px-2 py-1 rounded-md text-xs font-black shadow-lg">
                                {event.commission} COMM.
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-white mb-1">{event.title}</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                    <Ticket className="w-4 h-4" />
                                    <span>{event.price} Entry</span>
                                </div>
                            </div>

                            {/* Earnings Potential Info */}
                            <div className="bg-zinc-950 rounded-lg p-3 mb-4 flex items-center justify-between border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Info className="w-4 h-4 text-zinc-500" />
                                    <span className="text-xs font-medium text-zinc-400">You earn</span>
                                </div>
                                <span className="text-sm font-bold text-emerald-400">{event.potentialEarnings}</span>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleCopy(event.id, event.link)}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${copiedId === event.id
                                            ? "bg-emerald-500 text-white"
                                            : "bg-white text-black hover:bg-zinc-200"
                                        }`}
                                >
                                    {copiedId === event.id ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <LinkIcon className="w-4 h-4" />
                                            Copy Link
                                        </>
                                    )}
                                </button>

                                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 transition-all border border-white/5">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>

                            <p className="text-center text-[10px] text-zinc-500 mt-3">
                                You've sold <span className="text-white font-bold">{event.sold}</span> tickets for this event.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
