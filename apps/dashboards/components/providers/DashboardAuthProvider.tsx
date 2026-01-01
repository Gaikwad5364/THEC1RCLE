"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase/client";
import { StaffRole } from "@/lib/rbac/types";

interface DashboardProfile {
    uid: string;
    email: string;
    displayName: string;
    role: "club_manager" | "host" | "promoter" | "staff";

    // Club-specific data
    clubId?: string;
    clubName?: string;
    staffRole?: StaffRole;

    // Host-specific data
    hostId?: string;

    // Promoter-specific data
    promoterId?: string;
}

interface AuthContextValue {
    user: User | null;
    profile: DashboardProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function DashboardAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<DashboardProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getFirebaseAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    // Fetch user profile from Firestore
                    const db = getFirebaseDb();
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();

                        // Build profile based on role
                        const dashboardProfile: DashboardProfile = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email || "",
                            displayName: userData.displayName || userData.username || "User",
                            role: userData.role || "user",
                        };

                        // If they are club staff, fetch club info
                        if (userData.role === "club_manager" || userData.role === "staff") {
                            const clubId = userData.clubId;
                            if (clubId) {
                                const clubDoc = await getDoc(doc(db, "venues", clubId));
                                if (clubDoc.exists()) {
                                    dashboardProfile.clubId = clubId;
                                    dashboardProfile.clubName = clubDoc.data().name;
                                    dashboardProfile.staffRole = userData.staffRole || "CLUB_MANAGER";
                                }
                            }
                        }

                        // If they are a host
                        if (userData.role === "host") {
                            dashboardProfile.hostId = userData.hostId || firebaseUser.uid;
                        }

                        // If they are a promoter
                        if (userData.role === "promoter") {
                            dashboardProfile.promoterId = userData.promoterId || firebaseUser.uid;
                        }

                        setProfile(dashboardProfile);
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const auth = getFirebaseAuth();
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        const auth = getFirebaseAuth();
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useDashboardAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useDashboardAuth must be used within DashboardAuthProvider");
    }
    return context;
}
