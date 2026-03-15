import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Issue { type: "grammar" | "spelling" | "style" | "punctuation"; word: string; suggestion: string; index: number; message: string; }

const commonErrors: Record<string, { suggestion: string; type: Issue["type"]; message: string }> = {
    "their is": { suggestion: "there is", type: "grammar", message: "Use 'there is' for existence" },
    "there going": { suggestion: "they're going", type: "grammar", message: "Use 'they're' (they are)" },
    "your welcome": { suggestion: "you're welcome", type: "grammar", message: "Use 'you're' (you are)" },
    "its a": { suggestion: "it's a", type: "grammar", message: "Use 'it's' (it is)" },
    "could of": { suggestion: "could have", type: "grammar", message: "Use 'could have', not 'could of'" },
    "would of": { suggestion: "would have", type: "grammar", message: "Use 'would have', not 'would of'" },
    "should of": { suggestion: "should have", type: "grammar", message: "Use 'should have', not 'should of'" },
    "alot": { suggestion: "a lot", type: "spelling", message: "'Alot' is not a word — use 'a lot'" },
    "definately": { suggestion: "definitely", type: "spelling", message: "Correct spelling: definitely" },
    "seperate": { suggestion: "separate", type: "spelling", message: "Correct spelling: separate" },
    "occured": { suggestion: "occurred", type: "spelling", message: "Correct spelling: occurred" },
    "recieve": { suggestion: "receive", type: "spelling", message: "Correct spelling: receive (i before e)" },
    "untill": { suggestion: "until", type: "spelling", message: "Correct spelling: until (one l)" },
    "accomodate": { suggestion: "accommodate", type: "spelling", message: "Correct spelling: accommodate" },
    "neccessary": { suggestion: "necessary", type: "spelling", message: "Correct spelling: necessary" },
    "occurence": { suggestion: "occurrence", type: "spelling", message: "Correct spelling: occurrence" },
    "grammer": { suggestion: "grammar", type: "spelling", message: "Correct spelling: grammar" },
    "  ": { suggestion: " ", type: "style", message: "Double space detected — use single space" },
    "very very": { suggestion: "extremely", type: "style", message: "Avoid repetition — use a stronger word" },
    "in order to": { suggestion: "to", type: "style", message: "Simplify: 'in order to' → 'to'" },
    "at this point in time": { suggestion: "now", type: "style", message: "Simplify: use 'now'" },
    "due to the fact that": { suggestion: "because", type: "style", message: "Simplify: use 'because'" },
};

const GrammarChecker = () => {
    const [text, setText] = useState("");
    const [issues, setIssues] = useState<Issue[]>([]);
    const [checked, setChecked] = useState(false);

    const check = () => {
        if (!text.trim()) return;
        const found: Issue[] = [];
        const lower = text.toLowerCase();

        Object.entries(commonErrors).forEach(([pattern, info]) => {
            let idx = lower.indexOf(pattern);
            while (idx !== -1) {
                found.push({ type: info.type, word: text.substr(idx, pattern.length), suggestion: info.suggestion, index: idx, message: info.message });
                idx = lower.indexOf(pattern, idx + 1);
            }
        });

        // Check capitalization after period
        const sentences = text.split(/([.!?]\s+)/);
        let pos = 0;
        sentences.forEach((s, i) => {
            if (i % 2 === 0 && i > 0 && s.length > 0 && s[0] === s[0].toLowerCase() && /[a-z]/.test(s[0])) {
                found.push({ type: "punctuation", word: s[0], suggestion: s[0].toUpperCase(), index: pos, message: "Capitalize first letter after period" });
            }
            pos += s.length;
        });

        found.sort((a, b) => a.index - b.index);
        setIssues(found);
        setChecked(true);
    };

    const typeColors: Record<string, string> = {
        grammar: "bg-comic-red/10 border-comic-red text-comic-red",
        spelling: "bg-comic-orange/10 border-comic-orange text-comic-orange",
        style: "bg-comic-blue/10 border-comic-blue text-comic-blue",
        punctuation: "bg-comic-purple/10 border-comic-purple text-comic-purple",
    };

    const typeEmojis: Record<string, string> = { grammar: "📝", spelling: "🔤", style: "✨", punctuation: "❗" };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📝</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Grammar Checker</h1>
                <p className="text-muted-foreground font-bold">Check grammar, spelling & writing style</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <textarea value={text} onChange={e => { setText(e.target.value); setChecked(false); }} rows={8}
                    placeholder="Type or paste your text here to check for grammar, spelling, and style issues..."
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue resize-none" />
                <button onClick={check}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    📝 Check Grammar
                </button>
            </div>

            {checked && (
                <div className="space-y-4 animate-fade-in">
                    <div className={`bg-card border-4 rounded-2xl p-6 text-center ${issues.length === 0 ? "border-comic-green" : "border-comic-orange"}`}>
                        <div className="text-4xl mb-2">{issues.length === 0 ? "✅" : "⚠️"}</div>
                        <div className="text-2xl font-black text-foreground">
                            {issues.length === 0 ? "No Issues Found!" : `${issues.length} Issue${issues.length > 1 ? "s" : ""} Found`}
                        </div>
                    </div>

                    {issues.length > 0 && (
                        <div className="space-y-3">
                            {issues.map((issue, i) => (
                                <div key={i} className={`border-2 rounded-2xl p-4 ${typeColors[issue.type]}`}>
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">{typeEmojis[issue.type]}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-black uppercase">{issue.type}</span>
                                            </div>
                                            <p className="font-bold text-foreground text-sm mb-1">{issue.message}</p>
                                            <div className="flex items-center gap-2 text-sm font-bold">
                                                <span className="line-through text-muted-foreground">{issue.word}</span>
                                                <span>→</span>
                                                <span className="text-comic-green font-black">{issue.suggestion}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Summary */}
                    <div className="grid grid-cols-4 gap-2">
                        {(["grammar", "spelling", "style", "punctuation"] as const).map(type => (
                            <div key={type} className="bg-card border-4 border-border rounded-xl p-3 text-center">
                                <div className="text-lg">{typeEmojis[type]}</div>
                                <div className="text-xl font-black">{issues.filter(i => i.type === type).length}</div>
                                <div className="text-[10px] font-bold text-muted-foreground capitalize">{type}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Free Grammar Checker Online</h2>
                <p>Check your text for <strong>grammar mistakes, spelling errors, style issues, and punctuation problems</strong>. Get instant suggestions to improve your writing. Works great for emails, blog posts, essays, and social media content.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: grammar checker, free grammar check online, spelling checker, writing checker, english grammar tool, proofreading tool, grammar corrector.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default GrammarChecker;
