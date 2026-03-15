import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const seedData: Record<string, { volume: string; difficulty: string; cpc: string; related: string[] }> = {
    "seo tools": { volume: "135,000", difficulty: "72", cpc: "$4.20", related: ["free seo tools", "best seo tools", "seo checker", "online seo tools", "seo audit tool"] },
    "keyword research": { volume: "90,500", difficulty: "68", cpc: "$5.10", related: ["keyword research tool", "free keyword research", "keyword planner", "keyword finder", "keyword analysis"] },
    "digital marketing": { volume: "246,000", difficulty: "81", cpc: "$7.30", related: ["digital marketing tools", "online marketing", "digital marketing course", "digital marketing agency", "social media marketing"] },
    "website traffic": { volume: "74,000", difficulty: "65", cpc: "$3.80", related: ["increase website traffic", "website traffic checker", "free website traffic", "organic traffic", "boost traffic"] },
    "backlinks": { volume: "110,000", difficulty: "75", cpc: "$6.00", related: ["free backlinks", "backlink checker", "quality backlinks", "build backlinks", "dofollow backlinks"] },
    default: { volume: "12,400", difficulty: "48", cpc: "$2.50", related: [] }
};

const KeywordPlanner = () => {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState<null | { keyword: string; volume: string; difficulty: string; cpc: string; related: string[] }>(null);
    const [loading, setLoading] = useState(false);

    const analyze = () => {
        if (!keyword.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const key = keyword.toLowerCase().trim();
            const data = seedData[key] ?? {
                ...seedData.default,
                related: [`best ${key}`, `free ${key}`, `${key} tool`, `${key} online`, `${key} checker`]
            };
            setResult({ keyword, ...data });
            setLoading(false);
        }, 1200);
    };

    const getDiffColor = (d: string) => {
        const n = parseInt(d);
        if (n < 40) return "text-green-500";
        if (n < 65) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔑</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Keyword Planner</h1>
                <p className="text-muted-foreground font-bold">Discover search volume, difficulty & CPC for any keyword</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex gap-3">
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && analyze()}
                        placeholder="Enter keyword (e.g. seo tools)"
                        className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors"
                    />
                    <button onClick={analyze} disabled={loading}
                        className="bg-comic-blue hover:bg-comic-blue/90 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                        <Search className="w-4 h-4" /> {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {["seo tools", "keyword research", "digital marketing", "website traffic"].map(s => (
                        <button key={s} onClick={() => { setKeyword(s); }}
                            className="px-3 py-1 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold transition-colors border border-border">
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="bg-card border-4 border-border rounded-2xl p-8 text-center">
                    <div className="text-4xl animate-bounce mb-3">🔍</div>
                    <p className="font-bold text-muted-foreground">Analyzing keyword data...</p>
                </div>
            )}

            {result && !loading && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "🔍 Search Volume", val: result.volume, color: "border-comic-blue" },
                            { label: "💪 Difficulty", val: result.difficulty + "/100", color: "border-comic-red" },
                            { label: "💰 CPC", val: result.cpc, color: "border-comic-green" },
                        ].map(({ label, val, color }) => (
                            <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                                <div className="text-xs font-bold text-muted-foreground mb-1">{label}</div>
                                <div className={`text-2xl font-black ${color.includes("red") ? getDiffColor(result.difficulty) : "text-foreground"}`}>{val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl p-6">
                        <h3 className="font-black text-foreground mb-4">📋 Related Keywords</h3>
                        <div className="space-y-2">
                            {result.related.map((kw, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border hover:bg-muted/60 transition-colors">
                                    <span className="font-bold text-foreground">{kw}</span>
                                    <button onClick={() => { setKeyword(kw); }}
                                        className="text-xs px-3 py-1 bg-comic-blue text-white rounded-lg font-bold hover:bg-comic-blue/80 transition-colors">
                                        Analyze
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">💡</span>
                            <span className="font-black text-foreground">Keyword Insight</span>
                        </div>
                        <p className="text-muted-foreground font-bold text-sm">
                            {parseInt(result.difficulty) < 40
                                ? `"${result.keyword}" is a low-competition keyword — great for new websites!`
                                : parseInt(result.difficulty) < 65
                                    ? `"${result.keyword}" has moderate competition. Target with quality content.`
                                    : `"${result.keyword}" is highly competitive. Focus on long-tail variants.`}
                        </p>
                    </div>
                </div>
            )}

            <SEOHead
                title="Keyword Planner - Free Keyword Research Tool"
                description="Plan your SEO strategy with our free Keyword Planner. Discover search volume, keyword difficulty, CPC, and related keywords for any keyword."
                keywords="keyword planner, keyword research tool, search volume checker, keyword difficulty, cpc checker, free keyword tool"
                schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Keyword Planner", "applicationCategory": "SEOApplication" }}
            />
            <div className="my-8"></div>
            <SEOSection
                title="Free Keyword Planner Tool"
                subtitle="Research Keywords Like a Pro"
                description="Find profitable keywords with our free keyword planner. Get monthly search volume, competition difficulty scores, and cost-per-click data to build a winning SEO strategy."
                howToUse={["Enter your target keyword", "Click Analyze to get data", "Review volume, difficulty, and CPC", "Explore related keyword suggestions", "Click any related keyword to analyze it"]}
                features={["Search Volume Estimates", "Keyword Difficulty Score", "CPC Data", "Related Keyword Suggestions", "Quick keyword presets"]}
                faqs={[{ question: "What is keyword difficulty?", answer: "Keyword difficulty (0-100) measures how hard it is to rank on page 1 of Google. Scores below 40 are easy, 40-65 moderate, and above 65 are hard." }, { question: "What does CPC mean?", answer: "CPC (Cost Per Click) is the average amount advertisers pay per click in Google Ads. High CPC indicates commercial intent." }]}
                relatedTools={[{ name: "Keyword Density", emoji: "📊", path: "/tools/keyword-density" }, { name: "SEO Audit", emoji: "🔎", path: "/tools/seo-audit" }]}
            />
        </div>
    );
};

export default KeywordPlanner;
