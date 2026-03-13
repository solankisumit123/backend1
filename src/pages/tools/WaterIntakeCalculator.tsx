import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const WaterIntakeCalculator = () => {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("moderate");
    const [climate, setClimate] = useState("normal");
    const [result, setResult] = useState<null | { liters: number; glasses: number; ml: number; oz: number }>(null);

    const calculate = () => {
        const w = parseFloat(weight) || 0;
        if (!w) return;
        let base = w * 35; // ml per kg base
        // Activity multiplier
        if (activity === "sedentary") base *= 0.9;
        else if (activity === "active") base *= 1.15;
        else if (activity === "athlete") base *= 1.3;
        // Climate
        if (climate === "hot") base *= 1.15;
        else if (climate === "cold") base *= 0.95;

        setResult({
            ml: Math.round(base),
            liters: +(base / 1000).toFixed(1),
            glasses: Math.round(base / 250),
            oz: +(base / 29.5735).toFixed(0),
        });
    };

    const hourlyBreakdown = result ? [
        { time: "☀️ 7:00 AM - Wake up", ml: Math.round(result.ml * 0.1) },
        { time: "🌅 9:00 AM - Mid-morning", ml: Math.round(result.ml * 0.12) },
        { time: "🕚 11:00 AM - Pre-lunch", ml: Math.round(result.ml * 0.12) },
        { time: "🍽️ 1:00 PM - Lunch time", ml: Math.round(result.ml * 0.12) },
        { time: "☕ 3:00 PM - Afternoon", ml: Math.round(result.ml * 0.14) },
        { time: "🏃 5:00 PM - Evening", ml: Math.round(result.ml * 0.14) },
        { time: "🍽️ 7:00 PM - Dinner time", ml: Math.round(result.ml * 0.12) },
        { time: "🌙 9:00 PM - Before bed", ml: Math.round(result.ml * 0.08) },
    ] : [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💧</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Water Intake Calculator</h1>
                <p className="text-muted-foreground font-bold">How much water should you drink daily?</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">⚖️ Body Weight (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 70"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏃 Activity Level</label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { val: "sedentary", label: "🪑 Sedentary", desc: "Desk job" },
                            { val: "moderate", label: "🚶 Moderate", desc: "Light exercise" },
                            { val: "active", label: "🏃 Active", desc: "Regular exercise" },
                            { val: "athlete", label: "💪 Athlete", desc: "Intense exercise" },
                        ].map(a => (
                            <button key={a.val} onClick={() => setActivity(a.val)}
                                className={`px-3 py-3 rounded-xl border-2 font-bold text-sm transition-colors ${activity === a.val ? "bg-comic-blue text-white border-comic-blue" : "bg-background border-border hover:bg-muted"}`}>
                                {a.label}<br /><span className="text-[10px] opacity-70">{a.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🌡️ Climate</label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-border">
                        {[
                            { val: "cold", label: "❄️ Cold" },
                            { val: "normal", label: "🌤️ Normal" },
                            { val: "hot", label: "🔥 Hot/Humid" },
                        ].map(c => (
                            <button key={c.val} onClick={() => setClimate(c.val)}
                                className={`flex-1 py-2.5 font-bold text-sm transition-colors ${climate === c.val ? "bg-comic-blue text-white" : "bg-background text-muted-foreground"}`}>
                                {c.label}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    💧 Calculate Water Intake
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">💧 Daily Water Intake</p>
                        <div className="text-5xl font-black text-comic-blue">{result.liters} L</div>
                        <p className="text-sm font-bold text-muted-foreground mt-1">{result.ml} ml · {result.glasses} glasses · {result.oz} oz</p>
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">⏰ Suggested Schedule</h3>
                        <div className="space-y-2">
                            {hourlyBreakdown.map((h, i) => (
                                <div key={i} className="flex justify-between items-center px-3 py-2 rounded-lg bg-muted/50">
                                    <span className="text-sm font-bold text-foreground">{h.time}</span>
                                    <span className="text-sm font-black text-comic-blue">{h.ml} ml</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">💡 Tips</h3>
                        <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                            <li>• Drink a glass of water first thing in the morning</li>
                            <li>• Carry a water bottle throughout the day</li>
                            <li>• Drink before you feel thirsty</li>
                            <li>• Increase intake during exercise and hot weather</li>
                            <li>• Fruits & vegetables also contribute to water intake</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Daily Water Intake Calculator</h2>
                <p>Find out exactly <strong>how much water you should drink per day</strong> based on your weight, activity level, and climate. Our calculator provides a personalized hydration schedule to keep you healthy.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: water intake calculator, how much water should I drink, daily water requirement, hydration calculator, water consumption calculator, drinking water per day.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default WaterIntakeCalculator;
