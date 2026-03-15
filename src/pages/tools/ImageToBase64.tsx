import { useState, useRef } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";

const ImageToBase64 = () => {
    const [base64, setBase64] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [preview, setPreview] = useState("");
    const [copied, setCopied] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileName(file.name);
        setFileSize(file.size);
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setBase64(result);
            setPreview(result);
        };
        reader.readAsDataURL(file);
    };

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const htmlTag = base64 ? `<img src="${base64}" alt="${fileName}" />` : "";
    const cssTag = base64 ? `background-image: url('${base64}');` : "";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🖼️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Image to Base64 Converter</h1>
                <p className="text-muted-foreground font-bold">Convert any image to Base64 encoded string</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block border-4 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-comic-blue transition-colors">
                    <div className="text-4xl mb-3">📁</div>
                    <p className="font-bold text-foreground">Click to upload or drag & drop an image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, SVG, WebP supported</p>
                    <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
            </div>

            {base64 && (
                <div className="space-y-4 animate-fade-in">
                    {preview && (
                        <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                            <div className="mt-3 text-sm font-bold text-muted-foreground">
                                {fileName} · {(fileSize / 1024).toFixed(1)} KB · Base64: {(base64.length / 1024).toFixed(1)} KB
                            </div>
                        </div>
                    )}

                    {/* Base64 String */}
                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-black text-foreground">📝 Base64 String</span>
                            <button onClick={() => copy(base64)}
                                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                            </button>
                        </div>
                        <textarea readOnly value={base64} rows={4}
                            className="w-full bg-background border-2 border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground resize-none" />
                    </div>

                    {/* HTML Tag */}
                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-black text-foreground">🔖 HTML &lt;img&gt; Tag</span>
                            <button onClick={() => copy(htmlTag)} className="p-1.5 rounded-lg text-xs font-bold bg-muted hover:bg-comic-blue hover:text-white transition-all flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy
                            </button>
                        </div>
                        <textarea readOnly value={htmlTag} rows={2}
                            className="w-full bg-background border-2 border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground resize-none" />
                    </div>

                    {/* CSS Tag */}
                    <div className="bg-card border-4 border-border rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-black text-foreground">🎨 CSS Background</span>
                            <button onClick={() => copy(cssTag)} className="p-1.5 rounded-lg text-xs font-bold bg-muted hover:bg-comic-blue hover:text-white transition-all flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy
                            </button>
                        </div>
                        <textarea readOnly value={cssTag} rows={2}
                            className="w-full bg-background border-2 border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground resize-none" />
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Image to Base64 Converter — Online Free</h2>
                <p>Convert any <strong>image to Base64</strong> encoded data URI string. Get ready-to-use HTML img tag and CSS background-image code. Supports PNG, JPG, GIF, SVG, and WebP formats. All processing happens in your browser — no uploads.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: image to base64, base64 image encoder, convert image to data uri, base64 converter online, image to html base64, css background base64.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default ImageToBase64;
