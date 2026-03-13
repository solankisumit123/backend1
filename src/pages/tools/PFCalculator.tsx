import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const PFCalculator = () => {
    const [basicSalary, setBasicSalary] = useState("");
    const [da, setDA] = useState("");
    const [currentAge, setCurrentAge] = useState("");
    const [retireAge, setRetireAge] = useState("60");
    const [currentPF, setCurrentPF] = useState("");
    const [annualIncrease, setAnnualIncrease] = useState("5");
    const [result, setResult] = useState<null | {
        monthlyEmployee: number; monthlyEmployer: number; monthlyTotal: number;
        retirementCorpus: number; yearsLeft: number; totalContribution: number; totalInterest: number;
    }>(null);

    const PF_RATE = 8.25; // EPF interest rate (FY 2024-25)

    const calculate = () => {
        const basic = parseFloat(basicSalary) || 0;
        const daAmt = parseFloat(da) || 0;
        const age = parseInt(currentAge) || 0;
        const retire = parseInt(retireAge) || 60;
        const existing = parseFloat(currentPF) || 0;
        const increment = parseFloat(annualIncrease) || 0;
        if (!basic || !age) return;

        const pfWage = basic + daAmt;
        const empContri = pfWage * 0.12; // 12% employee
        const erContri = Math.min(pfWage * 0.0833, 1250) + (pfWage * 0.12 - Math.min(pfWage * 0.0833, 1250)); // Simplified: 12% employer (3.67% EPF + 8.33% EPS capped)
        const monthlyTotal = empContri + pfWage * 0.12;

        const yearsLeft = Math.max(0, retire - age);
        const monthlyRate = PF_RATE / (12 * 100);
        let corpus = existing;
        let currentBasic = pfWage;
        let totalContri = existing;

        for (let y = 0; y < yearsLeft; y++) {
            const monthlyPF = currentBasic * 0.24; // Both employee + employer
            for (let m = 0; m < 12; m++) {
                corpus = corpus * (1 + monthlyRate) + monthlyPF;
                totalContri += monthlyPF;
            }
            currentBasic *= (1 + increment / 100);
        }

        setResult({
            monthlyEmployee: Math.round(empContri),
            monthlyEmployer: Math.round(pfWage * 0.12),
            monthlyTotal: Math.round(monthlyTotal),
            retirementCorpus: Math.round(corpus),
            yearsLeft,
            totalContribution: Math.round(totalContri),
            totalInterest: Math.round(corpus - totalContri),
        });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏦</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">PF Calculator</h1>
                <p className="text-muted-foreground font-bold">EPF/Provident Fund retirement corpus calculator</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💵 Basic Salary (₹/month)</label>
                        <input type="number" value={basicSalary} onChange={e => setBasicSalary(e.target.value)} placeholder="e.g. 30000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📈 Dearness Allowance (₹)</label>
                        <input type="number" value={da} onChange={e => setDA(e.target.value)} placeholder="e.g. 0"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🎂 Current Age</label>
                        <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} placeholder="e.g. 25"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🎯 Retirement Age</label>
                        <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} placeholder="60"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🏦 Current PF Balance (₹)</label>
                        <input type="number" value={currentPF} onChange={e => setCurrentPF(e.target.value)} placeholder="e.g. 50000"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📊 Annual Salary Increase (%)</label>
                        <input type="number" value={annualIncrease} onChange={e => setAnnualIncrease(e.target.value)} placeholder="5"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>
                <div className="bg-muted rounded-xl p-3 text-xs font-bold text-muted-foreground">
                    Interest Rate: {PF_RATE}% p.a. (FY 2024-25) | Employee: 12% | Employer: 12% (3.67% EPF + 8.33% EPS)
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🏦 Calculate PF Corpus
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">🏆 Retirement PF Corpus (after {result.yearsLeft} years)</p>
                        <div className="text-4xl font-black text-comic-green">{fmt(result.retirementCorpus)}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">👤 Your Monthly</div>
                            <div className="text-lg font-black">{fmt(result.monthlyEmployee)}</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🏢 Employer Monthly</div>
                            <div className="text-lg font-black">{fmt(result.monthlyEmployer)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-blue rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💰 Total Monthly</div>
                            <div className="text-lg font-black text-comic-blue">{fmt(result.monthlyTotal)}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💵 Total Contribution</div>
                            <div className="text-xl font-black">{fmt(result.totalContribution)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-orange rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📈 Interest Earned</div>
                            <div className="text-xl font-black text-comic-orange">{fmt(result.totalInterest)}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">EPF/PF Calculator India</h2>
                <p>Calculate your <strong>Provident Fund (EPF) retirement corpus</strong> based on current salary, age, and expected annual increments. Our PF calculator uses the latest {PF_RATE}% interest rate and shows both employee and employer contributions.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: pf calculator, epf calculator india, provident fund calculator, retirement corpus calculator, employee pf, epfo calculator, pf interest rate 2024.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default PFCalculator;
