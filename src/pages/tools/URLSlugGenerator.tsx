import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, LinkIcon, Copy } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";


const URLSlugGenerator = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        // Real-time slug generation
        const newSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove non-word chars
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

        setSlug(newSlug);
    }, [title]);

    const handleCopy = () => {
        if (!slug) return;
        navigator.clipboard.writeText(slug);
        toast.success("Slug copied to clipboard!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔗 URL Slug Generator</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Convert any title into a clean, SEO-friendly URL slug.</p>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Enter Post / Page Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 10 Best SEO Tools in 2026!"
                    className="comic-input w-full text-lg mb-6"
                />

                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Generated SEO Slug</label>
                <div className="relative">
                    <div className="comic-input w-full bg-muted/30 break-all font-mono text-primary flex items-center min-h-[3rem] py-2 pr-24">
                        {slug || "your-seo-friendly-slug"}
                    </div>
                    <button
                        onClick={handleCopy}
                        disabled={!slug}
                        className="absolute right-2 top-1/2 -translate-y-1/2 comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1 px-3 py-1.5 disabled:opacity-50"
                    >
                        <Copy className="w-3 h-3" /> Copy
                    </button>
                </div>
            </div>

            <div className="comic-card bg-comic-green/10 border-comic-green">
                <h3 className="font-bold text-comic-green flex items-center gap-2 mb-2">
                    <LinkIcon className="w-5 h-5" /> Why slugs matter for SEO?
                </h3>
                <ul className="list-disc pl-5 text-sm font-bold text-muted-foreground space-y-1">
                    <li>Short, descriptive URLs rank better on Google.</li>
                    <li>Always use hyphens <code className="bg-background px-1 border border-border rounded">-</code> instead of underscores <code className="bg-background px-1 border border-border rounded">_</code>.</li>
                    <li>Remove "stop words" (a, the, and, etc.) for shorter slugs.</li>
                    <li>Avoid special characters and emojis in URLs.</li>
                </ul>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="SEO URL Slug Generator - Create Clean Permalinks"
                description="Easily convert any title or phrase into a clean, SEO-friendly URL slug. Remove special characters and format hyphens correctly for Google ranking."
                keywords="url slug generator, seo permalink maker, slug creator, clean url tool, google friendly url"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Slug Generator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Create High-Ranking Permalinks in Seconds"
                subtitle="The Secret to Clean, Readable, and Indexable URLs"
                description="A URL slug is the part of the web address that identifies a specific page in a human-readable format. Search engines like Google give priority to URLs that are simple, descriptive, and contain relevant keywords. Our URL Slug Generator automatically strips out disruptive special characters, handles casing, and ensures consistent hyphenation, allowing you to focus on creating great titles while we handle the technical permalink optimization."
                howToUse={[
                    "Enter your 'Page Title' or the main heading of your blog post.",
                    "Watch the 'Generated SEO Slug' update in real-time.",
                    "Review the slug to ensure no important keywords were stripped out by accident.",
                    "Click 'Copy' to move the slug to your clipboard.",
                    "Paste the slug into your CMS (WordPress, Ghost, etc.) permalink settings."
                ]}
                features={[
                    "Instant Sanitization: Automatically removes punctuation, emojis, and non-ASCII characters.",
                    "SEO Native: Uses hyphens (-) by default, as recommended by Google's search central guidelines.",
                    "Live Preview: Visual feedback as you type your branding and title details.",
                    "Mobile Ready: Fast, responsive interface allows you to generate slugs on the go.",
                    "Privacy First: All slug generation occurs locally in your browser/memory."
                ]}
                faqs={[
                    {
                        question: "Why use hyphens instead of underscores?",
                        answer: "Google treats hyphens as word separators, while underscores are treated as part of the word. 'seo-tools' is seen as two words, whereas 'seo_tools' is seen as one."
                    },
                    {
                        question: "How long should a URL slug be?",
                        answer: "Ideally, keep slugs under 5 words. Short URLs are easier to share and appear more trustworthy in search engine result pages."
                    },
                    {
                        question: "Should I include dates in my slugs?",
                        answer: "Unless it is a news-related site, avoid dates. Keeping slugs evergreen (e.g., /best-seo-tools/ instead of /best-seo-tools-2024/) prevents your content from feeling outdated."
                    }
                ]}
                relatedTools={[
                    { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
                    { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" },
                    { name: "Word Counter", emoji: "📝", path: "/tools/word-counter" }
                ]}
            />
        </div>
    );
};

export default URLSlugGenerator;
