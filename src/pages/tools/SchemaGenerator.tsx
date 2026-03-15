import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Code, Copy, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";


type SchemaType = "article" | "product" | "faq" | "organization" | "breadcrumb" | "event";

const schemaTemplates: Record<SchemaType, { fields: { name: string; label: string; placeholder: string; type?: string }[]; generate: (values: Record<string, string>) => string }> = {
    article: {
        fields: [
            { name: "headline", label: "Headline", placeholder: "Article title" },
            { name: "author", label: "Author", placeholder: "John Doe" },
            { name: "datePublished", label: "Date Published", placeholder: "2024-01-15", type: "date" },
            { name: "image", label: "Image URL", placeholder: "https://example.com/image.jpg" },
            { name: "description", label: "Description", placeholder: "Brief description..." },
        ],
        generate: (v) => JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: v.headline, author: { "@type": "Person", name: v.author }, datePublished: v.datePublished, image: v.image, description: v.description }, null, 2),
    },
    product: {
        fields: [
            { name: "name", label: "Product Name", placeholder: "Widget Pro" },
            { name: "description", label: "Description", placeholder: "A great product..." },
            { name: "price", label: "Price", placeholder: "29.99" },
            { name: "currency", label: "Currency", placeholder: "USD" },
            { name: "image", label: "Image URL", placeholder: "https://example.com/product.jpg" },
            { name: "brand", label: "Brand", placeholder: "Acme Inc" },
        ],
        generate: (v) => JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: v.name, description: v.description, image: v.image, brand: { "@type": "Brand", name: v.brand }, offers: { "@type": "Offer", price: v.price, priceCurrency: v.currency, availability: "https://schema.org/InStock" } }, null, 2),
    },
    faq: {
        fields: [
            { name: "q1", label: "Question 1", placeholder: "What is your product?" },
            { name: "a1", label: "Answer 1", placeholder: "Our product is..." },
            { name: "q2", label: "Question 2", placeholder: "How does it work?" },
            { name: "a2", label: "Answer 2", placeholder: "It works by..." },
            { name: "q3", label: "Question 3", placeholder: "How much does it cost?" },
            { name: "a3", label: "Answer 3", placeholder: "Pricing starts at..." },
        ],
        generate: (v) => JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [1, 2, 3].filter((n) => v[`q${n}`]).map((n) => ({ "@type": "Question", name: v[`q${n}`], acceptedAnswer: { "@type": "Answer", text: v[`a${n}`] } })) }, null, 2),
    },
    organization: {
        fields: [
            { name: "name", label: "Organization Name", placeholder: "Acme Inc" },
            { name: "url", label: "Website URL", placeholder: "https://example.com" },
            { name: "logo", label: "Logo URL", placeholder: "https://example.com/logo.png" },
            { name: "phone", label: "Phone", placeholder: "+1-800-555-1234" },
            { name: "email", label: "Email", placeholder: "info@example.com" },
        ],
        generate: (v) => JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: v.name, url: v.url, logo: v.logo, contactPoint: { "@type": "ContactPoint", telephone: v.phone, email: v.email, contactType: "customer service" } }, null, 2),
    },
    breadcrumb: {
        fields: [
            { name: "item1name", label: "Level 1 Name", placeholder: "Home" },
            { name: "item1url", label: "Level 1 URL", placeholder: "https://example.com" },
            { name: "item2name", label: "Level 2 Name", placeholder: "Category" },
            { name: "item2url", label: "Level 2 URL", placeholder: "https://example.com/category" },
            { name: "item3name", label: "Level 3 Name", placeholder: "Page" },
            { name: "item3url", label: "Level 3 URL", placeholder: "https://example.com/category/page" },
        ],
        generate: (v) => JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [1, 2, 3].filter((n) => v[`item${n}name`]).map((n) => ({ "@type": "ListItem", position: n, name: v[`item${n}name`], item: v[`item${n}url`] })) }, null, 2),
    },
    event: {
        fields: [
            { name: "name", label: "Event Name", placeholder: "Tech Conference 2024" },
            { name: "startDate", label: "Start Date", placeholder: "2024-06-15", type: "date" },
            { name: "endDate", label: "End Date", placeholder: "2024-06-17", type: "date" },
            { name: "location", label: "Location", placeholder: "Convention Center" },
            { name: "description", label: "Description", placeholder: "Annual tech conference..." },
        ],
        generate: (v) => JSON.stringify({ "@context": "https://schema.org", "@type": "Event", name: v.name, startDate: v.startDate, endDate: v.endDate, location: { "@type": "Place", name: v.location }, description: v.description }, null, 2),
    },
};

const SchemaGenerator = () => {
    const [schemaType, setSchemaType] = useState<SchemaType>("article");
    const [values, setValues] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);

    const template = schemaTemplates[schemaType];
    const generated = template.generate(values);

    const handleCopy = () => {
        const script = `<script type="application/ld+json">\n${generated}\n</script>`;
        navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🏗️ Schema Generator</h1>

            <div className="mb-6">
                <label className="font-bold text-foreground text-sm uppercase block mb-2">Schema Type</label>
                <div className="flex flex-wrap gap-2">
                    {(Object.keys(schemaTemplates) as SchemaType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => { setSchemaType(type); setValues({}); }}
                            className={`comic-btn text-sm ${schemaType === type ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {template.fields.map((field) => (
                    <div key={field.name}>
                        <label className="font-bold text-foreground text-sm uppercase block mb-1">{field.label}</label>
                        <input
                            type={field.type || "text"}
                            value={values[field.name] || ""}
                            onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                            placeholder={field.placeholder}
                            className="comic-input"
                        />
                    </div>
                ))}
            </div>

            <div className="comic-card">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="comic-heading text-xl text-foreground">Generated Schema</h3>
                    <button onClick={handleCopy} className={`comic-btn text-sm flex items-center gap-2 ${copied ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground"}`}>
                        {copied ? <CheckCircle className="w-4 h-4" strokeWidth={3} /> : <Copy className="w-4 h-4" strokeWidth={3} />}
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
                <pre className="bg-background/50 p-4 rounded-lg text-sm text-foreground overflow-x-auto" style={{ border: "2px solid hsl(var(--border))", fontFamily: "monospace" }}>
                    {`<script type="application/ld+json">\n${generated}\n</script>`}
                </pre>
            </div>
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="JSON-LD Schema Markup Generator - Rich Snippets Tool"
                description="Easily create valid JSON-LD schema for Articles, Products, FAQs, and Organizations. Enhance your search visibility and get rich results with our free generator."
                keywords="schema generator, json-ld generator, rich snippets tool, structured data maker, faq schema creator"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Schema Generator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "DeveloperApplication"
                }}
            />

            <SEOSection
                title="Upgrade Your Search Presence with Rich Structured Data"
                subtitle="Speak Directly to Search Algorithms with JSON-LD"
                description="Google doesn't just read your text; it looks for 'Structured Data' to understand the meaning behind your pages. By using Schema.org vocabulary in JSON-LD format, you can qualify for 'Rich Results'—those eye-catching star ratings, FAQ accordions, and price tags that appear directly in search results. WebInsight Pro simplifies this complex technical task by providing templates for the most common and effective schema types used in modern SEO."
                howToUse={[
                    "Choose your 'Schema Type' (Article, Product, FAQ, etc.) from the buttons.",
                    "Fill in the required fields like Name, Price, or Question text.",
                    "Watch the 'Generated Schema' block update in real-time as you type.",
                    "Click 'Copy' to grab the complete `<script>` block.",
                    "Paste the code into the `<head>` or `<body>` of your webpage."
                ]}
                features={[
                    "Multi-Type Support: specialized templates for Articles, Products, FAQs, Organizations, and Events.",
                    "Breadcrumb Logic: Automatically formats hierarchal navigation for better search UX.",
                    "Dynamic FAQ Generation: Build complex 'Questions & Answers' blocks with ease.",
                    "Valid JSON-LD Syntax: Ensures your code passes the Google Rich Results Test every time.",
                    "Zero-Code Interface: No need to learn brackets or commas; just fill in the blanks."
                ]}
                faqs={[
                    {
                        question: "What is JSON-LD?",
                        answer: "JSON-LD (JavaScript Object Notation for Linked Data) is the method of encoding structured data that Google recommends most for search engine optimization."
                    },
                    {
                        question: "Will schema guarantee rich results?",
                        answer: "While valid schema is required for rich results, Google ultimately decides whether to show them based on site quality and relevance to the user's query."
                    },
                    {
                        question: "Where should I paste the schema code?",
                        answer: "Google recommends placing it in the `<head>` section of your HTML, but it can technically be placed anywhere on the page."
                    }
                ]}
                relatedTools={[
                    { name: "SERP Preview", emoji: "🔍", path: "/tools/serp-preview" },
                    { name: "SEO Audit", emoji: "🛡️", path: "/tools/seo-audit" },
                    { name: "Sitemap Generator", emoji: "🗺️", path: "/tools/sitemap" },
                    { name: "Meta Tag Generator", emoji: "🏷️", path: "/tools/meta-tags" }
                ]}
            />
        </div>
    );
};


export default SchemaGenerator;
