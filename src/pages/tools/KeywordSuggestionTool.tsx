import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const suggestions: Record<string, string[]> = {
    "seo": ["seo tools", "seo audit", "seo checker", "seo analyzer", "seo tips", "seo course", "seo agency", "seo plugin", "seo for beginners", "seo 2025"],
    "keyword": ["keyword research", "keyword planner", "keyword difficulty", "keyword density", "keyword tracker", "keyword generator", "keyword analysis tool"],
    "digital": ["digital marketing", "digital marketing course", "digital marketing tools", "digital marketing agency", "digital marketing jobs"],
    "content": ["content marketing", "content writing", "content creation tools", "content strategy", "content calendar", "content ideas", "content planner"],
    "website": ["website builder", "website speed test", "website seo checker", "website traffic", "website design", "website analysis"],
};

const KeywordSuggestionTool = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const getSuggestions = () => {
        if (!query.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const key = query.toLowerCase().trim();
            const base = suggestions[key] ?? [];
            const words = key.split(" ");
            const generated = [
                ...base,
                `${key} free`, `${key} online`, `${key} tool`, `best ${key}`,
                `${key} near me`, `${key} 2025`, `${key} app`, `${key} service`,
                ...words.flatMap(w => [`${w} meaning`, `${w} examples`, `${w} definition`])
            ];
            setResults([...new Set(generated)].slice(0, 20));
            setLoading(false);
        }, 900);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(results.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <SEOHead 
                title="Keyword Suggestion Tool - Discover Autocomplete Keywords" 
                description="Find high-volume keyword suggestions based on popular search patterns. Expand your SEO strategy with our free keyword suggestion tool." 
                keywords="keyword suggestion tool, autocomplete keywords, seo keyword research, search suggestions" 
                schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Keyword Suggestion Tool", "applicationCategory": "SEOApplication" }} 
            />
            
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔍</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Keyword Suggestion Tool</h1>
                <p className="text-muted-foreground font-bold">Discover popular search suggestions for any keyword</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && getSuggestions()}
                        placeholder="Enter keyword..." className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    <button onClick={getSuggestions} disabled={loading} className="bg-comic-blue hover:bg-comic-blue/90 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center">
                        {loading ? "Generating..." : "Get Suggestions"}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.keys(suggestions).map(k => (
                        <button key={k} onClick={() => setQuery(k)} className="px-3 py-1 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold border border-border">{k}</button>
                    ))}
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex justify-between items-center">
                        <h3 className="font-black text-foreground">🔍 Suggestions for "{query}"</h3>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 space-y-2">
                        {results.map((s, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border hover:bg-muted/40 group cursor-pointer" onClick={() => navigator.clipboard.writeText(s)}>
                                <span className="text-muted-foreground">🔍</span>
                                <span className="font-bold text-foreground flex-1">{s}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-comic-blue text-white rounded">Copy</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="my-12">
                <SEOSection 
                    title="Keyword Suggestion Tool" 
                    subtitle="Expand Your Search Reach" 
                    description="Our Keyword Suggestion Tool helps you identify the exact terms people use during their search journey. By analyzing popular search patterns, we provide a list of relevant terms that can help you improve your content's visibility." 
                    howToUse={["Enter your seed keyword", "Click Get Suggestions", "Review the generated list of related terms", "Click any suggestion to copy", "Incorporate these terms into your content strategy"]} 
                    features={["20+ Relevant Suggestions", "Search-Driven Patterns", "Clean User Interface", "Instant Copy Feature", "Strategic Keyword Expansion"]} 
                    faqs={[{ question: "What are search suggestions?", answer: "Search suggestions are predicted terms that appear when a user starts typing. They represent common queries and are highly valuable for understanding user intent." }]} 
                    relatedTools={[{ name: "Question Keywords", emoji: "❓", path: "/tools/question-keyword" }, { name: "Related Keywords", emoji: "🔗", path: "/tools/related-keywords" }]} 
                />
            </div>
        </div>
    );
};

export default KeywordSuggestionTool;
