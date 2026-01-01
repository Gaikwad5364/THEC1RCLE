import {
    LayoutDashboard,
    CalendarDays,
    GlassWater,
    Users,
    ClipboardList,
    ShieldCheck,
    Settings,
    LogOut,
    Building2,
    Armchair,
    ImageIcon,
    Activity,
    LineChart,
    UserCheck,
    Handshake,
    Inbox,
    History
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardAuth } from "../providers/DashboardAuthProvider";

const MENU_GROUPS = [
    {
        label: "Overview",
        items: [
            { label: "Dashboard", href: "/club", icon: LayoutDashboard },
        ]
    },
    {
        label: "Analytics & Data",
        items: [
            { label: "Live Operations", href: "/club/analytics/live", icon: Activity },
            { label: "Event Insights", href: "/club/analytics/events", icon: LineChart },
            { label: "Host Performance", href: "/club/analytics/hosts", icon: UserCheck },
            { label: "Full History", href: "/club/analytics/history", icon: History },
        ]
    },
    {
        label: "Connections",
        items: [
            { label: "Partner Requests", href: "/club/connections/requests", icon: Inbox },
            { label: "Active Partners", href: "/club/connections/partners", icon: Handshake },
        ]
    },
    {
        label: "Event Management",
        items: [
            { label: "Calendar", href: "/club/calendar", icon: CalendarDays },
            { label: "Events", href: "/club/events", icon: GlassWater },
            { label: "Table Management", href: "/club/tables", icon: Armchair },
            { label: "Page Management", href: "/club/page-management", icon: ImageIcon },
        ]
    },
    {
        label: "Operations",
        items: [
            { label: "Gate & Security", href: "/club/security", icon: ShieldCheck },
            { label: "Ops Registers", href: "/club/registers", icon: ClipboardList },
        ]
    },
    {
        label: "Administration",
        items: [
            { label: "Staff Access", href: "/club/staff", icon: Users },
            { label: "Settings", href: "/club/settings", icon: Settings },
        ]
    }
];

export function ClubSidebar({ className = "" }: { className?: string }) {
    const pathname = usePathname();
    const { signOut } = useDashboardAuth();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className={`flex flex-col h-full bg-slate-900 text-white ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                        <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight">Tryst Mumbai</h1>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Club OS</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
                {MENU_GROUPS.map((group, idx) => (
                    <div key={idx}>
                        <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            {group.label}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${active
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <Icon className={`h-5 w-5 ${active ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
