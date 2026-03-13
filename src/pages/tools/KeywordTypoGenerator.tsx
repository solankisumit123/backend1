import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Type, Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";


const KeywordTypoGenerator = () => {
    const [keyword, setKeyword] = useState("example");
    const [typos, setTypos] = useState<string[]>([]);

    const generateTypos = () => {
        if (!keyword.trim()) return;

        const word = keyword.toLowerCase().trim();
        const results = new Set<string>();

        // 1. Skip letters (exmple)
        for (let i = 0; i < word.length; i++) {
            results.add(word.slice(0, i) + word.slice(i + 1));
        }

        // 2. Double letters (exaample)
        for (let i = 0; i < word.length; i++) {
            results.add(word.slice(0, i) + word[i] + word.slice(i));
        }

        // 3. Reverse adjacent letters (exmaple)
        for (let i = 0; i < word.length - 1; i++) {
            results.add(
                word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2)
            );
        }

        // 4. Keyboard proximity (exsmple - s is near a)
        const qwerty = {
            q: "weas", w: "qeasd", e: "wrsdf", r: "etdfg", t: "ryfgh", y: "tughj", u: "yihjk", i: "uojkl", o: "ipkl", p: "ol",
            a: "qwsz", s: "qweadzx", d: "wersfxc", f: "ertdgcv", g: "rtyfhvb", h: "tyugjbn", j: "yuihknm", k: "uiojlm", l: "iopk",
            z: "asx", x: "zsdc", c: "xdfv", v: "cfgb", b: "vghn", n: "bhjm", m: "njk"
        };

        for (let i = 0; i < word.length; i++) {
            const char = word[i] as keyof typeof qwerty;
            const adjacent = qwerty[char];
            if (adjacent) {
                for (let j = 0; j < adjacent.length; j++) {
                    results.add(word.slice(0, i) + adjacent[j] + word.slice(i + 1));
                }
            }
        }

        // Remove the exact original word if it sneaked in
        results.delete(word);

        setTypos(Array.from(results));
        toast.success(`Generated ${results.size} typos!`);
    };

    const handleCopy = () => {
        if (typos.length === 0) return;
        navigator.clipboard.writeText(typos.join("\n"));
        toast.success("Typos copied to clipboard!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🤪 Keyword Typo Generator</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Find common misspellings of your domain or keywords to capture hidden traffic.</p>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Enter Keyword</label>
                <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                        <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') generateTypos(); }}
                            placeholder="e.g. facebook"
                            className="comic-input w-full pl-10"
                        />
                    </div>
                    <button onClick={generateTypos} className="comic-btn bg-primary text-primary-foreground flex items-center justify-center gap-2">
                        <Wand2 className="w-5 h-5" strokeWidth={3} /> <span className="hidden sm:inline">Generate</span>
                    </button>
                </div>

                <div className="flex justify-between items-center mb-2 mt-6">
                    <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">Generated Typos ({typos.length})</label>
                    <button onClick={handleCopy} disabled={typos.length === 0} className="comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1 py-1 disabled:opacity-50">
                        <Copy className="w-3 h-3" /> Copy List
                    </button>
                </div>
                <textarea
                    readOnly
                    value={typos.join("\n")}
                    className="comic-input w-full h-64 bg-muted/30 font-mono text-sm"
                    placeholder="Results will appear here..."
                />
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Keyword Typo Generator - Find Common Misspellings"
                description="Identify common typing mistakes and misspellings for your brand or keywords. Capture 'hidden' search traffic and improve your PPC negative match list."
                keywords="typo generator, misspelling finder, domain typo tool, keyword variation maker, search traffic hacks"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Typo Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Uncover Hidden Traffic with Smart Misspelling Analysis"
                subtitle="Why Typos are a Goldmine for Savvy SEOs and Marketers"
                description="Millions of people mistype their search queries every single day. If you only optimize for perfectly spelled keywords, you're missing out on a massive chunk of 'low-competition' traffic. Our Keyword Typo Generator uses sophisticated keyboard proximity algorithms and common linguistic slip-up patterns (like skipping letters or doubling them) to show you exactly how users might accidentally search for your brand or products."
                howToUse={[
                    "Type your focus 'Keyword' or 'Domain' into the input box.",
                    "Click 'Generate' to run the misspelling engine.",
                    "Review the list of variations, categorized by type (Skip, Double, Reverse, Proximity).",
                    "Copy the list of typos into your SEO spreadsheet.",
                    "Use these typos to create low-cost PPC campaigns or identify potential squatted domains."
                ]}
                features={[
                    "Keyboard Proximity: Detects keys physically close to each other on a QWERTY layout.",
                    "Skip & Double logic: Simulates common fast-typing errors like leaving out a vowel or hitting a key twice.",
                    "Adjacent Reversal: Reverses middle letters (e.g. 'tehc' instead of 'tech').",
                    "Instant Batching: Generates dozens of permutations in milliseconds.",
                    "Data Privacy: Your keywords never leave your browser—private and secure."
                ]}
                faqs={[
                    {
                        question: "How can typos help my SEO?",
                        answer: "Ranking for a popular typo often involves very low competition. You can capture thousands of visits by simply having a page that 'explains' or captures those misdirected users."
                    },
                    {
                        question: "What is Typosquatting?",
                        answer: "Typosquatting is the practice of registering domains that are misspellings of popular sites to steal traffic. Our tool helps you identify which domains you should own to protect your brand."
                    },
                    {
                        question: "Which industries benefit most from typo targeting?",
                        answer: "Retail, finance, and high-traffic social media brands benefit most, as users frequently browse these sites while distracted or on mobile devices."
                    }
                ]}
                relatedTools={[
                    { name: "Word Combiner", emoji: "🔀", path: "/tools/word-combiner" },
                    { name: "URL Slug Generator", emoji: "🔗", path: "/tools/url-slug-generator" },
                    { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
                    { name: "Word Counter", emoji: "📝", path: "/tools/word-counter" }
                ]}
            />
        </div>
    );
};

export default KeywordTypoGenerator;
