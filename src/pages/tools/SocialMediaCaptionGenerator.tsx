import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";
import { generateNvidiaAI } from "@/lib/nvidiaAI";

const SocialMediaCaptionGenerator = () => {
    const [topic, setTopic] = useState("");
    const [platform, setPlatform] = useState("instagram");
    const [tone, setTone] = useState("engaging");
    const [captions, setCaptions] = useState<string[]>([]);
    const [copied, setCopied] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Write 5 highly engaging social media captions for a post about "${topic}".
            Platform: ${platform.toUpperCase()}
            Tone: ${tone.toUpperCase()}
            
            Format requirements:
            - Return exactly 5 distinct captions separated by "---CAPTION---".
            - Include appropriate emojis and spacing.
            - Include 3-5 relevant hashtags at the end of each caption.
            - Do not include conversational text, numbering like "1.", or list formatting. Just output the raw caption text separated by the delimiter.`;

            const systemPrompt = `You are an elite Social Media Manager who writes viral content. Write exclusively in the exact format requested.`;

            const aiResponse = await generateNvidiaAI(prompt, systemPrompt);

            if (!aiResponse) throw new Error("Received empty response from AI");

            const generatedCaptions = aiResponse
                .split("---CAPTION---")
                .map((cap: string) => cap.replace(/^['"]|['"]$/g, '').trim())
                .filter((cap: string) => cap.length > 0)
                .slice(0, 5);

            setCaptions(generatedCaptions);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to generate captions. Please try again.";
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
                <div className="text-5xl mb-3">📱</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Social Media Caption Generator</h1>
                <p className="text-muted-foreground font-bold">Create engaging captions for Instagram, LinkedIn & Twitter powered by AI</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Topic / Post Subject</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && !isLoading && generate()}
                        placeholder="e.g. morning routine, SEO tips, fitness goals"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📱 Platform</label>
                    <div className="grid grid-cols-3 gap-2">
                        {["instagram", "linkedin", "twitter"].map(p => (
                            <button key={p} onClick={() => setPlatform(p)} className={`py-2 rounded-xl font-bold capitalize text-sm ${platform === p ? "bg-comic-blue text-white" : "bg-muted hover:bg-muted/80"}`}>{p}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎭 Tone</label>
                    <div className="grid grid-cols-3 gap-2">
                        {["engaging", "funny", "informative"].map(t => (
                            <button key={t} onClick={() => setTone(t)} className={`py-2 rounded-xl font-bold capitalize text-sm ${tone === t ? "bg-comic-purple text-white" : "bg-muted hover:bg-muted/80"}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} disabled={isLoading} className="w-full bg-comic-blue hover:bg-comic-blue/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg">
                    {isLoading ? "⏳ Generating Captions..." : "📱 Generate Captions"}
                </button>
                {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}
            </div>

            {captions.length > 0 && (
                <div className="space-y-4">
                    {captions.map((cap, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase">{platform} caption {i + 1}</span>
                                <button onClick={() => copy(cap, i)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${copied === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                    {copied === i ? "✅" : "Copy"}
                                </button>
                            </div>
                            <p className="text-foreground font-bold text-sm whitespace-pre-line">{cap}</p>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="Social Media Caption Generator - Instagram LinkedIn Twitter" description="Generate engaging social media captions with AI for Instagram, LinkedIn, and Twitter." keywords="social media caption generator, ai caption generator, instagram caption generator, linkedin post generator, twitter caption tool" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Social Media Caption Generator", "applicationCategory": "SocialMediaApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="AI Social Media Caption Generator" subtitle="Captions That Drive Engagement" description="Great captions transform ordinary posts into viral content. Our AI generator creates highly engaging, platform-optimized captions tailored to your audience." howToUse={["Enter your post topic", "Select your social media platform", "Choose a writing tone", "Click Generate Captions", "The AI writes 5 custom captions. Copy and post!"]} features={["Instagram, LinkedIn & Twitter Profiles", "Real AI Generation", "Variety of Tones", "Contextual Hashtags", "Instant Copy-Paste"]} faqs={[{ question: "What makes a great social media caption?", answer: "Great captions start with a strong hook, provide emotion or value, include a clear call-to-action, and use smart hashtags." }]} relatedTools={[{ name: "Hashtag Generator", emoji: "#️⃣", path: "/tools/hashtags" }, { name: "Instagram Bio", emoji: "📸", path: "/tools/instagram-bio-generator" }]} />
        </div>
    );
};
export default SocialMediaCaptionGenerator;
