import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const ChurnRateCalculator = () => {
    const [customersStart, setCustomersStart] = useState("");
    const [lostCustomers, setLostCustomers] = useState("");
    const [result, setResult] = useState<null | { churnRate: number; retention: number; ltv?: number }>(null);
    const [arpu, setArpu] = useState("");

    const calculate = () => {
        const s = parseFloat(customersStart), l = parseFloat(lostCustomers);
        if (!s || !l || l > s) return;
        const churnRate = (l / s) * 100;
        const retention = 100 - churnRate;
        const avgRevenue = parseFloat(arpu);
        const ltv = avgRevenue ? avgRevenue / (churnRate / 100) : undefined;
        setResult({ churnRate: parseFloat(churnRate.toFixed(2)), retention: parseFloat(retention.toFixed(2)), ltv: ltv ? Math.round(ltv) : undefined });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔄</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Churn Rate Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate customer churn rate and lifetime value (LTV)</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">👥 Customers at Start of Period</label>
                    <input type="number" value={customersStart} onChange={e => setCustomersStart(e.target.value)} placeholder="e.g. 1000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">❌ Customers Lost in Period</label>
                    <input type="number" value={lostCustomers} onChange={e => setLostCustomers(e.target.value)} placeholder="e.g. 50"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💰 Avg Revenue Per User/Month (optional)</label>
                    <input type="number" value={arpu} onChange={e => setArpu(e.target.value)} placeholder="e.g. 49"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                </div>
                <button onClick={calculate} className="w-full bg-comic-red hover:bg-comic-red/90 text-white font-bold py-4 rounded-xl text-lg">
                    🔄 Calculate Churn Rate
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`bg-card border-4 ${result.churnRate > 5 ? "border-comic-red" : result.churnRate > 2 ? "border-comic-orange" : "border-comic-green"} rounded-2xl p-4 text-center`}>
                            <div className="text-xs font-bold text-muted-foreground">🔄 Churn Rate</div>
                            <div className={`text-3xl font-black mt-1 ${result.churnRate > 5 ? "text-red-500" : result.churnRate > 2 ? "text-yellow-500" : "text-green-500"}`}>{result.churnRate}%</div>
                        </div>
                        <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground">✅ Retention Rate</div>
                            <div className="text-3xl font-black mt-1 text-comic-green">{result.retention}%</div>
                        </div>
                    </div>
                    {result.ltv && (
                        <div className="bg-card border-4 border-comic-blue rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground">💎 Customer Lifetime Value (LTV)</div>
                            <div className="text-3xl font-black mt-1 text-comic-blue">${result.ltv.toLocaleString()}</div>
                        </div>
                    )}
                    <div className="bg-card border-4 border-muted rounded-2xl p-4">
                        <h4 className="font-black mb-2">📊 Churn Rate Benchmarks</h4>
                        <div className="text-sm font-bold text-muted-foreground space-y-1">
                            <div>SaaS (monthly): Under 2% is excellent</div>
                            <div>Enterprise SaaS: Under 1% monthly</div>
                            <div>Consumer/SMB: Under 5% monthly</div>
                        </div>
                    </div>
                </div>
            )}

            <SEOHead title="Churn Rate Calculator - Customer Retention Calculator" description="Calculate monthly churn rate, retention rate, and customer lifetime value (LTV). Free SaaS churn calculator for subscription businesses." keywords="churn rate calculator, customer churn, retention rate calculator, ltv calculator, saas churn" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Churn Rate Calculator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Churn Rate Calculator" subtitle="Reduce Churn, Grow Revenue" description="Customer churn is the silent killer of subscription businesses. Our calculator helps you measure churn rate, retention rate, and customer lifetime value to make informed retention decisions." howToUse={["Enter customers at period start", "Enter customers lost in the period", "Add ARPU for LTV calculation (optional)", "Click Calculate Churn Rate", "Compare against benchmarks"]} features={["Churn Rate Percentage", "Retention Rate", "Customer LTV (optional)", "Industry Benchmarks", "Color-Coded Performance"]} faqs={[{ question: "What causes high churn?", answer: "High churn is caused by poor onboarding, lack of customer success support, pricing issues, or product-market fit problems. Focus on the first 30-90 days of customer experience." }]} relatedTools={[{ name: "MRR Calculator", emoji: "📡", path: "/tools/mrr-calculator" }, { name: "ROI Calculator", emoji: "💹", path: "/tools/roi-calculator" }]} />
        </div>
    );
};
export default ChurnRateCalculator;
