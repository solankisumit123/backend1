import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader2, Eye, EyeOff, Search, Check } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const passwordChecks = [
        { label: "At least 8 characters", met: password.length >= 8 },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains uppercase", met: /[A-Z]/.test(password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Please fill in all fields");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        setLoading(true);

        try {
            await signup(name.trim(), email.trim(), password);
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Search className="w-10 h-10 text-primary" strokeWidth={3} />
                    </div>
                    <h1 className="comic-heading text-4xl text-foreground mb-2">
                        Join the Squad!
                    </h1>
                    <p className="text-muted-foreground font-bold">
                        Create your free WebInsight Pro account
                    </p>
                </div>

                {/* Form Card */}
                <div className="comic-card">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div
                                className="p-3 rounded-lg bg-destructive/10 text-destructive font-bold text-sm text-center animate-slide-up"
                                style={{ border: "2px solid hsl(var(--destructive))" }}
                            >
                                ⚠️ {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 comic-heading tracking-wider">
                                🦸 Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Peter Parker"
                                className="comic-input"
                                autoComplete="name"
                                id="signup-name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 comic-heading tracking-wider">
                                📧 Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hero@example.com"
                                className="comic-input"
                                autoComplete="email"
                                id="signup-email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 comic-heading tracking-wider">
                                🔑 Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Choose a strong password"
                                    className="comic-input pr-12"
                                    autoComplete="new-password"
                                    id="signup-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            {/* Password strength indicators */}
                            {password.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    {passwordChecks.map((check) => (
                                        <div key={check.label} className="flex items-center gap-2">
                                            <Check
                                                className={`w-3.5 h-3.5 ${check.met
                                                    ? "text-secondary"
                                                    : "text-muted-foreground/30"
                                                    }`}
                                                strokeWidth={3}
                                            />
                                            <span
                                                className={`text-xs font-bold ${check.met
                                                    ? "text-secondary"
                                                    : "text-muted-foreground/50"
                                                    }`}
                                            >
                                                {check.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 comic-heading tracking-wider">
                                🔒 Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repeat your password"
                                className="comic-input"
                                autoComplete="new-password"
                                id="signup-confirm-password"
                            />
                            {confirmPassword.length > 0 && password !== confirmPassword && (
                                <p className="text-xs text-destructive font-bold mt-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="comic-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 text-lg"
                            id="signup-submit"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <UserPlus className="w-5 h-5" strokeWidth={3} />
                            )}
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground font-bold text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-primary hover:underline font-bold"
                            >
                                Sign in →
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Perks */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                        { emoji: "🚀", label: "Free plan included" },
                        { emoji: "🔒", label: "Secure & private" },
                        { emoji: "⚡", label: "Instant access" },
                    ].map((perk) => (
                        <div
                            key={perk.label}
                            className="text-center p-2 rounded-lg bg-card/50"
                            style={{ border: "2px solid hsl(var(--border) / 0.3)" }}
                        >
                            <p className="text-lg">{perk.emoji}</p>
                            <p className="text-xs text-muted-foreground font-bold">
                                {perk.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Signup;
