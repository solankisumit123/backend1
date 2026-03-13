import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Loader2, Eye, EyeOff, Search } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields");
            return;
        }
        setError("");
        setLoading(true);

        try {
            await login(email.trim(), password);
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Login failed");
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
                        Welcome Back!
                    </h1>
                    <p className="text-muted-foreground font-bold">
                        Sign in to your WebInsight Pro account
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
                                📧 Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hero@example.com"
                                className="comic-input"
                                autoComplete="email"
                                id="login-email"
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
                                    placeholder="Enter your password"
                                    className="comic-input pr-12"
                                    autoComplete="current-password"
                                    id="login-password"
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
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="comic-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 text-lg"
                            id="login-submit"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <LogIn className="w-5 h-5" strokeWidth={3} />
                            )}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground font-bold text-sm">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-primary hover:underline font-bold"
                            >
                                Sign up free →
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Extra info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground font-bold">
                        🔒 Your data is safe. We never share your information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
