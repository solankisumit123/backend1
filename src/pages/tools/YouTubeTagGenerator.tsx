import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const YouTubeTagGenerator = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        if (!title.trim()) return;
        const words = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const tagList: string[] = [];

        tagList.push(title.toLowerCase());
        words.forEach(w => tagList.push(w, `best ${w}`, `${w} tutorial`, `${w} 2025`));
        tagList.push(
            `how to ${title.toLowerCase()}`,
            `${title.toLowerCase()} tips`,
            `${title.toLowerCase()} for beginners`,
            `${title.toLowerCase()} guide`,
            `learn ${title.toLowerCase()}`,
            `${title.toLowerCase()} tricks`,
            `easy ${title.toLowerCase()}`,
            `${title.toLowerCase()} explained`,
            `${title.toLowerCase()} step by step`
        );

        const unique = [...new Set(tagList.filter(t => t.length > 3))].slice(0, 30);
        setTags(unique);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(tags.join(", "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const charCount = tags.join(", ").length;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🏷️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">YouTube Tag Generator</h1>
                <p className="text-muted-foreground font-bold">Generate SEO tags for your YouTube videos to rank higher</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">📹 Video Title</label>
                <div className="flex gap-3">
                    <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
                        placeholder="e.g. SEO Tutorial for Beginners 2025"
                        className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-red" />
                    <button onClick={generate} className="bg-comic-red hover:bg-comic-red/90 text-white font-bold px-6 py-3 rounded-xl">Generate</button>
                </div>
            </div>

            {tags.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex justify-between items-center">
                        <div>
                            <h3 className="font-black text-foreground">{tags.length} YouTube Tags</h3>
                            <p className={`text-xs font-bold ${charCount > 500 ? "text-red-500" : "text-green-500"}`}>{charCount}/500 characters</p>
                        </div>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <span key={i} onClick={() => navigator.clipboard.writeText(tag)} title="Click to copy"
                                className="px-3 py-1.5 bg-muted/40 border border-border rounded-xl text-sm font-bold text-foreground hover:bg-comic-red hover:text-white cursor-pointer transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="YouTube Tag Generator - Free Video Tags Tool" description="Generate SEO-optimized tags for YouTube videos. Get 30 relevant tags from your video title to rank higher in YouTube search results." keywords="youtube tag generator, youtube tags, video tags generator, youtube seo tags, free youtube tags" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "YouTube Tag Generator", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="YouTube Tag Generator" subtitle="More Tags = More Views" description="YouTube uses tags to understand and recommend your content. Our generator creates 30 relevant tags from your video title — just copy and paste into YouTube." howToUse={["Enter your YouTube video title", "Click Generate to get 30 tags", "Check character count (max 500)", "Click Copy All or individual tags", "Paste directly into YouTube's tag field"]} features={["30 Relevant Tags", "Character Count Tracker", "500 Char Limit Warning", "Click Individual Tags to Copy", "Copy All Feature"]} faqs={[{ question: "How many YouTube tags should I use?", answer: "YouTube allows up to 500 characters for tags. Use 10-20 high-quality, relevant tags. Include broad and specific tags, and your primary keyword as the first tag." }]} relatedTools={[{ name: "YouTube Keyword Tool", emoji: "▶️", path: "/tools/youtube-keyword" }, { name: "Hashtag Generator", emoji: "#️⃣", path: "/tools/hashtags" }]} />
        </div>
    );
};
export default YouTubeTagGenerator;
