import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const FAQGenerator = () => {
    const [topic, setTopic] = useState("");
    const [count, setCount] = useState("10");
    const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
    const [copied, setCopied] = useState(false);

    const templates = [
        { q: `What is [TOPIC]?`, a: `[TOPIC] refers to the process or concept of [TOPIC]. It is widely used in various industries to improve efficiency and achieve better results. Understanding [TOPIC] is essential for anyone looking to advance in this field.` },
        { q: `How does [TOPIC] work?`, a: `[TOPIC] works by following a structured approach that involves planning, execution, and measurement. It typically starts with setting clear goals, followed by implementing strategies, and then analyzing outcomes to optimize performance.` },
        { q: `Why is [TOPIC] important?`, a: `[TOPIC] is important because it helps businesses and individuals achieve their goals more efficiently. It provides a systematic framework that reduces errors, saves time, and maximizes return on investment.` },
        { q: `What are the benefits of [TOPIC]?`, a: `The main benefits of [TOPIC] include improved efficiency, better results, cost savings, and competitive advantage. It also helps in building a strong foundation for long-term success.` },
        { q: `How to get started with [TOPIC]?`, a: `To get started with [TOPIC], begin by learning the fundamentals through free online resources. Then practice with small projects, gradually building your skills. Join communities and forums to learn from experienced practitioners.` },
        { q: `Is [TOPIC] free to use?`, a: `Many [TOPIC] tools and resources are available for free. However, some advanced features or professional-grade tools may require a paid subscription. We recommend starting with free options to understand the basics.` },
        { q: `What are the best tools for [TOPIC]?`, a: `The best tools for [TOPIC] depend on your specific needs. Popular options include free resources for beginners and advanced platforms for professionals. Our website offers several free [TOPIC] tools to help you get started.` },
        { q: `How long does it take to learn [TOPIC]?`, a: `The time to learn [TOPIC] varies based on your background and learning pace. Most people can grasp the fundamentals in 2-4 weeks with consistent practice. Mastery typically takes 3-6 months of applied learning.` },
        { q: `What are common mistakes in [TOPIC]?`, a: `Common mistakes in [TOPIC] include skipping foundational steps, not measuring results, inconsistent implementation, and ignoring feedback. Avoiding these pitfalls significantly improves success rates.` },
        { q: `Can beginners do [TOPIC]?`, a: `Absolutely! [TOPIC] is suitable for beginners. Most concepts can be learned without prior experience. Start with the basics, use beginner-friendly tools, and progressively advance your knowledge.` },
        { q: `What are [TOPIC] best practices?`, a: `Best practices for [TOPIC] include setting clear objectives, staying consistent, measuring performance regularly, learning from data, and continuously adapting strategies based on results.` },
        { q: `How much does [TOPIC] cost?`, a: `The cost of [TOPIC] varies widely. Free options are available for basic needs, while professional solutions can range from $20 to $500+ per month. The ROI typically justifies the investment for serious users.` },
    ];

    const generate = () => {
        if (!topic.trim()) return;
        const t = topic.trim();
        const cnt = Math.min(parseInt(count), templates.length);
        const generated = templates.slice(0, cnt).map(({ q, a }) => ({
            q: q.replace(/\[TOPIC\]/g, t),
            a: a.replace(/\[TOPIC\]/g, t)
        }));
        setFaqs(generated);
    };

    const copyAll = () => {
        const text = faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copySchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        };
        navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">❓</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">FAQ Generator</h1>
                <p className="text-muted-foreground font-bold">Generate FAQs for any topic with schema markup</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">📌 Topic / Service</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
                        placeholder="e.g. SEO, digital marketing, weight loss"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">🔢 Number of FAQs</label>
                    <div className="flex gap-2">
                        {["5", "8", "10", "12"].map(n => (
                            <button key={n} onClick={() => setCount(n)} className={`flex-1 py-2 rounded-xl font-bold text-sm ${count === n ? "bg-comic-blue text-white" : "bg-muted"}`}>{n}</button>
                        ))}
                    </div>
                </div>
                <button onClick={generate} className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-bold py-4 rounded-xl text-lg">
                    ❓ Generate FAQs
                </button>
            </div>

            {faqs.length > 0 && (
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <button onClick={copyAll} className={`flex-1 py-2 rounded-xl text-sm font-bold ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                            {copied ? "✅ Copied!" : "📋 Copy All FAQs"}
                        </button>
                        <button onClick={copySchema} className="flex-1 py-2 rounded-xl text-sm font-bold bg-muted hover:bg-comic-purple hover:text-white">
                            {"</>"} Copy FAQ Schema
                        </button>
                    </div>
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-card border-4 border-border rounded-2xl p-4">
                            <p className="font-black text-foreground mb-2">🔵 {faq.q}</p>
                            <p className="text-muted-foreground font-bold text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>
            )}

            <SEOHead title="FAQ Generator - Frequently Asked Questions Creator" description="Generate FAQs for any topic instantly. Get complete Q&A pairs with JSON-LD FAQ schema markup to improve your Google search snippets." keywords="faq generator, faq creator, frequently asked questions generator, faq schema generator, seo faq tool" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "FAQ Generator", "applicationCategory": "SEOApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="FAQ Generator Tool" subtitle="Create SEO-Optimized FAQs Instantly" description="FAQ sections boost SEO by targeting People Also Ask results and improving content depth. Our tool creates complete FAQ pairs and FAQ schema markup for immediate use." howToUse={["Enter your topic or service", "Choose how many FAQs to generate", "Click Generate FAQs", "Copy all FAQs for your content", "Or copy FAQ Schema for structured data"]} features={["Up to 12 FAQ Pairs", "Smart Answer Templates", "One-Click FAQ Schema Copy", "JSON-LD Schema Markup", "Instant Copy All Feature"]} faqs={[{ question: "What is FAQ Schema?", answer: "FAQ Schema is JSON-LD structured data that tells Google you have an FAQ section. When implemented, Google can show your FAQs directly in search results as rich snippets." }]} relatedTools={[{ name: "Schema Generator", emoji: "🔧", path: "/tools/schema" }, { name: "Blog Topic Generator", emoji: "💡", path: "/tools/blog-topic-generator" }]} />
        </div>
    );
};
export default FAQGenerator;
