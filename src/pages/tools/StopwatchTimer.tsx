import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StopwatchTimer = () => {
    const [tab, setTab] = useState<"stopwatch" | "timer" | "countdown">("stopwatch");

    // Stopwatch
    const [swTime, setSwTime] = useState(0);
    const [swRunning, setSwRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const swRef = useRef<NodeJS.Timeout | null>(null);

    // Timer (countdown)
    const [timerH, setTimerH] = useState("0");
    const [timerM, setTimerM] = useState("5");
    const [timerS, setTimerS] = useState("0");
    const [timerLeft, setTimerLeft] = useState<number | null>(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerDone, setTimerDone] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Stopwatch logic
    useEffect(() => {
        if (swRunning) {
            swRef.current = setInterval(() => setSwTime(t => t + 10), 10);
        } else if (swRef.current) clearInterval(swRef.current);
        return () => { if (swRef.current) clearInterval(swRef.current); };
    }, [swRunning]);

    // Timer logic
    useEffect(() => {
        if (timerRunning && timerLeft !== null && timerLeft > 0) {
            timerRef.current = setInterval(() => setTimerLeft(t => (t ?? 0) - 1), 1000);
        } else if (timerRunning && timerLeft === 0) {
            setTimerRunning(false);
            setTimerDone(true);
        } else if (timerRef.current) clearInterval(timerRef.current);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [timerRunning, timerLeft]);

    const fmt = (ms: number) => {
        const h = Math.floor(ms / 3600000);
        const m = Math.floor((ms % 3600000) / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        const cs = Math.floor((ms % 1000) / 10);
        if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
    };

    const fmtSec = (s: number) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    const startTimer = () => {
        const total = parseInt(timerH) * 3600 + parseInt(timerM) * 60 + parseInt(timerS);
        if (total <= 0) return;
        setTimerLeft(total);
        setTimerRunning(true);
        setTimerDone(false);
    };

    const timerPercent = timerLeft !== null
        ? (1 - timerLeft / (parseInt(timerH) * 3600 + parseInt(timerM) * 60 + parseInt(timerS))) * 100
        : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⏱️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Stopwatch & Timer</h1>
                <p className="text-muted-foreground font-bold">Online stopwatch with lap times & countdown timer</p>
            </div>

            {/* Tab Switch */}
            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6">
                {(["stopwatch", "timer"] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`flex-1 py-3 font-bold text-sm capitalize transition-colors ${tab === t ? "bg-comic-blue text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
                        {t === "stopwatch" ? "⏱️ Stopwatch" : "⏳ Countdown Timer"}
                    </button>
                ))}
            </div>

            {/* STOPWATCH */}
            {tab === "stopwatch" && (
                <div className="bg-card border-4 border-border rounded-2xl p-8 text-center shadow-lg">
                    <div className={`text-6xl font-black mb-6 font-mono transition-colors ${swRunning ? "text-comic-blue" : "text-foreground"}`}>
                        {fmt(swTime)}
                    </div>
                    <div className="flex gap-3 justify-center mb-6">
                        <button onClick={() => setSwRunning(r => !r)}
                            className={`px-8 py-3 rounded-xl font-black text-white text-lg transition-all hover:scale-105 active:scale-95 shadow ${swRunning ? "bg-comic-red" : "bg-comic-green"}`}>
                            {swRunning ? "⏸ Pause" : swTime > 0 ? "▶ Resume" : "▶ Start"}
                        </button>
                        {swRunning && (
                            <button onClick={() => setLaps(l => [swTime, ...l])}
                                className="px-6 py-3 rounded-xl font-black bg-comic-orange text-white text-lg hover:scale-105 active:scale-95 shadow">
                                🏁 Lap
                            </button>
                        )}
                        {!swRunning && swTime > 0 && (
                            <button onClick={() => { setSwTime(0); setLaps([]); }}
                                className="px-6 py-3 rounded-xl font-black bg-muted text-foreground text-lg hover:scale-105 active:scale-95">
                                🔄 Reset
                            </button>
                        )}
                    </div>

                    {laps.length > 0 && (
                        <div className="text-left max-h-52 overflow-y-auto space-y-2">
                            {laps.map((lap, i) => (
                                <div key={i} className="flex justify-between items-center bg-muted rounded-xl px-4 py-2">
                                    <span className="font-bold text-muted-foreground">Lap {laps.length - i}</span>
                                    <span className="font-black text-foreground font-mono">{fmt(lap)}</span>
                                    {i > 0 && <span className="font-bold text-comic-blue text-sm">+{fmt(lap - laps[i - 1])}</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* COUNTDOWN TIMER */}
            {tab === "timer" && (
                <div className="bg-card border-4 border-border rounded-2xl p-8 text-center shadow-lg">
                    {timerLeft === null || !timerRunning && !timerDone ? (
                        <>
                            <p className="font-bold text-muted-foreground mb-4">Set your countdown time</p>
                            <div className="flex gap-3 justify-center mb-6">
                                {[{ val: timerH, set: setTimerH, label: "HH" }, { val: timerM, set: setTimerM, label: "MM" }, { val: timerS, set: setTimerS, label: "SS" }].map(({ val, set, label }) => (
                                    <div key={label} className="text-center">
                                        <input type="number" value={val} onChange={e => set(e.target.value)} min="0" max={label === "HH" ? "99" : "59"}
                                            className="w-20 text-4xl font-black text-center border-4 border-border rounded-xl py-3 bg-background text-foreground focus:outline-none focus:border-comic-blue" />
                                        <div className="text-xs font-bold text-muted-foreground mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {[["1 min", 0, 1, 0], ["5 min", 0, 5, 0], ["10 min", 0, 10, 0], ["25 min", 0, 25, 0], ["1 hour", 1, 0, 0]].map(([l, h, m, s]) => (
                                    <button key={String(l)} onClick={() => { setTimerH(String(h)); setTimerM(String(m)); setTimerS(String(s)); }}
                                        className="px-4 py-2 bg-muted hover:bg-comic-blue hover:text-white rounded-xl font-bold text-sm transition-colors border-2 border-border">
                                        ⚡ {l}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Progress ring */}
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className={timerDone ? "text-comic-green" : "text-comic-blue"}
                                        strokeDasharray={`${2 * Math.PI * 45}`} strokeDashoffset={`${2 * Math.PI * 45 * (1 - timerPercent / 100)}`} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`text-3xl font-black font-mono ${timerDone ? "text-comic-green" : "text-foreground"}`}>
                                        {timerDone ? "✅ Done!" : fmtSec(timerLeft ?? 0)}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex gap-3 justify-center">
                        {!timerRunning && timerLeft === null && (
                            <button onClick={startTimer} className="px-8 py-3 rounded-xl font-black bg-comic-blue text-white text-lg hover:scale-105 active:scale-95 shadow">
                                ▶ Start Timer
                            </button>
                        )}
                        {timerRunning && (
                            <button onClick={() => setTimerRunning(false)} className="px-8 py-3 rounded-xl font-black bg-comic-red text-white text-lg hover:scale-105 active:scale-95">
                                ⏸ Pause
                            </button>
                        )}
                        {!timerRunning && timerLeft !== null && timerLeft > 0 && (
                            <button onClick={() => setTimerRunning(true)} className="px-8 py-3 rounded-xl font-black bg-comic-green text-white text-lg hover:scale-105 active:scale-95">
                                ▶ Resume
                            </button>
                        )}
                        {timerLeft !== null && (
                            <button onClick={() => { setTimerLeft(null); setTimerRunning(false); setTimerDone(false); }}
                                className="px-6 py-3 rounded-xl font-black bg-muted text-foreground text-lg hover:scale-105 active:scale-95">
                                🔄 Reset
                            </button>
                        )}
                    </div>
</div>
            )}

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default StopwatchTimer;
