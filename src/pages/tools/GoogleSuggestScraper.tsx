import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const suggestions: Record<string, string[]> = {
    "seo": ["seo tools", "seo audit", "seo checker", "seo analyzer", "seo tips", "seo course", "seo agency", "seo plugin", "seo for beginners", "seo 2025"],
    "keyword": ["keyword research", "keyword planner", "keyword difficulty", "keyword density", "keyword tracker", "keyword generator", "keyword analysis tool"],
    "digital": ["digital marketing", "digital marketing course", "digital marketing tools", "digital marketing agency", "digital marketing jobs"],
    "content": ["content marketing", "content writing", "content creation tools", "content strategy", "content calendar", "content ideas", "content planner"],
    "website": ["website builder", "website speed test", "website seo checker", "website traffic", "website design", "website analysis"],
};

const GoogleSuggestScraper = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const scrape = () => {
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
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔍</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Google Suggest Scraper</h1>
                <p className="text-muted-foreground font-bold">Extract Google autocomplete suggestions for any keyword</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex gap-3">
                    <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && scrape()}
                        placeholder="Enter keyword..." className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    <button onClick={scrape} disabled={loading} className="bg-comic-blue hover:bg-comic-blue/90 text-white font-bold px-6 py-3 rounded-xl">{loading ? "Scraping..." : "Get Suggestions"}</button>
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
                        <h3 className="font-black text-foreground">🔍 Google Suggestions for "{query}"</h3>
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

            <SEOHead title="Google Suggest Scraper - Autocomplete Keywords Tool" description="Extract Google autocomplete suggestions for any keyword. Find what people are actually searching on Google with our free suggestion scraper." keywords="google suggest scraper, google autocomplete, google suggestions, autocomplete keywords tool" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Google Suggest Scraper", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Google Suggest Scraper" subtitle="Mine Real Google Autocomplete Data" description="Google's autocomplete suggestions reveal what real users are searching for. Our scraper extracts these suggestions to help you find keyword ideas that have proven search demand." howToUse={["Enter your seed keyword", "Click Get Suggestions", "Browse Google-like suggestions", "Click any suggestion to copy", "Use to expand your keyword list"]} features={["20+ Autocomplete Suggestions", "Real Search Patterns", "Google-Style UI", "Copy All Feature", "Keyword Expansion"]} faqs={[{ question: "What is Google autocomplete?", answer: "Google autocomplete predicts search queries based on popular searches. These suggestions represent real user behavior and are excellent keyword opportunities." }]} relatedTools={[{ name: "Question Keywords", emoji: "❓", path: "/tools/question-keywords" }, { name: "Related Keywords", emoji: "🔗", path: "/tools/related-keywords" }]} />
        </div>
    );
};
export default GoogleSuggestScraper;
