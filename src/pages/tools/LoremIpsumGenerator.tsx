import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, RefreshCw } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "porta", "nibh", "venenatis", "cras", "blandit", "turpis", "cursus", "viverra", "maecenas", "accumsan", "lacus", "vel", "facilisis", "volutpat", "lectus", "vestibulum", "mattis", "ullamcorper", "pellentesque", "habitant", "morbi", "tristique", "senectus", "netus", "malesuada", "fames", "ac", "egestas", "integer", "feugiat", "scelerisque", "varius", "nunc", "purus", "semper", "eget", "duis", "tellus"];

const LoremIpsumGenerator = () => {
    const [count, setCount] = useState(3);
    const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

    const generateSentence = () => {
        const len = 8 + Math.floor(Math.random() * 12);
        const words = Array.from({ length: len }, randomWord);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(" ") + ".";
    };

    const generateParagraph = () => {
        const sentences = 3 + Math.floor(Math.random() * 5);
        return Array.from({ length: sentences }, generateSentence).join(" ");
    };

    const generate = () => {
        if (type === "words") {
            setOutput(Array.from({ length: count }, randomWord).join(" "));
        } else if (type === "sentences") {
            setOutput(Array.from({ length: count }, generateSentence).join(" "));
        } else {
            setOutput(Array.from({ length: count }, generateParagraph).join("\n\n"));
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!output) generate();

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">📝 Lorem Ipsum Generator</h1>

            <div className="comic-card mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Count: {count}</label>
                        <input type="range" min={1} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Type</label>
                        <div className="flex gap-2">
                            {(["paragraphs", "sentences", "words"] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`comic-btn text-xs flex-1 ${type === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={generate} className="comic-btn bg-secondary text-secondary-foreground w-full flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" strokeWidth={3} /> Generate
                </button>
            </div>

            {output && (
                <div className="comic-card animate-slide-up">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase">
                            {output.split(/\s+/).length} words
                        </span>
                        <button onClick={handleCopy} className="comic-btn bg-card text-foreground text-xs flex items-center gap-1">
                            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                    <div className="comic-input bg-background/50 whitespace-pre-wrap text-sm" style={{ minHeight: "120px", cursor: "default" }}>
                        {output}
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Lorem Ipsum Generator - Professional Placeholder Text"
                description="Generate standard and unique Lorem Ipsum placeholder text for your designs. Choose between paragraphs, sentences, or words with our free online generator."
                keywords="lorem ipsum generator, placeholder text, dummy text, lorem ipsum paragraphs, text for web design"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Lorem Ipsum Tool",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DesignApplication"
                }}
            />

            <SEOSection
                title="The Designer's Essential Dummy Text Utility"
                subtitle="High-Quality Placeholder Content for Any Layout"
                description="Designers and developers often need filler text to visualize how a layout will look before the final copy is ready. 'Lorem Ipsum' has been the industry standard since the 1500s, providing a natural distribution of letters that makes it look like readable English. Whether you need a single word or multiple paragraphs, WebInsight Pro gives you full control over your dummy text generation."
                howToUse={[
                    "Adjust the 'Count' slider to choose how many units you need (1 to 20).",
                    "Select the 'Type' of content: Paragraphs, Sentences, or Words.",
                    "Click the 'Generate' button to refresh the output with new random combinations.",
                    "Check the 'Word Count' displayed in the top corner of the output box.",
                    "Use the 'Copy' button to instantly grab the text for your design file."
                ]}
                features={[
                    "Deterministic Randomness: Uses a curated list of classic Latin words for a realistic look.",
                    "Paragraph Formatting: Automatically adds double-spacing between paragraphs for easy readability.",
                    "Sentence Logic: Capitalizes the start of sentences and ends them with proper punctuation.",
                    "Live Statistics: Instantly see the total word count of your generated text.",
                    "Standard Compliance: Produces the standard Cicero text used by professional designers worldwide."
                ]}
                faqs={[
                    {
                        question: "What does Lorem Ipsum mean?",
                        answer: "It is a corrupted version of 'De finibus bonorum et malorum' by Cicero. While the words are Latin, they are shuffled in a way that makes them nonsensical, focusing the viewer on the layout rather than the content."
                    },
                    {
                        question: "Why should I use placeholder text?",
                        answer: "Using real text during the design phase can distract clients or stakeholders. Lorem Ipsum allows them to focus on the visual hierarchy, typography, and spacing."
                    },
                    {
                        question: "Is there a limit on how much I can generate?",
                        answer: "Our tool supports up to 20 paragraphs at a time, which is usually enough for even the most complex web page mocks."
                    }
                ]}
                relatedTools={[
                    { name: "Word Counter", emoji: "📝", path: "/tools/word-counter" },
                    { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
                    { name: "Fancy Text", emoji: "✨", path: "/tools/fancy-text" },
                    { name: "HTML Formatter", emoji: "🌐", path: "/tools/html-formatter" }
                ]}
            />
        </div>
    );
};

export default LoremIpsumGenerator;
