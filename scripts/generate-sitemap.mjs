#!/usr/bin/env node
/**
 * Generates sitemap.xml from seoRoutes.ts data.
 * Run: node scripts/generate-sitemap.mjs
 * Or add to package.json: "preset": "node scripts/generate-sitemap.mjs"
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://webinsightpro.site";

// Import routes from the TS file - we'll parse it or use a simple list
// For simplicity, we extract paths from App.tsx route patterns
const routes = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/tools", priority: 0.95, changefreq: "weekly" },
  { path: "/seo-strategy", priority: 0.9, changefreq: "monthly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", priority: 0.85, changefreq: "weekly" },
  { path: "/privacy-policy", priority: 0.5, changefreq: "monthly" },
  { path: "/terms-of-service", priority: 0.5, changefreq: "monthly" },
  // Tools - add more as needed
  "/tools/seo-audit", "/tools/page-speed", "/tools/meta-tags", "/tools/keyword-density",
  "/tools/word-counter", "/tools/serp-preview", "/tools/gst-calculator", "/tools/income-tax",
  "/tools/emi-calculator", "/tools/bmi-calculator", "/tools/age-calculator", "/tools/compound-interest",
  "/tools/sip-calculator", "/tools/traffic-checker", "/tools/backlinks", "/tools/keyword-planner",
  "/tools/qr-code", "/tools/password", "/tools/json", "/tools/ssl-checker", "/tools/sitemap",
  "/tools/robots-txt", "/tools/schema", "/tools/currency-converter", "/tools/grammar-checker",
  "/tools/blog-topic-generator", "/tools/faq-generator", "/tools/youtube-keyword",
  "/tools/unit-converter", "/tools/percentage-calculator", "/tools/discount-calculator",
  "/tools/profit-loss", "/tools/fd-rd-calculator", "/tools/pf-calculator", "/tools/hra-calculator",
  "/tools/instagram-fonts", "/tools/twitter-counter", "/tools/youtube-stats", "/tools/social-image-sizes",
  "/tools/image-to-base64", "/tools/http-status-codes", "/tools/markdown-to-html", "/tools/css-gradient",
  "/tools/color-palette", "/tools/tdee-calculator", "/tools/water-intake", "/tools/ideal-weight",
  "/tools/readability", "/tools/article-rewriter", "/tools/cron-generator", "/tools/calorie-calculator",
  "/tools/simple-interest", "/tools/days-between-dates", "/tools/stopwatch", "/tools/love-calculator",
  "/tools/typing-speed", "/tools/number-to-words", "/tools/fancy-text", "/tools/pdf-tools",
  "/tools/image-tools", "/tools/color-picker", "/tools/base64", "/tools/url-encoder",
  "/tools/lorem-ipsum", "/tools/text-to-speech", "/tools/case-converter", "/tools/hash-generator",
  "/tools/css-minifier", "/tools/js-minifier", "/tools/html-to-markdown", "/tools/jwt-decoder",
  "/tools/html-formatter", "/tools/dns-lookup", "/tools/domain-age", "/tools/whois",
  "/tools/broken-links", "/tools/ip-lookup", "/tools/hosting", "/tools/my-ip",
  "/tools/url-slug-generator", "/tools/password-strength", "/tools/utm-builder",
  "/tools/keyword-typo-generator", "/tools/word-combiner", "/tools/ad-revenue",
  "/tools/adsense", "/tools/youtube-revenue", "/tools/blog-revenue", "/tools/affiliate",
  "/tools/competitor", "/tools/hashtags", "/tools/engagement", "/tools/keyword-difficulty",
  "/tools/og-checker", "/tools/meta-title-generator", "/tools/meta-description-generator",
  "/tools/compound-interest", "/tools/fuel-cost", "/tools/pregnancy-calculator",
  "/tools/retirement-calculator", "/tools/body-fat", "/tools/random-number",
  "/tools/brand-name-generator", "/tools/slogan-generator", "/tools/headline-generator",
  "/tools/read-time", "/tools/favicon-generator", "/tools/instagram-bio-generator",
  "/tools/social-caption-generator", "/tools/youtube-tag-generator",
  "/tools/conversion-rate-calculator", "/tools/ctr-calculator", "/tools/roi-calculator",
  "/tools/mrr-calculator", "/tools/churn-rate-calculator", "/tools/saas-pricing-calculator",
  "/tools/cpc-checker", "/tools/long-tail-keyword", "/tools/question-keyword",
  "/tools/related-keywords", "/tools/search-volume-checker", "/tools/trending-keywords",
];

// Add the 20 blog posts dynamically
const blogs = [
    "how-to-do-seo-audit-free", "estimate-website-traffic-like-a-pro", "youtube-channel-revenue-calculator",
    "website-ad-revenue-estimator", "importance-of-page-speed-seo", "find-keyword-difficulty-in-seconds",
    "how-to-build-backlinks-2026", "on-page-seo-checklist-2026", "google-core-web-vitals-guide-2026",
    "keyword-research-free-tools", "technical-seo-guide-fix-errors", "write-seo-optimized-blog-posts",
    "google-search-console-beginners-guide", "local-seo-guide-google-maps-2026", "youtube-seo-rank-videos-2026",
    "what-is-domain-authority-how-to-improve", "how-to-monetize-website-with-adsense", "email-marketing-guide-bloggers-2026",
    "affiliate-marketing-beginners-guide-2026", "website-speed-optimization-complete-guide"
];

for (const slug of blogs) {
    routes.push({ path: `/blog/${slug}`, priority: 0.75, changefreq: "monthly" });
}

const today = new Date().toISOString().split("T")[0];
const urlEntries = routes
  .filter((r) => typeof r === "string" || r.path)
  .map((r) => {
    const path = typeof r === "string" ? r : r.path;
    const priority = typeof r === "object" && r.priority != null ? r.priority : 0.8;
    const changefreq = typeof r === "object" && r.changefreq ? r.changefreq : "monthly";
    return `  <url><loc>${BASE}${path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority><changefreq>${changefreq}</changefreq></url>`;
  });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>
`;

const outPath = join(__dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap written to ${outPath} (${urlEntries.length} URLs)`);
