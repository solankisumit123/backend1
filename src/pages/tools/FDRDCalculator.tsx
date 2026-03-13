import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const FDRDCalculator = () => {
    const [type, setType] = useState<"fd" | "rd">("fd");
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [tenureYear, setTenureYear] = useState("");
    const [tenureMonth, setTenureMonth] = useState("");
    const [compFreq, setCompFreq] = useState<"quarterly" | "monthly" | "annually">("quarterly");
    const [result, setResult] = useState<null | { maturity: number; interest: number; invested: number; monthlyData: { month: number; balance: number }[] }>(null);

    const bankRates = [
        { name: "SBI FD (7.1%)", rate: "7.1" }, { name: "HDFC FD (7.25%)", rate: "7.25" },
        { name: "ICICI FD (7.2%)", rate: "7.2" }, { name: "Axis FD (7.25%)", rate: "7.25" },
        { name: "PO FD (7.5%)", rate: "7.5" }, { name: "SBI RD (6.5%)", rate: "6.5" },
    ];

    const calculate = () => {
        const p = parseFloat(principal) || 0;
        const r = parseFloat(rate) || 0;
        const years = parseInt(tenureYear) || 0;
        const months = parseInt(tenureMonth) || 0;
        const totalMonths = years * 12 + months;
        if (!p || !r || !totalMonths) return;

        let maturity = 0;
        const monthlyData: { month: number; balance: number }[] = [];

        if (type === "fd") {
            const n = compFreq === "monthly" ? 12 : compFreq === "quarterly" ? 4 : 1;
            const t = totalMonths / 12;
            maturity = p * Math.pow(1 + r / (100 * n), n * t);
            for (let m = 1; m <= totalMonths; m++) {
                const t2 = m / 12;
                monthlyData.push({ month: m, balance: +(p * Math.pow(1 + r / (100 * n), n * t2)).toFixed(0) });
            }
        } else {
            // RD: M = P × [(1+r)^n – 1] / (1 – (1+r)^(-1/3)) where r = quarterly rate
            const rQ = r / (4 * 100);
            const n = totalMonths / 3;
            maturity = p * ((Math.pow(1 + rQ, n) - 1) / (1 - Math.pow(1 + rQ, -1 / 3)));
            let balance = 0;
            for (let m = 1; m <= totalMonths; m++) {
                balance += p;
                const interest = balance * (r / 100) * (1 / 12);
                balance += interest;
                monthlyData.push({ month: m, balance: +balance.toFixed(0) });
            }
            maturity = balance;
        }

        const invested = type === "fd" ? p : p * totalMonths;
        setResult({ maturity: +maturity.toFixed(0), interest: +(maturity - invested).toFixed(0), invested, monthlyData });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏦</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">FD / RD Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate Fixed Deposit & Recurring Deposit maturity</p>
            </div>

            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6">
                {(["fd", "rd"] as const).map(t => (
                    <button key={t} onClick={() => { setType(t); setResult(null); }}
                        className={`flex-1 py-3 font-bold text-sm transition-colors ${type === t ? "bg-comic-blue text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                        {t === "fd" ? "🏦 Fixed Deposit (FD)" : "📅 Recurring Deposit (RD)"}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">{type === "fd" ? "💵 Deposit Amount (₹)" : "📅 Monthly Installment (₹)"}</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 100000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📊 Interest Rate (% per annum)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {bankRates.filter(b => type === "fd" ? !b.name.includes("RD") : b.name.includes("RD")).map(b => (
                            <button key={b.name} onClick={() => setRate(b.rate)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors ${rate === b.rate ? "bg-comic-blue text-white border-comic-blue" : "bg-muted border-border hover:bg-comic-blue/20"}`}>
                                {b.name}
                            </button>
                        ))}
                    </div>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 7.1" step="0.01"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">⏰ Years</label>
                        <input type="number" value={tenureYear} onChange={e => setTenureYear(e.target.value)} placeholder="e.g. 2" min="0"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📅 Months</label>
                        <input type="number" value={tenureMonth} onChange={e => setTenureMonth(e.target.value)} placeholder="e.g. 6" min="0" max="11"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>
                {type === "fd" && (
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🔄 Compounding Frequency</label>
                        <div className="flex rounded-xl overflow-hidden border-2 border-border">
                            {(["monthly", "quarterly", "annually"] as const).map(f => (
                                <button key={f} onClick={() => setCompFreq(f)}
                                    className={`flex-1 py-2 text-xs font-bold transition-colors ${compFreq === f ? "bg-comic-blue text-white" : "bg-background text-muted-foreground"}`}>
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🏦 Calculate
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">🏆 Maturity Amount</p>
                        <div className="text-5xl font-black text-comic-green">{fmt(result.maturity)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💰 Amount Invested</div>
                            <div className="text-xl font-black">{fmt(result.invested)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-blue rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📈 Interest Earned</div>
                            <div className="text-xl font-black text-comic-blue">{fmt(result.interest)}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <p className="text-xs font-bold text-muted-foreground mb-2">Growth chart (every 3 months)</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                            {result.monthlyData.filter((_, i) => i % 3 === 2 || i === result.monthlyData.length - 1).map(d => (
                                <div key={d.month} className="flex justify-between text-xs font-bold">
                                    <span className="text-muted-foreground">Month {d.month}</span>
                                    <span>{fmt(d.balance)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">FD & RD Calculator — Bank Fixed Deposit Returns</h2>
                <p>Our <strong>FD Calculator</strong> lets you calculate the maturity amount for Fixed Deposits from SBI, HDFC, ICICI, Axis, Post Office, and more. Our <strong>RD Calculator</strong> helps you plan your monthly savings with Recurring Deposits.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: fd calculator, rd calculator, fixed deposit calculator india, recurring deposit calculator, sbi fd calculator, hdfc fd interest calculator, fd maturity calculator online.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default FDRDCalculator;
