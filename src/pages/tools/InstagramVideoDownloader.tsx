import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Play, Instagram, AlertCircle, Search, Globe, Music, Video, Monitor } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

interface VideoInfo {
    title: string;
    author: string;
    thumbnail: string;
    duration: string;
    url: string;
    preview_url?: string;
}

const InstagramVideoDownloader = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"video" | "audio">("video");
    const [downloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [engineStatus, setEngineStatus] = useState<"connecting" | "online" | "offline">("connecting");
    const localBackendUrl = "http://localhost:5000";

    const handleFetchInfo = async (urlToFetch: string) => {
        if (!urlToFetch.trim()) return;

        setLoading(true);
        setError("");
        setVideoInfo(null);

        try {
            const response = await fetch(`${localBackendUrl}/info?url=${encodeURIComponent(urlToFetch)}`);
            if (!response.ok) throw new Error("Could not connect to Master Engine");

            const data = await response.json();

            setVideoInfo({
                title: data.title || "Instagram Media",
                author: data.author || "Instagram Creator",
                thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
                duration: data.duration ? `${Math.floor(data.duration / 60)}:${data.duration % 60}` : "Single Post",
                url: urlToFetch,
                preview_url: data.preview_url
            });
            setEngineStatus("online");
        } catch (err) {
            console.error("Master Engine error:", err);
            setError("Handshake failed. Ensure the Local Master Engine is running.");
            setEngineStatus("offline");
        } finally {
            setLoading(false);
        }
    };

    const processInput = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        await handleFetchInfo(query);
    };

    const triggerDirectDownload = async (format: string) => {
        if (!videoInfo) return;

        setDownloading(true);
        setProgress(5);
        setError("");

        try {
            const downloadUrl = `${localBackendUrl}/download?url=${encodeURIComponent(videoInfo.url)}&f=${format === 'mp3' ? 'mp3' : 'mp4'}`;

            setProgress(50);
            window.location.href = downloadUrl;

            setTimeout(() => {
                setProgress(100);
                setTimeout(() => {
                    setDownloading(false);
                    setProgress(0);
                }, 1000);
            }, 2000);
        } catch (err: unknown) {
            setError("Local Master Engine error. Please check your connection.");
            setDownloading(false);
            setProgress(0);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6 shadow-sm border-2">
                <ArrowLeft className="w-4 h-4" /> REVOLT DASHBOARD
            </Link>

            {/* Desktop-Style Professional Toolbar */}
            <div className="bg-card border-4 border-black rounded-[2rem] p-8 shadow-comic-lg mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Monitor className="w-48 h-48" />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center border-4 border-black shadow-comic transform -rotate-3 group-hover:rotate-0 transition-transform">
                            <Instagram className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="comic-heading text-4xl text-foreground -mb-1 tracking-tight uppercase">Insta Master</h1>
                                <div className={`px-2 py-0.5 rounded-full border-2 border-black text-[8px] font-black uppercase flex items-center gap-1 ${engineStatus === 'online' ? 'bg-comic-green text-white' : engineStatus === 'connecting' ? 'bg-comic-yellow' : 'bg-comic-red text-white'}`}>
                                    <Globe className={`w-2 h-2 ${engineStatus === 'connecting' ? 'animate-spin' : ''}`} />
                                    {engineStatus}
                                </div>
                            </div>
                            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em]">Direct Insta Extraction</p>
                        </div>
                    </div>

                    <div className="flex bg-muted p-1.5 rounded-2xl border-4 border-black shadow-comic-sm">
                        <button
                            onClick={() => setActiveTab("video")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs transition-all ${activeTab === 'video' ? 'bg-pink-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Video className="w-4 h-4" /> VIDEO
                        </button>
                        <button
                            onClick={() => setActiveTab("audio")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs transition-all ${activeTab === 'audio' ? 'bg-purple-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Music className="w-4 h-4" /> AUDIO
                        </button>
                    </div>
                </div>

                <form onSubmit={processInput} className="flex flex-col md:flex-row gap-4 relative z-10">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="PASTE INSTAGRAM REEL/VIDEO URL..."
                            className="w-full bg-background border-4 border-black rounded-2xl px-6 py-5 text-lg font-black placeholder:text-muted-foreground/30 focus:outline-none focus:border-pink-500 transition-all"
                        />
                        {loading && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="comic-btn bg-pink-500 text-white px-12 py-5 text-xl font-black shadow-comic hover:translate-y-[-2px] active:translate-y-[2px]"
                    >
                        SYNC
                    </button>
                </form>

                {error && (
                    <div className="mt-4 bg-destructive/10 text-destructive text-sm font-black p-4 rounded-xl border-4 border-destructive/20 flex items-center gap-2 animate-shake">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}
            </div>

            {videoInfo && (
                <div className="grid md:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                    {/* Preview Area */}
                    <div className="md:col-span-5">
                        <div className="bg-card border-4 border-black rounded-3xl overflow-hidden shadow-comic group h-fit sticky top-24">
                            <div className="aspect-[9/16] relative overflow-hidden bg-black">
                                {videoInfo.preview_url ? (
                                    <video
                                        src={videoInfo.preview_url}
                                        poster={videoInfo.thumbnail}
                                        controls
                                        playsInline
                                        muted
                                        preload="metadata"
                                        className="w-full h-full object-contain bg-black"
                                        autoPlay={false}
                                    />
                                ) : (
                                    <img
                                        src={videoInfo.thumbnail}
                                        alt={videoInfo.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}

                                {!videoInfo.preview_url && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/50 group-hover:scale-110 transition-transform cursor-pointer">
                                            <Play className="w-10 h-10 text-white fill-current translate-x-1" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white font-black text-xs px-4 py-2 rounded-full border-2 border-white/20 z-20">
                                    {videoInfo.duration}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="comic-heading text-xl mb-1 line-clamp-1">{videoInfo.title}</h3>
                                <p className="text-muted-foreground font-black text-[10px] uppercase tracking-wider">Source: {videoInfo.author}</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls Area */}
                    <div className="md:col-span-7 flex flex-col gap-6">
                        <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-comic h-full">
                            <h2 className="comic-heading text-2xl mb-6">READY FOR EXTRACTION</h2>

                            <div className="space-y-4">
                                {activeTab === "video" ? (
                                    <>
                                        <button
                                            onClick={() => triggerDirectDownload("mp4")}
                                            disabled={downloading}
                                            className="w-full flex items-center justify-between bg-pink-500 text-white p-6 rounded-2xl border-4 border-black shadow-comic-sm hover:translate-y-[-2px] hover:shadow-comic active:translate-y-[2px] disabled:opacity-50 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/40">
                                                    <Video className="w-6 h-6" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-black text-lg uppercase tracking-tight">Full Quality Video</div>
                                                    <div className="text-white/70 text-[10px] font-black uppercase">MP4 Format • 1080p Crystal Clear</div>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center border-2 border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                                                <Search className="w-5 h-5" />
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => triggerDirectDownload("mp3")}
                                        disabled={downloading}
                                        className="w-full flex items-center justify-between bg-purple-600 text-white p-6 rounded-2xl border-4 border-black shadow-comic-sm hover:translate-y-[-2px] hover:shadow-comic active:translate-y-[2px] disabled:opacity-50 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/40">
                                                <Music className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-black text-lg uppercase tracking-tight">Original Audio</div>
                                                <div className="text-white/70 text-[10px] font-black uppercase">MP3 Format • 320kbps High Fidelity</div>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center border-2 border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                                            <Search className="w-5 h-5" />
                                        </div>
                                    </button>
                                )}
                            </div>

                            {downloading && (
                                <div className="mt-8 p-6 bg-muted rounded-2xl border-4 border-black shadow-comic-sm animate-in zoom-in-95 duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                                            <span className="font-black text-[10px] uppercase tracking-[0.2em]">{progress === 100 ? 'HANDING OVER TO BROWSER' : 'LOCAL MASTER SYNCING...'}</span>
                                        </div>
                                        <span className="font-black text-pink-500 italic">{progress}%</span>
                                    </div>
                                    <div className="h-6 bg-white border-4 border-black rounded-full p-1 overflow-hidden">
                                        <div
                                            className="h-full bg-pink-500 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-3 text-[9px] font-black text-muted-foreground uppercase text-center tracking-widest opacity-50">Local Engine Processing • Bypassing API Restrictions</p>
                                </div>
                            ) || (
                                    <div className="mt-8 flex items-center gap-4 p-4 grayscale opacity-40">
                                        <div className="flex-1 border-t-2 border-dashed border-black" />
                                        <Globe className="w-6 h-6" />
                                        <div className="flex-1 border-t-2 border-dashed border-black" />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12">
                <div className="flex justify-center mb-8">
                    <AdBanner width={728} height={90} bannerId="28752282" />
                </div>

                <SEOHead
                    title="Instagram Video Downloader - Download Reels & Videos Online"
                    description="Download Instagram videos, reels, and stories for free. High quality MP4 downloads directly from Instagram with one click."
                    canonicalUrl="/tools/instagram-video-downloader"
                />

                <SEOSection
                    title="High-Speed Instagram Media Extraction"
                    subtitle="Sync Reels and Videos Privately to Your Device"
                    description="Insta Master by WebInsight Pro is the most advanced way to save Instagram content. Using a direct local extraction engine, it bypasses traditional API slow-downs and advertisement redirects, giving you the fastest possible path to your media."
                    howToUse={[
                        "Copy the link of the Instagram Reel or Video you wish to save",
                        "Paste the URL into the Insta Master 'SYNC' field",
                        "Wait for the local engine to verify the media metadata",
                        "Choose between Video (MP4) or Audio (MP3) extraction",
                        "Click the download button to save the file locally"
                    ]}
                    features={[
                        "Reels Support: Save full-length Instagram Reels in 1080p HD",
                        "Audio Extraction: Turn any Reel into a high-quality MP3 file",
                        "Private Sync: Your Instagram browsing remains 100% private",
                        "Direct Links: No redirects to external download websites",
                        "Zero Ads: Clean, professional distraction-free interface"
                    ]}
                    faqs={[
                        {
                            question: "Can I download private Instagram videos?",
                            answer: "Our tool requires the URL to be publicly accessible. If a video is in a private account, the engine cannot sync with it for security reasons."
                        },
                        {
                            question: "What formats are supported?",
                            answer: "We support high-definition MP4 for video and 320kbps MP3 for audio extraction."
                        }
                    ]}
                    relatedTools={[
                        { name: "YT Downloader", emoji: "📺", path: "/tools/youtube-video-downloader" },
                        { name: "Bio Generator", emoji: "📝", path: "/tools/instagram-bio-generator" },
                        { name: "Font Style", emoji: "✒️", path: "/tools/instagram-fonts" },
                        { name: "Caption Gen", emoji: "💬", path: "/tools/social-caption-generator" }
                    ]}
                />
            </div>
        </div>
    );
};

export default InstagramVideoDownloader;
