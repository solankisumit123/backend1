import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const amzKeywords: Record<string, string[]> = {
    "laptop": ["gaming laptop", "laptop under 50000", "best laptop 2025", "thin light laptop", "laptop for students", "laptop with ssd", "laptop with backlit keyboard", "ultrabook"],
    "headphones": ["wireless headphones", "noise cancelling headphones", "best earbuds", "gaming headset", "bluetooth headphones under 2000", "over ear headphones", "wired earphones"],
    "phone": ["best smartphone under 20000", "5g phone", "phone with long battery life", "camera phone", "budget smartphone", "android phone", "phone for gaming"],
    "shoes": ["running shoes for men", "sports shoes", "walking shoes women", "sneakers under 2000", "casual shoes", "leather shoes men", "flip flops"],
    "supplement": ["whey protein", "vitamin d supplement", "omega 3 capsules", "multivitamin tablets", "bcaa supplement", "creatine monohydrate", "pre workout"],
};

const AmazonKeywordTool = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        if (!query.trim()) return;
        const key = query.toLowerCase().trim();
        const base = amzKeywords[key] ?? [];
        const generated = [
            ...base,
            `best ${key}`, `${key} review`, `${key} under 1000`, `${key} online`,
            `buy ${key}`, `cheap ${key}`, `top rated ${key}`, `${key} deals`,
            `${key} comparison`, `${key} for beginners`, `${key} gift`, `${key} sale`,
            `amazon ${key}`, `${key} price`
        ];
        setResults([...new Set(generated)].slice(0, 22));
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
                <div className="text-5xl mb-3">📦</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Amazon Keyword Tool</h1>
                <p className="text-muted-foreground font-bold">Find high-converting Amazon product keywords for sellers & affiliates</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex gap-3">
                    <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
                        placeholder="Enter product category (e.g. laptop)" className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    <button onClick={generate} className="bg-comic-orange hover:bg-comic-orange/90 text-white font-bold px-6 py-3 rounded-xl">Search</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.keys(amzKeywords).map(k => (
                        <button key={k} onClick={() => setQuery(k)} className="px-3 py-1 bg-muted hover:bg-comic-orange hover:text-white rounded-lg text-xs font-bold border border-border transition-colors capitalize">{k}</button>
                    ))}
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex justify-between items-center">
                        <h3 className="font-black text-foreground">📦 {results.length} Amazon Keywords</h3>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 space-y-2 max-h-[450px] overflow-y-auto">
                        {results.map((kw, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border hover:bg-muted/40 group">
                                <span className="font-bold text-foreground text-sm">{kw}</span>
                                <button onClick={() => navigator.clipboard.writeText(kw)} className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-comic-orange text-white rounded">Copy</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="Amazon Keyword Tool - Free Amazon Product Keywords" description="Find high-converting Amazon keywords for product listings and affiliate marketing. Optimize your Amazon SEO with our free keyword tool." keywords="amazon keyword tool, amazon seo keywords, amazon product keywords, amazon affiliate keywords" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Amazon Keyword Tool", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Amazon Keyword Tool" subtitle="Rank Higher on Amazon Search" description="Amazon is the world's largest product search engine. Our tool helps Amazon sellers and affiliates find the most searched product keywords to increase visibility and sales." howToUse={["Enter your product category", "Click Search", "Browse 22+ Amazon keywords", "Click any keyword to copy", "Use in product titles and descriptions"]} features={["22+ Product Keywords", "Category-Specific Suggestions", "Buyer Intent Keywords", "Price-Based Keywords", "Amazon-Optimized Terms"]} faqs={[{ question: "How do Amazon keywords affect sales?", answer: "Amazon ranks products based on keyword relevance. Using the right keywords in your product title, bullet points, and backend keywords significantly increases visibility and sales." }]} relatedTools={[{ name: "YouTube Keyword Tool", emoji: "▶️", path: "/tools/youtube-keyword" }, { name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }]} />
        </div>
    );
};
export default AmazonKeywordTool;
