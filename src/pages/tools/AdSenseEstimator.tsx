import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdSenseEstimator = () => {
    const [pageViews, setPageViews] = useState(100000);
    const [niche, setNiche] = useState("general");
    const [region, setRegion] = useState("us");

    const nicheCPM: Record<string, number> = {
        general: 2.5, technology: 5, finance: 12, health: 8, education: 4,
        travel: 3.5, food: 2, gaming: 3, legal: 15, insurance: 18,
    };

    const regionMultiplier: Record<string, number> = {
        us: 1, uk: 0.9, eu: 0.85, asia: 0.4, latam: 0.3, africa: 0.2, global: 0.6,
    };

    const cpm = nicheCPM[niche] || 2.5;
    const multiplier = regionMultiplier[region] || 0.6;
    const effectiveCPM = cpm * multiplier;
    const daily = (pageViews / 30 / 1000) * effectiveCPM;
    const monthly = daily * 30;
    const yearly = monthly * 12;
    const rpm = effectiveCPM * 0.68; // Google takes ~32%

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">💵 AdSense Estimator</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Monthly Page Views</label>
                    <input type="number" value={pageViews} onChange={(e) => setPageViews(Number(e.target.value))} min={0} step={1000} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Niche</label>
                    <select value={niche} onChange={(e) => setNiche(e.target.value)} className="comic-input">
                        {Object.keys(nicheCPM).map((n) => (
                            <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Audience Region</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="comic-input">
                        {Object.entries({ us: "United States", uk: "United Kingdom", eu: "Europe", asia: "Asia", latam: "Latin America", africa: "Africa", global: "Global Mix" }).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {[
                    { label: "Daily Earnings", value: `$${daily.toFixed(2)}` },
                    { label: "Monthly Earnings", value: `$${monthly.toFixed(2)}` },
                    { label: "Yearly Earnings", value: `$${yearly.toFixed(2)}` },
                ].map((r) => (
                    <div key={r.label} className="comic-card text-center overflow-hidden px-3">
                        <p className="text-xs text-muted-foreground font-bold uppercase">{r.label}</p>
                        <p className="comic-score text-comic-green">{r.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Effective CPM", value: `$${effectiveCPM.toFixed(2)}` },
                    { label: "Page RPM", value: `$${rpm.toFixed(2)}` },
                ].map((r) => (
                    <div key={r.label} className="comic-card text-center py-4">
                        <p className="comic-heading text-2xl text-foreground">{r.value}</p>
                        <p className="text-xs text-muted-foreground font-bold uppercase">{r.label}</p>
                    </div>
                ))}
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default AdSenseEstimator;
