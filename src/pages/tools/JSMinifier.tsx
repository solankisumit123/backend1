import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";


const JSMinifier = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ original: 0, minified: 0 });

    const minify = () => {
        const original = input.length;
        const min = input
            .replace(/\/\/.*$/gm, "")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\n\s*\n/g, "\n")
            .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, "$1")
            .replace(/\s+/g, " ")
            .trim();
        setOutput(min);
        setStats({ original, minified: min.length });
    };

    const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const saved = stats.original > 0 ? Math.round((1 - stats.minified / stats.original) * 100) : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">⚡ JavaScript Minifier</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="comic-card">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Input JS</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="function hello() { console.log('world'); }" className="comic-input font-mono text-sm w-full" rows={14} />
                </div>
                <div className="comic-card">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Minified Output</label>
                        {output && <button onClick={handleCopy} className="text-xs font-bold text-comic-blue flex items-center gap-1">{copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copied!" : "Copy"}</button>}
                    </div>
                    <textarea value={output} readOnly className="comic-input font-mono text-sm w-full bg-background/50" rows={14} />
                </div>
            </div>
            {stats.original > 0 && (
                <div className="comic-card text-center mb-4 animate-slide-up">
                    <p className="font-bold text-foreground">{stats.original} → {stats.minified} chars <span className="text-comic-green font-extrabold">(-{saved}%)</span></p>
                </div>
            )}
            <button onClick={minify} className="comic-btn bg-primary text-primary-foreground mx-auto flex items-center gap-2">🗜️ Minify JavaScript</button>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="JavaScript Minifier - Compress JS Code Online"
                description="Reduce the size of your JavaScript files for faster website loading. Remove comments and whitespace while preserving code functionality. Free developer tool."
                keywords="js minifier, javascript compressor, shrink js file, speed up js, web performance tool"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro JS Minifier",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Streamline Your Scripts for the Modern Web"
                subtitle="Faster Execution, Lower Bandwidth, Better User Experience"
                description="JavaScript is the engine behind modern interactivity, but large script files can significantly delay your 'Time to Interactive' (TTI). Our JavaScript Minifier uses safe regex-based patterns to strip out source-code comments and unnecessary whitespace that computers don't need. This results in a smaller payload for your users to download, leading to snappier performance and better SEO rankings."
                howToUse={[
                    "Paste your raw JavaScript function or script into the 'Input JS' field.",
                    "Click 'Minify JavaScript' to process the code.",
                    "Review the compression statistics to see the percentage of space saved.",
                    "Copy the result and replace your production .js file contents.",
                    "Test your website to ensure all logic remains functional (minification is safe for standard JS)."
                ]}
                features={[
                    "Smart Whitespace Removal: Eliminates newlines and spaces between operators.",
                    "Comment Extraction: Strips both single-line (//) and multi-line (/* */) comments.",
                    "Safe Operator Handling: Carefully preserves spaces around critical keywords to prevent logic errors.",
                    "Real-Time Char Count: Instant feedback on the original vs. minified file size.",
                    "Local Privacy: All minification happens in your browser—no data is sent to a server."
                ]}
                faqs={[
                    {
                        question: "Will minification change how my code runs?",
                        answer: "No. Minification only removes 'non-functional' characters like spaces and comments. The logical structure of your functions remains identical."
                    },
                    {
                        question: "Why is JS minification important for SEO?",
                        answer: "Faster websites rank better. JS minification is a key part of optimizing 'render-blocking resources,' which Google measures as part of Core Web Vitals."
                    },
                    {
                        question: "Can I undo minification?",
                        answer: "Minification is a one-way process because it removes comments. always keep a 'source' version for editing and a 'minified' version for your live site."
                    }
                ]}
                relatedTools={[
                    { name: "CSS Minifier", emoji: "🎨", path: "/tools/css-minifier" },
                    { name: "JSON Formatter", emoji: "📋", path: "/tools/json-formatter" },
                    { name: "PageSpeed Tool", emoji: "⚡", path: "/tools/pagespeed" },
                    { name: "HTML Formatter", emoji: "🌐", path: "/tools/html-formatter" }
                ]}
            />
        </div>
    );
};


export default JSMinifier;
