import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type Category = { name: string; units: { label: string; toBase: number }[] };

const categories: Category[] = [
    {
        name: "🌡️ Temperature",
        units: [
            { label: "Celsius (°C)", toBase: 1 },
            { label: "Fahrenheit (°F)", toBase: 1 },
            { label: "Kelvin (K)", toBase: 1 },
        ],
    },
    {
        name: "📏 Length",
        units: [
            { label: "Meter (m)", toBase: 1 },
            { label: "Kilometer (km)", toBase: 1000 },
            { label: "Centimeter (cm)", toBase: 0.01 },
            { label: "Millimeter (mm)", toBase: 0.001 },
            { label: "Mile", toBase: 1609.344 },
            { label: "Yard", toBase: 0.9144 },
            { label: "Foot", toBase: 0.3048 },
            { label: "Inch", toBase: 0.0254 },
        ],
    },
    {
        name: "⚖️ Weight",
        units: [
            { label: "Kilogram (kg)", toBase: 1 },
            { label: "Gram (g)", toBase: 0.001 },
            { label: "Milligram (mg)", toBase: 0.000001 },
            { label: "Pound (lb)", toBase: 0.453592 },
            { label: "Ounce (oz)", toBase: 0.0283495 },
            { label: "Ton (metric)", toBase: 1000 },
        ],
    },
    {
        name: "💧 Volume",
        units: [
            { label: "Liter (L)", toBase: 1 },
            { label: "Milliliter (mL)", toBase: 0.001 },
            { label: "Gallon (US)", toBase: 3.78541 },
            { label: "Quart (US)", toBase: 0.946353 },
            { label: "Cup (US)", toBase: 0.236588 },
            { label: "Fluid Ounce", toBase: 0.0295735 },
        ],
    },
    {
        name: "🚀 Speed",
        units: [
            { label: "m/s", toBase: 1 },
            { label: "km/h", toBase: 0.277778 },
            { label: "mph", toBase: 0.44704 },
            { label: "Knot", toBase: 0.514444 },
        ],
    },
    {
        name: "📐 Area",
        units: [
            { label: "Square Meter (m²)", toBase: 1 },
            { label: "Square Kilometer (km²)", toBase: 1000000 },
            { label: "Square Foot", toBase: 0.092903 },
            { label: "Acre", toBase: 4046.86 },
            { label: "Hectare", toBase: 10000 },
        ],
    },
];

const convertTemp = (val: number, from: string, to: string) => {
    let celsius = val;
    if (from.includes("°F")) celsius = (val - 32) * 5 / 9;
    else if (from.includes("K")) celsius = val - 273.15;
    if (to.includes("°C")) return celsius;
    if (to.includes("°F")) return celsius * 9 / 5 + 32;
    if (to.includes("K")) return celsius + 273.15;
    return val;
};

const UnitConverter = () => {
    const [catIdx, setCatIdx] = useState(0);
    const [fromIdx, setFromIdx] = useState(0);
    const [toIdx, setToIdx] = useState(1);
    const [input, setInput] = useState("");

    const cat = categories[catIdx];
    const isTemp = cat.name.includes("Temperature");

    const convert = () => {
        const val = parseFloat(input);
        if (isNaN(val)) return "";
        if (isTemp) return convertTemp(val, cat.units[fromIdx].label, cat.units[toIdx].label).toFixed(4);
        return (val * cat.units[fromIdx].toBase / cat.units[toIdx].toBase).toFixed(6).replace(/\.?0+$/, "");
    };

    const result = convert();

    const swap = () => { setFromIdx(toIdx); setToIdx(fromIdx); };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🔄</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Unit Converter</h1>
                <p className="text-muted-foreground font-bold">Convert Temperature, Length, Weight, Volume, Speed & Area</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((c, i) => (
                    <button key={i} onClick={() => { setCatIdx(i); setFromIdx(0); setToIdx(1); setInput(""); }}
                        className={`px-4 py-2 rounded-xl font-bold text-sm border-2 transition-colors ${catIdx === i ? "bg-comic-blue text-white border-comic-blue" : "bg-card border-border text-muted-foreground hover:border-comic-blue"}`}>
                        {c.name}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4">
                {/* From */}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">From</label>
                    <div className="flex gap-3">
                        <input type="number" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter value"
                            className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors text-lg" />
                        <select value={fromIdx} onChange={e => setFromIdx(Number(e.target.value))}
                            className="border-2 border-border rounded-xl px-3 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors">
                            {cat.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                    <button onClick={swap}
                        className="w-10 h-10 rounded-full bg-comic-blue text-white font-black text-lg hover:scale-110 transition-transform shadow-md">
                        ⇅
                    </button>
                </div>

                {/* To */}
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">To</label>
                    <div className="flex gap-3">
                        <div className={`flex-1 border-2 rounded-xl px-4 py-3 font-black text-lg ${result ? "bg-comic-blue/10 border-comic-blue text-comic-blue" : "bg-muted border-border text-muted-foreground"}`}>
                            {result || "0"}
                        </div>
                        <select value={toIdx} onChange={e => setToIdx(Number(e.target.value))}
                            className="border-2 border-border rounded-xl px-3 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors">
                            {cat.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Formula display */}
                {input && result && (
                    <div className="bg-muted rounded-xl p-3 text-center">
                        <p className="font-bold text-foreground text-sm">
                            {input} {cat.units[fromIdx].label} = <span className="text-comic-blue">{result} {cat.units[toIdx].label}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Quick refs for temperature */}
            {isTemp && (
                <div className="mt-4 bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border font-black text-foreground">🌡️ Common Temperatures</div>
                    <table className="w-full text-sm">
                        <thead><tr className="bg-muted"><th className="p-3 text-left font-bold">Temp</th><th className="p-3 text-center font-bold">°C</th><th className="p-3 text-center font-bold">°F</th><th className="p-3 text-center font-bold">K</th></tr></thead>
                        <tbody>
                            {[["Water Boils", 100, 212, 373.15], ["Body Temp", 37, 98.6, 310.15], ["Room Temp", 22, 71.6, 295.15], ["Water Freezes", 0, 32, 273.15], ["Absolute Zero", -273.15, -459.67, 0]].map(([name, c, f, k]) => (
                                <tr key={String(name)} className="border-t border-border hover:bg-muted/30">
                                    <td className="p-3 font-bold">{name}</td>
                                    <td className="p-3 text-center">{c}°C</td>
                                    <td className="p-3 text-center">{f}°F</td>
                                    <td className="p-3 text-center">{k}K</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
</div>
            )}

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default UnitConverter;
