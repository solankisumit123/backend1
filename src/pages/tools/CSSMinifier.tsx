import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const CSSMinifier = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ original: 0, minified: 0 });

    const minify = () => {
        const original = input.length;
        const min = input
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s+/g, " ")
            .replace(/\s*([{}:;,>+~])\s*/g, "$1")
            .replace(/;}/g, "}")
            .replace(/^\s+|\s+$/g, "")
            .trim();
        setOutput(min);
        setStats({ original, minified: min.length });
    };

    const beautify = () => {
        const css = input.replace(/\s*{\s*/g, " {\n  ").replace(/\s*}\s*/g, "\n}\n\n").replace(/;\s*/g, ";\n  ").replace(/\n {2}\n}/g, "\n}");
        setOutput(css.trim());
        setStats({ original: input.length, minified: css.trim().length });
    };

    const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const saved = stats.original > 0 ? Math.round((1 - stats.minified / stats.original) * 100) : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🎨 CSS Minifier / Beautifier</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="comic-card">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-2">Input CSS</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".class { color: red; }" className="comic-input font-mono text-sm w-full" rows={14} />
                </div>
                <div className="comic-card">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Output</label>
                        {output && <button onClick={handleCopy} className="text-xs font-bold text-comic-blue flex items-center gap-1">{copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copied!" : "Copy"}</button>}
                    </div>
                    <textarea value={output} readOnly className="comic-input font-mono text-sm w-full bg-background/50" rows={14} />
                </div>
            </div>
            {stats.original > 0 && (
                <div className="comic-card text-center mb-4 animate-slide-up">
                    <p className="font-bold text-foreground">{stats.original} → {stats.minified} chars <span className={`${saved > 0 ? "text-comic-green" : "text-comic-orange"} font-extrabold`}>({saved > 0 ? `-${saved}%` : `+${Math.abs(saved)}%`})</span></p>
                </div>
            )}
            <div className="flex gap-3 justify-center">
                <button onClick={minify} className="comic-btn bg-primary text-primary-foreground">🗜️ Minify</button>
                <button onClick={beautify} className="comic-btn bg-secondary text-secondary-foreground">✨ Beautify</button>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="CSS Minifier & Beautifier - Optimize Stylesheet Performance"
                description="Compress your CSS files to reduce page load time or beautify messy styles for better readability. Free online tool for web performance optimization."
                keywords="css minifier, compress css, css beautifier, css cleaner, speed up website, developer tools"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro CSS Minifier",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Boost Your Website Performance with Optimized CSS"
                subtitle="Small Files, Fast Loads: The Essential CSS Optimization Tool"
                description="CSS files can quickly become bloated with comments, extra spaces, and redundant characters, all of which slow down your website's performance. Our CSS Minifier strips out everything unnecessary for a computer to read while keeping your styles intact. Conversely, if you're struggling to read someone else's minified code, our 'Beautifier' adds back the structure and whitespace needed for human comprehension."
                howToUse={[
                    "Paste your CSS code into the 'Input CSS' text area.",
                    "Click 'Minify' to remove all whitespace and comments for production use.",
                    "Click 'Beautify' to expand minified code into a readable format with indentation.",
                    "Review the 'Before' and 'After' character count to see your savings.",
                    "Copy the result and update your website's stylesheet file."
                ]}
                features={[
                    "Aggressive Compression: Removes tabs, newlines, and multiple spaces instantly.",
                    "Comment Stripping: Safely removes /* comments */ without breaking code functionality.",
                    "Real-Time Statistics: Shows exactly how many bytes you've saved from your original file.",
                    "Safe Transformation: Preserves critical CSS logic and browser-specific prefixes.",
                    "Browser-Based: Zero server storage—your code never leaves your local environment."
                ]}
                faqs={[
                    {
                        question: "Does minifying CSS improve SEO?",
                        answer: "Yes. Google uses 'Page Speed' as a ranking factor. Smaller CSS files mean faster loading times, which contributes to a better Core Web Vitals score."
                    },
                    {
                        question: "Will minifying break my website?",
                        answer: "No. Minification only removes 'visual' characters like spaces and comments. The instructions given to the browser remain exactly the same."
                    },
                    {
                        question: "Should I minify CSS for development?",
                        answer: "It is best to keep 'beautified' CSS for development so you can debug it, but always use a 'minified' version in your live production environment."
                    }
                ]}
                relatedTools={[
                    { name: "JS Minifier", emoji: "📜", path: "/tools/js-minifier" },
                    { name: "HTML Formatter", emoji: "🌐", path: "/tools/html-formatter" },
                    { name: "PageSpeed Tool", emoji: "⚡", path: "/tools/pagespeed" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" }
                ]}
            />
        </div>
    );
};

export default CSSMinifier;
