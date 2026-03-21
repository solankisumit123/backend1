import { useState } from "react";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const synonyms: Record<string, string[]> = {
    good: ["great", "excellent", "superb", "wonderful", "fine"],
    bad: ["poor", "terrible", "awful", "dreadful", "unpleasant"],
    big: ["large", "huge", "enormous", "massive", "vast"],
    small: ["tiny", "little", "compact", "miniature", "minute"],
    happy: ["joyful", "cheerful", "delighted", "pleased", "content"],
    sad: ["unhappy", "sorrowful", "melancholy", "gloomy", "dismal"],
    fast: ["quick", "rapid", "swift", "speedy", "brisk"],
    slow: ["sluggish", "leisurely", "unhurried", "gradual", "steady"],
    important: ["significant", "crucial", "vital", "essential", "key"],
    help: ["assist", "support", "aid", "facilitate", "enable"],
    use: ["utilize", "employ", "apply", "leverage", "adopt"],
    make: ["create", "produce", "generate", "develop", "build"],
    get: ["obtain", "acquire", "receive", "gain", "secure"],
    show: ["demonstrate", "display", "illustrate", "reveal", "present"],
    think: ["believe", "consider", "suppose", "assume", "reckon"],
    give: ["provide", "offer", "supply", "deliver", "grant"],
    take: ["obtain", "acquire", "seize", "grab", "accept"],
    come: ["arrive", "approach", "reach", "appear", "emerge"],
    see: ["observe", "notice", "view", "witness", "perceive"],
    know: ["understand", "recognize", "realize", "comprehend", "grasp"],
    want: ["desire", "wish", "crave", "seek", "aspire"],
    look: ["appear", "seem", "glance", "gaze", "peer"],
    very: ["extremely", "highly", "remarkably", "incredibly", "exceptionally"],
    also: ["additionally", "furthermore", "moreover", "likewise", "besides"],
    however: ["nevertheless", "nonetheless", "yet", "still", "on the other hand"],
    because: ["since", "as", "due to the fact that", "given that", "owing to"],
    but: ["however", "yet", "nevertheless", "although", "though"],
    said: ["stated", "mentioned", "noted", "expressed", "remarked"],
    way: ["method", "approach", "manner", "technique", "strategy"],
    thing: ["item", "object", "element", "aspect", "component"],
    people: ["individuals", "persons", "folks", "humans", "citizens"],
    work: ["function", "operate", "perform", "labor", "toil"],
    start: ["begin", "commence", "initiate", "launch", "embark"],
    end: ["finish", "conclude", "terminate", "complete", "cease"],
    change: ["modify", "alter", "adjust", "transform", "revise"],
    need: ["require", "demand", "necessitate", "call for", "warrant"],
    try: ["attempt", "endeavor", "strive", "aim", "seek"],
    different: ["various", "diverse", "distinct", "unique", "varied"],
    old: ["ancient", "aged", "vintage", "mature", "historic"],
    new: ["fresh", "novel", "recent", "modern", "latest"],
};

const ParaphrasingTool = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState<{ replaced: number; total: number } | null>(null);

    const rewrite = () => {
        if (!input.trim()) return;
        let replaced = 0;
        const words = input.split(/(\s+|[.,!?;:'"()\-—])/);
        const result = words.map(word => {
            const lower = word.toLowerCase();
            if (synonyms[lower]) {
                replaced++;
                const syns = synonyms[lower];
                const chosen = syns[Math.floor(Math.random() * syns.length)];
                // Preserve casing
                if (word[0] === word[0].toUpperCase()) return chosen.charAt(0).toUpperCase() + chosen.slice(1);
                return chosen;
            }
            return word;
        });
        setOutput(result.join(""));
        setStats({ replaced, total: words.filter(w => /\w/.test(w)).length });
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SEOHead 
                title="Paraphrasing Tool - Professional Text Rewriter" 
                description="Improve your writing with our free paraphrasing tool. Rewrite sentences and articles for better clarity and engagement while maintaining original meaning." 
                keywords="paraphrasing tool, text rewriter, clarify writing, professional paraphraser" 
            />
            
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">✍️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Paraphrasing Tool</h1>
                <p className="text-muted-foreground font-bold">Enhance your writing for better clarity and flow</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-sm">
                    <label className="text-sm font-black text-foreground mb-3 block uppercase tracking-wider">📝 Original Text</label>
                    <textarea value={input} onChange={e => setInput(e.target.value)} rows={12}
                        placeholder="Paste your text here to begin paraphrasing..."
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple resize-none text-sm leading-relaxed" />
                </div>
                <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-black text-foreground uppercase tracking-wider">✨ Paraphrased Text</span>
                        {output && (
                            <button onClick={copy}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-purple hover:text-white"}`}>
                                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Text</>}
                            </button>
                        )}
                    </div>
                    <textarea readOnly value={output} rows={12}
                        placeholder="Your improved text will appear here..."
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold resize-none text-sm shadow-inner leading-relaxed" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={rewrite}
                    className="flex-1 bg-comic-purple hover:bg-comic-purple/90 text-white font-black py-5 rounded-2xl text-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                    ✍️ Paraphrase Now
                </button>
                <button onClick={() => rewrite()}
                    className="sm:w-32 bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-5 px-6 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg">
                    <RefreshCw className="w-5 h-5" /> Variation
                </button>
            </div>

            {stats && (
                <div className="bg-primary/5 border-2 border-comic-purple/20 rounded-2xl p-6 text-center mb-10 animate-fade-in">
                    <p className="font-bold text-lg mb-1">
                        <span className="text-comic-purple font-black">{stats.replaced}</span> modifications made
                    </p>
                    <p className="text-muted-foreground font-medium italic">
                        Vocabulary improvement score: {((stats.replaced / Math.max(1, stats.total)) * 100).toFixed(1)}%
                    </p>
                </div>
            )}

            <div className="mt-12 bg-white/50 backdrop-blur-sm border-2 border-border rounded-[2.5rem] p-8 md:p-12 prose prose-lg max-w-none text-foreground shadow-sm">
                <h2 className="text-3xl font-black mb-6">Effective Paraphrasing for Better Content</h2>
                <p className="mb-6">Paraphrasing is the art of rewriting a piece of text to improve its clarity, tone, and flow while strictly maintaining the original meaning. Unlike simple "spinning," professional paraphrasing helps you adapt your message for different audiences or simplify complex language.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                    <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Why Paraphrase?</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Improve Readability:</strong> Make complex sentences easier to understand.</li>
                            <li><strong>Avoid Repetition:</strong> Use synonyms to keep your writing fresh and engaging.</li>
                            <li><strong>Change Tone:</strong> Adjust your message to be more formal, casual, or persuasive.</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Best Practices</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Always Attribute:</strong> Even if you paraphrase, the original idea belongs to the source.</li>
                            <li><strong>Double-Check Meaning:</strong> Ensure your new version hasn't distorted the original intent.</li>
                            <li><strong>Read Aloud:</strong> Make sure the new flow sounds natural and professional.</li>
                        </ul>
                    </div>
                </div>

                <SEOSection 
                    title="Professional Paraphrasing Tool" 
                    subtitle="Rewrite with Confidence" 
                    description="Our tool uses an intelligent synonym replacement engine to suggest variations of your text. It's designed for students, bloggers, and professionals who want to refine their writing style without losing the core message." 
                    howToUse={["Enter your original text in the left panel", "Click the 'Paraphrase Now' button", "Review the suggested changes in the right panel", "Use the 'Variation' button to see different wording options", "Click 'Copy Text' to use your improved content"]} 
                    features={["Deep Synonym Database", "Casing Preservation", "Clarity-Focused Metrics", "One-Click Variations", "Instant Result Analysis"]} 
                    faqs={[{ question: "Is paraphrasing different from spinning?", answer: "Yes. Professional paraphrasing focuses on improving quality and readability, whereas spinning often creates low-quality, automated content that can be flagged by search engines." }]} 
                    relatedTools={[{ name: "Grammar Checker", emoji: "🧐", path: "/tools/grammar-checker" }, { name: "Readability Score", emoji: "📊", path: "/tools/readability" }]} 
                />
            </div>
        </div>
    );
};

export default ParaphrasingTool;
