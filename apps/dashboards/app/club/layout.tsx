"use client";

import { ClubSidebar } from "@/components/club-layout/ClubSidebar";
import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";

export default function ClubDashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 fixed inset-y-0 z-50">
                <ClubSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">

                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-4 lg:hidden">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-6 w-6 text-slate-600" />
                    </button>
                    <span className="font-bold text-slate-900">Club OS</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                        <div className="absolute inset-y-0 left-0 w-72 bg-slate-900">
                            <ClubSidebar />
                        </div>
                    </div>
                )}

                {/* Top Bar (Desktop) */}
                <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wide">System Online</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-slate-600">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                <User className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="text-sm">
                                <p className="font-bold text-slate-900 leading-none">Aryan K.</p>
                                <p className="text-xs text-slate-500 mt-0.5">Manager</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
