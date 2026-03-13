import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getRouteSEO, getCanonicalUrl } from "@/lib/seoRoutes";

const OG_IMAGE = "https://webinsightpro.site/favicon.svg";

/**
 * Auto-applies SEO meta for /tools/* and main pages when the page itself doesn't use SEOHead.
 * Ensures every route has unique title + description = better indexing for 1M traffic scale.
 */
const RouteSEO = () => {
  const { pathname } = useLocation();
  const seo = getRouteSEO(pathname);
  if (!seo) return null;

  const canonical = getCanonicalUrl(seo.path);
  const fullTitle = seo.title.toLowerCase().includes("webinsight pro")
    ? seo.title
    : `${seo.title} | WebInsight Pro`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};

export default RouteSEO;
