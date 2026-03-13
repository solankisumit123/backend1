import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Shield, ShieldCheck, ShieldX, Loader2, Save, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import { checkSSL, type SSLResult } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import AdBanner from "../../components/AdBanner";

const SSLChecker = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SSLResult | null>(null);
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
      const sslResult = await checkSSL(domain.trim());
      setResult(sslResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "SSL check failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    try {
      saveReport({ type: "ssl", domain: domain.trim(), data: result });
      setSaved(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save report";
      setError(msg);
    }
  };

  const gradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "text-secondary";
    if (grade === "B") return "text-comic-orange";
    return "text-destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2 text-center">
        🔒 SSL Checker
      </h1>
      <p className="text-center text-muted-foreground font-bold mb-6">
        Verify SSL certificates with real-time data
      </p>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g. google.com)"
          className="comic-input flex-1"
          id="ssl-domain-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center"
          id="ssl-check-btn"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Shield className="w-5 h-5" strokeWidth={3} />
          )}
          {loading ? "Checking..." : "Check SSL"}
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
        <div className="comic-card animate-slide-up">
          <div className="flex items-center gap-4 mb-6">
            {result.valid ? (
              <ShieldCheck className="w-16 h-16 text-secondary" strokeWidth={3} />
            ) : (
              <ShieldX className="w-16 h-16 text-destructive" strokeWidth={3} />
            )}
            <div>
              <h2 className="comic-heading text-2xl text-foreground">{domain}</h2>
              <p
                className={`font-bold ${result.valid ? "text-secondary" : "text-destructive"
                  }`}
              >
                {result.valid
                  ? "✅ SSL Certificate Valid"
                  : "❌ SSL Certificate Invalid / Expired"}
              </p>
            </div>
            <div className="ml-auto">
              <span
                className={`comic-score ${gradeColor(result.grade)}`}
                style={{ fontSize: "3.5rem" }}
              >
                {result.grade}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Issuer", value: result.issuer },
              { label: "Protocol", value: result.protocol },
              { label: "Expires", value: result.expires },
              {
                label: "Days Left",
                value: result.daysLeft > 0 ? `${result.daysLeft} days` : "Expired",
              },
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

          {result.san.length > 0 && (
            <div
              className="mt-4 p-3 rounded-lg bg-background/50"
              style={{ border: "2px solid hsl(var(--border))" }}
            >
              <p className="text-xs text-muted-foreground font-bold uppercase mb-1">
                Subject Alt Names
              </p>
              <p className="font-bold text-foreground text-sm">
                {result.san.join(", ")}
              </p>
            </div>
          )}

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
      )}
      {/* ── SEO SECTION ── */}
      <SEOHead
        title="SSL Certificate Checker - Verify Website Security Online"
        description="Free online SSL checker to verify certificate validity, issuer details, expiry date, and security grade. Ensure your website is secure and trusted."
        keywords="ssl checker, check ssl certificate, website security check, verify ssl validity, check certificate expiry"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro SSL Checker",
          "operatingSystem": "All Browsers",
          "applicationCategory": "SecurityApplication"
        }}
      />

      <SEOSection
        title="Authoritative SSL/TLS Security Diagnostics"
        subtitle="Ensure Encrypted Communications and User Trust"
        description="An SSL certificate is no longer optional—it's a requirement for SEO and user safety. WebInsight Pro’s SSL Checker provides a deep-dive analysis of any website's security layer. Instantly identify expired certificates, insecure protocols, or weak ciphers that could be triggering browser warnings for your visitors. Our tool gives you a clear letter grade (A+ to F) based on current industry security standards."
        howToUse={[
          "Enter your 'Domain' (e.g., mysite.com) in the input field.",
          "Click 'Check SSL' to perform a live scan of the server's certificate.",
          "View the 'SSL Validity' status to see if the certificate is correctly installed.",
          "Check the 'Expires' and 'Days Left' count to avoid unexpected downtime.",
          "If you're a Pro member, use 'Save Report' to track your site's security over time."
        ]}
        features={[
          "Grade Score Logic: Professional marking system from A+ to F based on security best practices.",
          "Protocol Detection: See if your server supports modern TLS versions (1.2, 1.3).",
          "Chain of Trust Analysis: Verify the certificate issuer (Let's Encrypt, DigiCert, etc.).",
          "SAN Coverage: See all 'Subject Alternative Names' covered by a single certificate.",
          "Expiry Alerts: Visual indicators for certificates expiring in less than 30 days."
        ]}
        faqs={[
          {
            question: "Why does SSL matter for SEO?",
            answer: "Google has confirmed that HTTPS is a ranking signal. Websites without a valid SSL certificate are marked as 'Not Secure', which significantly increases bounce rates."
          },
          {
            question: "What is an Issuer?",
            answer: "The issuer is the Certificate Authority (CA) that verified the domain ownership and signed the SSL certificate."
          },
          {
            question: "Can I check internal intranet SSL here?",
            answer: "No. This tool requires the domain to be publicly accessible over the internet so our scanners can reach and verify the certificate."
          }
        ]}
        relatedTools={[
          { name: "Domain Whois", emoji: "👤", path: "/tools/whois" },
          { name: "HTTP Headers", emoji: "📑", path: "/tools/http-headers" },
          { name: "Security Audit", emoji: "🛡️", path: "/tools/seo-audit" },
          { name: "DNS Lookup", emoji: "📡", path: "/tools/dns-lookup" }
        ]}
      />
    </div>
  );
};

export default SSLChecker;
