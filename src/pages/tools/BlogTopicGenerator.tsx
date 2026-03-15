import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import { generateNvidiaAI } from "@/lib/nvidiaAI";

const BlogTopicGenerator = () => {
    const [keyword, setKeyword] = useState("");
    const [niche, setNiche] = useState("general");
    const [format, setFormat] = useState("how-to");
    const [topics, setTopics] = useState<string[]>([]);
    const [copied, setCopied] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async () => {
        if (!keyword.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Generate exactly 10 high-quality, highly engaging blog post topics/titles for the keyword: "${keyword}".
            Industry/Niche: ${niche.toUpperCase()}
            Format Preferred: ${format.toUpperCase()}
            
            Format requirements:
            - Provide exactly 10 distinct titles separated by "---TITLE---".
            - Do NOT number them, just output the raw title text separated by the delimiter.
            - Ensure they are SEO optimized.
            - Do not include conversational text or any explanations.`;

            const systemPrompt = `You are an elite SEO Content Strategist. Output exclusively the requested titles separated by ---TITLE---`;

            const aiResponse = await generateNvidiaAI(prompt, systemPrompt);

            if (!aiResponse) throw new Error("Empty response from AI");

            const generatedTopics = aiResponse
                .split("---TITLE---")
                .map((t: string) => t.replace(/^['"]|['"]$/g, '').trim())
                .filter((t: string) => t.length > 0)
                .slice(0, 10);

            setTopics(generatedTopics);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to generate blog topics. Please try again.";
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
                <div className="text-5xl mb-3">💡</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Blog Topic Generator</h1>
                <p className="text-muted-foreground font-bold">Generate highly engaging SEO blog post ideas powered by AI</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Target Keyword / Subject</label>
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === "Enter" && !isLoading && generate()}
                        placeholder="e.g. email marketing, vegan recipes, personal finance"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Industry / Niche</label>
                    <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue appearance-none">
                        <option value="general">General</option>
                        <option value="technology">Technology & SaaS</option>
                        <option value="business">Business & Marketing</option>
                        <option value="health">Health & Fitness</option>
                        <option value="finance">Finance & Investing</option>
                        <option value="lifestyle">Lifestyle & Travel</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📝 Preferred Format</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                            { id: "how-to", label: "How-To" },
                            { id: "listicle", label: "Listicle" },
                            { id: "guide", label: "Ultimate Guide" },
                            { id: "opinion", label: "Opinion / Review" }
                        ].map(f => (
                            <button key={f.id} onClick={() => setFormat(f.id)} className={`py-2 px-1 rounded-xl text-xs font-bold ${format === f.id ? "bg-comic-blue text-white" : "bg-muted hover:bg-muted/80"}`}>{f.label}</button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} disabled={isLoading} className="w-full bg-comic-blue hover:bg-comic-blue/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg flex justify-center items-center">
                    {isLoading ? "⏳ Generating Topics..." : "💡 Generate Topics"}
                </button>
                {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}
            </div>

            {topics.length > 0 && (
                <div className="space-y-3">
                    {topics.map((cap, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 flex justify-between items-center hover:border-comic-blue transition-colors">
                            <h3 className="text-foreground font-black text-lg pr-4">{cap}</h3>
                            <button onClick={() => copy(cap, i)} className={`px-4 py-2 shrink-0 rounded-xl text-sm font-bold ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                {copied === i ? "✅ Copied" : "Copy"}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="Blog Topic Generator - SEO Blog Ideas Free AI" description="Generate endless blog topic ideas for your niche using artificial intelligence. Find SEO friendly listicles, guides, and how-tos instantly." keywords="blog topic generator, ai blog ideas, seo blog title generator, blog idea maker, content marketing tools" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "AI Blog Topic Generator", "applicationCategory": "WritingApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="AI Blog Topic Generator" subtitle="Never Run Out of Content Ideas" description="Struggling with writer's block? Our AI blog topic generator creates highly engaging, SEO-optimized blog titles for any industry." howToUse={["Enter your target keyword or subject", "Select your industry for context", "Pick the blog post format you prefer", "Click Generate Topics", "Browse 10 unique AI-generated ideas"]} features={["Real AI Generation", "Targeted by Niche", "Format Selection", "SEO Optimized Concepts", "Instantly Copiable"]} faqs={[{ question: "How does the AI create blog topics?", answer: "The AI understands proven content marketing frameworks and analyzes your keyword against successful article patterns like listicles or ultimate guides." }]} relatedTools={[{ name: "Headline Generator", emoji: "✏️", path: "/tools/headline-generator" }, { name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }]} />
        </div>
    );
};
export default BlogTopicGenerator;
