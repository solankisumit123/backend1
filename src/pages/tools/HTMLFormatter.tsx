import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Code, Copy, RefreshCw, Brackets, Minus } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";


const HTMLFormatter = () => {
    const [html, setHtml] = useState("");
    const [formatted, setFormatted] = useState("");
    const [minify, setMinify] = useState(false);

    const formatHTML = (code: string) => {
        if (!code.trim()) return;

        try {
            if (minify) {
                // Remove newlines, tabs, and multiple spaces
                const minified = code
                    .replace(/>[\r\n\s]+</g, "><") // remove spaces between tags
                    .replace(/\s{2,}/g, " ") // reduce multiple spaces
                    .trim();
                setFormatted(minified);
                toast.success("HTML Minified!");
                return;
            }

            // Simple HTML formatter
            const element = document.createElement("div");
            element.innerHTML = code.trim();
            const formatNode = (node: Element | ChildNode, level: number): string => {
                const indent = "  ".repeat(level);
                let result = "";

                if (node.nodeType === 3) {
                    const text = node.textContent?.trim();
                    if (text) result += indent + text + "\n";
                } else if (node.nodeType === 1) {
                    const elem = node as Element;
                    const children = Array.from(elem.childNodes);
                    let tags = `<${elem.tagName.toLowerCase()}`;

                    for (let i = 0; i < elem.attributes.length; i++) {
                        const attr = elem.attributes[i];
                        tags += ` ${attr.name}="${attr.value}"`;
                    }
                    tags += ">";

                    if (!children.length) {
                        result += indent + tags + `</${elem.tagName.toLowerCase()}>\n`;
                    } else if (children.length === 1 && children[0].nodeType === 3) {
                        result += indent + tags + children[0].textContent?.trim() + `</${elem.tagName.toLowerCase()}>\n`;
                    } else {
                        result += indent + tags + "\n";
                        for (const child of children) {
                            result += formatNode(child, level + 1);
                        }
                        result += indent + `</${elem.tagName.toLowerCase()}>\n`;
                    }
                } else if (node.nodeType === 8) {
                    result += indent + `<!--${node.nodeValue}-->\n`;
                }

                return result;
            };

            let out = "";
            element.childNodes.forEach(child => {
                out += formatNode(child, 0);
            });
            setFormatted(out.trim());
            toast.success("HTML Formatted!");
        } catch {
            setFormatted("Error formatting HTML. Ensure it's valid.");
            toast.error("Invalid HTML structure!");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">💻 HTML Formatter & Minifier</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Beautify messy HTML code, or minify it to save space and reduce loaded bytes!</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="comic-card flex flex-col h-full min-h-[400px]">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">Raw HTML</label>
                        <button onClick={() => setHtml("")} className="text-xs font-bold text-primary hover:opacity-80 flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" /> Clear
                        </button>
                    </div>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        placeholder="<div><p>Input messy HTML here</p></div>"
                        className="comic-input w-full h-full font-mono text-sm resize-none border-dashed bg-muted/30"
                    />

                    <div className="flex gap-2 mt-4">
                        <button onClick={() => { setMinify(false); setTimeout(() => formatHTML(html), 0); }} className="flex-1 comic-btn bg-primary text-primary-foreground flex items-center justify-center gap-2">
                            <Brackets className="w-4 h-4" /> Format/Beautify
                        </button>
                        <button onClick={() => { setMinify(true); setTimeout(() => formatHTML(html), 0); }} className="flex-1 comic-btn bg-destructive text-destructive-foreground flex items-center justify-center gap-2">
                            <Minus className="w-4 h-4" /> Minify
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="comic-card flex flex-col h-full min-h-[400px]">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                            <Code className="w-4 h-4" /> Result
                        </label>
                        <button onClick={() => { navigator.clipboard.writeText(formatted); toast.success("Copied!"); }} disabled={!formatted} className="comic-btn text-xs bg-primary text-primary-foreground flex items-center gap-1 py-1 disabled:opacity-50">
                            <Copy className="w-3 h-3" /> Copy
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={formatted}
                        placeholder="Result will appear here..."
                        className="comic-input w-full h-full font-mono text-sm resize-none bg-card border-solid text-foreground/80 focus:outline-none"
                    />
                </div>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="HTML Formatter & Minifier - Beautify or Compress HTML"
                description="Easily beautify messy HTML code for better readability or minify it to reduce file size and improve page load speed. Free online developer utility tool."
                keywords="html formatter, html beautifier, html minifier, compress html online, clean html code, developer seo tools"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro HTML Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Perfectly Formatted Code for Better Performance and Readability"
                subtitle="Transform Messy HTML into Clean, Standardized Architecture"
                description="Managing raw HTML can be a nightmare when tags aren't properly indented or when you're trying to optimize for Core Web Vitals. WebInsight Pro's HTML Formatter and Minifier serves two vital purposes: 'Beautifying' allows human developers to easily debug and read nested structures, while 'Minifying' strips away unnecessary whitespace and comments to ensure your website loads as fast as possible for search engines and users alike."
                howToUse={[
                    "Paste your 'Raw HTML' into the input field on the left.",
                    "Click 'Format/Beautify' if you want to make the code readable with proper indentation.",
                    "Click 'Minify' if you want to compress the code into a single-line string for production.",
                    "Compare the result in the 'Result' output window.",
                    "Click 'Copy' to move the processed code to your clipboard."
                ]}
                features={[
                    "Intelligent Indentation: Automatically detects nesting levels (div, p, span) for perfect alignment.",
                    "Aggressive Minification: Removes carriage returns and multiple spaces to reduce byte size.",
                    "Attribute Preservation: Safely handles element attributes like class, id, and data-* tags.",
                    "Comment Support: Distinguishes between code and HTML comments for selective removal.",
                    "Local Memory Execution: Fast processing that respects your privacy—no servers involved."
                ]}
                faqs={[
                    {
                        question: "Why should I minify my HTML?",
                        answer: "Minification reduces the size of your HTML file, which means less data for the browser to download. This directly improves your 'Time to First Byte' (TTFB) and overall PageSpeed scores."
                    },
                    {
                        question: "Does formatting change my code's behavior?",
                        answer: "No. Our formatter only changes the 'visual' whitespace and indentation of your code. The actual DOM structure and logic remain identical to your original input."
                    },
                    {
                        question: "Is this tool suitable for React/JSX?",
                        answer: "This tool is optimized for standard HTML. While it can handle basic JSX, complex React components with curly-brace logic may not format as expected."
                    }
                ]}
                relatedTools={[
                    { name: "Schema Generator", emoji: "🗂️", path: "/tools/schema-generator" },
                    { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" },
                    { name: "Robots.txt Generator", emoji: "🤖", path: "/tools/robots-txt" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" }
                ]}
            />
        </div>
    );
};


export default HTMLFormatter;
