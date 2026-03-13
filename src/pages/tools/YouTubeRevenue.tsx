import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdBanner from "../../components/AdBanner";

const YouTubeRevenue = () => {
    const [views, setViews] = useState(100000);
    const [niche, setNiche] = useState("entertainment");
    const [engagement, setEngagement] = useState(5);
    const [sponsors, setSponsors] = useState(0);

    const nicheCPM: Record<string, number> = {
        entertainment: 3, gaming: 4, technology: 7, finance: 12, education: 5,
        beauty: 4, fitness: 5, cooking: 3, vlog: 2, music: 1.5,
    };

    const cpm = nicheCPM[niche] || 3;
    const adRevenue = (views / 1000) * cpm * 0.55; // YouTube takes 45%
    const sponsorRevenue = sponsors * (views > 100000 ? 2000 : views > 10000 ? 500 : 100);
    const membershipEstimate = views * (engagement / 100) * 0.01 * 4.99;
    const superChatEstimate = views * (engagement / 100) * 0.005 * 2;
    const totalMonthly = adRevenue + sponsorRevenue + membershipEstimate + superChatEstimate;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🎬 YouTube Revenue</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Monthly Views</label>
                    <input type="number" value={views} onChange={(e) => setViews(Number(e.target.value))} min={0} step={1000} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Niche</label>
                    <select value={niche} onChange={(e) => setNiche(e.target.value)} className="comic-input">
                        {Object.keys(nicheCPM).map((n) => <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>)}
                    </select>
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Engagement Rate (%)</label>
                    <input type="number" value={engagement} onChange={(e) => setEngagement(Number(e.target.value))} min={0} max={100} step={0.5} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Sponsor Deals / Month</label>
                    <input type="number" value={sponsors} onChange={(e) => setSponsors(Number(e.target.value))} min={0} max={20} className="comic-input" />
                </div>
            </div>

            <div className="comic-card text-center mb-6 overflow-hidden">
                <p className="text-sm text-muted-foreground font-bold uppercase">Total Monthly Revenue</p>
                <p className="comic-score text-comic-green">${totalMonthly.toFixed(2)}</p>
                <p className="text-muted-foreground font-bold">≈ ${(totalMonthly * 12).toFixed(0)}/year</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Ad Revenue", value: adRevenue, icon: "📺" },
                    { label: "Sponsors", value: sponsorRevenue, icon: "🤝" },
                    { label: "Memberships", value: membershipEstimate, icon: "⭐" },
                    { label: "Super Chats", value: superChatEstimate, icon: "💬" },
                ].map((r) => (
                    <div key={r.label} className="comic-card text-center py-4">
                        <p className="text-lg">{r.icon}</p>
                        <p className="comic-heading text-xl text-foreground">${r.value.toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground font-bold uppercase">{r.label}</p>
                    </div>
                ))}
</div>

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3820454060" dataAdFormat="auto" />
      <AdBanner dataAdSlot="3820454060" dataAdFormat="rectangle" />

        </div>
    );
};

export default YouTubeRevenue;
