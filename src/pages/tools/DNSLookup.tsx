import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Globe, Loader2, Save, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import { lookupDNS, type DNSRecord } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import AdBanner from "../../components/AdBanner";

const DNSLookup = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const { user, saveReport } = useAuth();

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setRecords([]);
    setError("");
    setSaved(false);

    try {
      const result = await lookupDNS(domain.trim());
      if (result.length === 0) {
        setError("No DNS records found for this domain.");
      } else {
        setRecords(result);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "DNS lookup failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (records.length === 0) return;
    try {
      saveReport({ type: "dns", domain: domain.trim(), data: records });
      setSaved(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save report";
      setError(msg);
    }
  };

  const typeColor = (type: string) => {
    const map: Record<string, string> = {
      A: "bg-secondary text-secondary-foreground",
      AAAA: "bg-accent text-accent-foreground",
      CNAME: "bg-primary text-primary-foreground",
      MX: "bg-secondary text-secondary-foreground",
      NS: "bg-accent text-accent-foreground",
      TXT: "bg-muted text-foreground",
      SOA: "bg-primary text-primary-foreground",
    };
    return map[type] || "bg-muted text-foreground";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">
        🌐 DNS Lookup
      </h1>
      <p className="text-center text-muted-foreground font-bold mb-6">
        Real DNS records via Google Public DNS
      </p>

      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g. google.com)"
          className="comic-input flex-1"
          id="dns-domain-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center"
          id="dns-lookup-btn"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Globe className="w-5 h-5" strokeWidth={3} />
          )}
          {loading ? "Looking up..." : "Lookup"}
        </button>
      </form>

      {error && (
        <div
          className="comic-card bg-destructive/10 text-destructive text-center font-bold mb-6 animate-slide-up"
          style={{ border: "2px solid hsl(var(--destructive))" }}
        >
          ⚠️ {error}
        </div>
      )}

      {records.length > 0 && (
        <div className="comic-card animate-slide-up p-0 overflow-hidden">
          <div
            className="p-4 flex items-center justify-between"
            style={{ borderBottom: "3px solid hsl(var(--border))" }}
          >
            <h2 className="comic-heading text-xl text-foreground">
              DNS Records for {domain}
            </h2>
            <span className="comic-badge bg-accent text-accent-foreground text-xs">
              {records.length} records
            </span>
          </div>

          <div className="divide-y divide-border">
            {records.map((rec, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className={`comic-badge text-xs ${typeColor(rec.type)}`}>
                  {rec.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm truncate">
                    {rec.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-bold truncate">
                    {rec.value}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground font-bold shrink-0">
                  TTL: {rec.ttl}s
                </span>
              </div>
            ))}
          </div>

          {/* Save button */}
          {user && user.plan !== "free" && (
            <div
              className="p-4 flex justify-end"
              style={{ borderTop: "2px solid hsl(var(--border) / 0.3)" }}
            >
              <button
                onClick={handleSave}
                disabled={saved}
                className={`comic-btn flex items-center gap-2 text-sm ${saved
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card text-foreground"
                  }`}
              >
                {saved ? (
                  <CheckCircle className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <Save className="w-4 h-4" strokeWidth={3} />
                )}
                {saved ? "Saved!" : "Save Report"}
              </button>
            </div>
          )}
        </div>
      )}
      {/* ── SEO SECTION ── */}
      <SEOHead
        title="DNS Lookup Online - Check A, MX, CNAME & TXT Records"
        description="Probe any domain's DNS records instantly. Fetch A, AAAA, MX, CNAME, NS, and TXT records using Google Public DNS for accurate, real-time results."
        keywords="dns lookup, check dns records, mx record checker, txt records lookup, dns propagation check"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro DNS Tool",
          "operatingSystem": "All Browsers",
          "applicationCategory": "DeveloperApplication"
        }}
      />

      <SEOSection
        title="Comprehensive Domain Name System Analytics"
        subtitle="The Ultimate Toolbox for DNS Troubleshooting"
        description="DNS is the backbone of the internet, mapping human-readable domain names to machine-readable IP addresses. When your website goes down or emails stop arriving, the first place to look is your DNS records. WebInsight Pro's DNS Lookup tool provides a transparent view of your domain's configuration, fetching records directly from one of the world's most reliable DNS providers."
        howToUse={[
          "Enter the 'Domain Name' you wish to investigate.",
          "Click the 'Lookup' button to query the DNS system.",
          "Review the list of records returned (A, MX, TXT, etc.).",
          "Check the 'TTL' (Time To Live) to see how long records are cached.",
          "Pro members can save these records for future comparison during migrations."
        ]}
        features={[
          "Multi-Record Discovery: Simultaneously fetches A, MX, NS, CNAME, and TXT records.",
          "Google Public DNS Integration: Uses ultra-reliable APIs for global record accuracy.",
          "TTL Visibility: Understand caching behavior for faster propagation planning.",
          "Technical Breakdown: Clearly separate record types with color-coded badges.",
          "No Cache Fetch: We ensure you get the most recent data available publicly."
        ]}
        faqs={[
          {
            question: "What is an MX record?",
            answer: "MX (Mail Exchanger) records tell the internet which mail server is responsible for accepting email messages on behalf of your domain."
          },
          {
            question: "What is an A record?",
            answer: "The A (Address) record is the most basic DNS record. It points your domain name directly to the IPv4 address of your web server."
          },
          {
            question: "How long does DNS propagation take?",
            answer: "It depends on the TTL settings. While it can take up to 48 hours for global changes, most modern DNS systems propagate within a few minutes to an hour."
          }
        ]}
        relatedTools={[
          { name: "IP Lookup", emoji: "📍", path: "/tools/ip-lookup" },
          { name: "SSL Checker", emoji: "🔒", path: "/tools/ssl-checker" },
          { name: "Whois Search", emoji: "👤", path: "/tools/whois" },
          { name: "Hosting Check", emoji: "🏢", path: "/tools/hosting-checker" }
        ]}
      />
    </div>
  );
};

export default DNSLookup;
