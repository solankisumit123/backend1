import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const TwitterCharCounter = () => {
    const [text, setText] = useState("");
    const MAX = 280;
    const XMAX = 25000; // X Premium
    const len = [...text].length; // Unicode-aware
    const remaining = MAX - len;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const hashtags = (text.match(/#\w+/g) || []).length;
    const mentions = (text.match(/@\w+/g) || []).length;
    const urls: string[] = text.match(/https?:\/\/\S+/g) || [];
    // Twitter counts URLs as 23 chars each
    const twitterLen = len - urls.reduce((s: number, u: string) => s + u.length, 0) + urls.length * 23;
    const twitterRemaining = MAX - twitterLen;
    const pct = Math.min(100, (twitterLen / MAX) * 100);

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">𝕏</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Twitter/X Character Counter</h1>
                <p className="text-muted-foreground font-bold">Count characters for tweets — 280 char limit aware</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 relative">
                <textarea value={text} onChange={e => setText(e.target.value)} rows={6}
                    placeholder="Write your tweet here... 🐦"
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg resize-none" />

                {/* Progress bar */}
                <div className="mt-3">
                    <div className="h-3 bg-muted rounded-full overflow-hidden border-2 border-border">
                        <div className="h-full transition-all duration-300 rounded-full"
                            style={{
                                width: `${pct}%`,
                                background: pct < 80 ? "#3b82f6" : pct < 100 ? "#f59e42" : "#ef4444",
                            }} />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className={`text-sm font-black ${twitterRemaining < 0 ? "text-comic-red" : twitterRemaining < 20 ? "text-comic-orange" : "text-comic-blue"}`}>
                            {twitterRemaining < 0 ? `${Math.abs(twitterRemaining)} over limit!` : `${twitterRemaining} chars remaining`}
                        </span>
                        <span className="text-sm font-bold text-muted-foreground">{twitterLen}/{MAX}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: "Characters", value: len, emoji: "🔤" },
                    { label: "Words", value: words, emoji: "📝" },
                    { label: "Sentences", value: sentences, emoji: "📄" },
                    { label: "Twitter Chars", value: twitterLen, emoji: "𝕏" },
                    { label: "Hashtags", value: hashtags, emoji: "#️⃣" },
                    { label: "Mentions", value: mentions, emoji: "@" },
                    { label: "URLs", value: urls.length, emoji: "🔗" },
                    { label: "X Premium", value: `${XMAX - len}`, emoji: "⭐" },
                ].map((s, i) => (
                    <div key={i} className="bg-card border-4 border-border rounded-2xl p-3 text-center">
                        <div className="text-lg mb-1">{s.emoji}</div>
                        <div className="text-xl font-black">{s.value}</div>
                        <div className="text-[10px] font-bold text-muted-foreground">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tips */}
            <div className="bg-card border-4 border-border rounded-2xl p-5 mb-6">
                <h3 className="font-black text-foreground mb-3">💡 Twitter/X Tips</h3>
                <ul className="space-y-2 text-sm font-bold text-muted-foreground">
                    <li>• Standard tweets: <strong className="text-foreground">280 characters</strong></li>
                    <li>• X Premium (paid): <strong className="text-foreground">25,000 characters</strong></li>
                    <li>• URLs always count as <strong className="text-foreground">23 characters</strong> regardless of length</li>
                    <li>• Images don't count toward character limit</li>
                    <li>• Use 2-3 hashtags max for best engagement</li>
                </ul>
            </div>

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Twitter Character Counter — Stay Within 280 Chars</h2>
                <p>Count characters for your <strong>tweets on X (Twitter)</strong> with URL-aware counting. Our tool shows real-time character count, word count, hashtag count, and X Premium limits. Perfect for social media managers and content creators.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: twitter character counter, x character limit, tweet length checker, 280 character counter, twitter word count, x post counter.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default TwitterCharCounter;
