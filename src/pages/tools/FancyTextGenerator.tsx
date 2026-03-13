import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const styles: { name: string; convert: (t: string) => string }[] = [
    { name: "𝗕𝗼𝗹𝗱", convert: t => t.replace(/[a-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D41A - 97)).replace(/[A-Z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D400 - 65)) },
    { name: "𝘐𝘵𝘢𝘭𝘪𝘤", convert: t => t.replace(/[a-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D622 - 97)).replace(/[A-Z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D608 - 65)) },
    { name: "𝙱𝚘𝚕𝚍 𝙼𝚘𝚗𝚘", convert: t => t.replace(/[a-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D670 + 26 - 97)).replace(/[A-Z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D670 - 65)) },
    { name: "𝒮𝒸𝓇𝒾𝓅𝓉", convert: t => t.replace(/[a-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D4EA - 97)).replace(/[A-Z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D4D0 - 65)) },
    { name: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯", convert: t => t.replace(/[a-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D586 - 97)).replace(/[A-Z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D56C - 65)) },
    { name: "Ｆｕｌｌ Ｗｉｄｔｈ", convert: t => t.replace(/[a-zA-Z0-9]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0xFF01 - 33)) },
    { name: "🅱🅻🅾🅲🅺", convert: t => [...t].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); return i >= 0 ? ["🅰", "🅱", "🅲", "🅳", "🅴", "🅵", "🅶", "🅷", "🅸", "🅹", "🅺", "🅻", "🅼", "🅽", "🅾", "🅿", "🆀", "🆁", "🆂", "🆃", "🆄", "🆅", "🆆", "🆇", "🆈", "🆉"][i] : c; }).join("") },
    { name: "🇨🇴🇾🇳🇧🇴🇽", convert: t => [...t].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); return i >= 0 ? String.fromCodePoint(0x1F1E6 + i) : c; }).join("") },
    { name: "ṡṫrïkë", convert: t => [...t].map(c => c + "\u0336").join("") },
    { name: "ůnderlïne", convert: t => [...t].map(c => c + "\u0332").join("") },
    { name: "T̴͓̽ͅe̤͑ẍ̦t̢͒", convert: t => [...t].map(c => c + ["\u0300", "\u0301", "\u0302", "\u0303", "\u0307", "\u0308", "\u030A", "\u0324", "\u0325", "\u0330", "\u0332"][Math.floor(Math.random() * 11)]).join("") },
    { name: "sᴍᴀʟʟ ᴄᴀᴘs", convert: t => t.toLowerCase().replace(/[a-z]/g, c => ["ᴀ", "ʙ", "ᴄ", "ᴅ", "ᴇ", "ꜰ", "ɢ", "ʜ", "ɪ", "ᴊ", "ᴋ", "ʟ", "ᴍ", "ɴ", "ᴏ", "ᴘ", "q", "ʀ", "s", "ᴛ", "ᴜ", "ᴠ", "ᴡ", "x", "ʏ", "ᴢ"]["abcdefghijklmnopqrstuvwxyz".indexOf(c)] || c) },
    { name: "uʍop ǝpᴉsdn", convert: t => [...t.toLowerCase()].map(c => { const map: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z" }; return map[c] || c; }).reverse().join("") },
    { name: "•.• Bubbly •.•", convert: t => t.replace(/[a-zA-Z]/g, c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); return i >= 0 ? String.fromCodePoint(0x24B6 + i) : c; }) },
    { name: "★彡[neon]彡★", convert: t => `★彡 ${t} 彡★` },
    { name: "꧁༺ ꧂", convert: t => `꧁༺${t}༻꧂` },
];

const FancyTextGenerator = () => {
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState<number | null>(null);

    const copyText = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-comic-purple text-white mb-4 text-3xl">✨</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Fancy Text Generator</h1>
                <p className="text-muted-foreground font-bold">Convert your text into stylish fonts for Instagram, WhatsApp & more!</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">✍️ Enter Your Text</label>
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type something... e.g. Hello World"
                    rows={3}
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple transition-colors resize-none text-lg"
                />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{input.length} characters</span>
                    {input && <button onClick={() => setInput("")} className="text-xs text-red-500 font-bold hover:underline">Clear</button>}
                </div>
            </div>

            {input && (
                <div className="space-y-3">
                    <h2 className="text-lg font-black text-foreground">{styles.length} Fancy Styles — Click to Copy! 👇</h2>
                    {styles.map((style, i) => {
                        const converted = style.convert(input);
                        return (
                            <div key={i} className="bg-card border-4 border-border rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-comic-purple transition-colors group">
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-muted-foreground mb-1">{style.name}</div>
                                    <div className="text-lg font-bold text-foreground break-all">{converted}</div>
                                </div>
                                <button
                                    onClick={() => copyText(converted, i)}
                                    className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${copied === i ? "bg-comic-green text-white scale-95" : "bg-comic-purple text-white hover:bg-comic-purple/90 hover:scale-105"}`}
                                >
                                    {copied === i ? "✅ Copied!" : "📋 Copy"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {!input && (
                <div className="bg-card border-4 border-dashed border-border rounded-2xl p-10 text-center text-muted-foreground">
                    <div className="text-4xl mb-3">✨</div>
                    <p className="font-bold text-lg">Type something above to see {styles.length} fancy styles!</p>
                    <p className="text-sm mt-1">Perfect for Instagram bios, WhatsApp status, Twitter & more</p>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Fancy Text Generator - Stylish Fonts Copy and Paste"
                description="Cool fancy text generator to convert normal text into stylish fonts for Instagram bio, WhatsApp, Twitter, and gaming nicknames. Copy and paste 15+ aesthetic styles."
                keywords="fancy text generator, stylish fonts, instagram font changer, cool text symbols, copy paste fonts"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Fancy Text Generator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Convert Simple Text into Stylish Font Art"
                subtitle="Express Yourself with 15+ Unique Aesthetic Styles"
                description="Bore with plain text? Make your message pop with WebInsight Pro's Fancy Text Generator. Our tool uses advanced Unicode mapping to instantly transform your words into creative fonts like Script, Fraktur, Bold Mono, and even 'Upside Down' text. Perfect for social media enthusiasts, gamers, and professional creators look to add a touch of personality to their digital footprint."
                howToUse={[
                    "Type or paste your content in the 'Enter Your Text' area.",
                    "Instantly watch the styles update as you type.",
                    "Scroll through the list of 15+ fancy font variations.",
                    "Click the 'Copy' button next to your favorite style.",
                    "Paste the stylish text anywhere—Instagram, Facebook, Discord, or Gaming Profile!"
                ]}
                features={[
                    "Real-Time Preview: See how your text looks in every style instantly.",
                    "Unicode Based: Works on all platforms that support standard characters.",
                    "Instagram Ready: Specifically optimized for IG bios and captions.",
                    "Glitch & Symbol Support: Unique characters like Zalgo and Bubbly fonts.",
                    "Purely Browser-Based: Your private text never leaves your device."
                ]}
                faqs={[
                    {
                        question: "Why do some people see boxes instead of text?",
                        answer: "This happens if the viewer's device is very old and doesn't support specific Unicode characters. However, 99.9% of modern smartphones and computers will display these symbols perfectly."
                    },
                    {
                        question: "Is this safe for WhatsApp and Instagram?",
                        answer: "Yes, these are standard Unicode symbols. Using them is completely safe and won't get your account flagged. They are widely used by influencers every day."
                    },
                    {
                        question: "Can I use these for my game username?",
                        answer: "Absolutely! These fonts work great for Free Fire, PUBG, and Discord nicknames, as long as the game's naming system allows Unicode characters."
                    }
                ]}
                relatedTools={[
                    { name: "QR Generator", emoji: "📱", path: "/tools/qr-code" },
                    { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
                    { name: "Word Counter", emoji: "📝", path: "/tools/word-counter" },
                    { name: "Password Strength", emoji: "🔐", path: "/tools/password-strength" }
                ]}
            />
        </div>
    );
};

export default FancyTextGenerator;
