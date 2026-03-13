import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const CTRCalculator = () => {
    const [impressions, setImpressions] = useState("");
    const [clicks, setClicks] = useState("");
    const [result, setResult] = useState<null | { ctr: number; label: string }>(null);

    const calculate = () => {
        const i = parseFloat(impressions), c = parseFloat(clicks);
        if (!i || !c || c > i) return;
        const ctr = (c / i) * 100;
        let label = "Poor";
        if (ctr >= 10) label = "Excellent 🚀";
        else if (ctr >= 5) label = "Great 🎉";
        else if (ctr >= 2) label = "Good 👍";
        else if (ctr >= 1) label = "Average 📊";
        setResult({ ctr: parseFloat(ctr.toFixed(2)), label });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">👆</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Click-Through Rate Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate CTR for ads, emails, and search results</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">👁️ Total Impressions</label>
                    <input type="number" value={impressions} onChange={e => setImpressions(e.target.value)} placeholder="e.g. 10000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">👆 Total Clicks</label>
                    <input type="number" value={clicks} onChange={e => setClicks(e.target.value)} placeholder="e.g. 350"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <button onClick={calculate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    👆 Calculate CTR
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Click-Through Rate</p>
                        <div className="text-6xl font-black text-comic-blue">{result.ctr}%</div>
                        <div className="text-lg font-black mt-2 text-foreground">{result.label}</div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <h4 className="font-black mb-3">📊 CTR Benchmarks by Channel</h4>
                        <div className="space-y-2">
                            {[
                                ["Google Ads (Search)", "2-5%"],
                                ["Google Organic Search", "3-10%"],
                                ["Email Marketing", "2-5%"],
                                ["Display Ads", "0.1-0.3%"],
                                ["Facebook Ads", "0.5-1.5%"],
                            ].map(([channel, bench]) => (
                                <div key={channel} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                                    <span className="font-bold text-sm text-foreground">{channel}</span>
                                    <span className="font-black text-comic-blue text-sm">{bench}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <SEOHead title="CTR Calculator - Click Through Rate Calculator Free" description="Calculate click-through rate (CTR) for ads, emails, and organic search. Compare your CTR against industry benchmarks." keywords="ctr calculator, click through rate calculator, ctr formula, google ads ctr, email ctr calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CTR Calculator", "applicationCategory": "MarketingApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Click-Through Rate Calculator" subtitle="Measure Your Marketing Performance" description="CTR measures how often people click your link after seeing it. Higher CTR means your titles and descriptions are compelling to your audience." howToUse={["Enter total impressions", "Enter the number of clicks", "Click Calculate CTR", "View your CTR percentage", "Compare against benchmarks"]} features={["Instant CTR Calculation", "Performance Label", "Industry Benchmarks", "Simple Formula", "Multiple Channel Data"]} faqs={[{ question: "What is a good CTR for Google Search?", answer: "The average Google organic CTR for position 1 is about 10-30%. For Google Ads, 2-5% is considered good. Higher positions get more clicks." }]} relatedTools={[{ name: "Conversion Rate", emoji: "📊", path: "/tools/conversion-rate-calculator" }, { name: "ROI Calculator", emoji: "💹", path: "/tools/roi-calculator" }]} />
        </div>
    );
};
export default CTRCalculator;
