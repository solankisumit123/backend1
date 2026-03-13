import { useState } from "react";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

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

const ArticleRewriter = () => {
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
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">✍️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Article Rewriter</h1>
                <p className="text-muted-foreground font-bold">Paraphrase and rewrite text using synonym replacement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border-4 border-border rounded-2xl p-4">
                    <label className="text-sm font-black text-foreground mb-2 block">📝 Original Text</label>
                    <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}
                        placeholder="Paste your article or text here..."
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple resize-none text-sm" />
                </div>
                <div className="bg-card border-4 border-border rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-foreground">✨ Rewritten Text</span>
                        {output && (
                            <button onClick={copy}
                                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-purple hover:text-white"}`}>
                                {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                            </button>
                        )}
                    </div>
                    <textarea readOnly value={output} rows={10}
                        placeholder="Rewritten text will appear here..."
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold resize-none text-sm" />
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button onClick={rewrite}
                    className="flex-1 bg-comic-purple hover:bg-comic-purple/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    ✍️ Rewrite Article
                </button>
                <button onClick={() => { rewrite(); }}
                    className="bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-4 px-6 rounded-xl transition-all hover:scale-[1.02] flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" /> Again
                </button>
            </div>

            {stats && (
                <div className="bg-card border-4 border-comic-purple rounded-2xl p-4 text-center mb-6 animate-fade-in">
                    <span className="font-black text-foreground">{stats.replaced} words replaced</span>
                    <span className="text-muted-foreground font-bold"> out of {stats.total} total words</span>
                    <span className="text-comic-purple font-black"> ({((stats.replaced / Math.max(1, stats.total)) * 100).toFixed(1)}% changed)</span>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Article Rewriter / Paraphraser — Free Online Tool</h2>
                <p>Rewrite and paraphrase your articles using intelligent <strong>synonym replacement</strong>. Great for content creators, bloggers, and students who need to create unique versions of text. Each rewrite generates different results.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: article rewriter, paraphrasing tool, text rewriter online, content spinner, synonym replacer, reword article free, paraphrase text.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default ArticleRewriter;
