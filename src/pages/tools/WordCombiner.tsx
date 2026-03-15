import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Copy } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";


const WordCombiner = () => {
    const [listA, setListA] = useState("buy\nget\nfind");
    const [listB, setListB] = useState("seo\nhosting\ndomains");
    const [listC, setListC] = useState("cheap\nfast");
    const [result, setResult] = useState("");

    const combine = () => {
        const A = listA.split("\n").map((w) => w.trim()).filter(Boolean);
        const B = listB.split("\n").map((w) => w.trim()).filter(Boolean);
        const C = listC.split("\n").map((w) => w.trim()).filter(Boolean);

        let combined: string[] = [];

        if (A.length && B.length && C.length) {
            for (const a of A) for (const b of B) for (const c of C) combined.push(`${a} ${b} ${c}`);
        } else if (A.length && B.length) {
            for (const a of A) for (const b of B) combined.push(`${a} ${b}`);
        } else if (A.length) {
            combined = [...A];
        }

        setResult(combined.join("\n"));
        toast.success(`Generated ${combined.length} combinations!`);
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔀 Word Combiner</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Merge words to generate new keyword ideas instantly.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">List 1 (Modifiers)</label>
                        <textarea value={listA} onChange={(e) => setListA(e.target.value)} className="comic-input w-full h-32" placeholder="buy, best, cheap..." />
                    </div>
                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">List 2 (Core Keyword)</label>
                        <textarea value={listB} onChange={(e) => setListB(e.target.value)} className="comic-input w-full h-32" placeholder="shoes, hosting, laptops..." />
                    </div>
                    <div className="comic-card">
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">List 3 (Location/Extra)</label>
                        <textarea value={listC} onChange={(e) => setListC(e.target.value)} className="comic-input w-full h-32" placeholder="online, near me, 2026..." />
                    </div>

                    <button onClick={combine} className="comic-btn bg-primary text-primary-foreground flex items-center justify-center gap-2 w-full text-lg">
                        Merge Words <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </button>
                </div>

                {/* Output */}
                <div className="comic-card flex flex-col h-full min-h-[400px]">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-muted-foreground uppercase block">Combined Keywords</label>
                        <button onClick={handleCopy} disabled={!result} className="comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1 py-1 disabled:opacity-50">
                            <Copy className="w-3 h-3" /> Copy All
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={result}
                        className="comic-input w-full flex-1 bg-muted/30 whitespace-pre"
                        placeholder="Click 'Merge Words' to generate combinations..."
                    />
                    {result && (
                        <p className="text-xs text-muted-foreground font-bold mt-2 text-right">
                            Total: <span className="text-foreground">{result.split("\n").length} keywords</span>
                        </p>
                    )}
                </div>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Keyword Combiner Tool - Generate Permutation Lists"
                description="Easily merge lists of words to create thousands of long-tail keyword combinations. Perfect for PPC campaigns, domain search, and SEO research."
                keywords="word combiner, keyword mixer, keyword permutation tool, long tail keyword generator, ppc tool"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Word Combiner",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "BusinessApplication"
                }}
            />

            <SEOSection
                title="Scale Your SEO and PPC Campaigns Effortlessly"
                subtitle="Generate Thousands of High-Intent Keyword Variations"
                description="Manually typing out every possible variation of a keyword is a waste of time. Whether you are building out a massive Google Ads campaign or looking for niche domain names, our Word Combiner (also known as a Keyword Mixer) automates the process of merging modifiers, core keywords, and locations. By creating structured permutations, you can uncover long-tail opportunities that your competitors are missing."
                howToUse={[
                    "Enter your 'Modifiers' (e.g., best, cheap, top) in List 1.",
                    "Enter your 'Core Keywords' (e.g., laptop, shoes, watch) in List 2.",
                    "Add 'Extras' or 'Locations' (e.g., online, in London, 2024) in List 3.",
                    "Click 'Merge Words' to generate every possible combination across all lists.",
                    "Review the 'Total Count' and click 'Copy All' to move the results to your research doc."
                ]}
                features={[
                    "Three-Way Merging: Combine up to three separate columns of data simultaneously.",
                    "Bulk Processing: Handles hundreds of words in each list without lag.",
                    "Clean Results: Automatically removes empty lines and extra whitespace.",
                    "One-Click Extraction: Instant copy-to-clipboard functionality for large lists.",
                    "PPC Friendly: Perfect for generating 'Exact Match' or 'Phrase Match' keyword lists."
                ]}
                faqs={[
                    {
                        question: "What are 'Long-Tail' keywords?",
                        answer: "Long-tail keywords are longer, more specific phrases like 'cheap gaming laptop in New York' instead of just 'laptop'. They often have higher conversion rates."
                    },
                    {
                        question: "Is there a limit to combinations?",
                        answer: "The tool can comfortably generate up to 50,000 combinations in your browser. For lists larger than that, browser memory may slow down noticeably."
                    },
                    {
                        question: "Can I use this for domain name ideas?",
                        answer: "Absolutely! Mix root words with tech suffixes (e.g., 'app', 'ly', 'ify') to quickly verify and brainstorm available brand names."
                    }
                ]}
                relatedTools={[
                    { name: "Keyword Typo Generator", emoji: "⌨️", path: "/tools/keyword-typo-generator" },
                    { name: "Keyword Density", emoji: "📊", path: "/tools/keyword-density" },
                    { name: "URL Slug Generator", emoji: "🔗", path: "/tools/url-slug-generator" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" }
                ]}
            />
        </div>
    );
};


export default WordCombiner;
