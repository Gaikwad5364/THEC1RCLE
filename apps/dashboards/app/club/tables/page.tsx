"use client";

import { useState } from "react";
import { Users, Armchair, Clock } from "lucide-react";

export default function TableManagementPage() {
    // Mock Table Data
    const [tables, setTables] = useState([
        { id: "VIP-1", capacity: 8, status: "occupied", guests: 6, server: "Rajesh" },
        { id: "VIP-2", capacity: 8, status: "reserved", guests: 0, server: "Unassigned" },
        { id: "VIP-3", capacity: 6, status: "free", guests: 0, server: "Unassigned" },
        { id: "VIP-4", capacity: 6, status: "free", guests: 0, server: "Unassigned" },
        { id: "VIP-5", capacity: 10, status: "occupied", guests: 9, server: "Sarah" },
        { id: "ST-1", capacity: 4, status: "free", guests: 0, server: "Unassigned" },
        { id: "ST-2", capacity: 4, status: "free", guests: 0, server: "Unassigned" },
        { id: "ST-3", capacity: 4, status: "cleaning", guests: 0, server: "Mike" },
    ]);

    const toggleStatus = (id: string) => {
        setTables(tables.map(t => {
            if (t.id !== id) return t;
            // Cycle status: free -> reserved -> occupied -> cleaning -> free
            const order = ["free", "reserved", "occupied", "cleaning"];
            const nextIndex = (order.indexOf(t.status) + 1) % order.length;
            return { ...t, status: order[nextIndex] };
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Table Management</h1>
                    <p className="text-slate-500 text-sm">Real-time floor view. Click a table to cycle status.</p>
                </div>
                <div className="flex gap-2">
                    {["free", "reserved", "occupied", "cleaning"].map(status => (
                        <div key={status} className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold capitalize">
                            <span className={`w-2 h-2 rounded-full ${status === "free" ? "bg-slate-400" :
                                    status === "reserved" ? "bg-amber-500" :
                                        status === "occupied" ? "bg-red-500" : "bg-blue-500"
                                }`} />
                            {status}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tables.map((table) => (
                    <button
                        key={table.id}
                        onClick={() => toggleStatus(table.id)}
                        className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center gap-3 h-48 ${table.status === "free" ? "bg-slate-50 border-slate-200" :
                                table.status === "reserved" ? "bg-amber-50 border-amber-200" :
                                    table.status === "occupied" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
                            }`}
                    >
                        <div className={`p-3 rounded-full ${table.status === "free" ? "bg-slate-200 text-slate-500" :
                                table.status === "reserved" ? "bg-amber-100 text-amber-600" :
                                    table.status === "occupied" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                            }`}>
                            <Armchair className="w-8 h-8" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-black text-slate-900">{table.id}</h3>
                            <p className="text-xs font-bold uppercase tracking-wider opacity-60">{table.status}</p>
                        </div>

                        {table.status === "occupied" && (
                            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 text-xs font-medium text-slate-600">
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {table.guests}/{table.capacity}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 1h 20m</span>
                            </div>
                        )}
                        {table.status === "free" && (
                            <span className="text-xs text-slate-400">{table.capacity} Seater</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
