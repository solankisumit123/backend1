import { ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const platforms = [
    {
        name: "Instagram",
        emoji: "📸",
        color: "border-comic-purple",
        sizes: [
            { type: "Profile Photo", w: 320, h: 320 },
            { type: "Feed Post (Square)", w: 1080, h: 1080 },
            { type: "Feed Post (Portrait)", w: 1080, h: 1350 },
            { type: "Feed Post (Landscape)", w: 1080, h: 566 },
            { type: "Story / Reel", w: 1080, h: 1920 },
            { type: "IGTV Cover", w: 420, h: 654 },
        ],
    },
    {
        name: "Facebook",
        emoji: "📘",
        color: "border-comic-blue",
        sizes: [
            { type: "Profile Picture", w: 170, h: 170 },
            { type: "Cover Photo", w: 820, h: 312 },
            { type: "Shared Image", w: 1200, h: 630 },
            { type: "Event Cover", w: 1920, h: 1005 },
            { type: "Story", w: 1080, h: 1920 },
        ],
    },
    {
        name: "Twitter / X",
        emoji: "𝕏",
        color: "border-comic-blue",
        sizes: [
            { type: "Profile Photo", w: 400, h: 400 },
            { type: "Header / Banner", w: 1500, h: 500 },
            { type: "In-stream Image", w: 1600, h: 900 },
            { type: "Card Image", w: 800, h: 418 },
        ],
    },
    {
        name: "YouTube",
        emoji: "📺",
        color: "border-comic-red",
        sizes: [
            { type: "Channel Art", w: 2560, h: 1440 },
            { type: "Profile Picture", w: 800, h: 800 },
            { type: "Thumbnail", w: 1280, h: 720 },
            { type: "Video (HD)", w: 1920, h: 1080 },
            { type: "Video (4K)", w: 3840, h: 2160 },
        ],
    },
    {
        name: "LinkedIn",
        emoji: "💼",
        color: "border-comic-blue",
        sizes: [
            { type: "Profile Photo", w: 400, h: 400 },
            { type: "Cover / Banner", w: 1584, h: 396 },
            { type: "Shared Image", w: 1200, h: 627 },
            { type: "Company Logo", w: 300, h: 300 },
        ],
    },
    {
        name: "TikTok",
        emoji: "🎵",
        color: "border-comic-red",
        sizes: [
            { type: "Profile Photo", w: 200, h: 200 },
            { type: "Video", w: 1080, h: 1920 },
        ],
    },
    {
        name: "Pinterest",
        emoji: "📌",
        color: "border-comic-red",
        sizes: [
            { type: "Pin (Standard)", w: 1000, h: 1500 },
            { type: "Pin (Long)", w: 1000, h: 2100 },
            { type: "Profile Photo", w: 165, h: 165 },
            { type: "Board Cover", w: 222, h: 150 },
        ],
    },
    {
        name: "WhatsApp",
        emoji: "💬",
        color: "border-comic-green",
        sizes: [
            { type: "Profile Photo", w: 500, h: 500 },
            { type: "Status (Image)", w: 1080, h: 1920 },
        ],
    },
];

const SocialMediaImageSizeGuide = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 1200);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🖼️</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Social Media Image Size Guide</h1>
                <p className="text-muted-foreground font-bold">All social media image dimensions in one place — 2024-25 updated</p>
            </div>

            <div className="space-y-6">
                {platforms.map((p, pi) => (
                    <div key={pi} className={`bg-card border-4 ${p.color} rounded-2xl p-5 shadow-lg`}>
                        <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
                            <span className="text-2xl">{p.emoji}</span> {p.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {p.sizes.map((s, si) => {
                                const sizeStr = `${s.w} × ${s.h} px`;
                                const ratio = (s.w / s.h).toFixed(2);
                                return (
                                    <div key={si} className="bg-background rounded-xl p-3 flex items-center justify-between border-2 border-border hover:border-primary transition-colors">
                                        <div>
                                            <div className="text-sm font-black text-foreground">{s.type}</div>
                                            <div className="text-xs font-bold text-muted-foreground">{sizeStr} · {ratio}:1</div>
                                        </div>
                                        <button onClick={() => copy(sizeStr)}
                                            className={`shrink-0 p-1.5 rounded-lg transition-all ${copied === sizeStr ? "bg-comic-green text-white" : "bg-muted hover:bg-primary hover:text-white"}`}>
                                            {copied === sizeStr ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Social Media Image Size Guide 2024-25</h2>
                <p>Find the <strong>correct image dimensions</strong> for every social media platform including Instagram, Facebook, Twitter/X, YouTube, LinkedIn, TikTok, Pinterest, and WhatsApp. All sizes are updated for 2024-25.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: social media image size guide, instagram image size, facebook cover photo size, twitter header size, youtube thumbnail size, linkedin banner size, social media dimensions 2024.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default SocialMediaImageSizeGuide;
