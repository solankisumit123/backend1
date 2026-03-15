import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";

const fields = [
    { label: "Minute", range: "0-59", special: ["*", ",", "-", "/"] },
    { label: "Hour", range: "0-23", special: ["*", ",", "-", "/"] },
    { label: "Day (Month)", range: "1-31", special: ["*", ",", "-", "/", "?", "L", "W"] },
    { label: "Month", range: "1-12 or JAN-DEC", special: ["*", ",", "-", "/"] },
    { label: "Day (Week)", range: "0-6 or SUN-SAT", special: ["*", ",", "-", "/", "?", "L", "#"] },
];

const presets = [
    { label: "Every minute", cron: "* * * * *" },
    { label: "Every 5 minutes", cron: "*/5 * * * *" },
    { label: "Every 15 minutes", cron: "*/15 * * * *" },
    { label: "Every 30 minutes", cron: "*/30 * * * *" },
    { label: "Every hour", cron: "0 * * * *" },
    { label: "Every 6 hours", cron: "0 */6 * * *" },
    { label: "Every day at midnight", cron: "0 0 * * *" },
    { label: "Every day at 9 AM", cron: "0 9 * * *" },
    { label: "Every Monday at 9 AM", cron: "0 9 * * 1" },
    { label: "Every weekday at 9 AM", cron: "0 9 * * 1-5" },
    { label: "1st of every month", cron: "0 0 1 * *" },
    { label: "Every Sunday at 6 PM", cron: "0 18 * * 0" },
    { label: "Twice a day (9 AM & 9 PM)", cron: "0 9,21 * * *" },
    { label: "Every year (Jan 1st midnight)", cron: "0 0 1 1 *" },
];

const describeCron = (cron: string): string => {
    const parts = cron.split(" ");
    if (parts.length !== 5) return "Invalid cron expression";
    const [min, hour, dom, month, dow] = parts;

    if (cron === "* * * * *") return "Every minute";
    if (min.startsWith("*/") && hour === "*" && dom === "*" && month === "*" && dow === "*")
        return `Every ${min.slice(2)} minutes`;
    if (min === "0" && hour.startsWith("*/") && dom === "*")
        return `Every ${hour.slice(2)} hours`;
    if (min === "0" && /^\d+$/.test(hour) && dom === "*" && month === "*" && dow === "*")
        return `Every day at ${hour}:00`;
    if (min === "0" && /^\d+$/.test(hour) && dom === "*" && month === "*" && /^\d$/.test(dow)) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return `Every ${days[+dow] || dow} at ${hour}:00`;
    }
    if (min === "0" && /^\d+$/.test(hour) && dom === "*" && month === "*" && dow === "1-5")
        return `Every weekday (Mon-Fri) at ${hour}:00`;
    if (min === "0" && hour === "0" && /^\d+$/.test(dom) && month === "*" && dow === "*")
        return `On day ${dom} of every month at midnight`;
    return `At ${min} min, ${hour} hour, day ${dom}, month ${month}, weekday ${dow}`;
};

const CronJobGenerator = () => {
    const [cronParts, setCronParts] = useState(["0", "9", "*", "*", "*"]);
    const [copied, setCopied] = useState(false);

    const cron = cronParts.join(" ");
    const description = describeCron(cron);

    const updatePart = (idx: number, val: string) => {
        setCronParts(prev => prev.map((p, i) => i === idx ? val : p));
    };

    const loadPreset = (c: string) => setCronParts(c.split(" "));

    const copy = () => {
        navigator.clipboard.writeText(cron);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">⏰</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Cron Job Generator</h1>
                <p className="text-muted-foreground font-bold">Build cron expressions visually with live preview</p>
            </div>

            {/* Live Preview */}
            <div className="bg-card border-4 border-comic-blue rounded-2xl p-6 text-center mb-6 shadow-lg">
                <div className="font-mono text-4xl font-black text-comic-blue tracking-widest mb-2">{cron}</div>
                <p className="text-sm font-bold text-muted-foreground">📋 {description}</p>
                <button onClick={copy} className={`mt-3 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 mx-auto ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Cron</>}
                </button>
            </div>

            {/* Editor */}
            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="grid grid-cols-5 gap-2">
                    {fields.map((f, i) => (
                        <div key={i}>
                            <label className="block text-[10px] font-black text-muted-foreground mb-1 text-center">{f.label}</label>
                            <input type="text" value={cronParts[i]} onChange={e => updatePart(i, e.target.value)}
                                className="w-full border-2 border-border rounded-lg px-2 py-2 bg-background text-foreground font-mono font-bold text-center focus:outline-none focus:border-comic-blue" />
                            <div className="text-[8px] text-muted-foreground text-center mt-1">{f.range}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Presets */}
            <div className="bg-card border-4 border-border rounded-2xl p-5 mb-6">
                <h3 className="font-black text-foreground mb-3">⚡ Common Presets</h3>
                <div className="grid grid-cols-2 gap-2">
                    {presets.map((p, i) => (
                        <button key={i} onClick={() => loadPreset(p.cron)}
                            className={`px-3 py-2 rounded-xl border-2 text-left transition-colors ${cron === p.cron ? "bg-comic-blue text-white border-comic-blue" : "bg-background border-border hover:bg-muted"}`}>
                            <div className="text-xs font-black">{p.label}</div>
                            <div className="text-[10px] font-mono text-muted-foreground">{p.cron}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Reference */}
            <div className="bg-card border-4 border-border rounded-2xl p-5 mb-6">
                <h3 className="font-black text-foreground mb-3">📖 Quick Reference</h3>
                <div className="space-y-1 text-xs font-bold text-muted-foreground">
                    <div><code className="bg-muted px-1 rounded">*</code> — Any value</div>
                    <div><code className="bg-muted px-1 rounded">,</code> — List separator (1,3,5)</div>
                    <div><code className="bg-muted px-1 rounded">-</code> — Range (1-5)</div>
                    <div><code className="bg-muted px-1 rounded">/</code> — Step (*/5 = every 5)</div>
                </div>
            </div>

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Cron Job Generator — Visual Cron Expression Builder</h2>
                <p>Build <strong>cron expressions</strong> visually with our free cron job generator. Use presets or customize each field. Get a human-readable description of your schedule. Works with Linux cron, AWS CloudWatch, GitHub Actions, and more.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: cron job generator, cron expression builder, crontab generator, cron schedule maker, linux cron, cron syntax, cron expression online.</p>
            </div>
            <div className="mt-6"></div>
        </div>
    );
};
export default CronJobGenerator;
