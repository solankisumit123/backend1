import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Download, Copy, CheckCircle, Loader2 } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const QRCodeGenerator = () => {
    const [text, setText] = useState("");
    const [size, setSize] = useState(300);
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const qrUrl = text.trim()
        ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text.trim())}`
        : "";

    // Proper blob download — forces file save instead of opening in browser
    const handleDownload = async () => {
        if (!qrUrl) return;
        setDownloading(true);
        try {
            const res = await fetch(qrUrl);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            const safeName = text.trim().slice(0, 20).replace(/[^a-z0-9]/gi, "_") || "qrcode";
            link.download = `${safeName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch {
            // fallback direct link
            const link = document.createElement("a");
            link.href = qrUrl;
            link.download = "qrcode.png";
            link.click();
        } finally {
            setDownloading(false);
        }
    };

    const handleCopy = async () => {
        if (!qrUrl) return;
        try {
            const res = await fetch(qrUrl);
            const blob = await res.blob();
            await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            navigator.clipboard.writeText(qrUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">📱 QR Code Generator</h1>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Enter Text or URL</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com or any text..."
                    className="comic-input mb-4"
                />

                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Size: {size}px</label>
                <input
                    type="range"
                    min={100}
                    max={600}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full mb-4"
                />
            </div>

            {qrUrl && (
                <div className="comic-card text-center animate-slide-up">
                    <div className="inline-block p-4 bg-white rounded-2xl mb-4" style={{ border: "3px solid hsl(var(--border))" }}>
                        <img src={qrUrl} alt="QR Code" style={{ width: size > 400 ? 400 : size, height: size > 400 ? 400 : size }} />
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="comic-btn bg-primary text-primary-foreground flex items-center gap-2"
                        >
                            {downloading
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Download className="w-4 h-4" strokeWidth={3} />
                            }
                            {downloading ? "Downloading..." : "Download PNG"}
                        </button>
                        <button onClick={handleCopy} className="comic-btn bg-card text-foreground flex items-center gap-2">
                            {copied ? <CheckCircle className="w-4 h-4" strokeWidth={3} /> : <Copy className="w-4 h-4" strokeWidth={3} />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Free QR Code Generator - Create QR Codes Online"
                description="Easily generate high-quality QR codes for URLs, text, and contact info. Free, fast, and no signup required. Customize size and download as PNG."
                keywords="qr code generator, create qr code, free qr generator, scanner code maker, url to qr"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro QR Generator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Professional High-Resolution QR Code Engine"
                subtitle="Bridge the Gap Between Offline and Online Worlds"
                description="QR codes (Quick Response codes) are more relevant than ever. WebInsight Pro's QR Code Generator allows you to create scannable codes instantly for any website, text message, or menu. Our tool generates high-definition PNG files that are ready for printing on business cards, posters, or menus without losing quality."
                howToUse={[
                    "Type your 'URL' or 'Any Text' in the input box provided.",
                    "Adjust the 'Size' slider to choose the resolution (from 100px to 600px).",
                    "Wait for the QR code to generate automatically in real-time.",
                    "Click 'Download PNG' to save the code to your device.",
                    "Use the 'Copy' button if you want to paste the image directly into Discord or Slack."
                ]}
                features={[
                    "Custom Resolution: Choose the exact size you need for web or print.",
                    "Real-Time Generation: No 'Submit' button needed—it updates as you type.",
                    "High-Quality PNG: Crisp, clear, and perfectly scannable on all devices.",
                    "Zero Tracking: We don't track your scans or link data for maximum privacy.",
                    "Universal Compatibility: Works with all QR scanner apps on iPhone and Android."
                ]}
                faqs={[
                    {
                        question: "What is a QR code?",
                        answer: "A QR code is a type of matrix barcode that contains data for a locator, identifier, or tracker that points to a website or application."
                    },
                    {
                        question: "Do these QR codes ever expire?",
                        answer: "No! The QR codes generated here are static, meaning they will work forever. They don't rely on our servers after you download the image."
                    },
                    {
                        question: "Can I use these for my business?",
                        answer: "Absolutely. Our tool is 100% free for commercial and personal use. You can print these codes on marketing materials without any royalty fees."
                    }
                ]}
                relatedTools={[
                    { name: "URL Slug Gen", emoji: "🔗", path: "/tools/url-slug-generator" },
                    { name: "UTM Builder", emoji: "📊", path: "/tools/utm-builder" },
                    { name: "Password Generator", emoji: "🔐", path: "/tools/password" },
                    { name: "JSON Formatter", emoji: "📦", path: "/tools/json" }
                ]}
            />
        </div>
    );
};

export default QRCodeGenerator;
