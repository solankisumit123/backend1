import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfitLossCalculator = () => {
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [result, setResult] = useState<null | {
        profitLoss: number; isProfit: boolean; pct: number; totalCost: number; totalRevenue: number; markup: number; margin: number;
    }>(null);

    const calculate = () => {
        const cp = parseFloat(costPrice) || 0;
        const sp = parseFloat(sellingPrice) || 0;
        const qty = parseFloat(quantity) || 1;
        if (!cp || !sp) return;
        const totalCost = cp * qty;
        const totalRevenue = sp * qty;
        const diff = totalRevenue - totalCost;
        const pct = (Math.abs(diff) / totalCost) * 100;
        const markup = ((sp - cp) / cp) * 100;
        const margin = ((sp - cp) / sp) * 100;
        setResult({
            profitLoss: +Math.abs(diff).toFixed(2),
            isProfit: diff >= 0,
            pct: +pct.toFixed(2),
            totalCost: +totalCost.toFixed(2),
            totalRevenue: +totalRevenue.toFixed(2),
            markup: +markup.toFixed(2),
            margin: +margin.toFixed(2),
        });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📊</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Profit & Loss Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate profit, loss, markup & profit margin</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💵 Cost Price (₹) — per unit</label>
                    <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} placeholder="e.g. 500"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏷️ Selling Price (₹) — per unit</label>
                    <input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} placeholder="e.g. 750"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📦 Quantity (units)</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="e.g. 10" min="1"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-purple hover:bg-comic-purple/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    📊 Calculate
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className={`bg-card border-4 rounded-2xl p-6 text-center ${result.isProfit ? "border-comic-green" : "border-comic-red"}`}>
                        <p className="text-sm font-bold text-muted-foreground mb-1">{result.isProfit ? "✅ Total Profit" : "❌ Total Loss"}</p>
                        <div className={`text-5xl font-black ${result.isProfit ? "text-comic-green" : "text-comic-red"}`}>{fmt(result.profitLoss)}</div>
                        <div className="text-lg font-bold text-muted-foreground mt-1">({result.pct}% {result.isProfit ? "profit" : "loss"})</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💰 Total Cost</div>
                            <div className="text-xl font-black">{fmt(result.totalCost)}</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">💵 Total Revenue</div>
                            <div className="text-xl font-black">{fmt(result.totalRevenue)}</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📈 Markup %</div>
                            <div className={`text-xl font-black ${result.markup >= 0 ? "text-comic-green" : "text-comic-red"}`}>{result.markup}%</div>
                        </div>
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📊 Profit Margin %</div>
                            <div className={`text-xl font-black ${result.margin >= 0 ? "text-comic-green" : "text-comic-red"}`}>{result.margin}%</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Profit & Loss Calculator — For Business Owners</h2>
                <p>Our <strong>Profit and Loss Calculator</strong> instantly calculates your net profit or loss, profit percentage, markup, and profit margin based on cost price and selling price. Essential for traders, shopkeepers, and small business owners.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Key Terms</h3>
                <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Profit %</strong> = (SP – CP) / CP × 100</li>
                    <li><strong>Loss %</strong> = (CP – SP) / CP × 100</li>
                    <li><strong>Markup</strong> = (SP – CP) / CP × 100</li>
                    <li><strong>Profit Margin</strong> = (SP – CP) / SP × 100</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: profit loss calculator, profit percentage calculator, markup calculator, profit margin calculator, business calculator india, cp sp formula.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default ProfitLossCalculator;
