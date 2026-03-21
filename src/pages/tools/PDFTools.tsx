import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import AdSense from "@/components/AdSense";
import {
    ArrowLeft, FileText, Merge, Scissors, Image as ImageIcon, Type,
    Download, Upload, Loader2, CheckCircle, Trash2, Plus,
    RotateCw, Scissors as Cut, FileCheck, FileOutput
} from "lucide-react";
import { toast } from "sonner";
import { PDFDocument, degrees, PageSizes } from "pdf-lib";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import ToolIcon from "@/components/ToolIcon";

/* ─── Types ─── */
type ActiveTool = "merge" | "split" | "img2pdf" | "pdf2text" | "pdf2jpg" | "rotate" | "watermark" | "page_numbers" | null;

/* ─── Helper: Success UI ─── */
function DownloadResult({ bytes, filename, label = "Download Processed PDF" }: { bytes: Uint8Array, filename: string, label?: string }) {
    const size = (bytes.length / 1024).toFixed(1);
    const finalName = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;

    return (
        <div className="pt-6 mt-4 border-t-2 border-dashed border-border text-center animate-slide-up">
            <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-comic-green/5 border-2 border-comic-green/20 mb-5 w-full">
                <div className="p-3 bg-comic-green text-white rounded-xl shadow-comic">
                    <FileCheck className="w-6 h-6" />
                </div>
                <div className="text-left min-w-0 flex-1">
                    <p className="font-black text-foreground text-sm truncate">{finalName}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{size} KB • PDF Document</p>
                </div>
            </div>
            <button
                onClick={() => downloadBlob(bytes, finalName)}
                className="comic-btn bg-comic-green text-white w-full flex items-center gap-3 justify-center py-4 text-lg hover:rotate-1 hover:scale-[1.01] transition-all shadow-lg active:scale-95"
            >
                <Download className="w-6 h-6 animate-bounce-subtle" />
                {label}
            </button>
            <p className="text-xs text-muted-foreground mt-4 font-bold opacity-60">
                Processed locally in your browser. <br />
                Didn't download? Pro Tip: Try clicking "Download" again!
            </p>
        </div>
    );
}

/* ─── Helper: read file as ArrayBuffer ─── */
const readAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as ArrayBuffer);
        reader.onerror = rej;
        reader.readAsArrayBuffer(file);
    });

/* ─── Helper: read file as DataURL ─── */
const readAsDataURL = (file: File): Promise<string> =>
    new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.onerror = rej;
        reader.readAsDataURL(file);
    });

const downloadBlob = (bytes: Uint8Array, filename: string) => {
    if (!bytes || bytes.length === 0) {
        toast.error("Download failed: No data found.");
        return;
    }
    try {
        // Create a definitive clean copy of the bytes to avoid buffer issues or corruption
        const cleanBytes = new Uint8Array(bytes);
        const blob = new Blob([cleanBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = 'none';
        a.href = url;

        // Ensure the file has a strictly lowercase .pdf extension
        const finalName = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;
        a.download = finalName;

        document.body.appendChild(a);
        a.click();

        // Safe cleanup
        setTimeout(() => {
            if (document.body.contains(a)) {
                document.body.removeChild(a);
            }
            URL.revokeObjectURL(url);
        }, 2000);

        toast.success(`Success! PDF Downloaded: ${finalName}`);
    } catch (e) {
        console.error("PDF Download Error:", e);
        toast.error("Low-level download error. Check browser settings.");
    }
};

/* ─── Helper: download text ─── */
const downloadText = (text: string, filename: string) => {
    try {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 2000);
        toast.success("Text extracted and download started.");
    } catch (e) {
        toast.error("Failed to download text.");
    }
};

/* ════════════════════════════
   TOOL 1: Merge PDFs
   ════════════════════════════ */
function MergePDF() {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
            setDone(false);
        }
    };

    const removeFile = (i: number) => {
        setFiles(f => f.filter((_, idx) => idx !== i));
        setDone(false);
    };

    const handleMerge = async () => {
        if (files.length < 2) return;
        setLoading(true);
        setDone(false);
        try {
            const merged = await PDFDocument.create();
            for (const file of files) {
                const bytes = await readAsArrayBuffer(file);
                const pdf = await PDFDocument.load(bytes);
                const pages = await merged.copyPages(pdf, pdf.getPageIndices());
                pages.forEach(p => merged.addPage(p));
            }
            const mergedBytes = await merged.save();
            setResult(mergedBytes);
            downloadBlob(mergedBytes, "merged.pdf");
            setDone(true);
        } catch (e) {
            alert("Error merging PDFs. Make sure all files are valid PDFs.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadAgain = () => {
        if (result) downloadBlob(result, "merged.pdf");
    };

    return (
        <div className="space-y-4">
            <div
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50"
            >
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">Click to add PDF files</p>
                <p className="text-sm text-muted-foreground">Add 2 or more PDFs to merge</p>
                <input ref={inputRef} type="file" accept=".pdf" multiple hidden onChange={addFiles} />
            </div>

            {files.length > 0 && (
                <div className="space-y-3">
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                        {files.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border-2 border-border">
                                <div className="flex items-center gap-2 min-w-0">
                                    <FileText className="w-5 h-5 text-comic-red shrink-0" />
                                    <span className="font-bold text-sm truncate">{f.name}</span>
                                    <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:inline">({(f.size / 1024).toFixed(0)} KB)</span>
                                </div>
                                <button onClick={() => removeFile(i)} className="text-destructive hover:text-destructive/70 p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="comic-btn bg-card text-foreground flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add More
                        </button>
                        <button
                            onClick={handleMerge}
                            disabled={loading || files.length < 2}
                            className="comic-btn bg-primary text-primary-foreground flex-1 flex items-center gap-2 justify-center"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Merge className="w-4 h-4" />}
                            {loading ? "Merging..." : `Merge ${files.length} PDFs`}
                        </button>
                    </div>

                    {done && result && (
                        <button
                            onClick={handleDownloadAgain}
                            className="comic-btn bg-comic-green text-white w-full flex items-center gap-2 justify-center animate-bounce-subtle"
                        >
                            <Download className="w-5 h-5" /> Download Merged PDF
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 2: Split PDF
════════════════════════════ */
function SplitPDF() {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [splitAt, setSplitAt] = useState(1);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [results, setResults] = useState<{ p1: Uint8Array, p2: Uint8Array | null } | null>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setDone(false);
        const bytes = await readAsArrayBuffer(f);
        const pdf = await PDFDocument.load(bytes);
        setPageCount(pdf.getPageCount());
        setSplitAt(Math.ceil(pdf.getPageCount() / 2));
    };

    const handleSplit = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const bytes = await readAsArrayBuffer(file);
            const src = await PDFDocument.load(bytes);
            const total = src.getPageCount();

            // Part 1
            const part1 = await PDFDocument.create();
            const pages1 = await part1.copyPages(src, Array.from({ length: splitAt }, (_, i) => i));
            pages1.forEach(p => part1.addPage(p));
            const b1 = await part1.save();
            downloadBlob(b1, "part1.pdf");

            // Part 2
            let b2: Uint8Array | null = null;
            if (splitAt < total) {
                const part2 = await PDFDocument.create();
                const pages2 = await part2.copyPages(src, Array.from({ length: total - splitAt }, (_, i) => i + splitAt));
                pages2.forEach(p => part2.addPage(p));
                b2 = await part2.save();
                downloadBlob(b2, "part2.pdf");
            }
            setResults({ p1: b1, p2: b2 });
            setDone(true);
        } catch {
            alert("Error splitting PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload PDF"}</p>
                <p className="text-sm text-muted-foreground">{pageCount > 0 ? `${pageCount} pages detected` : "Upload a PDF to split"}</p>
                <input type="file" accept=".pdf" hidden onChange={handleFile} />
            </label>

            {pageCount > 0 && (
                <div className="comic-card space-y-3">
                    <label className="text-sm font-bold text-muted-foreground">
                        Split after page: <span className="text-primary">{splitAt}</span> / {pageCount}
                    </label>
                    <input
                        type="range" min={1} max={pageCount - 1} value={splitAt}
                        onChange={e => setSplitAt(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs font-bold text-muted-foreground">
                        <span>Part 1: pages 1–{splitAt}</span>
                        <span>Part 2: pages {splitAt + 1}–{pageCount}</span>
                    </div>
                    <button
                        onClick={handleSplit}
                        disabled={loading}
                        className="comic-btn bg-primary text-primary-foreground w-full flex items-center gap-2 justify-center"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
                        {loading ? "Splitting..." : "Split PDF"}
                    </button>

                    {done && results && (
                        <div className="pt-4 space-y-4 border-t-2 border-dashed border-border animate-slide-up">
                            <p className="text-xs font-bold text-comic-green text-center">✅ Split Complete! Save your parts below.</p>
                            <div className="flex gap-2">
                                <button onClick={() => downloadBlob(results.p1, "part1.pdf")} className="comic-btn bg-comic-green text-white flex-1 flex items-center gap-2 justify-center py-3 text-sm">
                                    <Download className="w-4 h-4" /> Save Part 1
                                </button>
                                {results.p2 && (
                                    <button onClick={() => downloadBlob(results.p2, "part2.pdf")} className="comic-btn bg-comic-green text-white flex-1 flex items-center gap-2 justify-center py-3 text-sm">
                                        <Download className="w-4 h-4" /> Save Part 2
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 3: Images → PDF
════════════════════════════ */
function ImagesToPDF() {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);
    const [size, setSize] = useState<"native" | "a4">("a4");
    const inputRef = useRef<HTMLInputElement>(null);

    const addImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files);
        const newPreviews = await Promise.all(newFiles.map(readAsDataURL));
        setImages(prev => [...prev, ...newFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
        setDone(false);
    };

    const removeImage = (i: number) => {
        setImages(f => f.filter((_, idx) => idx !== i));
        setPreviews(p => p.filter((_, idx) => idx !== i));
        setDone(false);
    };

    const handleConvert = async () => {
        if (images.length === 0) return;
        setLoading(true);
        try {
            const pdf = await PDFDocument.create();
            for (let i = 0; i < images.length; i++) {
                const bytes = await readAsArrayBuffer(images[i]);
                const isJpg = images[i].type === "image/jpeg";
                const img = isJpg ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);

                let width = img.width;
                let height = img.height;

                if (size === "a4") {
                    width = PageSizes.A4[0];
                    height = PageSizes.A4[1];
                }

                const page = pdf.addPage([width, height]);
                const scale = Math.min(width / img.width, height / img.height);
                const x = (width - img.width * scale) / 2;
                const y = (height - img.height * scale) / 2;

                page.drawImage(img, {
                    x, y,
                    width: img.width * scale,
                    height: img.height * scale
                });
            }
            const b = await pdf.save();
            setResult(b);
            setDone(true);
            downloadBlob(b, "images_compilation.pdf");
        } catch (err) {
            console.error(err);
            toast.error("Error creating PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block group"
            >
                <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-foreground">Click to add JPG / PNG images</p>
                <p className="text-sm text-muted-foreground">Standardized A4 or Native formatting</p>
                <input ref={inputRef} type="file" accept="image/jpeg,image/png" multiple hidden onChange={addImages} />
            </div>

            {previews.length > 0 && (
                <>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1 border-2 border-border rounded-lg bg-card/50">
                        {previews.map((src, i) => (
                            <div key={i} className="relative group aspect-square">
                                <img src={src} className="w-full h-full object-cover rounded-lg border-2 border-border shadow-sm" />
                                <button onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1 shadow-sm hover:scale-110 transition-transform">
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {!done ? (
                        <div className="space-y-3 pt-2">
                            <div className="flex gap-2">
                                <button onClick={() => setSize("a4")} className={`comic-btn flex-1 text-[10px] ${size === "a4" ? "bg-primary text-white" : "bg-card"}`}>A4 Paper</button>
                                <button onClick={() => setSize("native")} className={`comic-btn flex-1 text-[10px] ${size === "native" ? "bg-primary text-white" : "bg-card"}`}>Original size</button>
                            </div>
                            <button
                                onClick={handleConvert}
                                disabled={loading}
                                className="comic-btn bg-primary text-white w-full flex items-center gap-2 justify-center py-3 shadow-lg"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                {loading ? "Creating PDF..." : `Convert ${images.length} Images`}
                            </button>
                        </div>
                    ) : result && (
                        <DownloadResult bytes={result} filename="image_compilation.pdf" label="Download PDF Compilation" />
                    )}
                </>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 5: PDF → JPG
   Using PDF.js to render pages to canvas
════════════════════════════ */
function PDFToJPG() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const [done, setDone] = useState(false);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreviews([]);
        setDone(false);
    };

    const handleConvert = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const pdfjsLib = await import("pdfjs-dist");
            // Use the version exactly from the package
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const bytes = await readAsArrayBuffer(file);
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            const images: string[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                // Lower scale a bit for better performance on large PDFs
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                if (!context) throw new Error("Could not create canvas context");

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                    canvas: canvas
                };

                await page.render(renderContext).promise;
                const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
                images.push(dataUrl);
            }
            setPreviews(images);
            setDone(true);
            toast.success(`Success! Converted ${pdf.numPages} pages.`);
        } catch (err) {
            console.error("PDF to JPG Error:", err);
            toast.error("Process failed. Try a smaller PDF or check if file is valid.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div
                onClick={() => document.getElementById("pdf2jpg-input")?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block group"
            >
                <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload PDF"}</p>
                <p className="text-sm text-muted-foreground">Extract each page as a JPG image</p>
                <input id="pdf2jpg-input" type="file" accept=".pdf" hidden onChange={handleFile} />
            </div>

            {file && (
                <button
                    onClick={handleConvert}
                    disabled={loading}
                    className="comic-btn bg-primary text-primary-foreground w-full flex items-center gap-2 justify-center"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {loading ? "Processing..." : "Generate JPG Gallery"}
                </button>
            )}

            {previews.length > 0 && (
                <div className="space-y-4 pt-4 border-t-2 border-border border-dashed">
                    <p className="text-xs font-bold text-center text-comic-green">✅ Previews Ready! Click a page thumbnail to download.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {previews.map((src, i) => (
                            <div key={i} className="relative group comic-card p-1 bg-card">
                                <img src={src} className="w-full h-32 object-cover rounded-lg border-2 border-border mb-2" />
                                <button
                                    onClick={() => {
                                        const a = document.createElement("a");
                                        a.href = src;
                                        a.download = `page-${i + 1}.jpg`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        toast.success(`Downloading page ${i + 1}`);
                                    }}
                                    className="comic-btn text-[10px] py-1 w-full bg-background hover:bg-primary hover:text-white transition-all shadow-sm"
                                >
                                    Download P{i + 1}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════
   TOOL 6: Rotate PDF
════════════════════════════ */
function RotatePDF() {
    const [file, setFile] = useState<File | null>(null);
    const [rotation, setRotation] = useState(90);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleRotate = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const bytes = await readAsArrayBuffer(file);
            const pdf = await PDFDocument.load(bytes);
            const pages = pdf.getPages();
            pages.forEach(p => {
                const current = p.getRotation().angle;
                p.setRotation(degrees((current + rotation) % 360));
            });
            const out = await pdf.save();
            setResult(out);
            downloadBlob(out, "rotated.pdf");
            setDone(true);
        } catch {
            alert("Error rotating PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload PDF"}</p>
                <input type="file" accept=".pdf" hidden onChange={handleFile} />
            </label>

            {file && (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        {[90, 180, 270].map(deg => (
                            <button
                                key={deg}
                                onClick={() => { setRotation(deg); setDone(false); }}
                                className={`comic-btn flex-1 ${rotation === deg ? "bg-primary text-white" : "bg-card"}`}
                            >
                                {deg}°
                            </button>
                        ))}
                    </div>
                    {!done ? (
                        <button
                            onClick={handleRotate}
                            disabled={loading}
                            className="comic-btn bg-primary text-primary-foreground w-full shadow-lg"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Rotate & Download"}
                        </button>
                    ) : result && (
                        <DownloadResult bytes={result} filename="rotated.pdf" label="Download Rotated PDF" />
                    )}
                </div>
            )}
        </div>
    );
}


/* ════════════════════════════
   TOOL 8: Page Numbers & Watermark
════════════════════════════ */
function StampPDF({ mode }: { mode: "numbers" | "watermark" }) {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);

    const handleStamp = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const bytes = await readAsArrayBuffer(file);
            const pdf = await PDFDocument.load(bytes);
            const pages = pdf.getPages();

            pages.forEach((p, i) => {
                const { width, height } = p.getSize();
                if (mode === "numbers") {
                    p.drawText(`Page ${i + 1} of ${pages.length}`, {
                        x: width / 2 - 40,
                        y: 20,
                        size: 10,
                        opacity: 0.5
                    });
                } else {
                    p.drawText(text || "WATERMARK", {
                        x: 50,
                        y: height / 2,
                        size: 50,
                        rotate: degrees(45),
                        opacity: 0.2
                    });
                }
            });

            const out = await pdf.save();
            setResult(out);
            downloadBlob(out, mode === "numbers" ? "numbered.pdf" : "watermarked.pdf");
            setDone(true);
        } catch {
            alert("Error stamping PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{file ? file.name : "Click to upload PDF"}</p>
                <input type="file" accept=".pdf" hidden onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>

            {file && (
                <div className="space-y-3">
                    {mode === "watermark" && (
                        <input
                            type="text"
                            placeholder="Watermark Text"
                            className="comic-input w-full"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    )}
                    {!done && (
                        <button
                            onClick={handleStamp}
                            disabled={loading}
                            className="comic-btn bg-primary text-primary-foreground w-full shadow-lg"
                        >
                            {loading ? "Processing..." : mode === "numbers" ? "Add Page Numbers" : "Apply Watermark"}
                        </button>
                    )}

                    {done && result && (
                        <DownloadResult
                            bytes={result}
                            filename={mode === "numbers" ? "numbered.pdf" : "watermarked.pdf"}
                            label="Download Modified PDF"
                        />
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
    { id: "merge" as ActiveTool, icon: Merge, emoji: "🔗", label: "Merge PDFs", desc: "Combine multiple PDFs into one", color: "bg-comic-blue" },
    { id: "split" as ActiveTool, icon: Scissors, emoji: "✂️", label: "Split PDF", desc: "Split one PDF into two files", color: "bg-comic-red" },
    { id: "img2pdf" as ActiveTool, icon: ImageIcon, emoji: "🖼️", label: "Images → PDF", desc: "Convert JPG/PNG to PDF", color: "bg-comic-green" },
    { id: "pdf2text" as ActiveTool, icon: Type, emoji: "📝", label: "PDF → Text", desc: "Extract text from PDF", color: "bg-comic-purple" },
    { id: "pdf2jpg" as ActiveTool, icon: ImageIcon, emoji: "🎨", label: "PDF → JPG", desc: "Convert PDF pages to JPG images", color: "bg-comic-yellow" },
    { id: "rotate" as ActiveTool, icon: RotateCw, emoji: "🔄", label: "Rotate PDF", desc: "Rotate pages clockwise", color: "bg-comic-orange" },
    { id: "watermark" as ActiveTool, icon: Type, emoji: "🏷️", label: "Watermark", desc: "Add text watermark to pages", color: "bg-comic-red" },
    { id: "page_numbers" as ActiveTool, icon: FileText, emoji: "🔢", label: "Page Numbers", desc: "Add numbers to all pages", color: "bg-comic-purple" },
];

/* ════════════════════════════
   TOOL 9: PDF → Text
════════════════════════════ */
function PDFToText() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [filename, setFilename] = useState("");
    const [copied, setCopied] = useState(false);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFilename(f.name);
        setLoading(true);
        setText("");
        try {
            const pdfjsLib = await import("pdfjs-dist");
            // Set worker source compatible with v5
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const bytes = await readAsArrayBuffer(f);
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items
                    .map((item: unknown) => ("str" in (item as object) ? (item as { str: string }).str : ""))
                    .join(" ");
                fullText += `--- Page ${i} ---\n${pageText}\n\n`;
            }

            setText(fullText || "No text found in this PDF (may be image-based/scanned).");
            if (fullText) {
                downloadText(fullText, `${f.name.replace(".pdf", "")}_extracted.txt`);
            }
        } catch {
            setText("Error reading PDF. Make sure it's a valid PDF file.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        downloadText(text, `${filename.replace(".pdf", "")}_extracted.txt`);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-background/50 block">
                <Type className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold text-foreground">{filename || "Click to upload PDF"}</p>
                <p className="text-sm text-muted-foreground">Extracts all text from PDF pages</p>
                <input type="file" accept=".pdf" hidden onChange={handleFile} />
            </label>

            {loading && (
                <div className="text-center py-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="font-bold text-muted-foreground">Extracting text...</p>
                </div>
            )}

            {text && (
                <div className="space-y-3">
                    <textarea
                        value={text}
                        readOnly
                        rows={10}
                        className="w-full comic-input font-mono text-sm resize-y"
                    />
                    <div className="flex gap-3">
                        <button onClick={handleCopy} className="comic-btn bg-card text-foreground flex items-center gap-2 flex-1 justify-center">
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Type className="w-4 h-4" />}
                            {copied ? "Copied!" : "Copy Text"}
                        </button>
                        <button onClick={handleDownload} className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 flex-1 justify-center">
                            <Download className="w-4 h-4" /> Download .txt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const PDFTools = () => {
    const [active, setActive] = useState<ActiveTool>(null);

    const activeTool = tools.find(t => t.id === active);

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <div className="text-center mb-10">
                <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-2">📄 PDF Tools</h1>
                <p className="text-muted-foreground font-bold">Real working PDF tools — runs 100% in your browser. No upload to server.</p>
            </div>

            {/* Tool Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {tools.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActive(t.id)}
                        className={`comic-card flex flex-col items-center text-center p-4 hover:scale-105 transition-transform cursor-pointer group ${active === t.id ? "border-primary bg-primary/5" : ""}`}
                    >
                        <ToolIcon icon={t.icon} color={t.color} size="sm" className="mb-3 transform group-hover:scale-110 transition-transform" />
                        <span className={`font-black text-sm ${active === t.id ? "text-primary" : "text-foreground"}`}>{t.label}</span>
                        <span className="text-[10px] text-muted-foreground mt-1 hidden sm:block opacity-70">{t.desc}</span>
                    </button>
                ))}
            </div>

            {/* Active Tool Panel */}
            {active && (
                <div className="comic-card animate-slide-up border-2 border-primary/20 shadow-xl">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-border">
                        <ToolIcon icon={activeTool!.icon} color={activeTool!.color} size="sm" />
                        <div>
                            <h2 className="comic-heading text-xl text-foreground">{activeTool?.label}</h2>
                            <p className="text-sm text-muted-foreground font-bold opacity-60">{activeTool?.desc}</p>
                        </div>
                    </div>

                    {active === "merge" && <MergePDF />}
                    {active === "split" && <SplitPDF />}
                    {active === "img2pdf" && <ImagesToPDF />}
                    {active === "pdf2text" && <PDFToText />}
                    {active === "pdf2jpg" && <PDFToJPG />}
                    {active === "rotate" && <RotatePDF />}
                    {active === "watermark" && <StampPDF mode="watermark" />}
                    {active === "page_numbers" && <StampPDF mode="numbers" />}
                </div>
            )}

            {!active && (
                <div className="text-center py-8 text-muted-foreground font-bold">
                    👆 Select a tool above to get started
                </div>
            )}

            {/* Privacy note */}
            <div className="mt-8 text-center text-xs text-muted-foreground font-bold border-2 border-dashed border-border rounded-xl py-3 px-4">
                🔒 100% Private — All PDF processing happens in your browser. Files are never uploaded to any server.
            </div>

            <AdSense adSlot="auto" />

            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Merge & Split PDF Online Free"
                description="Fast, free, and secure online PDF tools. Merge multiple PDF files, split documents, convert images to PDF, rotate pages, and extract text without any software installation."
                keywords="merge pdf, split pdf, online pdf tools, image to pdf, pdf to text, rotate pdf, watermark pdf, free pdf services"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro PDF Suite",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "MultimediaApplication",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": "1250"
                    }
                }}
            />

            <SEOSection
                title="Professional Online PDF Management Suite"
                subtitle="High-Speed, Browser-Based PDF Tools for Developers and Students"
                description="WebInsight Pro provides a secure, locally-processed PDF toolkit. Unlike other platforms, your files are never uploaded to a server — all merging, splitting, and conversions happen directly in your browser, ensuring 100% privacy and lightning-fast results."
                howToUse={[
                    "Select your desired tool from the menu (Merge, Split, Convert, etc.)",
                    "Upload your PDF or Image files using the drag-and-drop area",
                    "Configure settings if needed (rotation, watermark text, or split range)",
                    "Click the Action button (e.g., 'Merge PDFs')",
                    "Save your processed file instantly using the Download button"
                ]}
                features={[
                    "100% Secure & Private: Files stay in your browser",
                    "High-Speed Processing: No server-side waiting time",
                    "Cross-Platform: Works on mobile, tablet, and desktop",
                    "No File Limits: Process multiple documents for free",
                    "User-Friendly Interface: Simple one-click operations"
                ]}
                faqs={[
                    {
                        question: "Are my PDF files safe on WebInsight Pro?",
                        answer: "Yes! We use client-side processing, meaning your files are handled locally by your browser. They are NEVER uploaded to our servers, making it safer than almost any other online PDF tool."
                    },
                    {
                        question: "Is there a limit on file size for merging?",
                        answer: "Since processing happens on your device, the limit depends on your system's memory (RAM). Most standard documents work perfectly regardless of size."
                    },
                    {
                        question: "Can I convert protected PDFs?",
                        answer: "Our tool works with standard PDF files. If a PDF is encrypted with a password, you will need to unlock it first before merging or splitting."
                    }
                ]}
                relatedTools={[
                    { name: "SEO Audit", emoji: "🔍", path: "/tools/seo-audit" },
                    { name: "Fancy Text", emoji: "✨", path: "/tools/fancy-text" },
                    { name: "Ad Revenue", emoji: "💰", path: "/tools/ad-revenue" },
                    { name: "QR Generator", emoji: "📱", path: "/tools/qr-generator" }
                ]}
            />
        </div>
    );
};

export default PDFTools;
