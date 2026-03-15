import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, KeySquare, Server, Link2, Download, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const JWTDecoder = () => {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState("{}");
    const [payload, setPayload] = useState("{}");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (!token.trim()) {
            setHeader("{}");
            setPayload("{}");
            setIsValid(null);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) throw new Error("Invalid format");

            const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

            setHeader(JSON.stringify(decodedHeader, null, 4));
            setPayload(JSON.stringify(decodedPayload, null, 4));
            setIsValid(true);
        } catch {
            setHeader("{\n  // Error decoding header\n}");
            setPayload("{\n  // Error decoding payload\n}");
            setIsValid(false);
        }
    }, [token]);

    const handleCopy = (text: string, label: string) => {
        if (!text || text.includes("// Error")) return;
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied!`);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🎟️ JWT Token Decoder</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Decode JSON Web Tokens instantly to securely read the claims.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="comic-card flex flex-col h-full">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">Encoded JWT</label>
                        <button onClick={() => setToken("")} className="text-xs font-bold text-primary hover:opacity-80 flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" /> Clear
                        </button>
                    </div>
                    <textarea
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        className={`comic-input w-full h-full min-h-[400px] font-mono break-all text-sm resize-none ${isValid === false ? 'border-destructive text-destructive' : ''}`}
                    />
                    {isValid === false && (
                        <p className="text-destructive font-bold text-xs mt-2">Invalid JWT format.</p>
                    )}
                </div>

                {/* Output Area */}
                <div className="flex flex-col gap-4">
                    <div className="comic-card flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-comic-red uppercase flex items-center gap-1">
                                <Server className="w-4 h-4" /> Header (Algorithm & Type)
                            </label>
                            <button onClick={() => handleCopy(header, "Header")} className="text-xs font-bold text-primary hover:opacity-80 flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy
                            </button>
                        </div>
                        <pre className="comic-input bg-comic-red/5 font-mono text-sm overflow-auto h-32 p-4 text-foreground/80">
                            {header}
                        </pre>
                    </div>

                    <div className="comic-card flex-[2]">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-comic-blue uppercase flex items-center gap-1">
                                <KeySquare className="w-4 h-4" /> Payload (Data Claims)
                            </label>
                            <button onClick={() => handleCopy(payload, "Payload")} className="text-xs font-bold text-primary hover:opacity-80 flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy
                            </button>
                        </div>
                        <pre className="comic-input bg-comic-blue/5 font-mono text-sm overflow-auto h-64 p-4 text-foreground/80">
                            {payload}
                        </pre>
                    </div>
                </div>
</div>
            <p className="text-center text-xs text-muted-foreground font-bold mt-8">Note: Decodes headers and payloads. Signature verification is not performed.</p>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

export default JWTDecoder;
