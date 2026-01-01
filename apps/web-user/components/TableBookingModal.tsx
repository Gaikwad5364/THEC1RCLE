"use client";

import { useState } from "react";
import { X, Calendar, Users, DollarSign, Clock, CheckCircle } from "lucide-react";

interface TableBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    venueName: string;
    venueId: string;
}

export default function TableBookingModal({ isOpen, onClose, venueName, venueId }: TableBookingModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("21:00");
    const [guests, setGuests] = useState(4);
    const [occasion, setOccasion] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/table-bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    venueId,
                    venueName,
                    name,
                    phone,
                    email,
                    date,
                    time,
                    guests,
                    occasion,
                    specialRequests,
                    source: "online",
                    status: "pending",
                }),
            });

            if (!response.ok) throw new Error("Booking failed");

            setStep(3); // Success screen
        } catch (error) {
            alert("Failed to submit booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-black/10 dark:border-white/10">

                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-black/10 dark:border-white/10 p-6 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-black dark:text-white">
                            {step === 3 ? "Booking Confirmed" : "Reserve a Table"}
                        </h2>
                        <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                            {step === 3 ? "We'll contact you shortly" : `at ${venueName}`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                        <X className="h-5 w-5 text-black/60 dark:text-white/60" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">

                    {/* Step 1: Contact Details */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange/50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange/50"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange/50"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Booking Details */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                    Number of Guests *
                                </label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50"
                                >
                                    {[2, 4, 6, 8, 10, 12].map((n) => (
                                        <option key={n} value={n}>{n} Guests</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                    Occasion (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange/50"
                                    placeholder="Birthday, Anniversary, etc."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">
                                    Special Requests (Optional)
                                </label>
                                <textarea
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange/50 resize-none"
                                    placeholder="Dietary restrictions, accessibility needs, etc."
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="py-12 text-center space-y-6">
                            <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mx-auto flex items-center justify-center">
                                <CheckCircle className="h-10 w-10 text-emerald-600" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-black dark:text-white">
                                    Reservation Request Sent!
                                </h3>
                                <p className="text-black/60 dark:text-white/60 max-w-md mx-auto">
                                    Our team will review your booking and contact you within 24 hours to confirm availability.
                                </p>
                            </div>

                            <div className="p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 max-w-md mx-auto space-y-3 text-left">
                                <div className="flex justify-between text-sm">
                                    <span className="text-black/60 dark:text-white/60">Venue</span>
                                    <span className="font-bold text-black dark:text-white">{venueName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-black/60 dark:text-white/60">Date & Time</span>
                                    <span className="font-bold text-black dark:text-white">
                                        {new Date(date).toLocaleDateString()} • {time}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-black/60 dark:text-white/60">Guests</span>
                                    <span className="font-bold text-black dark:text-white">{guests} pax</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-black/60 dark:text-white/60">Contact</span>
                                    <span className="font-bold text-black dark:text-white">{phone}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {step < 3 && (
                    <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-black/10 dark:border-white/10 p-6 flex gap-3">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                            >
                                Back
                            </button>
                        )}

                        {step === 1 ? (
                            <button
                                onClick={() => setStep(2)}
                                disabled={!name || !phone}
                                className="flex-1 px-6 py-3 bg-orange text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !date || !time}
                                className="flex-1 px-6 py-3 bg-orange text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-orange/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
                            >
                                {loading ? "Submitting..." : "Confirm Booking"}
                            </button>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-black/10 dark:border-white/10 p-6">
                        <button
                            onClick={onClose}
                            className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
