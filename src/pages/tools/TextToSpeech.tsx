import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, Volume2, Square } from "lucide-react";

const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [speaking, setSpeaking] = useState(false);
    const [voiceIdx, setVoiceIdx] = useState(0);

    const voices = typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis.getVoices() : [];

    const speak = () => {
        if (!text.trim()) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;
        if (voices[voiceIdx]) utterance.voice = voices[voiceIdx];
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔊 Text to Speech</h1>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Enter Text</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type anything to hear it spoken..." className="comic-input w-full" rows={6} />

                {voices.length > 0 && (
                    <div className="mt-4">
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Voice</label>
                        <select value={voiceIdx} onChange={(e) => setVoiceIdx(Number(e.target.value))} className="comic-input w-full">
                            {voices.map((v, i) => (
                                <option key={i} value={i}>{v.name} ({v.lang})</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Speed: {rate}x</label>
                        <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Pitch: {pitch}</label>
                        <input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
                    </div>
                </div>

                <div className="flex gap-3 mt-4">
                    <button onClick={speak} disabled={speaking || !text.trim()} className="comic-btn bg-primary text-primary-foreground flex-1 flex items-center justify-center gap-2">
                        <Volume2 className="w-5 h-5" strokeWidth={3} /> {speaking ? "Speaking..." : "Speak"}
                    </button>
                    {speaking && (
                        <button onClick={stop} className="comic-btn bg-destructive text-destructive-foreground flex items-center gap-2">
                            <Square className="w-5 h-5" strokeWidth={3} /> Stop
                        </button>
                    )}
                </div>
            </div>

            <div className="comic-card text-center">
                <p className="text-sm text-muted-foreground font-bold">🎯 Characters: {text.length} | Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</p>
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default TextToSpeech;
