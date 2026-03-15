import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PercentageCalculator = () => {
    const [tab, setTab] = useState(0);
    const [a, setA] = useState(""); const [b, setB] = useState(""); const [c, setC] = useState("");
    const [res, setRes] = useState<string | null>(null);

    const calc = () => {
        const va = parseFloat(a), vb = parseFloat(b), vc = parseFloat(c);
        let answer = "";
        if (tab === 0 && !isNaN(va) && !isNaN(vb)) answer = ((va / 100) * vb).toFixed(2);
        else if (tab === 1 && !isNaN(va) && !isNaN(vb)) answer = ((va / vb) * 100).toFixed(2) + "%";
        else if (tab === 2 && !isNaN(va) && !isNaN(vb)) answer = (((vb - va) / va) * 100).toFixed(2) + "%";
        else if (tab === 3 && !isNaN(va) && !isNaN(vb)) answer = (va + (va * vb / 100)).toFixed(2);
        else if (tab === 4 && !isNaN(va) && !isNaN(vb)) answer = (va - (va * vb / 100)).toFixed(2);
        else if (tab === 5 && !isNaN(va) && !isNaN(vb) && !isNaN(vc)) answer = ((vc / (va * vb / 100)) * 100).toFixed(2) + "%";
        setRes(answer || null);
    };

    const tabs = [
        { label: "X% of Y", desc: "What is {a}% of {b}?", fields: ["Percentage (%)", "Of Number"] },
        { label: "X is what % of Y", desc: "{a} is what % of {b}?", fields: ["Value (X)", "Total (Y)"] },
        { label: "% Change", desc: "% change from {a} to {b}?", fields: ["Original Value", "New Value"] },
        { label: "% Increase", desc: "Increase {a} by {b}%", fields: ["Original Value", "Increase by (%)"] },
        { label: "% Decrease", desc: "Decrease {a} by {b}%", fields: ["Original Value", "Decrease by (%)"] },
        { label: "Discount", desc: "What % off did you get?", fields: ["Original Price", "Discount (%)", "Paid Amount"] },
    ];

    const cur = tabs[tab];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📊</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Percentage Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate percentages, discounts, increases & changes easily</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((t, i) => (
                    <button key={i} onClick={() => { setTab(i); setA(""); setB(""); setC(""); setRes(null); }}
                        className={`px-4 py-2 rounded-xl font-bold text-sm border-2 transition-colors ${tab === i ? "bg-comic-purple text-white border-comic-purple" : "bg-card border-border text-muted-foreground hover:border-comic-purple"}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4">
                <p className="text-sm font-bold text-muted-foreground">{cur.desc.replace("{a}", a || "A").replace("{b}", b || "B")}</p>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">{cur.fields[0]}</label>
                    <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="Enter value"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple transition-colors text-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">{cur.fields[1]}</label>
                    <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="Enter value"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple transition-colors text-lg" />
                </div>
                {cur.fields[2] && (
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">{cur.fields[2]}</label>
                        <input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="Enter value"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple transition-colors text-lg" />
                    </div>
                )}

                <button onClick={calc}
                    className="w-full bg-comic-purple hover:bg-comic-purple/90 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md">
                    📊 Calculate
                </button>

                {res !== null && (
                    <div className="bg-comic-purple/10 border-4 border-comic-purple rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-2">Result</p>
                        <div className="text-4xl font-black text-comic-purple">{res}</div>
                    </div>
                )}
            </div>

            {/* Examples */}
            <div className="mt-6 bg-card border-4 border-border rounded-2xl p-5">
                <h3 className="font-black text-foreground mb-3">📚 Everyday Examples</h3>
                <div className="space-y-2 text-sm">
                    {[
                        ["🛍️ Sale", "Product ₹1000, 20% off → Save ₹200, Pay ₹800"],
                        ["📈 Salary", "Salary ₹50,000, 10% hike → New salary ₹55,000"],
                        ["📉 GST", "Item ₹500 + 18% GST → Total ₹590"],
                        ["🎓 Marks", "Got 450/600 → 75% marks"],
                    ].map(([icon, text]) => (
                        <div key={String(icon)} className="flex gap-2">
                            <span className="shrink-0">{icon}</span>
                            <span className="text-muted-foreground font-bold">{text}</span>
                        </div>
                    ))}
                </div>
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default PercentageCalculator;
