import { NextRequest, NextResponse } from "next/server";
import { getFirebaseDb } from "@/lib/firebase/client";
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";

export async function POST(req: NextRequest) {
    try {
        const { email, displayName, role, clubId } = await req.json();

        // Validation
        if (!email || !displayName || !role || !clubId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const db = getFirebaseDb();

        // Check if staff with this email already exists for this club
        const staffRef = collection(db, "venues", clubId, "staff");
        const existingQuery = query(staffRef, where("email", "==", email));
        const existingStaff = await getDocs(existingQuery);

        if (!existingStaff.empty) {
            return NextResponse.json(
                { error: "Staff member with this email already exists" },
                { status: 409 }
            );
        }

        // Create new staff document
        const newStaffRef = doc(collection(db, "venues", clubId, "staff"));
        const staffData = {
            uid: newStaffRef.id, // Temporary until they set up account
            email,
            displayName,
            role,
            isActive: true,
            invitedAt: Date.now(),
            lastLogin: null,
            clubId,
        };

        await setDoc(newStaffRef, staffData);

        // TODO: Send invitation email using Resend or SendGrid
        // await sendStaffInvitation(email, displayName, clubId);

        return NextResponse.json({
            success: true,
            staffId: newStaffRef.id,
            message: "Staff member added successfully",
        });

    } catch (error: any) {
        console.error("Error adding staff:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const clubId = searchParams.get("clubId");

        if (!clubId) {
            return NextResponse.json(
                { error: "clubId is required" },
                { status: 400 }
            );
        }

        const db = getFirebaseDb();
        const staffRef = collection(db, "venues", clubId, "staff");
        const snapshot = await getDocs(staffRef);

        const staffList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ staff: staffList });

    } catch (error: any) {
        console.error("Error fetching staff:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
