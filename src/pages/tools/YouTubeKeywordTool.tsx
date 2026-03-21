import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const ytKeywords: Record<string, string[]> = {
    "cooking": ["easy recipes", "cooking for beginners", "quick dinner ideas", "healthy meal prep", "homemade pizza", "one pot meals", "5 ingredient recipes", "vegan cooking"],
    "fitness": ["home workout", "lose weight fast", "gym beginner guide", "abs workout", "yoga flow", "cardio workout", "strength training", "workout motivation"],
    "tech": ["best smartphones 2025", "laptop reviews", "ai tools", "coding tutorial", "tech news", "gadget review", "software tips", "programming for beginners"],
    "finance": ["how to invest", "passive income", "stock market basics", "crypto guide", "save money tips", "budget planning", "credit score", "financial freedom"],
    "gaming": ["gaming setup", "best budget pc", "game review", "fps tutorial", "esports", "game walkthrough", "gaming tips", "streaming setup"],
};

const YouTubeKeywordTool = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        if (!query.trim()) return;
        const key = query.toLowerCase().trim();
        const base = ytKeywords[key] ?? [];
        const words = key.split(" ");
        const generated = [
            ...base,
            `${key} 2025`, `${key} tutorial`, `${key} for beginners`, `how to ${key}`,
            `best ${key}`, `${key} tips`, `${key} guide`, `${key} ideas`, `${key} review`,
            `top 10 ${key}`, `${key} explained`, `${key} app`, `${key} hacks`,
            ...words.flatMap(w => [`${w} channel`, `${w} video`, `youtube ${w}`])
        ];
        setResults([...new Set(generated)].slice(0, 24));
    };

    const copyAll = () => {
        navigator.clipboard.writeText(results.join(", "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">▶️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">YouTube Keyword Tool</h1>
                <p className="text-muted-foreground font-bold">Find the best keywords for YouTube SEO & video titles</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
                        placeholder="Enter niche/topic (e.g. cooking)" className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                    <button onClick={generate} className="bg-comic-red hover:bg-comic-red/90 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center">Search</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.keys(ytKeywords).map(k => (
                        <button key={k} onClick={() => setQuery(k)} className="px-3 py-1 bg-muted hover:bg-comic-red hover:text-white rounded-lg text-xs font-bold border border-border transition-colors capitalize">{k}</button>
                    ))}
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex justify-between items-center">
                        <h3 className="font-black text-foreground">▶️ {results.length} YouTube Keywords</h3>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2">
                        {results.map((kw, i) => (
                            <span key={i} onClick={() => navigator.clipboard.writeText(kw)} title="Click to copy"
                                className="px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm font-bold text-foreground hover:bg-comic-red hover:text-white cursor-pointer transition-colors">
                                #{kw.replace(/ /g, "")}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="YouTube Keyword Tool - Free YouTube SEO Keywords" description="Find the best YouTube keywords for your videos. Optimize video titles, descriptions and tags with our free YouTube keyword research tool." keywords="youtube keyword tool, youtube seo, youtube tags generator, video keywords, youtube keyword research" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "YouTube Keyword Tool", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="YouTube Keyword Tool" subtitle="Rank Higher on YouTube Search" description="YouTube is the world's second-largest search engine. Use our YouTube keyword tool to discover tags and titles that will help your videos rank higher." howToUse={["Enter your video topic or niche", "Click Search to generate keywords", "Browse 24+ YouTube-specific keywords", "Click any keyword to copy it", "Use tags in your YouTube video"]} features={["24+ YouTube Keywords", "Niche-Specific Tags", "Hashtag Format", "Copy All Feature", "Popular Niche Examples"]} faqs={[{ question: "How do YouTube keywords work?", answer: "YouTube keywords in titles, descriptions, and tags help YouTube understand your video content and match it to user searches. More relevant keywords = higher rankings." }]} relatedTools={[{ name: "Hashtag Generator", emoji: "#️⃣", path: "/tools/hashtags" }, { name: "YouTube Stats", emoji: "📊", path: "/tools/youtube-stats" }]} />
        </div>
    );
};
export default YouTubeKeywordTool;
