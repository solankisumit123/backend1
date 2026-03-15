import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, ArrowRightLeft } from "lucide-react";

const URLEncoderDecoder = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const process = () => {
        try {
            if (mode === "encode") {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
            setError("");
        } catch {
            setError("Invalid input for " + mode);
            setOutput("");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔗 URL Encoder / Decoder</h1>

            <div className="comic-card mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Input</label>
                    <button onClick={() => { setMode(mode === "encode" ? "decode" : "encode"); setInput(output); setOutput(""); setError(""); }} className="comic-btn text-xs bg-card text-foreground flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3" strokeWidth={3} /> Swap
                    </button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter URL or text to encode..." : "Enter encoded URL to decode..."} className="comic-input font-mono text-sm w-full" rows={4} />
            </div>

            <div className="flex gap-3 justify-center mb-4">
                <button onClick={() => { setMode("encode"); process(); }} className={`comic-btn flex items-center gap-2 ${mode === "encode" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`} >
                    🔒 Encode
                </button>
                <button onClick={() => { setMode("decode"); process(); }} className={`comic-btn flex items-center gap-2 ${mode === "decode" ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}>
                    🔓 Decode
                </button>
            </div>

            {error && (
                <div className="comic-card bg-destructive/10 mb-4" style={{ border: "2px solid hsl(var(--destructive))" }}>
                    <p className="text-sm font-bold text-destructive">❌ {error}</p>
                </div>
            )}

            {output && (
                <div className="comic-card animate-slide-up">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Output</label>
                        <button onClick={handleCopy} className="comic-btn text-xs bg-card text-foreground flex items-center gap-1">
                            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                    <textarea value={output} readOnly className="comic-input font-mono text-sm w-full bg-background/50" rows={4} />
</div>
            )}

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default URLEncoderDecoder;
