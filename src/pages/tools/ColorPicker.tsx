import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";

const ColorPicker = () => {
    const [hex, setHex] = useState("#4285F4");
    const [copied, setCopied] = useState("");

    const hexToRGB = (h: string) => {
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return { r, g, b };
    };

    const rgbToHSL = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);

    const formats = [
        { label: "HEX", value: hex.toUpperCase() },
        { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    ];

    const presets = [
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD",
        "#FF9FF3", "#54A0FF", "#5F27CD", "#01A3A4", "#F368E0", "#FF6348",
        "#2ED573", "#1E90FF", "#FF4757", "#7BED9F", "#70A1FF", "#FFA502",
    ];

    const handleCopy = (val: string, label: string) => {
        navigator.clipboard.writeText(val);
        setCopied(label);
        setTimeout(() => setCopied(""), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🎨 Color Picker</h1>

            <div className="comic-card mb-6">
                {/* Color preview */}
                <div className="w-full h-40 rounded-xl mb-4" style={{ backgroundColor: hex, border: "3px solid hsl(var(--border))" }}></div>

                {/* Color input */}
                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="color"
                        value={hex}
                        onChange={(e) => setHex(e.target.value)}
                        className="w-16 h-12 rounded-lg cursor-pointer"
                        style={{ border: "3px solid hsl(var(--border))" }}
                    />
                    <input
                        type="text"
                        value={hex}
                        onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setHex(e.target.value); }}
                        className="comic-input flex-1 font-mono text-lg"
                        maxLength={7}
                    />
                </div>

                {/* Color formats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {formats.map((f) => (
                        <div key={f.label} className="flex items-center gap-2 p-3 rounded-lg bg-background/50" style={{ border: "2px solid hsl(var(--border))" }}>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase">{f.label}</p>
                                <p className="font-mono font-bold text-sm text-foreground">{f.value}</p>
                            </div>
                            <button onClick={() => handleCopy(f.value, f.label)} className="p-2 hover:bg-muted/50 rounded-lg">
                                {copied === f.label ? <CheckCircle className="w-4 h-4 text-secondary" strokeWidth={3} /> : <Copy className="w-4 h-4 text-muted-foreground" strokeWidth={3} />}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Presets */}
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                    {presets.map((c) => (
                        <button
                            key={c}
                            onClick={() => setHex(c)}
                            className="w-9 h-9 rounded-lg hover:scale-110 transition-transform"
                            style={{ backgroundColor: c, border: hex === c ? "3px solid hsl(var(--foreground))" : "2px solid hsl(var(--border))" }}
                            title={c}
                        />
                    ))}
                </div>
            </div>

            {/* ── AD BANNERS ── */}
            
            

        </div>
    );
};

export default ColorPicker;
