import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const MetaDescriptionGenerator = () => {
    const [topic, setTopic] = useState("");
    const [keyword, setKeyword] = useState("");
    const [style, setStyle] = useState("benefit");
    const [results, setResults] = useState<string[]>([]);
    const [copied, setCopied] = useState<number | null>(null);

    const templates: Record<string, string[]> = {
        benefit: [
            `Discover the best [TOPIC] tools and strategies. Learn how to [BENEFIT] with our free, comprehensive guide. No experience needed!`,
            `Looking for [TOPIC]? Get expert tips, step-by-step guides, and proven strategies to [BENEFIT]. Start for free today!`,
            `Boost your results with our [TOPIC] guide. [BENEFIT] with actionable tips from experts. 100% free, no login required.`,
        ],
        question: [
            `Wondering how to master [TOPIC]? Our complete guide answers all your questions about [KEYWORD] with expert insights and tips.`,
            `What is [TOPIC] and how does it work? Find out everything about [KEYWORD] in our detailed, easy-to-understand guide.`,
        ],
        urgency: [
            `Don't miss out! Learn [TOPIC] before your competitors do. Master [KEYWORD] with our step-by-step guide updated for [YEAR].`,
            `Act now! Discover the top [TOPIC] secrets for [YEAR]. Get ahead with proven [KEYWORD] strategies used by experts.`,
        ],
        simple: [
            `Learn everything about [TOPIC]. Our guide covers [KEYWORD] basics to advanced tips. Updated for [YEAR].`,
            `[TOPIC] explained clearly. Find [KEYWORD] tutorials, tips, and tools in one place. Completely free.`,
        ],
    };

    const generate = () => {
        if (!topic.trim()) return;
        const year = new Date().getFullYear();
        const benefit = `achieve your ${topic} goals`;
        const tmpl = templates[style];
        const generated = tmpl.map(t =>
            t.replace(/\[TOPIC\]/g, topic).replace(/\[KEYWORD\]/g, keyword || topic).replace(/\[YEAR\]/g, String(year)).replace(/\[BENEFIT\]/g, benefit)
        );
        setResults(generated);
    };

    const copy = (text: string, i: number) => {
        navigator.clipboard.writeText(text);
        setCopied(i);
        setTimeout(() => setCopied(null), 2000);
    };

    const getColor = (n: number) => n <= 155 ? "text-green-500" : n <= 175 ? "text-yellow-500" : "text-red-500";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📄</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Meta Description Generator</h1>
                <p className="text-muted-foreground font-bold">Create compelling meta descriptions that improve click-through rates</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Topic / Page Subject</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. SEO audit, weight loss, Python"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🔑 Target Keyword (optional)</label>
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. free seo tools"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Writing Style</label>
                    <div className="flex flex-wrap gap-2">
                        {["benefit", "question", "urgency", "simple"].map(s => (
                            <button key={s} onClick={() => setStyle(s)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${style === s ? "bg-comic-green text-white" : "bg-muted hover:bg-muted/80"}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} className="w-full bg-comic-green hover:bg-comic-green/90 text-white font-bold py-4 rounded-xl text-lg">
                    📄 Generate Descriptions
                </button>
            </div>

            {results.length > 0 && (
                <div className="space-y-3">
                    {results.map((desc, i) => {
                        const len = desc.length;
                        return (
                            <div key={i} className="bg-card border-4 border-border rounded-2xl p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-foreground font-bold flex-1 text-sm">{desc}</p>
                                    <button onClick={() => copy(desc, i)} className={`shrink-0 px-3 py-1.5 rounded-xl text-sm font-bold ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                        {copied === i ? "✅" : "Copy"}
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${len <= 155 ? "bg-green-500" : len <= 175 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${Math.min((len / 175) * 100, 100)}%` }} />
                                    </div>
                                    <span className={`text-xs font-black ${getColor(len)}`}>{len}/155</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <SEOHead title="Meta Description Generator - Free SEO Description Tool" description="Generate click-worthy meta descriptions for any web page. Create compelling, keyword-rich descriptions under 155 characters with our free tool." keywords="meta description generator, seo description tool, meta description writer, page description generator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Meta Description Generator", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Meta Description Generator" subtitle="Write Descriptions That Get More Clicks" description="A well-written meta description can significantly increase your click-through rate from search results. Our generator creates multiple description styles with real-time character counting." howToUse={["Enter your page topic", "Add your target keyword", "Choose a writing style", "Click Generate Descriptions", "Copy the best description"]} features={["Multiple Writing Styles", "155-Character Limit Tracking", "Keyword Integration", "Copy Individual Descriptions", "Real-time Length Indicator"]} faqs={[{ question: "What's the ideal meta description length?", answer: "Google typically shows 155-160 characters. Keep descriptions under 155 characters to prevent truncation. Include your primary keyword naturally." }]} relatedTools={[{ name: "Meta Title Generator", emoji: "📝", path: "/tools/meta-title-generator" }, { name: "SERP Preview", emoji: "👁️", path: "/tools/serp-preview" }]} />
        </div>
    );
};
export default MetaDescriptionGenerator;
