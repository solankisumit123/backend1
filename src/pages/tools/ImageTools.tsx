import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, Image as ImageIcon, Download, Upload, Loader2, CheckCircle,
    Trash2, Plus, Scissors, RotateCw, Maximize, Minimize,
    FileImage
} from "lucide-react";
import { toast } from "sonner";
import AdBanner from "../../components/AdBanner";

/* ─── Types ─── */
type ActiveTool = "compress" | "resize" | "convert" | "crop" | "rotate" | null;

/* ─── Helper: download dataURL (resilient) ─── */
const downloadDataURL = (dataUrl: string, filename: string) => {
    try {
        const a = document.createElement("a");
        a.style.display = 'none';
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
        }, 2000);
        toast.success(`Success! Downloading ${filename}`);
    } catch (e) {
        toast.error("Download failed. Try again.");
    }
};

/* ════════════════════════════
   TOOL 1: Image Compressor
════════════════════════════ */
function ImageCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [quality, setQuality] = useState(0.6);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleCompress = () => {
        if (!file) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);
                const out = canvas.toDataURL("image/jpeg", quality);
                setPreview(out);
                setLoading(false);
                downloadDataURL(out, "compressed.jpg");
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload image"}</p>
                <input type="file" accept="image/*" hidden onChange={handleFile} />
            </label>

            {file && (
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold">Compression Quality: {Math.round(quality * 100)}%</label>
                        <input
                            type="range" min="0.1" max="1" step="0.1" value={quality}
                            onChange={e => setQuality(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <button onClick={handleCompress} disabled={loading} className="comic-btn bg-primary text-white w-full flex items-center gap-2 justify-center">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {loading ? "Compressing..." : "Compress & Download"}
                    </button>

                    {preview && (
                        <div className="pt-4 border-t-2 border-dashed border-border text-center">
                            <p className="text-xs font-bold text-comic-green mb-3">✅ Compression Complete!</p>
                            <img src={preview} className="max-h-40 mx-auto rounded-lg border-2 border-border mb-3" />
                            <button onClick={() => downloadDataURL(preview, "compressed.jpg")} className="comic-btn bg-comic-green text-white flex items-center gap-2 mx-auto">
                                <Download className="w-4 h-4" /> Download Again
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 2: Image Resizer
════════════════════════════ */
function ImageResizer() {
    const [file, setFile] = useState<File | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [aspectRatio, setAspectRatio] = useState(0);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setWidth(img.width);
                setHeight(img.height);
                setAspectRatio(img.width / img.height);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(f);
    };

    const handleResize = () => {
        if (!file) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, width, height);
                const out = canvas.toDataURL(file.type);
                setPreview(out);
                downloadDataURL(out, `resized-${width}x${height}.${file.name.split('.').pop()}`);
                setLoading(false);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload image"}</p>
                <input type="file" accept="image/*" hidden onChange={handleFile} />
            </label>

            {file && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase">Width (px)</label>
                            <input
                                type="number" value={width}
                                onChange={e => {
                                    const w = Number(e.target.value);
                                    setWidth(w);
                                    setHeight(Math.round(w / aspectRatio));
                                }}
                                className="comic-input w-full"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase">Height (px)</label>
                            <input
                                type="number" value={height}
                                onChange={e => {
                                    const h = Number(e.target.value);
                                    setHeight(h);
                                    setWidth(Math.round(h * aspectRatio));
                                }}
                                className="comic-input w-full"
                            />
                        </div>
                    </div>
                    <button onClick={handleResize} disabled={loading} className="comic-btn bg-primary text-white w-full flex items-center gap-2 justify-center shadow-lg">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {loading ? "Resizing..." : "Resize & Download"}
                    </button>
                    {preview && (
                        <div className="pt-4 border-t-2 border-dashed border-border text-center animate-slide-up">
                            <p className="text-xs font-bold text-comic-green mb-3">✅ Resize Ready!</p>
                            <button onClick={() => downloadDataURL(preview, "resized.png")} className="comic-btn bg-comic-green text-white flex items-center gap-2 mx-auto">
                                <Download className="w-4 h-4" /> Save Again
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 3: Image Cropper
════════════════════════════ */
function ImageCropper() {
    const [file, setFile] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
    const [loading, setLoading] = useState(false);
    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setImgRef(img);
                setCrop({ x: 0, y: 0, w: Math.min(img.width, 200), h: Math.min(img.height, 200) });
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(f);
    };

    const handleCrop = () => {
        if (!file || !imgRef) return;
        setLoading(true);
        const canvas = document.createElement("canvas");
        canvas.width = crop.w;
        canvas.height = crop.h;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(imgRef, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
        downloadDataURL(canvas.toDataURL(file.type), `cropped.${file.name.split('.').pop()}`);
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload image"}</p>
                <input type="file" accept="image/*" hidden onChange={handleFile} />
            </label>

            {file && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs font-bold uppercase">X Offset</label>
                            <input type="number" value={crop.x} onChange={e => setCrop({ ...crop, x: Number(e.target.value) })} className="comic-input w-full" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase">Y Offset</label>
                            <input type="number" value={crop.y} onChange={e => setCrop({ ...crop, y: Number(e.target.value) })} className="comic-input w-full" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase">Crop Width</label>
                            <input type="number" value={crop.w} onChange={e => setCrop({ ...crop, w: Number(e.target.value) })} className="comic-input w-full" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase">Crop Height</label>
                            <input type="number" value={crop.h} onChange={e => setCrop({ ...crop, h: Number(e.target.value) })} className="comic-input w-full" />
                        </div>
                    </div>
                    <button onClick={handleCrop} disabled={loading} className="comic-btn bg-primary text-white w-full">
                        {loading ? "Cropping..." : "Crop & Download"}
                    </button>
                    {imgRef && (
                        <div className="relative border-2 border-border rounded-lg overflow-hidden max-h-48 flex justify-center bg-black/5">
                            <img src={imgRef.src} className="max-h-full object-contain" />
                            <div
                                className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] pointer-events-none"
                                style={{
                                    left: `${(crop.x / imgRef.width) * 100}%`,
                                    top: `${(crop.y / imgRef.height) * 100}%`,
                                    width: `${(crop.w / imgRef.width) * 100}%`,
                                    height: `${(crop.h / imgRef.height) * 100}%`,
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 4: Format Converter
════════════════════════════ */
function FormatConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [targetType, setTargetType] = useState("image/png");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleConvert = () => {
        if (!file) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);
                const out = canvas.toDataURL(targetType);
                setPreview(out);
                const ext = targetType.split("/")[1];
                downloadDataURL(out, `converted.${ext}`);
                setLoading(false);
                toast.success(`Converted to ${ext.toUpperCase()}`);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload image"}</p>
                <input type="file" accept="image/*" hidden onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>

            {file && (
                <div className="space-y-4">
                    <div className="flex gap-2">
                        {["image/jpeg", "image/png", "image/webp"].map(type => (
                            <button
                                key={type}
                                onClick={() => setTargetType(type)}
                                className={`comic-btn flex-1 text-xs ${targetType === type ? "bg-primary text-white" : "bg-card"}`}
                            >
                                TO {type.split('/')[1].toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleConvert} disabled={loading} className="comic-btn bg-primary text-white w-full flex items-center justify-center gap-2 py-3 shadow-lg">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {loading ? "Converting..." : "Convert & Download"}
                    </button>
                    {preview && (
                        <div className="pt-4 border-t-2 border-dashed border-border text-center animate-slide-up">
                            <p className="text-xs font-bold text-comic-green mb-3">✅ Conversion Ready!</p>
                            <img src={preview} className="max-h-32 mx-auto rounded-lg border-2 border-border mb-3 shadow-sm" />
                            <button onClick={() => downloadDataURL(preview, `converted.${targetType.split('/')[1]}`)} className="comic-btn bg-comic-green text-white flex items-center gap-2 mx-auto">
                                <Download className="w-4 h-4" /> Save Again
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 4: Image Rotator
════════════════════════════ */
function ImageRotator() {
    const [file, setFile] = useState<File | null>(null);
    const [rotation, setRotation] = useState(0);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleRotate = () => {
        if (!file) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                if (rotation % 180 === 0) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                } else {
                    canvas.width = img.height;
                    canvas.height = img.width;
                }
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                const out = canvas.toDataURL(file.type);
                setPreview(out);
                downloadDataURL(out, `rotated-${rotation}.${file.type.split('/')[1]}`);
                setLoading(false);
                toast.success(`Rotated ${rotation}°`);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload image"}</p>
                <input type="file" accept="image/*" hidden onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>

            {file && (
                <div className="space-y-4">
                    <div className="flex gap-2">
                        {[90, 180, 270].map(deg => (
                            <button
                                key={deg}
                                onClick={() => setRotation(deg)}
                                className={`comic-btn flex-1 ${rotation === deg ? "bg-primary text-white" : "bg-card"}`}
                            >
                                {deg}°
                            </button>
                        ))}
                    </div>
                    <button onClick={handleRotate} disabled={loading} className="comic-btn bg-primary text-white w-full flex items-center justify-center gap-2 py-3 shadow-lg">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCw className="w-4 h-4" />}
                        {loading ? "Rotating..." : "Rotate & Download"}
                    </button>
                    {preview && (
                        <div className="pt-4 border-t-2 border-dashed border-border text-center animate-slide-up">
                            <p className="text-xs font-bold text-comic-green mb-3">✅ Rotation Ready!</p>
                            <img src={preview} className="max-h-32 mx-auto rounded-lg border-2 border-border mb-3" />
                            <button onClick={() => downloadDataURL(preview, "rotated.png")} className="comic-btn bg-comic-green text-white flex items-center gap-2 mx-auto">
                                <Download className="w-4 h-4" /> Save Again
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   MAIN PAGE
════════════════════════════ */
const tools = [
    { id: "compress" as ActiveTool, icon: Minimize, emoji: "📉", label: "Compress Image", desc: "Reduce image file size" },
    { id: "resize" as ActiveTool, icon: Maximize, emoji: "📏", label: "Resize Image", desc: "Change dimensions (px)" },
    { id: "convert" as ActiveTool, icon: ImageIcon, emoji: "🔄", label: "Convert Format", desc: "JPG, PNG, WebP converter" },
    { id: "crop" as ActiveTool, icon: Scissors, emoji: "✂️", label: "Crop Image", desc: "Crop specific area of image" },
    { id: "rotate" as ActiveTool, icon: RotateCw, emoji: "🔃", label: "Rotate Image", desc: "Rotate 90, 180, 270 degrees" },
];

const ImageTools = () => {
    const [active, setActive] = useState<ActiveTool>(null);
    const activeTool = tools.find(t => t.id === active);

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <div className="text-center mb-10">
                <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2">🖼️ Image Tools</h1>
                <p className="text-muted-foreground font-bold">Real working Image tools — fast, private, and 100% in-browser.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {tools.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActive(t.id)}
                        className={`comic-card flex flex-col items-center text-center p-4 hover:scale-105 transition-transform cursor-pointer ${active === t.id ? "border-primary bg-primary/5" : ""}`}
                    >
                        <span className="text-3xl mb-1">{t.emoji}</span>
                        <span className={`font-black text-sm ${active === t.id ? "text-primary" : "text-foreground"}`}>{t.label}</span>
                        <span className="text-xs text-muted-foreground mt-1 hidden sm:block">{t.desc}</span>
                    </button>
                ))}
            </div>

            {active && (
                <div className="comic-card animate-slide-up">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
                        <span className="text-2xl">{activeTool?.emoji}</span>
                        <div>
                            <h2 className="comic-heading text-xl text-foreground">{activeTool?.label}</h2>
                            <p className="text-sm text-muted-foreground font-bold">{activeTool?.desc}</p>
                        </div>
                    </div>

                    {active === "compress" && <ImageCompressor />}
                    {active === "resize" && <ImageResizer />}
                    {active === "convert" && <FormatConverter />}
                    {active === "crop" && <ImageCropper />}
                    {active === "rotate" && <ImageRotator />}
                </div>
            )}

            {!active && (
                <div className="text-center py-8 text-muted-foreground font-bold">
                    👆 Select a tool above to get started
</div>
            )}

      {/* ── AD BANNERS ── */}
      <AdBanner dataAdSlot="9274146632" dataAdFormat="auto" />
      <AdBanner dataAdSlot="9274146632" dataAdFormat="rectangle" />

        </div>
    );
};

export default ImageTools;
