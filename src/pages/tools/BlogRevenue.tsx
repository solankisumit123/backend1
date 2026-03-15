import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogRevenue = () => {
    const [traffic, setTraffic] = useState(50000);
    const [adsEnabled, setAdsEnabled] = useState(true);
    const [affiliateLinks, setAffiliateLinks] = useState(10);
    const [digitalProducts, setDigitalProducts] = useState(0);
    const [productPrice, setProductPrice] = useState(29);
    const [emailSubs, setEmailSubs] = useState(5000);

    const adRevenue = adsEnabled ? (traffic / 1000) * 3.5 : 0;
    const affRevenue = affiliateLinks * (traffic / 1000) * 0.8;
    const productRevenue = digitalProducts * productPrice * 0.02 * traffic / 1000;
    const sponsorRevenue = traffic > 50000 ? Math.floor(traffic / 25000) * 200 : 0;
    const emailRevenue = emailSubs * 0.05 * productPrice * 0.1;
    const total = adRevenue + affRevenue + productRevenue + sponsorRevenue + emailRevenue;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">✍️ Blog Revenue Calculator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Monthly Traffic</label>
                    <input type="number" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} min={0} step={1000} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Affiliate Links</label>
                    <input type="number" value={affiliateLinks} onChange={(e) => setAffiliateLinks(Number(e.target.value))} min={0} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Digital Products</label>
                    <input type="number" value={digitalProducts} onChange={(e) => setDigitalProducts(Number(e.target.value))} min={0} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Product Price ($)</label>
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} min={0} step={1} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Email Subscribers</label>
                    <input type="number" value={emailSubs} onChange={(e) => setEmailSubs(Number(e.target.value))} min={0} step={100} className="comic-input" />
                </div>
                <div className="flex items-end">
                    <label className="flex items-center gap-3 comic-input cursor-pointer">
                        <input type="checkbox" checked={adsEnabled} onChange={(e) => setAdsEnabled(e.target.checked)} className="w-5 h-5" />
                        <span className="font-bold text-foreground">Ads Enabled</span>
                    </label>
                </div>
            </div>

            <div className="comic-card text-center mb-6 overflow-hidden">
                <p className="text-sm text-muted-foreground font-bold uppercase">Total Monthly Revenue</p>
                <p className="comic-score text-comic-green">${total.toFixed(2)}</p>
                <p className="text-muted-foreground font-bold">≈ ${(total * 12).toFixed(0)}/year</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                    { label: "Ad Revenue", value: adRevenue, icon: "📰" },
                    { label: "Affiliate", value: affRevenue, icon: "🔗" },
                    { label: "Products", value: productRevenue, icon: "📦" },
                    { label: "Sponsors", value: sponsorRevenue, icon: "🤝" },
                    { label: "Email Sales", value: emailRevenue, icon: "📧" },
                ].map((r) => (
                    <div key={r.label} className="comic-card text-center py-4">
                        <p className="text-lg">{r.icon}</p>
                        <p className="comic-heading text-xl text-foreground">${r.value.toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground font-bold uppercase">{r.label}</p>
                    </div>
                ))}
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default BlogRevenue;
