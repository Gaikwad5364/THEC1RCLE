"use client";

import { useState, useEffect } from "react";
import {
    Calendar,
    Users,
    Ticket,
    DollarSign,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Eye,
    Edit,
    Pause,
    Play,
    Lock,
    AlertCircle,
} from "lucide-react";
import { EventDetailsModal } from "@/components/club-layout/EventDetailsModal";
import { useDashboardAuth } from "@/components/providers/DashboardAuthProvider";

interface Event {
    id: string;
    title: string;
    date: Date;
    hostId: string;
    hostName: string;
    venueId: string;
    status: "draft" | "pending" | "approved" | "live" | "completed" | "cancelled" | "locked";
    ticketsSold: number;
    ticketsTotal: number;
    expectedCrowd: number;
    promotersEnabled: boolean;
    promotersCount?: number;
    revenue?: number;
}

// Mock data
const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        title: "Techno Bunker: Berlin Edition",
        date: new Date(2026, 0, 3),
        hostId: "host123",
        hostName: "Deep Tech India",
        venueId: "venue1",
        status: "live",
        ticketsSold: 312,
        ticketsTotal: 450,
        expectedCrowd: 450,
        promotersEnabled: true,
        promotersCount: 12,
        revenue: 468000,
    },
    {
        id: "2",
        title: "Bollywood Retro Night",
        date: new Date(2026, 0, 10),
        hostId: "host456",
        hostName: "XYZ Events",
        venueId: "venue1",
        status: "pending",
        ticketsSold: 0,
        ticketsTotal: 300,
        expectedCrowd: 300,
        promotersEnabled: true,
        promotersCount: 0,
    },
    {
        id: "3",
        title: "House Music Sundays",
        date: new Date(2025, 11, 28),
        hostId: "club",
        hostName: "Club (In-house)",
        venueId: "venue1",
        status: "completed",
        ticketsSold: 280,
        ticketsTotal: 300,
        expectedCrowd: 280,
        promotersEnabled: false,
        revenue: 420000,
    },
];

const STATUS_BADGES: Record<string, string> = {
    draft: "bg-slate-100 text-slate-600 border-slate-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-blue-100 text-blue-700 border-blue-200",
    live: "bg-emerald-100 text-emerald-700 border-emerald-200",
    completed: "bg-purple-100 text-purple-700 border-purple-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    locked: "bg-slate-200 text-slate-600 border-slate-300",
};

export default function EventsManagementPage() {
    const { profile } = useDashboardAuth();
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
    const [filter, setFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventUpdate = async (action: string, data?: any) => {
        if (!selectedEvent) return;

        try {
            const response = await fetch("/api/club/events", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId: selectedEvent.id,
                    action,
                    data,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to update event");
            }

            // Refresh events list (in production, fetch from API)
            // For now, update local state
            setEvents(prevEvents =>
                prevEvents.map(e =>
                    e.id === selectedEvent.id
                        ? { ...e, status: getNewStatus(action, e.status) as any }
                        : e
                )
            );
        } catch (error: any) {
            alert(error.message);
            throw error;
        }
    };

    const getNewStatus = (action: string, currentStatus: string) => {
        switch (action) {
            case "approve": return "approved";
            case "reject": return "cancelled";
            case "pause": return "paused";
            case "resume": return "live";
            case "lock": return "locked";
            default: return currentStatus;
        }
    };

    const handleViewEvent = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const filteredEvents = events.filter((event) => {
        const matchesFilter = filter === "all" || event.status === filter;
        const matchesSearch =
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.hostName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const liveEvents = events.filter((e) => e.status === "live").length;
    const pendingApprovals = events.filter((e) => e.status === "pending").length;
    const completedThisMonth = events.filter(
        (e) => e.status === "completed" && e.date.getMonth() === new Date().getMonth()
    ).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Events Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Full lifecycle control from draft to post-event review
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-sm">
                    <Plus className="h-4 w-4" />
                    Create Event
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <Play className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Live Now
                        </p>
                        <p className="text-2xl font-bold text-slate-900">{liveEvents}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Pending Approval
                        </p>
                        <p className="text-2xl font-bold text-slate-900">{pendingApprovals}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                        <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Completed (Month)
                        </p>
                        <p className="text-2xl font-bold text-slate-900">{completedThisMonth}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Total Revenue
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                            ₹{(events.reduce((sum, e) => sum + (e.revenue || 0), 0) / 100000).toFixed(1)}L
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by event name or host..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {["all", "live", "pending", "approved", "completed", "locked"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === status
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
                        <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-semibold">No events found</p>
                    </div>
                ) : (
                    filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                {/* Event Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-1">
                                                Hosted by{" "}
                                                <span className="font-semibold text-indigo-600">
                                                    {event.hostName}
                                                </span>
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${STATUS_BADGES[event.status]
                                                }`}
                                        >
                                            {event.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-600">
                                                {event.date.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Ticket className="h-4 w-4 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-600">
                                                {event.ticketsSold}/{event.ticketsTotal} sold
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-600">
                                                {event.expectedCrowd} expected
                                            </span>
                                        </div>

                                        {event.revenue && (
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm font-medium text-slate-600">
                                                    ₹{(event.revenue / 1000).toFixed(0)}K
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                                        <Eye className="h-4 w-4" />
                                    </button>

                                    {event.status !== "locked" && event.status !== "completed" && (
                                        <button className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    )}

                                    {event.status === "live" && (
                                        <button className="p-2.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                                            <Pause className="h-4 w-4" />
                                        </button>
                                    )}

                                    {event.status === "completed" && (
                                        <button className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                                            <Lock className="h-4 w-4" />
                                        </button>
                                    )}

                                    <button className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
