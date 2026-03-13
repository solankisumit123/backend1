import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const SerpPreview = () => {
  const [title, setTitle] = useState("WebInsight Pro - All-in-One SEO Tool");
  const [url, setUrl] = useState("https://webinsight.pro/tools");
  const [desc, setDesc] = useState("Analyze your website with 26+ powerful SEO tools. Check traffic, earnings, backlinks and more.");

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔍 SERP Preview</h1>

      <div className="space-y-4 mb-8">
        <div>
          <label className="font-bold text-foreground text-sm uppercase">Title ({title.length}/60)</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="comic-input mt-1" />
        </div>
        <div>
          <label className="font-bold text-foreground text-sm uppercase">URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="comic-input mt-1" />
        </div>
        <div>
          <label className="font-bold text-foreground text-sm uppercase">Description ({desc.length}/160)</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="comic-input mt-1 min-h-[80px]" />
        </div>
      </div>

      <h2 className="comic-heading text-2xl text-foreground mb-3">Preview</h2>
      <div className="comic-card bg-card">
        <p className="text-sm text-comic-green font-bold truncate">{url}</p>
        <p className="text-xl font-bold text-comic-blue hover:underline cursor-pointer truncate">{title}</p>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{desc}</p>
      </div>
      {/* ── SEO SECTION ── */}
      <SEOHead
        title="Google SERP Preview Tool - Visual Search Snippet"
        description="Visualize how your website appears in Google search results. Optimize your title and meta description for higher click-through rates with our real-time simulator."
        keywords="serp preview, search result simulator, google snippet tool, meta tag optimizer, ctr optimization"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro SERP Preview",
          "operatingSystem": "All Browsers",
          "applicationCategory": "DeveloperApplication"
        }}
      />

      <SEOSection
        title="Maximize Visibility with Real-Time Search Simulators"
        subtitle="See What Your Customers See Before You Hit Publish"
        description="The Search Engine Results Page (SERP) is the most competitive real estate on the internet. Even if you rank #1, you won't get clicks if your title is cut off or your description is uninspired. WebInsight Pro's SERP Preview tool provides a high-fidelity simulation of desktop and mobile search snippets, allowing you to fine-tune your messaging to maximize every single organic impression."
        howToUse={[
          "Input your target 'Title' and watch the character counter - stay under 60 characters.",
          "Enter the 'URL' as you want it to appear in the green breadcrumb line.",
          "Draft a 'Description' that includes your primary keyword and a clear call-to-action.",
          "Check the 'Preview' box below to see if search engines will truncate (cut off) your text.",
          "Optimize and iterate until the snippet looks perfect, then update your site's meta tags."
        ]}
        features={[
          "Truncation Warning: Character counters turn red if you exceed standard pixel limits.",
          "Visual Fidelity: Uses the same typography and spacing as modern search engines.",
          "Dynamic Breadcrumbs: Simulates how URLs are displayed in the breadcrumb style.",
          "Description Clamp: Automatically shows you where a 160-character snippet might end.",
          "Instant Feedback: No page refreshes; see every keystroke reflected in the layout."
        ]}
        faqs={[
          {
            question: "Why does Google sometimes change my title?",
            answer: "Google's algorithm may rewrite your title if it thinks a different phrase better matches the user's specific query. However, providing a solid title tag increases the chances yours will be used."
          },
          {
            question: "Does the title length include spaces?",
            answer: "Yes, every character (including spaces) counts toward the total pixel width, though Google technically measures by pixels, not just character count."
          },
          {
            question: "What makes a high-CTR description?",
            answer: "A good description is descriptive, contains a unique selling point, and usually ends with a call to action like 'Learn more' or 'Try for free'."
          }
        ]}
        relatedTools={[
          { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" },
          { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" },
          { name: "Keyword Density", emoji: "📊", path: "/tools/keyword-density" },
          { name: "URL Slug Generator", emoji: "🔗", path: "/tools/url-slug-generator" }
        ]}
      />
    </div>
  );
};

export default SerpPreview;
