import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, Type, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";


const CaseConverter = () => {
    const [text, setText] = useState("");

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success("Text copied to clipboard!");
    };

    const convert = (type: string) => {
        if (!text) return;
        let newText = text;

        switch (type) {
            case "upper":
                newText = text.toUpperCase();
                break;
            case "lower":
                newText = text.toLowerCase();
                break;
            case "title":
                newText = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                break;
            case "sentence":
                newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                break;
            case "camel":
                newText = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
                break;
            case "pascal":
                newText = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
                newText = newText.charAt(0).toUpperCase() + newText.slice(1);
                break;
            case "snake":
                newText = text.trim().toLowerCase().replace(/[\s\W]+/g, '_');
                break;
            case "kebab":
                newText = text.trim().toLowerCase().replace(/[\s\W]+/g, '-');
                break;
            case "alternating":
                newText = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
                break;
        }
        setText(newText);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔠 Case Converter</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">Convert your text to any case instantly!</p>

            <div className="comic-card mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <Type className="w-4 h-4" /> Your Text
                    </label>
                    <div className="flex gap-2">
                        <button onClick={() => setText("")} className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" /> Clear
                        </button>
                        <button onClick={handleCopy} className="text-xs font-bold text-primary hover:opacity-80 flex items-center gap-1">
                            <Copy className="w-3 h-3" /> Copy
                        </button>
                    </div>
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="comic-input w-full h-48 resize-y"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button onClick={() => convert("upper")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-red/10 border-2 border-border">UPPERCASE</button>
                <button onClick={() => convert("lower")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-blue/10 border-2 border-border">lowercase</button>
                <button onClick={() => convert("title")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-green/10 border-2 border-border">Title Case</button>
                <button onClick={() => convert("sentence")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-orange/10 border-2 border-border">Sentence case.</button>
                <button onClick={() => convert("camel")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-purple/10 border-2 border-border">camelCase</button>
                <button onClick={() => convert("pascal")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-red/10 border-2 border-border">PascalCase</button>
                <button onClick={() => convert("snake")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-blue/10 border-2 border-border">snake_case</button>
                <button onClick={() => convert("kebab")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-green/10 border-2 border-border">kebab-case</button>
                <button onClick={() => convert("alternating")} className="comic-btn bg-background text-foreground text-sm hover:bg-comic-orange/10 border-2 border-border">aLtErNaTiNg cAsE</button>
            </div>

            {text && (
                <div className="mt-8 text-center text-sm font-bold text-muted-foreground">
                    Character Count: <span className="text-foreground">{text.length}</span> |
                    Word Count: <span className="text-foreground">{text.split(/\s+/).filter(w => w.length > 0).length}</span>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Case Converter Online - UPPERCASE, lowercase & Title Case"
                description="Easily convert your text to uppercase, lowercase, title case, sentence case, and more. Free online text converter with real-time character and word count."
                keywords="case converter, upper case to lower case, title case generator, sentence case, camelCase converter, snake_case maker"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Case Converter",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Professional Text Transformation Tool"
                subtitle="One-Click Formatting for Any Document or Code"
                description="Writing content only to realize you left Caps Lock on? Or perhaps you need to format variable names for your next coding project into snake_case or camelCase? WebInsight Pro's Case Converter is a versatile text tool that handles everything from academic sentence formatting to developer string manipulation. Save time and avoid manual retyping with our instant transformation engine."
                howToUse={[
                    "Paste your raw text into the 'Your Text' area.",
                    "Choose from 9 different transformation options like UPPERCASE, Title Case, or aLtErNaTiNg cAsE.",
                    "The text converts instantly as you click the button.",
                    "View your 'Character Count' and 'Word Count' at the bottom of the page.",
                    "Click 'Copy' to grab the formatted text for your project."
                ]}
                features={[
                    "9 Dynamic Modes: Includes Sentence, Title, Upper, Lower, Camel, Pascal, Snake, Kebab, and Alternating.",
                    "Developer Friendly: Quickly generate clean snake_case or camelCase for programming.",
                    "Rich Statistics: Detailed real-time character and word count tracking.",
                    "Clean UI: Minimalist interface with comic-style aesthetics for a better experience.",
                    "Completely Private: No text is ever uploaded; all processing happens in your browser's memory."
                ]}
                faqs={[
                    {
                        question: "What is Sentence Case?",
                        answer: "Sentence case capitalizes the first letter of every sentence and converts the rest to lowercase, making it perfect for standard paragraphs."
                    },
                    {
                        question: "How does the Title Case converter work?",
                        answer: "Our Title Case tool capitalizes the first letter of every word, which is the standard format for book titles, blog headers, and news articles."
                    },
                    {
                        question: "Are there any limits on text length?",
                        answer: "The tool can handle thousands of words instantly. While there isn't a hard limit, very large documents (several megabytes) might slow down the browser rendering slightly."
                    }
                ]}
                relatedTools={[
                    { name: "Word Counter", emoji: "📝", path: "/tools/word-counter" },
                    { name: "Fancy Text", emoji: "✨", path: "/tools/fancy-text" },
                    { name: "Binary Converter", emoji: "🔢", path: "/tools/binary-converter" },
                    { name: "Loreum Ipsum", emoji: "📜", path: "/tools/lorem-ipsum" }
                ]}
            />
        </div>
    );
};

export default CaseConverter;
