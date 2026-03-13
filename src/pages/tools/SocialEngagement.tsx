import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdBanner from "../../components/AdBanner";

const SocialEngagement = () => {
    const [followers, setFollowers] = useState(10000);
    const [likes, setLikes] = useState(500);
    const [comments, setComments] = useState(50);
    const [shares, setShares] = useState(20);
    const [posts, setPosts] = useState(30);
    const [platform, setPlatform] = useState("instagram");

    const avgEngagement = posts > 0 ? ((likes + comments + shares) / posts) : 0;
    const engagementRate = followers > 0 ? ((likes + comments + shares) / followers) * 100 : 0;
    const likesPerPost = posts > 0 ? likes / posts : 0;
    const commentsPerPost = posts > 0 ? comments / posts : 0;

    const benchmarks: Record<string, number> = {
        instagram: 3, twitter: 0.5, tiktok: 6, facebook: 0.5, linkedin: 2, youtube: 4,
    };

    const benchmark = benchmarks[platform] || 2;
    const verdict = engagementRate >= benchmark * 1.5 ? "Excellent" : engagementRate >= benchmark ? "Good" : engagementRate >= benchmark * 0.5 ? "Average" : "Low";
    const verdictColor = verdict === "Excellent" ? "text-secondary" : verdict === "Good" ? "text-comic-blue" : verdict === "Average" ? "text-comic-orange" : "text-destructive";

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">❤️ Social Engagement</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Platform</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="comic-input">
                        {Object.keys(benchmarks).map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Followers</label>
                    <input type="number" value={followers} onChange={(e) => setFollowers(Number(e.target.value))} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Posts (this month)</label>
                    <input type="number" value={posts} onChange={(e) => setPosts(Number(e.target.value))} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Total Likes</label>
                    <input type="number" value={likes} onChange={(e) => setLikes(Number(e.target.value))} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Total Comments</label>
                    <input type="number" value={comments} onChange={(e) => setComments(Number(e.target.value))} className="comic-input" />
                </div>
                <div>
                    <label className="font-bold text-foreground text-sm uppercase block mb-1">Total Shares</label>
                    <input type="number" value={shares} onChange={(e) => setShares(Number(e.target.value))} className="comic-input" />
                </div>
            </div>

            <div className="comic-card text-center mb-6 overflow-hidden">
                <p className="text-sm text-muted-foreground font-bold uppercase">Engagement Rate</p>
                <p className={`comic-score ${verdictColor}`}>{engagementRate.toFixed(2)}%</p>
                <p className={`font-bold ${verdictColor}`}>{verdict}</p>
                <p className="text-xs text-muted-foreground font-bold mt-1">Industry benchmark: {benchmark}%</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Avg Engagement", value: Math.floor(avgEngagement).toLocaleString() },
                    { label: "Likes/Post", value: Math.floor(likesPerPost).toLocaleString() },
                    { label: "Comments/Post", value: Math.floor(commentsPerPost).toLocaleString() },
                    { label: "Total Interactions", value: (likes + comments + shares).toLocaleString() },
                ].map((s) => (
                    <div key={s.label} className="comic-card text-center py-4">
                        <p className="comic-heading text-2xl text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground font-bold uppercase">{s.label}</p>
                    </div>
                ))}
</div>

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="3820454060" dataAdFormat="auto" />
      <AdBanner dataAdSlot="3820454060" dataAdFormat="rectangle" />

        </div>
    );
};

export default SocialEngagement;
