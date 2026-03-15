import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const CalorieCalculator = () => {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("1.375");
    const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
    const [result, setResult] = useState<null | { bmr: number; tdee: number; target: number; protein: number; carbs: number; fat: number }>(null);

    const activities = [
        { val: "1.2", label: "🪑 Sedentary (no exercise)" },
        { val: "1.375", label: "🚶 Light (1-3 days/week)" },
        { val: "1.55", label: "🏃 Moderate (3-5 days/week)" },
        { val: "1.725", label: "💪 Very Active (6-7 days/week)" },
        { val: "1.9", label: "🏋️ Extremely Active (athlete)" },
    ];

    const calculate = () => {
        const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height), act = parseFloat(activity);
        if (!a || !w || !h) return;
        const bmr = gender === "male"
            ? 10 * w + 6.25 * h - 5 * a + 5
            : 10 * w + 6.25 * h - 5 * a - 161;
        const tdee = bmr * act;
        const target = goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 500 : tdee;
        const protein = Math.round(w * 2.2);
        const fat = Math.round((target * 0.25) / 9);
        const carbs = Math.round((target - protein * 4 - fat * 9) / 4);
        setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(target), protein, carbs, fat });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔥</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Calorie Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate daily calorie needs based on your body and lifestyle</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                {/* Gender */}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Gender</label>
                    <div className="flex gap-3">
                        {(["male", "female"] as const).map(g => (
                            <button key={g} onClick={() => setGender(g)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-colors ${gender === g ? "border-comic-orange bg-comic-orange/10 text-comic-orange" : "border-border text-muted-foreground"}`}>
                                {g === "male" ? "👨 Male" : "👩 Female"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[{ label: "Age (years)", val: age, set: setAge, ph: "25" }, { label: "Weight (kg)", val: weight, set: setWeight, ph: "70" }, { label: "Height (cm)", val: height, set: setHeight, ph: "175" }].map(({ label, val, set, ph }) => (
                        <div key={label}>
                            <label className="block text-xs font-bold text-foreground mb-2">{label}</label>
                            <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={ph}
                                className="w-full border-2 border-border rounded-xl px-3 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange transition-colors text-center" />
                        </div>
                    ))}
                </div>

                {/* Activity */}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Activity Level</label>
                    <select value={activity} onChange={e => setActivity(e.target.value)}
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange">
                        {activities.map(a => <option key={a.val} value={a.val}>{a.label}</option>)}
                    </select>
                </div>

                {/* Goal */}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Your Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                        {([["lose", "🏃 Lose Weight"], ["maintain", "⚖️ Maintain"], ["gain", "💪 Gain Muscle"]] as const).map(([val, label]) => (
                            <button key={val} onClick={() => setGoal(val)}
                                className={`py-3 rounded-xl border-2 font-bold text-sm transition-colors ${goal === val ? "border-comic-orange bg-comic-orange/10 text-comic-orange" : "border-border text-muted-foreground"}`}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={calculate}
                    className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🔥 Calculate Calories
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-orange rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">Daily Calorie Target ({goal === "lose" ? "Weight Loss" : goal === "gain" ? "Muscle Gain" : "Maintenance"})</p>
                        <div className="text-5xl font-black text-comic-orange">{result.target.toLocaleString()}</div>
                        <div className="text-muted-foreground font-bold">kcal/day</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🔥 BMR (Base Rate)</div>
                            <div className="text-2xl font-black text-foreground">{result.bmr} kcal</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">⚡ TDEE (With Activity)</div>
                            <div className="text-2xl font-black text-foreground">{result.tdee} kcal</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">🥗 Recommended Macros</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[{ label: "🥩 Protein", val: result.protein, unit: "g", color: "text-red-500" }, { label: "🍚 Carbs", val: result.carbs, unit: "g", color: "text-yellow-500" }, { label: "🥑 Fat", val: result.fat, unit: "g", color: "text-green-500" }].map(({ label, val, unit, color }) => (
                                <div key={label} className="bg-muted rounded-xl p-3 text-center">
                                    <div className={`text-2xl font-black ${color}`}>{val}{unit}</div>
                                    <div className="text-xs font-bold text-muted-foreground">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Calorie Calculator - Daily Calorie Needs for Weight Loss"
                description="Free calorie calculator to estimate daily calories to lose weight, gain muscle, or maintain. Includes BMR, TDEE, and daily macro-nutrient breakdown."
                keywords="calorie calculator, calculate calories, weight loss calories, bmr calculator, tdee calculator, macro calculator"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Calorie Calculator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "HealthApplication"
                }}
            />

            <SEOSection
                title="Precise Calorie & Macronutrient Analysis"
                subtitle="Fuel Your Body Right with Science-Based Calculations"
                description="Achieving your fitness goals requires more than just guessing. WebInsight Pro's Calorie Calculator uses the globally recognized Mifflin-St Jeor formula to provide a highly accurate estimation of your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure). Whether you're looking to shed fat or build muscle, our tool gives you the exact numbers you need to succeed."
                howToUse={[
                    "Select your 'Gender' and enter your 'Age'.",
                    "Input your current 'Weight' (kg) and 'Height' (cm).",
                    "Select an 'Activity Level' that best describes your weekly routine.",
                    "Choose your fitness 'Goal' (Lose, Maintain, or Gain).",
                    "Click 'Calculate Calories' to see your daily target and macro split."
                ]}
                features={[
                    "BMR vs TDEE: Understand how many calories you burn at rest vs. during activity.",
                    "Macro-Nutrient Split: Get suggested grams for Protein, Carbs, and Fats.",
                    "Goal Specific: Custom calculations for bulking, cutting, or maintenance.",
                    "Activity Scaling: Adjust results based on how often you hit the gym.",
                    "Privacy Guaranteed: Your health data stays in your browser."
                ]}
                faqs={[
                    {
                        question: "What is BMR?",
                        answer: "BMR stands for Basal Metabolic Rate. It is the number of calories your body burns just to perform basic life-sustaining functions such as breathing and circulation, while at rest."
                    },
                    {
                        question: "How many calories should I eat to lose weight?",
                        answer: "Generally, a deficit of 500 calories below your TDEE is recommended for sustainable weight loss of about 0.5kg (1lb) per week."
                    },
                    {
                        question: "Why do macros matter?",
                        answer: "Calories determine weight change, but macros determine body composition. For example, high protein is essential for muscle retention while in a calorie deficit."
                    }
                ]}
                relatedTools={[
                    { name: "BMI Calculator", emoji: "⚖️", path: "/tools/bmi-calculator" },
                    { name: "Age Calculator", emoji: "🎂", path: "/tools/age-calculator" },
                    { name: "Unit Converter", emoji: "📏", path: "/tools/unit-converter" },
                    { name: "Percentage Calc", emoji: "🔢", path: "/tools/percentage-calculator" }
                ]}
            />
        </div>
    );
};
export default CalorieCalculator;
