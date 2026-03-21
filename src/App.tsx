import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CookieBanner from "./components/CookieBanner";
import BackgroundDecorations from "./components/BackgroundDecorations";
import Breadcrumbs from "./components/SEO/Breadcrumbs";
import RouteSEO from "./components/SEO/RouteSEO";
import ScrollToMain from "./components/ScrollToMain";
import { Loader2 } from "lucide-react";

// --- LAZY LOADED PAGES ---
const SavedReports = lazy(() => import("./pages/SavedReports"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SEOStrategy = lazy(() => import("./pages/SEOStrategy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// --- LAZY LOADED TOOLS (FREE) ---
const SeoAudit = lazy(() => import("./pages/tools/SeoAudit"));
const PageSpeed = lazy(() => import("./pages/tools/PageSpeed"));
const MetaTags = lazy(() => import("./pages/tools/MetaTags"));
const KeywordDensity = lazy(() => import("./pages/tools/KeywordDensity"));
const WordCounter = lazy(() => import("./pages/tools/WordCounter"));
const SerpPreview = lazy(() => import("./pages/tools/SerpPreview"));
const DataAnalysisTools = lazy(() => import("./pages/tools/DataAnalysisTools"));

// --- LAZY LOADED UTILITY TOOLS ---
const QRCodeGenerator = lazy(() => import("./pages/tools/QRCodeGenerator"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const JSONFormatter = lazy(() => import("./pages/tools/JSONFormatter"));
const LoremIpsumGenerator = lazy(() => import("./pages/tools/LoremIpsumGenerator"));
const Base64Tool = lazy(() => import("./pages/tools/Base64Tool"));
const URLEncoderDecoder = lazy(() => import("./pages/tools/URLEncoderDecoder"));
const ColorPicker = lazy(() => import("./pages/tools/ColorPicker"));
const TextToSpeech = lazy(() => import("./pages/tools/TextToSpeech"));

// --- LAZY LOADED PRO TOOLS ---
const BacklinkChecker = lazy(() => import("./pages/tools/BacklinkChecker"));
const AdRevenue = lazy(() => import("./pages/tools/AdRevenue"));
const AdSenseEstimator = lazy(() => import("./pages/tools/AdSenseEstimator"));
const YouTubeRevenue = lazy(() => import("./pages/tools/YouTubeRevenue"));
const BlogRevenue = lazy(() => import("./pages/tools/BlogRevenue"));
const AffiliateEarnings = lazy(() => import("./pages/tools/AffiliateEarnings"));
const CompetitorAnalysis = lazy(() => import("./pages/tools/CompetitorAnalysis"));
const HashtagGenerator = lazy(() => import("./pages/tools/HashtagGenerator"));
const SocialEngagement = lazy(() => import("./pages/tools/SocialEngagement"));
const KeywordDifficulty = lazy(() => import("./pages/tools/KeywordDifficulty"));
const SSLChecker = lazy(() => import("./pages/tools/SSLChecker"));
const DNSLookup = lazy(() => import("./pages/tools/DNSLookup"));
const DomainAge = lazy(() => import("./pages/tools/DomainAge"));
const WhoisLookup = lazy(() => import("./pages/tools/WhoisLookup"));
const BrokenLinks = lazy(() => import("./pages/tools/BrokenLinks"));
const SchemaGenerator = lazy(() => import("./pages/tools/SchemaGenerator"));
const IPLookup = lazy(() => import("./pages/tools/IPLookup"));
const HostingChecker = lazy(() => import("./pages/tools/HostingChecker"));
const CSSMinifier = lazy(() => import("./pages/tools/CSSMinifier"));
const JSMinifier = lazy(() => import("./pages/tools/JSMinifier"));
const HTMLToMarkdown = lazy(() => import("./pages/tools/HTMLToMarkdown"));
const RobotsTxtGenerator = lazy(() => import("./pages/tools/RobotsTxtGenerator"));
const SitemapGenerator = lazy(() => import("./pages/tools/SitemapGenerator"));
const OpenGraphChecker = lazy(() => import("./pages/tools/OpenGraphChecker"));
const TrafficChecker = lazy(() => import("./pages/tools/TrafficChecker"));

// --- ADDITIONAL TOOLS ---
const CaseConverter = lazy(() => import("./pages/tools/CaseConverter"));
const URLSlugGenerator = lazy(() => import("./pages/tools/URLSlugGenerator"));
const WordCombiner = lazy(() => import("./pages/tools/WordCombiner"));
const KeywordTypoGenerator = lazy(() => import("./pages/tools/KeywordTypoGenerator"));
const HashGenerator = lazy(() => import("./pages/tools/HashGenerator"));
const JWTDecoder = lazy(() => import("./pages/tools/JWTDecoder"));
const HTMLFormatter = lazy(() => import("./pages/tools/HTMLFormatter"));
const PasswordStrength = lazy(() => import("./pages/tools/PasswordStrength"));
const UTMBuilder = lazy(() => import("./pages/tools/UTMBuilder"));
const MyIPAddress = lazy(() => import("./pages/tools/MyIPAddress"));
const PDFTools = lazy(() => import("./pages/tools/PDFTools"));
const ImageTools = lazy(() => import("./pages/tools/ImageTools"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const FancyTextGenerator = lazy(() => import("./pages/tools/FancyTextGenerator"));
const EMICalculator = lazy(() => import("./pages/tools/EMICalculator"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const PercentageCalculator = lazy(() => import("./pages/tools/PercentageCalculator"));
const StopwatchTimer = lazy(() => import("./pages/tools/StopwatchTimer"));
const LoveCalculator = lazy(() => import("./pages/tools/LoveCalculator"));
const TypingSpeedTest = lazy(() => import("./pages/tools/TypingSpeedTest"));
const NumberToWords = lazy(() => import("./pages/tools/NumberToWords"));
const CalorieCalculator = lazy(() => import("./pages/tools/CalorieCalculator"));
const SimpleInterestCalculator = lazy(() => import("./pages/tools/SimpleInterestCalculator"));
const DaysBetweenDates = lazy(() => import("./pages/tools/DaysBetweenDates"));

// --- BATCH 2 TOOLS ---
const GSTCalculator = lazy(() => import("./pages/tools/GSTCalculator"));
const IncomeTaxCalculator = lazy(() => import("./pages/tools/IncomeTaxCalculator"));
const CurrencyConverter = lazy(() => import("./pages/tools/CurrencyConverter"));
const DiscountCalculator = lazy(() => import("./pages/tools/DiscountCalculator"));
const ProfitLossCalculator = lazy(() => import("./pages/tools/ProfitLossCalculator"));
const FDRDCalculator = lazy(() => import("./pages/tools/FDRDCalculator"));
const InstagramFontGenerator = lazy(() => import("./pages/tools/InstagramFontGenerator"));
const TwitterCharCounter = lazy(() => import("./pages/tools/TwitterCharCounter"));
const YouTubeChannelStats = lazy(() => import("./pages/tools/YouTubeChannelStats"));
const SocialMediaImageSizeGuide = lazy(() => import("./pages/tools/SocialMediaImageSizeGuide"));
const ImageToBase64 = lazy(() => import("./pages/tools/ImageToBase64"));
const HTTPStatusCodeChecker = lazy(() => import("./pages/tools/HTTPStatusCodeChecker"));
const MarkdownToHTMLTool = lazy(() => import("./pages/tools/MarkdownToHTML"));
const CSSGradientGenerator = lazy(() => import("./pages/tools/CSSGradientGenerator"));
const ColorPaletteGenerator = lazy(() => import("./pages/tools/ColorPaletteGenerator"));
const TDEECalculator = lazy(() => import("./pages/tools/TDEECalculator"));
const WaterIntakeCalculator = lazy(() => import("./pages/tools/WaterIntakeCalculator"));
const IdealBodyWeightCalculator = lazy(() => import("./pages/tools/IdealBodyWeightCalculator"));
const PFCalculator = lazy(() => import("./pages/tools/PFCalculator"));
const HRACalculator = lazy(() => import("./pages/tools/HRACalculator"));
const ReadabilityScoreChecker = lazy(() => import("./pages/tools/ReadabilityScoreChecker"));
const ParaphrasingTool = lazy(() => import("./pages/tools/ArticleRewriter"));
const GrammarChecker = lazy(() => import("./pages/tools/GrammarChecker"));
const CronJobGenerator = lazy(() => import("./pages/tools/CronJobGenerator"));

// --- BATCH 3 TOOLS ---
const KeywordPlanner = lazy(() => import("./pages/tools/KeywordPlanner"));
const LongTailKeywordFinder = lazy(() => import("./pages/tools/LongTailKeywordFinder"));
const QuestionKeywordFinder = lazy(() => import("./pages/tools/QuestionKeywordFinder"));
const RelatedKeywordsFinder = lazy(() => import("./pages/tools/RelatedKeywordsFinder"));
const SearchVolumeChecker = lazy(() => import("./pages/tools/SearchVolumeChecker"));
const CPCChecker = lazy(() => import("./pages/tools/CPCChecker"));
const TrendingKeywordsFinder = lazy(() => import("./pages/tools/TrendingKeywordsFinder"));
const RandomNumberGenerator = lazy(() => import("./pages/tools/RandomNumberGenerator"));
const FaviconGenerator = lazy(() => import("./pages/tools/FaviconGenerator"));
const CompoundInterestCalculator = lazy(() => import("./pages/tools/CompoundInterestCalculator"));
const SIPCalculator = lazy(() => import("./pages/tools/SIPCalculator"));
const FuelCostCalculator = lazy(() => import("./pages/tools/FuelCostCalculator"));
const PregnancyCalculator = lazy(() => import("./pages/tools/PregnancyCalculator"));
const ReadTimeCalculator = lazy(() => import("./pages/tools/ReadTimeCalculator"));
const YouTubeKeywordTool = lazy(() => import("./pages/tools/YouTubeKeywordTool"));
const AmazonKeywordTool = lazy(() => import("./pages/tools/AmazonKeywordTool"));
const KeywordSuggestionTool = lazy(() => import("./pages/tools/KeywordSuggestionTool"));
const MetaTitleGenerator = lazy(() => import("./pages/tools/MetaTitleGenerator"));
const MetaDescriptionGenerator = lazy(() => import("./pages/tools/MetaDescriptionGenerator"));
const CTRCalculator = lazy(() => import("./pages/tools/CTRCalculator"));
const ROICalculator = lazy(() => import("./pages/tools/ROICalculator"));
const ConversionRateCalculator = lazy(() => import("./pages/tools/ConversionRateCalculator"));
const InstagramBioGenerator = lazy(() => import("./pages/tools/InstagramBioGenerator"));
const SocialMediaCaptionGenerator = lazy(() => import("./pages/tools/SocialMediaCaptionGenerator"));
const YouTubeTagGenerator = lazy(() => import("./pages/tools/YouTubeTagGenerator"));
const MRRCalculator = lazy(() => import("./pages/tools/MRRCalculator"));
const ChurnRateCalculator = lazy(() => import("./pages/tools/ChurnRateCalculator"));
const SaaSPricingCalculator = lazy(() => import("./pages/tools/SaaSPricingCalculator"));
const RetirementCalculator = lazy(() => import("./pages/tools/RetirementCalculator"));
const BodyFatCalculator = lazy(() => import("./pages/tools/BodyFatCalculator"));
const HeadlineGenerator = lazy(() => import("./pages/tools/HeadlineGenerator"));
const BlogTopicGenerator = lazy(() => import("./pages/tools/BlogTopicGenerator"));
const FAQGenerator = lazy(() => import("./pages/tools/FAQGenerator"));
const BrandNameGenerator = lazy(() => import("./pages/tools/BrandNameGenerator"));
const SloganGenerator = lazy(() => import("./pages/tools/SloganGenerator"));

// --- PDF TOOLS ---
const MergePDFApp = lazy(() => import("./pages/tools/MergePDFApp"));
const SplitPDFApp = lazy(() => import("./pages/tools/SplitPDFApp"));
const CompressPDFApp = lazy(() => import("./pages/tools/CompressPDFApp"));
const PDFtoWordApp = lazy(() => import("./pages/tools/PDFtoWordApp"));
const WordtoPDFApp = lazy(() => import("./pages/tools/WordtoPDFApp"));
const PDFtoExcelApp = lazy(() => import("./pages/tools/PDFtoExcelApp"));
const ExceltoPDFApp = lazy(() => import("./pages/tools/ExceltoPDFApp"));
const PDFtoPPTApp = lazy(() => import("./pages/tools/PDFtoPPTApp"));
const PPTtoPDFApp = lazy(() => import("./pages/tools/PPTtoPDFApp"));
const PDFtoJPGApp = lazy(() => import("./pages/tools/PDFtoJPGApp"));
const JPGtoPDFApp = lazy(() => import("./pages/tools/JPGtoPDFApp"));
const PNGtoPDFApp = lazy(() => import("./pages/tools/PNGtoPDFApp"));
const PDFtoPNGApp = lazy(() => import("./pages/tools/PDFtoPNGApp"));
const RotatePDFApp = lazy(() => import("./pages/tools/RotatePDFApp"));
const DeletePDFPagesApp = lazy(() => import("./pages/tools/DeletePDFPagesApp"));
const ReorderPDFPagesApp = lazy(() => import("./pages/tools/ReorderPDFPagesApp"));
const ProtectPDFApp = lazy(() => import("./pages/tools/ProtectPDFApp"));
const UnlockPDFApp = lazy(() => import("./pages/tools/UnlockPDFApp"));
const AddWatermarkApp = lazy(() => import("./pages/tools/AddWatermarkApp"));
const RemoveWatermarkApp = lazy(() => import("./pages/tools/RemoveWatermarkApp"));
const AddPageNumbersApp = lazy(() => import("./pages/tools/AddPageNumbersApp"));
const EditPDFApp = lazy(() => import("./pages/tools/EditPDFApp"));
const SignPDFApp = lazy(() => import("./pages/tools/SignPDFApp"));
const OCRPDFApp = lazy(() => import("./pages/tools/OCRPDFApp"));
const PDFtoTextApp = lazy(() => import("./pages/tools/PDFtoTextApp"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    </div>
    <p className="text-secondary font-black animate-pulse text-lg uppercase tracking-tighter">Preparing Pro Tool...</p>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToMain />
            <RouteSEO />
            <div className="min-h-screen flex flex-col gradient-bg relative overflow-hidden">
              <div className="bg-noise"></div>
              <BackgroundDecorations />
              <Navbar />

              <div className="flex-1 flex w-full max-w-[1600px] mx-auto px-4 gap-6 relative z-10">
                <Sidebar />

                <main id="main-content" className="flex-1 min-w-0 pb-16 pt-4 relative z-20 md:pl-28" style={{ minHeight: '60vh' }}>
                  <Breadcrumbs />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {/* Main pages */}
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/reports" element={<SavedReports />} />
                      <Route path="/tools" element={<Tools />} />

                      {/* SEO Tools */}
                      <Route path="/tools/seo-audit" element={<SeoAudit />} />
                      <Route path="/tools/page-speed" element={<PageSpeed />} />
                      <Route path="/tools/meta-tags" element={<MetaTags />} />
                      <Route path="/tools/keyword-density" element={<KeywordDensity />} />
                      <Route path="/tools/word-counter" element={<WordCounter />} />
                      <Route path="/tools/serp-preview" element={<SerpPreview />} />
                      <Route path="/tools/data-analysis-tools" element={<DataAnalysisTools />} />

                      {/* Utility Tools */}
                      <Route path="/tools/qr-code" element={<QRCodeGenerator />} />
                      <Route path="/tools/password" element={<PasswordGenerator />} />
                      <Route path="/tools/json" element={<JSONFormatter />} />
                      <Route path="/tools/lorem-ipsum" element={<LoremIpsumGenerator />} />
                      <Route path="/tools/base64" element={<Base64Tool />} />
                      <Route path="/tools/url-encoder" element={<URLEncoderDecoder />} />
                      <Route path="/tools/color-picker" element={<ColorPicker />} />
                      <Route path="/tools/text-to-speech" element={<TextToSpeech />} />

                      {/* Pro Tools */}
                      <Route path="/tools/backlinks" element={<BacklinkChecker />} />
                      <Route path="/tools/ad-revenue" element={<AdRevenue />} />
                      <Route path="/tools/adsense" element={<AdSenseEstimator />} />
                      <Route path="/tools/youtube-revenue" element={<YouTubeRevenue />} />
                      <Route path="/tools/blog-revenue" element={<BlogRevenue />} />
                      <Route path="/tools/affiliate" element={<AffiliateEarnings />} />
                      <Route path="/tools/competitor" element={<CompetitorAnalysis />} />
                      <Route path="/tools/hashtags" element={<HashtagGenerator />} />
                      <Route path="/tools/engagement" element={<SocialEngagement />} />
                      <Route path="/tools/keyword-difficulty" element={<KeywordDifficulty />} />
                      <Route path="/tools/ssl-checker" element={<SSLChecker />} />
                      <Route path="/tools/ssl" element={<SSLChecker />} />
                      <Route path="/tools/dns-lookup" element={<DNSLookup />} />
                      <Route path="/tools/dns" element={<DNSLookup />} />
                      <Route path="/tools/domain-age" element={<DomainAge />} />
                      <Route path="/tools/whois" element={<WhoisLookup />} />
                      <Route path="/tools/broken-links" element={<BrokenLinks />} />
                      <Route path="/tools/schema" element={<SchemaGenerator />} />
                      <Route path="/tools/ip-lookup" element={<IPLookup />} />
                      <Route path="/tools/hosting" element={<HostingChecker />} />
                      <Route path="/tools/css-minifier" element={<CSSMinifier />} />
                      <Route path="/tools/js-minifier" element={<JSMinifier />} />
                      <Route path="/tools/html-to-markdown" element={<HTMLToMarkdown />} />
                      <Route path="/tools/robots-txt" element={<RobotsTxtGenerator />} />
                      <Route path="/tools/sitemap" element={<SitemapGenerator />} />
                      <Route path="/tools/og-checker" element={<OpenGraphChecker />} />

                      {/* New Tools */}
                      <Route path="/tools/case-converter" element={<CaseConverter />} />
                      <Route path="/tools/url-slug-generator" element={<URLSlugGenerator />} />
                      <Route path="/tools/word-combiner" element={<WordCombiner />} />
                      <Route path="/tools/keyword-typo-generator" element={<KeywordTypoGenerator />} />
                      <Route path="/tools/hash-generator" element={<HashGenerator />} />
                      <Route path="/tools/jwt-decoder" element={<JWTDecoder />} />
                      <Route path="/tools/html-formatter" element={<HTMLFormatter />} />
                      <Route path="/tools/password-strength" element={<PasswordStrength />} />
                      <Route path="/tools/utm-builder" element={<UTMBuilder />} />
                      <Route path="/tools/my-ip" element={<MyIPAddress />} />
                      <Route path="/traffic-checker" element={<TrafficChecker />} />
                      <Route path="/tools/traffic-checker" element={<TrafficChecker />} />
                      <Route path="/tools/pdf-tools" element={<PDFTools />} />
                      <Route path="/tools/image-tools" element={<ImageTools />} />
                      <Route path="/tools/age-calculator" element={<AgeCalculator />} />
                      <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
                      <Route path="/tools/fancy-text" element={<FancyTextGenerator />} />
                      <Route path="/tools/emi-calculator" element={<EMICalculator />} />
                      <Route path="/tools/unit-converter" element={<UnitConverter />} />
                      <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
                      <Route path="/tools/stopwatch" element={<StopwatchTimer />} />
                      <Route path="/tools/love-calculator" element={<LoveCalculator />} />
                      <Route path="/tools/typing-speed" element={<TypingSpeedTest />} />
                      <Route path="/tools/number-to-words" element={<NumberToWords />} />
                      <Route path="/tools/calorie-calculator" element={<CalorieCalculator />} />
                      <Route path="/tools/simple-interest" element={<SimpleInterestCalculator />} />
                      <Route path="/tools/days-between-dates" element={<DaysBetweenDates />} />

                      {/* Batch 2 */}
                      <Route path="/tools/gst-calculator" element={<GSTCalculator />} />
                      <Route path="/tools/income-tax" element={<IncomeTaxCalculator />} />
                      <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
                      <Route path="/tools/discount-calculator" element={<DiscountCalculator />} />
                      <Route path="/tools/profit-loss" element={<ProfitLossCalculator />} />
                      <Route path="/tools/fd-rd-calculator" element={<FDRDCalculator />} />
                      <Route path="/tools/instagram-fonts" element={<InstagramFontGenerator />} />
                      <Route path="/tools/twitter-counter" element={<TwitterCharCounter />} />
                      <Route path="/tools/youtube-stats" element={<YouTubeChannelStats />} />
                      <Route path="/tools/social-image-sizes" element={<SocialMediaImageSizeGuide />} />
                      <Route path="/tools/image-to-base64" element={<ImageToBase64 />} />
                      <Route path="/tools/http-status-codes" element={<HTTPStatusCodeChecker />} />
                      <Route path="/tools/markdown-to-html" element={<MarkdownToHTMLTool />} />
                      <Route path="/tools/css-gradient" element={<CSSGradientGenerator />} />
                      <Route path="/tools/color-palette" element={<ColorPaletteGenerator />} />
                      <Route path="/tools/tdee-calculator" element={<TDEECalculator />} />
                      <Route path="/tools/water-intake" element={<WaterIntakeCalculator />} />
                      <Route path="/tools/ideal-weight" element={<IdealBodyWeightCalculator />} />
                      <Route path="/tools/pf-calculator" element={<PFCalculator />} />
                      <Route path="/tools/hra-calculator" element={<HRACalculator />} />
                      <Route path="/tools/readability" element={<ReadabilityScoreChecker />} />
                      <Route path="/tools/article-rewriter" element={<ParaphrasingTool />} />
                      <Route path="/tools/grammar-checker" element={<GrammarChecker />} />
                      <Route path="/tools/cron-generator" element={<CronJobGenerator />} />

                      {/* Batch 3 */}
                      <Route path="/tools/keyword-planner" element={<KeywordPlanner />} />
                      <Route path="/tools/long-tail-keyword" element={<LongTailKeywordFinder />} />
                      <Route path="/tools/question-keyword" element={<QuestionKeywordFinder />} />
                      <Route path="/tools/related-keywords" element={<RelatedKeywordsFinder />} />
                      <Route path="/tools/search-volume-checker" element={<SearchVolumeChecker />} />
                      <Route path="/tools/cpc-checker" element={<CPCChecker />} />
                      <Route path="/tools/trending-keywords" element={<TrendingKeywordsFinder />} />
                      <Route path="/tools/random-number" element={<RandomNumberGenerator />} />
                      <Route path="/tools/favicon-generator" element={<FaviconGenerator />} />
                      <Route path="/tools/compound-interest" element={<CompoundInterestCalculator />} />
                      <Route path="/tools/sip-calculator" element={<SIPCalculator />} />
                      <Route path="/tools/fuel-cost" element={<FuelCostCalculator />} />
                      <Route path="/tools/pregnancy-calculator" element={<PregnancyCalculator />} />
                      <Route path="/tools/read-time" element={<ReadTimeCalculator />} />
                      <Route path="/tools/youtube-keyword" element={<YouTubeKeywordTool />} />
                      <Route path="/tools/amazon-keyword" element={<AmazonKeywordTool />} />
                      <Route path="/tools/google-suggest" element={<KeywordSuggestionTool />} />
                      <Route path="/tools/meta-title-generator" element={<MetaTitleGenerator />} />
                      <Route path="/tools/meta-description-generator" element={<MetaDescriptionGenerator />} />
                      <Route path="/tools/ctr-calculator" element={<CTRCalculator />} />
                      <Route path="/tools/roi-calculator" element={<ROICalculator />} />
                      <Route path="/tools/conversion-rate-calculator" element={<ConversionRateCalculator />} />
                      <Route path="/tools/instagram-bio-generator" element={<InstagramBioGenerator />} />
                      <Route path="/tools/social-caption-generator" element={<SocialMediaCaptionGenerator />} />
                      <Route path="/tools/youtube-tag-generator" element={<YouTubeTagGenerator />} />
                      <Route path="/tools/mrr-calculator" element={<MRRCalculator />} />
                      <Route path="/tools/churn-rate-calculator" element={<ChurnRateCalculator />} />
                      <Route path="/tools/saas-pricing-calculator" element={<SaaSPricingCalculator />} />
                      <Route path="/tools/retirement-calculator" element={<RetirementCalculator />} />
                      <Route path="/tools/body-fat" element={<BodyFatCalculator />} />
                      <Route path="/tools/headline-generator" element={<HeadlineGenerator />} />
                      <Route path="/tools/blog-topic-generator" element={<BlogTopicGenerator />} />
                      <Route path="/tools/faq-generator" element={<FAQGenerator />} />
                      <Route path="/tools/brand-name-generator" element={<BrandNameGenerator />} />
                      <Route path="/tools/slogan-generator" element={<SloganGenerator />} />

                      {/* PDF Tools */}
                      <Route path="/tools/merge-pdf" element={<MergePDFApp />} />
                      <Route path="/tools/split-pdf" element={<SplitPDFApp />} />
                      <Route path="/tools/compress-pdf" element={<CompressPDFApp />} />
                      <Route path="/tools/pdf-to-word" element={<PDFtoWordApp />} />
                      <Route path="/tools/word-to-pdf" element={<WordtoPDFApp />} />
                      <Route path="/tools/pdf-to-excel" element={<PDFtoExcelApp />} />
                      <Route path="/tools/excel-to-pdf" element={<ExceltoPDFApp />} />
                      <Route path="/tools/pdf-to-ppt" element={<PDFtoPPTApp />} />
                      <Route path="/tools/ppt-to-pdf" element={<PPTtoPDFApp />} />
                      <Route path="/tools/pdf-to-jpg" element={<PDFtoJPGApp />} />
                      <Route path="/tools/jpg-to-pdf" element={<JPGtoPDFApp />} />
                      <Route path="/tools/png-to-pdf" element={<PNGtoPDFApp />} />
                      <Route path="/tools/pdf-to-png" element={<PDFtoPNGApp />} />
                      <Route path="/tools/rotate-pdf" element={<RotatePDFApp />} />
                      <Route path="/tools/delete-pdf-pages" element={<DeletePDFPagesApp />} />
                      <Route path="/tools/reorder-pdf-pages" element={<ReorderPDFPagesApp />} />
                      <Route path="/tools/protect-pdf" element={<ProtectPDFApp />} />
                      <Route path="/tools/unlock-pdf" element={<UnlockPDFApp />} />
                      <Route path="/tools/add-watermark" element={<AddWatermarkApp />} />
                      <Route path="/tools/remove-watermark" element={<RemoveWatermarkApp />} />
                      <Route path="/tools/add-page-numbers" element={<AddPageNumbersApp />} />
                      <Route path="/tools/edit-pdf" element={<EditPDFApp />} />
                      <Route path="/tools/sign-pdf" element={<SignPDFApp />} />
                      <Route path="/tools/ocr-pdf" element={<OCRPDFApp />} />
                      <Route path="/tools/pdf-to-text" element={<PDFtoTextApp />} />

                      <Route path="/seo-strategy" element={<SEOStrategy />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>

              <footer className="w-full py-6 mt-12 bg-white/20 backdrop-blur-md border-t border-white/40 text-center relative z-0">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-white/40">
                    <img src="/logo.png" alt="Logo" width="40" height="40" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-bold">
                  © {new Date().getFullYear()} WebInsight Pro. All rights reserved.
                </p>
                <div className="mt-2 text-sm font-bold flex flex-wrap justify-center gap-4">
                  <Link to="/seo-strategy" className="text-primary hover:underline transition-colors">SEO Strategy</Link>
                  <Link to="/privacy-policy" className="text-primary hover:underline transition-colors">Privacy Policy</Link>
                  <Link to="/terms-of-service" className="text-secondary hover:underline transition-colors">Terms of Service</Link>
                  <Link to="/about" className="text-comic-blue hover:underline transition-colors">About Us</Link>
                  <Link to="/contact" className="text-comic-green hover:underline transition-colors">Contact</Link>
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
