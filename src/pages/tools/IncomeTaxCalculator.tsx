import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FAQSchema from "@/components/SEO/FAQSchema";

const IncomeTaxCalculator = () => {
    const [income, setIncome] = useState("");
    const [regime, setRegime] = useState<"new" | "old">("new");
    const [age, setAge] = useState<"below60" | "60to80" | "above80">("below60");
    const [deductions, setDeductions] = useState("");
    const [result, setResult] = useState<null | {
        grossIncome: number; taxableIncome: number; tax: number; cess: number; totalTax: number; effectiveRate: number; slabs: { slab: string; tax: number }[];
    }>(null);

    const calculate = () => {
        const gross = parseFloat(income) || 0;
        const ded = parseFloat(deductions) || 0;
        const taxable = regime === "new" ? Math.max(0, gross) : Math.max(0, gross - ded);

        let tax = 0;
        const slabs: { slab: string; tax: number }[] = [];

        if (regime === "new") {
            // New Tax Regime FY 2024-25
            const brackets = [
                { limit: 300000, rate: 0, label: "Up to ₹3L" },
                { limit: 700000, rate: 5, label: "₹3L – ₹7L" },
                { limit: 1000000, rate: 10, label: "₹7L – ₹10L" },
                { limit: 1200000, rate: 15, label: "₹10L – ₹12L" },
                { limit: 1500000, rate: 20, label: "₹12L – ₹15L" },
                { limit: Infinity, rate: 30, label: "Above ₹15L" },
            ];
            let remaining = taxable;
            let prev = 0;
            for (const b of brackets) {
                const slice = Math.min(remaining, b.limit - prev);
                const t = (slice * b.rate) / 100;
                if (slice > 0) slabs.push({ slab: `${b.label} @ ${b.rate}%`, tax: +t.toFixed(0) });
                tax += t;
                remaining -= slice;
                prev = b.limit;
                if (remaining <= 0) break;
            }
            // Rebate u/s 87A (up to ₹7L)
            if (taxable <= 700000) tax = 0;
        } else {
            // Old Tax Regime
            const limits = age === "below60" ? [250000, 500000, 1000000]
                : age === "60to80" ? [300000, 500000, 1000000]
                    : [500000, 1000000, Infinity];
            const rates = [0, 5, 20, 30];
            const labels = ["Basic exemption", "₹5%", "20%", "30%"];
            let remaining = taxable;
            let prev = 0;
            limits.forEach((lim, i) => {
                const slice = Math.min(remaining, lim - prev);
                const t = (slice * rates[i]) / 100;
                if (slice > 0) slabs.push({ slab: `${labels[i]}`, tax: +t.toFixed(0) });
                tax += t;
                remaining -= slice;
                prev = lim;
            });
            const slice30 = remaining;
            if (slice30 > 0) { const t = (slice30 * 30) / 100; slabs.push({ slab: "30%", tax: +t.toFixed(0) }); tax += t; }
            if (taxable <= 500000) tax = 0;
        }

        const cess = tax * 0.04;
        const total = tax + cess;

        setResult({
            grossIncome: gross,
            taxableIncome: taxable,
            tax: +tax.toFixed(0),
            cess: +cess.toFixed(0),
            totalTax: +total.toFixed(0),
            effectiveRate: gross > 0 ? +(total / gross * 100).toFixed(2) : 0,
            slabs,
        });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏛️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Income Tax Calculator</h1>
                <p className="text-muted-foreground font-bold">India FY 2024-25 | New & Old Tax Regime</p>
            </div>

            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6">
                {(["new", "old"] as const).map(r => (
                    <button key={r} onClick={() => { setRegime(r); setResult(null); }}
                        className={`flex-1 py-3 font-bold text-sm transition-colors ${regime === r ? "bg-comic-blue text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                        {r === "new" ? "🆕 New Regime (2024-25)" : "📜 Old Regime"}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💰 Annual Income (₹)</label>
                    <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 1200000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
                </div>

                {regime === "old" && (
                    <>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">👤 Age Category</label>
                            <div className="flex rounded-xl overflow-hidden border-2 border-border">
                                {([["below60", "Below 60"], ["60to80", "60–80 yrs"], ["above80", "Above 80"]] as const).map(([v, l]) => (
                                    <button key={v} onClick={() => setAge(v)}
                                        className={`flex-1 py-2 text-xs font-bold transition-colors ${age === v ? "bg-comic-blue text-white" : "bg-background text-muted-foreground"}`}>
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">📄 Deductions (80C, HRA, etc.) (₹)</label>
                            <input type="number" value={deductions} onChange={e => setDeductions(e.target.value)} placeholder="e.g. 150000"
                                className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                        </div>
                    </>
                )}

                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🏛️ Calculate Tax
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💰 Gross Income</div>
                            <div className="text-xl font-black">{fmt(result.grossIncome)}</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📄 Taxable Income</div>
                            <div className="text-xl font-black">{fmt(result.taxableIncome)}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-comic-red rounded-2xl p-4 text-center">
                        <div className="text-sm font-bold text-muted-foreground mb-1">🏛️ Total Tax Payable (incl. 4% Cess)</div>
                        <div className="text-4xl font-black text-comic-red">{fmt(result.totalTax)}</div>
                        <div className="text-sm font-bold text-muted-foreground mt-1">Effective Tax Rate: {result.effectiveRate}%</div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">📊 Tax Slab Breakup</h3>
                        <div className="space-y-2 text-sm font-bold">
                            {result.slabs.map((s, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="text-muted-foreground">{s.slab}</span>
                                    <span>{fmt(s.tax)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between border-t-2 border-border pt-2">
                                <span className="text-muted-foreground">Income Tax</span>
                                <span>{fmt(result.tax)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Education Cess (4%)</span>
                                <span>{fmt(result.cess)}</span>
                            </div>
                            <div className="flex justify-between border-t-2 border-border pt-2 text-comic-red">
                                <span className="font-black">Total Tax</span>
                                <span className="font-black">{fmt(result.totalTax)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Income Tax Calculator India FY 2024-25</h2>
                <p>Our free <strong>Income Tax Calculator</strong> helps you calculate your income tax liability for FY 2024-25 under both the <strong>New Tax Regime</strong> and the <strong>Old Tax Regime</strong>. Enter your annual income, select your regime, and get instant tax computation with slab-wise breakup.</p>
                <h3 className="text-xl font-bold mt-6 mb-3">New vs Old Tax Regime — Which is better?</h3>
                <p>The <strong>New Tax Regime</strong> offers lower tax rates but no major deductions. The <strong>Old Tax Regime</strong> allows deductions like 80C (₹1.5L), HRA, 80D medical insurance, home loan interest, etc. Use both and compare to choose the best.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: income tax calculator india 2024-25, new tax regime calculator, old tax regime, income tax slab, 80c deduction, hra exemption, itr calculator, free tax india.</p>
            </div>

            <FAQSchema faqs={[
              { question: "Which tax regime is better — New or Old?", answer: "It depends on your income and deductions. If you have significant deductions (80C, HRA, 80D, home loan interest), the Old Regime may be better. Use our calculator to compare both." },
              { question: "What is the income tax slab for FY 2024-25?", answer: "New Regime: 0% up to ₹3L, 5% on ₹3-7L, 10% on ₹7-10L, 15% on ₹10-12L, 20% on ₹12-15L, 30% above ₹15L. Old Regime has different slabs with deductions." },
              { question: "How do I calculate income tax in India?", answer: "Enter your gross annual income, select New or Old regime, add deductions if applicable. Our calculator applies the correct slabs and 4% cess to give your total tax payable." },
            ]} />

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <h3 className="col-span-2 sm:col-span-4 font-black text-lg text-foreground mb-1">Related Tools</h3>
              {[
                { name: "GST Calculator", path: "/tools/gst-calculator", emoji: "🧾" },
                { name: "EMI Calculator", path: "/tools/emi-calculator", emoji: "🏦" },
                { name: "HRA Calculator", path: "/tools/hra-calculator", emoji: "🏠" },
                { name: "PF Calculator", path: "/tools/pf-calculator", emoji: "💵" },
              ].map((t) => (
                <Link key={t.path} to={t.path} className="comic-card p-3 flex items-center gap-2 hover:scale-[1.02] transition-transform text-sm font-bold">
                  <span>{t.emoji}</span>
                  <span className="text-foreground truncate">{t.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default IncomeTaxCalculator;
