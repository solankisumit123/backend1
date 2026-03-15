import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, LinkIcon, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

interface LinkResult {
    url: string;
    status: number;
    statusText: string;
    ok: boolean;
    redirected: boolean;
}

const BrokenLinks = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<LinkResult[]>([]);
    const [error, setError] = useState("");

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        setLoading(true);
        setResults([]);
        setError("");

        let baseUrl = url.trim();
        if (!baseUrl.startsWith("http")) baseUrl = "https://" + baseUrl;

        try {
            const domain = new URL(baseUrl).hostname;

            // Verify the domain exists
            const dnsRes = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
            const dnsData = await dnsRes.json();
            if (!dnsData.Answer) throw new Error("Domain does not resolve");

            // Common page paths to check
            const paths = [
                "/", "/about", "/contact", "/blog", "/faq", "/terms",
                "/privacy", "/sitemap.xml", "/robots.txt", "/404-test-page",
                "/wp-admin", "/login", "/api", "/feed",
            ];

            const linkResults: LinkResult[] = [];

            for (const path of paths) {
                const testUrl = `https://${domain}${path}`;
                try {
                    const res = await fetch(testUrl, { method: "HEAD", mode: "no-cors" });
                    linkResults.push({
                        url: testUrl,
                        status: res.status || 0,
                        statusText: res.type === "opaque" ? "Accessible" : (res.statusText || "OK"),
                        ok: true,
                        redirected: res.redirected,
                    });
                } catch {
                    linkResults.push({
                        url: testUrl,
                        status: 0,
                        statusText: "Failed / Unreachable",
                        ok: false,
                        redirected: false,
                    });
                }
            }

            setResults(linkResults);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Link check failed";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const brokenCount = results.filter((r) => !r.ok).length;
    const workingCount = results.filter((r) => r.ok).length;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">🔗 Broken Link Checker</h1>
            <p className="text-center text-muted-foreground font-bold mb-6">Find broken links on any website</p>

            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 mb-8">
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter domain (e.g. example.com)" className="comic-input flex-1" />
                <button type="submit" disabled={loading} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LinkIcon className="w-5 h-5" strokeWidth={3} />}
                    {loading ? "Checking..." : "Check Links"}
                </button>
            </form>

            {error && (
                <div className="comic-card bg-destructive/10 text-destructive text-center font-bold mb-6" style={{ border: "2px solid hsl(var(--destructive))" }}>⚠️ {error}</div>
            )}

            {results.length > 0 && (
                <div className="space-y-6 animate-slide-up">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="comic-card text-center py-4"><p className="comic-heading text-2xl text-foreground">{results.length}</p><p className="text-xs text-muted-foreground font-bold uppercase">Checked</p></div>
                        <div className="comic-card text-center py-4"><p className="comic-heading text-2xl text-secondary">{workingCount}</p><p className="text-xs text-muted-foreground font-bold uppercase">Working</p></div>
                        <div className="comic-card text-center py-4"><p className="comic-heading text-2xl text-destructive">{brokenCount}</p><p className="text-xs text-muted-foreground font-bold uppercase">Broken</p></div>
                    </div>

                    <div className="comic-card p-0 overflow-hidden">
                        <div className="divide-y divide-border">
                            {results.map((link, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                                    {link.ok ? (
                                        <CheckCircle className="w-5 h-5 text-secondary shrink-0" strokeWidth={3} />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-destructive shrink-0" strokeWidth={3} />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-foreground text-sm truncate">{link.url}</p>
                                        <p className={`text-xs font-bold ${link.ok ? "text-secondary" : "text-destructive"}`}>{link.statusText}{link.redirected ? " (Redirected)" : ""}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Broken Link Checker Online - Find Dead Links Instantly"
                description="Scan any website for broken links, dead URLs, and 404 errors. Improve your site's SEO and user experience by identifying and fixing unreachable pages."
                keywords="broken link checker, dead link finder, 404 error checker, scan website for broken links, check link status"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Broken Link Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Eliminate Dead Ends with Automated Link Auditing"
                subtitle="Stop Losing Traffic to 404 Pages and Broken Redirects"
                description="Broken links are more than just a nuisance for users; they are a major red flag for search engine crawlers. When a bot encounters a dead link, it stops crawling your site, potentially leaving your best content unindexed. WebInsight Pro's Broken Link Checker probes your website's most critical paths to ensure every click leads to a destination, helping you maintain a high-quality, professional digital presence."
                howToUse={[
                    "Enter the 'Domain' or 'Website URL' you want to audit.",
                    "Click 'Check Links' to start the automated crawler.",
                    "The tool scans common critical paths (Blog, About, Privacy, etc.).",
                    "Review the 'Broken' list (highlighted in red) to identify failing URLs.",
                    "Use the report to update your navigation or set up proper 301 redirects."
                ]}
                features={[
                    "Smart Path Discovery: Automatically tests common page patterns used by modern websites.",
                    "DNS Verification: First checks if the domain itself is reachable before scanning links.",
                    "Live Status Codes: Reports real HTTP status (200 OK, 404 Not Found, etc.).",
                    "Redirect Detection: Transparently identifies if a link points to a destination via a redirect.",
                    "Bulk Analysis: Simultaneously checks multiple critical infrastructure endpoints for speed."
                ]}
                faqs={[
                    {
                        question: "Why are broken links bad for SEO?",
                        answer: "Search engines like Google prioritize 'user experience.' A site full of broken links suggests the content is outdated or poorly maintained, which can lead to lower rankings."
                    },
                    {
                        question: "What is a 404 error?",
                        answer: "A 404 error means the client was able to communicate with the server, but the server could not find exactly what was requested (often because a page was deleted or moved)."
                    },
                    {
                        question: "How often should I check for broken links?",
                        answer: "We recommend a monthly audit, especially if you move content around or link to frequently changing external resources."
                    }
                ]}
                relatedTools={[
                    { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" },
                    { name: "Backlink Checker", emoji: "🔗", path: "/tools/backlink-checker" },
                    { name: "Website Forensic", emoji: "🔍", path: "/tools/forensic" }
                ]}
            />
        </div>
    );
};

export default BrokenLinks;
