import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, Download } from "lucide-react";
import AdBanner from "../../components/AdBanner";

const HTMLToMarkdown = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        let md = input;
        // Headers
        md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
        md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
        md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
        md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n");
        md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n");
        md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n");
        // Bold & Italic
        md = md.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, "**$2**");
        md = md.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, "*$2*");
        // Links
        md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
        // Images
        md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
        md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");
        // Lists
        md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
        md = md.replace(/<\/?[ou]l[^>]*>/gi, "\n");
        // Paragraphs & breaks
        md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
        md = md.replace(/<br\s*\/?>/gi, "\n");
        // Blockquote
        md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n\n");
        // Code
        md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
        md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, "```\n$1\n```\n\n");
        // Horizontal rule
        md = md.replace(/<hr\s*\/?>/gi, "\n---\n\n");
        // Strip remaining tags
        md = md.replace(/<[^>]+>/g, "");
        // Clean up
        md = md.replace(/\n{3,}/g, "\n\n").trim();
        setOutput(md);
    };

    const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">📄 HTML to Markdown</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="comic-card">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">HTML Input</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<h1>Hello</h1><p>World</p>" className="comic-input font-mono text-sm w-full" rows={14} />
                </div>
                <div className="comic-card">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Markdown Output</label>
                        {output && <button onClick={handleCopy} className="text-xs font-bold text-comic-blue flex items-center gap-1">{copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copied!" : "Copy"}</button>}
                    </div>
                    <textarea value={output} readOnly className="comic-input font-mono text-sm w-full bg-background/50" rows={14} />
                </div>
</div>
            <button onClick={convert} className="comic-btn bg-primary text-primary-foreground mx-auto flex items-center gap-2">🔄 Convert to Markdown</button>

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3820454060" dataAdFormat="auto" />
      <AdBanner dataAdSlot="3820454060" dataAdFormat="rectangle" />

        </div>
    );
};

export default HTMLToMarkdown;
