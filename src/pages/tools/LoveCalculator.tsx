import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const calcLove = (a: string, b: string) => {
    const str = (a + b).toLowerCase().replace(/\s/g, "");
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
    return Math.abs(hash % 41) + 60; // 60–100 range for fun
};

const getMessage = (score: number) => {
    if (score >= 95) return { msg: "Perfect Match! 💍 You two are made for each other!", color: "text-pink-500" };
    if (score >= 85) return { msg: "Amazing Chemistry! ❤️ Great compatibility!", color: "text-red-500" };
    if (score >= 75) return { msg: "Good Match! 💕 You have a strong connection.", color: "text-orange-500" };
    if (score >= 65) return { msg: "Decent Match! 💛 With effort, it can work!", color: "text-yellow-500" };
    return { msg: "Challenging! 💙 Opposites attract, right?", color: "text-blue-500" };
};

const LoveCalculator = () => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [result, setResult] = useState<null | { score: number; msg: string; color: string }>(null);
    const [hearts, setHearts] = useState<number[]>([]);

    const calculate = () => {
        if (!name1.trim() || !name2.trim()) return;
        const score = calcLove(name1, name2);
        const { msg, color } = getMessage(score);
        setResult({ score, msg, color });
        setHearts(Array.from({ length: 12 }, (_, i) => i));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-6xl mb-3 animate-bounce">❤️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Love Calculator</h1>
                <p className="text-muted-foreground font-bold">Find your love compatibility score!</p>
            </div>

            <div className="bg-card border-4 border-pink-300 rounded-2xl p-6 shadow-lg mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💁 Your Name</label>
                        <input value={name1} onChange={e => setName1(e.target.value)} placeholder="Enter your name..."
                            className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-pink-400 transition-colors text-lg" />
                    </div>
                    <div className="text-center text-3xl font-black text-pink-400">💗</div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">💁 Partner's Name</label>
                        <input value={name2} onChange={e => setName2(e.target.value)} placeholder="Enter partner's name..."
                            className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-pink-400 transition-colors text-lg"
                            onKeyDown={e => e.key === "Enter" && calculate()} />
                    </div>
                    <button onClick={calculate}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md">
                        ❤️ Calculate Love
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-card border-4 border-pink-400 rounded-2xl p-8 text-center shadow-xl animate-fade-in">
                    {/* Hearts animation */}
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {hearts.slice(0, Math.round(result.score / 100 * 12)).map(i => (
                            <span key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>❤️</span>
                        ))}
                        {hearts.slice(Math.round(result.score / 100 * 12)).map(i => (
                            <span key={i} className="text-2xl opacity-20">🤍</span>
                        ))}
                    </div>

                    <div className="text-lg font-bold text-muted-foreground mb-2">{name1} ❤️ {name2}</div>

                    {/* Score Circle */}
                    <div className="relative w-40 h-40 mx-auto mb-4">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#fce7f3" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#ec4899" strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - result.score / 100)}`}
                                strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-5xl font-black text-pink-500">{result.score}%</div>
                        </div>
                    </div>

                    <p className={`text-xl font-black ${result.color} mb-4`}>{result.msg}</p>

                    <button onClick={() => { setResult(null); setName1(""); setName2(""); }}
                        className="px-6 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold rounded-xl transition-colors">
                        Try Again 🔄
                    </button>
</div>
            )}

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default LoveCalculator;
