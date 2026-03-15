import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, RefreshCw, Shield } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";


const PasswordGenerator = () => {
    const [length, setLength] = useState(16);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const generate = () => {
        let chars = "";
        if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
        if (useNumbers) chars += "0123456789";
        if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
        if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        const pw = Array.from(array, (n) => chars[n % chars.length]).join("");
        setPassword(pw);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrength = () => {
        if (length < 8) return { label: "Weak", color: "text-comic-red", pct: 25 };
        if (length < 12) return { label: "Medium", color: "text-comic-orange", pct: 50 };
        if (length < 16) return { label: "Strong", color: "text-comic-blue", pct: 75 };
        return { label: "Very Strong", color: "text-comic-green", pct: 100 };
    };

    const strength = getStrength();

    if (!password) generate();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔐 Password Generator</h1>

            <div className="comic-card mb-6">
                {/* Password Display */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="comic-input flex-1 font-mono text-lg break-all" style={{ cursor: "default", minHeight: "48px" }}>
                        {password}
                    </div>
                    <button onClick={handleCopy} className="comic-btn bg-card text-foreground p-3" title="Copy">
                        {copied ? <CheckCircle className="w-5 h-5 text-secondary" strokeWidth={3} /> : <Copy className="w-5 h-5" strokeWidth={3} />}
                    </button>
                    <button onClick={generate} className="comic-btn bg-primary text-primary-foreground p-3" title="Regenerate">
                        <RefreshCw className="w-5 h-5" strokeWidth={3} />
                    </button>
                </div>

                {/* Strength bar */}
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Strength</span>
                        <span className={`text-xs font-extrabold uppercase ${strength.color}`}>{strength.label}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted" style={{ border: "2px solid hsl(var(--border))" }}>
                        <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${strength.pct}%` }}></div>
                    </div>
                </div>

                {/* Length */}
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Length: {length}</label>
                <input type="range" min={4} max={64} value={length} onChange={(e) => { setLength(Number(e.target.value)); }} className="w-full mb-4" />

                {/* Options */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: "Uppercase (A-Z)", value: useUpper, set: setUseUpper },
                        { label: "Lowercase (a-z)", value: useLower, set: setUseLower },
                        { label: "Numbers (0-9)", value: useNumbers, set: setUseNumbers },
                        { label: "Symbols (!@#$)", value: useSymbols, set: setUseSymbols },
                    ].map((opt) => (
                        <label key={opt.label} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <input type="checkbox" checked={opt.value} onChange={(e) => opt.set(e.target.checked)} className="w-4 h-4" />
                            <span className="text-sm font-bold text-foreground">{opt.label}</span>
                        </label>
                    ))}
                </div>

                <button onClick={generate} className="comic-btn bg-secondary text-secondary-foreground w-full mt-4 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" strokeWidth={3} /> Generate New Password
                </button>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Secure Password Generator - Create Strong Passwords Online"
                description="Generate secure, random passwords with customizable length and character sets. 100% private, browser-based, and highly secure. Protect your accounts today."
                keywords="password generator, secure passwords, random password maker, strong password creator, offline password generator"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Password Generator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "SecurityApplication"
                }}
            />

            <SEOSection
                title="Instant Military-Grade Secure Password Generator"
                subtitle="Protect Your Digital Accounts from Brute-Force Attacks"
                description="In an era of increasing data breaches, using 'password123' is no longer enough. WebInsight Pro's Secure Password Generator uses your browser's cryptographically secure random number generation (CSPRNG) to create passwords that are virtually impossible to crack. We don't save your passwords, and they are never sent to a server—complete privacy by design."
                howToUse={[
                    "Adjust the 'Length' slider to your desired character count (min 16 recommended).",
                    "Toggle the checkboxes to include 'Uppercase', 'Numbers', and 'Symbols'.",
                    "The tool generates a password automatically on page load.",
                    "Click 'Generate New Password' for another variation.",
                    "Click the 'Copy' icon to instantly save it to your clipboard."
                ]}
                features={[
                    "Client-Side Security: No data leaves your machine; everything happens in RAM.",
                    "Entropy Analysis: Live strength indicator (Weak, Medium, Strong, Very Strong).",
                    "High Entropy: Supports up to 64 character long complex strings.",
                    "Special Characters: Includes symbols like @, #, $, and % for maximum security.",
                    "Fast & Fluid: Simple 'Refresh' button for instant regeneration."
                ]}
                faqs={[
                    {
                        question: "Why should I use a long password?",
                        answer: "The length of a password increases its 'entropy'. A 16-character password with letters, numbers, and symbols would take billions of years for a hacker to crack using modern computers."
                    },
                    {
                        question: "Are my passwords saved on your server?",
                        answer: "Never. We use the 'crypto.getRandomValues()' API which runs directly inside your web browser. We have no way to see or store the passwords you generate."
                    },
                    {
                        question: "What makes a password 'Strong'?",
                        answer: "A strong password contains a mix of different character types and is at least 12 characters long. Our tool guides you to achieve this with the live strength bar."
                    }
                ]}
                relatedTools={[
                    { name: "Password Strength", emoji: "⚡", path: "/tools/password-strength" },
                    { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
                    { name: "Hash Generator", emoji: "🔑", path: "/tools/hash-generator" },
                    { name: "CC Validator", emoji: "💳", path: "/tools/cc-validator" }
                ]}
            />
        </div>
    );
};

export default PasswordGenerator;
