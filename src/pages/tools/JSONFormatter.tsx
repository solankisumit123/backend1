import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, Minimize2, Maximize2 } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const JSONFormatter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const format = (indent = 2) => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
            setError("");
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput("");
        }
    };

    const minify = () => {
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError("");
        } catch (e: unknown) {
            setError((e as Error).message);
            setOutput("");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">📋 JSON Formatter</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="comic-card">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Input JSON</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"name": "John", "age": 30}'
                        className="comic-input font-mono text-sm w-full"
                        rows={16}
                    />
                </div>
                <div className="comic-card">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Output</label>
                        {output && (
                            <button onClick={handleCopy} className="text-xs font-bold text-comic-blue flex items-center gap-1">
                                {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Formatted JSON will appear here..."
                        className="comic-input font-mono text-sm w-full bg-background/50"
                        rows={16}
                    />
                </div>
            </div>

            {error && (
                <div className="comic-card bg-destructive/10 mb-4 animate-slide-up" style={{ border: "2px solid hsl(var(--destructive))" }}>
                    <p className="text-sm font-bold text-destructive">❌ {error}</p>
                </div>
            )}

            <div className="flex gap-3 justify-center">
                <button onClick={() => format(2)} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" strokeWidth={3} /> Beautify (2 spaces)
                </button>
                <button onClick={() => format(4)} className="comic-btn bg-secondary text-secondary-foreground flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" strokeWidth={3} /> Beautify (4 spaces)
                </button>
                <button onClick={minify} className="comic-btn bg-card text-foreground flex items-center gap-2">
                    <Minimize2 className="w-4 h-4" strokeWidth={3} /> Minify
                </button>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="JSON Formatter & Validator - Beautify JSON Online"
                description="Free online tool to beautify, format, and minify JSON data. Validate your JSON strings and catch syntax errors instantly. 100% private browser-based formatting."
                keywords="json formatter, beautify json, json validator, minify json, format json online"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro JSON Formatter",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Advanced JSON Beautifier and Syntax Validator"
                subtitle="Clean Up Messy Code and Catch Errors with One Click"
                description="JSON (JavaScript Object Notation) is the language of the web, but it can be a nightmare to read when unformatted. WebInsight Pro's JSON Formatter is a developer-centric utility that takes raw, minified JSON strings and transforms them into beautifully indented, readable structures. It also acts as a live validator, highlighting syntax errors like missing commas or mismatched brackets."
                howToUse={[
                    "Paste your unformatted JSON text into the 'Input JSON' box.",
                    "Choose 'Beautify (2 spaces)' for a standard compact look.",
                    "Choose 'Beautify (4 spaces)' for deeper indentation and readability.",
                    "Use the 'Minify' button if you want to compress your JSON for production use.",
                    "If there's an error, a message will appear to help you debug your code."
                ]}
                features={[
                    "Indentation Control: Choose between 2-space and 4-space formatting.",
                    "Error Detection: Real-time validation message for invalid JSON structures.",
                    "Fast Minification: Remove all whitespace for smaller file sizes.",
                    "One-Click Copy: Instantly move your formatted code to your IDE.",
                    "Private & Secure: We never store your JSON data; processing happens entirely on your machine."
                ]}
                faqs={[
                    {
                        question: "Is it safe to paste my data here?",
                        answer: "Yes. Unlike some online tools that send your data to a server, WebInsight Pro processes everything locally in your browser. Your sensitive JSON data never leaves your computer."
                    },
                    {
                        question: "Why should I minify my JSON?",
                        answer: "Minification removes all unnecessary spaces and line breaks, reducing the file size. This is crucial for web performance as it speeds up API responses and page loads."
                    },
                    {
                        question: "Does it support deep nested objects?",
                        answer: "Absolutely. Our formatter can handle deeply nested arrays and objects of any size, providing a clear hierarchical view of your data structure."
                    }
                ]}
                relatedTools={[
                    { name: "JWT Decoder", emoji: "🔑", path: "/tools/jwt-decoder" },
                    { name: "HTML Formatter", emoji: "🌐", path: "/tools/html-formatter" },
                    { name: "CSS Minifier", emoji: "🎨", path: "/tools/css-minifier" },
                    { name: "JS Minifier", emoji: "📜", path: "/tools/js-minifier" }
                ]}
            />
        </div>
    );
};

export default JSONFormatter;
