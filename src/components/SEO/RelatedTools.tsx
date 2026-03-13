import { Link } from "react-router-dom";

interface RelatedTool {
    title: string;
    path: string;
    emoji: string;
}

const toolsByCategory: Record<string, RelatedTool[]> = {
    seo: [
        { title: "SEO Audit", path: "/tools/seo-audit", emoji: "🔍" },
        { title: "Page Speed Test", path: "/tools/page-speed", emoji: "⚡" },
        { title: "Meta Tag Generator", path: "/tools/meta-tags", emoji: "🏷️" },
        { title: "Keyword Density", path: "/tools/keyword-density", emoji: "🔑" },
        { title: "SERP Preview", path: "/tools/serp-preview", emoji: "👀" },
        { title: "Backlink Checker", path: "/tools/backlinks", emoji: "🔗" },
        { title: "Broken Links", path: "/tools/broken-links", emoji: "⛓️" },
        { title: "Traffic Checker", path: "/tools/traffic-checker", emoji: "📊" },
    ],
    calculator: [
        { title: "Age Calculator", path: "/tools/age-calculator", emoji: "🎂" },
        { title: "BMI Calculator", path: "/tools/bmi-calculator", emoji: "⚖️" },
        { title: "EMI Calculator", path: "/tools/emi-calculator", emoji: "🏦" },
        { title: "GST Calculator", path: "/tools/gst-calculator", emoji: "🧾" },
        { title: "Income Tax", path: "/tools/income-tax", emoji: "💰" },
        { title: "Percentage Calc", path: "/tools/percentage-calculator", emoji: "📊" },
        { title: "FD/RD Calculator", path: "/tools/fd-rd-calculator", emoji: "🏦" },
        { title: "PF Calculator", path: "/tools/pf-calculator", emoji: "💵" },
    ],
    health: [
        { title: "BMI Calculator", path: "/tools/bmi-calculator", emoji: "⚖️" },
        { title: "Calorie Calculator", path: "/tools/calorie-calculator", emoji: "🔥" },
        { title: "TDEE Calculator", path: "/tools/tdee-calculator", emoji: "📊" },
        { title: "Water Intake", path: "/tools/water-intake", emoji: "💧" },
        { title: "Ideal Weight", path: "/tools/ideal-weight", emoji: "💪" },
    ],
    finance: [
        { title: "GST Calculator", path: "/tools/gst-calculator", emoji: "🧾" },
        { title: "Income Tax", path: "/tools/income-tax", emoji: "💰" },
        { title: "EMI Calculator", path: "/tools/emi-calculator", emoji: "🏦" },
        { title: "FD/RD Calculator", path: "/tools/fd-rd-calculator", emoji: "📈" },
        { title: "PF Calculator", path: "/tools/pf-calculator", emoji: "💵" },
        { title: "HRA Calculator", path: "/tools/hra-calculator", emoji: "🏠" },
        { title: "Discount Calc", path: "/tools/discount-calculator", emoji: "🏷️" },
        { title: "Profit & Loss", path: "/tools/profit-loss", emoji: "📉" },
        { title: "Currency Converter", path: "/tools/currency-converter", emoji: "💱" },
        { title: "Interest Calculator", path: "/tools/simple-interest", emoji: "🧮" },
    ],
    developer: [
        { title: "JSON Formatter", path: "/tools/json", emoji: "📋" },
        { title: "CSS Minifier", path: "/tools/css-minifier", emoji: "🎨" },
        { title: "JS Minifier", path: "/tools/js-minifier", emoji: "⚡" },
        { title: "Base64 Encoder", path: "/tools/base64", emoji: "🔄" },
        { title: "Hash Generator", path: "/tools/hash-generator", emoji: "🔐" },
        { title: "JWT Decoder", path: "/tools/jwt-decoder", emoji: "🔑" },
        { title: "Cron Generator", path: "/tools/cron-generator", emoji: "⏰" },
        { title: "HTTP Status Codes", path: "/tools/http-status-codes", emoji: "🌐" },
        { title: "CSS Gradient", path: "/tools/css-gradient", emoji: "🌈" },
        { title: "Color Palette", path: "/tools/color-palette", emoji: "🎨" },
    ],
    text: [
        { title: "Word Counter", path: "/tools/word-counter", emoji: "📝" },
        { title: "Grammar Checker", path: "/tools/grammar-checker", emoji: "✅" },
        { title: "Article Rewriter", path: "/tools/article-rewriter", emoji: "✍️" },
        { title: "Readability Score", path: "/tools/readability", emoji: "📖" },
        { title: "Markdown to HTML", path: "/tools/markdown-to-html", emoji: "📄" },
        { title: "Case Converter", path: "/tools/case-converter", emoji: "🔤" },
        { title: "Fancy Text", path: "/tools/fancy-text", emoji: "✨" },
        { title: "Lorem Ipsum", path: "/tools/lorem-ipsum", emoji: "📃" },
    ],
    social: [
        { title: "Instagram Fonts", path: "/tools/instagram-fonts", emoji: "📸" },
        { title: "Twitter Counter", path: "/tools/twitter-counter", emoji: "🐦" },
        { title: "YouTube Stats", path: "/tools/youtube-stats", emoji: "📺" },
        { title: "Image Size Guide", path: "/tools/social-image-sizes", emoji: "🖼️" },
        { title: "Hashtag Generator", path: "/tools/hashtags", emoji: "#️⃣" },
        { title: "Social Engagement", path: "/tools/engagement", emoji: "❤️" },
    ],
    utility: [
        { title: "QR Code Generator", path: "/tools/qr-code", emoji: "📱" },
        { title: "Password Generator", path: "/tools/password", emoji: "🔒" },
        { title: "Color Picker", path: "/tools/color-picker", emoji: "🎨" },
        { title: "URL Encoder", path: "/tools/url-encoder", emoji: "🔗" },
        { title: "Text to Speech", path: "/tools/text-to-speech", emoji: "🔊" },
        { title: "Image to Base64", path: "/tools/image-to-base64", emoji: "🖼️" },
        { title: "PDF Tools", path: "/tools/pdf-tools", emoji: "📄" },
        { title: "Image Tools", path: "/tools/image-tools", emoji: "🖼️" },
    ],
};

interface RelatedToolsProps {
    category: keyof typeof toolsByCategory;
    currentPath?: string;
    maxTools?: number;
}

const RelatedTools = ({ category, currentPath, maxTools = 6 }: RelatedToolsProps) => {
    const tools = (toolsByCategory[category] || toolsByCategory.utility)
        .filter(t => t.path !== currentPath)
        .slice(0, maxTools);

    if (tools.length === 0) return null;

    return (
        <div className="mt-8 bg-card border-4 border-border rounded-2xl p-6">
            <h3 className="font-black text-foreground text-lg mb-4">🔗 Related Free Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tools.map((tool, i) => (
                    <Link
                        key={i}
                        to={tool.path}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                        <span className="text-lg">{tool.emoji}</span>
                        <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors truncate">
                            {tool.title}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="mt-3 text-center">
                <Link to="/tools" className="text-xs font-black text-primary hover:underline">
                    View All 70+ Free Tools →
                </Link>
            </div>
        </div>
    );
};

export default RelatedTools;
