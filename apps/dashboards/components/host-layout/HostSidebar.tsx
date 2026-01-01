"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    PlusCircle,
    BarChart3,
    Users,
    Handshake,
    UserCircle,
    Settings,
    LogOut,
    History,
    Globe2,
    Search
} from "lucide-react";
import { useDashboardAuth } from "../../components/providers/DashboardAuthProvider";

export default function HostSidebar() {
    const pathname = usePathname();
    const { signOut } = useDashboardAuth();

    const menuItems = [
        {
            category: "Console",
            items: [
                { icon: LayoutDashboard, label: "Command Center", href: "/host" },
            ]
        },
        {
            category: "Operations",
            items: [
                { icon: PlusCircle, label: "Create Event", href: "/host/create" },
                { icon: CalendarDays, label: "Events & Pipeline", href: "/host/events" },
                { icon: Users, label: "Promoter Network", href: "/host/promoters" },
            ]
        },
        {
            category: "Connections",
            items: [
                { icon: Globe2, label: "Discover Clubs", href: "/host/discover" },
                { icon: Handshake, label: "My Partnerships", href: "/host/partnerships" },
            ]
        },
        {
            category: "Growth & Data",
            items: [
                { icon: BarChart3, label: "Analytics", href: "/host/analytics" },
                { icon: UserCircle, label: "Public Profile", href: "/host/profile" },
            ]
        },
        {
            category: "System",
            items: [
                { icon: History, label: "Past Reviews", href: "/host/reviews" },
                { icon: Settings, label: "Settings", href: "/host/settings" },
            ]
        }
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 overflow-hidden z-50">
            {/* Brand Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="font-black text-white text-lg">H</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight leading-none">C1RCLE</h1>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Host Studio</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
                {menuItems.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                            {section.category}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive(item.href)
                                            ? "bg-white/10 text-white shadow-sm border border-white/5"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${isActive(item.href) ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/10 bg-zinc-900/50">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-bold">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
