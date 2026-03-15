import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const ColorPaletteFromImage = () => {
    const [colors] = useState([
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
        "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#82E0AA"
    ]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-4">
                <p className="text-muted-foreground font-bold">For color palette generation, please use:</p>
                <Link to="/tools/color-palette" className="inline-block mt-2 px-6 py-3 bg-comic-blue text-white font-bold rounded-xl hover:bg-comic-blue/90">
                    → Go to Color Palette Generator
                </Link>
            </div>
        </div>
    );
};

// Main Favicon Generator
const FaviconGenerator = () => {
    const [text, setText] = useState("");
    const [bg, setBg] = useState("#4A90D9");
    const [textColor, setTextColor] = useState("#FFFFFF");
    const [shape, setShape] = useState("square");
    const [preview, setPreview] = useState(false);

    const getInitials = (t: string) => t.trim().slice(0, 2).toUpperCase() || "FV";
    const initials = getInitials(text);

    const downloadFavicon = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(32, 32, 32, 0, Math.PI * 2);
            ctx.fillStyle = bg;
            ctx.fill();
        } else if (shape === "rounded") {
            const r = 16;
            ctx.beginPath();
            ctx.moveTo(r, 0); ctx.lineTo(64 - r, 0);
            ctx.arcTo(64, 0, 64, r, r);
            ctx.lineTo(64, 64 - r);
            ctx.arcTo(64, 64, 64 - r, 64, r);
            ctx.lineTo(r, 64);
            ctx.arcTo(0, 64, 0, 64 - r, r);
            ctx.lineTo(0, r);
            ctx.arcTo(0, 0, r, 0, r);
            ctx.closePath();
            ctx.fillStyle = bg;
            ctx.fill();
        } else {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, 64, 64);
        }
        ctx.fillStyle = textColor;
        ctx.font = "bold 28px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials, 32, 32);
        const link = document.createElement("a");
        link.download = "favicon.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⭐</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Favicon Generator</h1>
                <p className="text-muted-foreground font-bold">Create a custom favicon for your website in seconds</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">✏️ Text / Initials (1-2 characters)</label>
                    <input value={text} onChange={e => setText(e.target.value)} maxLength={2} placeholder="e.g. WP"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple text-2xl text-center" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🎨 Background Color</label>
                        <div className="flex gap-2">
                            <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="h-12 w-16 rounded-lg border-2 border-border cursor-pointer" />
                            <input value={bg} onChange={e => setBg(e.target.value)} className="flex-1 border-2 border-border rounded-xl px-3 py-2 bg-background font-bold text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">🔤 Text Color</label>
                        <div className="flex gap-2">
                            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="h-12 w-16 rounded-lg border-2 border-border cursor-pointer" />
                            <input value={textColor} onChange={e => setTextColor(e.target.value)} className="flex-1 border-2 border-border rounded-xl px-3 py-2 bg-background font-bold text-sm" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">⬜ Shape</label>
                    <div className="grid grid-cols-3 gap-2">
                        {["square", "rounded", "circle"].map(s => (
                            <button key={s} onClick={() => setShape(s)} className={`py-2 rounded-xl font-bold capitalize text-sm ${shape === s ? "bg-comic-purple text-white" : "bg-muted"}`}>{s}</button>
                        ))}
                    </div>
                </div>

                {/* Live Preview */}
                <div className="flex items-center justify-center gap-6 py-4">
                    {[16, 32, 64].map(size => (
                        <div key={size} className="text-center">
                            <div className={`flex items-center justify-center font-black text-white mx-auto`}
                                style={{
                                    width: size, height: size,
                                    backgroundColor: bg, color: textColor,
                                    borderRadius: shape === "circle" ? "50%" : shape === "rounded" ? "25%" : "0",
                                    fontSize: Math.max(size / 3, 8)
                                }}>
                                {initials}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{size}px</p>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button onClick={() => setPreview(!preview)} className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold py-3 rounded-xl">
                        👁️ Quick Presets
                    </button>
                    <button onClick={downloadFavicon} className="flex-1 bg-comic-purple hover:bg-comic-purple/90 text-white font-bold py-3 rounded-xl">
                        ⬇️ Download Favicon
                    </button>
                </div>

                {preview && (
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["#4A90D9", "#E84393", "#27AE60", "#F39C12", "#8E44AD", "#E74C3C", "#1ABC9C", "#2C3E50"].map(c => (
                            <div key={c} onClick={() => setBg(c)} className="flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer border-2 border-border hover:scale-110 transition-transform font-black text-white text-xs"
                                style={{ backgroundColor: c, color: textColor }}>{initials}</div>
                        ))}
                    </div>
                )}
            </div>

            <SEOHead title="Favicon Generator - Create Website Favicon Online Free" description="Create custom favicons for your website instantly. Generate 16x16, 32x32, and 64x64 favicons with custom text, colors, and shapes." keywords="favicon generator, create favicon, favicon maker, website favicon, ico generator" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Favicon Generator", "applicationCategory": "DesignApplication" }} />
            <div className="my-8"></div>
            <SEOSection title="Favicon Generator" subtitle="Create Professional Favicons Instantly" description="A favicon (favorites icon) is the small icon displayed in browser tabs and bookmarks. Our generator lets you create custom text-based favicons without any design skills." howToUse={["Enter your brand initials (1-2 letters)", "Choose background and text colors", "Select shape (square, rounded, or circle)", "Preview at different sizes", "Click Download Favicon (PNG)"]} features={["Live Preview at 16/32/64px", "Custom Colors", "3 Shape Options", "Color Presets", "Instant PNG Download"]} faqs={[{ question: "What format is the downloaded favicon?", answer: "We download as PNG which is supported by all modern browsers. For legacy ICO format, upload the PNG to online converters like realfavicongenerator.net." }]} relatedTools={[{ name: "Color Picker", emoji: "🎨", path: "/tools/color-picker" }, { name: "Color Palette", emoji: "🎭", path: "/tools/color-palette" }]} />
        </div>
    );
};
export default FaviconGenerator;
