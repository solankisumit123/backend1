import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";

const mdToHtml = (md: string): string => {
    let html = md;
    // Headers
    html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
    html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
    // Bold & Italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");
    html = html.replace(/`(.+?)`/g, "<code>$1</code>");
    // Links & Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Unordered list
    html = html.replace(/^\s*[-*]\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`);
    // Ordered list
    html = html.replace(/^\s*\d+\.\s+(.+)$/gm, "<li>$1</li>");
    // Blockquote
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");
    // Horizontal rule
    html = html.replace(/^---$/gm, "<hr />");
    // Line breaks
    html = html.replace(/\n\n/g, "\n<br />\n");
    return html.trim();
};

const MarkdownToHTML = () => {
    const [md, setMd] = useState("");
    const [copied, setCopied] = useState(false);

    const html = mdToHtml(md);

    const copy = () => {
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const sampleMd = `# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- Item one\n- Item two\n- Item three\n\n[Click here](https://example.com)\n\n> This is a blockquote\n\n---\n\n### Code\n\nUse \`console.log()\` to debug.`;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📝</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Markdown to HTML Converter</h1>
                <p className="text-muted-foreground font-bold">Convert Markdown text to HTML code instantly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border-4 border-border rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-foreground">📝 Markdown</span>
                        <button onClick={() => setMd(sampleMd)} className="text-xs font-bold text-comic-blue hover:underline">Load Sample</button>
                    </div>
                    <textarea value={md} onChange={e => setMd(e.target.value)} rows={14} placeholder="Type or paste Markdown here..."
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-mono text-sm focus:outline-none focus:border-comic-blue resize-none" />
                </div>
                <div className="bg-card border-4 border-border rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-foreground">🔖 HTML Output</span>
                        <button onClick={copy} disabled={!html}
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                        </button>
                    </div>
                    <textarea readOnly value={html} rows={14}
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-mono text-sm resize-none" />
                </div>
            </div>

            {html && (
                <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 mb-6">
                    <h3 className="text-sm font-black text-foreground mb-3">👁️ Live Preview</h3>
                    <div className="prose max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Markdown to HTML Converter — Free Online Tool</h2>
                <p>Convert <strong>Markdown to HTML</strong> instantly. Supports headings, bold, italic, links, images, lists, blockquotes, code, and horizontal rules. See live preview of your converted HTML. Great for bloggers, developers, and content creators.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: markdown to html, md to html converter, markdown converter online, convert markdown to html code, free markdown tool.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default MarkdownToHTML;
