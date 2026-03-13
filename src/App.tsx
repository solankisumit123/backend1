import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SavedReports from "./pages/SavedReports";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CookieBanner from "./components/CookieBanner";
import AdBanner from "./components/AdBanner";

// Core SEO Tools (FREE)
import SeoAudit from "./pages/tools/SeoAudit";
import PageSpeed from "./pages/tools/PageSpeed";
import MetaTags from "./pages/tools/MetaTags";
import KeywordDensity from "./pages/tools/KeywordDensity";
import WordCounter from "./pages/tools/WordCounter";
import SerpPreview from "./pages/tools/SerpPreview";

// Free Utility Tools
import QRCodeGenerator from "./pages/tools/QRCodeGenerator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import JSONFormatter from "./pages/tools/JSONFormatter";
import LoremIpsumGenerator from "./pages/tools/LoremIpsumGenerator";
import Base64Tool from "./pages/tools/Base64Tool";
import URLEncoderDecoder from "./pages/tools/URLEncoderDecoder";
import ColorPicker from "./pages/tools/ColorPicker";
import TextToSpeech from "./pages/tools/TextToSpeech";

// Pro Plan Tools
import BacklinkChecker from "./pages/tools/BacklinkChecker";
import AdRevenue from "./pages/tools/AdRevenue";
import AdSenseEstimator from "./pages/tools/AdSenseEstimator";
import YouTubeRevenue from "./pages/tools/YouTubeRevenue";
import BlogRevenue from "./pages/tools/BlogRevenue";
import AffiliateEarnings from "./pages/tools/AffiliateEarnings";
import CompetitorAnalysis from "./pages/tools/CompetitorAnalysis";
import HashtagGenerator from "./pages/tools/HashtagGenerator";
import SocialEngagement from "./pages/tools/SocialEngagement";
import KeywordDifficulty from "./pages/tools/KeywordDifficulty";
import SSLChecker from "./pages/tools/SSLChecker";
import DNSLookup from "./pages/tools/DNSLookup";
import DomainAge from "./pages/tools/DomainAge";
import WhoisLookup from "./pages/tools/WhoisLookup";
import BrokenLinks from "./pages/tools/BrokenLinks";
import SchemaGenerator from "./pages/tools/SchemaGenerator";
import IPLookup from "./pages/tools/IPLookup";
import HostingChecker from "./pages/tools/HostingChecker";
import CSSMinifier from "./pages/tools/CSSMinifier";
import JSMinifier from "./pages/tools/JSMinifier";
import HTMLToMarkdown from "./pages/tools/HTMLToMarkdown";
import RobotsTxtGenerator from "./pages/tools/RobotsTxtGenerator";
import SitemapGenerator from "./pages/tools/SitemapGenerator";
import OpenGraphChecker from "./pages/tools/OpenGraphChecker";
import TrafficChecker from "./pages/tools/TrafficChecker";
// New Tools Added
import CaseConverter from "./pages/tools/CaseConverter";
import URLSlugGenerator from "./pages/tools/URLSlugGenerator";
import WordCombiner from "./pages/tools/WordCombiner";
import KeywordTypoGenerator from "./pages/tools/KeywordTypoGenerator";
import HashGenerator from "./pages/tools/HashGenerator";
import JWTDecoder from "./pages/tools/JWTDecoder";
import HTMLFormatter from "./pages/tools/HTMLFormatter";
import PasswordStrength from "./pages/tools/PasswordStrength";
import UTMBuilder from "./pages/tools/UTMBuilder";
import MyIPAddress from "./pages/tools/MyIPAddress";

import PDFTools from "./pages/tools/PDFTools";
import ImageTools from "./pages/tools/ImageTools";
import AgeCalculator from "./pages/tools/AgeCalculator";
import BMICalculator from "./pages/tools/BMICalculator";
import FancyTextGenerator from "./pages/tools/FancyTextGenerator";
import EMICalculator from "./pages/tools/EMICalculator";
import UnitConverter from "./pages/tools/UnitConverter";
import PercentageCalculator from "./pages/tools/PercentageCalculator";
import StopwatchTimer from "./pages/tools/StopwatchTimer";
import LoveCalculator from "./pages/tools/LoveCalculator";
import TypingSpeedTest from "./pages/tools/TypingSpeedTest";
import NumberToWords from "./pages/tools/NumberToWords";
import CalorieCalculator from "./pages/tools/CalorieCalculator";
import SimpleInterestCalculator from "./pages/tools/SimpleInterestCalculator";
import DaysBetweenDates from "./pages/tools/DaysBetweenDates";

// ─── NEW TOOLS (Batch 2) ───
import GSTCalculator from "./pages/tools/GSTCalculator";
import IncomeTaxCalculator from "./pages/tools/IncomeTaxCalculator";
import CurrencyConverter from "./pages/tools/CurrencyConverter";
import DiscountCalculator from "./pages/tools/DiscountCalculator";
import ProfitLossCalculator from "./pages/tools/ProfitLossCalculator";
import FDRDCalculator from "./pages/tools/FDRDCalculator";
import InstagramFontGenerator from "./pages/tools/InstagramFontGenerator";
import TwitterCharCounter from "./pages/tools/TwitterCharCounter";
import YouTubeChannelStats from "./pages/tools/YouTubeChannelStats";
import SocialMediaImageSizeGuide from "./pages/tools/SocialMediaImageSizeGuide";
import ImageToBase64 from "./pages/tools/ImageToBase64";
import HTTPStatusCodeChecker from "./pages/tools/HTTPStatusCodeChecker";
import MarkdownToHTMLTool from "./pages/tools/MarkdownToHTML";
import CSSGradientGenerator from "./pages/tools/CSSGradientGenerator";
import ColorPaletteGenerator from "./pages/tools/ColorPaletteGenerator";
import TDEECalculator from "./pages/tools/TDEECalculator";
import WaterIntakeCalculator from "./pages/tools/WaterIntakeCalculator";
import IdealBodyWeightCalculator from "./pages/tools/IdealBodyWeightCalculator";
import PFCalculator from "./pages/tools/PFCalculator";
import HRACalculator from "./pages/tools/HRACalculator";
import ReadabilityScoreChecker from "./pages/tools/ReadabilityScoreChecker";
import ArticleRewriter from "./pages/tools/ArticleRewriter";
import GrammarChecker from "./pages/tools/GrammarChecker";
import CronJobGenerator from "./pages/tools/CronJobGenerator";

// ─── NEW TOOLS (Batch 3) ───
import KeywordPlanner from "./pages/tools/KeywordPlanner";
import LongTailKeywordFinder from "./pages/tools/LongTailKeywordFinder";
import QuestionKeywordFinder from "./pages/tools/QuestionKeywordFinder";
import RelatedKeywordsFinder from "./pages/tools/RelatedKeywordsFinder";
import SearchVolumeChecker from "./pages/tools/SearchVolumeChecker";
import CPCChecker from "./pages/tools/CPCChecker";
import TrendingKeywordsFinder from "./pages/tools/TrendingKeywordsFinder";
import RandomNumberGenerator from "./pages/tools/RandomNumberGenerator";
import FaviconGenerator from "./pages/tools/FaviconGenerator";
import CompoundInterestCalculator from "./pages/tools/CompoundInterestCalculator";
import SIPCalculator from "./pages/tools/SIPCalculator";
import FuelCostCalculator from "./pages/tools/FuelCostCalculator";
import PregnancyCalculator from "./pages/tools/PregnancyCalculator";
import ReadTimeCalculator from "./pages/tools/ReadTimeCalculator";
import YouTubeKeywordTool from "./pages/tools/YouTubeKeywordTool";
import AmazonKeywordTool from "./pages/tools/AmazonKeywordTool";
import GoogleSuggestScraper from "./pages/tools/GoogleSuggestScraper";
import MetaTitleGenerator from "./pages/tools/MetaTitleGenerator";
import MetaDescriptionGenerator from "./pages/tools/MetaDescriptionGenerator";
import CTRCalculator from "./pages/tools/CTRCalculator";
import ROICalculator from "./pages/tools/ROICalculator";
import ConversionRateCalculator from "./pages/tools/ConversionRateCalculator";
import InstagramBioGenerator from "./pages/tools/InstagramBioGenerator";
import SocialMediaCaptionGenerator from "./pages/tools/SocialMediaCaptionGenerator";
import YouTubeTagGenerator from "./pages/tools/YouTubeTagGenerator";
import MRRCalculator from "./pages/tools/MRRCalculator";
import ChurnRateCalculator from "./pages/tools/ChurnRateCalculator";
import SaaSPricingCalculator from "./pages/tools/SaaSPricingCalculator";
import RetirementCalculator from "./pages/tools/RetirementCalculator";
import BodyFatCalculator from "./pages/tools/BodyFatCalculator";
import HeadlineGenerator from "./pages/tools/HeadlineGenerator";
import BlogTopicGenerator from "./pages/tools/BlogTopicGenerator";
import FAQGenerator from "./pages/tools/FAQGenerator";
import BrandNameGenerator from "./pages/tools/BrandNameGenerator";
import SloganGenerator from "./pages/tools/SloganGenerator";
import YouTubeVideoDownloader from "./pages/tools/YouTubeVideoDownloader";
import InstagramVideoDownloader from "./pages/tools/InstagramVideoDownloader";


import MergePDFApp from "./pages/tools/MergePDFApp";
import SplitPDFApp from "./pages/tools/SplitPDFApp";
import CompressPDFApp from "./pages/tools/CompressPDFApp";
import PDFtoWordApp from "./pages/tools/PDFtoWordApp";
import WordtoPDFApp from "./pages/tools/WordtoPDFApp";
import PDFtoExcelApp from "./pages/tools/PDFtoExcelApp";
import ExceltoPDFApp from "./pages/tools/ExceltoPDFApp";
import PDFtoPPTApp from "./pages/tools/PDFtoPPTApp";
import PPTtoPDFApp from "./pages/tools/PPTtoPDFApp";
import PDFtoJPGApp from "./pages/tools/PDFtoJPGApp";
import JPGtoPDFApp from "./pages/tools/JPGtoPDFApp";
import PNGtoPDFApp from "./pages/tools/PNGtoPDFApp";
import PDFtoPNGApp from "./pages/tools/PDFtoPNGApp";
import RotatePDFApp from "./pages/tools/RotatePDFApp";
import DeletePDFPagesApp from "./pages/tools/DeletePDFPagesApp";
import ReorderPDFPagesApp from "./pages/tools/ReorderPDFPagesApp";
import ProtectPDFApp from "./pages/tools/ProtectPDFApp";
import UnlockPDFApp from "./pages/tools/UnlockPDFApp";
import AddWatermarkApp from "./pages/tools/AddWatermarkApp";
import RemoveWatermarkApp from "./pages/tools/RemoveWatermarkApp";
import AddPageNumbersApp from "./pages/tools/AddPageNumbersApp";
import EditPDFApp from "./pages/tools/EditPDFApp";
import SignPDFApp from "./pages/tools/SignPDFApp";
import OCRPDFApp from "./pages/tools/OCRPDFApp";
import PDFtoTextApp from "./pages/tools/PDFtoTextApp";
import DataAnalysisTools from "./pages/tools/DataAnalysisTools";

import SEOStrategy from "./pages/SEOStrategy";
import NotFound from "./pages/NotFound";
import Breadcrumbs from "./components/SEO/Breadcrumbs";
import RouteSEO from "./components/SEO/RouteSEO";
import ScrollToMain from "./components/ScrollToMain";

const queryClient = new QueryClient();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CookieBanner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToMain />
            <RouteSEO />
            <div className="min-h-screen flex flex-col" style={{ contain: 'layout' }}>
              <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
              <div className="container mx-auto px-4 mt-4 flex justify-center">
                <AdBanner width={728} height={90} bannerId="28752282" />
              </div>



              <Breadcrumbs />

              <div className="flex-1 flex w-full max-w-[1600px] mx-auto relative z-0">
                {/* LEFT sidebar */}
                <aside className="hidden lg:block w-[160px] shrink-0 px-2 py-8">
                  <div className="sticky top-24">
                    <AdBanner keyId="c466fee662c8bcf9da12b50d3f6b58dc" bannerId="28752282" width={160} height={600} />
                  </div>
                </aside>

                <main id="main-content" className="flex-1 min-w-0" style={{ minHeight: '60vh' }}>
                  <Routes>
                    {/* Main pages */}
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/reports" element={<SavedReports />} />
                    <Route path="/tools" element={<Tools />} />

                    {/* ═══════════════════════════════════════════════
                      FREE TOOLS — accessible to everyone
                     ═══════════════════════════════════════════════ */}
                    <Route path="/tools/seo-audit" element={<SeoAudit />} />
                    <Route path="/tools/page-speed" element={<PageSpeed />} />
                    <Route path="/tools/meta-tags" element={<MetaTags />} />
                    <Route path="/tools/keyword-density" element={<KeywordDensity />} />
                    <Route path="/tools/word-counter" element={<WordCounter />} />
                    <Route path="/tools/serp-preview" element={<SerpPreview />} />
                    <Route path="/tools/data-analysis-tools" element={<DataAnalysisTools />} />

                    {/* Free Utility Tools */}
                    <Route path="/tools/qr-code" element={<QRCodeGenerator />} />
                    <Route path="/tools/password" element={<PasswordGenerator />} />
                    <Route path="/tools/json" element={<JSONFormatter />} />
                    <Route path="/tools/lorem-ipsum" element={<LoremIpsumGenerator />} />
                    <Route path="/tools/base64" element={<Base64Tool />} />
                    <Route path="/tools/url-encoder" element={<URLEncoderDecoder />} />
                    <Route path="/tools/color-picker" element={<ColorPicker />} />
                    <Route path="/tools/text-to-speech" element={<TextToSpeech />} />

                    {/* ═══════════════════════════════════════════════
                      PRO PLAN TOOLS — require Pro or Business plan
                     ═══════════════════════════════════════════════ */}
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

                    {/* 11 New FREE Tools */}
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

                    {/* ═══ NEW TOOLS (Batch 2) ═══ */}
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
                    <Route path="/tools/article-rewriter" element={<ArticleRewriter />} />
                    <Route path="/tools/grammar-checker" element={<GrammarChecker />} />
                    <Route path="/tools/cron-generator" element={<CronJobGenerator />} />

                    {/* ═══ NEW TOOLS (Batch 3) ═══ */}
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
                    <Route path="/tools/google-suggest" element={<GoogleSuggestScraper />} />
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
                    <Route path="/tools/youtube-video-downloader" element={<YouTubeVideoDownloader />} />
                    <Route path="/tools/youtube-downloader" element={<YouTubeVideoDownloader />} />
                    <Route path="/tools/instagram-video-downloader" element={<InstagramVideoDownloader />} />
                    <Route path="/tools/instagram-downloader" element={<InstagramVideoDownloader />} />

                    {/* ═══ PDF TOOLS ═══ */}
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
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                {/* RIGHT sidebar */}
                <aside className="hidden lg:block w-[160px] shrink-0 px-2 py-8">
                  <div className="sticky top-24">
                    <AdBanner keyId="c466fee662c8bcf9da12b50d3f6b58dc" bannerId="28752282" width={160} height={600} />
                  </div>
                </aside>


              </div>
              <footer
                className="w-full py-6 border-t-4 border-border text-center bg-card"
                style={{ minHeight: '100px', contain: 'layout size' }}
              >
                <p className="text-sm text-muted-foreground font-bold">
                  © {new Date().getFullYear()} WebInsight Pro. All rights reserved.
                </p>
                <div className="mt-2 text-sm font-bold flex flex-wrap justify-center gap-4">
                  <Link to="/seo-strategy" className="text-primary hover:underline hover:text-primary/80 transition-colors">SEO Strategy</Link>
                  <Link to="/privacy-policy" className="text-primary hover:underline hover:text-primary/80 transition-colors">Privacy Policy</Link>
                  <Link to="/terms-of-service" className="text-secondary hover:underline hover:text-secondary/80 transition-colors">Terms of Service</Link>
                  <Link to="/about" className="text-comic-blue hover:underline hover:text-comic-blue/80 transition-colors">About Us</Link>
                  <Link to="/contact" className="text-comic-green hover:underline hover:text-comic-green/80 transition-colors">Contact</Link>
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
