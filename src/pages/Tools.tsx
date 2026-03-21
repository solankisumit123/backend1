import { Link } from "react-router-dom";
import ToolCard from "@/components/ToolCard";
import { useState } from "react";
import {
  Search, DollarSign, Gauge, Tag, Type, Link2, BarChart3,
  Calculator, Youtube, PenTool, TrendingUp, Hash,
  Heart, Shield, Server, Globe, MapPin, Calendar, Clock,
  User, LinkIcon, Code, FileText, QrCode,
  Paintbrush, Braces, FileCode, Volume2,
  Bot, Map, Eye, Image, ArrowRightLeft, Key, AlignLeft,
  Wand2, Lock, KeySquare, ShieldCheck, CreditCard, Globe2, FilePlus2, X
} from "lucide-react";

import { massiveToolsList } from "../data/massiveToolsList";

const categories = [
  {
    title: "🧠 Core SEO Tools",
    tools: [
      { title: "SEO Audit", desc: "Full website SEO analysis", icon: Search, to: "/tools/seo-audit", color: "bg-comic-red text-primary-foreground" },
      { title: "Page Speed", desc: "Desktop & mobile speed scores", icon: Gauge, to: "/tools/page-speed", color: "bg-comic-blue text-accent-foreground" },
      { title: "Meta Tag Generator", desc: "Generate OG & Twitter tags", icon: Tag, to: "/tools/meta-tags", color: "bg-comic-green text-secondary-foreground" },
      { title: "Keyword Density", desc: "Analyze keyword usage", icon: Type, to: "/tools/keyword-density", color: "bg-comic-orange text-primary-foreground" },
      { title: "Word Counter", desc: "Count words & chars", icon: FileText, to: "/tools/word-counter", color: "bg-comic-blue text-accent-foreground" },
      { title: "SERP Preview", desc: "Preview search appearance", icon: Search, to: "/tools/serp-preview", color: "bg-comic-purple text-primary-foreground" },
    ],
  },
  {
    title: "🔑 Keyword Research",
    tools: [
      { title: "Keyword Planner", desc: "Find SEO keyword ideas", icon: Key, to: "/tools/keyword-planner", color: "bg-comic-red text-primary-foreground" },
      { title: "Long Tail Keywords", desc: "Discover long-tail variations", icon: TrendingUp, to: "/tools/long-tail-keyword", color: "bg-comic-blue text-accent-foreground" },
      { title: "Question Keywords", desc: "Find 'how to' questions", icon: Search, to: "/tools/question-keyword", color: "bg-comic-green text-secondary-foreground" },
      { title: "Related Keywords", desc: "LSI & Semantic keywords", icon: Link2, to: "/tools/related-keywords", color: "bg-comic-orange text-primary-foreground" },
      { title: "Search Volume", desc: "Check monthly search traffic", icon: BarChart3, to: "/tools/search-volume-checker", color: "bg-comic-purple text-primary-foreground" },
      { title: "CPC Checker", desc: "Check Ads Cost Per Click", icon: DollarSign, to: "/tools/cpc-checker", color: "bg-comic-red text-primary-foreground" },
      { title: "Trending Keywords", desc: "Find trending topics", icon: TrendingUp, to: "/tools/trending-keywords", color: "bg-comic-blue text-accent-foreground" },
    ],
  },
  {
    title: "🔧 Utility Tools",
    tools: [
      { title: "QR Code Generator", desc: "Create QR codes instantly", icon: QrCode, to: "/tools/qr-code", color: "bg-comic-green text-secondary-foreground" },
      { title: "Password Generator", desc: "Strong secure passwords", icon: Key, to: "/tools/password", color: "bg-comic-red text-primary-foreground" },
      { title: "JSON Formatter", desc: "Beautify & minify JSON", icon: Braces, to: "/tools/json", color: "bg-comic-blue text-accent-foreground" },
      { title: "Lorem Ipsum", desc: "Generate dummy text", icon: AlignLeft, to: "/tools/lorem-ipsum", color: "bg-comic-orange text-primary-foreground" },
      { title: "Base64 Encoder", desc: "Encode / decode Base64", icon: ArrowRightLeft, to: "/tools/base64", color: "bg-comic-purple text-primary-foreground" },
      { title: "URL Encoder", desc: "Encode / decode URLs", icon: LinkIcon, to: "/tools/url-encoder", color: "bg-comic-green text-secondary-foreground" },
      { title: "Color Picker", desc: "HEX / RGB / HSL convert", icon: Paintbrush, to: "/tools/color-picker", color: "bg-comic-red text-primary-foreground" },
      { title: "Text to Speech", desc: "Convert text to audio", icon: Volume2, to: "/tools/text-to-speech", color: "bg-comic-blue text-accent-foreground" },
      { title: "Case Converter", desc: "UPPERCASE, lowercase, etc.", icon: Type, to: "/tools/case-converter", color: "bg-comic-orange text-primary-foreground" },
      { title: "Hash Generator", desc: "SHA1, SHA256 hashes", icon: Lock, to: "/tools/hash-generator", color: "bg-comic-red text-primary-foreground" },
      { title: "PDF Tools", desc: "Merge, Split, Image→PDF, Extract Text", icon: FilePlus2, to: "/tools/pdf-tools", color: "bg-comic-red text-primary-foreground" },
      { title: "Image Tools", desc: "Compress, Resize, Convert, Rotate", icon: Image, to: "/tools/image-tools", color: "bg-comic-green text-secondary-foreground" },
      { title: "Fancy Text", desc: "Stylish fonts for Instagram & WhatsApp", icon: Wand2, to: "/tools/fancy-text", color: "bg-comic-purple text-primary-foreground" },
      { title: "Random Number", desc: "Generate random numbers in any range", icon: Calculator, to: "/tools/random-number", color: "bg-comic-blue text-accent-foreground" },
      { title: "Favicon Generator", desc: "Create custom website favicons", icon: Paintbrush, to: "/tools/favicon-generator", color: "bg-comic-orange text-primary-foreground" },
    ],
  },
  {
    title: "🧮 Calculators",
    tools: [
      { title: "Age Calculator", desc: "Calculate exact age in years, months, days", icon: Calendar, to: "/tools/age-calculator", color: "bg-comic-orange text-primary-foreground" },
      { title: "BMI Calculator", desc: "Body Mass Index & health status", icon: Heart, to: "/tools/bmi-calculator", color: "bg-comic-green text-secondary-foreground" },
      { title: "EMI Calculator", desc: "Home, Car & Personal loan EMI", icon: Calculator, to: "/tools/emi-calculator", color: "bg-comic-blue text-accent-foreground" },
      { title: "Unit Converter", desc: "Temperature, Length, Weight & more", icon: ArrowRightLeft, to: "/tools/unit-converter", color: "bg-comic-purple text-primary-foreground" },
      { title: "Percentage Calc", desc: "Discounts, increase & change", icon: BarChart3, to: "/tools/percentage-calculator", color: "bg-comic-red text-primary-foreground" },
      { title: "Stopwatch & Timer", desc: "Online stopwatch with lap times", icon: Clock, to: "/tools/stopwatch", color: "bg-comic-orange text-primary-foreground" },
      { title: "Love Calculator", desc: "Calculate love compatibility %", icon: Heart, to: "/tools/love-calculator", color: "bg-comic-red text-primary-foreground" },
      { title: "Typing Speed Test", desc: "Test your WPM typing speed", icon: Type, to: "/tools/typing-speed", color: "bg-comic-blue text-accent-foreground" },
      { title: "Number to Words", desc: "Convert numbers to English words", icon: FileText, to: "/tools/number-to-words", color: "bg-comic-purple text-primary-foreground" },
      { title: "Calorie Calculator", desc: "Daily calorie & macro needs", icon: BarChart3, to: "/tools/calorie-calculator", color: "bg-comic-orange text-primary-foreground" },
      { title: "Interest Calculator", desc: "Simple & Compound interest", icon: Calculator, to: "/tools/simple-interest", color: "bg-comic-green text-secondary-foreground" },
      { title: "Days Between Dates", desc: "Days, weeks, workdays between dates", icon: Calendar, to: "/tools/days-between-dates", color: "bg-comic-blue text-accent-foreground" },
      { title: "Compound Interest", desc: "Investment growth calculator", icon: TrendingUp, to: "/tools/compound-interest", color: "bg-comic-green text-secondary-foreground" },
      { title: "SIP Calculator", desc: "Mutual fund SIP returns", icon: TrendingUp, to: "/tools/sip-calculator", color: "bg-comic-blue text-accent-foreground" },
      { title: "Fuel Cost", desc: "Trip & commute fuel expense", icon: Calculator, to: "/tools/fuel-cost", color: "bg-comic-orange text-primary-foreground" },
      { title: "Pregnancy Calculator", desc: "Due date & pregnancy milestones", icon: Heart, to: "/tools/pregnancy-calculator", color: "bg-comic-red text-primary-foreground" },
      { title: "Read Time", desc: "Blog post reading time estimator", icon: Clock, to: "/tools/read-time", color: "bg-comic-purple text-primary-foreground" },
    ],
  },
  {
    title: "💰 Earning Calculators",
    tools: [
      { title: "Ad Revenue", desc: "Calculate ad earnings", icon: DollarSign, to: "/tools/ad-revenue", color: "bg-comic-green text-secondary-foreground" },
      { title: "AdSense Estimator", desc: "Estimate AdSense revenue", icon: Calculator, to: "/tools/adsense", color: "bg-comic-blue text-accent-foreground" },
      { title: "YouTube Revenue", desc: "Estimate YT earnings", icon: Youtube, to: "/tools/youtube-revenue", color: "bg-comic-red text-primary-foreground" },
      { title: "Blog Revenue", desc: "Calculate blog income", icon: PenTool, to: "/tools/blog-revenue", color: "bg-comic-orange text-primary-foreground" },
      { title: "Affiliate Earnings", desc: "Track affiliate income", icon: TrendingUp, to: "/tools/affiliate", color: "bg-comic-purple text-primary-foreground" },
    ],
  },
  {
    title: "📈 Marketing Tools",
    tools: [
      { title: "Competitor Analysis", desc: "Spy on competitors", icon: TrendingUp, to: "/tools/competitor", color: "bg-comic-red text-primary-foreground" },
      { title: "Hashtag Generator", desc: "Generate trending hashtags", icon: Hash, to: "/tools/hashtags", color: "bg-comic-green text-secondary-foreground" },
      { title: "Social Engagement", desc: "Calculate engagement rate", icon: Heart, to: "/tools/engagement", color: "bg-comic-orange text-primary-foreground" },
      { title: "Keyword Difficulty", desc: "Check keyword competition", icon: Gauge, to: "/tools/keyword-difficulty", color: "bg-comic-purple text-primary-foreground" },
      { title: "Backlink Checker", desc: "Check backlink profile", icon: Link2, to: "/tools/backlinks", color: "bg-comic-blue text-accent-foreground" },
      { title: "Open Graph Checker", desc: "Check social meta tags", icon: Eye, to: "/tools/og-checker", color: "bg-comic-green text-secondary-foreground" },
      { title: "UTM Builder", desc: "Create tracking links", icon: Link2, to: "/tools/utm-builder", color: "bg-comic-blue text-accent-foreground" },
      { title: "Keyword Typos", desc: "Generate misspellings", icon: Wand2, to: "/tools/keyword-typo-generator", color: "bg-comic-orange text-primary-foreground" },
      { title: "Website Traffic", desc: "Traffic & Rev Estimate", icon: BarChart3, to: "/tools/traffic-checker", color: "bg-comic-green text-secondary-foreground" },
      { title: "Word Combiner", desc: "Merge words for PPC", icon: ArrowRightLeft, to: "/tools/word-combiner", color: "bg-comic-purple text-primary-foreground" },
      { title: "YouTube Keywords", desc: "Find best YouTube video keywords", icon: Youtube, to: "/tools/youtube-keyword", color: "bg-comic-red text-primary-foreground" },
      { title: "Amazon Keywords", desc: "Product keywords for sellers", icon: Hash, to: "/tools/amazon-keyword", color: "bg-comic-orange text-primary-foreground" },
      { title: "Keyword Suggestion", desc: "Get search autocomplete ideas", icon: Search, to: "/tools/google-suggest", color: "bg-comic-blue text-accent-foreground" },
      { title: "Meta Title Generator", desc: "SEO titles that rank & get clicks", icon: Tag, to: "/tools/meta-title-generator", color: "bg-comic-green text-secondary-foreground" },
      { title: "Meta Description", desc: "Click-worthy page descriptions", icon: FileText, to: "/tools/meta-description-generator", color: "bg-comic-purple text-primary-foreground" },
      { title: "CTR Calculator", desc: "Click-through rate calculator", icon: BarChart3, to: "/tools/ctr-calculator", color: "bg-comic-orange text-primary-foreground" },
      { title: "ROI Calculator", desc: "Return on investment calculator", icon: TrendingUp, to: "/tools/roi-calculator", color: "bg-comic-green text-secondary-foreground" },
      { title: "CVR Calculator", desc: "Conversion rate & revenue per visitor", icon: BarChart3, to: "/tools/conversion-rate-calculator", color: "bg-comic-blue text-accent-foreground" },
    ],
  },
  {
    title: "⚙️ Technical Tools",
    tools: [
      { title: "SSL Checker", desc: "Verify SSL certificate", icon: Shield, to: "/tools/ssl-checker", color: "bg-comic-green text-secondary-foreground" },
      { title: "DNS Lookup", desc: "Check DNS records", icon: Server, to: "/tools/dns-lookup", color: "bg-comic-blue text-accent-foreground" },
      { title: "Domain Age", desc: "Check domain registration", icon: Calendar, to: "/tools/domain-age", color: "bg-comic-orange text-primary-foreground" },
      { title: "WHOIS Lookup", desc: "Domain ownership info", icon: User, to: "/tools/whois", color: "bg-comic-purple text-primary-foreground" },
      { title: "Broken Links", desc: "Find broken links", icon: LinkIcon, to: "/tools/broken-links", color: "bg-comic-red text-primary-foreground" },
      { title: "Schema Generator", desc: "Create structured data", icon: Code, to: "/tools/schema", color: "bg-comic-green text-secondary-foreground" },
      { title: "IP Lookup", desc: "Find IP address info", icon: MapPin, to: "/tools/ip-lookup", color: "bg-comic-orange text-primary-foreground" },
      { title: "Hosting Checker", desc: "Identify web host", icon: Globe, to: "/tools/hosting", color: "bg-comic-purple text-primary-foreground" },
      { title: "My IP Address", desc: "What is my public IP?", icon: Globe2, to: "/tools/my-ip", color: "bg-comic-blue text-accent-foreground" },
      { title: "URL Slug Maker", desc: "SEO-friendly URL slugs", icon: LinkIcon, to: "/tools/url-slug-generator", color: "bg-comic-green text-secondary-foreground" },
    ],
  },
  {
    title: "🛠️ Developer Tools",
    tools: [
      { title: "CSS Minifier", desc: "Minify & beautify CSS", icon: Paintbrush, to: "/tools/css-minifier", color: "bg-comic-blue text-accent-foreground" },
      { title: "JS Minifier", desc: "Compress JavaScript", icon: FileCode, to: "/tools/js-minifier", color: "bg-comic-orange text-primary-foreground" },
      { title: "HTML to Markdown", desc: "Convert HTML to MD", icon: Code, to: "/tools/html-to-markdown", color: "bg-comic-green text-secondary-foreground" },
      { title: "Robots.txt Maker", desc: "Generate robots.txt", icon: Bot, to: "/tools/robots-txt", color: "bg-comic-red text-primary-foreground" },
      { title: "Sitemap Generator", desc: "Create XML sitemaps", icon: Map, to: "/tools/sitemap", color: "bg-comic-purple text-primary-foreground" },
      { title: "JWT Decoder", desc: "Decode JSON Web Tokens", icon: KeySquare, to: "/tools/jwt-decoder", color: "bg-comic-orange text-primary-foreground" },
      { title: "HTML Formatter", desc: "Format & Minify HTML", icon: Code, to: "/tools/html-formatter", color: "bg-comic-blue text-accent-foreground" },
    ],
  },
  {
    title: "🛡️ Security Tools",
    tools: [
      { title: "Password Strength", desc: "Test password crack time", icon: ShieldCheck, to: "/tools/password-strength", color: "bg-comic-green text-secondary-foreground" },
    ],
  },
  {
    title: "📱 Social Media Tools",
    tools: [
      { title: "Instagram Fonts", desc: "Cool & stylish bio fonts", icon: Type, to: "/tools/instagram-fonts", color: "bg-comic-purple text-primary-foreground" },
      { title: "Twitter/X Counter", desc: "280 char counter for tweets", icon: Hash, to: "/tools/twitter-counter", color: "bg-comic-blue text-accent-foreground" },
      { title: "YouTube Stats", desc: "Channel statistics analyzer", icon: Youtube, to: "/tools/youtube-stats", color: "bg-comic-red text-primary-foreground" },
      { title: "Image Size Guide", desc: "All social media dimensions", icon: Image, to: "/tools/social-image-sizes", color: "bg-comic-green text-secondary-foreground" },
      { title: "Instagram Bio", desc: "Create compelling IG bios", icon: User, to: "/tools/instagram-bio-generator", color: "bg-comic-purple text-primary-foreground" },
      { title: "Social Captions", desc: "Captions for IG, LinkedIn, Twitter", icon: PenTool, to: "/tools/social-caption-generator", color: "bg-comic-blue text-accent-foreground" },
      { title: "YouTube Tags", desc: "Generate 30 video tags from title", icon: Youtube, to: "/tools/youtube-tag-generator", color: "bg-comic-red text-primary-foreground" },
    ],
  },
  {
    title: "💰 Finance & India Calculators",
    tools: [
      { title: "GST Calculator", desc: "Add / remove GST instantly", icon: Calculator, to: "/tools/gst-calculator", color: "bg-comic-orange text-primary-foreground" },
      { title: "Income Tax", desc: "Old vs New regime comparison", icon: DollarSign, to: "/tools/income-tax", color: "bg-comic-red text-primary-foreground" },
      { title: "Currency Converter", desc: "Real-time exchange rates", icon: Globe, to: "/tools/currency-converter", color: "bg-comic-blue text-accent-foreground" },
      { title: "Discount Calculator", desc: "Calculate savings & sale price", icon: Tag, to: "/tools/discount-calculator", color: "bg-comic-green text-secondary-foreground" },
      { title: "Profit & Loss", desc: "Profit %, markup & margin", icon: TrendingUp, to: "/tools/profit-loss", color: "bg-comic-purple text-primary-foreground" },
      { title: "FD/RD Calculator", desc: "Fixed & recurring deposit returns", icon: Calculator, to: "/tools/fd-rd-calculator", color: "bg-comic-blue text-accent-foreground" },
      { title: "PF Calculator", desc: "EPF retirement corpus", icon: Calculator, to: "/tools/pf-calculator", color: "bg-comic-orange text-primary-foreground" },
      { title: "HRA Calculator", desc: "HRA tax exemption", icon: Calculator, to: "/tools/hra-calculator", color: "bg-comic-red text-primary-foreground" },
      { title: "MRR Calculator", desc: "Monthly Recurring Revenue for SaaS", icon: TrendingUp, to: "/tools/mrr-calculator", color: "bg-comic-blue text-accent-foreground" },
      { title: "Churn Rate", desc: "Customer churn & LTV calculator", icon: Calculator, to: "/tools/churn-rate-calculator", color: "bg-comic-orange text-primary-foreground" },
      { title: "SaaS Pricing", desc: "Design pricing tiers & revenue plans", icon: DollarSign, to: "/tools/saas-pricing-calculator", color: "bg-comic-green text-secondary-foreground" },
      { title: "Retirement Planner", desc: "Retirement corpus & income planning", icon: Calculator, to: "/tools/retirement-calculator", color: "bg-comic-purple text-primary-foreground" },
    ],
  },
  {
    title: "🖼️ Image & Design Tools",
    tools: [
      { title: "Image to Base64", desc: "Convert image to data URI", icon: Image, to: "/tools/image-to-base64", color: "bg-comic-blue text-accent-foreground" },
      { title: "CSS Gradient", desc: "Visual gradient generator", icon: Paintbrush, to: "/tools/css-gradient", color: "bg-comic-purple text-primary-foreground" },
      { title: "Color Palette", desc: "Generate color palettes", icon: Paintbrush, to: "/tools/color-palette", color: "bg-comic-green text-secondary-foreground" },
    ],
  },
  {
    title: "✍️ Text & Writing Tools",
    tools: [
      { title: "Grammar Checker", desc: "Check grammar & spelling", icon: FileText, to: "/tools/grammar-checker", color: "bg-comic-blue text-accent-foreground" },
      { title: "Paraphrasing Tool", desc: "Rewrite & improve text clarity", icon: PenTool, to: "/tools/article-rewriter", color: "bg-comic-purple text-primary-foreground" },
      { title: "Readability Score", desc: "Flesch reading ease test", icon: Eye, to: "/tools/readability", color: "bg-comic-orange text-primary-foreground" },
      { title: "Markdown → HTML", desc: "Convert MD to HTML", icon: Code, to: "/tools/markdown-to-html", color: "bg-comic-green text-secondary-foreground" },
    ],
  },
  {
    title: "💪 Health & Fitness",
    tools: [
      { title: "TDEE Calculator", desc: "Daily energy expenditure", icon: BarChart3, to: "/tools/tdee-calculator", color: "bg-comic-red text-primary-foreground" },
      { title: "Water Intake", desc: "Daily water requirement", icon: Heart, to: "/tools/water-intake", color: "bg-comic-blue text-accent-foreground" },
      { title: "Ideal Weight", desc: "4 scientific formulas", icon: User, to: "/tools/ideal-weight", color: "bg-comic-green text-secondary-foreground" },
      { title: "Body Fat Calculator", desc: "U.S. Navy body fat % method", icon: BarChart3, to: "/tools/body-fat", color: "bg-comic-orange text-primary-foreground" },
    ],
  },
  {
    title: "⏰ More Developer Tools",
    tools: [
      { title: "HTTP Status Codes", desc: "Quick reference guide", icon: Server, to: "/tools/http-status-codes", color: "bg-comic-blue text-accent-foreground" },
      { title: "Cron Generator", desc: "Visual cron expression builder", icon: Clock, to: "/tools/cron-generator", color: "bg-comic-orange text-primary-foreground" },
    ],
  },
  {
    title: "✍️ Content & Writing Tools",
    tools: [
      { title: "Headline Generator", desc: "Click-worthy blog headlines", icon: PenTool, to: "/tools/headline-generator", color: "bg-comic-blue text-accent-foreground" },
      { title: "Blog Topic Generator", desc: "15+ blog ideas for any niche", icon: FileText, to: "/tools/blog-topic-generator", color: "bg-comic-green text-secondary-foreground" },
      { title: "FAQ Generator", desc: "FAQs + JSON-LD schema markup", icon: Search, to: "/tools/faq-generator", color: "bg-comic-purple text-primary-foreground" },
      { title: "Brand Name Generator", desc: "Unique names for your business", icon: Tag, to: "/tools/brand-name-generator", color: "bg-comic-orange text-primary-foreground" },
      { title: "Slogan Generator", desc: "Memorable taglines for your brand", icon: PenTool, to: "/tools/slogan-generator", color: "bg-comic-red text-primary-foreground" },
    ],
  },
];

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Tools = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const allCombinedCategories = [...categories, ...massiveToolsList];

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const total = allCombinedCategories.reduce((sum, c) => sum + c.tools.length, 0);

  const query = searchQuery.toLowerCase().trim();

  // Flatten all tools for search
  const allTools = allCombinedCategories.flatMap(cat => cat.tools);
  const filteredTools = query
    ? allTools.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.desc.toLowerCase().includes(query)
    )
    : [];

  // Filter categories when searching
  const filteredCategories = query
    ? allCombinedCategories
      .map(cat => ({
        ...cat,
        tools: cat.tools.filter(t =>
          t.title.toLowerCase().includes(query) ||
          t.desc.toLowerCase().includes(query)
        ),
      }))
      .filter(cat => cat.tools.length > 0)
    : allCombinedCategories;

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-secondary mb-4 sm:mb-6 leading-tight">
          WebInsight <span className="text-primary italic">Pro</span>
        </h1>
        <p className="text-base sm:text-xl text-secondary/60 font-bold max-w-2xl mx-auto px-4">
          Explore {total}+ premium utilities across all categories. From SEO and marketing 
          to productivity and finance—we've got everything you need.
        </p>
      </div>

      {/* ═══ Search Bar ═══ */}
      <div className="max-w-2xl mx-auto mb-16 sm:mb-20 animate-slide-up px-2 sm:px-0" style={{ animationDelay: '200ms' }}>
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 h-6 text-primary pointer-events-none z-10" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for tools..."
            className="w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[1.5rem] sm:rounded-[2rem] pl-12 sm:pl-16 pr-12 sm:pr-14 py-4 sm:py-5 text-secondary font-bold text-base sm:text-lg outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] placeholder:text-secondary/40 relative z-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-muted hover:bg-comic-red hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {query && (
          <div className="text-center mt-6">
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-black border border-primary/20 animate-fade-in">
               Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* ═══ No Results ═══ */}
      {query && filteredTools.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-black text-foreground mb-2">No tools found</h2>
          <p className="text-muted-foreground font-bold">Try a different search like "calculator", "image", "seo", or "password"</p>
          <button onClick={() => setSearchQuery("")}
            className="mt-4 comic-btn bg-comic-blue text-white px-6 py-2 font-bold inline-flex items-center gap-2">
            Show All Tools
          </button>
        </div>
      )}

      {/* ═══ Tool Categories ═══ */}
      {(query ? filteredCategories : allCombinedCategories).map((cat, ci) => (
        <div key={ci} className="mb-20 last:mb-0">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-10 w-2 rounded-full bg-primary shadow-[0_0_15px_rgba(5,150,105,0.4)]"></div>
             <h2 className="text-3xl font-black text-secondary tracking-tight">
               {cat.title}
             </h2>
             {query && (
               <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black border border-primary/20">
                 {cat.tools.length} Results
               </span>
             )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {cat.tools.map((tool, ti) => (
              <ToolCard key={ti} {...tool} delay={ti * 50} />
            ))}
          </div>
        </div>
      ))}

      {/* ── SEO Tools Directory Footer ── */}
      <div className="mt-20 bg-card border-4 border-border rounded-2xl p-8 prose prose-lg max-w-none text-foreground shadow-lg">
        <h2 className="text-3xl font-black mb-6">Best Free SEO Tools Online — All-in-One Digital Marketing Toolkit 2026</h2>
        <p>WebInsight Pro's tools directory is the largest comprehensive suite of <strong>free SEO tools online</strong>, <strong>free digital marketing tools</strong>, everyday calculators, and developer utilities available on the internet — all without signup. Browse over {total}+ specialized <strong>online optimization tools</strong> designed for speed, security, and precision. Perfect for anyone looking for <strong>how to check website SEO free</strong> or searching for the <strong>best SEO audit tools 2026</strong>.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">🔍 Free SEO Checker & Website Analysis Tools</h3>
        <p>Dominate Google search rankings with our powerful <strong>free SEO analyzer</strong>. Run a complete <strong>SEO score check</strong> on any website, use our <strong>keyword research tool free</strong> to discover high-traffic keywords, check your <strong>backlinks free</strong> with our comprehensive analyzer, test <strong>page speed</strong> with our performance checker, and track your <strong>organic traffic</strong> with our free estimator. These are the same <strong>SEO metrics you must track in 2026</strong> — all available completely free.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">🧮 Free Online Calculators — Finance, Health & India</h3>
        <p>Simplify your daily calculations! Use our accurate <strong>GST Calculator</strong> and <strong>Income Tax Calculator</strong> for Indian tax planning, calculate <strong>EMI</strong> for home and personal loans, find your <strong>BMI</strong>, <strong>TDEE</strong>, and daily calorie needs, track <strong>days between dates</strong>, convert currencies in real-time, and much more. Our <strong>FD/RD Calculator</strong>, <strong>PF Calculator</strong>, and <strong>HRA Calculator</strong> are specifically designed for Indian users.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">💻 Developer Tools & Content Writing Utilities</h3>
        <p>For programmers and content creators: format JSON, minify CSS & JavaScript, generate cron expressions, check HTTP status codes, create CSS gradients, convert Markdown to HTML, check grammar and readability, rewrite articles, generate fancy text for social media, and much more. All tools process data in your browser for maximum security — your data never leaves your device.</p>

        <div className="mt-16 pt-12 border-t border-secondary/10">
          <h3 className="text-xl font-black mb-6 text-secondary uppercase tracking-widest">Popular Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "SEO Audit", path: "/tools/seo-audit" },
              { name: "Page Speed", path: "/tools/page-speed" },
              { name: "GST Calculator", path: "/tools/gst-calculator" },
              { name: "Income Tax", path: "/tools/income-tax" },
              { name: "EMI Calculator", path: "/tools/emi-calculator" },
              { name: "BMI Calculator", path: "/tools/bmi-calculator" },
              { name: "Traffic Checker", path: "/tools/traffic-checker" },
              { name: "Keyword Planner", path: "/tools/keyword-planner" },
              { name: "Word Counter", path: "/tools/word-counter" },
              { name: "QR Code", path: "/tools/qr-code" },
            ].map((t) => (
              <Link 
                key={t.path} 
                to={t.path} 
                className="comic-btn bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 text-sm font-bold rounded-xl transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Tools;
