import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Calendar, Loader2, Clock, Save, CheckCircle, Server, Globe } from "lucide-react";
import { lookupWhois, type WhoisResult } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const DomainAge = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WhoisResult | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const { user, saveReport } = useAuth();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    setSaved(false);

    try {
      const whoisResult = await lookupWhois(domain.trim());

      if (whoisResult.status.includes("lookup_failed")) {
        setError(
          "Could not retrieve WHOIS data for this domain. " +
          "Some TLDs or privacy-protected domains may not be accessible."
        );
      } else {
        setResult(whoisResult);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Domain age check failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    try {
      saveReport({ type: "whois", domain: domain.trim(), data: result });
      setSaved(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save report";
      setError(msg);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">
        📅 Domain Age Checker
      </h1>
      <p className="text-center text-muted-foreground font-bold mb-6">
        Real WHOIS data via RDAP protocol
      </p>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g. google.com)"
          className="comic-input flex-1"
          id="domain-age-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center"
          id="domain-age-btn"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Calendar className="w-5 h-5" strokeWidth={3} />
          )}
          {loading ? "Checking..." : "Check Age"}
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

      {result && (
        <div className="space-y-6 animate-slide-up">
          {/* Main age card */}
          <div className="comic-card">
            <div className="text-center mb-6">
              <Clock className="w-12 h-12 text-comic-blue mx-auto mb-2" strokeWidth={3} />
              <h2 className="comic-heading text-2xl text-foreground">
                {result.domain}
              </h2>
              <div className="mt-3">
                <span
                  className="comic-score text-secondary"
                  style={{ fontSize: "3.5rem" }}
                >
                  {result.ageYears}
                </span>
                <span className="text-muted-foreground font-bold text-lg ml-2">
                  years old
                </span>
              </div>
              <p className="text-muted-foreground font-bold">
                {result.ageDays.toLocaleString()} days
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Created", value: result.created },
                { label: "Updated", value: result.updated },
                { label: "Expires", value: result.expires },
                { label: "Registrar", value: result.registrar },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg bg-background/50 text-center"
                  style={{ border: "2px solid hsl(var(--border))" }}
                >
                  <p className="text-xs text-muted-foreground font-bold uppercase">
                    {item.label}
                  </p>
                  <p className="font-bold text-foreground mt-1 text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Extended WHOIS info */}
          <div className="comic-card">
            <h3 className="comic-heading text-xl text-foreground mb-4">
              🔍 Extended WHOIS Data
            </h3>

            <div className="space-y-4">
              {/* Nameservers */}
              {result.nameservers.length > 0 && (
                <div
                  className="p-3 rounded-lg bg-background/50"
                  style={{ border: "2px solid hsl(var(--border))" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-comic-blue" strokeWidth={3} />
                    <p className="text-xs text-muted-foreground font-bold uppercase">
                      Nameservers
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.nameservers.map((ns) => (
                      <span
                        key={ns}
                        className="comic-badge text-xs bg-accent text-accent-foreground"
                      >
                        {ns}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              {result.status.length > 0 && (
                <div
                  className="p-3 rounded-lg bg-background/50"
                  style={{ border: "2px solid hsl(var(--border))" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-comic-green" strokeWidth={3} />
                    <p className="text-xs text-muted-foreground font-bold uppercase">
                      Domain Status
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.status.map((s) => (
                      <span
                        key={s}
                        className="comic-badge text-xs bg-secondary/10 text-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* DNSSEC */}
              <div
                className="p-3 rounded-lg bg-background/50"
                style={{ border: "2px solid hsl(var(--border))" }}
              >
                <p className="text-xs text-muted-foreground font-bold uppercase mb-1">
                  DNSSEC
                </p>
                <p className="font-bold text-foreground text-sm">
                  {result.dnssec}
                </p>
              </div>
            </div>

            {/* Save button */}
            {user && user.plan !== "free" && (
              <div className="mt-4 flex justify-end">
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
        </div>
      )}
      {/* ── SEO SECTION ── */}
      <SEOHead
        title="Domain Age Checker - Full WHOIS History & RDAP Lookup"
        description="Determine exactly how old a domain is with our free WHOIS checker. Get precise creation, update, and expiration dates using live RDAP protocols."
        keywords="domain age checker, whois lookup, domain creation date, check website age, rdap domain tool"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro Domain Age Tool",
          "operatingSystem": "All Browsers",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <SEOSection
        title="Uncover the History Behind Any Web Address"
        subtitle="The Ultimate Tool for Domain Due Diligence & SEO Analysis"
        description="The age of a domain is a critical factor for both SEO and trustworthiness. Older domains often carry more 'authority' in search engine eyes because they have stood the test of time. Whether you are buying a used domain, research competitors, or auditing your own digital assets, WebInsight Pro's Domain Age Checker provides deep, accurate data straight from specialized RDAP servers, cutting through WHOIS privacy where possible."
        howToUse={[
          "Enter the 'Domain Name' (e.g., google.com) in the search field.",
          "Click 'Check Age' to query the global domain registries.",
          "Review the 'Years' and 'Days' old counter to gauge authority.",
          "Examine the 'Created' and 'Expires' dates for registration details.",
          "Browse the 'Extended WHOIS Data' to see Nameservers and DNSSEC status."
        ]}
        features={[
          "Real-Time RDAP Queries: Uses modern Registration Data Access Protocol for higher reliability than standard WHOIS.",
          "Precise Age Counter: Calculates age down to the exact number of days.",
          "Registrar Intelligence: Identifies the company where the domain is currently held.",
          "Security Checks: Instantly see if DNSSEC is enabled for the domain.",
          "Nameserver Discovery: Reveal the infrastructure powering the website's DNS."
        ]}
        faqs={[
          {
            question: "Does domain age affect SEO ranking?",
            answer: "While not the only factor, older domains typically have more accumulated backlinks and a longer history of 'positive signals' with search engines, which can help with ranking."
          },
          {
            question: "Why does it say 'Lookup Failed' for some domains?",
            answer: "Some regional registries (ccTLDs) or domains with extreme privacy protection might block public RDAP queries. We are constantly expanding our server support."
          },
          {
            question: "What is the difference between WHOIS and RDAP?",
            answer: "RDAP is the modern successor to WHOIS. It provides structured data (JSON) and is more secure and reliable than the older, text-based WHOIS protocol."
          }
        ]}
        relatedTools={[
          { name: "Whois Lookup", emoji: "🔍", path: "/tools/whois-lookup" },
          { name: "DNS Lookup", emoji: "🌐", path: "/tools/dns-lookup" },
          { name: "Backlink Checker", emoji: "🔗", path: "/tools/backlink-checker" },
          { name: "SSL Checker", emoji: "🛡️", path: "/tools/ssl-checker" }
        ]}
      />
    </div>
  );
};

export default DomainAge;
