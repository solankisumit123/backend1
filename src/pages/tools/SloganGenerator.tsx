import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const SloganGenerator = () => {
    const [brand, setBrand] = useState("");
    const [industry, setIndustry] = useState("");
    const [slogans, setSlogans] = useState<string[]>([]);
    const [copied, setCopied] = useState<number | null>(null);

    const templates = [
        `[BRAND] — Where [INDUSTRY] Meets Excellence`,
        `Think [INDUSTRY]. Think [BRAND].`,
        `Your [INDUSTRY] Partner — [BRAND]`,
        `[BRAND]: Redefining [INDUSTRY]`,
        `Better [INDUSTRY], Better Life. [BRAND].`,
        `Powered by Passion. Driven by [INDUSTRY]. That's [BRAND].`,
        `[BRAND] — Because You Deserve the Best [INDUSTRY]`,
        `[INDUSTRY] Made Simple. By [BRAND].`,
        `The Future of [INDUSTRY] Is [BRAND]`,
        `[BRAND]: [INDUSTRY] Without Boundaries`,
        `Elevate Your [INDUSTRY] with [BRAND]`,
        `[BRAND] — Trusted [INDUSTRY] Experts`,
        `Smart [INDUSTRY]. Smart Choice. [BRAND].`,
        `[BRAND]: Where Quality [INDUSTRY] Begins`,
        `For Those Who Demand More from [INDUSTRY] — [BRAND]`,
    ];

    const generate = () => {
        if (!brand.trim() || !industry.trim()) return;
        const b = brand.trim(), i = industry.trim();
        const generated = templates.map(t => t.replace(/\[BRAND\]/g, b).replace(/\[INDUSTRY\]/g, i));
        setSlogans(generated);
    };

    const copy = (s: string, idx: number) => {
        navigator.clipboard.writeText(s);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💬</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Slogan Generator</h1>
                <p className="text-muted-foreground font-bold">Create memorable slogans for your brand or business</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏢 Brand / Company Name</label>
                    <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. WebInsight Pro"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🏭 Industry / Service</label>
                    <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. SEO, fitness, food, design"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["SEO", "fitness", "digital marketing", "food", "tech"].map(i => (
                            <button key={i} onClick={() => setIndustry(i)} className="px-3 py-1 bg-muted hover:bg-comic-orange hover:text-white rounded-lg text-xs font-bold border border-border">{i}</button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-bold py-4 rounded-xl text-lg">
                    💬 Generate Slogans
                </button>
            </div>

            {slogans.length > 0 && (
                <div className="space-y-3">
                    {slogans.map((s, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 flex items-center justify-between hover:border-comic-orange transition-colors">
                            <p className="font-bold text-foreground italic flex-1">"{s}"</p>
                            <button onClick={() => copy(s, i)} className={`ml-3 px-3 py-1.5 shrink-0 rounded-xl text-sm font-bold ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                {copied === i ? "✅" : "Copy"}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="Slogan Generator - Free Business Tagline Creator" description="Generate memorable slogans and taglines for your brand or business. Create 15 unique slogan ideas instantly with our free slogan generator." keywords="slogan generator, tagline generator, business slogan, brand tagline creator, company slogan ideas" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Slogan Generator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Slogan Generator" subtitle="Create Taglines That Stick" description="A powerful slogan can define a brand for decades. Our generator creates 15 unique slogan variations by combining your brand name with proven tagline formulas." howToUse={["Enter your brand/company name", "Enter your industry or service", "Click Generate Slogans", "Browse 15 slogan options", "Copy your favorite tagline"]} features={["15 Unique Slogans", "Industry-Specific Templates", "One-Click Copy", "Quick Industry Presets", "Proven Tagline Formulas"]} faqs={[{ question: "What makes a great slogan?", answer: "Great slogans are memorable, concise, and communicate a key benefit. Famous examples: Nike's 'Just Do It', Apple's 'Think Different', McDonald's 'I'm Lovin' It'." }]} relatedTools={[{ name: "Brand Name Generator", emoji: "🏷️", path: "/tools/brand-name-generator" }, { name: "AI Headline Generator", emoji: "✏️", path: "/tools/headline-generator" }]} />
        </div>
    );
};
export default SloganGenerator;
