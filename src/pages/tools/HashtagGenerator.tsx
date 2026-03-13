import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdBanner from "../../components/AdBanner";

const hashtagSets: Record<string, string[]> = {
  seo: ["#SEO", "#DigitalMarketing", "#SearchEngine", "#GoogleRanking", "#SEOtips", "#ContentMarketing", "#OnPageSEO", "#Backlinks", "#KeywordResearch", "#OrganicTraffic"],
  business: ["#Business", "#Entrepreneur", "#StartUp", "#SmallBusiness", "#Success", "#Marketing", "#Growth", "#Innovation", "#Leadership", "#Hustle"],
  tech: ["#Technology", "#WebDev", "#Programming", "#AI", "#TechNews", "#SaaS", "#Coding", "#JavaScript", "#ReactJS", "#Developer"],
  social: ["#SocialMedia", "#Instagram", "#Twitter", "#LinkedIn", "#ContentCreator", "#Influencer", "#ViralContent", "#Engagement", "#Community", "#Trending"],
};

const HashtagGenerator = () => {
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const generate = () => {
    const key = Object.keys(hashtagSets).find((k) => topic.toLowerCase().includes(k));
    const base = hashtagSets[key || "seo"];
    const custom = topic.split(/\s+/).filter(Boolean).map((w) => `#${w.charAt(0).toUpperCase() + w.slice(1)}`);
    setTags([...new Set([...custom, ...base])].slice(0, 15));
  };

  const copy = () => navigator.clipboard.writeText(tags.join(" "));

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>
      <h1 className="comic-heading text-4xl text-foreground mb-6 text-center"># Hashtag Generator</h1>
      <div className="flex gap-3 mb-6">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter topic (e.g. SEO, business)" className="comic-input flex-1" />
        <button onClick={generate} className="comic-btn bg-primary text-primary-foreground">Generate</button>
      </div>

      {tags.length > 0 && (
        <div className="comic-card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="comic-heading text-xl text-foreground">Your Hashtags</h3>
            <button onClick={copy} className="comic-btn bg-secondary text-secondary-foreground text-sm">📋 Copy All</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="comic-badge bg-comic-blue text-accent-foreground animate-pop-in" style={{ animationDelay: `${i * 40}ms` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3820454060" dataAdFormat="auto" />
      <AdBanner dataAdSlot="9126806975" dataAdFormat="rectangle" />

    </div>
  );
};

export default HashtagGenerator;
