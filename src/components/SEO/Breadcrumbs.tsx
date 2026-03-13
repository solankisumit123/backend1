import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const breadcrumbNames: Record<string, string> = {
    "/": "Home",
    "/tools": "All Tools",
    "/dashboard": "Dashboard",
    "/about": "About Us",
    "/contact": "Contact",
    "/blog": "Blog",
    "/seo-strategy": "SEO Strategy",
    "/privacy-policy": "Privacy Policy",
    // Tool pages
    "/tools/seo-audit": "SEO Audit",
    "/tools/page-speed": "Page Speed",
    "/tools/meta-tags": "Meta Tag Generator",
    "/tools/keyword-density": "Keyword Density",
    "/tools/word-counter": "Word Counter",
    "/tools/serp-preview": "SERP Preview",
    "/tools/qr-code": "QR Code Generator",
    "/tools/password": "Password Generator",
    "/tools/json": "JSON Formatter",
    "/tools/age-calculator": "Age Calculator",
    "/tools/bmi-calculator": "BMI Calculator",
    "/tools/emi-calculator": "EMI Calculator",
    "/tools/gst-calculator": "GST Calculator",
    "/tools/income-tax": "Income Tax Calculator",
    "/tools/currency-converter": "Currency Converter",
    "/tools/discount-calculator": "Discount Calculator",
    "/tools/profit-loss": "Profit & Loss Calculator",
    "/tools/fd-rd-calculator": "FD/RD Calculator",
    "/tools/pf-calculator": "PF Calculator",
    "/tools/hra-calculator": "HRA Calculator",
    "/tools/instagram-fonts": "Instagram Font Generator",
    "/tools/twitter-counter": "Twitter Character Counter",
    "/tools/youtube-stats": "YouTube Channel Stats",
    "/tools/social-image-sizes": "Social Media Image Sizes",
    "/tools/image-to-base64": "Image to Base64",
    "/tools/http-status-codes": "HTTP Status Codes",
    "/tools/markdown-to-html": "Markdown to HTML",
    "/tools/css-gradient": "CSS Gradient Generator",
    "/tools/color-palette": "Color Palette Generator",
    "/tools/tdee-calculator": "TDEE Calculator",
    "/tools/water-intake": "Water Intake Calculator",
    "/tools/ideal-weight": "Ideal Body Weight",
    "/tools/readability": "Readability Score",
    "/tools/article-rewriter": "Article Rewriter",
    "/tools/grammar-checker": "Grammar Checker",
    "/tools/cron-generator": "Cron Job Generator",
    "/tools/calorie-calculator": "Calorie Calculator",
    "/tools/simple-interest": "Interest Calculator",
    "/tools/days-between-dates": "Days Between Dates",
    "/tools/unit-converter": "Unit Converter",
    "/tools/percentage-calculator": "Percentage Calculator",
    "/tools/stopwatch": "Stopwatch & Timer",
    "/tools/love-calculator": "Love Calculator",
    "/tools/typing-speed": "Typing Speed Test",
    "/tools/number-to-words": "Number to Words",
    "/tools/fancy-text": "Fancy Text Generator",
    "/tools/pdf-tools": "PDF Tools",
    "/tools/image-tools": "Image Tools",
    "/tools/color-picker": "Color Picker",
    "/tools/base64": "Base64 Encoder",
    "/tools/url-encoder": "URL Encoder",
    "/tools/lorem-ipsum": "Lorem Ipsum Generator",
    "/tools/text-to-speech": "Text to Speech",
    "/tools/case-converter": "Case Converter",
    "/tools/hash-generator": "Hash Generator",
    "/tools/css-minifier": "CSS Minifier",
    "/tools/js-minifier": "JS Minifier",
    "/tools/html-to-markdown": "HTML to Markdown",
    "/tools/robots-txt": "Robots.txt Generator",
    "/tools/sitemap": "Sitemap Generator",
    "/tools/jwt-decoder": "JWT Decoder",
    "/tools/html-formatter": "HTML Formatter",
    "/tools/ssl-checker": "SSL Checker",
    "/tools/dns-lookup": "DNS Lookup",
    "/tools/domain-age": "Domain Age",
    "/tools/whois": "WHOIS Lookup",
    "/tools/broken-links": "Broken Links",
    "/tools/schema": "Schema Generator",
    "/tools/ip-lookup": "IP Lookup",
    "/tools/hosting": "Hosting Checker",
    "/tools/my-ip": "My IP Address",
    "/tools/url-slug-generator": "URL Slug Generator",
    "/tools/password-strength": "Password Strength",
    "/tools/ad-revenue": "Ad Revenue Calculator",
    "/tools/adsense": "AdSense Estimator",
    "/tools/youtube-revenue": "YouTube Revenue",
    "/tools/blog-revenue": "Blog Revenue",
    "/tools/affiliate": "Affiliate Earnings",
    "/tools/competitor": "Competitor Analysis",
    "/tools/hashtags": "Hashtag Generator",
    "/tools/engagement": "Social Engagement",
    "/tools/keyword-difficulty": "Keyword Difficulty",
    "/tools/backlinks": "Backlink Checker",
    "/tools/og-checker": "Open Graph Checker",
    "/tools/yt-thumbnail": "YT Thumbnails",
    "/tools/utm-builder": "UTM Builder",
    "/tools/keyword-typo-generator": "Keyword Typos",
    "/tools/traffic-checker": "Website Traffic",
    "/tools/word-combiner": "Word Combiner",
};

const Breadcrumbs = () => {
    const location = useLocation();
    const path = location.pathname;

    // Don't show on homepage
    if (path === "/") return null;

    const segments = path.split("/").filter(Boolean);
    const crumbs: { label: string; path: string }[] = [
        { label: "Home", path: "/" },
    ];

    let currentPath = "";
    segments.forEach((seg) => {
        currentPath += `/${seg}`;
        const label = breadcrumbNames[currentPath] || seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        crumbs.push({ label, path: currentPath });
    });

    // Schema.org BreadcrumbList
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": crumbs.map((crumb, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": crumb.label,
            "item": `https://webinsightpro.site${crumb.path}`,
        })),
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

            {/* Visual Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 pb-2">
                <ol className="flex items-center flex-wrap gap-1 text-xs font-bold text-muted-foreground">
                    {crumbs.map((crumb, i) => (
                        <li key={i} className="flex items-center gap-1">
                            {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
                            {i === crumbs.length - 1 ? (
                                <span className="text-foreground">{crumb.label}</span>
                            ) : (
                                <Link to={crumb.path} className="hover:text-primary transition-colors flex items-center gap-1">
                                    {i === 0 && <Home className="w-3 h-3" />}
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumbs;
