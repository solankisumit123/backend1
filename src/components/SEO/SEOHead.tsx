import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    schemaData?: object;
}

const SEOHead = ({
    title,
    description,
    keywords,
    canonicalUrl = "https://webinsightpro.site/",
    ogImage = "https://webinsightpro.site/favicon.svg",
    schemaData
}: SEOHeadProps) => {
    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title.toLowerCase().includes("webinsight pro") ? title : `${title} | WebInsight Pro`}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonicalUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD Schema Markup */}
            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
