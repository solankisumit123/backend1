import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, Download } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";


const SitemapGenerator = () => {
    const [domain, setDomain] = useState("https://example.com");
    const [pages, setPages] = useState([
        { url: "/", priority: "1.0", changefreq: "daily" },
        { url: "/about", priority: "0.8", changefreq: "monthly" },
        { url: "/contact", priority: "0.6", changefreq: "yearly" },
        { url: "/blog", priority: "0.9", changefreq: "weekly" },
    ]);
    const [copied, setCopied] = useState(false);

    const addPage = () => setPages([...pages, { url: "/new-page", priority: "0.5", changefreq: "monthly" }]);
    const removePage = (i: number) => setPages(pages.filter((_, idx) => idx !== i));
    const updatePage = (i: number, key: string, val: string) => {
        const updated = [...pages];
        updated[i] = { ...updated[i], [key]: val };
        setPages(updated);
    };

    const today = new Date().toISOString().split("T")[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${domain}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    const handleCopy = () => { navigator.clipboard.writeText(xml); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    const handleDownload = () => {
        const blob = new Blob([xml], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "sitemap.xml";
        link.click();
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🗺️ Sitemap Generator</h1>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Website Domain</label>
                <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="comic-input mb-4" />

                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Pages ({pages.length})</label>
                {pages.map((p, i) => (
                    <div key={i} className="flex gap-2 mb-2 flex-wrap animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                        <input type="text" value={p.url} onChange={(e) => updatePage(i, "url", e.target.value)} className="comic-input flex-1 min-w-[120px]" placeholder="/page" />
                        <select value={p.priority} onChange={(e) => updatePage(i, "priority", e.target.value)} className="comic-input w-24">
                            {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"].map((v) => <option key={v}>{v}</option>)}
                        </select>
                        <select value={p.changefreq} onChange={(e) => updatePage(i, "changefreq", e.target.value)} className="comic-input w-28">
                            {["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map((v) => <option key={v}>{v}</option>)}
                        </select>
                        <button onClick={() => removePage(i)} className="comic-btn bg-destructive/10 text-destructive text-sm px-3">✕</button>
                    </div>
                ))}
                <button onClick={addPage} className="comic-btn bg-card text-foreground text-sm w-full mt-1">+ Add Page</button>
            </div>

            <div className="comic-card animate-slide-up">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">XML Sitemap Preview</label>
                    <div className="flex gap-2">
                        <button onClick={handleCopy} className="comic-btn text-xs bg-card text-foreground flex items-center gap-1">
                            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copied!" : "Copy"}
                        </button>
                        <button onClick={handleDownload} className="comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1">
                            <Download className="w-3 h-3" /> Download .xml
                        </button>
                    </div>
                </div>
                <pre className="comic-input font-mono text-xs bg-background/50 whitespace-pre-wrap overflow-auto" style={{ maxHeight: "300px" }}>{xml}</pre>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="XML Sitemap Generator - Create Sitemaps for Google & Bing"
                description="Easily create valid XML sitemaps for your website. Add pages, set priorities, and customize change frequencies to help search engines crawl your site faster."
                keywords="xml sitemap generator, create sitemap online, seo sitemap tool, google sitemap maker, website crawling tool"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Sitemap Generator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="The Modern Path to Faster Search Indexing"
                subtitle="Help Search Crawlers Navigate Your Digital Architecture"
                description="An XML sitemap is a roadmap for search engine bots. Instead of waiting for a crawler to find your pages via links, a sitemap tells them exactly which pages exist, how important they are, and when they were last updated. WebInsight Pro simplifies this technical requirement, allowing you to build, customize, and export a perfectly formatted sitemap without touch a single line of code."
                howToUse={[
                    "Enter your 'Website Domain' (including https://) in the top field.",
                    "Review the default pages or use '+ Add Page' to include your custom URLs.",
                    "Set the 'Priority' (0.1 to 1.0) to signal which pages are most important.",
                    "Adjust the 'Change Frequency' (Daily, Weekly, etc.) to match your content updates.",
                    "Click 'Download .xml' and upload the file to your website's root directory."
                ]}
                features={[
                    "Valid XML Schema: Generates code that strictly follows sitemap.org 0.9 protocols.",
                    "Priority Controls: Help search engines understand the hierarchy of your content.",
                    "Frequency Customization: Signal how often bots should revisit specific sections.",
                    "Instant XML Preview: See your modifications reflected in real-time in the preview box.",
                    "One-Click Download: Export a ready-to-use sitemap.xml file instantly."
                ]}
                faqs={[
                    {
                        question: "Where do I put the sitemap.xml file?",
                        answer: "You should upload it to the 'root' directory of your web server (e.g., example.com/sitemap.xml). After uploading, submit the URL to Google Search Console."
                    },
                    {
                        question: "What is the 'Priority' setting for?",
                        answer: "It tells search engines which pages you consider most important on a scale of 0.0 to 1.0. Your homepage usually gets a 1.0, while sub-pages get lower values."
                    },
                    {
                        question: "Do I need a sitemap for small websites?",
                        answer: "Yes! While robots can find your pages eventually, a sitemap ensures they find them much faster, especially for new sites with few external links."
                    }
                ]}
                relatedTools={[
                    { name: "Broken Link Checker", emoji: "🔗", path: "/tools/broken-links" },
                    { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" },
                    { name: "Robots.txt Generator", emoji: "🤖", path: "/tools/robots-txt" },
                    { name: "URL Canonical", emoji: "🔍", path: "/tools/canonical" }
                ]}
            />
        </div>
    );
};


export default SitemapGenerator;
