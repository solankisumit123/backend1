import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import AdBanner from "../../components/AdBanner";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";

const WordCounter = () => {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">📝 Word Counter</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="comic-input min-h-[200px] resize-y mb-6"
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: chars },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
          { label: "Read Time", value: `${readingTime}m` },
        ].map((s) => (
          <div key={s.label} className="comic-card text-center">
            <p className="comic-heading text-3xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-bold uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
      </div>

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3820454060" dataAdFormat="auto" />
      <AdBanner dataAdSlot="3820454060" dataAdFormat="rectangle" />

      {/* ── SEO SECTION ── */}
      <SEOHead
        title="Word Counter Online - Character & Sentence Count"
        description="Free online word counter to track word count, character count, sentences, and paragraphs in real-time. Calculate estimated reading time for your content."
        keywords="word counter, character counter, sentence counter, paragraph counter, reading time calculator"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WebInsight Pro Word Counter",
          "operatingSystem": "All Browsers",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <SEOSection
        title="Accurate Real-Time Text Analytics"
        subtitle="Perfect Your Writing with Detailed Content Statistics"
        description="Whether you're writing a blog post with a specific word limit, drafting an essay, or creating social media updates, knowing your exact word and character count is essential. WebInsight Pro's Word Counter provides live feedback as you type, helping you stay within constraints while also providing insights into reading time and content structure."
        howToUse={[
          "Paste your text directly into the large input field.",
          "The statistics (Words, Characters, Sentences, etc.) update instantly.",
          "Check the 'Read Time' to see how long it would take an average person to read your text.",
          "Monitor 'Paragraphs' to ensure your text is well-divided for readability.",
          "Copy your analyzed text back to your document editor when finished."
        ]}
        features={[
          "Instant Updates: No need to click 'Count'; results appear as you type or paste.",
          "Reading Time Logic: Uses a standard 200 words-per-minute average calculation.",
          "Comprehensive Breakdown: Tracks Words, Characters (with spaces), Sentences, and Paragraphs.",
          "Privacy Guaranteed: Your text is never sent to any server; it stays in your browser.",
          "Ad-Supported & Free: Access professional writing tools without a subscription."
        ]}
        faqs={[
          {
            question: "Does it count spaces as characters?",
            answer: "Yes, the character count includes spaces and punctuation, which is the standard requirement for most academic and social media limits."
          },
          {
            question: "How is reading time calculated?",
            answer: "We use the industry-standard average of 200 words per minute. This helps you gauge if your content is too long for the intended platform."
          },
          {
            question: "Is there a limit to how much text I can paste?",
            answer: "You can paste books' worth of text! Our tool is optimized to handle large documents without crashing the browser."
          }
        ]}
        relatedTools={[
          { name: "Case Converter", emoji: "🔠", path: "/tools/case-converter" },
          { name: "Lorem Ipsum", emoji: "📜", path: "/tools/lorem-ipsum" },
          { name: "Fancy Text", emoji: "✨", path: "/tools/fancy-text" },
          { name: "Keyword Density", emoji: "📊", path: "/tools/keyword-density" }
        ]}
      />
    </div>
  );
};

export default WordCounter;
