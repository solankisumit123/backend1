import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const fontMaps: Record<string, (t: string) => string> = {
    "𝔹𝕠𝕝𝕕": (t) => t.split("").map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCodePoint(0x1D552 + c.charCodeAt(0) - 97);
        if (c >= 'A' && c <= 'Z') return String.fromCodePoint(0x1D538 + c.charCodeAt(0) - 65);
        if (c >= '0' && c <= '9') return String.fromCodePoint(0x1D7D8 + c.charCodeAt(0) - 48);
        return c;
    }).join(""),
    "𝒮𝒸𝓇𝒾𝓅𝓉": (t) => t.split("").map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCodePoint(0x1D4B6 + c.charCodeAt(0) - 97);
        if (c >= 'A' && c <= 'Z') return String.fromCodePoint(0x1D49C + c.charCodeAt(0) - 65);
        return c;
    }).join(""),
    "𝔉𝔯𝔞𝔨𝔱𝔲𝔯": (t) => t.split("").map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCodePoint(0x1D51E + c.charCodeAt(0) - 97);
        if (c >= 'A' && c <= 'Z') return String.fromCodePoint(0x1D504 + c.charCodeAt(0) - 65);
        return c;
    }).join(""),
    "🅒🅘🅡🅒🅛🅔": (t) => t.split("").map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCodePoint(0x24D0 + c.charCodeAt(0) - 97);
        if (c >= 'A' && c <= 'Z') return String.fromCodePoint(0x24B6 + c.charCodeAt(0) - 65);
        return c;
    }).join(""),
    "🄵🅄🄻🄻 🄱🄾🅇": (t) => t.split("").map(c => {
        if (c >= 'A' && c <= 'Z') return String.fromCodePoint(0x1F130 + c.charCodeAt(0) - 65);
        if (c >= 'a' && c <= 'z') return String.fromCodePoint(0x1F130 + c.charCodeAt(0) - 97);
        return c;
    }).join(""),
    "ᴛɪɴʏ ᴄᴀᴘs": (t) => {
        const map: Record<string, string> = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };
        return t.toLowerCase().split("").map(c => map[c] || c).join("");
    },
    "⋆ Sᴘᴀʀᴋʟᴇ ⋆": (t) => "⋆ " + t.split("").join("˚") + " ⋆",
    "【B】【r】【a】【c】【k】【e】【t】": (t) => t.split("").map(c => c === " " ? " " : `【${c}】`).join(""),
    "U̲n̲d̲e̲r̲l̲i̲n̲e̲": (t) => t.split("").map(c => c + "\u0332").join(""),
    "S̶t̶r̶i̶k̶e̶": (t) => t.split("").map(c => c + "\u0336").join(""),
    "ʇxǝʇ dılℲ": (t) => {
        const map: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ı", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z" };
        return t.toLowerCase().split("").reverse().map(c => map[c] || c).join("");
    },
};

const InstagramFontGenerator = () => {
    const [text, setText] = useState("");
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const copy = (val: string, idx: number) => {
        navigator.clipboard.writeText(val);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1500);
    };

    const results = Object.entries(fontMaps).map(([name, fn]) => ({ name, value: text ? fn(text) : "" }));

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📸</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Instagram Font Generator</h1>
                <p className="text-muted-foreground font-bold">Cool & stylish fonts for your Instagram bio, captions & stories</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">✍️ Type Your Text</label>
                <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="Type your name or bio text here..."
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple text-lg resize-none" />
            </div>

            {text && (
                <div className="space-y-3 animate-fade-in">
                    {results.map((r, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-comic-purple transition-colors">
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-muted-foreground mb-1">{r.name}</div>
                                <div className="text-lg font-bold text-foreground break-all leading-relaxed">{r.value}</div>
                            </div>
                            <button onClick={() => copy(r.value, i)}
                                className={`shrink-0 p-2 rounded-lg transition-all ${copiedIdx === i ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-purple hover:text-white"}`}>
                                {copiedIdx === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Instagram Font Generator — Cool Fonts for Bio & Captions</h2>
                <p>Create stunning <strong>Instagram bio fonts</strong>, fancy captions, and stylish story text using our free font generator. Works with Instagram, WhatsApp, Facebook, Twitter, TikTok, and more. Just type your text, click copy, and paste anywhere!</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: instagram font generator, fancy text for instagram bio, cool fonts copy paste, stylish name generator, instagram bio maker, aesthetic fonts for social media.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default InstagramFontGenerator;
