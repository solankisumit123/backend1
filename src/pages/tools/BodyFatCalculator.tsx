import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const BodyFatCalculator = () => {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [waist, setWaist] = useState("");
    const [neck, setNeck] = useState("");
    const [hip, setHip] = useState("");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState<null | { bf: number; category: string; color: string; leanMass: number; fatMass: number; weight?: number }>(null);
    const [weight, setWeight] = useState("");

    const calculate = () => {
        const w = parseFloat(waist), n = parseFloat(neck), h = parseFloat(height);
        const hi = parseFloat(hip);
        if (!w || !n || !h) return;

        let bf = 0;
        if (gender === "male") {
            bf = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
        } else {
            if (!hi) return;
            bf = 163.205 * Math.log10(w + hi - n) - 97.684 * Math.log10(h) - 78.387;
        }

        bf = Math.max(2, Math.min(60, parseFloat(bf.toFixed(1))));
        let category = "", color = "";
        if (gender === "male") {
            if (bf < 6) { category = "Essential Fat"; color = "text-blue-400"; }
            else if (bf < 14) { category = "Athletes"; color = "text-green-500"; }
            else if (bf < 18) { category = "Fitness"; color = "text-green-400"; }
            else if (bf < 25) { category = "Acceptable"; color = "text-yellow-500"; }
            else { category = "Obese"; color = "text-red-500"; }
        } else {
            if (bf < 14) { category = "Essential Fat"; color = "text-blue-400"; }
            else if (bf < 21) { category = "Athletes"; color = "text-green-500"; }
            else if (bf < 25) { category = "Fitness"; color = "text-green-400"; }
            else if (bf < 32) { category = "Acceptable"; color = "text-yellow-500"; }
            else { category = "Obese"; color = "text-red-500"; }
        }

        const wt = parseFloat(weight);
        let fatMass = 0, leanMass = 0;
        if (wt) { fatMass = parseFloat((wt * bf / 100).toFixed(1)); leanMass = parseFloat((wt - fatMass).toFixed(1)); }
        setResult({ bf, category, color, leanMass, fatMass, weight: wt || undefined });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏋️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Body Fat Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate body fat percentage using the U.S. Navy method</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="flex rounded-xl overflow-hidden border-2 border-border">
                    {(["male", "female"] as const).map(g => (
                        <button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 font-bold capitalize ${gender === g ? "bg-comic-blue text-white" : "bg-background text-muted-foreground"}`}>
                            {g === "male" ? "👨 Male" : "👩 Female"}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📏 Height (cm)</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🏋️ Weight (kg, optional)</label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 70"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🔴 Waist (cm)</label>
                        <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="Measure at navel"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🔵 Neck (cm)</label>
                        <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder="Below larynx"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    {gender === "female" && (
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-foreground mb-2">🟣 Hip (cm) — Women only</label>
                            <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder="Widest part of hips"
                                className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                        </div>
                    )}
                </div>
                <button onClick={calculate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    🏋️ Calculate Body Fat
                </button>
            </div>

            {result && (
                <div className="space-y-4">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <div className={`text-6xl font-black ${result.color}`}>{result.bf}%</div>
                        <div className={`text-2xl font-black mt-2 ${result.color}`}>{result.category}</div>
                    </div>
                    {result.weight && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground">Fat Mass</div>
                                <div className="text-xl font-black mt-1 text-comic-red">{result.fatMass} kg</div>
                            </div>
                            <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground">Lean Mass</div>
                                <div className="text-xl font-black mt-1 text-comic-green">{result.leanMass} kg</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <SEOHead title="Body Fat Calculator - Calculate Body Fat Percentage" description="Calculate your body fat percentage using the U.S. Navy method. Find fat mass, lean mass, and fitness category with our free body fat calculator." keywords="body fat calculator, body fat percentage calculator, navy body fat method, fat percentage calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Body Fat Calculator", "applicationCategory": "HealthApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Body Fat Percentage Calculator" subtitle="U.S. Navy Method - Most Accurate Free Tool" description="Our body fat calculator uses the U.S. Navy circumference method, which is accurate to within 3% of DEXA scans. Track your fitness progress by monitoring body fat percentage." howToUse={["Select Male or Female", "Enter your height in cm", "Measure and enter waist circumference", "Measure and enter neck circumference", "Women: measure hip circumference too", "Click Calculate Body Fat"]} features={["U.S. Navy Method Formula", "Fat Mass & Lean Mass Breakdown", "Fitness Category Classification", "Male & Female Calculations", "Optional Weight for Mass Calculation"]} faqs={[{ question: "How to measure waist for body fat?", answer: "Measure your waist at the navel (belly button) level. Stand relaxed without sucking in your stomach. Measure in the same spot each time for consistency." }]} relatedTools={[{ name: "BMI Calculator", emoji: "⚖️", path: "/tools/bmi-calculator" }, { name: "TDEE Calculator", emoji: "🔥", path: "/tools/tdee-calculator" }]} />
        </div>
    );
};
export default BodyFatCalculator;
