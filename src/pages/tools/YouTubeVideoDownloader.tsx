import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Loader2, Play, Youtube, AlertCircle, Search, List, Settings2, Globe, Music, Video, CheckCircle2, Monitor } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

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
                        <div className="w-16 h-16 bg-comic-red rounded-2xl flex items-center justify-center border-4 border-black shadow-comic transform -rotate-3 group-hover:rotate-0 transition-transform">
                            <Youtube className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="comic-heading text-4xl text-foreground -mb-1 tracking-tight">VIDEO MASTER</h1>
                                <div className={`px-2 py-0.5 rounded-full border-2 border-black text-[8px] font-black uppercase flex items-center gap-1 ${engineStatus === 'online' ? 'bg-comic-green text-white' : engineStatus === 'connecting' ? 'bg-comic-yellow' : 'bg-comic-red text-white'}`}>
                                    <Globe className={`w-2 h-2 ${engineStatus === 'connecting' ? 'animate-spin' : ''}`} />
                                    {engineStatus}
                                </div>
                            </div>
                            <p className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.3em]">Direct Local Extraction</p>
                        </div>
                    </div>

                    <div className="flex bg-muted p-1.5 rounded-2xl border-4 border-black shadow-comic-sm">
                        <button
                            onClick={() => setActiveTab("video")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs transition-all ${activeTab === 'video' ? 'bg-comic-red text-white' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Video className="w-4 h-4" /> VIDEO
                        </button>
                        <button
                            onClick={() => setActiveTab("audio")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs transition-all ${activeTab === 'audio' ? 'bg-comic-green text-white' : 'text-muted-foreground hover:text-foreground'}`}
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
                            placeholder="PASTE SOURCE URL (YOUTUBE/PLAYLIST)..."
                            className="w-full bg-background border-4 border-black rounded-2xl px-6 py-5 text-lg font-black placeholder:text-muted-foreground/30 focus:outline-none focus:border-comic-blue transition-all"
                        />
                        {loading && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                <Loader2 className="w-6 h-6 animate-spin text-comic-blue" />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="comic-btn bg-comic-blue text-white px-12 py-5 text-xl font-black shadow-comic hover:translate-y-[-2px] active:translate-y-[2px]"
                    >
                        ANALYZE
                    </button>
                </form>

                {error && (
                    <div className="mt-4 bg-destructive/10 text-destructive text-sm font-black p-4 rounded-xl border-4 border-destructive/20 flex items-center gap-2 animate-shake">
                        <AlertCircle className="w-5 h-5" /> {error}
                    </div>
                )}
            </div>

            {videoInfo && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slide-up">
                    <div className="lg:col-span-12">
                        {downloading && (
                            <div className="mb-8 space-y-3">
                                <div className="flex justify-between font-black text-xs uppercase italic tracking-widest text-comic-blue px-2">
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin" /> Stream Initializing...
                                    </span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-4 w-full bg-muted border-4 border-black rounded-full overflow-hidden shadow-comic-sm">
                                    <div
                                        className="h-full bg-comic-blue transition-all duration-300 ease-out border-r-4 border-black"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Left Panel: Preview */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="comic-card p-0 overflow-hidden border-4 border-black shadow-comic h-fit">
                            <div className="relative aspect-video">
                                <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-comic-red rounded-full animate-pulse" />
                                        <p className="text-white font-black text-xs uppercase tracking-[0.2em]">{videoInfo.author}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-card border-t-4 border-black">
                                <h2 className="font-black text-3xl text-foreground leading-[1.1] mb-4 uppercase italic tracking-tighter">
                                    {videoInfo.title}
                                </h2>
                                <div className="flex gap-4">
                                    <div className="flex-1 bg-muted p-4 rounded-2xl border-2 border-black">
                                        <p className="text-[10px] font-black opacity-50 uppercase mb-1">Type</p>
                                        <p className="text-sm font-black uppercase text-comic-blue">{videoInfo.duration}</p>
                                    </div>
                                    <div className="flex-1 bg-muted p-4 rounded-2xl border-2 border-black">
                                        <p className="text-[10px] font-black opacity-50 uppercase mb-1">Status</p>
                                        <p className="text-sm font-black uppercase text-comic-green">MASTER READY</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-comic-yellow/5 border-4 border-comic-yellow/30 border-dashed rounded-[2rem] p-6">
                            <h4 className="font-black text-xs mb-3 flex items-center gap-2 text-comic-yellow-dark tracking-widest">
                                <Settings2 className="w-4 h-4" /> MASTER SYNC LOG
                            </h4>
                            <p className="text-[10px] font-bold text-muted-foreground leading-relaxed uppercase">
                                Direct stream bypass enabled. Utilizing high-bandwidth cloud buffer for {activeTab === 'video' ? 'visual' : 'acoustic'} extraction. No redirection active.
                            </p>
                        </div>
                    </div>

                    {/* Right Panel: Controls */}
                    <div className="lg:col-span-7">
                        <div className="bg-card border-4 border-black rounded-[2rem] p-8 shadow-comic-lg h-full">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                                <h3 className="comic-heading text-2xl text-foreground uppercase tracking-tight flex items-center gap-3">
                                    {activeTab === 'video' ? <Video className="w-8 h-8" /> : <Music className="w-8 h-8" />}
                                    Select Quality
                                </h3>
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-comic-green/10 text-comic-green border-2 border-black rounded-full font-black text-[10px] shadow-comic-sm">
                                    <CheckCircle2 className="w-4 h-4" /> DIRECT DOWNLOAD
                                </div>
                            </div>

                            {activeTab === 'video' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { q: "720", label: "720P HD", sub: "Standard Sharpness", color: "bg-comic-blue" },
                                        { q: "1080", label: "1080P FHD", sub: "Crystal Clear", color: "bg-comic-purple" },
                                        { q: "1440", label: "2K QHD", sub: "Pro Extraction", color: "bg-comic-orange" },
                                        { q: "4k", label: "4K UHD", sub: "Maximum Fidelity", color: "bg-comic-red" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.q}
                                            disabled={downloading}
                                            onClick={() => triggerDirectDownload("mp4", opt.q)}
                                            className="group relative flex flex-col items-center justify-center p-6 border-4 border-black rounded-2xl bg-background hover:bg-muted transition-all hover:translate-y-[-4px] active:translate-y-[2px] shadow-comic-sm"
                                        >
                                            <div className={`w-12 h-12 ${opt.color} text-white rounded-xl mb-3 flex items-center justify-center border-2 border-black shadow-comic-sm group-hover:rotate-6 transition-transform`}>
                                                <Download className="w-6 h-6" />
                                            </div>
                                            <span className="font-black text-xl tracking-tighter uppercase italic">{opt.label}</span>
                                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{opt.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { q: "mp3", label: "MP3 128KBPS", sub: "Standard Buffer", icon: Music, color: "bg-comic-blue" },
                                        { q: "320", label: "MP3 320KBPS", sub: "Studio Master", icon: Globe, color: "bg-comic-green" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.label}
                                            disabled={downloading}
                                            onClick={() => triggerDirectDownload("mp3", opt.q === "320" ? "320" : undefined)}
                                            className="group flex items-center justify-between p-8 border-4 border-black rounded-2xl bg-background hover:bg-muted transition-all hover:translate-y-[-4px] active:translate-y-[2px] shadow-comic-sm"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 ${opt.color} text-white rounded-full flex items-center justify-center border-4 border-black shadow-comic-sm group-hover:scale-110 transition-transform`}>
                                                    <opt.icon className="w-7 h-7" />
                                                </div>
                                                <div className="text-left">
                                                    <span className="block font-black text-2xl tracking-tighter uppercase italic">{opt.label}</span>
                                                    <span className="text-xs font-bold opacity-60 uppercase">{opt.sub}</span>
                                                </div>
                                            </div>
                                            <Download className="w-8 h-8 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t-4 border-black border-dotted text-center">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] animate-pulse">
                                    Encrypted Stream • Zero Redirects • Master Process Active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!videoInfo && !loading && (
                <div className="mt-12 text-center py-32 bg-card/50 border-8 border-dashed border-black/10 rounded-[4rem] animate-pulse">
                    <Download className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-20" />
                    <p className="text-3xl font-black text-muted-foreground uppercase tracking-[0.2em] italic pr-4">Awaiting Signal...</p>
                    <div className="flex gap-4 justify-center mt-8">
                        {['CORE', 'SYNC', 'AES-256', '8K'].map(tag => (
                            <div key={tag} className="px-5 py-2 bg-muted border-4 border-black rounded-xl text-xs font-black opacity-40 shadow-comic-sm">{tag}</div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-12">
                <div className="flex justify-center mb-8">
                    <AdBanner width={728} height={90} bannerId="28752282" />
                </div>

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
