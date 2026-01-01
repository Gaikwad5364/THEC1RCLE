"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Filter } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: "club-hosted" | "host-hosted" | "private" | "blocked";
    hostName?: string;
    status: "confirmed" | "pending" | "cancelled";
}

// Mock events for demo
const MOCK_EVENTS: CalendarEvent[] = [
    { id: "1", title: "Techno Night", date: new Date(2026, 0, 3), type: "club-hosted", status: "confirmed" },
    { id: "2", title: "Deep House Session", date: new Date(2026, 0, 10), type: "host-hosted", hostName: "DJ Aryan", status: "confirmed" },
    { id: "3", title: "Private Corporate Event", date: new Date(2026, 0, 15), type: "private", status: "confirmed" },
    { id: "4", title: "Renovation", date: new Date(2026, 0, 20), type: "blocked", status: "confirmed" },
    { id: "5", title: "Bollywood Night (Pending)", date: new Date(2026, 0, 25), type: "host-hosted", hostName: "XYZ Events", status: "pending" },
];

const EVENT_TYPE_STYLES = {
    "club-hosted": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "host-hosted": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "private": "bg-purple-100 text-purple-700 border-purple-200",
    "blocked": "bg-slate-200 text-slate-600 border-slate-300",
};

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [events] = useState<CalendarEvent[]>(MOCK_EVENTS);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate calendar grid
    const calendarDays: (number | null)[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const getEventsForDate = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === day &&
                eventDate.getMonth() === month &&
                eventDate.getFullYear() === year
            );
        });
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Club Calendar</h1>
                    <p className="text-slate-500 text-sm mt-1">Single source of truth for all bookings and events</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filter Events
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Block Date
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Event Types:</span>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-indigo-600" />
                        <span className="text-xs font-medium text-slate-700">Club-Hosted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-600" />
                        <span className="text-xs font-medium text-slate-700">Host-Hosted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-600" />
                        <span className="text-xs font-medium text-slate-700">Private Booking</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-slate-400" />
                        <span className="text-xs font-medium text-slate-700">Blocked</span>
                    </div>
                </div>
            </div>

            {/* Calendar Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Calendar Header */}
                <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-slate-900">
                                {MONTHS[month]} {year}
                            </h2>
                            <button
                                onClick={goToToday}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Today
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPreviousMonth}
                                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5 text-slate-600" />
                            </button>
                            <button
                                onClick={goToNextMonth}
                                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                            >
                                <ChevronRight className="h-5 w-5 text-slate-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-6">

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-px mb-2">
                        {DAYS.map((day) => (
                            <div
                                key={day}
                                className="text-center py-2 text-xs font-bold text-slate-500 uppercase tracking-wider"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                        {calendarDays.map((day, index) => {
                            if (day === null) {
                                return <div key={`empty-${index}`} className="bg-slate-50 p-2 min-h-[100px]" />;
                            }

                            const dayEvents = getEventsForDate(day);
                            const isTodayDate = isToday(day);

                            return (
                                <div
                                    key={day}
                                    className={`bg-white p-2 min-h-[100px] hover:bg-slate-50 transition-colors cursor-pointer relative ${isTodayDate ? "ring-2 ring-indigo-500 ring-inset" : ""
                                        }`}
                                    onClick={() => setSelectedDate(new Date(year, month, day))}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className={`text-sm font-bold ${isTodayDate
                                                    ? "text-indigo-600"
                                                    : "text-slate-700"
                                                }`}
                                        >
                                            {day}
                                        </span>
                                        {dayEvents.length > 0 && (
                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                                {dayEvents.length}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        {dayEvents.slice(0, 2).map((event) => (
                                            <div
                                                key={event.id}
                                                className={`text-[10px] font-semibold px-2 py-1 rounded border ${EVENT_TYPE_STYLES[event.type]
                                                    } truncate`}
                                            >
                                                {event.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 2 && (
                                            <div className="text-[9px] font-bold text-slate-400 px-2">
                                                +{dayEvents.length - 2} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Upcoming Events List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                    {events
                        .filter(e => e.date >= new Date())
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .slice(0, 5)
                        .map((event) => (
                            <div
                                key={event.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase">
                                            {event.date.toLocaleDateString('en-US', { month: 'short' })}
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900">{event.date.getDate()}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{event.title}</h4>
                                        {event.hostName && (
                                            <p className="text-xs text-slate-500 mt-1">Hosted by {event.hostName}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${EVENT_TYPE_STYLES[event.type]}`}>
                                        {event.type.replace('-', ' ')}
                                    </span>
                                    {event.status === "pending" && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                                            Pending Approval
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
