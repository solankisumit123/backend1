import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, User, Loader2, Server, Globe } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

import { lookupWhois, type WhoisResult } from "@/lib/api";
import AdBanner from "../../components/AdBanner";

const WhoisLookup = () => {
    const [domain, setDomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WhoisResult | null>(null);
    const [error, setError] = useState("");

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain.trim()) return;
        setLoading(true);
        setResult(null);
        setError("");

        try {
            const whoisResult = await lookupWhois(domain.trim());
            if (whoisResult.status.includes("lookup_failed")) {
                setError("Could not retrieve WHOIS data for this domain.");
            } else {
                setResult(whoisResult);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "WHOIS lookup failed";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">👤 WHOIS Lookup</h1>
            <p className="text-center text-muted-foreground font-bold mb-6">Real domain registration data via RDAP</p>

            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-8">
                <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain (e.g. google.com)" className="comic-input flex-1" />
                <button type="submit" disabled={loading} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <User className="w-5 h-5" strokeWidth={3} />}
                    {loading ? "Looking up..." : "Lookup"}
                </button>
            </form>

            {error && (
                <div className="comic-card bg-destructive/10 text-destructive text-center font-bold mb-6" style={{ border: "2px solid hsl(var(--destructive))" }}>⚠️ {error}</div>
            )}

            {result && (
                <div className="space-y-6 animate-slide-up">
                    <div className="comic-card">
                        <h3 className="comic-heading text-xl text-foreground mb-4">📋 Registration Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Domain", value: result.domain },
                                { label: "Registrar", value: result.registrar },
                                { label: "Created", value: result.created },
                                { label: "Updated", value: result.updated },
                                { label: "Expires", value: result.expires },
                                { label: "Age", value: `${result.ageYears} years (${result.ageDays.toLocaleString()} days)` },
                                { label: "DNSSEC", value: result.dnssec },
                            ].map((item) => (
                                <div key={item.label} className="p-3 rounded-lg bg-background/50" style={{ border: "2px solid hsl(var(--border) / 0.3)" }}>
                                    <p className="text-xs text-muted-foreground font-bold uppercase">{item.label}</p>
                                    <p className="font-bold text-foreground text-sm mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {result.nameservers.length > 0 && (
                        <div className="comic-card">
                            <div className="flex items-center gap-2 mb-3">
                                <Server className="w-5 h-5 text-comic-blue" strokeWidth={3} />
                                <h3 className="comic-heading text-xl text-foreground">Nameservers</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {result.nameservers.map((ns) => (
                                    <span key={ns} className="comic-badge text-xs bg-accent text-accent-foreground">{ns}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {result.status.length > 0 && (
                        <div className="comic-card">
                            <div className="flex items-center gap-2 mb-3">
                                <Globe className="w-5 h-5 text-comic-green" strokeWidth={3} />
                                <h3 className="comic-heading text-xl text-foreground">Domain Status</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {result.status.map((s) => (
                                    <span key={s} className="comic-badge text-xs bg-secondary/10 text-secondary">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Free WHOIS Lookup - Domain Information Tracker"
                description="Instant domain WHOIS lookup to find registrar information, domain age, expiry date, and status. Accurate registration data for any domain name."
                keywords="whois lookup, domain whois, registrar info, domain owner check, check domain expiry"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro WHOIS Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Deep WHOIS Intelligence for Digital Assets"
                subtitle="Unlock Transparent Registration Records in Seconds"
                description="Understanding the ownership and history of a domain is critical for cybersecurity, digital marketing, and domain investing. Our WHOIS Lookup tool queries the Registration Data Access Protocol (RDAP) to fetch the most accurate and up-to-date records for any TLD (.com, .net, .org, etc.). Discover when a domain was created, when it will expire, and who maintains its registrar records."
                howToUse={[
                    "Enter the full domain name (e.g., google.com) into the search bar.",
                    "Click the 'Lookup' button to query the global RDAP database.",
                    "Review the 'Registration Info' section for creation and expiry dates.",
                    "Check the 'Nameservers' to identify the domain's hosting or DNS provider.",
                    "Examine 'Domain Status' codes to see if the domain is locked or transfer-ready."
                ]}
                features={[
                    "Real-Time RDAP Queries: Fetches live data from authoritative sources.",
                    "Domain Age Tracker: Instantly see exactly how old a website is in years.",
                    "Nameserver Detection: Identify CDN usage (like Cloudflare) and email routing.",
                    "Registration Health: Highlights expiry dates to prevent accidental domain loss.",
                    "Status Code Explanations: Decodes complex EPP status codes into readable info."
                ]}
                faqs={[
                    {
                        question: "Why is some WHOIS data hidden?",
                        answer: "Due to GDPR and privacy regulations, many registrars redact the owner's personal contact information. This is called WHOIS Privacy Protection."
                    },
                    {
                        question: "What is RDAP?",
                        answer: "RDAP (Registration Data Access Protocol) is the modern successor to the old WHOIS protocol, designed for better security, transparency, and data structure."
                    },
                    {
                        question: "Does checking WHOIS notify the owner?",
                        answer: "No. WHOIS queries are anonymous records checks. The domain owner will not be notified that their domain information was viewed."
                    }
                ]}
                relatedTools={[
                    { name: "DNS Lookup", emoji: "📡", path: "/tools/dns-lookup" },
                    { name: "Domain Age", emoji: "📅", path: "/tools/domain-age" },
                    { name: "Hosting Check", emoji: "🏢", path: "/tools/hosting-checker" },
                    { name: "IP Lookup", emoji: "📍", path: "/tools/ip-lookup" }
                ]}
            />
        </div>
    );
};

export default WhoisLookup;
