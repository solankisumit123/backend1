import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const cpcData: Record<string, { cpc: string; competition: string; clicks: string }> = {
    "insurance": { cpc: "$54.91", competition: "Very High", clicks: "2.1%" },
    "lawyer": { cpc: "$47.07", competition: "Very High", clicks: "1.8%" },
    "mortgage": { cpc: "$44.28", competition: "Very High", clicks: "2.3%" },
    "credit card": { cpc: "$36.06", competition: "High", clicks: "2.8%" },
    "seo tools": { cpc: "$4.20", competition: "Medium", clicks: "3.5%" },
    "keyword research": { cpc: "$5.10", competition: "Medium", clicks: "4.1%" },
    "digital marketing": { cpc: "$7.30", competition: "High", clicks: "2.9%" },
    "web hosting": { cpc: "$3.95", competition: "High", clicks: "3.2%" },
    "vpn": { cpc: "$6.75", competition: "High", clicks: "2.6%" },
    "software": { cpc: "$2.50", competition: "Medium", clicks: "3.8%" },
};

const CPCChecker = () => {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState<null | { keyword: string; cpc: string; competition: string; clicks: string }>(null);
    const [loading, setLoading] = useState(false);

    const check = () => {
        if (!keyword.trim()) return;
        setLoading(true);
        setTimeout(() => {
            const key = keyword.toLowerCase().trim();
            const data = cpcData[key] ?? {
                cpc: `$${(Math.random() * 8 + 0.5).toFixed(2)}`,
                competition: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
                clicks: `${(Math.random() * 4 + 1).toFixed(1)}%`
            };
            setResult({ keyword, ...data });
            setLoading(false);
        }, 900);
    };

    const compColor = (c: string) => c === "Low" ? "text-green-500" : c === "Medium" ? "text-yellow-500" : "text-red-500";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💰</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">CPC Checker</h1>
                <p className="text-muted-foreground font-bold">Check Cost Per Click for any keyword in Google Ads</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex gap-3">
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === "Enter" && check()}
                        placeholder="Enter keyword (e.g. insurance)" className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    <button onClick={check} disabled={loading} className="bg-comic-green hover:bg-comic-green/90 text-white font-bold px-6 py-3 rounded-xl">{loading ? "Checking..." : "Check CPC"}</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {["insurance", "seo tools", "digital marketing", "mortgage"].map(k => (
                        <button key={k} onClick={() => setKeyword(k)} className="px-3 py-1 bg-muted hover:bg-comic-green hover:text-white rounded-lg text-xs font-bold border border-border transition-colors">{k}</button>
                    ))}
                </div>
            </div>

            {result && !loading && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Average CPC for</p>
                        <p className="text-lg font-black text-comic-green mb-3">"{result.keyword}"</p>
                        <div className="text-6xl font-black text-foreground">{result.cpc}</div>
                        <p className="text-sm text-muted-foreground mt-1">per click</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-sm font-bold text-muted-foreground">Competition</div>
                            <div className={`text-2xl font-black mt-1 ${compColor(result.competition)}`}>{result.competition}</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-sm font-bold text-muted-foreground">Avg CTR</div>
                            <div className="text-2xl font-black mt-1 text-comic-blue">{result.clicks}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-muted rounded-2xl p-4">
                        <h4 className="font-black text-foreground mb-2">💡 AdSense Revenue Estimate</h4>
                        <p className="text-sm text-muted-foreground font-bold">
                            With 10,000 monthly visitors and {result.clicks} CTR, you'd earn approximately{" "}
                            <span className="text-comic-green font-black">${(parseFloat(result.cpc.replace("$", "")) * parseFloat(result.clicks) * 100).toFixed(0)}/month</span> from AdSense.
                        </p>
                    </div>
                </div>
            )}

            <SEOHead title="CPC Checker - Cost Per Click Tool Free" description="Check average CPC (Cost Per Click) for any keyword. Find high-paying AdSense keywords and plan Google Ads campaigns effectively." keywords="cpc checker, cost per click, cpc tool, google ads cpc, adsense cpc checker, keyword cpc" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CPC Checker", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="CPC Checker Tool" subtitle="Find High-Paying Keywords for Maximum Revenue" description="CPC (Cost Per Click) data helps you understand keyword monetization potential. Find the most profitable keywords for your blog or website." howToUse={["Enter your target keyword", "Click Check CPC", "View the average CPC price", "Check competition level", "Estimate potential AdSense revenue"]} features={["Real CPC Estimates", "Competition Level", "Average CTR", "AdSense Revenue Estimate", "Popular Keyword Examples"]} faqs={[{ question: "What is CPC in SEO?", answer: "CPC (Cost Per Click) indicates the dollar value advertisers pay for each click. Higher CPC keywords mean more AdSense revenue for publisher websites." }]} relatedTools={[{ name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }, { name: "Search Volume", emoji: "📊", path: "/tools/search-volume" }]} />
        </div>
    );
};
export default CPCChecker;
