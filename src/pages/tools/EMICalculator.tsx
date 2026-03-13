import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const EMICalculator = () => {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [tenure, setTenure] = useState("");
    const [tenureType, setTenureType] = useState<"years" | "months">("years");
    const [result, setResult] = useState<null | { emi: number; totalAmount: number; totalInterest: number; schedule: { month: number; emi: number; principal: number; interest: number; balance: number }[] }>(null);

    const calculate = () => {
        const p = parseFloat(principal);
        const annualRate = parseFloat(rate);
        const months = tenureType === "years" ? parseFloat(tenure) * 12 : parseFloat(tenure);
        if (!p || !annualRate || !months) return;
        const r = annualRate / 12 / 100;
        const emi = (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
        const totalAmount = emi * months;
        const totalInterest = totalAmount - p;
        let balance = p;
        const schedule = [];
        for (let i = 1; i <= Math.min(months, 12); i++) {
            const interest = balance * r;
            const principalPaid = emi - interest;
            balance -= principalPaid;
            schedule.push({ month: i, emi: Math.round(emi), principal: Math.round(principalPaid), interest: Math.round(interest), balance: Math.max(0, Math.round(balance)) });
        }
        setResult({ emi: Math.round(emi), totalAmount: Math.round(totalAmount), totalInterest: Math.round(totalInterest), schedule });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💰</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">EMI Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate your Home Loan, Car Loan & Personal Loan EMI instantly</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💵 Loan Amount (₹)</label>
                        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 1000000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📈 Annual Interest Rate (%)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 8.5" step="0.1"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📅 Loan Tenure</label>
                        <div className="flex gap-3">
                            <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} placeholder={tenureType === "years" ? "e.g. 20" : "e.g. 240"}
                                className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange transition-colors" />
                            <div className="flex rounded-xl overflow-hidden border-2 border-border">
                                {(["years", "months"] as const).map(t => (
                                    <button key={t} onClick={() => setTenureType(t)}
                                        className={`px-4 py-2 font-bold text-sm transition-colors ${tenureType === t ? "bg-comic-orange text-white" : "bg-background text-muted-foreground"}`}>
                                        {t === "years" ? "Yrs" : "Mo"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Presets */}
                    <div>
                        <p className="text-xs font-bold text-muted-foreground mb-2">⚡ Quick Presets</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Home Loan", p: "5000000", r: "8.5", t: "20", tt: "years" as const },
                                { label: "Car Loan", p: "800000", r: "10", t: "5", tt: "years" as const },
                                { label: "Personal", p: "500000", r: "14", t: "3", tt: "years" as const },
                            ].map(preset => (
                                <button key={preset.label} onClick={() => { setPrincipal(preset.p); setRate(preset.r); setTenure(preset.t); setTenureType(preset.tt); }}
                                    className="px-3 py-1.5 bg-muted hover:bg-comic-orange hover:text-white rounded-lg text-sm font-bold transition-colors border-2 border-border">
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={calculate}
                        className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md">
                        💰 Calculate EMI
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-4">
                    {/* Main Result */}
                    <div className="bg-card border-4 border-comic-orange rounded-2xl p-6 text-center shadow-lg">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Monthly EMI</p>
                        <div className="text-5xl font-black text-comic-orange">{fmt(result.emi)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "💵 Principal", val: fmt(parseFloat(principal)), color: "border-comic-blue" },
                            { label: "📈 Total Interest", val: fmt(result.totalInterest), color: "border-comic-red" },
                            { label: "💰 Total Amount", val: fmt(result.totalAmount), color: "border-comic-green" },
                            { label: "📊 Interest %", val: ((result.totalInterest / parseFloat(principal)) * 100).toFixed(1) + "%", color: "border-comic-purple" },
                        ].map(({ label, val, color }) => (
                            <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                                <div className="text-xs font-bold text-muted-foreground mb-1">{label}</div>
                                <div className="text-xl font-black text-foreground">{val}</div>
                            </div>
                        ))}
                    </div>

                    {/* Amortization Table */}
                    <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                        <div className="p-4 border-b-2 border-border"><h3 className="font-black text-foreground">📋 First Year Breakdown</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead><tr className="bg-muted">
                                    <th className="p-3 text-left font-bold">Month</th>
                                    <th className="p-3 text-right font-bold">EMI</th>
                                    <th className="p-3 text-right font-bold">Principal</th>
                                    <th className="p-3 text-right font-bold">Interest</th>
                                    <th className="p-3 text-right font-bold">Balance</th>
                                </tr></thead>
                                <tbody>
                                    {result.schedule.map(row => (
                                        <tr key={row.month} className="border-t border-border hover:bg-muted/30">
                                            <td className="p-3 font-bold">{row.month}</td>
                                            <td className="p-3 text-right text-muted-foreground">{fmt(row.emi)}</td>
                                            <td className="p-3 text-right text-comic-green font-bold">{fmt(row.principal)}</td>
                                            <td className="p-3 text-right text-comic-red font-bold">{fmt(row.interest)}</td>
                                            <td className="p-3 text-right font-bold">{fmt(row.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="EMI Calculator Online - Home, Car & Personal Loan"
                description="Free online EMI calculator to calculate Equated Monthly Installments for Home Loans, Car Loans, and Personal Loans. Includes detailed amortization schedule."
                keywords="emi calculator, loan emi, home loan emi, car loan emi, calculate monthly installment, bank emi checker"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro EMI Calculator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "FinanceApplication"
                }}
            />

            <SEOSection
                title="Professional EMI & Loan Installment Calculator"
                subtitle="Calculate Monthly Payments and Total Interest with Precision"
                description="Make informed financial decisions with WebInsight Pro's EMI Calculator. Whether you're planning a new home, buying a car, or taking a personal loan, our tool provides an instant breakdown of your monthly installments, total interest payable, and a complete amortization schedule. Plan your budget today and save thousands in interest."
                howToUse={[
                    "Enter the 'Loan Amount' you wish to borrow.",
                    "Input the 'Annual Interest Rate' offered by your bank.",
                    "Choose the 'Loan Tenure' in years or months.",
                    "Click 'Calculate EMI' to see your monthly payment.",
                    "Check the 'First Year Breakdown' table to see how much principal you pay each month."
                ]}
                features={[
                    "Loan Presets: Instant settings for Home, Car, and Personal loans.",
                    "Amortization Table: Month-by-month breakdown of principal and interest.",
                    "Total Cost View: See exactly how much interest you pay over the loan life.",
                    "Dynamic Tenure: Switch between years and months seamlessly.",
                    "100% Free: Bank-level calculation logic without any hidden costs."
                ]}
                faqs={[
                    {
                        question: "What is an EMI?",
                        answer: "EMI stands for Equated Monthly Installment. It is a fixed amount of money paid by a borrower to a lender at a specific date each month."
                    },
                    {
                        question: "How does loan tenure affect my EMI?",
                        answer: "A longer tenure reduces your monthly EMI but increases the 'Total Interest' you pay over the life of the loan. A shorter tenure saves you money on interest but requires a higher monthly payment."
                    },
                    {
                        question: "Is this calculator valid for all banks?",
                        answer: "Yes, our calculator uses the standard bank formula for reducing balance interest rates, which is used by almost all major financial institutions worldwide."
                    }
                ]}
                relatedTools={[
                    { name: "Simple Interest", emoji: "📉", path: "/tools/simple-interest" },
                    { name: "Percentage Calc", emoji: "🔢", path: "/tools/percentage-calculator" },
                    { name: "Age Calculator", emoji: "🎂", path: "/tools/age-calculator" },
                    { name: "AdSense Estimator", emoji: "💰", path: "/tools/adsense" }
                ]}
            />
        </div>
    );
};
export default EMICalculator;
