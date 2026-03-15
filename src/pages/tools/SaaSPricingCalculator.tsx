import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const SaaSPricingCalculator = () => {
    const [plans, setPlans] = useState([
        { name: "Starter", price: "9", features: "5 projects, 1 user, Basic support" },
        { name: "Pro", price: "29", features: "Unlimited projects, 5 users, Priority support" },
        { name: "Business", price: "99", features: "All features, 25 users, Dedicated support" },
    ]);
    const [targetMRR, setTargetMRR] = useState("");
    const [result, setResult] = useState<{ planSignups: number[]; totalRevenue: number } | null>(null);

    const updatePlan = (i: number, field: string, val: string) => {
        const p = [...plans];
        p[i] = { ...p[i], [field]: val };
        setPlans(p);
    };

    const calculate = () => {
        const target = parseFloat(targetMRR) || 10000;
        const prices = plans.map(p => parseFloat(p.price) || 0);
        const avgPrice = prices.reduce((s, p) => s + p, 0) / prices.length;
        const totalNeeded = Math.ceil(target / avgPrice);
        const dist = [Math.ceil(totalNeeded * 0.6), Math.ceil(totalNeeded * 0.3), Math.ceil(totalNeeded * 0.1)];
        const totalRevenue = dist.reduce((s, count, i) => s + count * prices[i], 0);
        setResult({ planSignups: dist, totalRevenue: Math.round(totalRevenue) });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💼</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">SaaS Pricing Calculator</h1>
                <p className="text-muted-foreground font-bold">Design pricing tiers and calculate revenue targets for your SaaS</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <h3 className="font-black text-foreground">🏷️ Define Your Pricing Plans</h3>
                {plans.map((plan, i) => (
                    <div key={i} className="bg-muted/30 rounded-xl p-4 space-y-2">
                        <div className="flex gap-3">
                            <input value={plan.name} onChange={e => updatePlan(i, "name", e.target.value)}
                                className="flex-1 border-2 border-border rounded-xl px-3 py-2 bg-background font-bold text-foreground text-sm" placeholder="Plan Name" />
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-muted-foreground">$</span>
                                <input type="number" value={plan.price} onChange={e => updatePlan(i, "price", e.target.value)}
                                    className="w-20 border-2 border-border rounded-xl px-3 py-2 bg-background font-bold text-foreground text-sm" placeholder="Price" />
                                <span className="text-xs text-muted-foreground font-bold">/mo</span>
                            </div>
                        </div>
                        <input value={plan.features} onChange={e => updatePlan(i, "features", e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-3 py-2 bg-background font-bold text-foreground text-xs" placeholder="Features" />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Target Monthly Revenue ($)</label>
                    <input type="number" value={targetMRR} onChange={e => setTargetMRR(e.target.value)} placeholder="e.g. 10000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <button onClick={calculate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    💼 Calculate Revenue Target
                </button>
            </div>

            {/* Pricing Table Preview */}
            <div className="bg-card border-4 border-border rounded-2xl p-6 mb-6">
                <h3 className="font-black text-foreground mb-4">🎨 Pricing Table Preview</h3>
                <div className="grid grid-cols-3 gap-3">
                    {plans.map((plan, i) => (
                        <div key={i} className={`rounded-2xl p-4 text-center border-4 ${i === 1 ? "border-comic-blue bg-comic-blue/5" : "border-border"}`}>
                            {i === 1 && <div className="text-xs font-black text-comic-blue mb-1">POPULAR</div>}
                            <div className="font-black text-foreground">{plan.name}</div>
                            <div className="text-2xl font-black my-2">${plan.price}<span className="text-xs text-muted-foreground">/mo</span></div>
                            <div className="text-xs text-muted-foreground font-bold">{plan.features}</div>
                        </div>
                    ))}
                </div>
            </div>

            {result && (
                <div className="bg-card border-4 border-border rounded-2xl p-6">
                    <h3 className="font-black mb-4">📊 Signups Needed for ${parseInt(targetMRR || "10000").toLocaleString()} MRR</h3>
                    {plans.map((plan, i) => (
                        <div key={i} className="flex justify-between py-3 border-b border-border last:border-0">
                            <span className="font-bold text-foreground">{plan.name} (${plan.price}/mo)</span>
                            <span className="font-black text-comic-blue">{result.planSignups[i]} customers</span>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t-2 border-border flex justify-between">
                        <span className="font-black text-foreground">Estimated MRR</span>
                        <span className="font-black text-comic-green">${result.totalRevenue.toLocaleString()}</span>
                    </div>
                </div>
            )}

            <SEOHead title="SaaS Pricing Calculator - Subscription Revenue Planner" description="Design SaaS pricing tiers and calculate customers needed to hit your revenue targets. Free SaaS pricing strategy tool for startups." keywords="saas pricing calculator, subscription pricing, saas revenue calculator, pricing tiers, saas mreue planner" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SaaS Pricing Calculator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="SaaS Pricing Calculator" subtitle="Find the Perfect Price for Your Product" description="Pricing is one of the most critical decisions for a SaaS business. Our calculator helps you design pricing tiers, preview a pricing table, and calculate how many customers you need to hit revenue goals." howToUse={["Set up 3 pricing plans with prices", "Add features for each plan", "Enter your target monthly revenue", "Click Calculate Revenue Target", "See required customers per plan"]} features={["3-Tier Pricing Design", "Live Pricing Table Preview", "Revenue Target Calculator", "Customer Distribution", "Estimated MRR Calculation"]} faqs={[{ question: "How to price a SaaS product?", answer: "Use value-based pricing (charge based on the value delivered), not cost-plus. Research competitors, segment customers by willingness to pay, and offer 3 tiers (Good-Better-Best)." }]} relatedTools={[{ name: "MRR Calculator", emoji: "📡", path: "/tools/mrr-calculator" }, { name: "Churn Rate Calculator", emoji: "🔄", path: "/tools/churn-rate-calculator" }]} />
        </div>
    );
};
export default SaaSPricingCalculator;
