import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HRACalculator = () => {
    const [basicSalary, setBasicSalary] = useState("");
    const [da, setDA] = useState("");
    const [hraReceived, setHRAReceived] = useState("");
    const [rentPaid, setRentPaid] = useState("");
    const [isMetro, setIsMetro] = useState(true);
    const [result, setResult] = useState<null | {
        actualHRA: number; rule1: number; rule2: number; rule3: number; exemption: number; taxable: number;
    }>(null);

    const calculate = () => {
        const basic = parseFloat(basicSalary) || 0;
        const daAmt = parseFloat(da) || 0;
        const hra = parseFloat(hraReceived) || 0;
        const rent = parseFloat(rentPaid) || 0;
        if (!basic || !hra) return;

        const salary = basic + daAmt;
        // 3 rules for HRA exemption (annual)
        const annualHRA = hra * 12;
        const annualRent = rent * 12;
        const annualSalary = salary * 12;

        const rule1 = annualHRA; // Actual HRA received
        const rule2 = annualRent - (0.1 * annualSalary); // Rent - 10% of salary
        const rule3 = isMetro ? 0.5 * annualSalary : 0.4 * annualSalary; // 50%/40% of salary

        const exemption = Math.max(0, Math.min(rule1, Math.max(0, rule2), rule3));
        const taxable = Math.max(0, annualHRA - exemption);

        setResult({
            actualHRA: annualHRA,
            rule1: Math.round(rule1),
            rule2: Math.round(Math.max(0, rule2)),
            rule3: Math.round(rule3),
            exemption: Math.round(exemption),
            taxable: Math.round(taxable),
        });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏠</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">HRA Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate HRA exemption for Income Tax</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💵 Basic Salary (₹/month)</label>
                        <input type="number" value={basicSalary} onChange={e => setBasicSalary(e.target.value)} placeholder="e.g. 40000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📈 DA (₹/month)</label>
                        <input type="number" value={da} onChange={e => setDA(e.target.value)} placeholder="e.g. 0"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🏠 HRA Received (₹/month)</label>
                        <input type="number" value={hraReceived} onChange={e => setHRAReceived(e.target.value)} placeholder="e.g. 18000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🏘️ Rent Paid (₹/month)</label>
                        <input type="number" value={rentPaid} onChange={e => setRentPaid(e.target.value)} placeholder="e.g. 15000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏙️ City Type</label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-border">
                        <button onClick={() => setIsMetro(true)}
                            className={`flex-1 py-2.5 font-bold text-sm transition-colors ${isMetro ? "bg-comic-orange text-white" : "bg-background text-muted-foreground"}`}>
                            🏙️ Metro (50%)
                        </button>
                        <button onClick={() => setIsMetro(false)}
                            className={`flex-1 py-2.5 font-bold text-sm transition-colors ${!isMetro ? "bg-comic-orange text-white" : "bg-background text-muted-foreground"}`}>
                            🏘️ Non-Metro (40%)
                        </button>
                    </div>
                    <p className="text-xs font-bold text-muted-foreground mt-1">Metro cities: Delhi, Mumbai, Kolkata, Chennai</p>
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🏠 Calculate HRA Exemption
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">✅ Annual HRA Exemption</p>
                        <div className="text-5xl font-black text-comic-green">{fmt(result.exemption)}</div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">📋 HRA Calculation (Annual)</h3>
                        <div className="space-y-3 text-sm font-bold">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Rule 1: Actual HRA received</span>
                                <span>{fmt(result.rule1)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Rule 2: Rent − 10% of salary</span>
                                <span>{fmt(result.rule2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Rule 3: {isMetro ? "50%" : "40%"} of salary</span>
                                <span>{fmt(result.rule3)}</span>
                            </div>
                            <div className="flex justify-between border-t-2 border-border pt-2 text-comic-green">
                                <span className="font-black">Exemption (min of 3)</span>
                                <span className="font-black">{fmt(result.exemption)}</span>
                            </div>
                            <div className="flex justify-between text-comic-red">
                                <span className="font-black">Taxable HRA</span>
                                <span className="font-black">{fmt(result.taxable)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">HRA Calculator India — House Rent Allowance Exemption</h2>
                <p>Calculate your <strong>HRA tax exemption</strong> under Section 10(13A) of the Income Tax Act. Enter your basic salary, HRA received, rent paid, and city type to find out how much HRA is exempt from tax and how much is taxable.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: hra calculator, hra exemption calculator, house rent allowance, hra tax exemption, section 10 13a, hra calculation formula india.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default HRACalculator;
