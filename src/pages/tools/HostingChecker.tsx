import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Globe, Loader2, Server } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

import { lookupDNS } from "@/lib/api";

interface HostingResult {
    domain: string;
    ip: string;
    hosting: string;
    nameservers: string[];
    cdn: string;
    webServer: string;
    dnsProvider: string;
}

// Known hosting/CDN providers mapped by common IP ranges and NS patterns
const identifyProvider = (ip: string, nsRecords: string[]): { hosting: string; cdn: string; dnsProvider: string } => {
    const nsString = nsRecords.join(" ").toLowerCase();
    const ipPrefix = ip.split(".").slice(0, 2).join(".");

    let hosting = "Unknown Hosting Provider";
    let cdn = "None detected";
    let dnsProvider = "Unknown";

    // DNS Provider detection
    if (nsString.includes("cloudflare")) { dnsProvider = "Cloudflare"; cdn = "Cloudflare CDN"; }
    else if (nsString.includes("awsdns")) { dnsProvider = "Amazon Route 53"; }
    else if (nsString.includes("google")) { dnsProvider = "Google Cloud DNS"; }
    else if (nsString.includes("azure")) { dnsProvider = "Azure DNS"; }
    else if (nsString.includes("ns1.")) { dnsProvider = "NS1"; }
    else if (nsString.includes("domaincontrol")) { dnsProvider = "GoDaddy"; }
    else if (nsString.includes("hostinger")) { dnsProvider = "Hostinger"; }
    else if (nsString.includes("namecheap") || nsString.includes("registrar-servers")) { dnsProvider = "Namecheap"; }
    else if (nsString.includes("digitalocean")) { dnsProvider = "DigitalOcean"; }

    // Hosting detection by IP ranges
    if (ipPrefix === "104.21" || ipPrefix === "172.67" || ipPrefix === "104.18") { hosting = "Cloudflare (Proxied)"; cdn = "Cloudflare CDN"; }
    else if (ip.startsWith("13.") || ip.startsWith("52.") || ip.startsWith("54.") || ip.startsWith("3.")) { hosting = "Amazon Web Services (AWS)"; }
    else if (ip.startsWith("34.") || ip.startsWith("35.") || ip.startsWith("142.250")) { hosting = "Google Cloud Platform"; }
    else if (ip.startsWith("40.") || ip.startsWith("20.") || ip.startsWith("52.")) { hosting = "Microsoft Azure"; }
    else if (ip.startsWith("104.16") || ip.startsWith("104.17")) { hosting = "Cloudflare"; cdn = "Cloudflare CDN"; }
    else if (ip.startsWith("151.101")) { hosting = "Fastly CDN"; cdn = "Fastly"; }
    else if (ip.startsWith("185.199")) { hosting = "GitHub Pages"; }
    else if (ip.startsWith("76.76")) { hosting = "Vercel"; cdn = "Vercel Edge Network"; }
    else if (ip.startsWith("75.2") || ip.startsWith("99.83")) { hosting = "AWS Global Accelerator"; }
    else if (ip.startsWith("188.114") || ip.startsWith("162.159")) { hosting = "Cloudflare"; cdn = "Cloudflare CDN"; }
    else if (ip.startsWith("192.0.78") || ip.startsWith("192.0.73")) { hosting = "WordPress.com (Automattic)"; }
    else if (ip.startsWith("198.185") || ip.startsWith("151.249")) { hosting = "Squarespace"; }
    else if (ip.startsWith("23.227")) { hosting = "Shopify"; cdn = "Shopify CDN"; }

    // Fallback hosting from DNS provider
    if (hosting === "Unknown Hosting Provider") {
        if (dnsProvider === "Cloudflare") hosting = "Behind Cloudflare (origin hidden)";
        else if (dnsProvider === "GoDaddy") hosting = "GoDaddy Hosting";
        else if (dnsProvider === "Hostinger") hosting = "Hostinger";
        else if (dnsProvider === "Namecheap") hosting = "Namecheap Hosting";
    }

    return { hosting, cdn, dnsProvider };
};

const HostingChecker = () => {
    const [domain, setDomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<HostingResult | null>(null);
    const [error, setError] = useState("");

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain.trim()) return;
        setLoading(true);
        setResult(null);
        setError("");

        const clean = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");

        try {
            // Get DNS records
            const records = await lookupDNS(clean);

            const aRecord = records.find((r) => r.type === "A");
            const nsRecords = records.filter((r) => r.type === "NS").map((r) => r.value);

            if (!aRecord) throw new Error("Could not resolve domain IP address");

            const ip = aRecord.value;
            const { hosting, cdn, dnsProvider } = identifyProvider(ip, nsRecords);

            // Try to detect web server via a HEAD request
            let webServer = "Unknown";
            try {
                const headRes = await fetch(`https://${clean}`, { method: "HEAD", mode: "no-cors" });
                webServer = headRes.headers.get("server") || "Unknown (CORS restricted)";
            } catch {
                webServer = "Could not detect (site may block HEAD requests)";
            }

            setResult({
                domain: clean,
                ip,
                hosting,
                nameservers: nsRecords,
                cdn,
                webServer,
                dnsProvider,
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Hosting check failed";
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
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">🌐 Hosting Checker</h1>
            <p className="text-center text-muted-foreground font-bold mb-6">Identify web hosting & infrastructure</p>

            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 mb-8">
                <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain (e.g. google.com)" className="comic-input flex-1" />
                <button type="submit" disabled={loading} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" strokeWidth={3} />}
                    {loading ? "Detecting..." : "Check Hosting"}
                </button>
            </form>

            {error && (
                <div className="comic-card bg-destructive/10 text-destructive text-center font-bold mb-6" style={{ border: "2px solid hsl(var(--destructive))" }}>⚠️ {error}</div>
            )}

            {result && (
                <div className="space-y-6 animate-slide-up">
                    <div className="comic-card text-center">
                        <Server className="w-12 h-12 text-comic-blue mx-auto mb-2" strokeWidth={3} />
                        <h2 className="comic-heading text-2xl text-foreground mb-1">{result.domain}</h2>
                        <p className="text-sm text-muted-foreground font-bold">IP: {result.ip}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Hosting Provider", value: result.hosting, icon: "🏠" },
                            { label: "CDN", value: result.cdn, icon: "⚡" },
                            { label: "DNS Provider", value: result.dnsProvider, icon: "🌐" },
                            { label: "Web Server", value: result.webServer, icon: "🖥️" },
                        ].map((item) => (
                            <div key={item.label} className="comic-card py-4">
                                <p className="text-lg text-center">{item.icon}</p>
                                <p className="text-xs text-muted-foreground font-bold uppercase text-center">{item.label}</p>
                                <p className="font-bold text-foreground text-sm text-center mt-1">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {result.nameservers.length > 0 && (
                        <div className="comic-card">
                            <h3 className="comic-heading text-xl text-foreground mb-3">📡 Nameservers</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.nameservers.map((ns) => (
                                    <span key={ns} className="comic-badge text-xs bg-accent text-accent-foreground">{ns}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Hosting Checker Online - Who is hosting this website?"
                description="Instantly find out who is hosting any website. Our free hosting checker identifies the hosting provider, CDN, nameservers, and IP address of any domain."
                keywords="hosting checker, who is hosting this site, find website host, check cdn provider, identify nameservers"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Hosting Checker",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Uncover the Infrastructure Behind Any Website"
                subtitle="Analyze Hosting, CDNs, and DNS Providers in One Click"
                description="Have you ever wondered which platform powers your favorite blog, or where your competitors' websites are hosted? WebInsight Pro's Hosting Checker uses deep IP lookups and DNS analysis to reveal the technology stack supporting any domain. From cloud giants like AWS and Google Cloud to popular CDNs like Cloudflare, we help you understand the digital foundation of any site on the web."
                howToUse={[
                    "Enter the 'Domain' or 'URL' of the website you want to check.",
                    "Click 'Check Hosting' to start the infrastructure analysis.",
                    "Identify the 'Hosting Provider' and the server's 'IP Address'.",
                    "Check for 'CDN' usage which indicates optimized speed and security.",
                    "Examine the 'Nameservers' to see who manages the domain's DNS."
                ]}
                features={[
                    "ISP Detection: Identifies the underlying data center or internet service provider.",
                    "CDN Mapping: Detects edge networks like Cloudflare, Fastly, or Akamai.",
                    "DNS Provider Insights: Reveals if the domain uses premium DNS like Route 53 or NS1.",
                    "Web Server Fingerprinting: Attempts to identify the server software (Nginx, Apache).",
                    "Real-Time Analysis: No cached results; we probe the live internet system for every query."
                ]}
                faqs={[
                    {
                        question: "Why does it say 'Cloudflare' instead of the host?",
                        answer: "Cloudflare acts as a proxy, hiding the true IP of the origin server to protect it from DDoS attacks. In these cases, we display the proxy information for security reasons."
                    },
                    {
                        question: "Is this tool accurate for all domains?",
                        answer: "Yes, we use global DNS resolution to find the primary IP, which is the most reliable way to identify a website's hosting infrastructure."
                    },
                    {
                        question: "Can I use this for security research?",
                        answer: "Absolutely. Identifying hosting and CDN providers is a key step in vulnerability assessment and network reconnaissance."
                    }
                ]}
                relatedTools={[
                    { name: "IP Lookup", emoji: "📍", path: "/tools/ip-lookup" },
                    { name: "WHOIS Lookup", emoji: "👤", path: "/tools/whois" },
                    { name: "DNS Lookup", emoji: "📡", path: "/tools/dns-lookup" },
                    { name: "SSL Checker", emoji: "🔒", path: "/tools/ssl-checker" }
                ]}
            />
        </div>
    );
};

export default HostingChecker;
