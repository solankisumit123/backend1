import { useState } from "react";
import { ArrowLeft, Copy, Check, RefreshCw, Lock, Unlock } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

const generatePalette = (baseH: number, scheme: string): string[] => {
    const colors: string[] = [];
    switch (scheme) {
        case "analogous":
            for (let i = -2; i <= 2; i++) colors.push(hslToHex((baseH + i * 30 + 360) % 360, 70, 55));
            break;
        case "complementary":
            colors.push(hslToHex(baseH, 70, 45), hslToHex(baseH, 70, 55), hslToHex(baseH, 50, 70),
                hslToHex((baseH + 180) % 360, 70, 55), hslToHex((baseH + 180) % 360, 70, 45));
            break;
        case "triadic":
            [0, 120, 240].forEach(off => {
                colors.push(hslToHex((baseH + off) % 360, 70, 50));
                if (colors.length < 5) colors.push(hslToHex((baseH + off) % 360, 50, 70));
            });
            break;
        case "split-complementary":
            colors.push(hslToHex(baseH, 70, 50), hslToHex(baseH, 50, 70),
                hslToHex((baseH + 150) % 360, 70, 50), hslToHex((baseH + 210) % 360, 70, 50),
                hslToHex((baseH + 180) % 360, 40, 65));
            break;
        case "monochromatic":
            for (let i = 0; i < 5; i++) colors.push(hslToHex(baseH, 60 + i * 5, 30 + i * 12));
            break;
        default: // random
            for (let i = 0; i < 5; i++) colors.push(hslToHex(Math.floor(Math.random() * 360), 50 + Math.floor(Math.random() * 30), 40 + Math.floor(Math.random() * 30)));
    }
    return colors.slice(0, 5);
};

const ColorPaletteGenerator = () => {
    const [baseHue, setBaseHue] = useState(220);
    const [scheme, setScheme] = useState("analogous");
    const [colors, setColors] = useState<string[]>(() => generatePalette(220, "analogous"));
    const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);
    const [copied, setCopied] = useState<number | null>(null);

    const generate = () => {
        const newColors = generatePalette(baseHue, scheme);
        setColors(prev => prev.map((c, i) => locked[i] ? c : newColors[i]));
    };

    const randomize = () => {
        const h = Math.floor(Math.random() * 360);
        setBaseHue(h);
        const newColors = generatePalette(h, scheme);
        setColors(prev => prev.map((c, i) => locked[i] ? c : newColors[i]));
    };

    const copy = (color: string, idx: number) => {
        navigator.clipboard.writeText(color);
        setCopied(idx);
        setTimeout(() => setCopied(null), 1200);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(colors.join(", "));
        setCopied(-1);
        setTimeout(() => setCopied(null), 1200);
    };

    const toggleLock = (i: number) => setLocked(prev => prev.map((v, j) => j === i ? !v : v));

    const schemes = ["analogous", "complementary", "triadic", "split-complementary", "monochromatic", "random"];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🎨</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Color Palette Generator</h1>
                <p className="text-muted-foreground font-bold">Generate beautiful, harmonious color palettes</p>
            </div>

            {/* Palette Display */}
            <div className="flex rounded-2xl overflow-hidden border-4 border-border mb-6 shadow-lg" style={{ height: 160 }}>
                {colors.map((c, i) => (
                    <div key={i} className="flex-1 relative group cursor-pointer" style={{ background: c }} onClick={() => copy(c, i)}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <span className="text-white font-black text-sm drop-shadow">{c.toUpperCase()}</span>
                            {copiedIdx(i) ? <Check className="w-5 h-5 text-white mt-1" /> : <Copy className="w-4 h-4 text-white mt-1" />}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleLock(i); }}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 rounded bg-black/40 text-white hover:bg-black/60">
                            {locked[i] ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🎯 Color Scheme</label>
                    <div className="flex flex-wrap gap-2">
                        {schemes.map(s => (
                            <button key={s} onClick={() => { setScheme(s); }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors capitalize ${scheme === s ? "bg-comic-purple text-white border-comic-purple" : "bg-muted border-border hover:bg-comic-purple/20"}`}>
                                {s.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🔵 Base Hue: {baseHue}°</label>
                    <input type="range" min="0" max="360" value={baseHue} onChange={e => setBaseHue(+e.target.value)}
                        className="w-full" style={{ accentColor: hslToHex(baseHue, 70, 50) }} />
                </div>
                <div className="flex gap-3">
                    <button onClick={generate} className="flex-1 bg-comic-purple hover:bg-comic-purple/90 text-white font-black py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                        🎨 Generate
                    </button>
                    <button onClick={randomize} className="flex-1 bg-comic-orange hover:bg-comic-orange/90 text-white font-black py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Random
                    </button>
                    <button onClick={copyAll} className={`flex-1 font-black py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${copied === -1 ? "bg-comic-green text-white" : "bg-comic-blue text-white hover:bg-comic-blue/90"}`}>
                        {copied === -1 ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy All</>}
                    </button>
                </div>
            </div>

            {/* Color cards */}
            <div className="grid grid-cols-5 gap-2 mb-6">
                {colors.map((c, i) => (
                    <div key={i} className="bg-card border-4 border-border rounded-xl p-2 text-center">
                        <div className="w-full h-12 rounded-lg mb-2 border-2 border-border" style={{ background: c }} />
                        <div className="text-xs font-black text-foreground">{c.toUpperCase()}</div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Color Palette Generator — Create Harmonious Colors</h2>
                <p>Generate stunning <strong>color palettes</strong> using color theory. Choose from analogous, complementary, triadic, split-complementary, and monochromatic schemes. Lock colors you like and regenerate to find the perfect combination. Great for UI designers, web developers, and artists.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: color palette generator, color scheme generator, colour combinations, complementary colors, analogous colors, hex color palette, ui design colors.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );

    function copiedIdx(i: number) { return copied === i; }
};
export default ColorPaletteGenerator;
