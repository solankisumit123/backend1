import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Loader2, Play, Youtube, AlertCircle, Search, List, Settings2, Globe, Music, Video, CheckCircle2, Monitor, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import { BACKEND_URL } from "@/config";

interface VideoInfo {
    title: string;
    author: string;
    thumbnail: string;
    duration: string;
    url: string;
    isPlaylist?: boolean;
}

const YouTubeVideoDownloader = () => {
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
                title: data.title || "Unknown Master Stream",
                author: data.author || "Direct Channel",
                thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
                duration: data.duration ? `${Math.floor(data.duration / 60)}:${data.duration % 60}` : "Single Stream",
                url: urlToFetch
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

    const triggerDirectDownload = async (format: string, quality?: string) => {
        if (!videoInfo) return;

        setDownloading(true);
        setProgress(5);
        setError("");

        try {
            const downloadUrl = `${localBackendUrl}/download?url=${encodeURIComponent(videoInfo.url)}&f=${format === 'mp3' ? 'mp3' : 'mp4'}&q=${quality || '1080'}`;

            setProgress(50);
            window.location.href = downloadUrl;

            // Artificial progress for better UX since actual streaming is handled by browser download
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
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Youtube className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight mb-4 uppercase">
                        YouTube <span className="text-primary italic">Video Master</span>
                    </h1>
                    <p className="text-secondary/60 font-medium text-lg mb-10 leading-relaxed">
                        Extract ultra-high quality videos and audio directly from YouTube. Pure extraction, zero distractions, premium quality.
                    </p>

                    <div className="flex gap-2 p-1.5 bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl mb-8">
                        <button
                            onClick={() => setActiveTab("video")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'video' ? 'bg-primary text-white shadow-lg scale-105' : 'text-secondary/60 hover:text-secondary hover:bg-white/40'}`}
                        >
                            <Video className="w-4 h-4" /> VIDEO
                        </button>
                        <button
                            onClick={() => setActiveTab("audio")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'audio' ? 'bg-accent text-white shadow-lg scale-105' : 'text-secondary/60 hover:text-secondary hover:bg-white/40'}`}
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
                                placeholder="Paste YouTube link here (Video or Playlist)..."
                                className="w-full glass-input py-5 px-8 text-lg font-bold placeholder:text-secondary/30 focus:bg-white/50 transition-all border-white/60"
                            />
                            {loading && (
                                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-12 py-5 rounded-3xl bg-secondary text-white font-black text-xl hover:bg-primary shadow-xl hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? 'ANALYZING...' : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    EXTRACT
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
                            Engine Status: {engineStatus} • Direct Cloud Sync Enabled
                        </span>
                    </div>
                </div>
            </div>

            {videoInfo && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-slide-up">
                    {/* Left: Preview Panel */}
                    <div className="lg:col-span-5">
                        <div className="glass-panel overflow-hidden rounded-[2.5rem] shadow-2xl group h-fit">
                            <div className="relative aspect-video overflow-hidden">
                                <img 
                                    src={videoInfo.thumbnail} 
                                    alt={videoInfo.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                            <Play className="w-5 h-5 text-white fill-current" />
                                        </div>
                                        <p className="text-white font-black text-sm uppercase tracking-widest">{videoInfo.author}</p>
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-xl rounded-full text-white font-black text-xs border border-white/20">
                                    {videoInfo.duration}
                                </div>
                            </div>
                            <div className="p-10">
                                <h3 className="text-2xl md:text-3xl font-black text-secondary leading-tight mb-6 line-clamp-2 uppercase">
                                    {videoInfo.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/30 p-4 rounded-2xl border border-white/50 flex flex-col items-center justify-center text-center">
                                        <span className="text-[10px] font-black uppercase opacity-40 mb-1">Status</span>
                                        <span className="text-sm font-black text-primary">PREPPED</span>
                                    </div>
                                    <div className="bg-white/30 p-4 rounded-2xl border border-white/50 flex flex-col items-center justify-center text-center">
                                        <span className="text-[10px] font-black uppercase opacity-40 mb-1">Source</span>
                                        <span className="text-sm font-black text-secondary">YOUTUBE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Quality Selection */}
                    <div className="lg:col-span-7">
                        <div className="glass-panel rounded-[2.5rem] p-10 h-full shadow-2xl relative overflow-hidden">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-black text-secondary uppercase tracking-tight flex items-center gap-4">
                                    {activeTab === 'video' ? <Video className="w-8 h-8 text-primary" /> : <Music className="w-8 h-8 text-accent" />}
                                    Download Options
                                </h3>
                                <div className="px-4 py-1.5 bg-green-500/10 text-green-600 rounded-full font-black text-[10px] tracking-widest border border-green-500/20">
                                    VERIFIED
                                </div>
                            </div>

                            {downloading && (
                                <div className="mb-10 animate-fade-in">
                                    <div className="flex justify-between font-black text-[10px] uppercase tracking-[0.2em] text-primary mb-3 px-1">
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-3 h-3 animate-spin" /> 
                                            {progress === 100 ? 'DOWNLOAD READY' : 'BYPASSING API LIMITS...'}
                                        </span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden border border-white/40 shadow-inner">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'video' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { q: "720", label: "720P HD", sub: "Fastest Sync", class: "hover:border-blue-400" },
                                        { q: "1080", label: "1080P FHD", sub: "High Quality", class: "hover:border-purple-400" },
                                        { q: "1440", label: "2K QHD", sub: "Pro Grade", class: "hover:border-pink-400" },
                                        { q: "4k", label: "4K UHD", sub: "Max Detail", class: "hover:border-orange-400" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.q}
                                            disabled={downloading}
                                            onClick={() => triggerDirectDownload("mp4", opt.q)}
                                            className={`p-8 rounded-3xl bg-white/40 border border-white/60 flex flex-col items-center justify-center text-center transition-all hover:bg-white/60 hover:shadow-2xl hover:scale-105 active:scale-95 group ${opt.class}`}
                                        >
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl group-hover:bg-primary group-hover:text-white transition-colors duration-500 border border-black/5">
                                                <Download className="w-6 h-6" />
                                            </div>
                                            <span className="text-2xl font-black text-secondary uppercase tracking-tighter mb-1">{opt.label}</span>
                                            <span className="text-[10px] font-black text-secondary/40 uppercase tracking-widest">{opt.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {[
                                        { label: "MP3 128KBPS", sub: "Optimized Selection", icon: Music, gradient: "from-blue-500/10 to-blue-600/10" },
                                        { label: "MP3 320KBPS", sub: "Master Fidelity", icon: Sparkles, gradient: "from-purple-500/10 to-purple-600/10" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.label}
                                            disabled={downloading}
                                            onClick={() => triggerDirectDownload("mp3", opt.label.includes("320") ? "320" : undefined)}
                                            className={`w-full flex items-center justify-between p-8 rounded-3xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all hover:shadow-2xl hover:translate-x-2 active:scale-95 group`}
                                        >
                                            <div className="flex items-center gap-8">
                                                <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:bg-accent group-hover:text-white transition-colors duration-500 border border-black/5">
                                                    <opt.icon className="w-8 h-8" />
                                                </div>
                                                <div className="text-left">
                                                    <span className="block text-2xl font-black text-secondary uppercase tracking-tighter mb-1">{opt.label}</span>
                                                    <span className="text-xs font-black text-secondary/40 uppercase tracking-[0.2em]">{opt.sub}</span>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-secondary/10 flex items-center justify-center opacity-30 group-hover:opacity-100 group-hover:bg-white transition-all">
                                                <Download className="w-5 h-5 text-secondary" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="mt-12 flex items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md">
                                <div className="flex -space-x-2">
                                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-primary/40 overflow-hidden" />)}
                                </div>
                                <p className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.3em]">
                                    Trust Protocol • Zero Redirects • Secure Buffer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!videoInfo && !loading && (
                <div className="mt-12 group">
                    <div className="relative py-24 md:py-32 flex flex-col items-center justify-center glass-panel rounded-[4rem] border-dashed border-white/60 hover:bg-white/30 transition-all duration-700">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        <div className="relative z-10 text-center animate-pulse">
                            <div className="w-32 h-32 bg-white/40 backdrop-blur-2xl rounded-[3rem] flex items-center justify-center mb-8 border border-white/60 shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
                                <Download className="w-12 h-12 text-primary opacity-30" />
                            </div>
                            <p className="text-3xl font-black text-secondary/40 uppercase tracking-[0.4em] italic pr-4">Awaiting Link</p>
                            <div className="flex gap-4 justify-center mt-12">
                                {['SSL', '8K', 'V6', '256-BIT'].map(tag => (
                                    <div key={tag} className="px-6 py-2 bg-white/30 rounded-full text-[10px] font-black text-secondary/20 border border-white/40 shadow-sm">{tag}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-20">
                <SEOHead
                    title="YouTube Video Downloader - Download 4K & MP3 Videos Online"
                    description="The ultimate free YouTube downloader. Extract high-quality MP4/MP3 files directly from YouTube using our private Master Engine. No ads, no redirects, 100% direct."
                    canonicalUrl="/tools/youtube-video-downloader"
                />

                <SEOSection
                    title="Professional Grade YouTube Extraction Engine"
                    subtitle="Bypass Restricted APIs with Direct Local Processing"
                    description="WebInsight Pro's YouTube Downloader is powered by a private local extraction engine, ensuring maximum privacy and speed. Unlike other tools that redirect you to ad-filled pages, our system handles the conversion on your device and hands the file directly to your browser."
                    howToUse={[
                        "Paste any valid YouTube URL or Playlist link into the master input field",
                        "Click 'ANALYZE' to verify the stream and metadata with the local engine",
                        "Select your preferred extraction mode (Video or Audio)",
                        "Click the high-quality resolution button to initiate a direct browser download",
                        "Wait for the local sync to complete and save your file instantly"
                    ]}
                    features={[
                        "Direct Extraction: No 3rd-party API middleman or data tracking",
                        "Offline Privacy: Processing is handled via your local Master Engine",
                        "Full Quality: Supports 1080p, 2K, and 4K video exports where available",
                        "High Fidelity Audio: Extract crystal clear 320kbps MP3 audio streams",
                        "Zero Redirects: Pure direct-to-browser download experience"
                    ]}
                    faqs={[
                        {
                            question: "Is this tool safe to use?",
                            answer: "Yes. By using a local master engine, your IP address and data are not shared with 3rd-party download APIs. The conversion happens privately."
                        },
                        {
                            question: "Why do I need a Local Engine?",
                            answer: "External APIs often include redirects, ads, and speed limits. The Local Master Engine bypasses these restrictions for a professional experience."
                        }
                    ]}
                    relatedTools={[
                        { name: "Insta Downloader", emoji: "📸", path: "/tools/instagram-video-downloader" },
                        { name: "YouTube Stats", emoji: "📊", path: "/tools/youtube-stats" },
                        { name: "Keyword Planner", emoji: "🔑", path: "/tools/keyword-planner" },
                        { name: "Metadata Gen", emoji: "🏷️", path: "/tools/meta-tags" }
                    ]}
                />
            </div>
        </div>
    );
};

export default YouTubeVideoDownloader;
