import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const questionPrefixes = ["What is", "What are", "What does", "How to", "How does", "How can", "How many", "How much", "Why is", "Why does", "Why should", "When to", "When should", "Where to", "Where can", "Which is", "Which are", "Can I", "Should I", "Is it possible to", "What are the best", "What are the benefits of", "What are the types of", "How to use", "How to improve", "How to fix", "How to get", "How to create"];

const QuestionKeywordFinder = () => {
    const [seed, setSeed] = useState("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        if (!seed.trim()) return;
        const kw = seed.trim();
        const qs = questionPrefixes.map(p => `${p} ${kw.toLowerCase()}?`);
        setQuestions(qs);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(questions.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">❓</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Question Keyword Finder</h1>
                <p className="text-muted-foreground font-bold">Find question-based keywords for featured snippets & FAQ content</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">Enter your topic or keyword</label>
                <div className="flex gap-3">
                    <input value={seed} onChange={e => setSeed(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
                        placeholder="e.g. SEO tools" className="flex-1 border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange" />
                    <button onClick={generate} className="bg-comic-orange hover:bg-comic-orange/90 text-white font-bold px-6 py-3 rounded-xl">Generate</button>
                </div>
            </div>

            {questions.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b-2 border-border flex justify-between items-center">
                        <h3 className="font-black text-foreground">❓ {questions.length} Question Keywords</h3>
                        <button onClick={copyAll} className={`px-4 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All"}
                        </button>
                    </div>
                    <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
                        {questions.map((q, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border hover:bg-muted/40 group">
                                <span className="font-bold text-foreground text-sm">{q}</span>
                                <button onClick={() => navigator.clipboard.writeText(q)} className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-comic-blue text-white rounded">Copy</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <SEOHead title="Question Keyword Finder - FAQ Content Generator" description="Generate question-based keywords for FAQ pages, featured snippets, and voice search optimization." keywords="question keywords, people also ask, faq keywords, question keyword finder" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Question Keyword Finder", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Question Keyword Finder" subtitle="Target Voice Search & Featured Snippets" description="Question keywords are perfect for winning featured snippets on Google. Generate What, How, Why, When, Where questions for any topic." howToUse={["Enter your topic/keyword", "Click Generate", "Get 28+ question variations", "Copy and use in FAQ sections", "Target for featured snippets"]} features={["28+ Question Prefixes", "What/How/Why/When/Where", "Voice Search Optimization", "FAQ Content Ideas", "Copy All Feature"]} faqs={[{ question: "Why use question keywords?", answer: "Question keywords match how people actually search, especially on mobile and voice. They're ideal for FAQ sections and winning Google's featured snippets." }]} relatedTools={[{ name: "Long Tail Keywords", emoji: "🐟", path: "/tools/long-tail-keywords" }, { name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" }]} />
        </div>
    );
};
export default QuestionKeywordFinder;
