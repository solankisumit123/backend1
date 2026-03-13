import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const TDEECalculator = () => {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activity, setActivity] = useState("1.55");
    const [result, setResult] = useState<null | {
        bmr: number; tdee: number; lose: number; gain: number; macros: { protein: number; carbs: number; fat: number };
    }>(null);

    const activityLevels = [
        { val: "1.2", label: "🪑 Sedentary", desc: "Little or no exercise" },
        { val: "1.375", label: "🚶 Light", desc: "Exercise 1-3 days/week" },
        { val: "1.55", label: "🏃 Moderate", desc: "Exercise 3-5 days/week" },
        { val: "1.725", label: "💪 Very Active", desc: "Hard exercise 6-7 days/week" },
        { val: "1.9", label: "🔥 Extra Active", desc: "Very hard exercise + physical job" },
    ];

    const calculate = () => {
        const a = parseFloat(age) || 0;
        const w = parseFloat(weight) || 0;
        const h = parseFloat(height) || 0;
        const act = parseFloat(activity);
        if (!a || !w || !h) return;

        // Mifflin-St Jeor Equation
        let bmr = 10 * w + 6.25 * h - 5 * a;
        bmr = gender === "male" ? bmr + 5 : bmr - 161;

        const tdee = Math.round(bmr * act);
        const lose = tdee - 500;
        const gain = tdee + 500;
        // Macros for maintenance (40% carbs, 30% protein, 30% fat)
        const protein = Math.round((tdee * 0.3) / 4);
        const carbs = Math.round((tdee * 0.4) / 4);
        const fat = Math.round((tdee * 0.3) / 9);

        setResult({ bmr: Math.round(bmr), tdee, lose, gain, macros: { protein, carbs, fat } });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔥</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">TDEE Calculator</h1>
                <p className="text-muted-foreground font-bold">Total Daily Energy Expenditure — know your daily calories</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">👤 Gender</label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-border">
                        {(["male", "female"] as const).map(g => (
                            <button key={g} onClick={() => setGender(g)}
                                className={`flex-1 py-2.5 font-bold text-sm transition-colors ${gender === g ? "bg-comic-blue text-white" : "bg-background text-muted-foreground"}`}>
                                {g === "male" ? "♂️ Male" : "♀️ Female"}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🎂 Age</label>
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">⚖️ Weight (kg)</label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📏 Height (cm)</label>
                        <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏃 Activity Level</label>
                    <div className="space-y-2">
                        {activityLevels.map(al => (
                            <button key={al.val} onClick={() => setActivity(al.val)}
                                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors font-bold text-sm ${activity === al.val ? "bg-comic-blue text-white border-comic-blue" : "bg-background border-border hover:bg-muted"}`}>
                                {al.label} <span className="text-xs opacity-80">— {al.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🔥 Calculate TDEE
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-orange rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">🔥 Your TDEE (Maintenance Calories)</p>
                        <div className="text-5xl font-black text-comic-orange">{result.tdee.toLocaleString()}</div>
                        <p className="text-sm font-bold text-muted-foreground mt-1">calories / day</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📊 BMR</div>
                            <div className="text-xl font-black">{result.bmr}</div>
                            <div className="text-[10px] text-muted-foreground">cal/day</div>
                        </div>
                        <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🏋️ Weight Loss</div>
                            <div className="text-xl font-black text-comic-green">{result.lose}</div>
                            <div className="text-[10px] text-muted-foreground">cal/day (-500)</div>
                        </div>
                        <div className="bg-card border-4 border-comic-red rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💪 Weight Gain</div>
                            <div className="text-xl font-black text-comic-red">{result.gain}</div>
                            <div className="text-[10px] text-muted-foreground">cal/day (+500)</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">🥗 Recommended Macros (Maintenance)</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-3 bg-comic-blue/10 rounded-xl">
                                <div className="text-2xl font-black text-comic-blue">{result.macros.protein}g</div>
                                <div className="text-xs font-bold text-muted-foreground">Protein (30%)</div>
                            </div>
                            <div className="text-center p-3 bg-comic-orange/10 rounded-xl">
                                <div className="text-2xl font-black text-comic-orange">{result.macros.carbs}g</div>
                                <div className="text-xs font-bold text-muted-foreground">Carbs (40%)</div>
                            </div>
                            <div className="text-center p-3 bg-comic-red/10 rounded-xl">
                                <div className="text-2xl font-black text-comic-red">{result.macros.fat}g</div>
                                <div className="text-xs font-bold text-muted-foreground">Fat (30%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">TDEE Calculator — Total Daily Energy Expenditure</h2>
                <p>Calculate your <strong>TDEE</strong> using the Mifflin-St Jeor equation. Find out how many calories you burn daily based on your age, gender, weight, height, and activity level. Get personalized calorie targets for weight loss, maintenance, or muscle gain.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: tdee calculator, total daily energy expenditure, bmr calculator, daily calorie calculator, weight loss calories, macro calculator, mifflin st jeor.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default TDEECalculator;
