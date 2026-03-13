import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const MRRCalculator = () => {
    const [plans, setPlans] = useState([
        { name: "Starter", price: "", count: "" },
        { name: "Pro", price: "", count: "" },
        { name: "Business", price: "", count: "" },
    ]);
    const [churnRate, setChurnRate] = useState("");
    const [result, setResult] = useState<null | { mrr: number; arr: number; churnedMrr: number; netNewMrr: number }>(null);

    const updatePlan = (i: number, field: string, val: string) => {
        const p = [...plans];
        p[i] = { ...p[i], [field]: val };
        setPlans(p);
    };

    const calculate = () => {
        const mrr = plans.reduce((sum, p) => sum + (parseFloat(p.price) || 0) * (parseFloat(p.count) || 0), 0);
        const arr = mrr * 12;
        const churn = parseFloat(churnRate) || 0;
        const churnedMrr = mrr * churn / 100;
        const netNewMrr = mrr - churnedMrr;
        setResult({ mrr: Math.round(mrr), arr: Math.round(arr), churnedMrr: Math.round(churnedMrr), netNewMrr: Math.round(netNewMrr) });
    };

    const fmt = (n: number) => "$" + n.toLocaleString();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📡</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">MRR Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate Monthly Recurring Revenue for your SaaS business</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <h3 className="font-black text-foreground">💰 Pricing Plans</h3>
                {plans.map((plan, i) => (
                    <div key={i} className="grid grid-cols-3 gap-3 items-end">
                        <div>
                            <label className="block text-xs font-bold text-muted-foreground mb-1">Plan Name</label>
                            <input value={plan.name} onChange={e => updatePlan(i, "name", e.target.value)}
                                className="w-full border-2 border-border rounded-xl px-3 py-2 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted-foreground mb-1">Price ($/mo)</label>
                            <input type="number" value={plan.price} onChange={e => updatePlan(i, "price", e.target.value)} placeholder="e.g. 29"
                                className="w-full border-2 border-border rounded-xl px-3 py-2 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted-foreground mb-1">Customers</label>
                            <input type="number" value={plan.count} onChange={e => updatePlan(i, "count", e.target.value)} placeholder="e.g. 100"
                                className="w-full border-2 border-border rounded-xl px-3 py-2 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-sm" />
                        </div>
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🔄 Monthly Churn Rate (%)</label>
                    <input type="number" value={churnRate} onChange={e => setChurnRate(e.target.value)} placeholder="e.g. 5"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <button onClick={calculate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    📡 Calculate MRR
                </button>
            </div>

            {result && (
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "📡 MRR", val: fmt(result.mrr), color: "border-comic-blue" },
                        { label: "📅 ARR", val: fmt(result.arr), color: "border-comic-green" },
                        { label: "🔄 Churned MRR", val: fmt(result.churnedMrr), color: "border-comic-red" },
                        { label: "📈 Net MRR", val: fmt(result.netNewMrr), color: "border-comic-purple" },
                    ].map(({ label, val, color }) => (
                        <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                            <div className="text-xs font-bold text-muted-foreground mb-1">{label}</div>
                            <div className="text-2xl font-black text-foreground">{val}</div>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="MRR Calculator - Monthly Recurring Revenue Calculator" description="Calculate MRR, ARR, churned MRR, and net new MRR for your SaaS business. Free Monthly Recurring Revenue calculator for startups." keywords="mrr calculator, monthly recurring revenue, arr calculator, saas metrics, recurring revenue calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "MRR Calculator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="MRR Calculator" subtitle="SaaS Revenue Metrics Simplified" description="MRR (Monthly Recurring Revenue) is the lifeblood metric for SaaS businesses. Track your recurring revenue, annual run rate, and churn impact with our free calculator." howToUse={["Enter pricing plan names and prices", "Add number of customers per plan", "Input monthly churn rate", "Click Calculate MRR", "View MRR, ARR, and churned MRR"]} features={["3 Pricing Plan Support", "Churn Rate Impact", "ARR Calculation", "Net MRR After Churn", "SaaS-Focused Metrics"]} faqs={[{ question: "What's the difference between MRR and ARR?", answer: "MRR is your monthly recurring revenue. ARR (Annual Recurring Revenue) = MRR × 12. ARR is used for company valuation and annual planning." }]} relatedTools={[{ name: "SaaS Pricing Calculator", emoji: "💰", path: "/tools/saas-pricing-calculator" }, { name: "Churn Rate Calculator", emoji: "🔄", path: "/tools/churn-rate-calculator" }]} />
        </div>
    );
};
export default MRRCalculator;
