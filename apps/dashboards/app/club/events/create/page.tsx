"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Calendar,
    MapPin,
    Upload,
    Plus,
    Trash2,
    DollarSign,
    Save,
    ArrowRight
} from "lucide-react";

export default function CreateEventPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        venue: "Main Hall",
        capacity: 500
    });

    const [tickets, setTickets] = useState([
        { id: 1, name: "Early Bird", price: 500, quantity: 50 },
        { id: 2, name: "General Admission", price: 1000, quantity: 300 }
    ]);

    const addTicket = () => {
        setTickets([...tickets, { id: Date.now(), name: "VIP", price: 2000, quantity: 50 }]);
    };

    const removeTicket = (id: number) => {
        setTickets(tickets.filter(t => t.id !== id));
    };

    const handleTicketChange = (id: number, field: string, value: any) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Use a toast library in real app, alert for now
        // alert("Event Created Successfully!");

        router.push("/club/events");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Create New Event</h1>
                    <p className="text-slate-500 text-sm">Set up your event details and ticket tiers.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Publishing..." : "Publish Event"}
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Event Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Event Details</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Event Title</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Techno Bunker: Berlin Edition"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="date"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Start Time</label>
                                <input
                                    required
                                    type="time"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    value={formData.startTime}
                                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description</label>
                            <textarea
                                rows={4}
                                placeholder="Describe the vibe, lineup, and dress code..."
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Ticket Tiers */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-slate-900">Ticket Strategy</h2>
                            <button
                                type="button"
                                onClick={addTicket}
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add Tier
                            </button>
                        </div>

                        <div className="space-y-3">
                            {tickets.map((ticket, index) => (
                                <div key={ticket.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                                    <div className="flex-1 grid grid-cols-12 gap-3">
                                        <div className="col-span-5">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Tier Name</label>
                                            <input
                                                type="text"
                                                value={ticket.name}
                                                onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)}
                                                className="w-full bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none font-bold text-slate-900 placeholder-slate-400"
                                                placeholder="Tier Name"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Price (₹)</label>
                                            <input
                                                type="number"
                                                value={ticket.price}
                                                onChange={(e) => handleTicketChange(ticket.id, 'price', parseInt(e.target.value))}
                                                className="w-full bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none font-bold text-slate-900"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Qty</label>
                                            <input
                                                type="number"
                                                value={ticket.quantity}
                                                onChange={(e) => handleTicketChange(ticket.id, 'quantity', parseInt(e.target.value))}
                                                className="w-full bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none font-bold text-slate-900"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeTicket(ticket.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Media */}
                <div className="space-y-6">
                    {/* Media Upload */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Event Poster</h2>
                        <div className="aspect-[4/5] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer group">
                            <Upload className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform text-slate-300 group-hover:text-indigo-500" />
                            <p className="text-sm font-bold group-hover:text-indigo-600">Click to Upload</p>
                            <p className="text-xs">1080x1350 (4:5)</p>
                        </div>
                    </div>

                    {/* Quick Settings */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-slate-900">Settings</h2>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Allow Promoters</span>
                            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-indigo" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Public Listings</span>
                            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-indigo" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Allow Guestlist</span>
                            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-indigo" />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
