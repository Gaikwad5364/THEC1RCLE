"use client";

import { useState } from "react";
import { useDashboardAuth } from "@/components/providers/DashboardAuthProvider";
import { useRouter } from "next/navigation";
import { Building2, Mail, Lock, AlertCircle, ChevronDown, UserCircle, Users } from "lucide-react";

type UserType = "club" | "host" | "promoter";
type StaffRole = "manager" | "staff";

export default function LoginPage() {
    const { signIn, loading: authLoading } = useDashboardAuth();
    const router = useRouter();

    // Form State
    const [userType, setUserType] = useState<UserType>("club");
    const [staffRole, setStaffRole] = useState<StaffRole>("manager");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signIn(email, password);

            // Logic to redirect based on User Type selection
            // Note: In a real scenario, we should also verify if the user's profile role matches the selection.
            // For now, we route them to the dashboard they requested. Access Guards will handle permission denials.

            if (userType === "club") {
                router.push("/club");
            } else if (userType === "host") {
                router.push("/host");
            } else if (userType === "promoter") {
                router.push("/promoter");
            }

        } catch (err: any) {
            setError(err.message || "Invalid credentials. Please try again.");
            setLoading(false); // Only stop loading on error, otherwise keep loading during redirect
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 z-0" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <Building2 className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white text-2xl font-bold tracking-tight">c1rcle</h1>
                            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Dashboards</p>
                        </div>
                    </div>

                    <div className="space-y-6 max-w-md">
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            One Platform.<br />
                            <span className="text-indigo-400">Every Role.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Seamlessly switch between Club Management, Host Operations, and Promoter Tools.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-slate-500">
                    © 2026 c1rcle. All rights reserved.
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-slate-900 text-xl font-bold">c1rcle</h1>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Dashboards</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
                            <p className="text-slate-500 text-sm">Select your role and sign in to continue.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">

                            {/* Role Selection Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Primary Role Select */}
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        I am a
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-600" />
                                        <select
                                            value={userType}
                                            onChange={(e) => setUserType(e.target.value as UserType)}
                                            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium transition-all cursor-pointer"
                                        >
                                            <option value="club">Club Venue</option>
                                            <option value="host">Event Host</option>
                                            <option value="promoter">Promoter</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Secondary Role Select (Hidden for Promoter) */}
                                {userType !== "promoter" && (
                                    <div className="col-span-2 animate-in fade-in slide-in-from-top-1">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            Login As
                                        </label>
                                        <div className="relative">
                                            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-600" />
                                            <select
                                                value={staffRole}
                                                onChange={(e) => setStaffRole(e.target.value as StaffRole)}
                                                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium transition-all cursor-pointer"
                                            >
                                                <option value="manager">{userType === 'club' ? 'Manager / Owner' : 'Host Owner'}</option>
                                                <option value="staff">{userType === 'club' ? 'Staff Member' : 'Staff Member'}</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <hr className="border-slate-100" />

                            {/* Credentials */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                        placeholder={userType === 'club' ? "manager@club.com" : userType === 'host' ? "host@events.com" : "promoter@agency.com"}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || authLoading}
                                className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    "Signing In..."
                                ) : (
                                    <>
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <a href="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs font-medium text-slate-400">
                        Need an account? <span className="text-slate-500">Contact platform support.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
