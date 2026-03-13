import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const TEXTS = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect and typing gets faster with time.",
    "Technology is best when it brings people together. Keep typing and improving your speed every day.",
    "Success is not final failure is not fatal it is the courage to continue that counts in life.",
    "The only way to do great work is to love what you do. If you have not found it yet keep looking.",
    "In the middle of difficulty lies opportunity. Hard work and dedication always lead to success.",
];

const TypingSpeedTest = () => {
    const [text] = useState(() => TEXTS[Math.floor(Math.random() * TEXTS.length)]);
    const [typed, setTyped] = useState("");
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const calcStats = useCallback((t: string) => {
        const words = t.trim().split(/\s+/).filter(Boolean).length;
        const elapsed = (60 - timeLeft) || 1;
        const wpmVal = Math.round((words / elapsed) * 60);
        let errCount = 0;
        for (let i = 0; i < t.length; i++) { if (t[i] !== text[i]) errCount++; }
        const acc = t.length > 0 ? Math.max(0, Math.round(((t.length - errCount) / t.length) * 100)) : 100;
        setWpm(wpmVal);
        setAccuracy(acc);
        setErrors(errCount);
    }, [timeLeft, text]);

    useEffect(() => {
        if (started && !finished) {
            timerRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        setFinished(true);
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [started, finished]);

    const handleType = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        if (!started) setStarted(true);
        if (finished) return;
        setTyped(val);
        calcStats(val);
        if (val === text) { setFinished(true); if (timerRef.current) clearInterval(timerRef.current); }
    };

    const reset = () => {
        setTyped(""); setStarted(false); setFinished(false);
        setTimeLeft(60); setWpm(0); setAccuracy(100); setErrors(0);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const getCharClass = (i: number) => {
        if (i >= typed.length) return "text-muted-foreground";
        return typed[i] === text[i] ? "text-green-500" : "bg-red-200 text-red-600 rounded";
    };

    const timerColor = timeLeft <= 10 ? "text-red-500" : timeLeft <= 30 ? "text-yellow-500" : "text-comic-blue";

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⌨️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Typing Speed Test</h1>
                <p className="text-muted-foreground font-bold">Test your WPM (Words Per Minute) typing speed!</p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                    { label: "⏱️ Time", val: `${timeLeft}s`, color: timerColor },
                    { label: "🚀 WPM", val: String(wpm), color: "text-comic-green" },
                    { label: "🎯 Accuracy", val: `${accuracy}%`, color: "text-comic-orange" },
                    { label: "❌ Errors", val: String(errors), color: "text-comic-red" },
                ].map(({ label, val, color }) => (
                    <div key={label} className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                        <div className={`text-2xl font-black ${color}`}>{val}</div>
                        <div className="text-xs font-bold text-muted-foreground">{label}</div>
                    </div>
                ))}
            </div>

            {/* Text Display */}
            <div className="bg-card border-4 border-border rounded-2xl p-5 mb-4 font-mono text-lg leading-relaxed">
                {text.split("").map((char, i) => (
                    <span key={i} className={`${getCharClass(i)} ${i === typed.length ? "border-b-2 border-comic-blue" : ""}`}>
                        {char}
                    </span>
                ))}
            </div>

            {/* Input */}
            {!finished ? (
                <textarea ref={inputRef} value={typed} onChange={handleType}
                    placeholder="Start typing here... Timer starts automatically!"
                    className="w-full h-24 border-4 border-border rounded-2xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors resize-none text-lg"
                    disabled={finished} autoFocus />
            ) : (
                <div className="bg-card border-4 border-comic-green rounded-2xl p-8 text-center animate-fade-in">
                    <div className="text-5xl mb-4">🏆</div>
                    <h3 className="text-2xl font-black text-foreground mb-4">Test Complete!</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-muted rounded-xl p-4"><div className="text-3xl font-black text-comic-green">{wpm}</div><div className="text-sm font-bold text-muted-foreground">WPM</div></div>
                        <div className="bg-muted rounded-xl p-4"><div className="text-3xl font-black text-comic-orange">{accuracy}%</div><div className="text-sm font-bold text-muted-foreground">Accuracy</div></div>
                        <div className="bg-muted rounded-xl p-4"><div className="text-3xl font-black text-comic-red">{errors}</div><div className="text-sm font-bold text-muted-foreground">Errors</div></div>
                    </div>
                    <div className="text-lg font-bold text-muted-foreground mb-4">
                        {wpm >= 70 ? "🌟 Expert Typist!" : wpm >= 50 ? "💪 Above Average!" : wpm >= 30 ? "👍 Average Typist" : "🎯 Keep Practicing!"}
                    </div>
                    <button onClick={reset} className="px-8 py-3 bg-comic-blue text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-transform">
                        🔄 Try Again
                    </button>
                </div>
            )}

            {/* Speed guide */}
            {!started && !finished && (
                <div className="mt-6 bg-card border-4 border-border rounded-2xl p-5">
                    <h3 className="font-black text-foreground mb-3">📊 WPM Speed Guide</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {[["🐢 Beginner", "< 20 WPM"], ["👶 Slow", "20–35 WPM"], ["👍 Average", "35–50 WPM"], ["💪 Good", "50–70 WPM"], ["🚀 Fast", "70–90 WPM"], ["⚡ Expert", "90+ WPM"]].map(([l, v]) => (
                            <div key={String(l)} className="flex justify-between bg-muted rounded-lg px-3 py-2">
                                <span className="font-bold">{l}</span><span className="text-muted-foreground font-bold">{v}</span>
                            </div>
                        ))}
                    </div>
</div>
            )}

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3225557692" dataAdFormat="auto" />
      <AdBanner dataAdSlot="3225557692" dataAdFormat="rectangle" />

        </div>
    );
};
export default TypingSpeedTest;
