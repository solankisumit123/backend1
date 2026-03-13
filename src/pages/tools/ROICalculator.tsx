import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const ROICalculator = () => {
    const [investment, setInvestment] = useState("");
    const [returns, setReturns] = useState("");
    const [period, setPeriod] = useState("month");
    const [result, setResult] = useState<null | { roi: number; profit: number; roiAnnual: number }>(null);

    const calculate = () => {
        const inv = parseFloat(investment), ret = parseFloat(returns);
        if (!inv || !ret) return;
        const profit = ret - inv;
        const roi = (profit / inv) * 100;
        const roiAnnual = period === "month" ? roi * 12 : period === "quarter" ? roi * 4 : roi;
        setResult({ roi: parseFloat(roi.toFixed(2)), profit: Math.round(profit), roiAnnual: parseFloat(roiAnnual.toFixed(2)) });
    };

    const getRoiColor = (r: number) => r < 0 ? "text-red-500" : r < 10 ? "text-yellow-500" : r < 30 ? "text-green-500" : "text-comic-green";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💹</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">ROI Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate Return on Investment for any campaign or business</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💸 Total Investment ($)</label>
                    <input type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="e.g. 5000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📈 Total Returns ($)</label>
                    <input type="number" value={returns} onChange={e => setReturns(e.target.value)} placeholder="e.g. 15000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📅 Time Period</label>
                    <div className="grid grid-cols-3 gap-2">
                        {["month", "quarter", "year"].map(p => (
                            <button key={p} onClick={() => setPeriod(p)} className={`py-2 rounded-xl font-bold capitalize ${period === p ? "bg-comic-purple text-white" : "bg-muted"}`}>{p}</button>
                        ))}
                    </div>
                </div>
                <button onClick={calculate} className="w-full bg-comic-purple hover:bg-comic-purple/90 text-white font-bold py-4 rounded-xl text-lg">
                    💹 Calculate ROI
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-purple rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">ROI ({period})</p>
                        <div className={`text-6xl font-black ${getRoiColor(result.roi)}`}>{result.roi}%</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "💰 Net Profit", val: `$${Math.abs(result.profit).toLocaleString()}`, color: result.profit >= 0 ? "text-green-500" : "text-red-500" },
                            { label: "📅 Annual ROI", val: `${result.roiAnnual}%`, color: "text-foreground" },
                            { label: "🔄 Status", val: result.roi >= 0 ? "Profitable ✅" : "Loss ❌", color: result.roi >= 0 ? "text-green-500" : "text-red-500" },
                        ].map(({ label, val, color }) => (
                            <div key={label} className="bg-card border-4 border-border rounded-2xl p-3 text-center">
                                <div className="text-xs font-bold text-muted-foreground">{label}</div>
                                <div className={`text-sm font-black mt-1 ${color}`}>{val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="ROI Calculator - Return on Investment Calculator Free" description="Calculate ROI for marketing campaigns, investments, or any business activity. Get net profit, ROI percentage, and annual return calculations." keywords="roi calculator, return on investment calculator, marketing roi, campaign roi calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "ROI Calculator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="ROI Calculator" subtitle="Know If Your Investments Are Profitable" description="ROI (Return on Investment) measures the profitability of any investment. Whether you're analyzing a marketing campaign, stock purchase, or business expense, our ROI calculator gives you instant clarity." howToUse={["Enter your total investment amount", "Enter total returns generated", "Select the time period", "Click Calculate ROI", "View net profit and annual ROI"]} features={["ROI Percentage", "Net Profit", "Annual ROI Projection", "Profitable/Loss Status", "Multiple Time Periods"]} faqs={[{ question: "What is a good ROI?", answer: "A good ROI depends on the investment type. For stock market, 7-10% annual ROI is good. For digital marketing, 400-500% ROI is achievable. Any positive ROI means you're profitable." }]} relatedTools={[{ name: "CTR Calculator", emoji: "👆", path: "/tools/ctr-calculator" }, { name: "Conversion Rate", emoji: "📊", path: "/tools/conversion-rate-calculator" }]} />
        </div>
    );
};
export default ROICalculator;
