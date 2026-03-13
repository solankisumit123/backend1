import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const modifiers = {
    question: ["how to", "what is", "why is", "when to", "where to", "which is best", "can you", "is it possible to"],
    comparison: ["vs", "versus", "compared to", "alternative to", "instead of", "or"],
    location: ["near me", "in india", "online free", "for beginners", "for small business", "in 2025", "in 2026"],
    intent: ["best", "free", "cheap", "easy", "fast", "top 10", "guide", "tutorial", "tips", "checklist"],
};

const LongTailKeywordFinder = () => {
    const [seed, setSeed] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        if (!seed.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const kw = seed.trim().toLowerCase();
            const longTails: string[] = [];
            modifiers.question.forEach(q => longTails.push(`${q} ${kw}`));
            modifiers.intent.forEach(i => longTails.push(`${i} ${kw}`));
            modifiers.location.forEach(l => longTails.push(`${kw} ${l}`));
            modifiers.comparison.forEach(c => longTails.push(`${kw} ${c} competitor`));
            longTails.push(`${kw} for free`, `${kw} step by step`, `${kw} without experience`, `${kw} complete guide`, `${kw} tools list`, `${kw} checklist 2026`);
            setResults([...new Set(longTails)].slice(0, 30));
            setLoading(false);
        }, 800);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(results.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🐟</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Long Tail Keyword Finder</h1>
                <p className="text-muted-foreground font-bold">Generate 30+ long-tail keywords from any seed keyword</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">🌱 Seed Keyword</label>
                <div className="flex gap-3">
                    <input value={seed} onChange={e => setSeed(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
                        placeholder="e.g. seo tools" className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple transition-colors" />
                    <button onClick={generate} disabled={loading}
                        className="bg-comic-purple hover:bg-comic-purple/90 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02]">
                        {loading ? "..." : "Generate"}
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex items-center justify-between">
                        <h3 className="font-black text-foreground">📋 {results.length} Long-Tail Keywords</h3>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 grid gap-2 max-h-[500px] overflow-y-auto">
                        {results.map((kw, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border hover:bg-muted/40 group">
                                <span className="font-bold text-foreground text-sm">{kw}</span>
                                <button onClick={() => navigator.clipboard.writeText(kw)} className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-comic-blue text-white rounded font-bold transition-all">Copy</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="Long Tail Keyword Finder - Free SEO Tool" description="Generate 30+ long-tail keywords from any seed keyword. Find low-competition, high-converting long-tail keywords for SEO." keywords="long tail keyword finder, long tail keywords, keyword generator, seo keywords" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Long Tail Keyword Finder", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Long Tail Keyword Generator" subtitle="Find Low-Competition Keywords That Convert" description="Long-tail keywords are longer, more specific phrases that visitors use when they're closer to making a purchase. Our tool generates 30+ variations." howToUse={["Enter a seed keyword", "Click Generate", "Browse 30+ long-tail suggestions", "Copy individual or all keywords", "Use in your content strategy"]} features={["30+ keyword variations", "Question-based keywords", "Location modifiers", "Intent-based keywords", "One-click copy"]} faqs={[{ question: "Why target long-tail keywords?", answer: "Long-tail keywords have lower competition and higher conversion rates. They're easier to rank for and attract more qualified traffic." }]} relatedTools={[{ name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }, { name: "Keyword Density", emoji: "📊", path: "/tools/keyword-density" }]} />
        </div>
    );
};
export default LongTailKeywordFinder;
