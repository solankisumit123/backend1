import { useState } from "react";
import { ArrowLeft, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";
import { generateNvidiaAI } from "@/lib/nvidiaAI";

const BrandNameGenerator = () => {
    const [keywords, setKeywords] = useState("");
    const [industry, setIndustry] = useState("startup");
    const [style, setStyle] = useState("modern");
    const [names, setNames] = useState<{ name: string, reason: string }[]>([]);
    const [copied, setCopied] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async () => {
        if (!keywords.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Generate exactly 5 highly unique, brandable, catching business/brand names for a company based on the keywords: "${keywords}".
            Industry/Niche: ${industry.toUpperCase()}
            Naming Style: ${style.toUpperCase()}
            
            Format requirements:
            - Return exactly 5 distinct brand names.
            - Format each as "BRAND_NAME ||| SHORT REASONING".
            - Do NOT number them.
            - Do not include conversational text or any explanations other than the format provided.
            - Ensure the names sound realistic, premium, or highly catchy based on the style.`;

            const systemPrompt = `You are a world-class naming agency consultant. Output exclusively the requested names formatted exactly as "BRAND_NAME ||| REASON" separated by newlines.`;

            const aiResponse = await generateNvidiaAI(prompt, systemPrompt);

            if (!aiResponse) throw new Error("Empty response from AI");

            const generatedNames = aiResponse
                .split("\n")
                .map((t: string) => t.trim())
                .filter((t: string) => t.includes("|||"))
                .map((t: string) => {
                    const [name, reason] = t.split("|||");
                    return { name: name.trim().replace(/^['"]|['"]$/g, ''), reason: reason.trim() };
                })
                .slice(0, 5);

            setNames(generatedNames);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to generate brand names. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const copy = (c: string, i: number) => {
        navigator.clipboard.writeText(c);
        setCopied(i);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏢</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Brand Name Generator</h1>
                <p className="text-muted-foreground font-bold">Generate unique, catchy business names using AI</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Describe Your Business / Core Keywords</label>
                    <input value={keywords} onChange={e => setKeywords(e.target.value)} onKeyDown={e => e.key === "Enter" && !isLoading && generate()}
                        placeholder="e.g. fast pizza delivery, eco-friendly clothing, AI analytics"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Industry</label>
                    <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue appearance-none">
                        <option value="startup">Tech Startup</option>
                        <option value="ecommerce">E-commerce / Retail</option>
                        <option value="agency">Agency / Consulting</option>
                        <option value="food">Food & Beverage</option>
                        <option value="health">Health & Beauty</option>
                        <option value="finance">Finance / Fintech</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">✨ Naming Style</label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: "modern", label: "Modern (e.g. Stripe, Robinhood)" },
                            { id: "classic", label: "Classic (e.g. Goldman Sachs, Ford)" },
                            { id: "playful", label: "Playful (e.g. Mailchimp, Squatty Potty)" },
                            { id: "compound", label: "Compound (e.g. WhatsApp, FaceBook)" }
                        ].map(f => (
                            <button key={f.id} onClick={() => setStyle(f.id)} className={`py-2 px-1 rounded-xl text-xs font-bold leading-relaxed ${style === f.id ? "bg-comic-blue text-white" : "bg-muted hover:bg-muted/80"}`}>{f.label}</button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} disabled={isLoading} className="w-full bg-comic-blue hover:bg-comic-blue/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg flex justify-center items-center">
                    {isLoading ? "⏳ Naming your brand..." : <><Wand2 className="w-5 h-5 mr-2" /> Generate Names</>}
                </button>
                {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}
            </div>

            {names.length > 0 && (
                <div className="space-y-4">
                    {names.map((item, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-5 hover:border-comic-blue transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-foreground font-black text-2xl tracking-tight">{item.name}</h3>
                                <button onClick={() => copy(item.name, i)} className={`px-4 py-2 shrink-0 rounded-xl text-sm font-bold ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                    {copied === i ? "✅ Copied" : "Copy Name"}
                                </button>
                            </div>
                            <p className="text-muted-foreground font-bold text-sm leading-relaxed">{item.reason}</p>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="Brand Name Generator - AI Business Naming Tool Free" description="Generate catchy, unique, and memorable brand names using Artificial Intelligence. Find the perfect name for your startup, e-commerce store, or agency." keywords="brand name generator, business name generator, ai naming tool, company name ideas, tech startup names" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "AI Brand Name Generator", "applicationCategory": "BusinessApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="AI Brand & Business Name Generator" subtitle="Find Your Perfect Identity" description="Naming a company is hard. Our AI Brand Name Generator takes your core offerings and creatively combines them to brainstorm premium, meaningful brand names within seconds." howToUse={["Enter keywords describing your business", "Select your industry", "Choose a naming style (Modern, Classic, Playful, Compound)", "Generate Names", "The AI explains the reasoning behind each generated name"]} features={["Real AI Brainstorming", "5 Unique Concepts Per Generation", "Name Psychological Reasoning", "Style Formatting", "Instant Result Generation"]} faqs={[{ question: "What makes a good brand name?", answer: "The best brand names are memorable, easy to spell, short (1-3 syllables), and convey an emotion or value related to your product." }]} relatedTools={[{ name: "Slogan Generator", emoji: "🗣️", path: "/tools/slogan-generator" }, { name: "Headline Generator", emoji: "✏️", path: "/tools/headline-generator" }]} />
        </div>
    );
};
export default BrandNameGenerator;
