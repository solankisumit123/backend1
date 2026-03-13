import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, ArrowRightLeft } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";


const Base64Tool = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const process = () => {
        try {
            if (mode === "encode") {
                setOutput(btoa(unescape(encodeURIComponent(input))));
            } else {
                setOutput(decodeURIComponent(escape(atob(input))));
            }
            setError("");
        } catch {
            setError(mode === "decode" ? "Invalid Base64 string" : "Cannot encode this text");
            setOutput("");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const swap = () => {
        setMode(mode === "encode" ? "decode" : "encode");
        setInput(output);
        setOutput(input);
        setError("");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔄 Base64 Encoder / Decoder</h1>

            <div className="comic-card mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">
                        {mode === "encode" ? "Plain Text" : "Base64 String"}
                    </label>
                    <button onClick={swap} className="comic-btn text-xs bg-card text-foreground flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3" strokeWidth={3} /> Swap
                    </button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text here..." className="comic-input font-mono text-sm w-full" rows={6} />
            </div>

            <div className="text-center mb-4">
                <button onClick={process} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 mx-auto">
                    {mode === "encode" ? "🔒 Encode to Base64" : "🔓 Decode from Base64"}
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
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                        </label>
                        <button onClick={handleCopy} className="comic-btn text-xs bg-card text-foreground flex items-center gap-1">
                            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                    <textarea value={output} readOnly className="comic-input font-mono text-sm w-full bg-background/50" rows={6} />
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Base64 Encoder & Decoder - Online Base64 Converter"
                description="Fast and secure online tool to encode text to Base64 or decode Base64 back to plain text. 100% browser-based with support for special characters."
                keywords="base64 encoder, base64 decoder, base64 converter, text to base64, base64 to text"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Base64 Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Reliable Base64 String Encoding & Decoding"
                subtitle="Transform Data Between Binary and Text Formats Instantly"
                description="Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is widely used in data URI schemes, email formatting (MIME), and storing complex data in XML or JSON. WebInsight Pro's Base64 tool provides a clean, user-friendly interface to switch between plain text and Base64 strings without any server-side processing."
                howToUse={[
                    "Choose between 'Encode' or 'Decode' mode using the toggle button.",
                    "Paste your input into the text field (Plain text for encoding, Base64 for decoding).",
                    "Click the 'Encode' or 'Decode' button to process the string.",
                    "Use the 'Swap' button to quickly reverse the input and output.",
                    "Click 'Copy' to save the result to your clipboard."
                ]}
                features={[
                    "UTF-8 Support: Correct handling of special characters and emojis.",
                    "Live Swap: Instantly reverse the conversion flow for quick testing.",
                    "Syntax Validation: Error messages for invalid Base64 decoding attempts.",
                    "Zero Tracking: Data is processed locally in the browser; nothing is uploaded.",
                    "Lightweight: No bulky libraries, just pure JavaScript performance."
                ]}
                faqs={[
                    {
                        question: "Is Base64 a form of encryption?",
                        answer: "No. Base64 is an encoding scheme, not encryption. It is used to represent data in a format that can be easily transmitted over text-based protocols. Anyone can decode a Base64 string easily."
                    },
                    {
                        question: "Why does my Base64 string have equal signs (=) at the end?",
                        answer: "The '=' characters are 'padding'. Base64 requires the input to be a multiple of 3 bytes. If the input doesn't fit exactly, padding is added to ensure the output is valid."
                    },
                    {
                        question: "Can I encode images to Base64 here?",
                        answer: "Currently, this tool is optimized for text. However, you can paste the text representation of an image or a Data URL to decode it into its original string format."
                    }
                ]}
                relatedTools={[
                    { name: "Binary Converter", emoji: "🔢", path: "/tools/binary-converter" },
                    { name: "Hex Converter", emoji: "#️⃣", path: "/tools/hex-converter" },
                    { name: "URL Encoder", emoji: "🌐", path: "/tools/url-encoder-decoder" },
                    { name: "JWT Decoder", emoji: "🔑", path: "/tools/jwt-decoder" }
                ]}
            />
        </div>
    );
};

export default Base64Tool;
