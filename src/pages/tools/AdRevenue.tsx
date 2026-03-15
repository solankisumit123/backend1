import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdRevenue = () => {
  const [pageViews, setPageViews] = useState(50000);
  const [cpm, setCpm] = useState(5);
  const [cpc, setCpc] = useState(0.5);
  const [ctr, setCtr] = useState(2);

  const dailyImpressions = pageViews / 30;
  const dailyCPM = (dailyImpressions / 1000) * cpm;
  const dailyCPC = dailyImpressions * (ctr / 100) * cpc;
  const dailyTotal = dailyCPM + dailyCPC;
  const monthly = dailyTotal * 30;
  const yearly = monthly * 12;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">💰 Ad Revenue Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { label: "Monthly Page Views", value: pageViews, set: setPageViews, min: 0, max: 10000000, step: 1000 },
          { label: "CPM ($)", value: cpm, set: setCpm, min: 0, max: 50, step: 0.5 },
          { label: "CPC ($)", value: cpc, set: setCpc, min: 0, max: 10, step: 0.1 },
          { label: "CTR (%)", value: ctr, set: setCtr, min: 0, max: 20, step: 0.5 },
        ].map((f) => (
          <div key={f.label}>
            <label className="font-bold text-foreground text-sm uppercase block mb-1">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={(e) => f.set(Number(e.target.value))}
              min={f.min}
              max={f.max}
              step={f.step}
              className="comic-input"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Daily Earnings", value: dailyTotal },
          { label: "Monthly Earnings", value: monthly },
          { label: "Yearly Earnings", value: yearly },
        ].map((r) => (
          <div key={r.label} className="comic-card text-center overflow-hidden px-3">
            <p className="text-xs text-muted-foreground font-bold uppercase">{r.label}</p>
            <p className="comic-score text-comic-green">${r.value.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* ── AD BANNERS ── */}
      
      

    </div>
  );
};

export default AdRevenue;
