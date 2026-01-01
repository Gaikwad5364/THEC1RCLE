export type StaffRole =
    | 'OWNER'         // God mode
    | 'CLUB_MANAGER'  // Can do everything except destructive settings
    | 'FLOOR_MANAGER' // Can manage events, tables, entry
    | 'SECURITY'      // Can view list, scan, log incidents
    | 'TABLE_MANAGER' // Can assign tables only
    | 'OPS_STAFF';    // Can view logs only

export type Permission =
    | 'VIEW_FINANCIALS'
    | 'MANAGE_STAFF'
    | 'MANAGE_EVENTS'
    | 'EDIT_EVENT_RULES'
    | 'MANAGE_TABLES'
    | 'VIEW_GUESTLIST'
    | 'SCAN_ENTRY'
    | 'LOG_INCIDENTS'
    | 'VIEW_ANALYTICS'
    | 'MANAGE_SETTINGS';

export const ROLE_PERMISSIONS: Record<StaffRole, Permission[]> = {
    OWNER: [
        'VIEW_FINANCIALS', 'MANAGE_STAFF', 'MANAGE_EVENTS', 'EDIT_EVENT_RULES',
        'MANAGE_TABLES', 'VIEW_GUESTLIST', 'SCAN_ENTRY', 'LOG_INCIDENTS',
        'VIEW_ANALYTICS', 'MANAGE_SETTINGS'
    ],
    CLUB_MANAGER: [
        'VIEW_FINANCIALS', 'MANAGE_EVENTS', 'EDIT_EVENT_RULES', 'MANAGE_TABLES',
        'VIEW_GUESTLIST', 'SCAN_ENTRY', 'LOG_INCIDENTS', 'VIEW_ANALYTICS'
    ],
    FLOOR_MANAGER: [
        'MANAGE_EVENTS', 'MANAGE_TABLES', 'VIEW_GUESTLIST', 'SCAN_ENTRY',
        'LOG_INCIDENTS'
    ],
    TABLE_MANAGER: [
        'MANAGE_TABLES', 'VIEW_GUESTLIST'
    ],
    SECURITY: [
        'VIEW_GUESTLIST', 'SCAN_ENTRY', 'LOG_INCIDENTS'
    ],
    OPS_STAFF: [
        'view_guestlist' // Minimal
    ] as Permission[]
};

export interface StaffProfile {
    uid: string;
    email: string;
    displayName: string;
    role: StaffRole;
    clubId: string; // The venue they are attached to
    isActive: boolean;
    lastLogin: number;
}
