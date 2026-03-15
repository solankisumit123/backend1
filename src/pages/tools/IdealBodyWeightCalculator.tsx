import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const IdealBodyWeightCalculator = () => {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [height, setHeight] = useState("");
    const [frame, setFrame] = useState<"small" | "medium" | "large">("medium");
    const [result, setResult] = useState<null | {
        robinson: number; miller: number; devine: number; hamwi: number; avg: number; range: [number, number]; bmi_range: [number, number];
    }>(null);

    const calculate = () => {
        const h = parseFloat(height) || 0;
        if (!h) return;
        const inches = h / 2.54;
        const overFive = Math.max(0, inches - 60);

        let robinson: number, miller: number, devine: number, hamwi: number;

        if (gender === "male") {
            robinson = 52 + 1.9 * overFive;
            miller = 56.2 + 1.41 * overFive;
            devine = 50 + 2.3 * overFive;
            hamwi = 48 + 2.7 * overFive;
        } else {
            robinson = 49 + 1.7 * overFive;
            miller = 53.1 + 1.36 * overFive;
            devine = 45.5 + 2.3 * overFive;
            hamwi = 45.5 + 2.2 * overFive;
        }

        const avg = (robinson + miller + devine + hamwi) / 4;
        // Frame adjustment
        let rangeLow = avg * 0.9;
        let rangeHigh = avg * 1.1;
        if (frame === "small") { rangeLow = avg * 0.85; rangeHigh = avg * 0.97; }
        else if (frame === "large") { rangeLow = avg * 1.03; rangeHigh = avg * 1.15; }

        // BMI-based healthy range
        const hm = h / 100;
        const bmiLow = 18.5 * hm * hm;
        const bmiHigh = 24.9 * hm * hm;

        setResult({
            robinson: +robinson.toFixed(1), miller: +miller.toFixed(1),
            devine: +devine.toFixed(1), hamwi: +hamwi.toFixed(1),
            avg: +avg.toFixed(1), range: [+rangeLow.toFixed(1), +rangeHigh.toFixed(1)],
            bmi_range: [+bmiLow.toFixed(1), +bmiHigh.toFixed(1)],
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⚖️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Ideal Body Weight Calculator</h1>
                <p className="text-muted-foreground font-bold">Find your ideal weight using 4 scientific formulas</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">👤 Gender</label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-border">
                        {(["male", "female"] as const).map(g => (
                            <button key={g} onClick={() => setGender(g)}
                                className={`flex-1 py-2.5 font-bold text-sm transition-colors ${gender === g ? "bg-comic-green text-white" : "bg-background text-muted-foreground"}`}>
                                {g === "male" ? "♂️ Male" : "♀️ Female"}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📏 Height (cm)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 170"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🦴 Body Frame</label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-border">
                        {(["small", "medium", "large"] as const).map(f => (
                            <button key={f} onClick={() => setFrame(f)}
                                className={`flex-1 py-2.5 font-bold text-sm transition-colors capitalize ${frame === f ? "bg-comic-green text-white" : "bg-background text-muted-foreground"}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-green hover:bg-comic-green/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    ⚖️ Calculate Ideal Weight
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">⚖️ Your Ideal Weight ({frame} frame)</p>
                        <div className="text-5xl font-black text-comic-green">{result.range[0]} - {result.range[1]} kg</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: "Robinson Formula", val: result.robinson },
                            { name: "Miller Formula", val: result.miller },
                            { name: "Devine Formula", val: result.devine },
                            { name: "Hamwi Formula", val: result.hamwi },
                        ].map((f, i) => (
                            <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-muted-foreground mb-1">{f.name}</div>
                                <div className="text-xl font-black">{f.val} kg</div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📊 Average</div>
                            <div className="text-2xl font-black text-comic-green">{result.avg} kg</div>
                        </div>
                        <div className="bg-card border-4 border-comic-blue rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📋 BMI Range (18.5-24.9)</div>
                            <div className="text-lg font-black text-comic-blue">{result.bmi_range[0]} – {result.bmi_range[1]} kg</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Ideal Body Weight Calculator</h2>
                <p>Calculate your <strong>ideal body weight</strong> using four scientific formulas: Robinson, Miller, Devine, and Hamwi. Accounts for gender, height, and body frame size. Also shows BMI-based healthy weight range.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: ideal body weight calculator, ideal weight for height, healthy weight calculator, robinson formula, devine formula, ibw calculator.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default IdealBodyWeightCalculator;
