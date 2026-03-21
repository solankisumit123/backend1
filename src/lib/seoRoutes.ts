/**
 * SEO metadata for all routes — used for auto meta tags & sitemap.
 * Har tool page ko unique title/description milega = better indexing for 1M traffic scale.
 */
const BASE = "https://webinsightpro.site";

export interface RouteSEO {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  priority?: number;
  changefreq?: "daily" | "weekly" | "monthly";
}

const mainPages: RouteSEO[] = [
  { path: "/", title: "WebInsight Pro | 100+ Free Online SEO & Marketing Tools", description: "Access 100+ free online tools for SEO, Marketing, PDFs, Images, Finance, and Developers. No signup, 100% free, lightning fast.", priority: 1.0, changefreq: "weekly" },
  { path: "/tools", title: "All Free Online Tools List | WebInsight Pro", description: "Browse our complete directory of 100+ free online tools. SEO audit, PDF editors, calculators, and more.", priority: 0.95, changefreq: "weekly" },
  { path: "/seo-strategy", title: "SEO Strategy Guide: How to Reach 1M Visitors | WebInsight Pro", description: "A comprehensive 4-phase roadmap to grow your website traffic. Learn technical SEO, content strategy, and scaling.", priority: 0.9, changefreq: "monthly" },
  { path: "/about", title: "About Us | WebInsight Pro", description: "Mission and vision of WebInsight Pro - providing free professional tools to everyone.", priority: 0.8, changefreq: "monthly" },
  { path: "/contact", title: "Contact Us | WebInsight Pro", description: "Support and feedback for WebInsight Pro tools.", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", title: "SEO & Digital Marketing Blog | WebInsight Pro", description: "Stay updated with the latest SEO trends, tool guides, and traffic growth tips.", priority: 0.85, changefreq: "weekly" },
  { path: "/privacy-policy", title: "Privacy Policy | WebInsight Pro", description: "How we protect your data - Browser-side processing explained.", priority: 0.5, changefreq: "monthly" },
  { path: "/terms-of-service", title: "Terms of Service | WebInsight Pro", description: "Usage terms for WebInsight Pro platform.", priority: 0.5, changefreq: "monthly" },
];

const toolPages: RouteSEO[] = [
  // --- PDF TOOLS ---
  { path: "/tools/merge-pdf", title: "Merge PDF Online Free | Combine Multiple PDFs", description: "Combine two or more PDF files into one for free. Secure, fast, and no registration required.", keywords: "merge pdf, combine pdf, join pdf online", priority: 0.9 },
  { path: "/tools/split-pdf", title: "Split PDF Online | Extract Pages from PDF", description: "Split your PDF into separate pages or extract range. Free online PDF splitter.", keywords: "split pdf, extract pdf pages, cut pdf", priority: 0.9 },
  { path: "/tools/pdf-to-word", title: "PDF to Word Converter | Best Free Online Tool", description: "Convert PDF documents to editable Microsoft Word files with high accuracy.", keywords: "pdf to word, convert pdf to docx, free pdf converter", priority: 0.9 },
  { path: "/tools/compress-pdf", title: "Compress PDF Online | Reduce PDF File Size", description: "Shrink your PDF file size while keeping quality. Best free PDF compressor.", keywords: "compress pdf, reduce pdf size, optimize pdf", priority: 0.9 },
  
  // --- SEO TOOLS ---
  { path: "/tools/seo-audit", title: "Free SEO Audit Tool | Website SEO Checker 2026", description: "Full website SEO analysis. Get a complete SEO report, score, and fix recommendations instantly.", keywords: "seo audit free, website checker, seo analysis", priority: 0.95 },
  { path: "/tools/page-speed", title: "Page Speed Test | Website Performance Checker", description: "Analyze your website loading speed and Core Web Vitals for mobile and desktop.", keywords: "page speed test, lighthouse score, core web vitals", priority: 0.95 },
  { path: "/tools/keyword-density", title: "Keyword Density Checker | Content SEO Optimizer", description: "Analyze keyword frequency and usage in your content to avoid keyword stuffing.", keywords: "keyword density, seo content analyzer, keyword usage", priority: 0.9 },
  { path: "/tools/backlinks", title: "Free Backlink Checker | Analyze Referring Domains", description: "Check any website's backlink profile, referring domains, and anchor text distribution.", keywords: "backlink checker free, analyze backlinks, seo tools", priority: 0.95 },
  { path: "/tools/keyword-planner", title: "SEO Keyword Planner | Find High-Volume Keywords", description: "Generate SEO keyword ideas and find search volume for your niche. Free research tool.", keywords: "keyword planner, keyword research, seo keywords idea", priority: 0.9 },
  { path: "/tools/traffic-checker", title: "Website Traffic Checker | Estimate Site Visitors", description: "Estimate any website's monthly traffic, ranking, and engagement metrics.", keywords: "traffic checker, website visitors estimate, rank checker", priority: 0.95 },
  
  // --- FINANCE TOOLS ---
  { path: "/tools/gst-calculator", title: "GST Calculator India 2026 | Add/Remove GST", description: "Calculate GST for India instantly. Add or remove GST with one click for any amount.", keywords: "gst calculator india, add gst, remove gst, tax calculator", priority: 0.95 },
  { path: "/tools/income-tax", title: "Income Tax Calculator 2025-26 | Old vs New Regime", description: "Compare tax liability between Old and New regimes (FY 2025-26) with this free tool.", keywords: "income tax calculator, tax regime comparison, tax india", priority: 0.95 },
  { path: "/tools/emi-calculator", title: "Loan EMI Calculator | Home, Car & Personal Loan", description: "Calculate your monthly loan repayments easily. EMI calculator with interest table.", keywords: "emi calculator, loan emi, home loan calculator", priority: 0.9 },
  { path: "/tools/sip-calculator", title: "SIP Calculator Online | Mutual Fund Return Estimator", description: "Estimate your mutual fund SIP wealth and returns over 5, 10, or 20 years.", keywords: "sip calculator, mutual fund calculator, wealth estimator", priority: 0.9 },
  
  // --- CONTENT TOOLS ---
  { path: "/tools/grammar-checker", title: "Free Grammar Checker | Professional Writing Tool", description: "Fix spelling, punctuation, and grammar errors in your text instantly for free.", keywords: "grammar checker, spell check, writing improver", priority: 0.9 },
  { path: "/tools/article-rewriter", title: "Paraphrasing Tool | Professional Text Rewriter", description: "Improve your writing with our free paraphrasing tool. Rewrite sentences for better clarity.", keywords: "paraphrasing tool, text rewriter, clarify writing", priority: 0.9 },
  { path: "/tools/word-counter", title: "Online Word Counter | Character & Sentence Count", description: "Free word counter tool to track character count and reading time of your content.", keywords: "word counter, character counter, text analyzer", priority: 0.85 },
  
  // --- UTILITY TOOLS ---
  { path: "/tools/qr-code", title: "QR Code Generator | Create Free Custom QR Codes", description: "Generate QR codes for URLs, WiFi, Text, and vCards. Fully customizable.", keywords: "qr code generator, create qr code, free qr tool", priority: 0.85 },
  { path: "/tools/password", title: "Secure Password Generator | Strong Random Passwords", description: "Create highly secure random passwords to protect your online accounts.", keywords: "password generator, random password, secure keys", priority: 0.85 },
  { path: "/tools/ssl-checker", title: "SSL Checker | Verify Certificate & Expiry", description: "Check if your SSL certificate is installed correctly and when it expires.", keywords: "ssl checker, verify ssl, https checker", priority: 0.85 },
  { path: "/tools/json", title: "JSON Formatter & Validator | Beautify JSON Online", description: "Format, beautify, and validate your JSON code for better readability.", keywords: "json formatter, beautify json, json validator", priority: 0.85 },
];

// Fallback: slug -> title for any /tools/* path
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getRouteSEO(pathname: string): RouteSEO | null {
  const exact = [...mainPages, ...toolPages].find((r) => r.path === pathname);
  if (exact) return exact;
  if (pathname.startsWith("/tools/")) {
    const slug = pathname.replace("/tools/", "");
    return {
      path: pathname,
      title: `${slugToTitle(slug)} | Free Online Tool | WebInsight Pro`,
      description: `Use our free ${slugToTitle(slug).toLowerCase()} tool online. No signup, 100% secure browsing.`,
      keywords: `${slug.replace(/-/g, " ")}, free online tool, webinsight pro`,
      priority: 0.8,
      changefreq: "monthly",
    };
  }
  return null;
}

export function getAllRoutesForSitemap(): RouteSEO[] {
  return [...mainPages, ...toolPages];
}

export function getCanonicalUrl(path: string): string {
  return path === "/" ? BASE : `${BASE}${path}`;
}
