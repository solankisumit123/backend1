import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const ConversionRateCalculator = () => {
    const [visitors, setVisitors] = useState("");
    const [conversions, setConversions] = useState("");
    const [revenue, setRevenue] = useState("");
    const [result, setResult] = useState<null | { cvr: number; revenuePerVisitor: number; costPerConversion: number | null }>(null);
    const [adSpend, setAdSpend] = useState("");

    const calculate = () => {
        const v = parseFloat(visitors), c = parseFloat(conversions), r = parseFloat(revenue);
        if (!v || !c) return;
        const cvr = (c / v) * 100;
        const revenuePerVisitor = r ? r / v : 0;
        const ads = parseFloat(adSpend);
        const costPerConversion = ads && c ? ads / c : null;
        setResult({ cvr: parseFloat(cvr.toFixed(2)), revenuePerVisitor: parseFloat(revenuePerVisitor.toFixed(2)), costPerConversion });
    };

    const getCVRColor = (cvr: number) => cvr < 1 ? "text-red-500" : cvr < 3 ? "text-yellow-500" : "text-green-500";
    const getCVRLabel = (cvr: number) => cvr < 1 ? "Below Average" : cvr < 2 ? "Average" : cvr < 5 ? "Good" : "Excellent";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📊</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Conversion Rate Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate CVR, revenue per visitor, and cost per conversion</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">👥 Total Visitors</label>
                        <input type="number" value={visitors} onChange={e => setVisitors(e.target.value)} placeholder="e.g. 10000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">✅ Total Conversions</label>
                        <input type="number" value={conversions} onChange={e => setConversions(e.target.value)} placeholder="e.g. 250"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💰 Total Revenue ($, optional)</label>
                        <input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 5000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💸 Ad Spend ($, optional)</label>
                        <input type="number" value={adSpend} onChange={e => setAdSpend(e.target.value)} placeholder="e.g. 1000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                </div>
                <button onClick={calculate} className="w-full bg-comic-green hover:bg-comic-green/90 text-white font-bold py-4 rounded-xl text-lg">
                    📊 Calculate CVR
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Conversion Rate</p>
                        <div className={`text-6xl font-black ${getCVRColor(result.cvr)}`}>{result.cvr}%</div>
                        <div className={`text-lg font-black mt-2 ${getCVRColor(result.cvr)}`}>{getCVRLabel(result.cvr)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {result.revenuePerVisitor > 0 && (
                            <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground">Revenue/Visitor</div>
                                <div className="text-xl font-black mt-1">${result.revenuePerVisitor}</div>
                            </div>
                        )}
                        {result.costPerConversion !== null && (
                            <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground">Cost/Conversion</div>
                                <div className="text-xl font-black mt-1">${result.costPerConversion?.toFixed(2)}</div>
                            </div>
                        )}
                    </div>
                    <div className="bg-card border-4 border-muted rounded-2xl p-4">
                        <h4 className="font-black text-foreground mb-2">📈 Industry Benchmarks</h4>
                        <div className="space-y-1 text-sm font-bold text-muted-foreground">
                            <div>E-commerce: <span className="text-comic-orange">1-4%</span></div>
                            <div>SaaS / Software: <span className="text-comic-orange">3-7%</span></div>
                            <div>Lead Generation: <span className="text-comic-orange">5-15%</span></div>
                            <div>Landing Pages: <span className="text-comic-orange">2-10%</span></div>
                        </div>
                    </div>
                </div>
            )}

            <SEOHead title="Conversion Rate Calculator - CVR Calculator Free" description="Calculate website conversion rate, revenue per visitor, and cost per conversion. Compare your CVR against industry benchmarks with our free calculator." keywords="conversion rate calculator, cvr calculator, website conversion rate, conversion tracking, ecommerce cvr" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Conversion Rate Calculator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Conversion Rate Calculator" subtitle="Measure and Improve Your Marketing ROI" description="Conversion rate is one of the most important metrics for any website or business. Our calculator helps you measure CVR and compare it against industry benchmarks." howToUse={["Enter total website visitors", "Enter number of conversions", "Add revenue and ad spend (optional)", "Click Calculate CVR", "Compare to industry benchmarks"]} features={["CVR Percentage", "Revenue Per Visitor", "Cost Per Conversion", "Industry Benchmarks", "Performance Labels"]} faqs={[{ question: "What is a good conversion rate?", answer: "Average website CVR is 2-3%. E-commerce sites average 1-4%. Above 5% is excellent. Focus on improving user experience, CTAs, and landing page copy to increase CVR." }]} relatedTools={[{ name: "CTR Calculator", emoji: "👆", path: "/tools/ctr-calculator" }, { name: "ROI Calculator", emoji: "💹", path: "/tools/roi-calculator" }]} />
        </div>
    );
};
export default ConversionRateCalculator;
