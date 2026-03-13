import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const MetaTags = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const generated = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
<meta property="twitter:image" content="${image}">`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🏷️ Meta Tag Generator</h1>

      <div className="space-y-4 mb-6">
        {[
          { label: "Title", value: title, set: setTitle, ph: "Your Page Title" },
          { label: "Description", value: desc, set: setDesc, ph: "A brief description of your page" },
          { label: "Keywords", value: keywords, set: setKeywords, ph: "seo, tools, website" },
          { label: "URL", value: url, set: setUrl, ph: "https://yoursite.com" },
          { label: "Image URL", value: image, set: setImage, ph: "https://yoursite.com/og-image.png" },
        ].map((f) => (
          <div key={f.label}>
            <label className="font-bold text-foreground text-sm uppercase">{f.label}</label>
            <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} className="comic-input mt-1" />
          </div>
        ))}
      </div>

      <div className="comic-card">
        <div className="flex justify-between items-center mb-3">
          <h3 className="comic-heading text-xl text-foreground">Generated Tags</h3>
          <button onClick={copyToClipboard} className="comic-btn bg-secondary text-secondary-foreground text-sm">📋 Copy</button>
        </div>
        <pre className="bg-background/50 p-4 rounded-lg text-sm text-foreground overflow-x-auto font-comic" style={{ border: "2px solid hsl(var(--border))" }}>
          {generated}
        </pre>
      </div>
      {/* ── SEO SECTION ── */}
      <SEOHead
        title="Meta Tag Generator Online - Optimize Your Site's Header"
        description="Generate SEO-friendly meta tags including Title, Description, Keywords, and Open Graph tags for Facebook and Twitter. Boost your click-through rate today."
        keywords="meta tag generator, seo header tool, open graph generator, twitter card generator, website optimization"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro Meta Tag Tool",
          "operatingSystem": "All Browsers",
          "applicationCategory": "DeveloperApplication"
        }}
      />

      <SEOSection
        title="Master Your Click-Through Rate with Perfect Meta Tags"
        subtitle="High-Performance Snippets for Google, Facebook, and Twitter"
        description="Meta tags are the first point of contact between your website and potential visitors on a search results page. A well-crafted title and description don't just help with ranking; they are your primary advertisement. WebInsight Pro's Meta Tag Generator helps you visualize and create the exact HTML code needed to ensure your site looks professional and enticing across all major digital platforms."
        howToUse={[
          "Enter your 'Page Title' - keep it under 60 characters for best results.",
          "Write a 'Description' that summarizes your value proposition (limit to 160 characters).",
          "Add 'Keywords' relevant to your content to help older search engines.",
          "Include a 'URL' and 'Image URL' to enable rich snippets on social media.",
          "Click 'Copy' and paste the generated block into the `<head>` section of your website."
        ]}
        features={[
          "Open Graph Support: Automatically creates tags for rich previews on Facebook and LinkedIn.",
          "Twitter Card Logic: Specific tagging to ensure your site stands out in the Twitter feed.",
          "Search Snippets: Standard meta name title and description for Google and Bing.",
          "Real-Time Preview: Watch the code build dynamically as you type your branding details.",
          "Standard Compliance: Uses UTF-8 compatible tagging for global language support."
        ]}
        faqs={[
          {
            question: "How long should meta descriptions be?",
            answer: "For optimal display in Google search results, keep your description between 150 and 160 characters. This prevents your text from being cut off."
          },
          {
            question: "What is an Open Graph (OG) image?",
            answer: "It is the image that appears when your link is shared on social media. A good OG image increases click rates significantly compared to plain text links."
          },
          {
            question: "Do keywords still matter in meta tags?",
            answer: "While Google largely ignores the keywords tag today, other smaller search engines and internal site search tools still utilize it for indexing."
          }
        ]}
        relatedTools={[
          { name: "SERP Preview", emoji: "🔍", path: "/tools/serp-preview" },
          { name: "Schema Generator", emoji: "📊", path: "/tools/schema" },
          { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" },
          { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" }
        ]}
      />
    </div>
  );
};

export default MetaTags;
