import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const KeywordDensity = () => {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    const total = words.length;
    const freq: Record<string, number> = {};
    const stopWords = new Set(["the", "a", "an", "is", "are", "was", "were", "in", "on", "at", "to", "for", "of", "and", "or", "but", "it", "this", "that", "with", "as", "by", "from", "be", "has", "have", "had"]);
    words.forEach((w) => { if (!stopWords.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(1) }));
  }, [text]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🔤 Keyword Density</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your content here..."
        className="comic-input min-h-[200px] resize-y mb-6"
      />

      {analysis.length > 0 && (
        <div className="comic-card">
          <h3 className="comic-heading text-xl text-foreground mb-4">Top Keywords</h3>
          <div className="space-y-3">
            {analysis.map((kw, i) => (
              <div key={kw.word} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="font-bold text-foreground w-32 truncate">{kw.word}</span>
                <div className="flex-1 comic-progress-track h-4">
                  <div className="comic-progress-bar h-full" style={{ width: `${Math.min(parseFloat(kw.density) * 10, 100)}%` }} />
                </div>
                <span className="text-sm font-bold text-muted-foreground w-20 text-right">{kw.density}% ({kw.count}x)</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ── SEO SECTION ── */}
      <SEOHead
        title="Keyword Density Checker - Content Optimization Tool"
        description="Analyze the keyword density of your content to avoid over-optimization. Our free tool identifies top keywords and their frequency for better search engine ranking."
        keywords="keyword density, content optimization, seo tool, keyword frequency, avoid keyword stuffing"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro Keyword Density Tool",
          "operatingSystem": "All Browsers",
          "applicationCategory": "DeveloperApplication"
        }}
      />

      <SEOSection
        title="Optimize Content with Intelligent Keyword Analysis"
        subtitle="Balance Your Content for Search Engines and Readers"
        description="Keyword density is a crucial metric in SEO that measures how often a specific word or phrase appears compared to the total number of words in a piece of content. While keywords help search engines understand your topic, using them too much can lead to 'keyword stuffing' penalties. WebInsight Pro helps you find the perfect balance by providing a clear, visual breakdown of your most used terms."
        howToUse={[
          "Paste your blog post, article, or product description into the text area.",
          "The tool automatically filters out 'Stop Words' (a, the, is, etc.) to focus on meaningful terms.",
          "Review the 'Top Keywords' list to see which words dominate your content.",
          "Check the 'Density %' to ensure no single word exceeds 2-3% of the total content.",
          "Adjust your writing if certain terms appear too frequently to maintain natural readability."
        ]}
        features={[
          "Automatic Stop Word Filtering: Ignores common grammar words that don't help with SEO.",
          "Real-Time Calculation: Watch the density bars update as you refine your text.",
          "Visual Heatmap: Easily spot over-used keywords with our progress-bar-style frequency indicator.",
          "Frequency Count: See exactly how many times each word occurs in the text.",
          "Privacy Focused: Your content is processed locally in your browser and never saved to our servers."
        ]}
        faqs={[
          {
            question: "What is the ideal keyword density?",
            answer: "Most SEO experts recommend a density of 1% to 2% for your primary keyword. Exceeding 3% can sometimes be flagged as spam by Google."
          },
          {
            question: "Does this tool support long-tail keywords?",
            answer: "Currently, this tool focuses on single-word frequency. For long-tail analysis, we recommend our specialized SEO Audit tool."
          },
          {
            question: "Is keyword density still important in 2024?",
            answer: "While Google's algorithms are more advanced now, keyword density remains a fundamental way to signal relevance. It's more about ensuring you don't over-optimize."
          }
        ]}
        relatedTools={[
          { name: "Word Counter", emoji: "📝", path: "/tools/word-counter" },
          { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" },
          { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
          { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" }
        ]}
      />
    </div>
  );
};

export default KeywordDensity;
