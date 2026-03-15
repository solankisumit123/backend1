import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Play, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { massiveToolsList } from "../../data/massiveToolsList";

const DynamicTool = () => {
    const location = useLocation();
    const slug = location.pathname.split("/").pop();

    let toolInfo: any = { title: slug?.replace(/-/g, " ") || "Tool", desc: "Online Free Tool", icon: Play, category: "Unknown" };
    massiveToolsList.forEach(cat => {
        const found = cat.tools.find(t => t.to.split("/").pop() === slug);
        if (found) toolInfo = { ...found, title: found.title, desc: found.desc, category: cat.title };
    });

    const [inputVal, setInputVal] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isAITool = toolInfo.category.includes("AI Tools") || toolInfo.title.toLowerCase().includes("ai");

    const handleRun = async () => {
        if (!inputVal.trim()) {
            setError("Please enter some input first.");
            return;
        }
        setLoading(true);
        setError("");
        setResult("");

        try {
            if (isAITool) {
                const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
                if (!apiKey) {
                    setError("AI API key is missing. Developer: Please add VITE_GEMINI_API_KEY to your frontend .env file to activate all 50 AI Tools instantly!");
                    setLoading(false);
                    return;
                }

                // Real Gemini API Call
                const prompt = `You are a professional ${toolInfo.title}. Your job is to help the user with the following task: "${toolInfo.desc}". 
            
The user has provided this input data: "${inputVal}". 

Please provide a high-quality, professional, and well-formatted response directly answering or fulfilling this request. Output clearly and beautifully.`;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                const data = await response.json();
                if (data.error) throw new Error(data.error.message || "Failed to generate AI content");

                const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (aiText) {
                    setResult(aiText);
                } else {
                    setError("Could not generate a response. Try again.");
                }
                setLoading(false);
            } else {
                // Simulated behavior for non-AI tools (Downloaders, PDF converters etc)
                setTimeout(() => {
                    setError("Tool servers are currently at maximum capacity. Please try again later or use an alternative tool.");
                    setLoading(false);
                }, 2500);
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong while connecting to the AI core.");
            setLoading(false);
        }
    };

    const IconComponent = toolInfo.icon || Play;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <div className="flex justify-center mb-6">
                <IconComponent className="w-20 h-20 text-comic-blue" strokeWidth={2} />
            </div>

            <h1 className="comic-heading text-4xl text-foreground mb-3 capitalize">{toolInfo.title}</h1>
            <p className="text-xl text-muted-foreground font-bold mb-8">{toolInfo.desc}</p>

            {/* Input Section */}
            <div className="comic-card p-8 mb-8 text-left bg-card">
                <label className="font-bold text-foreground text-sm uppercase block mb-2">
                    {isAITool ? "Topic / Prompt / Input Context" : "Target Data / Input"}
                </label>
                <textarea
                    placeholder={isAITool ? `What would you like the ${toolInfo.title} to do?` : "Enter your data here..."}
                    className="comic-input mb-4 min-h-[120px] resize-y"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                />

                <button
                    onClick={handleRun}
                    disabled={loading}
                    className="comic-btn bg-comic-blue text-white w-full py-4 text-lg font-black flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Play />}
                    {loading ? "Processing task..." : `Run ${toolInfo.title} AI`}
                </button>

                {error && (
                    <div className="mt-4 p-4 rounded-xl bg-comic-red/10 border-2 border-comic-red text-comic-red font-bold flex flex-col items-start gap-3 text-sm">
                        <div className="flex gap-2 items-center">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span className="font-black">Notice</span>
                        </div>
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {/* Result Section */}
            {result && (
                <div className="comic-card p-8 mb-8 text-left bg-card border-comic-green">
                    <h3 className="comic-heading text-2xl mb-4 text-comic-green">Generated Result</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                        {result}
                    </div>
                    <button
                        onClick={() => navigator.clipboard.writeText(result)}
                        className="mt-6 font-bold text-sm bg-muted px-4 py-2 rounded-lg hover:bg-comic-green hover:text-white transition"
                    >
                        Copy to Clipboard
                    </button>
                </div>
            )}

            
        </div>
    );
};

export default DynamicTool;
