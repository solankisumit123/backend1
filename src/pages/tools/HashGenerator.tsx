import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Lock, Copy } from "lucide-react";
import { toast } from "sonner";

const HashGenerator = () => {
    const [text, setText] = useState("");
    const [hashes, setHashes] = useState({ sha1: "", sha256: "", sha384: "", sha512: "" });

    useEffect(() => {
        const generateHashes = async () => {
            if (!text) {
                setHashes({ sha1: "", sha256: "", sha384: "", sha512: "" });
                return;
            }

            const encoder = new TextEncoder();
            const data = encoder.encode(text);

            const hashHex = async (algo: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512") => {
                const hashBuffer = await crypto.subtle.digest(algo, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            };

            const [sha1, sha256, sha384, sha512] = await Promise.all([
                hashHex("SHA-1"),
                hashHex("SHA-256"),
                hashHex("SHA-384"),
                hashHex("SHA-512")
            ]);

            setHashes({ sha1, sha256, sha384, sha512 });
        };

        generateHashes();
    }, [text]);

    const copyToClipboard = (hashType: string, value: string) => {
        if (!value) return;
        navigator.clipboard.writeText(value);
        toast.success(`${hashType.toUpperCase()} Hash copied!`);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔐 SHA Hash Generator</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Securely generate cryptographic hashes (SHA-1, SHA-256, SHA-512) for any text.</p>

            <div className="comic-card mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Input Text</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter the string you want to hash..."
                    className="comic-input w-full h-32"
                />
            </div>

            <div className="space-y-4">
                {Object.entries(hashes).map(([key, val]) => (
                    <div key={key} className="comic-card animate-slide-up bg-background/50">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-primary uppercase flex items-center gap-2">
                                <Lock className="w-4 h-4" /> {key.toUpperCase()}
                            </label>
                            <button onClick={() => copyToClipboard(key, val)} disabled={!val} className="comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1 py-1 disabled:opacity-50">
                                <Copy className="w-3 h-3" /> Copy
                            </button>
                        </div>
                        <div className="comic-input w-full bg-muted/30 font-mono text-sm break-all min-h-[2.5rem] flex items-center">
                            {val || "Waiting for input..."}
                        </div>
                    </div>
                ))}
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default HashGenerator;
