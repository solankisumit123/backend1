import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Loader2, Globe } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

interface IPResult {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
}

const IPLookup = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IPResult | null>(null);
    const [error, setError] = useState("");
    const [myIP, setMyIP] = useState("");

    // Get user's own IP on mount
    useEffect(() => {
        fetch("https://ipinfo.io/json?token=")
            .then((r) => r.json())
            .then((data) => setMyIP(data.ip || ""))
            .catch(() => { });
    }, []);

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = query.trim() || myIP;
        if (!target) return;
        setLoading(true);
        setResult(null);
        setError("");

        try {
            // Try to resolve domain to IP first if it's not an IP
            let ipToLookup = target;
            if (!/^\d+\.\d+\.\d+\.\d+$/.test(target)) {
                const domain = target.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
                const dnsRes = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
                const dnsData = await dnsRes.json();
                if (dnsData.Answer && dnsData.Answer.length > 0) {
                    ipToLookup = dnsData.Answer[0].data;
                } else {
                    throw new Error("Could not resolve domain to IP");
                }
            }

            // Use ipinfo.io for geolocation
            const res = await fetch(`https://ipinfo.io/${ipToLookup}/json?token=`);
            if (!res.ok) throw new Error("IP lookup failed");
            const data = await res.json();

            setResult({
                ip: data.ip || ipToLookup,
                hostname: data.hostname || target,
                city: data.city || "Unknown",
                region: data.region || "Unknown",
                country: data.country || "Unknown",
                loc: data.loc || "0,0",
                org: data.org || "Unknown",
                postal: data.postal || "N/A",
                timezone: data.timezone || "Unknown",
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "IP lookup failed";
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
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">📍 IP Lookup</h1>
            <p className="text-center text-muted-foreground font-bold mb-6">
                {myIP ? `Your IP: ${myIP}` : "Find IP address information"}
            </p>

            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-8">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter IP or domain (leave empty for your IP)" className="comic-input flex-1" />
                <button type="submit" disabled={loading} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" strokeWidth={3} />}
                    {loading ? "Looking up..." : "Lookup"}
                </button>
            </form>

            {error && (
                <div className="comic-card bg-destructive/10 text-destructive text-center font-bold mb-6" style={{ border: "2px solid hsl(var(--destructive))" }}>⚠️ {error}</div>
            )}

            {result && (
                <div className="space-y-6 animate-slide-up">
                    <div className="comic-card text-center">
                        <Globe className="w-12 h-12 text-comic-blue mx-auto mb-2" strokeWidth={3} />
                        <p className="comic-heading text-2xl text-foreground">{result.ip}</p>
                        <p className="text-sm text-muted-foreground font-bold">{result.hostname}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { label: "City", value: result.city, icon: "🏙️" },
                            { label: "Region", value: result.region, icon: "📍" },
                            { label: "Country", value: result.country, icon: "🌍" },
                            { label: "Postal Code", value: result.postal, icon: "📮" },
                            { label: "Timezone", value: result.timezone, icon: "🕐" },
                            { label: "Coordinates", value: result.loc, icon: "🗺️" },
                        ].map((item) => (
                            <div key={item.label} className="comic-card text-center py-4">
                                <p className="text-lg">{item.icon}</p>
                                <p className="comic-heading text-lg text-foreground">{item.value}</p>
                                <p className="text-xs text-muted-foreground font-bold uppercase">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="comic-card">
                        <p className="text-xs text-muted-foreground font-bold uppercase mb-1">ISP / Organization</p>
                        <p className="font-bold text-foreground">{result.org}</p>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="IP Lookup Online - Find Geo Location & ISP of any IP"
                description="Free online IP lookup tool to find the city, region, country, and ISP of any IP address or domain. Get detailed geolocation data instantly."
                keywords="ip lookup, find ip location, check my ip, domain to ip, geolocation tool, isp checker"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro IP Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Pinpoint IP Geolocation & Network Intelligence"
                subtitle="Go Beyond the Numbers to See Where the Traffic Originates"
                description="Every device on the internet has a unique IP address that carries vital clues about its origin and owner. Whether you're investigating a suspicious login, analyzing your website visitors, or just curious about your own network, WebInsight Pro's IP Lookup tool delivers deep insights. By combining DNS resolution with global geolocation databases, we provide a complete profile of any digital identity."
                howToUse={[
                    "Enter an 'IP Address' (e.g., 8.8.8.8) or a 'Domain' (e.g., google.com).",
                    "Leave the field empty to automatically lookup your own current IP.",
                    "Click 'Lookup' to query our geolocation and network providers.",
                    "Review the 'City', 'Region', and 'Country' to find the physical location.",
                    "Check the 'ISP / Organization' to see who owns the network range."
                ]}
                features={[
                    "Domain to IP Discovery: Automatically resolves web addresses to their underlying server IP.",
                    "Precise Geolocation: Fetches city-level data, postal codes, and timezones.",
                    "Network Provider Info: Identifies the ISP (Internet Service Provider) or Cloud Hosting (AWS, GCP).",
                    "Coordinate Mapping: Provides exact Latitude and Longitude for the IP location.",
                    "Privacy First: We don't log your lookups or store the IP addresses you search for."
                ]}
                faqs={[
                    {
                        question: "Why is my IP location wrong?",
                        answer: "IP geolocation is based on databases provided by ISPs. If you are using a VPN, proxy, or if your ISP has recently updated its routing, the location might show as a nearby city or the VPN's server headquarters."
                    },
                    {
                        question: "What's the difference between IPv4 and IPv6?",
                        answer: "IPv4 uses 32-bit addresses (e.g., 192.168.1.1) and is the most common. IPv6 uses 128-bit addresses to provide a much larger pool of unique IDs for the billions of new devices coming online."
                    },
                    {
                        question: "How do I find my own IP?",
                        answer: "Simply load this page! Our tool automatically detects and displays your public IP address (the one the rest of the world sees) at the top of the search bar."
                    }
                ]}
                relatedTools={[
                    { name: "DNS Lookup", emoji: "📡", path: "/tools/dns-lookup" },
                    { name: "Hosting Check", emoji: "🏢", path: "/tools/hosting-checker" },
                    { name: "WHOIS Lookup", emoji: "👤", path: "/tools/whois" },
                    { name: "My IP Address", emoji: "🏠", path: "/tools/my-ip" }
                ]}
            />
        </div>
    );
};

export default IPLookup;
