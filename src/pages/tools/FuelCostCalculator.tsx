import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const FuelCostCalculator = () => {
    const [distance, setDistance] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuelPrice, setFuelPrice] = useState("");
    const [result, setResult] = useState<null | { fuelNeeded: number; cost: number; perKm: number }>(null);

    const calculate = () => {
        const d = parseFloat(distance), m = parseFloat(mileage), p = parseFloat(fuelPrice);
        if (!d || !m || !p) return;
        const fuelNeeded = d / m;
        const cost = fuelNeeded * p;
        const perKm = cost / d;
        setResult({ fuelNeeded: parseFloat(fuelNeeded.toFixed(2)), cost: parseFloat(cost.toFixed(2)), perKm: parseFloat(perKm.toFixed(2)) });
    };

    const presets = [
        { label: "Mumbai → Delhi", dist: "1421", avg: "15" },
        { label: "Bangalore → Chennai", dist: "346", avg: "18" },
        { label: "Delhi → Jaipur", dist: "282", avg: "20" },
        { label: "City Commute (Monthly)", dist: "1200", avg: "15" },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⛽</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Fuel Cost Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate fuel cost for any trip or monthly commute</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🗺️ Distance (km)</label>
                    <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 500"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🚗 Mileage (km/litre)</label>
                    <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g. 15"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {[["City Car", "12"], ["SUV", "10"], ["Highway", "18"], ["Bike", "40"]].map(([l, v]) => (
                            <button key={l} onClick={() => setMileage(v)} className="px-3 py-1 bg-muted hover:bg-comic-orange hover:text-white rounded-lg text-xs font-bold">{l} ({v}km/L)</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💰 Fuel Price (₹/litre)</label>
                    <input type="number" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} placeholder="e.g. 103"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    <div className="flex gap-2 mt-2">
                        {[["Petrol", "103"], ["Diesel", "89"], ["CNG", "75"]].map(([l, v]) => (
                            <button key={l} onClick={() => setFuelPrice(v)} className="px-3 py-1 bg-muted hover:bg-comic-orange hover:text-white rounded-lg text-xs font-bold">{l} (₹{v})</button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-sm font-bold text-muted-foreground mb-2">⚡ Quick Trips</p>
                    <div className="flex flex-wrap gap-2">
                        {presets.map(p => (
                            <button key={p.label} onClick={() => { setDistance(p.dist); setMileage(p.avg); }}
                                className="px-3 py-1.5 bg-muted hover:bg-comic-blue hover:text-white rounded-xl text-xs font-bold border border-border">{p.label}</button>
                        ))}
                    </div>
                </div>

                <button onClick={calculate} className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-bold py-4 rounded-xl text-lg">
                    ⛽ Calculate Fuel Cost
                </button>
            </div>

            {result && (
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "⛽ Fuel Needed", val: `${result.fuelNeeded} L`, color: "border-comic-orange" },
                        { label: "💰 Total Cost", val: `₹${result.cost.toLocaleString("en-IN")}`, color: "border-comic-red" },
                        { label: "📍 Cost/km", val: `₹${result.perKm}`, color: "border-comic-green" },
                    ].map(({ label, val, color }) => (
                        <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                            <div className="text-xs font-bold text-muted-foreground mb-1">{label}</div>
                            <div className="text-xl font-black text-foreground">{val}</div>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="Fuel Cost Calculator - Trip Fuel Expense Calculator" description="Calculate fuel cost for any trip or monthly commute. Enter distance, mileage, and fuel price to get exact travel expense in seconds." keywords="fuel cost calculator, petrol cost calculator, trip fuel calculator, travel expense calculator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Fuel Cost Calculator", "applicationCategory": "UtilityApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Fuel Cost Calculator" subtitle="Plan Your Travel Budget" description="Calculate exactly how much fuel you'll need and how much it will cost for any journey. Supports petrol, diesel, and CNG with real-world vehicle presets." howToUse={["Enter trip distance in km", "Set your vehicle's mileage", "Enter current fuel price", "Or use quick trip presets", "Click Calculate Fuel Cost"]} features={["Distance Input", "Mileage Presets for Cars & Bikes", "Fuel Type Presets", "Cost Per Km", "Indian City Trip Presets"]} faqs={[{ question: "How to improve car mileage?", answer: "Maintain proper tyre pressure, avoid rapid acceleration, service engine regularly, and use cruise control on highways to improve fuel efficiency." }]} relatedTools={[{ name: "EMI Calculator", emoji: "💰", path: "/tools/emi-calculator" }, { name: "Unit Converter", emoji: "🔄", path: "/tools/unit-converter" }]} />
        </div>
    );
};
export default FuelCostCalculator;
