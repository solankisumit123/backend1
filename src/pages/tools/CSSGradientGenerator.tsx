import { useState } from "react";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const CSSGradientGenerator = () => {
    const [color1, setColor1] = useState("#667eea");
    const [color2, setColor2] = useState("#764ba2");
    const [angle, setAngle] = useState(135);
    const [type, setType] = useState<"linear" | "radial">("linear");
    const [copied, setCopied] = useState(false);

    const gradient = type === "linear"
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;

    const css = `background: ${gradient};`;

    const copy = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    const randomize = () => {
        setColor1(randomColor());
        setColor2(randomColor());
        setAngle(Math.floor(Math.random() * 360));
    };

    const presets = [
        { c1: "#667eea", c2: "#764ba2", name: "Purple Haze" },
        { c1: "#f093fb", c2: "#f5576c", name: "Pink Sunset" },
        { c1: "#4facfe", c2: "#00f2fe", name: "Ocean Blue" },
        { c1: "#43e97b", c2: "#38f9d7", name: "Fresh Mint" },
        { c1: "#fa709a", c2: "#fee140", name: "Warm Glow" },
        { c1: "#a18cd1", c2: "#fbc2eb", name: "Lavender" },
        { c1: "#ffecd2", c2: "#fcb69f", name: "Peach" },
        { c1: "#ff9a9e", c2: "#fecfef", name: "Rose" },
        { c1: "#0c3483", c2: "#a2b6df", name: "Deep Blue" },
        { c1: "#f43b47", c2: "#453a94", name: "Ultraviolet" },
        { c1: "#00c6fb", c2: "#005bea", name: "Sky Blue" },
        { c1: "#fc5c7d", c2: "#6a82fb", name: "Instagram" },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🎨</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">CSS Gradient Generator</h1>
                <p className="text-muted-foreground font-bold">Create beautiful CSS gradients with live preview</p>
            </div>

            {/* Preview */}
            <div className="mb-6 rounded-2xl border-4 border-border overflow-hidden shadow-lg" style={{ height: 200, background: gradient }} />

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div className="flex rounded-xl overflow-hidden border-2 border-border">
                    {(["linear", "radial"] as const).map(t => (
                        <button key={t} onClick={() => setType(t)}
                            className={`flex-1 py-2 font-bold text-sm transition-colors ${type === t ? "bg-comic-purple text-white" : "bg-background text-muted-foreground"}`}>
                            {t === "linear" ? "↗️ Linear" : "🎯 Radial"}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🎨 Color 1</label>
                        <div className="flex gap-2 items-center">
                            <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer" />
                            <input type="text" value={color1} onChange={e => setColor1(e.target.value)}
                                className="flex-1 border-2 border-border rounded-lg px-3 py-2 bg-background text-foreground font-mono text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🎨 Color 2</label>
                        <div className="flex gap-2 items-center">
                            <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer" />
                            <input type="text" value={color2} onChange={e => setColor2(e.target.value)}
                                className="flex-1 border-2 border-border rounded-lg px-3 py-2 bg-background text-foreground font-mono text-sm" />
                        </div>
                    </div>
                </div>

                {type === "linear" && (
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📐 Angle: {angle}°</label>
                        <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)}
                            className="w-full accent-comic-purple" />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                                <button key={a} onClick={() => setAngle(a)}
                                    className={`px-2 py-1 rounded-lg text-xs font-bold border-2 transition-colors ${angle === a ? "bg-comic-purple text-white border-comic-purple" : "bg-muted border-border"}`}>
                                    {a}°
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    <button onClick={randomize} className="flex-1 bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Random
                    </button>
                    <button onClick={copy} className={`flex-1 font-black py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${copied ? "bg-comic-green text-white" : "bg-comic-purple text-white hover:bg-comic-purple/90"}`}>
                        {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy CSS</>}
                    </button>
                </div>
            </div>

            {/* CSS Output */}
            <div className="bg-card border-4 border-border rounded-2xl p-4 mb-6">
                <span className="text-sm font-black text-foreground mb-2 block">📋 CSS Code</span>
                <pre className="bg-background border-2 border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground overflow-x-auto">{css}</pre>
            </div>

            {/* Presets */}
            <div className="bg-card border-4 border-border rounded-2xl p-5 mb-6">
                <h3 className="font-black text-foreground mb-3">⚡ Presets</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {presets.map((p, i) => (
                        <button key={i} onClick={() => { setColor1(p.c1); setColor2(p.c2); }}
                            className="rounded-xl border-2 border-border overflow-hidden hover:scale-[1.05] transition-transform">
                            <div className="h-12" style={{ background: `linear-gradient(135deg, ${p.c1}, ${p.c2})` }} />
                            <div className="text-[10px] font-bold p-1 text-center text-muted-foreground">{p.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">CSS Gradient Generator — Free Online Tool</h2>
                <p>Create beautiful <strong>CSS gradients</strong> with our visual gradient generator. Choose colors, adjust angle, pick presets, and copy the CSS code. Supports both linear and radial gradients.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: css gradient generator, linear gradient maker, radial gradient, background gradient css, gradient color picker, css gradient tool online.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default CSSGradientGenerator;
