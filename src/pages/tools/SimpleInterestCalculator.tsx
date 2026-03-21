import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import ToolIcon from "@/components/ToolIcon";

const SimpleInterestCalculator = () => {
    const [mode, setMode] = useState<"si" | "ci">("si");
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [time, setTime] = useState("");
    const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
    const [result, setResult] = useState<null | { interest: number; amount: number; p: number; r: number; t: number }>(null);

    const calculate = () => {
        const p = parseFloat(principal), r = parseFloat(rate);
        let t = parseFloat(time);
        if (!p || !r || !t) return;
        if (timeUnit === "months") t = t / 12;
        let interest = 0, amount = 0;
        if (mode === "si") { interest = (p * r * t) / 100; amount = p + interest; }
        else { amount = p * Math.pow(1 + r / 100, t); interest = amount - p; }
        setResult({ interest: Math.round(interest * 100) / 100, amount: Math.round(amount * 100) / 100, p, r, t });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <ToolIcon icon={Calculator} color="bg-comic-blue" size="lg" className="mx-auto mb-4" />
                <h1 className="comic-heading text-4xl text-foreground mb-2">Interest Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate Simple Interest (SI) and Compound Interest (CI)</p>
            </div>

            {/* SI / CI Toggle */}
            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6">
                {([["si", "🧮 Simple Interest (SI)"], ["ci", "📈 Compound Interest (CI)"]] as const).map(([val, label]) => (
                    <button key={val} onClick={() => { setMode(val); setResult(null); }}
                        className={`flex-1 py-3 font-bold text-sm transition-colors ${mode === val ? "bg-comic-blue text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                        {label}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💵 Principal Amount (₹)</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 10000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📈 Rate of Interest (% per year)</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 8" step="0.01"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">⏰ Time Period</label>
                    <div className="flex gap-3">
                        <input type="number" value={time} onChange={e => setTime(e.target.value)} placeholder={timeUnit === "years" ? "e.g. 5" : "e.g. 60"}
                            className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
                        <div className="flex rounded-xl overflow-hidden border-2 border-border">
                            {(["years", "months"] as const).map(u => (
                                <button key={u} onClick={() => setTimeUnit(u)}
                                    className={`px-4 py-2 font-bold text-sm ${timeUnit === u ? "bg-comic-blue text-white" : "bg-background text-muted-foreground"}`}>
                                    {u === "years" ? "Yrs" : "Mo"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Presets */}
                <div>
                    <p className="text-xs font-bold text-muted-foreground mb-2">⚡ Common Rates</p>
                    <div className="flex flex-wrap gap-2">
                        {[["FD (6.5%)", "6.5"], ["SB Account (3.5%)", "3.5"], ["Gold Loan (12%)", "12"], ["Home Loan (8.5%)", "8.5"]].map(([l, r]) => (
                            <button key={l} onClick={() => setRate(r)}
                                className="px-3 py-1.5 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold transition-colors border-2 border-border">
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🧮 Calculate
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">{mode === "si" ? "Simple" : "Compound"} Interest</p>
                        <div className="text-5xl font-black text-comic-blue">{fmt(result.interest)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💰 Principal</div>
                            <div className="text-xl font-black">{fmt(result.p)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🏆 Total Amount</div>
                            <div className="text-xl font-black text-comic-green">{fmt(result.amount)}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                        <p className="font-bold text-foreground text-sm">
                            {mode === "si"
                                ? `Formula: SI = (${fmt(result.p)} × ${result.r}% × ${result.t.toFixed(2)} yrs) ÷ 100`
                                : `Formula: CI = ${fmt(result.p)} × (1 + ${result.r}%)^${result.t.toFixed(2)}`}
                        </p>
                    </div>
                </div>
            )}

            {/* SEO Content & Keywords */}
            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Calculate Simple & Compound Interest Instantly online</h2>
                <p>Our <strong>Interest Calculator</strong> helps you find the total interest and final amount on your investments or loans. Whether you are dealing with a Fixed Deposit (FD), Recurring Deposit (RD), Personal Loan, or Home Loan, our free calculator gives you 100% accurate results instantly.</p>

                <h3 className="text-xl font-bold mt-6 mb-3">Simple Interest vs Compound Interest</h3>
                <p><strong>What is Simple Interest (SI)?</strong> Simple interest is calculated solely on the principal amount. The formula for simple interest is <code className="bg-muted px-2 py-1 rounded">SI = P × R × T / 100</code> where P is principal, R is rate of interest, and T is time in years.</p>

                <p className="mt-4"><strong>What is Compound Interest (CI)?</strong> Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. This is often described as "interest on interest" and makes your money grow faster over time.</p>

                <h3 className="text-xl font-bold mt-6 mb-3">How to Use the Interest Calculator?</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Step 1:</strong> Select between Simple Interest or Compound Interest.</li>
                    <li><strong>Step 2:</strong> Enter your Principal Amount (Initial Investment or Loan Amount).</li>
                    <li><strong>Step 3:</strong> Input the Annual Interest Rate (%).</li>
                    <li><strong>Step 4:</strong> Enter the Time Period in either Months or Years. Click "Calculate".</li>
                </ul>

                <p className="mt-4 text-sm text-muted-foreground">Keywords: simple interest calculator, compound interest calculator online, calculate interest rate per year, fd interest calculator, loan interest calculator india, si vs ci, free interest calculator app, return on investment calculator.</p>
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default SimpleInterestCalculator;
