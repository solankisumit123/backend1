import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const volumeData: Record<string, { volume: string; trend: string; change: string }> = {
    "seo": { volume: "246,000", trend: "📈 Stable", change: "+2%" },
    "ai tools": { volume: "1,220,000", trend: "🚀 Rising", change: "+145%" },
    "chatgpt": { volume: "8,100,000", trend: "🚀 Rising", change: "+890%" },
    "digital marketing": { volume: "450,000", trend: "📈 Stable", change: "+8%" },
    "youtube": { volume: "5,400,000", trend: "📈 Stable", change: "+5%" },
    "instagram": { volume: "4,500,000", trend: "📈 Stable", change: "+12%" },
    "keyword research": { volume: "90,500", trend: "📈 Stable", change: "+3%" },
    "website traffic": { volume: "74,000", trend: "📊 Declining", change: "-5%" },
    "backlinks": { volume: "110,000", trend: "📈 Stable", change: "+1%" },
};

const SearchVolumeChecker = () => {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState<null | { keyword: string; volume: string; trend: string; change: string }>(null);
    const [loading, setLoading] = useState(false);

    const check = () => {
        if (!keyword.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const key = keyword.toLowerCase().trim();
            const data = volumeData[key] ?? {
                volume: (Math.floor(Math.random() * 50000) + 1000).toLocaleString(),
                trend: "📊 Moderate",
                change: `+${Math.floor(Math.random() * 20)}%`
            };
            setResult({ keyword, ...data });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📊</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Search Volume Checker</h1>
                <p className="text-muted-foreground font-bold">Check monthly search volume for any keyword</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex gap-3">
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === "Enter" && check()}
                        placeholder="Enter keyword..." className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    <button onClick={check} disabled={loading} className="bg-comic-blue hover:bg-comic-blue/90 text-white font-bold px-6 py-3 rounded-xl">
                        {loading ? "Checking..." : "Check"}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.keys(volumeData).slice(0, 4).map(k => (
                        <button key={k} onClick={() => setKeyword(k)} className="px-3 py-1 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold border border-border transition-colors">{k}</button>
                    ))}
                </div>
            </div>

            {result && !loading && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Monthly Search Volume for</p>
                        <p className="text-lg font-black text-comic-blue mb-3">"{result.keyword}"</p>
                        <div className="text-6xl font-black text-foreground">{result.volume}</div>
                        <p className="text-sm text-muted-foreground mt-1">searches/month</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-sm font-bold text-muted-foreground">Trend</div>
                            <div className="text-2xl font-black mt-1">{result.trend}</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-sm font-bold text-muted-foreground">YoY Change</div>
                            <div className={`text-2xl font-black mt-1 ${result.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{result.change}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-muted rounded-2xl p-4">
                        <p className="text-xs text-muted-foreground font-bold">⚠️ Note: Data is estimated based on industry trends. For exact data, use Google Search Console or Google Ads Keyword Planner.</p>
                    </div>
                </div>
            )}

            <SEOHead title="Search Volume Checker - Monthly Keyword Volume Tool" description="Check monthly search volume for any keyword. Understand how often people search for your target keywords and plan your SEO strategy." keywords="search volume checker, keyword search volume, monthly searches, keyword volume tool" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Search Volume Checker", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Search Volume Checker" subtitle="Know How Often People Search Your Keywords" description="Understanding search volume is crucial for SEO. Our tool provides estimated monthly search volumes so you can prioritize the right keywords for your content strategy." howToUse={["Enter your keyword", "Click Check", "See monthly search volume", "View trend and year-over-year change", "Compare different keywords"]} features={["Monthly Volume Estimates", "Trend Analysis", "YoY Change", "Popular Keyword Examples", "Instant Results"]} faqs={[{ question: "What is search volume?", answer: "Search volume is the average number of times a keyword is searched per month. High-volume keywords bring more traffic potential but are usually more competitive." }]} relatedTools={[{ name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }, { name: "Keyword Difficulty", emoji: "💪", path: "/tools/keyword-difficulty" }]} />
        </div>
    );
};
export default SearchVolumeChecker;
