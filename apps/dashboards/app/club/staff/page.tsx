"use client";

import { useState } from "react";
import {
    Search,
    UserPlus,
    Shield,
    Check,
    X,
    Key,
    Mail
} from "lucide-react";

export default function StaffManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Database of Staff Accounts
    const [staff, setStaff] = useState([
        {
            id: 1,
            name: "Rajesh Kumar",
            role: "Floor Manager",
            status: "Active",
            email: "rajesh@club.com",
            permissions: ["tables", "guests"] // Only Tables and Guests
        },
        {
            id: 2,
            name: "Sarah Mendoza",
            role: "Head Security",
            status: "Active",
            email: "sarah@club.com",
            permissions: ["gate", "security"] // Only Scanner and Security
        },
    ]);

    // New User Form State
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "",
        permissions: [] as string[]
    });

    const PERMISSIONS = [
        { id: "events", label: "Event Creation & Listing", desc: "Can create, edit and publish events." },
        { id: "tables", label: "Table Management", desc: "Can view and modify table status." },
        { id: "gate", label: "Gate & Security", desc: "Access to Scanner App and Guestlist." },
        { id: "finance", label: "Financials & Revenue", desc: "View daily sales and revenue reports." },
    ];

    const togglePermission = (id: string) => {
        setNewUser(prev => {
            const exists = prev.permissions.includes(id);
            if (exists) {
                return { ...prev, permissions: prev.permissions.filter(p => p !== id) };
            } else {
                return { ...prev, permissions: [...prev.permissions, id] };
            }
        });
    };

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        const newStaff = {
            id: Date.now(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: "Active",
            permissions: newUser.permissions
        };
        setStaff([...staff, newStaff]);
        setIsModalOpen(false);
        setNewUser({ name: "", email: "", role: "", permissions: [] });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Staff Access Control</h1>
                    <p className="text-slate-500 text-sm">Create accounts and assign specific dashboard permissions.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 shadow-md transition-all active:scale-95"
                >
                    <UserPlus className="w-4 h-4" /> Add Staff Member
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search staff accounts..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Staff Member</th>
                                <th className="px-6 py-3">Access Level</th>
                                <th className="px-6 py-3">Permissions Scope</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {staff.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-500">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-3 h-3 text-indigo-500" />
                                            <span className="font-medium text-slate-700">{member.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {member.permissions.map(p => (
                                                <span key={p} className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase text-slate-600">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-indigo-600 font-bold text-xs hover:underline">Edit Access</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Account Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900">Create Staff Login</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateUser} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Atharva"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                                        value={newUser.name}
                                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Event Manager"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                                        value={newUser.role}
                                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Login Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="user@club.com"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                                        value={newUser.email}
                                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Assign Authorities</label>
                                    <span className="text-xs text-slate-400">{newUser.permissions.length} Selected</span>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {PERMISSIONS.map((perm) => (
                                        <div
                                            key={perm.id}
                                            onClick={() => togglePermission(perm.id)}
                                            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${newUser.permissions.includes(perm.id)
                                                    ? "bg-indigo-50 border-indigo-200"
                                                    : "bg-white border-slate-200 hover:border-indigo-300"
                                                }`}
                                        >
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${newUser.permissions.includes(perm.id)
                                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                                    : "border-slate-300 bg-white"
                                                }`}>
                                                {newUser.permissions.includes(perm.id) && <Check className="w-3 h-3" />}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${newUser.permissions.includes(perm.id) ? "text-indigo-900" : "text-slate-700"
                                                    }`}>{perm.label}</p>
                                                <p className="text-xs text-slate-500">{perm.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                            >
                                Create Staff Account
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
