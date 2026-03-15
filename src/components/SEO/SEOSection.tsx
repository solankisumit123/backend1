import { Link } from "react-router-dom";
import { ChevronDown, CheckCircle2, HelpCircle, Link as LinkIcon } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
    question: string;
    answer: string;
}

interface SEOSectionProps {
    title: string;
    subtitle: string;
    description: string;
    howToUse: string[];
    features: string[];
    faqs: FAQItem[];
    relatedTools: { name: string; path: string; emoji: string }[];
}

const SEOSection = ({
    title,
    subtitle,
    description,
    howToUse,
    features,
    faqs,
    relatedTools
}: SEOSectionProps) => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-24 space-y-16 pb-16 px-4">
            
            {/* Main Content Section */}
            <div className="comic-card bg-card p-8 border-4 border-border">
                <h2 className="text-3xl font-black mb-4 text-foreground">{title}</h2>
                <h3 className="text-xl font-bold mb-4 text-primary">{subtitle}</h3>
                <p className="text-muted-foreground font-bold leading-relaxed mb-8">
                    {description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* How to Use */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="text-comic-green w-6 h-6" />
                            <h4 className="text-xl font-black">How to Use</h4>
                        </div>
                        <ul className="space-y-3">
                            {howToUse.map((step, i) => (
                                <li key={i} className="flex gap-3 text-sm font-bold text-muted-foreground bg-background/50 p-3 rounded-xl border-2 border-border/30">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                                        {i + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <LinkIcon className="text-comic-blue w-6 h-6" />
                            <h4 className="text-xl font-black">Key Features</h4>
                        </div>
                        <ul className="space-y-3">
                            {features.map((feature, i) => (
                                <li key={i} className="flex gap-3 text-sm font-bold text-muted-foreground bg-background/50 p-3 rounded-xl border-2 border-border/30 italic">
                                    <span className="text-comic-red">⚡</span> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            

            {/* FAQ Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <HelpCircle className="w-8 h-8 text-comic-purple" />
                    <h2 className="comic-heading text-3xl">Frequently Asked Questions</h2>
                </div>
                <div className="bg-card border-4 border-border rounded-2xl overflow-hidden shadow-comic">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border-b-2 border-border px-4 last:border-0">
                                <AccordionTrigger className="hover:no-underline py-4 text-left font-black text-lg text-foreground hover:text-primary transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground font-bold text-base pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            

            {/* Related Tools Section */}
            <div className="space-y-8 pt-8">
                <h2 className="comic-heading text-3xl text-center">🔄 Related Professional Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedTools.map((tool, i) => (
                        <Link
                            key={i}
                            to={tool.path}
                            className="comic-card flex flex-col items-center p-4 hover:scale-105 transition-all text-center group bg-background border-2 border-border"
                        >
                            <span className="text-3xl mb-3 group-hover:animate-bounce-subtle">{tool.emoji}</span>
                            <span className="font-black text-sm text-foreground group-hover:text-primary">{tool.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default SEOSection;
