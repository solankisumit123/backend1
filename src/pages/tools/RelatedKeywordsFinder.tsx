import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const relatedMap: Record<string, string[]> = {
    "seo": ["search engine optimization", "seo audit", "on-page seo", "technical seo", "local seo", "mobile seo", "seo strategy", "seo checklist", "seo best practices", "white hat seo"],
    "marketing": ["digital marketing", "content marketing", "email marketing", "social media marketing", "affiliate marketing", "influencer marketing", "video marketing", "inbound marketing"],
    "website": ["website design", "website builder", "website traffic", "website speed", "website audit", "mobile website", "website security", "website hosting"],
    "keyword": ["long tail keywords", "keyword research", "keyword density", "keyword ranking", "keyword difficulty", "keyword analysis", "LSI keywords"],
};

const RelatedKeywordsFinder = () => {
    const [seed, setSeed] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const find = () => {
        if (!seed.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const key = seed.toLowerCase().trim();
            const base = relatedMap[key] ?? [];
            const words = key.split(" ");
            const generated: string[] = [
                ...base,
                `best ${key}`, `free ${key}`, `${key} tools`, `${key} tips`, `${key} guide`,
                `${key} for beginners`, `${key} tutorial`, `${key} 2025`, `${key} examples`, `${key} strategy`,
                ...words.flatMap(w => [`${w} tools`, `${w} tips`, `online ${w}`, `free ${w}`]),
                `how to do ${key}`, `what is ${key}`, `${key} vs competitor`, `${key} checklist`
            ];
            setResults([...new Set(generated)].slice(0, 25));
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
                <div className="text-5xl mb-3">🔗</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Related Keywords Finder</h1>
                <p className="text-muted-foreground font-bold">Find semantically related keywords & LSI keywords for your topic</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex gap-3">
                    <input value={seed} onChange={e => setSeed(e.target.value)} onKeyDown={e => e.key === "Enter" && find()}
                        placeholder="Enter seed keyword..." className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                    <button onClick={find} disabled={loading} className="bg-comic-red hover:bg-comic-red/90 text-white font-bold px-6 py-3 rounded-xl">{loading ? "Finding..." : "Find Related"}</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {["seo", "marketing", "website", "keyword"].map(k => (
                        <button key={k} onClick={() => setSeed(k)} className="px-3 py-1 bg-muted hover:bg-comic-red hover:text-white rounded-lg text-xs font-bold border border-border transition-colors">{k}</button>
                    ))}
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex justify-between items-center">
                        <h3 className="font-black text-foreground">🔗 {results.length} Related Keywords</h3>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2 max-h-[400px] overflow-y-auto">
                        {results.map((kw, i) => (
                            <span key={i} onClick={() => navigator.clipboard.writeText(kw)} title="Click to copy"
                                className="px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm font-bold text-foreground hover:bg-comic-blue hover:text-white cursor-pointer transition-colors">
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="Related Keywords Finder - LSI Keyword Generator" description="Discover semantically related keywords and LSI terms for any seed keyword. Improve your content's topical relevance and SEO rankings." keywords="related keywords finder, lsi keywords, semantic keywords, related keywords generator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Related Keywords Finder", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Related Keywords Finder" subtitle="Find LSI & Semantic Keywords" description="LSI (Latent Semantic Indexing) keywords help Google understand your content's context. Our tool generates related terms to improve your content's topical authority." howToUse={["Enter your seed keyword", "Click Find Related", "Browse 25+ related keywords", "Click any keyword to copy it", "Use in your content naturally"]} features={["25+ Related Keywords", "Semantic Variations", "LSI Keywords", "Topic Expansion Ideas", "Click to Copy"]} faqs={[{ question: "What are LSI keywords?", answer: "LSI (Latent Semantic Indexing) keywords are terms semantically related to your main keyword. Using them helps search engines understand your content better and can improve rankings." }]} relatedTools={[{ name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }, { name: "Keyword Density", emoji: "📊", path: "/tools/keyword-density" }]} />
        </div>
    );
};
export default RelatedKeywordsFinder;
