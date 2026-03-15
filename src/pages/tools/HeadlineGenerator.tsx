import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import { generateNvidiaAI } from "@/lib/nvidiaAI";

const HeadlineGenerator = () => {
    const [topic, setTopic] = useState("");
    const [number, setNumber] = useState("10");
    const [headlines, setHeadlines] = useState<string[]>([]);
    const [copied, setCopied] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Generate exactly ${number} highly engaging, click-worthy, and SEO-optimized headlines for a blog post or social media post about "${topic}".
            Return ONLY the headlines, numbered 1 to ${number}, with each falling on a new line. Do not include quotes or any conversational text. Keep them high impact and concise.`;

            const aiResponse = await generateNvidiaAI(prompt, "You are an expert copywriter and SEO professional specializing in writing highly engaging headlines.");

            const generatedHeadlines = aiResponse
                .split('\n')
                .filter((line: string) => line.trim().length > 0)
                .map((line: string) => line.replace(/^\d+[.)]\s*/, '').replace(/^["']|["']$/g, '').trim())
                .filter((line: string) => line.length > 0);

            setHeadlines(generatedHeadlines);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to generate headlines. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const copy = (s: string, i: number) => {
        navigator.clipboard.writeText(s);
        setCopied(i);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">✏️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">AI Headline Generator</h1>
                <p className="text-muted-foreground font-bold">Create click-worthy headlines for blogs & social media</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Topic / Keyword</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && !isLoading && generate()}
                        placeholder="e.g. SEO, weight loss, Python programming"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🔢 Number (for listicles)</label>
                    <div className="flex gap-2">
                        {["5", "7", "10", "15", "20"].map(n => (
                            <button key={n} onClick={() => setNumber(n)} className={`flex-1 py-2 rounded-xl font-bold text-sm ${number === n ? "bg-comic-blue text-white" : "bg-muted hover:bg-muted/80"}`}>{n}</button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} disabled={isLoading} className="w-full bg-comic-blue hover:bg-comic-blue/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg flex justify-center items-center">
                    {isLoading ? "⏳ Generating..." : "✏️ Generate Headlines"}
                </button>
                {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
            </div>

            {headlines.length > 0 && (
                <div className="space-y-3">
                    {headlines.map((h, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 flex items-center justify-between hover:border-comic-blue transition-colors">
                            <p className="font-bold text-foreground flex-1">{h}</p>
                            <div className="flex items-center gap-2 ml-3">
                                <span className={`text-xs font-bold ${h.length <= 60 ? "text-green-500" : h.length <= 80 ? "text-yellow-500" : "text-red-500"}`}>{h.length}c</span>
                                <button onClick={() => copy(h, i)} className={`px-3 py-1.5 shrink-0 rounded-xl text-sm font-bold ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                    {copied === i ? "✅" : "Copy"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="AI Headline Generator - Blog Title Generator Free" description="Generate click-worthy blog headlines and titles for any topic. Create 15 unique headline ideas with proven copywriting formulas." keywords="headline generator, blog title generator, ai headline generator, title ideas, content headline creator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "AI Headline Generator", "applicationCategory": "WritingApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="AI Headline Generator" subtitle="Headlines That Get Clicks" description="Great headlines can increase click-through rates by 500%. Our AI headline generator uses real-time AI to create custom titles that people can't resist clicking." howToUse={["Enter your blog topic", "Choose a list number (5, 7, 10, 15, 20)", "Click Generate Headlines", "Wait for AI to write fresh headlines", "Copy the best one"]} features={["Real-time AI Generation", "Character Count Display", "Expert Copywriting Patterns", "Custom Outputs", "Unlimited Use"]} faqs={[{ question: "What makes a headline click-worthy?", answer: "The best headlines promise a benefit, create curiosity, use numbers, or address a pain point. Include your target keyword early in the headline for SEO." }]} relatedTools={[{ name: "Meta Title Generator", emoji: "📝", path: "/tools/meta-title-generator" }, { name: "Blog Topic Generator", emoji: "💡", path: "/tools/blog-topic-generator" }]} />
        </div>
    );
};
export default HeadlineGenerator;
