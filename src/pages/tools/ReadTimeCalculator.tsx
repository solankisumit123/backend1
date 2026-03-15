import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const ReadTimeCalculator = () => {
    const [text, setText] = useState("");
    const [wpm, setWpm] = useState(200);

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const minutes = words > 0 ? Math.ceil(words / wpm) : 0;
    const seconds = words > 0 ? Math.round((words / wpm) * 60) : 0;

    const readTimeStr = () => {
        if (minutes < 1) return `${seconds} seconds`;
        if (minutes === 1) return "1 minute";
        return `${minutes} minutes`;
    };

    const seoScore = () => {
        if (words < 300) return { score: "Too Short", color: "text-red-500", tip: "Aim for at least 1000 words for SEO" };
        if (words < 1000) return { score: "Average", color: "text-yellow-500", tip: "1500-2500 words is ideal for ranking" };
        if (words < 2500) return { score: "Good", color: "text-green-500", tip: "Perfect length for most SEO articles!" };
        return { score: "Excellent", color: "text-comic-green", tip: "Long-form content tends to rank higher" };
    };

    const seo = seoScore();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⏱️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Read Time Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate reading time for blog posts and articles</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📝 Paste Your Content</label>
                    <textarea value={text} onChange={e => setText(e.target.value)} rows={8}
                        placeholder="Paste your article, blog post, or any text here..."
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange resize-none text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🚀 Reading Speed: {wpm} words/min</label>
                    <input type="range" min={100} max={400} step={25} value={wpm} onChange={e => setWpm(parseInt(e.target.value))}
                        className="w-full accent-orange-500" />
                    <div className="flex justify-between text-xs font-bold text-muted-foreground mt-1">
                        <span>Slow (100)</span><span>Average (200)</span><span>Fast (400)</span>
                    </div>
                </div>
            </div>

            {text.trim() && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-orange rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Estimated Read Time</p>
                        <div className="text-5xl font-black text-comic-orange">{readTimeStr()}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "📝 Words", val: words.toLocaleString() },
                            { label: "🔤 Characters", val: chars.toLocaleString() },
                            { label: "📄 Paragraphs", val: text.split(/\n\s*\n/).filter(Boolean).length.toString() },
                        ].map(({ label, val }) => (
                            <div key={label} className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground">{label}</div>
                                <div className="text-xl font-black mt-1 text-foreground">{val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-black text-foreground">📊 SEO Content Score</h3>
                            <span className={`font-black ${seo.color}`}>{seo.score}</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${words < 300 ? "bg-red-500" : words < 1000 ? "bg-yellow-500" : "bg-green-500"}`}
                                style={{ width: `${Math.min((words / 2500) * 100, 100)}%` }} />
                        </div>
                        <p className="text-sm font-bold text-muted-foreground mt-2">💡 {seo.tip}</p>
                    </div>
                </div>
            )}

            <SEOHead title="Read Time Calculator - Blog Reading Time Estimator" description="Calculate reading time for any text or blog post. Check word count, character count, and SEO content score with our free read time calculator." keywords="read time calculator, reading time estimator, blog reading time, word count tool, content length calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Read Time Calculator", "applicationCategory": "WritingApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Read Time Calculator" subtitle="Know Your Content's Reading Time" description="Reading time displayed on blog posts improves user experience and reduces bounce rates. Our calculator also provides an SEO content score based on word count." howToUse={["Paste your article content", "Adjust reading speed if needed", "View estimated read time instantly", "Check word and character count", "Review SEO content length score"]} features={["Instant Read Time", "Adjustable Reading Speed", "Word & Character Counter", "SEO Content Score", "Paragraph Counter"]} faqs={[{ question: "What is the ideal blog post length for SEO?", answer: "Research shows posts of 1500-2500 words tend to rank best. However, always prioritize quality over quantity. Make every word add value to the reader." }]} relatedTools={[{ name: "Word Counter", emoji: "📝", path: "/tools/word-counter" }, { name: "Readability Score", emoji: "📖", path: "/tools/readability" }]} />
        </div>
    );
};
export default ReadTimeCalculator;
