import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState("");
    const [retirementAge, setRetirementAge] = useState("60");
    const [currentSavings, setCurrentSavings] = useState("");
    const [monthlySavings, setMonthlySavings] = useState("");
    const [rate, setRate] = useState("10");
    const [monthlyExpense, setMonthlyExpense] = useState("");
    const [result, setResult] = useState<null | {
        yearsLeft: number; corpus: number; monthlyIncome: number; required: number; shortfall: number; recommendations: string[];
    }>(null);

    const calculate = () => {
        const cur = parseInt(currentAge), ret = parseInt(retirementAge || "60");
        const cs = parseFloat(currentSavings || "0"), ms = parseFloat(monthlySavings || "0");
        const r = parseFloat(rate) / 100, me = parseFloat(monthlyExpense || "40000");
        if (!cur) return;
        const years = ret - cur;
        const mRate = r / 12;
        const months = years * 12;

        const futureCurrentSavings = cs * Math.pow(1 + r, years);
        const futureMonthlySavings = ms * (((Math.pow(1 + mRate, months) - 1) / mRate) * (1 + mRate));
        const corpus = Math.round(futureCurrentSavings + futureMonthlySavings);

        const inflationAdj = me * Math.pow(1.06, years);
        const required = Math.round(inflationAdj * 12 * 20); // 20x annual expense
        const shortfall = required - corpus;
        const monthlyIncome = Math.round(corpus * 0.04 / 12); // 4% withdrawal rule

        const recommendations = [];
        if (shortfall > 0) {
            const extra = Math.round(shortfall / (months * ((Math.pow(1 + mRate, months) - 1) / mRate)));
            recommendations.push(`Increase monthly savings by ₹${extra.toLocaleString("en-IN")} to close the gap`);
        }
        if (r < 0.12) recommendations.push("Consider equity mutual funds for higher long-term returns (10-15%)");
        if (years > 20) recommendations.push("Start NPS for additional tax benefits and retirement corpus");
        recommendations.push("Get adequate health insurance to protect retirement savings");
        if (shortfall <= 0) recommendations.push(`🎉 You're on track! Corpus of ₹${corpus.toLocaleString("en-IN")} exceeds target.`);

        setResult({ yearsLeft: years, corpus, monthlyIncome, required: Math.max(required, 0), shortfall, recommendations });
    };

    const fmt = (n: number) => "₹" + Math.abs(n).toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏖️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Retirement Calculator</h1>
                <p className="text-muted-foreground font-bold">Plan your retirement corpus and monthly income</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">👤 Current Age</label>
                        <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} placeholder="e.g. 30"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🏡 Retirement Age</label>
                        <input type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} placeholder="e.g. 60"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💰 Current Savings (₹)</label>
                        <input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} placeholder="e.g. 500000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📅 Monthly Savings (₹)</label>
                        <input type="number" value={monthlySavings} onChange={e => setMonthlySavings(e.target.value)} placeholder="e.g. 15000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📈 Annual Return (%)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 10"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🛒 Monthly Expense Now (₹)</label>
                        <input type="number" value={monthlyExpense} onChange={e => setMonthlyExpense(e.target.value)} placeholder="e.g. 40000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>
                <button onClick={calculate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    🏖️ Plan My Retirement
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "📦 Retirement Corpus", val: fmt(result.corpus), color: "border-comic-blue" },
                            { label: "💵 Monthly Income", val: fmt(result.monthlyIncome) + "/mo", color: "border-comic-green" },
                            { label: "🎯 Required Corpus", val: fmt(result.required), color: "border-comic-orange" },
                            { label: result.shortfall > 0 ? "⚠️ Shortfall" : "✅ Surplus", val: fmt(result.shortfall), color: result.shortfall > 0 ? "border-comic-red" : "border-comic-green" },
                        ].map(({ label, val, color }) => (
                            <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                                <div className="text-xs font-bold text-muted-foreground mb-1">{label}</div>
                                <div className="text-lg font-black text-foreground">{val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <h3 className="font-black text-foreground mb-3">💡 Recommendations</h3>
                        <ul className="space-y-2">
                            {result.recommendations.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-bold text-foreground">
                                    <span>→</span><span>{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <SEOHead title="Retirement Calculator - Plan Your Retirement Corpus" description="Calculate how much you need for retirement. Find out your retirement corpus, monthly income, and whether you're on track with our free retirement planner." keywords="retirement calculator, retirement corpus calculator, retirement planning india, retirement savings calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Retirement Calculator", "applicationCategory": "FinanceApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Retirement Calculator" subtitle="Plan Your Financial Independence" description="Our retirement calculator helps you determine if your current savings rate will meet your retirement goals. It accounts for inflation, investment returns, and withdrawal rates." howToUse={["Enter your current and target retirement age", "Input current savings and monthly contributions", "Set expected annual return rate", "Enter current monthly expenses", "Click Plan My Retirement"]} features={["Corpus Projection", "Monthly Retirement Income (4% Rule)", "Inflation-Adjusted Target", "Shortfall/Surplus Analysis", "Personalized Recommendations"]} faqs={[{ question: "How much corpus do I need?", answer: "A common rule is to accumulate 25x your annual expenses (4% withdrawal rule). Our calculator uses inflation-adjusted expenses to give you a realistic target." }]} relatedTools={[{ name: "SIP Calculator", emoji: "💹", path: "/tools/sip-calculator" }, { name: "Compound Interest", emoji: "📈", path: "/tools/compound-interest" }]} />
        </div>
    );
};
export default RetirementCalculator;
