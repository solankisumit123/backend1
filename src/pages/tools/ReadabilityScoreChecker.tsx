import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const ReadabilityScoreChecker = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState<null | {
        fleschKincaid: number; gradeLevel: number; words: number; sentences: number; syllables: number;
        avgWordsPerSentence: number; avgSyllablesPerWord: number; readingTime: string; level: string; levelColor: string;
    }>(null);

    const countSyllables = (word: string): number => {
        word = word.toLowerCase().replace(/[^a-z]/g, "");
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        word = word.replace(/^y/, "");
        const m = word.match(/[aeiouy]{1,2}/g);
        return m ? m.length : 1;
    };

    const analyze = () => {
        if (!text.trim()) return;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
        const numSentences = Math.max(1, sentences.length);
        const numWords = words.length;

        const avgWPS = numWords / numSentences;
        const avgSPW = totalSyllables / Math.max(1, numWords);

        // Flesch Reading Ease
        const fleschKincaid = 206.835 - 1.015 * avgWPS - 84.6 * avgSPW;
        // Flesch-Kincaid Grade Level
        const gradeLevel = 0.39 * avgWPS + 11.8 * avgSPW - 15.59;

        const score = Math.max(0, Math.min(100, Math.round(fleschKincaid)));
        let level = "", levelColor = "";
        if (score >= 90) { level = "Very Easy (5th grade)"; levelColor = "text-comic-green"; }
        else if (score >= 80) { level = "Easy (6th grade)"; levelColor = "text-comic-green"; }
        else if (score >= 70) { level = "Fairly Easy (7th grade)"; levelColor = "text-comic-blue"; }
        else if (score >= 60) { level = "Standard (8-9th grade)"; levelColor = "text-comic-blue"; }
        else if (score >= 50) { level = "Fairly Difficult (10-12th grade)"; levelColor = "text-comic-orange"; }
        else if (score >= 30) { level = "Difficult (College level)"; levelColor = "text-comic-red"; }
        else { level = "Very Confusing (Professional)"; levelColor = "text-comic-red"; }

        const readingMinutes = Math.ceil(numWords / 200);
        const readingTime = readingMinutes <= 1 ? "< 1 min" : `${readingMinutes} min`;

        setResult({
            fleschKincaid: score,
            gradeLevel: +Math.max(0, gradeLevel).toFixed(1),
            words: numWords,
            sentences: numSentences,
            syllables: totalSyllables,
            avgWordsPerSentence: +avgWPS.toFixed(1),
            avgSyllablesPerWord: +avgSPW.toFixed(2),
            readingTime,
            level,
            levelColor,
        });
    };

    const sampleText = "The quick brown fox jumps over the lazy dog. This is a simple test sentence. Reading is fundamental to learning new things. We hope this tool helps you write better content for your audience. Short sentences are easy to read. Try to aim for a score above 60 for web content.";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📖</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Readability Score Checker</h1>
                <p className="text-muted-foreground font-bold">Check how easy your content is to read</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-foreground">📝 Paste Your Text</label>
                    <button onClick={() => setText(sampleText)} className="text-xs font-bold text-comic-blue hover:underline">Load Sample</button>
                </div>
                <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Paste your article, blog post, or any text here..."
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue resize-none" />
                <button onClick={analyze}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    📖 Check Readability
                </button>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center">
                        <p className="text-sm font-bold text-muted-foreground mb-1">📊 Flesch Reading Ease Score</p>
                        <div className="text-6xl font-black text-comic-blue">{result.fleschKincaid}</div>
                        <p className={`text-lg font-black mt-1 ${result.levelColor}`}>{result.level}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "📝 Words", val: result.words },
                            { label: "📄 Sentences", val: result.sentences },
                            { label: "🔤 Syllables", val: result.syllables },
                            { label: "⏱️ Read Time", val: result.readingTime },
                            { label: "📏 Words/Sentence", val: result.avgWordsPerSentence },
                            { label: "🔡 Syllables/Word", val: result.avgSyllablesPerWord },
                            { label: "🎓 Grade Level", val: result.gradeLevel },
                            { label: "📊 Score /100", val: result.fleschKincaid },
                        ].map((s, i) => (
                            <div key={i} className="bg-card border-4 border-border rounded-2xl p-3 text-center">
                                <div className="text-[10px] font-bold text-muted-foreground">{s.label}</div>
                                <div className="text-lg font-black">{s.val}</div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-5">
                        <h3 className="font-black text-foreground mb-3">💡 Writing Tips</h3>
                        <ul className="space-y-1 text-sm font-bold text-muted-foreground">
                            <li>• Aim for a score of <strong className="text-foreground">60-70</strong> for web content</li>
                            <li>• Use shorter sentences (15-20 words max)</li>
                            <li>• Avoid jargon and complex words</li>
                            <li>• Use active voice instead of passive</li>
                            <li>• Break long paragraphs into smaller ones</li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Readability Score Checker — Flesch Reading Ease</h2>
                <p>Check the <strong>readability of your content</strong> using the Flesch Reading Ease and Flesch-Kincaid Grade Level formulas. Get sentence stats, syllable count, reading time, and actionable writing tips. Perfect for SEO writers, bloggers, and content creators.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: readability score checker, flesch reading ease, readability analyzer, content readability test, grade level checker, writing clarity tool.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default ReadabilityScoreChecker;
