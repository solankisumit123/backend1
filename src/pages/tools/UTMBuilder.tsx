import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Link2, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";


const UTMBuilder = () => {
    const [url, setUrl] = useState("");
    const [source, setSource] = useState("");
    const [medium, setMedium] = useState("");
    const [campaign, setCampaign] = useState("");
    const [term, setTerm] = useState("");
    const [content, setContent] = useState("");
    const [finalUrl, setFinalUrl] = useState("");

    useEffect(() => {
        if (!url) {
            setFinalUrl("");
            return;
        }

        try {
            const base = url.startsWith("http") ? url : `https://${url}`;
            const urlObj = new URL(base);

            if (source) urlObj.searchParams.set("utm_source", source);
            if (medium) urlObj.searchParams.set("utm_medium", medium);
            if (campaign) urlObj.searchParams.set("utm_campaign", campaign);
            if (term) urlObj.searchParams.set("utm_term", term);
            if (content) urlObj.searchParams.set("utm_content", content);

            setFinalUrl(urlObj.toString());
        } catch {
            setFinalUrl("Invalid Base URL format.");
        }
    }, [url, source, medium, campaign, term, content]);

    const copyUrl = () => {
        if (!finalUrl || finalUrl === "Invalid Base URL format.") return;
        navigator.clipboard.writeText(finalUrl);
        toast.success("UTM Link copied!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔗 UTM Link Builder</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Create tracking URLs for Google Analytics, Facebook Ads, and marketing campaigns.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1 mb-2">
                            Website URL <span className="text-destructive">*</span>
                        </label>
                        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="comic-input w-full" />
                    </div>

                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1 mb-2">
                            Campaign Source <span className="text-destructive">*</span>
                        </label>
                        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="google, newsletter, facebook" className="comic-input w-full" />
                        <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1">Referrer: (e.g. google, facebook)</p>
                    </div>

                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Campaign Medium</label>
                        <input type="text" value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="cpc, email, banner" className="comic-input w-full" />
                    </div>

                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Campaign Name</label>
                        <input type="text" value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="spring_sale, promo_code" className="comic-input w-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="comic-card">
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Campaign Term</label>
                            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="paid+keywords" className="comic-input w-full" />
                        </div>
                        <div className="comic-card">
                            <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Content (A/B Test)</label>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="logolink, textlink" className="comic-input w-full" />
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="comic-card flex flex-col h-full bg-muted/30 border-dashed">
                    <div className="flex justify-between items-center mb-6">
                        <label className="text-sm font-bold text-primary uppercase flex items-center gap-2">
                            <Link2 className="w-5 h-5" /> Generated Campaign URL
                        </label>
                    </div>

                    <div className="w-full break-all font-mono text-sm bg-background p-4 rounded-xl border-2 border-border mb-6 min-h-[10rem]">
                        {finalUrl || "Start typing to generate your URL..."}
                    </div>

                    <div className="mt-auto flex gap-2">
                        <button
                            onClick={copyUrl}
                            disabled={!finalUrl || !url || finalUrl === "Invalid Base URL format."}
                            className="comic-btn bg-primary text-primary-foreground flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Copy className="w-5 h-5" /> Copy Full URL
                        </button>
                        <button
                            onClick={() => { setUrl(""); setSource(""); setMedium(""); setCampaign(""); setTerm(""); setContent(""); }}
                            className="comic-btn bg-destructive/10 text-destructive flex items-center justify-center p-3"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="UTM Link Builder - Custom Campaign URL Generator"
                description="Easily create custom tracking URLs for your marketing campaigns. Track traffic sources, mediums, and campaign names in Google Analytics with our UTM generator."
                keywords="utm builder, campaign url generator, google analytics tracker, marketing link maker, social media tracking"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro UTM Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "BusinessApplication"
                }}
            />

            <SEOSection
                title="Decode Your Traffic Sources with Precision UTM Tracking"
                subtitle="The Marketer's Secret to Clean Data and ROI Analysis"
                description="You shouldn't have to guess where your users are coming from. UTM (Urchin Tracking Module) parameters are simple snippets of code added to the end of your URLs that tell Google Analytics and other data platforms exactly which link was clicked. Whether it's a social media post, an email footer, or a paid banner ad, our UTM Link Builder ensures your URLs are perfectly formatted and ready for high-level marketing analysis."
                howToUse={[
                    "Paste your destination 'Website URL' in the first box.",
                    "Define a 'Campaign Source' (e.g., google, newsletter) to identify the platform.",
                    "Specify a 'Campaign Medium' (e.g., cpc, email) to describe the type of link.",
                    "Add a 'Campaign Name' to group your data under a specific promotion or sale.",
                    "Copy the generated 'Campaign URL' and use it for your advertisements or posts."
                ]}
                features={[
                    "Real-Time Generation: See your URL update instantly as you fill in each parameter.",
                    "Standard Parameter Support: Supports Source, Medium, Campaign, Term (keywords), and Content.",
                    "Auto-Formatting: Automatically handles '?' and '&' logic so your URLs never break.",
                    "One-Click Copy: Instantly move your long tracking link to your clipboard.",
                    "Clean Interface: No ads or distractions while you build your marketing stack."
                ]}
                faqs={[
                    {
                        question: "Are UTM parameters case-sensitive?",
                        answer: "Yes. Google Analytics treats 'Email' and 'email' as two different mediums. For clean data, we recommend always using lowercase."
                    },
                    {
                        question: "Do UTM links hurt SEO?",
                        answer: "No. Search engines recognize UTM parameters and typically ignore them for ranking purposes, focusing on the base URL instead."
                    },
                    {
                        question: "What is 'Campaign Term' used for?",
                        answer: "It is primarily used for paid search (PPC) to track which specific keyword triggered the ad that the user clicked."
                    }
                ]}
                relatedTools={[
                    { name: "URL Slug Generator", emoji: "🔗", path: "/tools/url-slug-generator" },
                    { name: "QR Code Generator", emoji: "🏁", path: "/tools/qr-code" },
                    { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" }
                ]}
            />
        </div>
    );
};

export default UTMBuilder;
