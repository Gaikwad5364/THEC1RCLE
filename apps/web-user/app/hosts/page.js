"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../../components/PageShell";
import HostCard, { HostSkeleton } from "../../components/hosts/HostCard";
import { VenueCard, CardSkeleton as VenueSkeleton } from "../../components/hosts/Cards";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/providers/AuthProvider";

// --- Constants ---
const HOST_TYPES = ["DJ", "Collective"];
const MUSIC_GENRES = ["Techno", "Bollywood", "Hip-hop", "House", "Commercial", "Afro", "Trance"];
const EVENT_FORMATS = ["Open Format"];

const VENUE_AREAS = ["Koregaon Park", "Baner", "Viman Nagar", "Kalyani Nagar", "FC Road", "Hinjewadi", "Wakad", "Shivajinagar"];

const ADVANCED_FILTERS = ["Trending", "Most Followed", "New & Rising"];
const VENUE_ADVANCED_FILTERS = ["Trending", "Crowd Favorite", "Late Night"];

export default function DiscoveryPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("venues"); // "venues" | "hosts"
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    // --- Filter States (Multi-select) ---
    const [selectedFilters, setSelectedFilters] = useState({
        types: new Set(),      // Hosts: Roles
        genres: new Set(),     // Hosts: Vibes
        formats: new Set(),    // Hosts: Formats
        areas: new Set(),      // Venues: Areas
        tablesOnly: false,     // Venues: Boolean
        advanced: new Set()    // Both: Trending, etc.
    });

    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const filterDropdownRef = useRef(null);
    const filterButtonRef = useRef(null);

    // --- Click Outside Handler ---
    useEffect(() => {
        function handleClickOutside(event) {
            if (isFilterPanelOpen &&
                filterDropdownRef.current &&
                !filterDropdownRef.current.contains(event.target) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target)
            ) {
                setIsFilterPanelOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFilterPanelOpen]);

    // --- Data Fetching ---
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const endpoint = activeTab === "venues" ? "/api/venues" : "/api/hosts";
            const params = new URLSearchParams();

            if (search) params.append("search", search);

            // Combine sets for API params
            const activeTypes = Array.from(selectedFilters.types).join(",");
            const activeGenres = Array.from(selectedFilters.genres).join(",");
            const activeFormats = Array.from(selectedFilters.formats).join(",");
            const activeAreas = Array.from(selectedFilters.areas).join(",");
            const activeAdvanced = Array.from(selectedFilters.advanced).join(",");

            if (activeTab === "venues") {
                if (activeAreas) params.append("area", activeAreas);
                if (selectedFilters.tablesOnly) params.append("tablesOnly", "true");
            } else {
                if (activeTypes) params.append("role", activeTypes);
                // Combine genres and formats for 'vibe' parameter if backend expects strict mapping, 
                // or send them separately if backend supports it. Assuming 'vibe' covers both for now based on previous code.
                const combinedVibes = [activeGenres, activeFormats].filter(Boolean).join(",");
                if (combinedVibes) params.append("vibe", combinedVibes);
            }

            // Map advanced filters to sort/status params
            if (selectedFilters.advanced.has("Trending")) params.append("status", "Trending");
            if (selectedFilters.advanced.has("Most Followed")) params.append("sort", "Most followed");
            if (activeAdvanced) params.append("advanced", activeAdvanced); // Fallback for others

            const res = await fetch(`${endpoint}?${params.toString()}`);
            if (!res.ok) throw new Error(`Failed to load ${activeTab}`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [activeTab, search, selectedFilters]);

    // --- Debounce Fetch ---
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchData]);

    // --- Handlers ---
    const toggleFilter = (category, item) => {
        setSelectedFilters(prev => {
            const newSet = new Set(prev[category]);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return { ...prev, [category]: newSet };
        });
    };

    const toggleBoolean = (key) => {
        setSelectedFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const clearAll = () => {
        setSearch("");
        setSelectedFilters({
            types: new Set(),
            genres: new Set(),
            formats: new Set(),
            areas: new Set(),
            tablesOnly: false,
            advanced: new Set()
        });
    };

    const handleFollow = (id) => {
        if (!user) {
            window.dispatchEvent(new CustomEvent('OPEN_AUTH_MODAL', {
                detail: { intent: `FOLLOW_${activeTab.toUpperCase()}`, targetId: id }
            }));
            return;
        }
    };

    return (
        <PageShell>
            <div className="relative min-h-screen bg-zinc-50 dark:bg-[#0A0A0A]">

                {/* Hero Section */}
                <div className="relative pt-32 pb-12 overflow-hidden">
                    <div className="absolute inset-x-0 -top-40 -z-10 h-[500px] flex justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="w-[800px] h-[800px] bg-orange/20 rounded-full blur-[120px]"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter text-black dark:text-white"
                            >
                                Discover {activeTab}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-black/50 dark:text-white/50 text-sm md:text-lg font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto"
                            >
                                {activeTab === "venues"
                                    ? "The spaces that set the pulse. Explore Pune's finest circuits."
                                    : "Curators, DJs, collectives. Follow the people who shape the night."}
                            </motion.p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex p-1 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full w-fit mx-auto relative z-10 shadow-sm">
                            {["venues", "hosts"].map((tab) => (
                                <motion.button
                                    key={tab}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        clearAll();
                                    }}
                                    className={`relative px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab ? "text-white dark:text-black" : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                                        }`}
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="tab-pill-discovery"
                                            className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search Row - Sticky */}
                <div className="sticky top-[80px] z-40 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-y border-black/5 dark:border-white/5 py-4 shadow-sm transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search size={20} className="text-black/20 dark:text-white/20 group-focus-within:text-orange transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={`Search ${activeTab} by name, area, vibe...`}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl py-5 pl-14 pr-6 text-black dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all placeholder:text-black/30 dark:placeholder:text-white/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Row - Sticky */}
                <div className="sticky top-[174px] z-30 bg-white/50 dark:bg-[#0A0A0A]/50 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-3 shadow-xl transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">

                            {/* Filter Button - Contextual Dropdown */}
                            <div className="relative flex-shrink-0">
                                <button
                                    ref={filterButtonRef}
                                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${selectedFilters.advanced.size > 0
                                        ? "bg-black dark:bg-white text-white dark:text-black border-transparent"
                                        : "bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10"
                                        }`}
                                >
                                    <SlidersHorizontal size={14} />
                                    Filter {selectedFilters.advanced.size > 0 && `(${selectedFilters.advanced.size})`}
                                </button>

                                {/* Dropdown Box */}
                                <AnimatePresence>
                                    {isFilterPanelOpen && (
                                        <motion.div
                                            ref={filterDropdownRef}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 mt-4 z-50 w-72 bg-white dark:bg-[#121212] rounded-2xl border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden"
                                        >
                                            <div className="p-4 bg-zinc-50 dark:bg-black/40 border-b border-black/5 dark:border-white/5">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                                                    Sort & Status
                                                </h3>
                                            </div>
                                            <div className="p-2">
                                                {(activeTab === "venues" ? VENUE_ADVANCED_FILTERS : ADVANCED_FILTERS).map(filter => (
                                                    <button
                                                        key={filter}
                                                        onClick={() => toggleFilter('advanced', filter)}
                                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1 last:mb-0 ${selectedFilters.advanced.has(filter)
                                                            ? "bg-black/5 dark:bg-white/10 text-black dark:text-white font-bold"
                                                            : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 font-medium"
                                                            }`}
                                                    >
                                                        <span className="text-xs uppercase tracking-wide">{filter}</span>
                                                        {selectedFilters.advanced.has(filter) && (
                                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                                <Check size={14} className="text-orange" />
                                                            </motion.div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 flex-shrink-0" />

                            {/* Scrollable Pills Row */}
                            <div className="flex-1 overflow-x-auto pb-1 scrollbar-hide flex items-center gap-3 mask-fade-right">
                                {/* Venues specific - Tables & Areas */}
                                {activeTab === "venues" ? (
                                    <>
                                        <Pill
                                            label="Tables Available"
                                            isActive={selectedFilters.tablesOnly}
                                            onClick={() => toggleBoolean('tablesOnly')}
                                        />
                                        <Divider />
                                        {VENUE_AREAS.map(area => (
                                            <Pill
                                                key={area}
                                                label={area}
                                                isActive={selectedFilters.areas.has(area)}
                                                onClick={() => toggleFilter('areas', area)}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {/* Hosts: Types */}
                                        {HOST_TYPES.map(type => (
                                            <Pill
                                                key={type}
                                                label={type}
                                                isActive={selectedFilters.types.has(type)}
                                                onClick={() => toggleFilter('types', type)}
                                            />
                                        ))}

                                        <Divider />

                                        {/* Hosts: Genres */}
                                        {MUSIC_GENRES.map(genre => (
                                            <Pill
                                                key={genre}
                                                label={genre}
                                                isActive={selectedFilters.genres.has(genre)}
                                                onClick={() => toggleFilter('genres', genre)}
                                            />
                                        ))}

                                        <Divider />

                                        {/* Hosts: Formats */}
                                        {EVENT_FORMATS.map(format => (
                                            <Pill
                                                key={format}
                                                label={format}
                                                isActive={selectedFilters.formats.has(format)}
                                                onClick={() => toggleFilter('formats', format)}
                                            />
                                        ))}
                                    </>
                                )}

                                {/* Clear All */}
                                {hasActiveFilters(selectedFilters, search) && (
                                    <>
                                        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 flex-shrink-0" />
                                        <button
                                            onClick={clearAll}
                                            className="px-6 py-2 rounded-full bg-orange/10 border border-orange/20 text-[10px] font-black uppercase tracking-widest text-orange hover:bg-orange hover:text-white transition-all ml-2 flex-shrink-0"
                                        >
                                            Clear All
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>



                {/* Results Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {loading && results.length === 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activeTab === "hosts"
                                ? [1, 2, 3, 4, 5, 6].map(i => <HostSkeleton key={i} />)
                                : [1, 2, 3, 4, 5, 6].map(i => <VenueSkeleton key={i} />)
                            }
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center space-y-6">
                            <div className="text-orange text-4xl">⚠️</div>
                            <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight">Syncing error</h3>
                            <p className="text-black/40 dark:text-white/40 text-sm">{error}</p>
                            <button onClick={fetchData} className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest">Retry</button>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="py-32 text-center space-y-6 max-w-md mx-auto">
                            <div className="text-6xl mb-4 opacity-50">🌑</div>
                            <h3 className="text-3xl font-heading font-black text-black dark:text-white uppercase tracking-tighter">Quiet Night</h3>
                            <p className="text-black/40 dark:text-white/40 text-sm font-medium">No {activeTab} match these filters.</p>
                            <button onClick={clearAll} className="px-10 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest shadow-glow">Reset Discovery</button>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {results.map((item, idx) => (
                                    <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        {activeTab === "hosts"
                                            ? <HostCard host={item} index={idx} onFollow={handleFollow} />
                                            : <VenueCard venue={item} onFollow={handleFollow} />
                                        }
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                <Footer />
            </div>
        </PageShell>
    );
}

// --- Sub-components for cleaner render ---

function Pill({ label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all snap-center flex-shrink-0 border whitespace-nowrap ${isActive
                ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                : "bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                }`}
        >
            {label}
        </button>
    );
}

function Divider() {
    return <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 flex-shrink-0" />;
}

function hasActiveFilters(filters, search) {
    return (
        search.length > 0 ||
        filters.types.size > 0 ||
        filters.genres.size > 0 ||
        filters.formats.size > 0 ||
        filters.areas.size > 0 ||
        filters.tablesOnly ||
        filters.advanced.size > 0
    );
}
