import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const BMICalculator = () => {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [heightFt, setHeightFt] = useState("");
    const [heightIn, setHeightIn] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [result, setResult] = useState<null | { bmi: number; category: string; color: string; emoji: string; advice: string; idealMin: number; idealMax: number; }>(null);

    const calculate = () => {
        let w = parseFloat(weight);
        let h = 0;

        if (unit === "metric") {
            h = parseFloat(height) / 100;
        } else {
            const ft = parseFloat(heightFt) || 0;
            const inch = parseFloat(heightIn) || 0;
            h = (ft * 12 + inch) * 0.0254;
            w = w * 0.453592;
        }

        if (!w || !h) return;
        const bmi = w / (h * h);

        let category = "", color = "", emoji = "", advice = "";
        if (bmi < 18.5) { category = "Underweight"; color = "text-blue-500"; emoji = "😟"; advice = "You need to gain weight. Eat nutritious food and consult a doctor."; }
        else if (bmi < 25) { category = "Normal Weight"; color = "text-green-500"; emoji = "😊"; advice = "Great! You have a healthy BMI. Keep up the good work!"; }
        else if (bmi < 30) { category = "Overweight"; color = "text-yellow-500"; emoji = "😐"; advice = "Consider a balanced diet and regular exercise to reach normal weight."; }
        else if (bmi < 35) { category = "Obese Class I"; color = "text-orange-500"; emoji = "😟"; advice = "Health risk is increased. Consult a doctor for a proper plan."; }
        else if (bmi < 40) { category = "Obese Class II"; color = "text-red-500"; emoji = "😰"; advice = "Serious health risks. Please consult a healthcare professional."; }
        else { category = "Obese Class III"; color = "text-red-700"; emoji = "🚨"; advice = "Very serious health risk. Immediate medical consultation recommended."; }

        const idealMin = parseFloat((18.5 * h * h).toFixed(1));
        const idealMax = parseFloat((24.9 * h * h).toFixed(1));

        setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color, emoji, advice, idealMin, idealMax });
    };

    const bmiPercent = result ? Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100) : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-comic-green text-white mb-4 text-3xl">⚖️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">BMI Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate your Body Mass Index and check your health status</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                {/* Unit Toggle */}
                <div className="flex rounded-xl overflow-hidden border-2 border-border mb-6">
                    {(["metric", "imperial"] as const).map(u => (
                        <button
                            key={u}
                            onClick={() => setUnit(u)}
                            className={`flex-1 py-3 font-bold text-sm transition-colors ${unit === u ? "bg-comic-green text-white" : "bg-background text-muted-foreground hover:bg-muted"}`}
                        >
                            {u === "metric" ? "📏 Metric (kg, cm)" : "📐 Imperial (lbs, ft)"}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4">
                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Gender</label>
                        <div className="flex gap-3">
                            {(["male", "female"] as const).map(g => (
                                <button key={g} onClick={() => setGender(g)}
                                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-colors ${gender === g ? "border-comic-green bg-comic-green/10 text-comic-green" : "border-border text-muted-foreground"}`}>
                                    {g === "male" ? "👨 Male" : "👩 Female"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                            Weight ({unit === "metric" ? "kg" : "lbs"})
                        </label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green transition-colors" />
                    </div>

                    {/* Height */}
                    {unit === "metric" ? (
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Height (cm)</label>
                            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175"
                                className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green transition-colors" />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Height</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} placeholder="Feet (e.g. 5)"
                                    className="border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green transition-colors" />
                                <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} placeholder="Inches (e.g. 9)"
                                    className="border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green transition-colors" />
                            </div>
                        </div>
                    )}

                    {/* Age (optional) */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Age (optional)</label>
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 25"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green transition-colors" />
                    </div>

                    <button onClick={calculate}
                        className="w-full bg-comic-green hover:bg-comic-green/90 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md">
                        ⚖️ Calculate BMI
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    {/* BMI Score */}
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center shadow-lg">
                        <div className="text-6xl mb-2">{result.emoji}</div>
                        <div className={`text-6xl font-black ${result.color} mb-1`}>{result.bmi}</div>
                        <div className="text-sm text-muted-foreground font-bold mb-2">Your BMI Score</div>
                        <div className={`text-xl font-black ${result.color}`}>{result.category}</div>
                    </div>

                    {/* BMI Meter */}
                    <div className="bg-card border-4 border-border rounded-2xl p-6">
                        <p className="font-bold text-foreground mb-3">BMI Scale</p>
                        <div className="relative h-6 rounded-full overflow-hidden mb-2" style={{ background: "linear-gradient(to right, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)" }}>
                            <div className="absolute top-0 w-4 h-6 bg-white border-2 border-gray-800 rounded-sm transition-all" style={{ left: `calc(${bmiPercent}% - 8px)` }} />
                        </div>
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                            <span>Underweight<br />&lt;18.5</span>
                            <span className="text-center">Normal<br />18.5–24.9</span>
                            <span className="text-center">Overweight<br />25–29.9</span>
                            <span className="text-right">Obese<br />&gt;30</span>
                        </div>
                    </div>

                    {/* Ideal Weight */}
                    <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                        <p className="font-bold text-foreground">
                            🎯 Ideal weight for your height: <span className="text-comic-green font-black">{result.idealMin} – {result.idealMax} {unit === "metric" ? "kg" : "lbs"}</span>
                        </p>
                    </div>

                    {/* Advice */}
                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <p className="font-bold text-foreground">💡 Health Advice</p>
                        <p className="text-muted-foreground mt-1">{result.advice}</p>
                    </div>

                    {/* BMI Table */}
                    <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-muted"><th className="p-3 text-left font-bold">Category</th><th className="p-3 text-right font-bold">BMI Range</th></tr></thead>
                            <tbody>
                                {[
                                    ["Underweight", "< 18.5", "text-blue-500"],
                                    ["Normal Weight", "18.5 – 24.9", "text-green-500"],
                                    ["Overweight", "25 – 29.9", "text-yellow-500"],
                                    ["Obese Class I", "30 – 34.9", "text-orange-500"],
                                    ["Obese Class II", "35 – 39.9", "text-red-500"],
                                    ["Obese Class III", "≥ 40", "text-red-700"],
                                ].map(([cat, range, color]) => (
                                    <tr key={cat} className={`border-t border-border ${result.category === cat ? "bg-muted/50 font-black" : ""}`}>
                                        <td className={`p-3 font-bold ${color}`}>{cat}</td>
                                        <td className="p-3 text-right text-muted-foreground font-bold">{range}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="BMI Calculator Online - Check Your Body Mass Index"
                description="Free BMI calculator for men and women. Calculate your Body Mass Index (BMI) using metric or imperial units and find your ideal weight range instantly."
                keywords="bmi calculator, calculate bmi, body mass index, ideal weight finder, healthy weight range"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro BMI Calculator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "HealthApplication"
                }}
            />

            <SEOSection
                title="Professional Body Mass Index (BMI) Analysis"
                subtitle="Know Your Health Status with Precision Calculations"
                description="Our BMI Calculator is a professional health utility that helps you monitor your body weight relative to your height. It supports both Metric and Imperial systems, making it accessible for everyone worldwide. Understanding your BMI is the first step towards a healthier lifestyle and preventing weight-related diseases."
                howToUse={[
                    "Choose your measurement 'unit' (Metric or Imperial).",
                    "Select your 'Gender' for a more personalized analysis.",
                    "Enter your current 'Weight' (kg or lbs).",
                    "Enter your 'Height' accurately.",
                    "Click 'Calculate BMI' to see your health result and ideal weight range."
                ]}
                features={[
                    "Dual Unit Support: Switch between cm/kg and feet/inches effortlessly.",
                    "Health Category: Instant classification (Normal, Overweight, Obese, etc.).",
                    "Ideal Weight: Tells you the exact weight range you should target.",
                    "Health Advice: Actionable suggestions based on your specific score.",
                    "Mobile Friendly: Monitor your health on the go with our responsive tool."
                ]}
                faqs={[
                    {
                        question: "What is a healthy BMI for adults?",
                        answer: "For most adults, a healthy BMI is between 18.5 and 24.9. Scores below 18.5 indicate underweight, while scores above 25 indicate overweight or obesity."
                    },
                    {
                        question: "Is BMI different for men and women?",
                        answer: "The formula for BMI is the same for both, but the interpretation of body fat percentage can vary. Our tool provides a general health classification suitable for both genders."
                    },
                    {
                        question: "Why does my ideal weight range matter?",
                        answer: "Maintaining a weight within the ideal range significantly reduces the risk of chronic health conditions such as type 2 diabetes, cardiovascular diseases, and certain types of cancer."
                    }
                ]}
                relatedTools={[
                    { name: "Calorie Calculator", emoji: "🍎", path: "/tools/calorie-calculator" },
                    { name: "Age Calculator", emoji: "🎂", path: "/tools/age-calculator" },
                    { name: "Stopwatch", emoji: "⏱️", path: "/tools/stopwatch" },
                    { name: "Water Counter", emoji: "💧", path: "/tools/word-counter" }
                ]}
            />
        </div>
    );
};

export default BMICalculator;
