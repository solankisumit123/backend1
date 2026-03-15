import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AffiliateEarnings = () => {
    const [traffic, setTraffic] = useState(50000);
    const [ctr, setCtr] = useState(3);
    const [conversionRate, setConversionRate] = useState(2);
    const [avgCommission, setAvgCommission] = useState(25);
    const [numProducts, setNumProducts] = useState(5);

    const clicks = traffic * (ctr / 100);
    const conversions = clicks * (conversionRate / 100);
    const monthly = conversions * avgCommission;
    const perClick = clicks > 0 ? monthly / clicks : 0;
    const yearly = monthly * 12;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">💸 Affiliate Earnings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                    { label: "Monthly Page Views", value: traffic, set: setTraffic, min: 0, max: 10000000, step: 1000 },
                    { label: "Click-through Rate (%)", value: ctr, set: setCtr, min: 0, max: 100, step: 0.5 },
                    { label: "Conversion Rate (%)", value: conversionRate, set: setConversionRate, min: 0, max: 100, step: 0.5 },
                    { label: "Avg Commission ($)", value: avgCommission, set: setAvgCommission, min: 0, max: 1000, step: 1 },
                    { label: "Number of Products", value: numProducts, set: setNumProducts, min: 1, max: 100, step: 1 },
                ].map((f) => (
                    <div key={f.label}>
                        <label className="font-bold text-foreground text-sm uppercase block mb-1">{f.label}</label>
                        <input type="number" value={f.value} onChange={(e) => f.set(Number(e.target.value))} min={f.min} max={f.max} step={f.step} className="comic-input" />
                    </div>
                ))}
            </div>

            <div className="comic-card text-center mb-6 overflow-hidden">
                <p className="text-sm text-muted-foreground font-bold uppercase">Monthly Affiliate Revenue</p>
                <p className="comic-score text-comic-green">${monthly.toFixed(2)}</p>
                <p className="text-muted-foreground font-bold">≈ ${yearly.toFixed(0)}/year</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Clicks", value: Math.floor(clicks).toLocaleString() },
                    { label: "Conversions", value: Math.floor(conversions).toLocaleString() },
                    { label: "EPC", value: `$${perClick.toFixed(2)}` },
                    { label: "Per Product", value: `$${(monthly / numProducts).toFixed(2)}` },
                ].map((s) => (
                    <div key={s.label} className="comic-card text-center py-4">
                        <p className="comic-heading text-2xl text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground font-bold uppercase">{s.label}</p>
                    </div>
                ))}
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default AffiliateEarnings;
