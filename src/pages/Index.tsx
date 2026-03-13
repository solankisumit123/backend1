import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import {
  Search, BarChart3, Zap, Globe, Star, Users, TrendingUp,
  Shield, Rocket, CheckCircle, ArrowRight, Mail, Award,
  Eye, MousePointer, Clock, ChevronRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AdBanner from "@/components/AdBanner";
import SEOHead from "@/components/SEO/SEOHead";
import FAQSchema from "@/components/SEO/FAQSchema";
 

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─── Intersection Observer Hook ─── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

/* ─── Stats Counter Component ─── */
function StatCard({ value, suffix, label, icon: Icon, color }: {
  value: number; suffix: string; label: string; icon: LucideIcon; color: string;
}) {
  const { ref, inView } = useInView();
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="comic-card flex flex-col items-center text-center p-6">
      <Icon className={`w-8 h-8 ${color} mb-2`} strokeWidth={3} />
      <div className={`text-4xl font-black ${color} leading-none`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-bold text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

/* ─── Live Ticker ─── */
const tickerItems = [
  "🔥 Someone just analyzed amazon.com",
  "⚡ New SEO report generated for shopify.com",
  "🎯 Traffic spike detected on netflix.com",
  "🚀 Backlinks checked for github.com",
  "💡 SEO audit completed for medium.com",
  "📈 Keyword analysis done for reddit.com",
];

function LiveTicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % tickerItems.length), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 overflow-hidden rounded-xl border-2 border-border bg-card shadow-md">
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="flex-shrink-0 rounded-full bg-comic-red px-2 py-0.5 text-xs font-black text-white animate-pulse">
          LIVE
        </span>
        <span className="text-sm font-bold text-foreground truncate transition-all duration-500">
          {tickerItems[index]}
        </span>
      </div>
    </div>
  );
}

/* ─── Popular Tools ─── */
const popularTools = [
  { emoji: "🔍", name: "SEO Audit", path: "/tools/seo-audit", badge: "FREE", color: "text-comic-blue" },
  { emoji: "⚡", name: "Page Speed", path: "/tools/page-speed", badge: "FREE", color: "text-comic-yellow" },
  { emoji: "🔗", name: "Backlink Checker", path: "/tools/backlinks", badge: "PRO", color: "text-comic-green" },
  { emoji: "🔑", name: "Keyword Density", path: "/tools/keyword-density", badge: "FREE", color: "text-comic-red" },
  { emoji: "📊", name: "Traffic Checker", path: "/tools/traffic-checker", badge: "FREE", color: "text-primary" },
  { emoji: "🛡️", name: "SSL Checker", path: "/tools/ssl-checker", badge: "FREE", color: "text-comic-green" },
  { emoji: "📝", name: "Blog Topic Gen", path: "/tools/blog-topic-generator", badge: "NEW", color: "text-comic-purple" },
  { emoji: "🗺️", name: "Sitemap Generator", path: "/tools/sitemap", badge: "FREE", color: "text-comic-blue" },
  { emoji: "📈", name: "Compound Interest", path: "/tools/compound-interest", badge: "NEW", color: "text-comic-green" },
  { emoji: "📺", name: "YouTube Keywords", path: "/tools/youtube-keyword", badge: "NEW", color: "text-comic-red" },
  { emoji: "❓", name: "FAQ Generator", path: "/tools/faq-generator", badge: "NEW", color: "text-comic-orange" },
  { emoji: "💰", name: "ROI Calculator", path: "/tools/roi-calculator", badge: "NEW", color: "text-comic-blue" },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Sarah K.", role: "Blogger", avatar: "SK", text: "WebInsight Pro tripled my organic traffic in just 2 months! The SEO audit is incredibly detailed.", stars: 5 },
  { name: "Ahmed R.", role: "Digital Marketer", avatar: "AR", text: "Best free SEO tool I've ever used. The earnings estimator alone is worth signing up!", stars: 5 },
  { name: "Maria T.", role: "E-commerce Owner", avatar: "MT", text: "Found 47 broken links on my site I didn't know about. Fixed them and my rankings jumped!", stars: 5 },
];

/* ─── Newsletter ─── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };
  return (
    <div className="comic-card max-w-2xl mx-auto text-center p-8 mt-16">
      <Mail className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={3} />
      <h2 className="comic-heading text-2xl text-foreground mb-1">Get FREE SEO Tips Weekly</h2>
      <p className="text-muted-foreground font-bold text-sm mb-5">
        Join 12,000+ marketers getting actionable SEO insights every week. No spam, ever.
      </p>
      {submitted ? (
        <div className="flex items-center justify-center gap-2 text-comic-green font-black text-lg">
          <CheckCircle className="w-6 h-6" />
          You're in! Check your inbox 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-background font-bold text-foreground outline-none focus:border-primary transition-colors"
          />
          <button type="submit" className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 justify-center">
            Subscribe <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
const Index = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 py-16">
      <SEOHead
        title="Free SEO Tools Online | Website Checker, SEO Analyzer & Audit - WebInsight Pro"
        description="Discover the best free SEO tools online — website SEO checker, SEO score analyzer, backlinks checker free, keyword research tool, page speed test, rank tracker, organic traffic estimator & 100+ free digital marketing tools. No signup required."
        keywords="free seo tools online, online seo checker, website traffic checker, seo analyzer free, seo score checker, backlinks checker free, keyword research tool free, website performance checker, page speed test tool, seo audit tools, rank tracker free, organic traffic estimator, free digital marketing tools, online optimization tools, best seo audit tools 2026, how to check website seo free, free tools to improve website ranking"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "WebInsight Pro",
          "alternateName": "WebInsightPro",
          "url": "https://webinsightpro.site/",
          "description": "Best free SEO tools online — website SEO checker, backlinks analyzer, keyword research, page speed test, rank tracker, organic traffic estimator & 100+ free digital marketing tools.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://webinsightpro.site/tools?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      {/* ── HERO ── */}
      <div className="text-center max-w-4xl animate-slide-up w-full">

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-1.5 mb-6 text-sm font-bold shadow">
          <Award className="w-4 h-4 text-primary" />
          Trusted by 50,000+ website owners worldwide
        </div>

        <div className="inline-flex items-center gap-3 mb-4">
          <Search className="w-14 h-14 text-primary" strokeWidth={3} />
        </div>

        <h1 className="comic-heading text-5xl md:text-7xl text-foreground mb-4 leading-tight">
          WebInsight Pro
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground font-bold mb-4 max-w-xl mx-auto">
          Free SEO analyzer, website traffic checker, rank tracker & 100+ online optimization tools. Boost your website ranking today — 100% free, no signup!
        </p>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
          <span className="ml-2 font-bold text-muted-foreground text-sm">4.9/5 from 3,200+ reviews</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link to="/dashboard" className="comic-btn bg-primary text-primary-foreground text-lg flex items-center gap-2 justify-center">
            <Rocket className="w-5 h-5" /> Launch Dashboard
          </Link>
          <Link to="/tools" className="comic-btn bg-secondary text-secondary-foreground text-lg flex items-center gap-2 justify-center">
            🛠️ Explore 100+ Free Tools
          </Link>
        </div>

        {/* Live Ticker */}
        <LiveTicker />
        <AdBanner width={728} height={90} bannerId="28752282" />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2 mb-16">
          {[
            { icon: BarChart3, title: "Traffic Analysis", desc: "Deep dive into your website visitors", color: "text-comic-blue" },
            { icon: Zap, title: "SEO Audit", desc: "Find & fix issues instantly", color: "text-comic-red" },
            { icon: Globe, title: "Earnings Estimate", desc: "Calculate your revenue potential", color: "text-comic-green" },
          ].map((item, i) => (
            <div key={i} className="comic-card animate-slide-up flex flex-col items-center text-center" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
              <item.icon className={`w-10 h-10 ${item.color} mb-3`} strokeWidth={3} />
              <h3 className="comic-heading text-xl text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="comic-heading text-3xl text-center text-foreground mb-8">
          📊 Trusted by Thousands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value={50000} suffix="+" label="Websites Analyzed" icon={Eye} color="text-comic-blue" />
          <StatCard value={12000} suffix="+" label="Happy Users" icon={Users} color="text-comic-green" />
          <StatCard value={100} suffix="+" label="Free SEO Tools" icon={Zap} color="text-comic-red" />
          <StatCard value={99} suffix="%" label="Uptime Guarantee" icon={Shield} color="text-primary" />
        </div>
      </div>

      {/* ── POPULAR TOOLS ── */}
      <div className="w-full max-w-4xl mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="comic-heading text-3xl text-foreground">🔥 Popular Tools</h2>
          <Link to="/tools" className="flex items-center gap-1 font-bold text-primary hover:underline text-sm">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularTools.map((tool, i) => (
            <Link
              key={i}
              to={tool.path}
              className="comic-card flex flex-col items-center text-center p-4 hover:scale-105 transition-transform duration-200 group"
            >
              <span className="text-3xl mb-2">{tool.emoji}</span>
              <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
              <span className={`mt-1 text-xs font-black px-2 py-0.5 rounded-full border-2 border-current ${tool.badge === "FREE" ? "text-comic-green" : "text-comic-red"}`}>
                {tool.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE US ── */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="comic-heading text-3xl text-center text-foreground mb-8">⚡ Why Choose WebInsight Pro?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: TrendingUp, title: "Real-Time Data", desc: "Get up-to-the-minute traffic and SEO insights for any website." },
            { icon: Shield, title: "100% Secure", desc: "Your data is encrypted and never shared with third parties." },
            { icon: MousePointer, title: "One-Click Audits", desc: "Run a complete SEO audit in seconds — no technical skills needed." },
            { icon: Clock, title: "Save Hours", desc: "Automate your SEO workflow and focus on what matters most." },
          ].map((item, i) => (
            <div key={i} className="comic-card flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-primary/10 rounded-xl border-2 border-primary/20">
                <item.icon className="w-6 h-6 text-primary" strokeWidth={3} />
              </div>
              <div>
                <h3 className="comic-heading text-lg text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-bold">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="comic-heading text-3xl text-center text-foreground mb-8">💬 What Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="comic-card flex flex-col gap-3">
              <div className="flex items-center gap-1">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-bold flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs border-2 border-border">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-black text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <Newsletter />

      {/* ── FINAL CTA ── */}
      <div className="text-center mt-16 max-w-2xl">
        <h2 className="comic-heading text-4xl text-foreground mb-4">🚀 Ready to Grow?</h2>
        <p className="text-muted-foreground font-bold mb-6">Start your free SEO analysis today. No credit card required.</p>
        <Link to="/dashboard" className="comic-btn bg-primary text-primary-foreground text-xl flex items-center gap-2 justify-center mx-auto w-fit">
          Get Started Free <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* ── SEO Section ── */}
      <div className="w-full max-w-5xl mt-24 bg-card border-4 border-border rounded-2xl p-8 prose prose-lg max-w-none text-foreground shadow-lg">
        <h2 className="text-3xl font-black mb-6">Free SEO Tools Online — Your Complete Website Optimization Hub</h2>
        <p>Welcome to <strong>WebInsight Pro</strong>, the best <strong>free SEO tools</strong> platform in 2026. Whether you need an <strong>online SEO checker</strong>, a <strong>website traffic checker</strong>, or a comprehensive <strong>SEO score analyzer</strong> — we provide 100+ professional-grade tools completely free. No signup required, no hidden fees. Our mission is to make powerful <strong>SEO audit tools</strong> accessible to everyone — from beginners learning <strong>how to check website SEO free</strong> to seasoned digital marketers looking for the <strong>best SEO audit tools 2026</strong>.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">🔍 Free SEO Analysis & Website Checker Tools</h3>
        <p>Dominate Google Search Rankings with our powerful <strong>free SEO analyzer</strong>. Our <strong>SEO audit tools</strong> perform instant, in-depth website analysis covering on-page SEO, technical SEO, keyword optimization, and content quality. Use our <strong>page speed test tool</strong> to identify performance bottlenecks, check <strong>backlinks free</strong> with our comprehensive <strong>backlinks checker</strong>, and track your <strong>organic traffic</strong> with our <strong>organic traffic estimator</strong>. These are the exact same metrics used by premium tools like Ahrefs and Semrush — but absolutely free.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>SEO Score Checker:</strong> Get an instant SEO health score for any website with actionable recommendations to improve your ranking.</li>
          <li><strong>Keyword Research Tool Free:</strong> Discover high-traffic keywords, analyze keyword density, and find keyword opportunities your competitors are missing.</li>
          <li><strong>Backlinks Checker Free:</strong> Analyze your backlink profile, find broken links, and discover new link building opportunities.</li>
          <li><strong>Page Speed Test Tool:</strong> Test desktop and mobile page speed with Google Lighthouse-powered scoring and optimization tips.</li>
          <li><strong>Rank Tracker Free:</strong> Monitor your search engine rankings and track your position for target keywords over time.</li>
          <li><strong>Website Performance Checker:</strong> Comprehensive technical SEO audit including SSL, DNS, hosting, mobile-friendliness, and Core Web Vitals.</li>
        </ul>

        <h3 className="text-2xl font-black mt-8 mb-4">📊 Free Digital Marketing Tools</h3>
        <p>Take your digital marketing to the next level with our <strong>free digital marketing tools</strong>. From <strong>hashtag generators</strong> and <strong>social engagement calculators</strong> to <strong>UTM builders</strong> and <strong>competitor analysis tools</strong> — everything you need to run successful marketing campaigns is right here. Use our <strong>Instagram Font Generator</strong> for eye-catching bios, check <strong>Twitter/X character counts</strong>, or analyze <strong>YouTube Channel Statistics</strong> — all completely free.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">🧮 Free Online Calculators for India & Worldwide</h3>
        <p>Simplify your daily calculations with our accurate, fast, and mobile-friendly <strong>free online calculators</strong>. From financial planning to health tracking, we cover it all:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Financial Calculators:</strong> GST Calculator, Income Tax Calculator (Old vs New Regime India), EMI Calculator, Simple & Compound Interest, FD/RD Calculator, PF Calculator, HRA Calculator, Profit & Loss Calculator, Discount Calculator, Currency Converter.</li>
          <li><strong>Health & Fitness:</strong> BMI Calculator, Calorie Calculator, TDEE Calculator, Water Intake Calculator, Ideal Body Weight Calculator.</li>
          <li><strong>Everyday Utilities:</strong> Age Calculator, Days Between Dates, Unit Converter, Percentage Calculator, Number to Words, Typing Speed Test, Love Calculator.</li>
        </ul>

        <h3 className="text-2xl font-black mt-8 mb-4">💻 Developer & Technical Tools</h3>
        <p>For programmers, web designers, and system administrators: minify CSS & JavaScript, format JSON, generate cron expressions, check HTTP status codes, convert Markdown to HTML, create CSS gradients, generate color palettes, encode/decode Base64 & URLs, check SSL certificates, perform DNS & IP lookups, and much more. All tools process your data directly in your browser for maximum security.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">✍️ Content & Writing Tools</h3>
        <p>Create better content with our <strong>Grammar Checker</strong>, <strong>Article Rewriter</strong>, <strong>Readability Score Checker</strong>, and <strong>Fancy Text Generator</strong>. Perfect your SEO content strategy with keyword-optimized, highly readable articles that rank on Google.</p>

        <h3 className="text-2xl font-black mt-8 mb-4">📈 How to Improve Website Ranking — SEO Guide 2026</h3>
        <p className="mb-4">Want to scale to <strong>1 million daily visitors</strong>? Read our complete <Link to="/seo-strategy" className="text-primary font-black hover:underline">SEO Strategy for 1M Daily Visitors</Link> — a 4-phase roadmap covering technical SEO, content, backlinks, and scalability.</p>
        <p>Looking for <strong>free tools to improve website ranking</strong>? Follow this proven <strong>step-by-step SEO guide for beginners</strong>:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Run a Free SEO Audit:</strong> Start with our SEO Audit tool to identify all on-page and technical issues.</li>
          <li><strong>Optimize On-Page SEO:</strong> Use our Meta Tag Generator, Keyword Density Checker, and SERP Preview tools to perfect every page.</li>
          <li><strong>Improve Page Speed:</strong> Use our Page Speed Test to find performance issues and fix them.</li>
          <li><strong>Build Quality Backlinks:</strong> Analyze competitor backlinks with our Backlink Checker and find new link opportunities.</li>
          <li><strong>Track Your Rankings:</strong> Monitor your progress with our free organic traffic estimator and rank tracker.</li>
          <li><strong>Create Quality Content:</strong> Use our Readability Checker and Grammar tools to ensure your content is SEO-friendly.</li>
        </ol>

        <h3 className="text-2xl font-black mt-8 mb-4">🚀 Why WebInsight Pro is the Best Free SEO Tool in 2026</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>✅ <strong>100+ Tools</strong> — The largest collection of free SEO, marketing, calculator, and developer tools online.</li>
          <li>✅ <strong>100% Free</strong> — No signup, no credit card, no hidden fees. Every tool is completely free.</li>
          <li>✅ <strong>Privacy First</strong> — All tools process data in your browser. We never store your sensitive information.</li>
          <li>✅ <strong>Mobile Friendly</strong> — Works perfectly on desktop, tablet, and mobile devices.</li>
          <li>✅ <strong>Lightning Fast</strong> — Built with modern technology for instant results.</li>
          <li>✅ <strong>Regular Updates</strong> — New tools and features added every month.</li>
        </ul>

        <p className="mt-8 pt-6 border-t font-bold"><em>Bookmark this page now! All tools work on Desktop and Mobile with no installation required. Use our free SEO tools to check your website SEO, improve page speed, analyze backlinks, research keywords, and dominate search engine rankings in 2026.</em></p>

        <p className="mt-4 text-sm text-muted-foreground">Related searches: free seo tools online, online seo checker, website traffic checker, seo analyzer free, seo score checker, backlinks checker free, keyword research tool free, website performance checker, page speed test tool, seo audit tools, rank tracker free, organic traffic estimator, free digital marketing tools, online optimization tools, how to check website seo free, free tools to improve website ranking, best seo audit tools 2026, how to increase organic traffic step by step, free keyword research and analysis tool, on-page seo checklist for beginners, how to get free backlinks for website, website seo performance report free, seo tips for small business websites, what is seo tools and why use them, free seo strategies for startups, step by step seo guide for beginners, seo trends in 2026, best free digital marketing tools list, how to optimize website for search engines, how to improve page speed for seo, seo metrics you must track in 2026.</p>
      </div>

      {/* ── FAQ Section with Schema ── */}
      <FAQSchema faqs={[
        { question: "What is WebInsight Pro?", answer: "WebInsight Pro is a free online platform offering 100+ SEO tools, digital marketing utilities, calculators, and developer tools. All tools are 100% free with no signup required." },
        { question: "Are the SEO tools on WebInsight Pro really free?", answer: "Yes! All 100+ tools on WebInsight Pro are completely free to use. There are no hidden charges, no credit card required, and no signup needed. You can use our SEO audit, backlink checker, keyword research, page speed test, and all other tools without any cost." },
        { question: "How to check website SEO for free?", answer: "You can check your website SEO for free using WebInsight Pro's SEO Audit tool. Simply enter your website URL and get a comprehensive SEO score with actionable recommendations to improve your ranking on Google." },
        { question: "What is the best free SEO tool in 2026?", answer: "WebInsight Pro is one of the best free SEO tools in 2026, offering comprehensive SEO audit, backlink analysis, keyword research, page speed testing, traffic checking, and 100+ more tools — all completely free." },
        { question: "How can I improve my website ranking on Google?", answer: "To improve your website ranking: 1) Run an SEO Audit to find issues, 2) Optimize on-page SEO with proper meta tags and keywords, 3) Improve page speed, 4) Build quality backlinks, 5) Create high-quality content, 6) Track your rankings. Use WebInsight Pro's free tools for all these steps." },
        { question: "Does WebInsight Pro store my data?", answer: "No. WebInsight Pro is privacy-first. Most tools process your data directly in your browser. We do not store your sensitive information, keywords, analytics data, or personal details on our servers." },
        { question: "What calculators are available on WebInsight Pro?", answer: "WebInsight Pro offers 20+ free calculators including GST Calculator, Income Tax Calculator (Old & New Regime India), EMI Calculator, BMI Calculator, Calorie/TDEE Calculator, FD/RD Calculator, PF Calculator, HRA Calculator, Discount Calculator, Currency Converter, Age Calculator, and more." },
        { question: "How do I use the free keyword research tool?", answer: "Use WebInsight Pro's Keyword Density Checker to analyze keyword usage in your content. Enter your text or URL, and the tool will show keyword frequency, density percentage, and suggestions for optimization to rank higher on search engines." },
        { question: "Can I check backlinks for free?", answer: "Yes! Use WebInsight Pro's free Backlink Checker tool to analyze your website's backlink profile. See referring domains, backlink quality, anchor text distribution, and discover new link building opportunities." },
        { question: "What developer tools does WebInsight Pro offer?", answer: "WebInsight Pro offers 15+ developer tools including JSON Formatter, CSS/JS Minifier, Base64 Encoder, Cron Job Generator, HTTP Status Code Reference, CSS Gradient Generator, Color Palette Generator, Markdown to HTML Converter, Hash Generator, JWT Decoder, and more." },
      ]} />
      <div className="w-full max-w-5xl mt-12 bg-card border-4 border-border rounded-2xl p-8 text-foreground shadow-lg">
        <h2 className="text-3xl font-black mb-6">❓ Frequently Asked Questions</h2>
        {[
          { q: "What is WebInsight Pro?", a: "WebInsight Pro is a free online platform offering 100+ SEO tools, digital marketing utilities, calculators, and developer tools. All tools are 100% free with no signup required." },
          { q: "Are the SEO tools really free?", a: "Yes! All 100+ tools are completely free. No hidden charges, no credit card, no signup needed." },
          { q: "How to check website SEO for free?", a: "Use our SEO Audit tool — enter your URL and get a comprehensive SEO score with actionable recommendations." },
          { q: "What is the best free SEO tool in 2026?", a: "WebInsight Pro offers comprehensive SEO audit, backlink analysis, keyword research, page speed testing, and 100+ more tools — all completely free." },
          { q: "How can I improve my website ranking?", a: "Run an SEO Audit, optimize meta tags, improve page speed, build backlinks, create quality content, and track rankings — all using our free tools." },
          { q: "Does WebInsight Pro store my data?", a: "No. Most tools process data in your browser. We never store your sensitive information." },
          { q: "What calculators are available?", a: "20+ free calculators: GST, Income Tax, EMI, BMI, Calorie/TDEE, FD/RD, PF, HRA, Discount, Currency Converter, Age Calculator, and more." },
          { q: "Can I check backlinks for free?", a: "Yes! Our free Backlink Checker analyzes backlink profiles, referring domains, anchor text, and link quality." },
        ].map((faq, i) => (
          <details key={i} className="group border-b-2 border-border last:border-0">
            <summary className="flex items-center justify-between py-4 cursor-pointer font-black text-lg hover:text-primary transition-colors">
              {faq.q}
              <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="pb-4 text-muted-foreground font-bold text-sm pl-2">{faq.a}</p>
          </details>
        ))}
      </div>

    </div>
  );
};

export default Index;
