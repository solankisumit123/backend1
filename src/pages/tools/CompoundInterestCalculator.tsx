import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [time, setTime] = useState("");
    const [freq, setFreq] = useState("12");
    const [result, setResult] = useState<null | { total: number; interest: number; schedule: { year: number; amount: number; interest: number }[] }>(null);

    const frequencies: Record<string, string> = { "1": "Annually", "4": "Quarterly", "12": "Monthly", "365": "Daily" };

    const calculate = () => {
        const p = parseFloat(principal), r = parseFloat(rate) / 100, n = parseInt(freq), t = parseFloat(time);
        if (!p || !r || !t) return;
        const total = p * Math.pow(1 + r / n, n * t);
        const interest = total - p;
        const schedule = [];
        for (let y = 1; y <= Math.min(t, 10); y++) {
            const amt = p * Math.pow(1 + r / n, n * y);
            schedule.push({ year: y, amount: Math.round(amt), interest: Math.round(amt - p) });
        }
        setResult({ total: Math.round(total), interest: Math.round(interest), schedule });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📈</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Compound Interest Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate compound interest with yearly growth breakdown</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💰 Principal (₹)</label>
                        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 100000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📈 Annual Rate (%)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 12"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">⏱️ Time (Years)</label>
                        <input type="number" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 10"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🔄 Compounding</label>
                        <select value={freq} onChange={e => setFreq(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green">
                            {Object.entries(frequencies).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={calculate} className="w-full bg-comic-green hover:bg-comic-green/90 text-white font-bold py-4 rounded-xl text-lg">
                    📈 Calculate
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "💰 Total Amount", val: fmt(result.total), color: "border-comic-green" },
                            { label: "📈 Total Interest", val: fmt(result.interest), color: "border-comic-blue" },
                            { label: "💵 Principal", val: fmt(parseFloat(principal)), color: "border-comic-orange" },
                        ].map(({ label, val, color }) => (
                            <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                                <div className="text-xs font-bold text-muted-foreground mb-1">{label}</div>
                                <div className="text-lg font-black text-foreground">{val}</div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                        <div className="p-4 border-b-2 border-border"><h3 className="font-black">📊 Year-by-Year Growth</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="bg-muted"><th className="p-3 text-left font-bold">Year</th><th className="p-3 text-right font-bold">Total Amount</th><th className="p-3 text-right font-bold">Interest Earned</th></tr></thead>
                                <tbody>
                                    {result.schedule.map(row => (
                                        <tr key={row.year} className="border-t border-border hover:bg-muted/30">
                                            <td className="p-3 font-bold">Year {row.year}</td>
                                            <td className="p-3 text-right font-bold text-comic-green">{fmt(row.amount)}</td>
                                            <td className="p-3 text-right text-muted-foreground font-bold">{fmt(row.interest)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <SEOHead title="Compound Interest Calculator - Online Investment Calculator" description="Calculate compound interest with daily, monthly, quarterly, or annual compounding. See year-by-year growth of your investment with our free calculator." keywords="compound interest calculator, investment calculator, compound interest formula, interest calculator online, wealth calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Compound Interest Calculator", "applicationCategory": "FinanceApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Compound Interest Calculator" subtitle="Watch Your Money Grow with Compound Interest" description="Compound interest is called the 8th wonder of the world. Our calculator shows exactly how your money grows over time with different compounding frequencies." howToUse={["Enter your principal amount", "Set the annual interest rate", "Choose the investment period", "Select compounding frequency", "Click Calculate to see growth"]} features={["Daily/Monthly/Quarterly/Annual Compounding", "Year-by-Year Breakdown", "Total Interest Earned", "10-Year Schedule", "Multiple Frequencies"]} faqs={[{ question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest. The more frequently interest compounds, the greater the total return." }]} relatedTools={[{ name: "EMI Calculator", emoji: "💰", path: "/tools/emi-calculator" }, { name: "SIP Calculator", emoji: "📊", path: "/tools/sip-calculator" }]} />
        </div>
    );
};
export default CompoundInterestCalculator;
