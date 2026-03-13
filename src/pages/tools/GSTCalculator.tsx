import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";
import FAQSchema from "@/components/SEO/FAQSchema";

const GSTCalculator = () => {
    const [amount, setAmount] = useState("");
    const [gstRate, setGstRate] = useState("18");
    const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
    const [result, setResult] = useState<null | {
        baseAmount: number; gstAmount: number; totalAmount: number; cgst: number; sgst: number; igst: number;
    }>(null);

    const rates = ["0", "0.1", "0.25", "1", "1.5", "3", "5", "6", "7.5", "12", "18", "28"];

    const calculate = () => {
        const amt = parseFloat(amount);
        const rate = parseFloat(gstRate);
        if (!amt || isNaN(rate)) return;
        let base: number, gst: number, total: number;
        if (mode === "exclusive") {
            base = amt;
            gst = (amt * rate) / 100;
            total = amt + gst;
        } else {
            total = amt;
            base = (amt * 100) / (100 + rate);
            gst = total - base;
        }
        setResult({
            baseAmount: +base.toFixed(2),
            gstAmount: +gst.toFixed(2),
            totalAmount: +total.toFixed(2),
            cgst: +(gst / 2).toFixed(2),
            sgst: +(gst / 2).toFixed(2),
            igst: +gst.toFixed(2),
        });
    };

    const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🧾</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">GST Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate GST for any product or service instantly</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6">
                {(["exclusive", "inclusive"] as const).map((m) => (
                    <button key={m} onClick={() => { setMode(m); setResult(null); }}
                        className={`flex-1 py-3 font-bold text-sm transition-colors ${mode === m ? "bg-comic-orange text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                        {m === "exclusive" ? "➕ Exclusive (Add GST)" : "➖ Inclusive (Remove GST)"}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💵 {mode === "exclusive" ? "Original Amount (₹)" : "Amount With GST (₹)"}</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 1000"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📊 GST Rate (%)</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {rates.map(r => (
                            <button key={r} onClick={() => setGstRate(r)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors ${gstRate === r ? "bg-comic-orange text-white border-comic-orange" : "bg-muted border-border hover:bg-comic-orange/20"}`}>
                                {r}%
                            </button>
                        ))}
                    </div>
                    <input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} placeholder="Custom rate"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                </div>
                <button onClick={calculate}
                    className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    🧾 Calculate GST
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🏷️ Base Amount</div>
                            <div className="text-2xl font-black">{fmt(result.baseAmount)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-orange rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">📊 GST Amount ({gstRate}%)</div>
                            <div className="text-2xl font-black text-comic-orange">{fmt(result.gstAmount)}</div>
                        </div>
                        <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                            <div className="text-xs font-bold text-muted-foreground mb-1">🏆 Total Amount</div>
                            <div className="text-2xl font-black text-comic-green">{fmt(result.totalAmount)}</div>
                        </div>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">📋 GST Breakup</h3>
                        <div className="space-y-2 text-sm font-bold">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">CGST ({parseFloat(gstRate) / 2}%)</span>
                                <span>{fmt(result.cgst)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">SGST ({parseFloat(gstRate) / 2}%)</span>
                                <span>{fmt(result.sgst)}</span>
                            </div>
                            <div className="flex justify-between border-t-2 border-border pt-2">
                                <span className="text-muted-foreground">IGST ({gstRate}%) (Inter-state)</span>
                                <span>{fmt(result.igst)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">GST Calculator India — Free Online Tool</h2>
                <p>Our <strong>GST Calculator</strong> helps you quickly compute Goods and Services Tax for any product or service in India. Whether you want to add GST to a price (exclusive) or find the original price after removing GST (inclusive), this tool does it instantly.</p>
                <h3 className="text-xl font-bold mt-6 mb-3">How is GST calculated?</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>GST Exclusive:</strong> GST Amount = (Original Price × GST Rate) / 100</li>
                    <li><strong>GST Inclusive:</strong> Base Price = Total Price × 100 / (100 + GST Rate)</li>
                    <li>CGST & SGST are each half of the total GST (for within-state sales)</li>
                    <li>IGST equals the full GST rate (for inter-state sales)</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: gst calculator india, gst calculator online, calculate gst 18%, cgst sgst igst calculator, inclusive exclusive gst, gst on products, free gst tool 2024.</p>
            </div>

            <FAQSchema faqs={[
              { question: "What is GST?", answer: "GST (Goods and Services Tax) is a unified indirect tax in India that replaced multiple taxes like VAT, service tax, and excise. It is levied on the supply of goods and services." },
              { question: "How do I add GST to a price?", answer: "To add GST: GST Amount = (Original Price × GST Rate) / 100. Total = Original Price + GST Amount. Use our calculator in Exclusive mode for instant results." },
              { question: "What are the GST rates in India?", answer: "Common GST rates: 0%, 5%, 12%, 18%, 28%. Essential items like food grains are 0-5%, most goods are 12-18%, luxury items 28%." },
            ]} />

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <h3 className="col-span-2 sm:col-span-4 font-black text-lg text-foreground mb-1">Related Tools</h3>
              {[
                { name: "Income Tax Calculator", path: "/tools/income-tax", emoji: "💰" },
                { name: "EMI Calculator", path: "/tools/emi-calculator", emoji: "🏦" },
                { name: "Discount Calculator", path: "/tools/discount-calculator", emoji: "🏷️" },
                { name: "Profit & Loss", path: "/tools/profit-loss", emoji: "📊" },
              ].map((t) => (
                <Link key={t.path} to={t.path} className="comic-card p-3 flex items-center gap-2 hover:scale-[1.02] transition-transform text-sm font-bold">
                  <span>{t.emoji}</span>
                  <span className="text-foreground truncate">{t.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
                <AdBanner dataAdSlot="9274146632" dataAdFormat="auto" />
            </div>
        </div>
    );
};
export default GSTCalculator;
