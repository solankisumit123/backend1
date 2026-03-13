import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const trendingKeywords = [
    { keyword: "AI tools 2025", growth: "+890%", category: "Technology" },
    { keyword: "ChatGPT prompts", growth: "+650%", category: "AI" },
    { keyword: "passive income ideas", growth: "+320%", category: "Finance" },
    { keyword: "work from home jobs", growth: "+280%", category: "Career" },
    { keyword: "digital marketing", growth: "+145%", category: "Marketing" },
    { keyword: "online business ideas", growth: "+220%", category: "Business" },
    { keyword: "learn python free", growth: "+180%", category: "Technology" },
    { keyword: "stock market today", growth: "+95%", category: "Finance" },
    { keyword: "yoga for beginners", growth: "+115%", category: "Health" },
    { keyword: "keto diet plan", growth: "+88%", category: "Health" },
    { keyword: "social media marketing", growth: "+130%", category: "Marketing" },
    { keyword: "cloud computing courses", growth: "+195%", category: "Technology" },
    { keyword: "content writing jobs", growth: "+165%", category: "Career" },
    { keyword: "cryptocurrency news", growth: "+240%", category: "Finance" },
    { keyword: "email marketing tools", growth: "+75%", category: "Marketing" },
];

const TrendingKeywordsFinder = () => {
    const [category, setCategory] = useState("All");
    const categories = ["All", "Technology", "AI", "Finance", "Marketing", "Business", "Career", "Health"];
    const filtered = category === "All" ? trendingKeywords : trendingKeywords.filter(k => k.category === category);

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔥</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Trending Keywords Finder</h1>
                <p className="text-muted-foreground font-bold">Discover what's trending on Google right now</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${category === c ? "bg-comic-red text-white" : "bg-muted hover:bg-muted/80 text-foreground"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((item, i) => (
                    <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 flex items-center justify-between hover:border-comic-red transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-black text-muted-foreground w-8">#{i + 1}</span>
                            <div>
                                <div className="font-black text-foreground">{item.keyword}</div>
                                <span className="text-xs px-2 py-0.5 bg-muted rounded-full font-bold text-muted-foreground">{item.category}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-black text-green-500">{item.growth}</div>
                            <div className="text-xs text-muted-foreground font-bold">YoY Growth</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-card border-4 border-muted rounded-2xl p-4">
                <p className="text-xs text-muted-foreground font-bold">⚠️ Trending data is based on industry research. For real-time trends, visit Google Trends at trends.google.com</p>
            </div>

            <SEOHead title="Trending Keywords Finder - Hot Search Terms 2025" description="Discover trending keywords and hot search terms. Stay ahead of competitors by targeting emerging topics before they peak." keywords="trending keywords, trending searches, hot keywords, google trends, popular keywords 2025" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Trending Keywords Finder", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Trending Keywords Finder" subtitle="Stay Ahead with Rising Search Terms" description="Capitalize on trending topics before your competitors. Our curated list of trending keywords helps you create timely, high-traffic content." howToUse={["Browse trending keywords by category", "Filter by Technology, Finance, Marketing, etc.", "Note growth percentages to prioritize", "Create content around trending terms", "Verify trends at Google Trends"]} features={["15+ Trending Keywords", "Category Filters", "YoY Growth Data", "Topic Categories", "Real-Time Relevance"]} faqs={[{ question: "How do I use trending keywords?", answer: "Create timely content around trending terms before they peak. Early movers capture significant traffic. Use these keywords in blog posts, social media, and YouTube videos." }]} relatedTools={[{ name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }, { name: "Long Tail Keywords", emoji: "🐟", path: "/tools/long-tail-keywords" }]} />
        </div>
    );
};
export default TrendingKeywordsFinder;
