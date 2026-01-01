const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
const auth = admin.auth();

async function createTestStaff() {
    const email = "atharva@thec1rcle.com";
    const password = "Staff123!";
    const displayName = "Atharva Manager";
    const clubId = "VEN-123"; // Assuming Tryst Mumbai exists or using mock ID
    const role = "club_staff";

    // Define granular permissions
    // Available: 'events', 'tables', 'gate', 'finance'
    const permissions = ["events", "tables"];

    try {
        // 1. Check if user exists
        let userRecord;
        try {
            userRecord = await auth.getUserByEmail(email);
            console.log("User already exists:", userRecord.uid);
        } catch (e) {
            if (e.code === 'auth/user-not-found') {
                // Create user
                userRecord = await auth.createUser({
                    email,
                    password,
                    displayName,
                });
                console.log("Created new user:", userRecord.uid);
            } else {
                throw e;
            }
        }

        // 2. Set Custom Claims (Optional but good for security rules)
        await auth.setCustomUserClaims(userRecord.uid, { role, clubId });

        // 3. Create/Update Firestore Document
        await db.collection("users").doc(userRecord.uid).set({
            email,
            displayName,
            role,
            permissions,
            clubId,
            staffRole: "EVENT_MANAGER", // Label
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        console.log(`\nSUCCESS! Created Staff Account: ${email}`);
        console.log(`Role: ${role}`);
        console.log(`Permissions: ${permissions.join(", ")}`);
        console.log("\nYou can now login with these credentials to test restricted access.");

    } catch (error) {
        console.error("Error creating staff user:", error);
    }
}

createTestStaff();
