import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, AlertTriangle, Clock, ShieldCheck, Zap } from "lucide-react";
import AdBanner from "../../components/AdBanner";

const PasswordStrength = () => {
    const [password, setPassword] = useState("");

    const calculateStrength = (pwd: string) => {
        let score = 0;
        const feedback = [];
        let timeToCrack = "Instant";

        if (!pwd) return { score, timeToCrack, feedback: [], label: "", color: "" };

        if (pwd.length >= 8) score += 20;
        else feedback.push("Use at least 8 characters.");

        if (pwd.length >= 12) score += 10;
        if (pwd.length >= 16) score += 10;

        if (/[a-z]/.test(pwd)) score += 10;
        else feedback.push("Add lowercase letters.");

        if (/[A-Z]/.test(pwd)) score += 15;
        else feedback.push("Add uppercase letters.");

        if (/\d/.test(pwd)) score += 15;
        else feedback.push("Include numbers.");

        if (/[^a-zA-Z0-9]/.test(pwd)) score += 20;
        else feedback.push("Use symbols (!@#$%^&*).");

        // Time to crack estimation (highly simplified visualization)
        if (score < 40) timeToCrack = "Instantly";
        else if (score < 60) timeToCrack = "Minutes";
        else if (score < 80) timeToCrack = "Days to Months";
        else if (score < 100) timeToCrack = "Years";
        else timeToCrack = "Centuries";

        let label = "Very Weak";
        let color = "bg-destructive";
        if (score >= 40) { label = "Weak"; color = "bg-comic-orange"; }
        if (score >= 60) { label = "Good"; color = "bg-comic-blue"; }
        if (score >= 80) { label = "Strong"; color = "bg-primary"; }
        if (score === 100) { label = "Unbreakable!"; color = "bg-comic-green"; }

        return { score: Math.min(100, score), timeToCrack, feedback, label, color };
    };

    const str = calculateStrength(password);

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🛡️ Password Strength</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Test your password's defense level against brute-force attacks.</p>

            <div className="comic-card mb-6">
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type a password to test..."
                    className="comic-input w-full text-lg mb-6 font-mono"
                />

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1 font-bold text-sm">
                        <span className="uppercase text-muted-foreground tracking-wider">Strength Score</span>
                        <span className={`px-2 py-0.5 rounded-full text-white text-xs ${str.color}`}>
                            {str.score > 0 ? str.label : "Empty"}
                        </span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden border-2 border-border" style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}>
                        <div className={`h-full ${str.color} transition-all duration-300 font-bold`} style={{ width: `${str.score}%` }}></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-3 bg-muted/30 rounded-xl border-2 border-border flex items-center gap-3">
                        <Clock className={`w-8 h-8 ${str.score >= 80 ? 'text-comic-green' : 'text-comic-red'}`} strokeWidth={3} />
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Estimated Time<br />to Crack</p>
                            <p className="font-mono text-foreground font-bold">{password ? str.timeToCrack : "-"}</p>
                        </div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl border-2 border-border flex items-center gap-3">
                        {str.score >= 80 ? <ShieldCheck className="w-8 h-8 text-comic-green" strokeWidth={3} /> : <AlertTriangle className="w-8 h-8 text-comic-orange" strokeWidth={3} />}
                        <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Overall<br />Safety</p>
                            <p className="font-mono text-foreground font-bold">{str.score}/100</p>
                        </div>
                    </div>
                </div>

                {password && str.feedback.length > 0 && (
                    <div className="mt-8 pt-6 border-t-[3px] border-border animate-slide-up">
                        <h4 className="font-bold flex items-center gap-2 mb-3 text-destructive">
                            <Zap className="w-4 h-4 fill-current" /> How to improve:
                        </h4>
                        <ul className="space-y-2">
                            {str.feedback.map((f, i) => (
                                <li key={i} className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-destructive"></div> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
</div>
            <p className="text-center text-xs text-muted-foreground font-bold mt-4">We do not store or transmit any passwords. Testing runs 100% in your browser.</p>

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3225557692" dataAdFormat="auto" />
      <AdBanner dataAdSlot="3225557692" dataAdFormat="rectangle" />

        </div>
    );
};

export default PasswordStrength;
