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
    const { signOut, profile } = useDashboardAuth();

    const isActive = (path: string) => pathname === path;

    // Define Permission Scope
    // Manager has access to everything by default (permissions undefined or empty implies full access if role is manager)
    // If permissions array exists, we filter.

    // Mapping Permissions to Paths/Labels
    const hasPermission = (required: string | null) => {
        if (!profile) return false;
        if (profile.role === 'club_manager') return true; // Super Admin for Club
        if (!profile.permissions) return false; // Staff with no perms
        // If checking generic access (null), return true
        if (!required) return true;
        return profile.permissions.includes(required);
    };

    const filterMenu = (groups: typeof MENU_GROUPS) => {
        return groups.map(group => {
            const filteredItems = group.items.filter(item => {
                // Map items to permission keys
                if (group.label === "Analytics & Data") return hasPermission("finance");
                if (group.label === "Connections") return hasPermission("finance"); // or new 'connect' perm

                if (item.label === "Calendar") return hasPermission("events");
                if (item.label === "Events") return hasPermission("events");
                if (item.label === "Page Management") return hasPermission("events");

                if (item.label === "Table Management") return hasPermission("tables");

                if (item.label === "Gate & Security") return hasPermission("gate");
                if (item.label === "Ops Registers") return hasPermission("gate");

                if (group.label === "Administration") return profile?.role === 'club_manager'; // Only Manager can see Admin

                return true; // Default visible (Dashboard etc)
            });
            return { ...group, items: filteredItems };
        }).filter(g => g.items.length > 0);
    };

    // Force visible for now to fix missing menu
    const visibleGroups = MENU_GROUPS; // filterMenu(MENU_GROUPS);

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
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                            {profile?.role === 'club_manager' ? 'Club OS' : 'Staff Access'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
                {visibleGroups.map((group, idx) => (
                    <div key={idx}>
                        <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            {group.label}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item, i) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <item.icon className={`h-4 w-4 ${active ? "text-indigo-200" : "text-slate-500 group-hover:text-slate-400"}`} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {profile?.email?.[0] || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{profile?.email || 'User'}</p>
                        <p className="text-xs text-slate-500 truncate capitalize">{profile?.role?.replace('_', ' ') || 'Staff'}</p>
                    </div>
                </div>
                <button
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
