import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const MetaTitleGenerator = () => {
    const [topic, setTopic] = useState("");
    const [brand, setBrand] = useState("");
    const [style, setStyle] = useState("informational");
    const [results, setResults] = useState<string[]>([]);
    const [copied, setClipboard] = useState<number | null>(null);

    const styles: Record<string, string[]> = {
        informational: [`Complete Guide to [TOPIC] [YEAR]`, `What is [TOPIC]? Everything You Need to Know`, `[TOPIC]: A Beginner's Guide`, `How to Use [TOPIC] Effectively`, `Understanding [TOPIC]: Tips & Tricks`],
        listicle: [`Top 10 [TOPIC] Tips for Beginners`, `15 Best [TOPIC] Tools in [YEAR]`, `7 Proven [TOPIC] Strategies That Work`, `20 [TOPIC] Examples to Inspire You`],
        question: [`How to [TOPIC] Without Any Experience?`, `Is [TOPIC] Worth It? Honest Review`, `Why is [TOPIC] So Important in [YEAR]?`, `What's the Best [TOPIC] Strategy?`],
        product: [`Best [TOPIC] [YEAR] - Expert Review`, `[TOPIC] vs Competitors: Which is Better?`, `Buy [TOPIC] Online - Best Deals & Prices`, `[TOPIC] Review: Is It Worth Your Money?`],
        news: [`[TOPIC] [YEAR]: Everything You Need to Know`, `Breaking: [TOPIC] Changes Everything`, `[TOPIC] News & Updates [YEAR]`, `Latest [TOPIC] Trends and Insights`],
    };

    const generate = () => {
        if (!topic.trim()) return;
        const year = new Date().getFullYear() + 1;
        const templates = styles[style];
        const titles = templates.map(t =>
            t.replace(/\[TOPIC\]/g, topic).replace(/\[YEAR\]/g, String(year)) +
            (brand ? ` | ${brand}` : "")
        );
        setResults(titles);
    };

    const copy = (text: string, i: number) => {
        navigator.clipboard.writeText(text);
        setClipboard(i);
        setTimeout(() => setClipboard(null), 2000);
    };

    const getLength = (s: string) => s.length;
    const getLengthColor = (n: number) => n <= 60 ? "text-green-500" : n <= 70 ? "text-yellow-500" : "text-red-500";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📝</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Meta Title Generator</h1>
                <p className="text-muted-foreground font-bold">Generate SEO-optimized page titles that rank and get clicks</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Topic / Keyword</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)}
                        placeholder="e.g. SEO tools, weight loss, Python tutorial"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏷️ Brand Name (optional)</label>
                    <input value={brand} onChange={e => setBrand(e.target.value)}
                        placeholder="e.g. WebInsight Pro"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Content Style</label>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(styles).map(s => (
                            <button key={s} onClick={() => setStyle(s)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${style === s ? "bg-comic-blue text-white" : "bg-muted hover:bg-muted/80"}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    📝 Generate Titles
                </button>
            </div>

            {results.length > 0 && (
                <div className="space-y-3">
                    {results.map((title, i) => {
                        const len = getLength(title);
                        return (
                            <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 hover:border-comic-blue transition-colors">
                                <div className="flex items-start justify-between gap-3">
                                    <p className="font-bold text-foreground flex-1">{title}</p>
                                    <button onClick={() => copy(title, i)} className={`shrink-0 px-3 py-1.5 rounded-xl text-sm font-bold transition-colors ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                        {copied === i ? "✅" : "Copy"}
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all ${len <= 60 ? "bg-green-500" : len <= 70 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${Math.min((len / 70) * 100, 100)}%` }} />
                                    </div>
                                    <span className={`text-xs font-black ${getLengthColor(len)}`}>{len}/60</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <SEOHead title="Meta Title Generator - SEO Title Tag Generator Free" description="Generate SEO-optimized meta titles for any topic. Get click-worthy, 60-character page titles with our free meta title generator tool." keywords="meta title generator, seo title generator, title tag generator, page title generator, seo title ideas" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Meta Title Generator", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Meta Title Generator" subtitle="Craft Perfect SEO Title Tags" description="A great meta title increases both search rankings and click-through rates. Our generator creates multiple title variations with character count tracking to ensure you stay within Google's 60-character limit." howToUse={["Enter your topic or main keyword", "Add your brand name (optional)", "Choose a content style", "Click Generate Titles", "Copy your favorite title"]} features={["5 Content Style Templates", "Character Counter", "Brand Name Integration", "Year Auto-Insert", "Visual Length Indicator"]} faqs={[{ question: "How long should a meta title be?", answer: "Google typically displays the first 50-60 characters of a title tag. Keep titles under 60 characters to prevent truncation in search results." }, { question: "Should I include my brand in the title?", answer: "Yes, adding your brand name at the end of the title helps with brand recognition. Use the format: 'Primary Keyword | Brand Name'." }]} relatedTools={[{ name: "Meta Tags Generator", emoji: "🏷️", path: "/tools/meta-tags" }, { name: "SERP Preview", emoji: "👁️", path: "/tools/serp-preview" }]} />
        </div>
    );
};
export default MetaTitleGenerator;
