import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const SIPCalculator = () => {
    const [monthly, setMonthly] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<null | { invested: number; returns: number; total: number; schedule: { year: number; invested: number; returns: number; total: number }[] }>(null);

    const calculate = () => {
        const m = parseFloat(monthly), r = parseFloat(rate) / 100 / 12, n = parseFloat(years) * 12;
        if (!m || !r || !n) return;
        const total = m * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        const invested = m * n;
        const returns = total - invested;
        const schedule = [];
        for (let y = 1; y <= Math.min(parseFloat(years), 10); y++) {
            const months = y * 12;
            const t = m * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
            schedule.push({ year: y, invested: Math.round(m * months), returns: Math.round(t - m * months), total: Math.round(t) });
        }
        setResult({ invested: Math.round(invested), returns: Math.round(returns), total: Math.round(total), schedule });
    };

    const fmt = (v: number) => "₹" + v.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💹</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">SIP Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate returns on your Systematic Investment Plan (Mutual Funds)</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💰 Monthly SIP Amount (₹)</label>
                    <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="e.g. 5000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📈 Expected Annual Return (%)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 12"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    <div className="flex gap-2 mt-2">
                        {["8", "10", "12", "15"].map(r => (
                            <button key={r} onClick={() => setRate(r)} className="px-3 py-1 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold">{r}%</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">⏱️ Investment Period (Years)</label>
                    <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="e.g. 10"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    <div className="flex gap-2 mt-2">
                        {["5", "10", "15", "20"].map(y => (
                            <button key={y} onClick={() => setYears(y)} className="px-3 py-1 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold">{y}yr</button>
                        ))}
                    </div>
                </div>
                <button onClick={calculate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    💹 Calculate SIP Returns
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground">Maturity Value</p>
                        <div className="text-5xl font-black text-comic-blue">{fmt(result.total)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground">💵 Total Invested</div>
                            <div className="text-xl font-black mt-1">{fmt(result.invested)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground">📈 Estimated Returns</div>
                            <div className="text-xl font-black mt-1 text-comic-green">{fmt(result.returns)}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                        <div className="p-4 border-b-2 border-border"><h3 className="font-black">📊 Year-wise Growth</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="bg-muted"><th className="p-3 text-left font-bold">Year</th><th className="p-3 text-right font-bold">Invested</th><th className="p-3 text-right font-bold">Returns</th><th className="p-3 text-right font-bold">Total</th></tr></thead>
                                <tbody>
                                    {result.schedule.map(r => (
                                        <tr key={r.year} className="border-t border-border hover:bg-muted/30">
                                            <td className="p-3 font-bold">Year {r.year}</td>
                                            <td className="p-3 text-right text-muted-foreground">{fmt(r.invested)}</td>
                                            <td className="p-3 text-right text-comic-green font-bold">{fmt(r.returns)}</td>
                                            <td className="p-3 text-right font-black">{fmt(r.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <SEOHead title="SIP Calculator - Mutual Fund SIP Returns Calculator" description="Calculate SIP returns for mutual fund investments. Find out how much you'll earn through monthly SIP with our free online SIP calculator." keywords="sip calculator, mutual fund sip calculator, sip returns calculator, monthly sip calculator, investment calculator india" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SIP Calculator", "applicationCategory": "FinanceApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="SIP Calculator" subtitle="Plan Your Mutual Fund Investments" description="SIP (Systematic Investment Plan) helps you invest a fixed amount regularly in mutual funds. Our SIP calculator shows your potential returns with compound growth over time." howToUse={["Enter your monthly SIP amount", "Set expected annual return rate", "Enter investment period in years", "Click Calculate SIP Returns", "View year-wise growth table"]} features={["Maturity Value Calculation", "Total Returns Breakdown", "Year-wise Growth Table", "Quick Presets for Rate & Time", "Indian Number Formatting"]} faqs={[{ question: "What is SIP?", answer: "SIP (Systematic Investment Plan) allows you to invest a fixed amount monthly in mutual funds. It uses rupee cost averaging to reduce market risk over time." }, { question: "What returns can I expect?", answer: "Equity mutual funds have historically given 10-15% annual returns over long periods. Debt funds typically give 6-8%. Past returns don't guarantee future results." }]} relatedTools={[{ name: "EMI Calculator", emoji: "💰", path: "/tools/emi-calculator" }, { name: "Compound Interest", emoji: "📈", path: "/tools/compound-interest" }]} />
        </div>
    );
};
export default SIPCalculator;
