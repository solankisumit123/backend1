import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, Download } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const RobotsTxtGenerator = () => {
    const [ua, setUa] = useState("*");
    const [rules, setRules] = useState([
        { type: "Allow" as const, path: "/" },
        { type: "Disallow" as const, path: "/admin/" },
        { type: "Disallow" as const, path: "/private/" },
    ]);
    const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
    const [copied, setCopied] = useState(false);

    const addRule = () => setRules([...rules, { type: "Disallow", path: "/" }]);
    const removeRule = (i: number) => setRules(rules.filter((_, idx) => idx !== i));
    const updateRule = (i: number, key: "type" | "path", val: string) => {
        const updated = [...rules];
        if (key === "type") updated[i] = { ...updated[i], type: val as "Allow" | "Disallow" };
        else updated[i] = { ...updated[i], path: val };
        setRules(updated);
    };

    const output = [
        `User-agent: ${ua}`,
        ...rules.map((r) => `${r.type}: ${r.path}`),
        "",
        sitemap ? `Sitemap: ${sitemap}` : "",
    ].filter(Boolean).join("\n");

    const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    const handleDownload = () => {
        const blob = new Blob([output], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "robots.txt";
        link.click();
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🤖 Robots.txt Generator</h1>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">User-Agent</label>
                <input type="text" value={ua} onChange={(e) => setUa(e.target.value)} className="comic-input mb-4" placeholder="*" />

                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Rules</label>
                {rules.map((r, i) => (
                    <div key={i} className="flex gap-2 mb-2 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                        <select value={r.type} onChange={(e) => updateRule(i, "type", e.target.value)} className="comic-input w-32">
                            <option value="Allow">Allow</option>
                            <option value="Disallow">Disallow</option>
                        </select>
                        <input type="text" value={r.path} onChange={(e) => updateRule(i, "path", e.target.value)} className="comic-input flex-1" />
                        <button onClick={() => removeRule(i)} className="comic-btn bg-destructive/10 text-destructive text-sm px-3">✕</button>
                    </div>
                ))}
                <button onClick={addRule} className="comic-btn bg-card text-foreground text-sm w-full mt-1">+ Add Rule</button>

                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1 mt-4">Sitemap URL</label>
                <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="comic-input" placeholder="https://example.com/sitemap.xml" />
            </div>

            <div className="comic-card animate-slide-up">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Preview</label>
                    <div className="flex gap-2">
                        <button onClick={handleCopy} className="comic-btn text-xs bg-card text-foreground flex items-center gap-1">
                            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copied!" : "Copy"}
                        </button>
                        <button onClick={handleDownload} className="comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1">
                            <Download className="w-3 h-3" /> Download
                        </button>
                    </div>
                </div>
                <pre className="comic-input font-mono text-sm bg-background/50 whitespace-pre-wrap">{output}</pre>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Robots.txt Generator - Control Search Engine Crawlers"
                description="Easily create a custom robots.txt file for your website. Control which parts of your site search engines can crawl and index with our free generator."
                keywords="robots.txt generator, create robots.txt, seo tool, crawl control, disallow path generator"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Robots.txt Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Take Full Control of Your Website's Crawling Budget"
                subtitle="The Digital Doorkeeper for Google, Bing, and Beyond"
                description="Search engine bots are constantly scanning the web, but not every part of your website needs to be public. A `robots.txt` file acts as a gatekeeper, telling automated crawlers which directories are off-limits and which are primary targets. By optimizing this small text file, you can ensure that bots focus their 'crawling budget' on your most valuable content while protecting sensitive administrative or private data."
                howToUse={[
                    "Set the 'User-Agent' - use '*' to apply rules to all bots (Google, Bing, etc.).",
                    "Use the 'Rules' section to 'Allow' or 'Disallow' specific folders or files.",
                    "Add your 'Sitemap URL' at the bottom to help bots find your content map instantly.",
                    "Review the 'Live Preview' to ensure your logic is correct.",
                    "Click 'Download' and upload the resulting robots.txt file to your site's root directory."
                ]}
                features={[
                    "Universal Bot Support: Configurable User-Agent settings for targeted bot control.",
                    "Dynamic Rule Management: Add as many Allow/Disallow paths as your site architecture requires.",
                    "Sitemap Integration: Built-in support for declaring your XML sitemap location.",
                    "Instant Validation: Preview the exact text format that search engines expect.",
                    "Fast Deployment: Download a ready-to-use .txt file in seconds."
                ]}
                faqs={[
                    {
                        question: "Does robots.txt hide pages from users?",
                        answer: "No. Robots.txt only provides instructions to well-behaved automated bots. Humans can still access 'Disallowed' pages if they have the URL."
                    },
                    {
                        question: "Why should I disallow /admin/ folders?",
                        answer: "Administrative folders often contain sensitive login pages or temporary files that provide no value to search results. Disallowing them saves crawl budget for your real content."
                    },
                    {
                        question: "What is a 'User-Agent'?",
                        answer: "A User-Agent is a specific name for a bot. For example, 'Googlebot' is Google's crawler. Using an asterisk (*) makes the rule apply to every bot on the web."
                    }
                ]}
                relatedTools={[
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" },
                    { name: "Broken Link Checker", emoji: "🔗", path: "/tools/broken-links" },
                    { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" },
                    { name: "URL Canonical", emoji: "🔍", path: "/tools/canonical" }
                ]}
            />
        </div>
    );
};

export default RobotsTxtGenerator;
