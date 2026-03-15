import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const PregnancyCalculator = () => {
    const [lmpDate, setLmpDate] = useState("");
    const [result, setResult] = useState<null | {
        dueDate: string; weeksPregnant: number; daysPregnant: number; trimester: number;
        milestones: { week: number; event: string; date: string }[];
    }>(null);

    const calculate = () => {
        if (!lmpDate) return;
        const lmp = new Date(lmpDate);
        const dueDate = new Date(lmp);
        dueDate.setDate(dueDate.getDate() + 280);

        const today = new Date();
        const diffMs = today.getTime() - lmp.getTime();
        const daysPregnant = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const weeksPregnant = Math.floor(daysPregnant / 7);
        const trimester = weeksPregnant <= 13 ? 1 : weeksPregnant <= 26 ? 2 : 3;

        const milestones = [
            { week: 4, event: "Pregnancy confirmed" },
            { week: 8, event: "Heartbeat detectable" },
            { week: 12, event: "First trimester ends" },
            { week: 16, event: "Baby's gender can be seen" },
            { week: 20, event: "Anatomy scan" },
            { week: 24, event: "Viability milestone" },
            { week: 28, event: "Third trimester begins" },
            { week: 36, event: "Baby is considered full term soon" },
            { week: 40, event: "Estimated due date" },
        ].map(m => {
            const d = new Date(lmp);
            d.setDate(d.getDate() + m.week * 7);
            return { ...m, date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) };
        });

        setResult({
            dueDate: dueDate.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
            weeksPregnant: Math.max(0, weeksPregnant),
            daysPregnant: Math.max(0, daysPregnant),
            trimester,
            milestones
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🤱</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Pregnancy Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate your due date and pregnancy milestones</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📅 First Day of Last Menstrual Period (LMP)</label>
                    <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)}
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                </div>
                <button onClick={calculate} className="w-full bg-comic-red hover:bg-comic-red/90 text-white font-bold py-4 rounded-xl text-lg">
                    🤱 Calculate Due Date
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-red rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">🎉 Estimated Due Date</p>
                        <div className="text-2xl font-black text-comic-red">{result.dueDate}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "⏱️ Weeks", val: `${result.weeksPregnant}w` },
                            { label: "📅 Days", val: `${result.daysPregnant}d` },
                            { label: "🔢 Trimester", val: `${result.trimester}${result.trimester === 1 ? "st" : result.trimester === 2 ? "nd" : "rd"}` },
                        ].map(({ label, val }) => (
                            <div key={label} className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground">{label}</div>
                                <div className="text-2xl font-black text-foreground mt-1">{val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                        <div className="p-4 border-b-2 border-border"><h3 className="font-black">👣 Pregnancy Milestones</h3></div>
                        <div className="space-y-0">
                            {result.milestones.map((m, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 border-b border-border last:border-0 ${result.weeksPregnant >= m.week ? "bg-comic-green/10" : ""}`}>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-lg ${result.weeksPregnant >= m.week ? "opacity-100" : "opacity-30"}`}>{result.weeksPregnant >= m.week ? "✅" : "🔵"}</span>
                                        <div>
                                            <div className="font-bold text-foreground">{m.event}</div>
                                            <div className="text-xs text-muted-foreground">Week {m.week}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-muted-foreground">{m.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <SEOHead title="Pregnancy Calculator - Due Date Calculator Online" description="Calculate your pregnancy due date, weeks pregnant, and trimester. Get a complete pregnancy milestone timeline with our free due date calculator." keywords="pregnancy calculator, due date calculator, weeks pregnant calculator, pregnancy milestone calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Pregnancy Calculator", "applicationCategory": "HealthApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Pregnancy Due Date Calculator" subtitle="Track Your Pregnancy Week by Week" description="Our pregnancy calculator estimates your due date based on the first day of your last menstrual period (LMP). It also shows important milestones throughout your 40-week journey." howToUse={["Enter the first day of your last period", "Click Calculate Due Date", "View your estimated due date", "Check weeks and days pregnant", "Review pregnancy milestones"]} features={["Due Date Calculation", "Weeks & Days Pregnant", "Trimester Indicator", "9 Key Milestones", "Milestone Completion Tracking"]} faqs={[{ question: "How accurate is this calculator?", answer: "This calculator gives an estimate based on a 40-week cycle from LMP. Actual due dates can vary. Always confirm with your gynecologist." }]} relatedTools={[{ name: "BMI Calculator", emoji: "⚖️", path: "/tools/bmi-calculator" }, { name: "Age Calculator", emoji: "🎂", path: "/tools/age-calculator" }]} />
        </div>
    );
};
export default PregnancyCalculator;
