import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const DiscountCalculator = () => {
    const [mode, setMode] = useState<"pct" | "flat" | "findPct">("pct");
    const [original, setOriginal] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const [result, setResult] = useState<null | { saved: number; final: number; pct: number; original: number }>(null);

    const calculate = () => {
        const orig = parseFloat(original) || 0;
        const disc = parseFloat(discount) || 0;
        const fin = parseFloat(finalPrice) || 0;
        if (mode === "pct") {
            if (!orig || !disc) return;
            const saved = (orig * disc) / 100;
            setResult({ saved: +saved.toFixed(2), final: +(orig - saved).toFixed(2), pct: disc, original: orig });
        } else if (mode === "flat") {
            if (!orig || !disc) return;
            const pct = (disc / orig) * 100;
            setResult({ saved: disc, final: +(orig - disc).toFixed(2), pct: +pct.toFixed(2), original: orig });
        } else {
            if (!orig || !fin) return;
            const saved = orig - fin;
            const pct = (saved / orig) * 100;
            setResult({ saved: +saved.toFixed(2), final: fin, pct: +pct.toFixed(2), original: orig });
        }
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });
    const quickDiscounts = ["5", "10", "15", "20", "25", "30", "40", "50", "60", "70"];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏷️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Discount Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate discounts, savings & final prices instantly</p>
            </div>

            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6">
                {([["pct", "% Off"], ["flat", "Flat Off"], ["findPct", "Find Discount %"]] as const).map(([m, l]) => (
                    <button key={m} onClick={() => { setMode(m); setResult(null); }}
                        className={`flex-1 py-3 font-bold text-xs transition-colors ${mode === m ? "bg-comic-red text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                        {l}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏷️ Original Price (₹)</label>
                    <input type="number" value={original} onChange={e => setOriginal(e.target.value)} placeholder="e.g. 2000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red text-lg" />
                </div>

                {mode !== "findPct" ? (
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                            {mode === "pct" ? "📊 Discount (%)" : "💵 Flat Discount Amount (₹)"}
                        </label>
                        {mode === "pct" && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {quickDiscounts.map(d => (
                                    <button key={d} onClick={() => setDiscount(d)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors ${discount === d ? "bg-comic-red text-white border-comic-red" : "bg-muted border-border hover:bg-comic-red/20"}`}>
                                        {d}%
                                    </button>
                                ))}
                            </div>
                        )}
                        <input type="number" value={discount} onChange={e => setDiscount(e.target.value)}
                            placeholder={mode === "pct" ? "e.g. 20" : "e.g. 300"}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💰 Final / Sale Price (₹)</label>
                        <input type="number" value={finalPrice} onChange={e => setFinalPrice(e.target.value)} placeholder="e.g. 1500"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                    </div>
                )}

                <button onClick={calculate}
                    className="w-full bg-comic-red hover:bg-comic-red/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🏷️ Calculate Discount
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-red rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">💰 You Save</p>
                        <div className="text-5xl font-black text-comic-red">{fmt(result.saved)}</div>
                        <div className="text-lg font-black text-muted-foreground mt-1">({result.pct}% off)</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🏷️ Original Price</div>
                            <div className="text-2xl font-black line-through text-muted-foreground">{fmt(result.original)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">✅ Final Price</div>
                            <div className="text-2xl font-black text-comic-green">{fmt(result.final)}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Discount Calculator — How Much Do You Save?</h2>
                <p>Our free <strong>Discount Calculator</strong> helps you instantly find out how much you save on any purchase. Whether it's a <strong>10% off sale</strong>, flat ₹500 discount, or you want to find what percentage off you got — this tool handles it all.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: discount calculator, percentage off calculator, sale price calculator, how much do I save, calculate discount online, shopping discount india.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default DiscountCalculator;
