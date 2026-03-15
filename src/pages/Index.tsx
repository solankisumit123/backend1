import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import {
  Search, BarChart3, Zap, Globe, Star, Users, TrendingUp,
  Shield, Rocket, CheckCircle, ArrowRight, Mail, Award,
  Eye, MousePointer, Clock, ChevronRight, Facebook, Instagram, Twitter, Send,
  MessageSquare, Video, Cloud, Layout, Github, Linkedin,
  Link2, Key, Lock, FileEdit, Map, LineChart, Youtube, HelpCircle, Calculator
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SEOHead from "@/components/SEO/SEOHead";
import FAQSchema from "@/components/SEO/FAQSchema";
import { useAuth } from "@/lib/AuthContext";

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
    <div ref={ref} className="liquid-card flex flex-col items-center text-center p-8 rounded-[2.5rem] group hover:scale-105 transition-all duration-700">
      <div className={`p-4 rounded-2xl bg-white/10 ${color} mb-4 group-hover:bg-white group-hover:shadow-xl transition-all duration-700`}>
        <Icon className="w-10 h-10" strokeWidth={2.5} />
      </div>
      <div className={`text-5xl font-[900] ${color} leading-none mb-2 tracking-tighter`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-black text-secondary/40 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ─── Live Ticker ─── */
const tickerItems = [
  "🔥 Someone just merged 5 PDF files",
  "⚡ New SEO report generated for shopify.com",
  "🎯 BMI calculated for a new user",
  "🚀 Image converted to WebP successfully",
  "💡 GST calculated for a business invoice",
  "📈 Keyword analysis done for reddit.com",
];

function LiveTicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % tickerItems.length), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="flex-shrink-0 rounded-full bg-primary px-3 py-0.5 text-[10px] font-black text-white animate-pulse uppercase tracking-wider">
          LIVE ACTIVITY
        </span>
        <span className="text-sm font-bold text-secondary/80 truncate transition-all duration-500">
          {tickerItems[index]}
        </span>
      </div>
    </div>
  );
}

/* ─── Popular Tools ─── */
const popularTools = [
  { icon: Key, name: "Keyword Planner", path: "/tools/keyword-planner", badge: "PRO", color: "from-emerald-600 to-green-400", desc: "The ultimate tool to find high-traffic, low-competition keywords." },
  { icon: FileEdit, name: "PDF Tools", path: "/tools/pdf-tools", badge: "FREE", color: "from-rose-500 to-pink-500", desc: "Merge, split, compress and convert PDF documents with ease." },
  { icon: Calculator, name: "GST Calculator", path: "/tools/gst-calculator", badge: "FREE", color: "from-blue-500 to-indigo-500", desc: "Quickly calculate Indian GST for your business invoices." },
  { icon: Search, name: "SEO Audit", path: "/tools/seo-audit", badge: "FREE", color: "from-blue-500 to-cyan-400", desc: "Instantly scan your site for SEO errors and performance bottlenecks." },
  { icon: Zap, name: "Page Speed", path: "/tools/page-speed", badge: "FREE", color: "from-amber-400 to-orange-500", desc: "Analyze and optimize your website loading times for better rankings." },
  { icon: LineChart, name: "SIP Calculator", path: "/tools/sip-calculator", badge: "NEW", color: "from-green-500 to-emerald-400", desc: "Plan your future investments and wealth growth with SIP math." },
  { icon: Lock, name: "Password Gen", path: "/tools/password", badge: "FREE", color: "from-indigo-600 to-purple-500", desc: "Create unhackable, secure passwords for your online accounts." },
  { icon: Youtube, name: "YouTube Stats", path: "/tools/youtube-stats", badge: "NEW", color: "from-red-600 to-rose-400", desc: "Analyze any YouTube channel for performance and growth metrics." },
  { icon: Map, name: "Sitemap Gen", path: "/tools/sitemap", badge: "FREE", color: "from-sky-500 to-blue-400", desc: "Create perfect XML sitemaps to help Google index your pages faster." },
  { icon: HelpCircle, name: "FAQ Generator", path: "/tools/faq-generator", badge: "NEW", color: "from-indigo-500 to-purple-400", desc: "Create SEO-friendly FAQ schemas to dominate Google rich snippets." },
  { icon: BarChart3, name: "Traffic Checker", path: "/tools/traffic-checker", badge: "FREE", color: "from-violet-500 to-purple-400", desc: "Get accurate estimates of monthly visitors and ranking trends." },
  { icon: Video, name: "Video Downloader", path: "/tools/youtube-video-downloader", badge: "BETA", color: "from-red-500 to-orange-500", desc: "Download videos from YouTube and Instagram in high quality." },
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
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
const Index = () => {
  const { user } = useAuth();
  return (
    <div className="w-full flex flex-col items-center relative overflow-hidden px-4 md:px-8">
      <SEOHead
        title="WebInsight Pro | 500+ Online Tools - Video, PDF, Finance, SEO, AI & Dev Hub"
        description="WebInsight Pro: The world's largest collection of 500+ free online tools. Download YouTube & Instagram videos, merge PDF, calculate GST/SIP, audit SEO, generate passwords, format JSON, and use AI utilities."
        keywords="free online tools, webinsight pro, youtube video downloader 4k, instagram reels downloader, facebook video downloader free, merge pdf online, split pdf, compress pdf without losing quality, pdf to jpg, pdf to word, gst calculator india, sip calculator with growth, emi calculator for home loan, income tax calculator fy 2025-26, lumpsum investment calculator, seo audit tool free, keyword density checker, backlink analyzer, serp checker, google rank tracker, qr code generator with logo, secure password generator, bmi calculator for men and women, age calculator by date of birth, unit converter online, word counter with character count, json formatter and validator, base64 to image, url decoder encoder, html css js minifier, sitemap generator xml, robot.txt generator, meta tag generator for seo, schema markup generator, compound interest calculator monthly, salary calculator, retirement planner, image resizer, background remover, slogan generator, blog topic ideas, ai content generator, lorem ipsum generator, percentage calculator, typing speed test online"
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "name": "WebInsight Pro",
              "alternateName": "WebInsightPro",
              "url": "https://webinsightpro.site/",
              "description": "Premium collection of 500+ free online tools for business, creativity, and daily productivity.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://webinsightpro.site/tools?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "SoftwareApplication",
              "name": "WebInsight Pro Tools Hub",
              "operatingSystem": "All",
              "applicationCategory": "BusinessApplication, MultimediaApplication, Utility",
              "description": "500+ professional tools for SEO, PDF, Finance, and Social Media.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          ]
        }}
      />

      {/* ── HERO SECTION ── */}
      <section className="w-full max-w-[1500px] flex flex-col lg:flex-row items-center gap-16 py-20 lg:py-32">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-xs tracking-widest uppercase mb-8 animate-fade-in text-center lg:text-left">
            <Zap className="w-4 h-4" /> Trusted by 100,000+ users worldwide
          </div>
          <h1 className="text-[4rem] md:text-[6.5rem] font-[900] leading-[0.9] tracking-[-0.04em] text-secondary mb-10 animate-fade-in text-center lg:text-left">
            WebInsight <br />
            Pro <span className="text-primary">& Tools</span>
          </h1>
          <p className="text-secondary/60 font-medium text-lg lg:text-xl max-w-xl mb-12 leading-relaxed animate-fade-in text-center lg:text-left" style={{ animationDelay: '200ms' }}>
            Elevate your workflow with WebInsight Pro. Access 500+ premium utilities 
            covering SEO, Finance, PDF management, and Social Media—all in one 
            lightning-fast interface.
          </p>

          <div className="w-full max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <form 
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const query = formData.get("search") as string;
                if (query) window.location.href = `/tools?q=${encodeURIComponent(query)}`;
              }}
              className="flex w-full bg-white/40 backdrop-blur-3xl border-4 border-secondary rounded-[2.5rem] p-2.5 shadow-[0_20px_0_rgba(0,0,0,0.1)] focus-within:shadow-[0_10px_0_rgba(0,0,0,0.05)] transition-all"
            >
              <div className="flex-shrink-0 flex items-center pl-6">
                <Search className="w-7 h-7 text-secondary/40" />
              </div>
              <input 
                name="search"
                type="text" 
                placeholder="Search for tools (e.g. YouTube, PDF, GST)..."
                className="flex-1 bg-transparent px-6 text-secondary placeholder-secondary/30 outline-none w-full font-black text-xl" 
              />
              <button type="submit" className="bg-primary text-white px-10 py-5 rounded-[1.8rem] font-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                SEARCH <ArrowRight className="w-6 h-6" />
              </button>
            </form>
          </div>

          <div className="flex gap-6 items-center animate-fade-in ml-2">
            {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
              <a key={idx} href="#" className="p-4 bg-white/30 backdrop-blur-2xl border border-white/40 rounded-full text-secondary/60 hover:text-primary hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Illustration - Medium Fixed Size */}
        <div className="flex-1 w-full flex justify-center lg:justify-end animate-scale-in relative px-4 lg:pr-12">
          <div className="relative w-[550px] aspect-square">
            <div className="w-full h-full animate-float-complex relative z-10 overflow-hidden rounded-[4rem] shadow-[0_30px_70px_rgba(0,0,0,0.1)] bg-white/10 backdrop-blur-md border border-white/30">
               <img 
                 src="/illustration.png" 
                 alt="3D Analytics Illustration" 
                 className="w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Badges - Balanced for medium scale */}
            <div className="absolute top-[5%] left-[-12%] p-6 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 animate-float-slow z-20 shadow-2xl flex items-center justify-center">
               <Cloud className="w-9 h-9 text-sky-400" />
            </div>
            <div className="absolute top-[25%] right-[-8%] p-8 bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white/50 animate-float-fast z-20 shadow-2xl flex flex-col items-center">
               <Layout className="w-11 h-11 text-primary" />
            </div>
            <div className="absolute bottom-[15%] left-[0%] p-10 bg-white/60 backdrop-blur-2xl rounded-[3.5rem] border border-white/50 animate-float z-20 shadow-2xl flex flex-col items-center">
               <MessageSquare className="w-12 h-12 text-green-500" />
            </div>
            <div className="absolute top-[-5%] right-[15%] p-5 bg-white/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 animate-float-slow z-20 shadow-2xl">
               <Video className="w-8 h-8 text-pink-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <div className="w-full max-w-6xl mb-32 animate-fade-in relative z-10 px-6" style={{ animationDelay: '400ms' }}>
        <h2 className="text-4xl font-black text-center text-secondary mb-16 tracking-tight">
          📈 Data-Driven Results
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard value={150000} suffix="+" label="Tasks Processed" icon={Eye} color="text-primary" />
          <StatCard value={25000} suffix="+" label="Daily Active Users" icon={Users} color="text-secondary" />
          <StatCard value={500} suffix="+" label="Premium Utilities" icon={Zap} color="text-accent" />
          <StatCard value={99.9} suffix="%" label="Uptime & Efficiency" icon={Shield} color="text-primary" />
        </div>
      </div>

      {/* ── POPULAR TOOLS ── */}
      <div className="w-full max-w-7xl mb-32 relative z-10 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-[2.5rem] font-black text-secondary leading-tight mb-2">🔥 Essential Utilities</h2>
            <p className="text-secondary/50 font-bold tracking-wide">Handpicked tools for maximum productivity</p>
          </div>
          <Link to="/tools" className="flex items-center gap-4 font-black text-primary px-8 py-4 bg-primary/5 rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all duration-700 group shadow-lg">
            Browse All 500+ Tools <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {popularTools.map((tool, i) => (
            <Link
              key={i}
              to={tool.path}
              className="premium-tool-card group relative p-10 flex flex-col h-full bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 hover:border-primary/30"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${tool.color} rounded-[1.75rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 transform-gpu`}>
                <tool.icon className="w-10 h-10" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-white/20 rounded-[1.75rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <span className={`text-[10px] font-black px-3 py-1 rounded-lg border tracking-widest uppercase ${
                  tool.badge === "PRO" 
                    ? "bg-primary text-white border-primary" 
                    : tool.badge === "NEW"
                      ? "bg-purple-500 text-white border-purple-500"
                      : "bg-white/50 text-secondary/60 border-secondary/20"
                }`}>
                  {tool.badge}
                </span>
              </div>
              
              <p className="text-secondary/50 font-bold text-sm leading-relaxed mb-8 flex-1">
                {tool.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-secondary/5">
                <span className="text-secondary/30 text-xs font-black tracking-widest uppercase">Analyze Now</span>
                <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
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

        <p className="mt-4 text-sm text-muted-foreground">Related searches: free seo tools online, online seo checker, website traffic checker, seo analyzer free, seo score checker, backlinks checker free, keyword research tool free, website performance checker, page speed test tool, seo audit tools, rank tracker free, organic traffic estimator, free digital marketing tools, online optimization tools, how to check website seo free, free tools to improve website ranking, best seo audit tools 2026, how to increase organic traffic step by step, free keyword research and analysis tool, on-page seo checklist for beginners, how to get free backlinks for website, website seo performance report free, seo tips for small business websites, what is seo tools and why use them, free seo strategies for startups, step by step seo guide for beginners, seo trends in 2026.</p>
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
