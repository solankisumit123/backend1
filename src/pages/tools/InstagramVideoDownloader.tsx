import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Play, Instagram, AlertCircle, Search, Globe, Music, Video, Monitor, Sparkles, Download } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import { BACKEND_URL } from "@/config";

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
    const localBackendUrl = BACKEND_URL;

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
            setError("Connection failed. Master Engine is currently unreachable.");
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

            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 200);

            setTimeout(() => {
                clearInterval(interval);
                setProgress(100);
                setTimeout(() => {
                    setDownloading(false);
                    setProgress(0);
                }, 1000);
            }, 2500);
        } catch (err: unknown) {
            setError("Local Master Engine error. Please check your connection.");
            setDownloading(false);
            setProgress(0);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
            <Link 
                to="/tools" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 text-secondary hover:bg-white/50 transition-all font-bold text-sm mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            {/* Main Header Card */}
            <div className="glass-panel rounded-[3rem] p-8 md:p-12 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Instagram className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-4 uppercase">
                        Insta <span className="text-pink-600 italic">Master Sync</span>
                    </h1>
                    <p className="text-secondary/60 font-medium text-lg mb-10 leading-relaxed">
                        The most elegant way to save Reels and Photos. Direct extraction from Instagram's core, preserving maximum fidelity.
                    </p>

                    <div className="flex gap-2 p-1.5 bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl mb-8">
                        <button
                            onClick={() => setActiveTab("video")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'video' ? 'bg-pink-500 text-white shadow-lg scale-105' : 'text-secondary/60 hover:text-secondary hover:bg-white/40'}`}
                        >
                            <Video className="w-4 h-4" /> REELS
                        </button>
                        <button
                            onClick={() => setActiveTab("audio")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'audio' ? 'bg-purple-600 text-white shadow-lg scale-105' : 'text-secondary/60 hover:text-secondary hover:bg-white/40'}`}
                        >
                            <Music className="w-4 h-4" /> AUDIO
                        </button>
                    </div>

                    <form onSubmit={processInput} className="w-full flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Paste Instagram Reel or Post link here..."
                                className="w-full glass-input py-5 px-8 text-lg font-bold placeholder:text-secondary/30 focus:bg-white/50 transition-all border-white/60"
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
                            className="px-12 py-5 rounded-3xl bg-secondary text-white font-black text-xl hover:bg-pink-500 shadow-xl hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? 'SYNCING...' : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    SYNC
                                </>
                            )}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 font-bold text-sm flex items-center gap-3 animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="mt-8 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${engineStatus === 'online' ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40">
                            AES-256 Engine: {engineStatus} • Private Link Access
                        </span>
                    </div>
                </div>
            </div>

            {videoInfo && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 animate-slide-up">
                    {/* Preview Area */}
                    <div className="md:col-span-5">
                        <div className="glass-panel overflow-hidden rounded-[3rem] shadow-2xl group h-fit">
                            <div className="aspect-[9/16] relative overflow-hidden bg-black/5">
                                {videoInfo.preview_url ? (
                                    <video
                                        src={videoInfo.preview_url}
                                        poster={videoInfo.thumbnail}
                                        controls
                                        playsInline
                                        muted
                                        className="w-full h-full object-contain"
                                        autoPlay={false}
                                    />
                                ) : (
                                    <img
                                        src={videoInfo.thumbnail}
                                        alt={videoInfo.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                                    />
                                )}

                                {!videoInfo.preview_url && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform cursor-pointer shadow-2xl">
                                            <Play className="w-10 h-10 text-white fill-current translate-x-1" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl text-white font-black text-xs px-5 py-2 rounded-full border border-white/10 z-20">
                                    {videoInfo.duration}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-black text-secondary mb-2 line-clamp-1 uppercase tracking-tight">
                                    {videoInfo.title}
                                </h3>
                                <p className="text-secondary/40 font-black text-[10px] uppercase tracking-widest leading-none">
                                    Source: {videoInfo.author}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Controls Area */}
                    <div className="md:col-span-7 flex flex-col gap-8">
                        <div className="glass-panel rounded-[3rem] p-10 shadow-2xl h-full flex flex-col">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black text-secondary uppercase tracking-tighter">
                                    Ready to Sync
                                </h2>
                                <div className="px-5 py-2 bg-pink-500/10 text-pink-600 rounded-full font-black text-[10px] tracking-widest border border-pink-500/20">
                                    SECURE LINK
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                {activeTab === "video" ? (
                                    <button
                                        onClick={() => triggerDirectDownload("mp4")}
                                        disabled={downloading}
                                        className="w-full flex items-center justify-between bg-white/40 p-8 rounded-[2.5rem] border border-white/60 hover:bg-white/60 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 border border-black/5">
                                                <Video className="w-8 h-8" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-black text-2xl text-secondary uppercase tracking-tight mb-1">Full HD Video</div>
                                                <div className="text-secondary/40 text-xs font-black uppercase tracking-[0.2em]">1080P • MP4 Extraction</div>
                                            </div>
                                        </div>
                                        <div className="w-14 h-14 rounded-full border border-secondary/10 flex items-center justify-center group-hover:bg-white transition-all shadow-inner">
                                            <Download className="w-6 h-6 text-secondary" />
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => triggerDirectDownload("mp3")}
                                        disabled={downloading}
                                        className="w-full flex items-center justify-between bg-white/40 p-8 rounded-[2.5rem] border border-white/60 hover:bg-white/60 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 border border-black/5">
                                                <Music className="w-8 h-8" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-black text-2xl text-secondary uppercase tracking-tight mb-1">Hi-Fi Audio</div>
                                                <div className="text-secondary/40 text-xs font-black uppercase tracking-[0.2em]">320KBPS • MP3 Master</div>
                                            </div>
                                        </div>
                                        <div className="w-14 h-14 rounded-full border border-secondary/10 flex items-center justify-center group-hover:bg-white transition-all shadow-inner">
                                            <Download className="w-6 h-6 text-secondary" />
                                        </div>
                                    </button>
                                )}
                            </div>

                            {downloading && (
                                <div className="mt-10 p-8 bg-white/30 rounded-[2rem] border border-white/50 backdrop-blur-md animate-in zoom-in-95 duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping" />
                                            <span className="font-black text-[10px] uppercase tracking-[0.3em] text-secondary">
                                                {progress === 100 ? 'SUCCESSFULLY EXTRACTED' : 'BYPASSING RESTRICTIONS...'}
                                            </span>
                                        </div>
                                        <span className="font-black text-pink-500 italic text-xl">{progress}%</span>
                                    </div>
                                    <div className="h-4 bg-white/20 rounded-full overflow-hidden border border-white/40 shadow-inner">
                                        <div
                                            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-4 text-[9px] font-black text-secondary/30 uppercase text-center tracking-[0.4em]">
                                        End-to-End Encrypted Tunnel Active
                                    </p>
                                </div>
                            )}

                            <div className="mt-10 pt-8 border-t border-secondary/5 flex items-center justify-center gap-6 opacity-30">
                                <Globe className="w-5 h-5 text-secondary" />
                                <div className="flex -space-x-1">
                                    {[1,2,3,4].map(i => <div key={i} className="w-4 h-4 rounded-full border border-white bg-secondary/10" />)}
                                </div>
                                <Monitor className="w-5 h-5 text-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!videoInfo && !loading && (
                <div className="mt-12 group">
                    <div className="relative py-24 flex flex-col items-center justify-center glass-panel rounded-[4rem] border-dashed border-white/60 hover:bg-white/30 transition-all duration-700">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <div className="relative z-10 text-center animate-pulse">
                            <div className="w-32 h-32 bg-white/40 backdrop-blur-2xl rounded-[3rem] flex items-center justify-center mb-8 border border-white/60 shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
                                <Sparkles className="w-12 h-12 text-pink-500 opacity-30" />
                            </div>
                            <p className="text-3xl font-black text-secondary/20 uppercase tracking-[0.4em] italic pr-4">Awaiting Signal</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-20">
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
