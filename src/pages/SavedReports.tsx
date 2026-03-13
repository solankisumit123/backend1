import { useAuth } from "@/lib/AuthContext";
import { Link } from "react-router-dom";
import {
    FileText,
    Trash2,
    Shield,
    Server,
    Calendar,
    Search,
    Lock,
} from "lucide-react";

const iconMap: Record<string, any> = {
    ssl: Shield,
    dns: Server,
    whois: Calendar,
    seo: Search,
};

const SavedReports = () => {
    const { user, savedReports, deleteReport } = useAuth();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="comic-card max-w-md mx-auto animate-slide-up">
                    <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" strokeWidth={3} />
                    <h1 className="comic-heading text-3xl text-foreground mb-3">
                        Sign In Required
                    </h1>
                    <p className="text-muted-foreground font-bold mb-6">
                        You need to be signed in to view your saved reports.
                    </p>
                    <Link
                        to="/login"
                        className="comic-btn bg-primary text-primary-foreground inline-flex items-center gap-2"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-8 animate-slide-up">
                <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2">
                    📂 Saved Reports
                </h1>
                <p className="text-muted-foreground font-bold">
                    {savedReports.length} report{savedReports.length !== 1 ? "s" : ""}{" "}
                    saved
                </p>
            </div>

            {savedReports.length === 0 ? (
                <div className="comic-card text-center py-12 animate-slide-up">
                    <FileText
                        className="w-16 h-16 text-muted-foreground mx-auto mb-4"
                        strokeWidth={2}
                    />
                    <h2 className="comic-heading text-2xl text-foreground mb-2">
                        No Reports Yet
                    </h2>
                    <p className="text-muted-foreground font-bold mb-6">
                        Run an SSL, DNS, or Domain Age check and click "Save Report" to keep
                        it here.
                    </p>
                    <Link
                        to="/tools"
                        className="comic-btn bg-primary text-primary-foreground inline-flex items-center gap-2"
                    >
                        Go to Tools
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {savedReports.map((report, i) => {
                        const Icon = iconMap[report.type] || FileText;
                        return (
                            <div
                                key={report.id}
                                className="comic-card flex items-center gap-4 animate-slide-up"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 shrink-0"
                                    style={{ border: "2px solid hsl(var(--border))" }}
                                >
                                    <Icon className="w-6 h-6 text-primary" strokeWidth={3} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="comic-heading text-lg text-foreground">
                                        {report.type.toUpperCase()} — {report.domain}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-bold">
                                        Saved on{" "}
                                        {new Date(report.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>

                                <button
                                    onClick={() => deleteReport(report.id)}
                                    className="comic-btn bg-destructive/10 text-destructive p-2 shrink-0"
                                    title="Delete report"
                                >
                                    <Trash2 className="w-4 h-4" strokeWidth={3} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavedReports;
