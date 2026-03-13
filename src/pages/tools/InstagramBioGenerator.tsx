import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";
import { generateNvidiaAI } from "@/lib/nvidiaAI";

const InstagramBioGenerator = () => {
    const [name, setName] = useState("");
    const [niche, setNicheChoosing] = useState("influencer");
    const [emoji1, setEmoji1] = useState("✨");
    const [tagline, setTagline] = useState("");
    const [cta, setCta] = useState("DM for collabs");
    const [bio, setBio] = useState("");
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const niches: Record<string, { emojis: string[] }> = {
        influencer: { emojis: ["✨", "🌟", "💫", "🔥"] },
        fitness: { emojis: ["💪", "🏋️", "🔥", "⚡"] },
        food: { emojis: ["🍕", "👨‍🍳", "🍴", "❤️"] },
        travel: { emojis: ["✈️", "🌍", "🗺️", "🌅"] },
        business: { emojis: ["💼", "🚀", "📈", "💡"] },
        photography: { emojis: ["📸", "🖼️", "🎞️", "✨"] },
        fashion: { emojis: ["👗", "👠", "👔", "✨"] },
        art: { emojis: ["🎨", "🖌️", "🎭", "✨"] }
    };

    const generateBio = async () => {
        if (!name.trim()) return;
        setIsLoading(true);
        setError(null);

        try {
            const prompt = `Write a highly attractive Instagram bio for ${name}.
            Niche: ${niche}
            Primary Emoji Style: ${emoji1}
            ${tagline ? `Include this core message/tagline: "${tagline}"` : "Create a catchy tagline appropriate for the niche."}
            Call to Action: ${cta}
            
            Format the bio perfectly for Instagram limit (under 130 chars). Use line breaks.
            Include 1-3 emojis total in the bio that fit the style.
            Start the output directly with the bio, do not explain anything or write conversational text.
            The final line MUST be: 👇 ${cta}`;

            const systemPrompt = `You are an expert Instagram growth hacker.
            Return ONLY the generated bio. Do not wrap it in quotes. Do not provide options, just give the single best bio.`;

            let aiResponse = await generateNvidiaAI(prompt, systemPrompt);
            if (!aiResponse) throw new Error("Empty response from AI");

            aiResponse = aiResponse.replace(/^['"]|['"]$/g, '').trim();

            setBio(aiResponse);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to generate your bio. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(bio);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📸</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Instagram Bio Generator</h1>
                <p className="text-muted-foreground font-bold">Create a compelling AI-powered Instagram bio that attracts followers</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">👤 Your Name / Brand</label>
                    <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && !isLoading && generateBio()}
                        placeholder="e.g. Rahul Gupta"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Your Niche</label>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(niches).map(n => (
                            <button key={n} onClick={() => setNicheChoosing(n)} className={`px-4 py-2 rounded-xl font-bold capitalize text-sm ${niche === n ? "bg-comic-purple text-white" : "bg-muted hover:bg-muted/80"}`}>{n}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">✨ Emoji Style</label>
                    <div className="flex gap-2 flex-wrap">
                        {niches[niche].emojis.map(e => (
                            <button key={e} onClick={() => setEmoji1(e)} className={`w-12 h-12 text-2xl rounded-xl border-2 ${emoji1 === e ? "border-comic-purple bg-comic-purple/10" : "border-border"}`}>{e}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💬 Custom Tagline (optional)</label>
                    <input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Leave blank for auto-generated AI tagline"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📩 Call to Action</label>
                    <input value={cta} onChange={e => setCta(e.target.value)} placeholder="e.g. DM for collabs"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                </div>
                <button onClick={generateBio} disabled={isLoading} className="w-full bg-comic-purple hover:bg-comic-purple/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg flex justify-center items-center">
                    {isLoading ? "⏳ Generating Bio..." : "📸 Generate Bio"}
                </button>
                {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}
            </div>

            {bio && (
                <div className="bg-card border-4 border-comic-purple rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-foreground">Your AI Instagram Bio</h3>
                        <button onClick={copy} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy"}
                        </button>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 font-bold whitespace-pre-line text-foreground text-lg">
                        {bio}
                    </div>
                    <p className={`text-xs font-bold mt-3 ${bio.length > 150 ? 'text-red-500' : 'text-muted-foreground'}`}>Characters: {bio.length}/150</p>
                </div>
            )}

            <SEOHead title="Instagram Bio Generator - AI IG Bio Creator Free" description="Generate a compelling Instagram bio that attracts followers. Create professional, niche-specific Instagram bios with our free AI bio generator." keywords="instagram bio generator, ai ig bio creator, instagram bio ideas, best instagram bio, free instagram bio tool" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Instagram Bio Generator", "applicationCategory": "SocialMediaApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="AI Instagram Bio Generator" subtitle="First Impressions Matter on Instagram" description="Your Instagram bio is the first thing visitors see. A well-crafted bio can convert profile visitors into followers. Our AI generator creates professional, highly relatable, and perfectly formatted bios in seconds." howToUse={["Enter your name or brand name", "Select your content niche", "Pick an emoji style", "Add a custom tagline or let AI write it", "Click Generate Bio and copy it to Instagram"]} features={["Real-time AI Generation", "8 Niche Templates", "Smart Emoji Placement", "Character Counter", "Optimized Call to Action"]} faqs={[{ question: "How long should an Instagram bio be?", answer: "Instagram bios are limited to 150 characters. Keep it concise: who you are, what you do, and a call to action. Use line breaks for readability." }]} relatedTools={[{ name: "Hashtag Generator", emoji: "#️⃣", path: "/tools/hashtags" }, { name: "Social Caption Generator", emoji: "📝", path: "/tools/social-caption-generator" }]} />
        </div>
    );
};
export default InstagramBioGenerator;
