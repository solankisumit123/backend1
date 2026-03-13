import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────
export interface User {
    id: string;
    email: string;
    name: string;
    plan: "free" | "pro" | "business";
    avatarUrl?: string;
    createdAt: string;
}

export interface SavedReport {
    id: string;
    type: "ssl" | "dns" | "whois" | "seo";
    domain: string;
    data: any;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updatePlan: (plan: User["plan"]) => void;
    savedReports: SavedReport[];
    saveReport: (report: Omit<SavedReport, "id" | "createdAt">) => void;
    deleteReport: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Persistence helpers ─────────────────────────────────────
const STORAGE_KEY = "webinsight_auth";
const REPORTS_KEY = "webinsight_reports";
const USERS_KEY = "webinsight_users";

interface StoredUser extends User {
    passwordHash: string;
}

function getStoredUsers(): StoredUser[] {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
        return [];
    }
}

function setStoredUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Simple hash for demo purposes (NOT production-safe)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash.toString(36);
}

// ─── Provider ────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [savedReports, setSavedReports] = useState<SavedReport[]>([]);

    // Restore session on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as User;
                setUser(parsed);
                // Load reports
                const reports = localStorage.getItem(`${REPORTS_KEY}_${parsed.id}`);
                if (reports) setSavedReports(JSON.parse(reports));
            }
        } catch {
            // invalid data, ignore
        }
        setLoading(false);
    }, []);

    // Persist reports when they change
    useEffect(() => {
        if (user) {
            localStorage.setItem(
                `${REPORTS_KEY}_${user.id}`,
                JSON.stringify(savedReports)
            );
        }
    }, [savedReports, user]);

    const login = async (email: string, password: string) => {
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));

        const users = getStoredUsers();
        const found = users.find(
            (u) => u.email === email && u.passwordHash === simpleHash(password)
        );

        if (!found) {
            throw new Error("Invalid email or password");
        }

        const { passwordHash: _, ...safeUser } = found;
        setUser(safeUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

        // Load reports
        const reports = localStorage.getItem(`${REPORTS_KEY}_${safeUser.id}`);
        if (reports) setSavedReports(JSON.parse(reports));
    };

    const signup = async (name: string, email: string, password: string) => {
        await new Promise((r) => setTimeout(r, 800));

        const users = getStoredUsers();

        if (users.find((u) => u.email === email)) {
            throw new Error("An account with this email already exists");
        }

        const newUser: StoredUser = {
            id: crypto.randomUUID(),
            email,
            name,
            plan: "free",
            createdAt: new Date().toISOString(),
            passwordHash: simpleHash(password),
        };

        setStoredUsers([...users, newUser]);

        const { passwordHash: _, ...safeUser } = newUser;
        setUser(safeUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
        setSavedReports([]);
    };

    const logout = () => {
        setUser(null);
        setSavedReports([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const updatePlan = (plan: User["plan"]) => {
        if (!user) return;
        const updated = { ...user, plan };
        setUser(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Also update in stored users
        const users = getStoredUsers();
        const idx = users.findIndex((u) => u.id === user.id);
        if (idx >= 0) {
            users[idx] = { ...users[idx], plan };
            setStoredUsers(users);
        }
    };

    const saveReport = (report: Omit<SavedReport, "id" | "createdAt">) => {
        if (!user) return;

        const maxReports = user.plan === "free" ? 0 : user.plan === "pro" ? 50 : Infinity;
        if (savedReports.length >= maxReports) {
            throw new Error(
                user.plan === "free"
                    ? "Upgrade to Pro to save reports"
                    : "Report limit reached for your plan"
            );
        }

        const newReport: SavedReport = {
            ...report,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setSavedReports((prev) => [newReport, ...prev]);
    };

    const deleteReport = (id: string) => {
        setSavedReports((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                updatePlan,
                savedReports,
                saveReport,
                deleteReport,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
