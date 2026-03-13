import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";


const OpenGraphChecker = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<Record<string, string> | null>(null);
    const [copied, setCopied] = useState("");

    const checkOG = async () => {
        if (!url.trim()) return;
        setLoading(true);
        setTags(null);

        try {
            // Use a CORS proxy to fetch the page
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url.trim())}`;
            const res = await fetch(proxyUrl);
            const html = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const ogTags: Record<string, string> = {};

            // OG tags
            doc.querySelectorAll('meta[property^="og:"]').forEach((el) => {
                const prop = el.getAttribute("property") || "";
                const content = el.getAttribute("content") || "";
                ogTags[prop] = content;
            });

            // Twitter tags
            doc.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
                const name = el.getAttribute("name") || "";
                const content = el.getAttribute("content") || "";
                ogTags[name] = content;
            });

            // Title & description
            const title = doc.querySelector("title");
            if (title) ogTags["title"] = title.textContent || "";
            const desc = doc.querySelector('meta[name="description"]');
            if (desc) ogTags["meta:description"] = desc.getAttribute("content") || "";

            setTags(ogTags);
        } catch {
            setTags({ error: "Could not fetch the URL. Make sure it's a valid, publicly accessible URL." });
        }
        setLoading(false);
    };

    const handleCopy = (key: string, val: string) => {
        navigator.clipboard.writeText(val);
        setCopied(key);
        setTimeout(() => setCopied(""), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔍 Open Graph Checker</h1>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Enter URL</label>
                <div className="flex gap-2">
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="comic-input flex-1" />
                    <button onClick={checkOG} disabled={loading} className="comic-btn bg-primary text-primary-foreground">
                        {loading ? "Checking..." : "Check OG Tags"}
                    </button>
                </div>
            </div>

            {tags && !tags.error && (
                <div className="space-y-3 animate-slide-up">
                    {/* Preview card */}
                    {tags["og:image"] && (
                        <div className="comic-card">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2">Social Preview</h3>
                            <div className="rounded-xl overflow-hidden" style={{ border: "3px solid hsl(var(--border))" }}>
                                <img src={tags["og:image"]} alt="OG Preview" className="w-full max-h-64 object-cover" />
                                <div className="p-3 bg-background/50">
                                    <p className="font-bold text-foreground text-sm">{tags["og:title"] || tags["title"] || "No title"}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{tags["og:description"] || tags["meta:description"] || "No description"}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* All tags */}
                    <div className="comic-card">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3">Found {Object.keys(tags).length} Tags</h3>
                        <div className="space-y-2">
                            {Object.entries(tags).map(([key, val]) => (
                                <div key={key} className="flex items-start gap-2 p-2 rounded-lg bg-background/50" style={{ border: "2px solid hsl(var(--border))" }}>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-extrabold text-comic-blue uppercase">{key}</p>
                                        <p className="text-sm font-bold text-foreground break-all">{val}</p>
                                    </div>
                                    <button onClick={() => handleCopy(key, val)} className="p-1 hover:bg-muted/50 rounded shrink-0">
                                        {copied === key ? <CheckCircle className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {tags?.error && (
                <div className="comic-card bg-destructive/10 animate-slide-up" style={{ border: "2px solid hsl(var(--destructive))" }}>
                    <p className="text-sm font-bold text-destructive">❌ {tags.error}</p>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Open Graph Tag Checker - Social Media Preview Debugger"
                description="Check and preview how your website looks on Facebook, Twitter, and LinkedIn. Debug OG tags and Twitter cards instantly with our free online checker."
                keywords="open graph checker, og tag debugger, twitter card preview, social media seo, link preview generator"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro OG Checker",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Optimize Your Social Media Presence and Engagement"
                subtitle="Ensure Every Share Looks Premium and Professional"
                description="When your website is shared on social platforms, the image, title, and description aren't pulled out of thin air—they come from Open Graph (OG) tags. If these tags are missing or broken, your link might appear as a generic text block, leading to lower engagement. WebInsight Pro's Open Graph Checker allows you to see exactly what external platforms see, ensuring your content is always presented in the best possible light."
                howToUse={[
                    "Copy the 'URL' of the page you want to test.",
                    "Paste it into the checker and click 'Check OG Tags'.",
                    "Observe the 'Social Preview' image and text layout.",
                    "Review the full list of 'Metadata Tags' found on the page.",
                    "If tags are missing, use our Meta Tag Generator to create them and update your site."
                ]}
                features={[
                    "Cross-Platform Support: Previews layout styles for Facebook, LinkedIn, and Twitter.",
                    "Image Verification: Checks if your provided OG image URL is working and accessible.",
                    "Metadata Breakdown: List every property including og:url, og:type, and twitter:creator.",
                    "Live Scraper: Real-time fetching of page data via high-speed proxy servers.",
                    "CORS Bypass: Built-in technology to read publicly available tags from any domain."
                ]}
                faqs={[
                    {
                        question: "Why does Facebook show an old image?",
                        answer: "Facebook caches OG data. Use the official 'Facebook Sharing Debugger' to force a cache clear if you have recently updated your site's tags."
                    },
                    {
                        question: "What is the best size for an OG image?",
                        answer: "For the best high-resolution display, use an image that is 1200x630 pixels (1.91:1 aspect ratio)."
                    },
                    {
                        question: "Do I need separate tags for Twitter?",
                        answer: "While Twitter can fall back to standard OG tags, having dedicated 'twitter:' tags allows for better control over display styles like the 'Summary Card with Large Image'."
                    }
                ]}
                relatedTools={[
                    { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" },
                    { name: "SERP Preview", emoji: "🔍", path: "/tools/serp-preview" },
                    { name: "Broken Link Checker", emoji: "🔗", path: "/tools/broken-links" },
                    { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" }
                ]}
            />
        </div>
    );
};


export default OpenGraphChecker;
