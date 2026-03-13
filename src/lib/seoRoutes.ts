/**
 * SEO metadata for all routes — used for auto meta tags & sitemap.
 * Har tool page ko unique title/description milega = better indexing for 1M traffic scale.
 */
const BASE = "https://webinsightpro.site";

export interface RouteSEO {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  priority?: number;
  changefreq?: "daily" | "weekly" | "monthly";
}

const mainPages: RouteSEO[] = [
  { path: "/", title: "Free SEO Tools Online | Website Checker & Audit", description: "70+ free SEO tools — website checker, backlinks, keyword research, page speed, calculators. No signup.", priority: 1.0, changefreq: "weekly" },
  { path: "/tools", title: "All Free SEO Tools | 100+ Online Tools", description: "Browse 100+ free SEO, marketing, calculator & developer tools. All free, no signup.", priority: 0.95, changefreq: "weekly" },
  { path: "/seo-strategy", title: "SEO Strategy for 1 Million Daily Visitors", description: "4-phase roadmap to scale organic traffic. Technical SEO, content, backlinks, scalability.", priority: 0.9, changefreq: "monthly" },
  { path: "/about", title: "About WebInsight Pro", description: "Learn about WebInsight Pro — free SEO tools for everyone.", priority: 0.8, changefreq: "monthly" },
  { path: "/contact", title: "Contact WebInsight Pro", description: "Get in touch with WebInsight Pro support.", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", title: "SEO Blog & Guides | WebInsight Pro", description: "SEO tips, how-to guides, and digital marketing insights.", priority: 0.85, changefreq: "weekly" },
  { path: "/privacy-policy", title: "Privacy Policy", description: "WebInsight Pro privacy policy.", priority: 0.5, changefreq: "monthly" },
  { path: "/terms-of-service", title: "Terms of Service", description: "WebInsight Pro terms of service.", priority: 0.5, changefreq: "monthly" },
];

const toolPages: RouteSEO[] = [
  { path: "/tools/merge-pdf", title: "Merge PDF Tool | Free Online Tool", description: "Combine multiple PDFs. Use our free Merge PDF online without registration.", keywords: "merge pdf, free seo tools", priority: 0.9 },
  { path: "/tools/split-pdf", title: "Split PDF Tool | Free Online Tool", description: "Split PDF files easily. Use our free Split PDF online without registration.", keywords: "split pdf, free seo tools", priority: 0.9 },
  { path: "/tools/compress-pdf", title: "Compress PDF Tool | Free Online Tool", description: "Reduce PDF file size. Use our free Compress PDF online without registration.", keywords: "compress pdf, free seo tools", priority: 0.9 },
  { path: "/tools/pdf-to-word", title: "PDF to Word Tool | Free Online Tool", description: "Convert PDF to Word format. Use our free PDF to Word online without registration.", keywords: "pdf to word, free seo tools", priority: 0.9 },
  { path: "/tools/word-to-pdf", title: "Word to PDF Tool | Free Online Tool", description: "Convert Word documents to PDF. Use our free Word to PDF online without registration.", keywords: "word to pdf, free seo tools", priority: 0.9 },
  { path: "/tools/pdf-to-excel", title: "PDF to Excel Tool | Free Online Tool", description: "Convert PDF to Excel spreadsheet. Use our free PDF to Excel online without registration.", keywords: "pdf to excel, free seo tools", priority: 0.9 },
  { path: "/tools/excel-to-pdf", title: "Excel to PDF Tool | Free Online Tool", description: "Convert Excel sheets to PDF. Use our free Excel to PDF online without registration.", keywords: "excel to pdf, free seo tools", priority: 0.9 },
  { path: "/tools/pdf-to-ppt", title: "PDF to PPT Tool | Free Online Tool", description: "Convert PDF to PowerPoint. Use our free PDF to PPT online without registration.", keywords: "pdf to ppt, free seo tools", priority: 0.9 },
  { path: "/tools/ppt-to-pdf", title: "PPT to PDF Tool | Free Online Tool", description: "Convert PowerPoint to PDF. Use our free PPT to PDF online without registration.", keywords: "ppt to pdf, free seo tools", priority: 0.9 },
  { path: "/tools/pdf-to-jpg", title: "PDF to JPG Tool | Free Online Tool", description: "Convert PDF pages to JPG. Use our free PDF to JPG online without registration.", keywords: "pdf to jpg, free seo tools", priority: 0.9 },
  { path: "/tools/jpg-to-pdf", title: "JPG to PDF Tool | Free Online Tool", description: "Convert JPG to PDF. Use our free JPG to PDF online without registration.", keywords: "jpg to pdf, free seo tools", priority: 0.9 },
  { path: "/tools/png-to-pdf", title: "PNG to PDF Tool | Free Online Tool", description: "Convert PNG to PDF. Use our free PNG to PDF online without registration.", keywords: "png to pdf, free seo tools", priority: 0.9 },
  { path: "/tools/pdf-to-png", title: "PDF to PNG Tool | Free Online Tool", description: "Convert PDF pages to PNG. Use our free PDF to PNG online without registration.", keywords: "pdf to png, free seo tools", priority: 0.9 },
  { path: "/tools/rotate-pdf", title: "Rotate PDF Tool | Free Online Tool", description: "Rotate PDF pages. Use our free Rotate PDF online without registration.", keywords: "rotate pdf, free seo tools", priority: 0.9 },
  { path: "/tools/delete-pdf-pages", title: "Delete PDF Pages Tool | Free Online Tool", description: "Remove pages from PDF. Use our free Delete PDF Pages online without registration.", keywords: "delete pdf pages, free seo tools", priority: 0.9 },
  { path: "/tools/reorder-pdf-pages", title: "Reorder PDF Pages Tool | Free Online Tool", description: "Reorder pages in a PDF. Use our free Reorder PDF Pages online without registration.", keywords: "reorder pdf pages, free seo tools", priority: 0.9 },
  { path: "/tools/protect-pdf", title: "Protect PDF Tool | Free Online Tool", description: "Add password to PDF. Use our free Protect PDF online without registration.", keywords: "protect pdf, free seo tools", priority: 0.9 },
  { path: "/tools/unlock-pdf", title: "Unlock PDF Tool | Free Online Tool", description: "Remove password from PDF. Use our free Unlock PDF online without registration.", keywords: "unlock pdf, free seo tools", priority: 0.9 },
  { path: "/tools/add-watermark", title: "Add Watermark Tool | Free Online Tool", description: "Add watermark to PDF. Use our free Add Watermark online without registration.", keywords: "add watermark, free seo tools", priority: 0.9 },
  { path: "/tools/remove-watermark", title: "Remove Watermark Tool | Free Online Tool", description: "Remove watermark from PDF. Use our free Remove Watermark online without registration.", keywords: "remove watermark, free seo tools", priority: 0.9 },
  { path: "/tools/add-page-numbers", title: "Add Page Numbers Tool | Free Online Tool", description: "Add page numbers to PDF. Use our free Add Page Numbers online without registration.", keywords: "add page numbers, free seo tools", priority: 0.9 },
  { path: "/tools/edit-pdf", title: "Edit PDF Tool | Free Online Tool", description: "Edit PDF text and images. Use our free Edit PDF online without registration.", keywords: "edit pdf, free seo tools", priority: 0.9 },
  { path: "/tools/sign-pdf", title: "Sign PDF Tool | Free Online Tool", description: "Add signature to PDF. Use our free Sign PDF online without registration.", keywords: "sign pdf, free seo tools", priority: 0.9 },
  { path: "/tools/ocr-pdf", title: "OCR PDF Tool | Free Online Tool", description: "Make scanned PDFs searchable. Use our free OCR PDF online without registration.", keywords: "ocr pdf, free seo tools", priority: 0.9 },
  { path: "/tools/pdf-to-text", title: "PDF to Text Tool | Free Online Tool", description: "Extract text from PDF. Use our free PDF to Text online without registration.", keywords: "pdf to text, free seo tools", priority: 0.9 },
  { path: "/tools/image-compressor", title: "Image Compressor Tool | Free Online Tool", description: "Compress image file size. Use our free Image Compressor online without registration.", keywords: "image compressor, free seo tools", priority: 0.9 },
  { path: "/tools/image-resizer", title: "Image Resizer Tool | Free Online Tool", description: "Resize dimensions of images. Use our free Image Resizer online without registration.", keywords: "image resizer, free seo tools", priority: 0.9 },
  { path: "/tools/image-cropper", title: "Image Cropper Tool | Free Online Tool", description: "Crop images online. Use our free Image Cropper online without registration.", keywords: "image cropper, free seo tools", priority: 0.9 },
  { path: "/tools/image-converter", title: "Image Converter Tool | Free Online Tool", description: "Convert between image formats. Use our free Image Converter online without registration.", keywords: "image converter, free seo tools", priority: 0.9 },
  { path: "/tools/jpg-to-png", title: "JPG to PNG Tool | Free Online Tool", description: "Convert JPG to PNG. Use our free JPG to PNG online without registration.", keywords: "jpg to png, free seo tools", priority: 0.9 },
  { path: "/tools/png-to-jpg", title: "PNG to JPG Tool | Free Online Tool", description: "Convert PNG to JPG. Use our free PNG to JPG online without registration.", keywords: "png to jpg, free seo tools", priority: 0.9 },
  { path: "/tools/webp-converter", title: "WebP Converter Tool | Free Online Tool", description: "Convert images to WebP. Use our free WebP Converter online without registration.", keywords: "webp converter, free seo tools", priority: 0.9 },
  { path: "/tools/image-rotator", title: "Image Rotator Tool | Free Online Tool", description: "Rotate image files. Use our free Image Rotator online without registration.", keywords: "image rotator, free seo tools", priority: 0.9 },
  { path: "/tools/image-watermark", title: "Image Watermark Tool | Free Online Tool", description: "Add watermark to image. Use our free Image Watermark online without registration.", keywords: "image watermark, free seo tools", priority: 0.9 },
  { path: "/tools/remove-background", title: "Remove Background Tool | Free Online Tool", description: "Remove image background. Use our free Remove Background online without registration.", keywords: "remove background, free seo tools", priority: 0.9 },
  { path: "/tools/image-upscaler", title: "Image Upscaler Tool | Free Online Tool", description: "Upscale image resolution. Use our free Image Upscaler online without registration.", keywords: "image upscaler, free seo tools", priority: 0.9 },
  { path: "/tools/image-sharpen", title: "Image Sharpen Tool | Free Online Tool", description: "Sharpen blurry images. Use our free Image Sharpen online without registration.", keywords: "image sharpen, free seo tools", priority: 0.9 },
  { path: "/tools/image-blur", title: "Image Blur Tool Tool | Free Online Tool", description: "Blur images or faces. Use our free Image Blur Tool online without registration.", keywords: "image blur tool, free seo tools", priority: 0.9 },
  { path: "/tools/meme-generator", title: "Meme Generator Tool | Free Online Tool", description: "Create funny memes. Use our free Meme Generator online without registration.", keywords: "meme generator, free seo tools", priority: 0.9 },
  { path: "/tools/gif-maker", title: "GIF Maker Tool | Free Online Tool", description: "Create GIFs from images. Use our free GIF Maker online without registration.", keywords: "gif maker, free seo tools", priority: 0.9 },
  { path: "/tools/keyword-generator", title: "Keyword Generator Tool | Free Online Tool", description: "Generate SEO Keywords at scale. Use our free Keyword Generator online without registration.", keywords: "keyword generator, free seo tools", priority: 0.9 },
  { path: "/tools/keyword-density", title: "Keyword Density Checker Tool | Free Online Tool", description: "Check keyword density of text. Use our free Keyword Density Checker online without registration.", keywords: "keyword density checker, free seo tools", priority: 0.9 },
  { path: "/tools/meta-tag-generator", title: "Meta Tag Generator Tool | Free Online Tool", description: "Generate Meta Tags for SEO. Use our free Meta Tag Generator online without registration.", keywords: "meta tag generator, free seo tools", priority: 0.9 },
  { path: "/tools/meta-tag-analyzer", title: "Meta Tag Analyzer Tool | Free Online Tool", description: "Analyze Meta Tags of any site. Use our free Meta Tag Analyzer online without registration.", keywords: "meta tag analyzer, free seo tools", priority: 0.9 },
  { path: "/tools/robots-txt", title: "Robots.txt Generator Tool | Free Online Tool", description: "Generate robots.txt file. Use our free Robots.txt Generator online without registration.", keywords: "robots.txt generator, free seo tools", priority: 0.9 },
  { path: "/tools/sitemap", title: "Sitemap Generator Tool | Free Online Tool", description: "Generate XML Sitemap. Use our free Sitemap Generator online without registration.", keywords: "sitemap generator, free seo tools", priority: 0.9 },
  { path: "/tools/seo-audit", title: "SEO Audit Tool Tool | Free Online Tool", description: "Audit your website for SEO. Use our free SEO Audit Tool online without registration.", keywords: "seo audit tool, free seo tools", priority: 0.9 },
  { path: "/tools/page-speed", title: "Page Speed Checker Tool | Free Online Tool", description: "Check website load speed. Use our free Page Speed Checker online without registration.", keywords: "page speed checker, free seo tools", priority: 0.9 },
  { path: "/tools/backlinks", title: "Backlink Checker Tool | Free Online Tool", description: "Check backlinks for any URL. Use our free Backlink Checker online without registration.", keywords: "backlink checker, free seo tools", priority: 0.9 },
  { path: "/tools/domain-authority-checker", title: "Domain Authority Checker Tool | Free Online Tool", description: "Check DA of any domain. Use our free Domain Authority Checker online without registration.", keywords: "domain authority checker, free seo tools", priority: 0.9 },
  { path: "/tools/plagiarism-checker", title: "Plagiarism Checker Tool | Free Online Tool", description: "Check text for plagiarism. Use our free Plagiarism Checker online without registration.", keywords: "plagiarism checker, free seo tools", priority: 0.9 },
  { path: "/tools/grammar-checker", title: "Grammar Checker Tool | Free Online Tool", description: "Check text for grammar errors. Use our free Grammar Checker online without registration.", keywords: "grammar checker, free seo tools", priority: 0.9 },
  { path: "/tools/readability", title: "Readability Checker Tool | Free Online Tool", description: "Check content readability. Use our free Readability Checker online without registration.", keywords: "readability checker, free seo tools", priority: 0.9 },
  { path: "/tools/word-counter", title: "Word Counter Tool | Free Online Tool", description: "Count words, characters, sentences. Use our free Word Counter online without registration.", keywords: "word counter, free seo tools", priority: 0.9 },
  { path: "/tools/character-counter", title: "Character Counter Tool | Free Online Tool", description: "Count characters in text. Use our free Character Counter online without registration.", keywords: "character counter, free seo tools", priority: 0.9 },
  { path: "/tools/serp-preview", title: "SERP Preview Tool Tool | Free Online Tool", description: "Preview Google SERP snippet. Use our free SERP Preview Tool online without registration.", keywords: "serp preview tool, free seo tools", priority: 0.9 },
  { path: "/tools/title-tag-checker", title: "Title Tag Checker Tool | Free Online Tool", description: "Check webpage title tags. Use our free Title Tag Checker online without registration.", keywords: "title tag checker, free seo tools", priority: 0.9 },
  { path: "/tools/broken-links", title: "Broken Link Checker Tool | Free Online Tool", description: "Find broken links on a webpage. Use our free Broken Link Checker online without registration.", keywords: "broken link checker, free seo tools", priority: 0.9 },
  { path: "/tools/redirect-checker", title: "Redirect Checker Tool | Free Online Tool", description: "Check URL redirects. Use our free Redirect Checker online without registration.", keywords: "redirect checker, free seo tools", priority: 0.9 },
  { path: "/tools/mobile-friendly-test", title: "Mobile Friendly Test Tool | Free Online Tool", description: "Test mobile friendliness. Use our free Mobile Friendly Test online without registration.", keywords: "mobile friendly test, free seo tools", priority: 0.9 },
  { path: "/tools/youtube-video-downloader", title: "YouTube Video Downloader Tool | Free Online Tool", description: "Download YouTube Videos in HD. Use our free YouTube Video Downloader online without registration.", keywords: "youtube video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/youtube-thumbnail-downloader", title: "YouTube Thumbnail Downloader Tool | Free Online Tool", description: "Download YouTube Thumbnails. Use our free YouTube Thumbnail Downloader online without registration.", keywords: "youtube thumbnail downloader, free seo tools", priority: 0.9 },
  { path: "/tools/instagram-video-downloader", title: "Instagram Video Downloader Tool | Free Online Tool", description: "Download Instagram Videos. Use our free Instagram Video Downloader online without registration.", keywords: "instagram video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/instagram-reels-downloader", title: "Instagram Reels Downloader Tool | Free Online Tool", description: "Download Instagram Reels. Use our free Instagram Reels Downloader online without registration.", keywords: "instagram reels downloader, free seo tools", priority: 0.9 },
  { path: "/tools/instagram-story-downloader", title: "Instagram Story Downloader Tool | Free Online Tool", description: "Download Instagram Stories. Use our free Instagram Story Downloader online without registration.", keywords: "instagram story downloader, free seo tools", priority: 0.9 },
  { path: "/tools/facebook-video-downloader", title: "Facebook Video Downloader Tool | Free Online Tool", description: "Download Facebook videos. Use our free Facebook Video Downloader online without registration.", keywords: "facebook video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/twitter-video-downloader", title: "Twitter Video Downloader Tool | Free Online Tool", description: "Download Twitter videos. Use our free Twitter Video Downloader online without registration.", keywords: "twitter video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/tiktok-video-downloader", title: "TikTok Video Downloader Tool | Free Online Tool", description: "Download TikTok videos without watermark. Use our free TikTok Video Downloader online without registration.", keywords: "tiktok video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/pinterest-video-downloader", title: "Pinterest Video Downloader Tool | Free Online Tool", description: "Download Pinterest videos. Use our free Pinterest Video Downloader online without registration.", keywords: "pinterest video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/vimeo-video-downloader", title: "Vimeo Video Downloader Tool | Free Online Tool", description: "Download Vimeo videos. Use our free Vimeo Video Downloader online without registration.", keywords: "vimeo video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/dailymotion-video-downloader", title: "Dailymotion Downloader Tool | Free Online Tool", description: "Download Dailymotion videos. Use our free Dailymotion Downloader online without registration.", keywords: "dailymotion downloader, free seo tools", priority: 0.9 },
  { path: "/tools/soundcloud-downloader", title: "SoundCloud Downloader Tool | Free Online Tool", description: "Download SoundCloud audio. Use our free SoundCloud Downloader online without registration.", keywords: "soundcloud downloader, free seo tools", priority: 0.9 },
  { path: "/tools/spotify-downloader", title: "Spotify Downloader Tool | Free Online Tool", description: "Download Spotify tracks. Use our free Spotify Downloader online without registration.", keywords: "spotify downloader, free seo tools", priority: 0.9 },
  { path: "/tools/reddit-video-downloader", title: "Reddit Video Downloader Tool | Free Online Tool", description: "Download Reddit videos. Use our free Reddit Video Downloader online without registration.", keywords: "reddit video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/linkedin-video-downloader", title: "LinkedIn Video Downloader Tool | Free Online Tool", description: "Download LinkedIn videos. Use our free LinkedIn Video Downloader online without registration.", keywords: "linkedin video downloader, free seo tools", priority: 0.9 },
  { path: "/tools/json", title: "JSON Formatter Tool | Free Online Tool", description: "Format and Beautify JSON. Use our free JSON Formatter online without registration.", keywords: "json formatter, free seo tools", priority: 0.9 },
  { path: "/tools/json-validator", title: "JSON Validator Tool | Free Online Tool", description: "Validate JSON syntax. Use our free JSON Validator online without registration.", keywords: "json validator, free seo tools", priority: 0.9 },
  { path: "/tools/html-formatter", title: "HTML Formatter Tool | Free Online Tool", description: "Format HTML Code. Use our free HTML Formatter online without registration.", keywords: "html formatter, free seo tools", priority: 0.9 },
  { path: "/tools/css-minifier", title: "CSS Minifier Tool | Free Online Tool", description: "Minify CSS code. Use our free CSS Minifier online without registration.", keywords: "css minifier, free seo tools", priority: 0.9 },
  { path: "/tools/css-beautifier", title: "CSS Beautifier Tool | Free Online Tool", description: "Beautify CSS Code. Use our free CSS Beautifier online without registration.", keywords: "css beautifier, free seo tools", priority: 0.9 },
  { path: "/tools/js-minifier", title: "JavaScript Minifier Tool | Free Online Tool", description: "Minify JS code. Use our free JavaScript Minifier online without registration.", keywords: "javascript minifier, free seo tools", priority: 0.9 },
  { path: "/tools/js-beautifier", title: "JavaScript Beautifier Tool | Free Online Tool", description: "Beautify JS Code. Use our free JavaScript Beautifier online without registration.", keywords: "javascript beautifier, free seo tools", priority: 0.9 },
  { path: "/tools/sql-formatter", title: "SQL Formatter Tool | Free Online Tool", description: "Format SQL queries. Use our free SQL Formatter online without registration.", keywords: "sql formatter, free seo tools", priority: 0.9 },
  { path: "/tools/xml-formatter", title: "XML Formatter Tool | Free Online Tool", description: "Format XML Code. Use our free XML Formatter online without registration.", keywords: "xml formatter, free seo tools", priority: 0.9 },
  { path: "/tools/xml-validator", title: "XML Validator Tool | Free Online Tool", description: "Validate XML syntax. Use our free XML Validator online without registration.", keywords: "xml validator, free seo tools", priority: 0.9 },
  { path: "/tools/base64", title: "Base64 Encoder Tool | Free Online Tool", description: "Encode string to Base64. Use our free Base64 Encoder online without registration.", keywords: "base64 encoder, free seo tools", priority: 0.9 },
  { path: "/tools/base64-decoder", title: "Base64 Decoder Tool | Free Online Tool", description: "Decode Base64 string. Use our free Base64 Decoder online without registration.", keywords: "base64 decoder, free seo tools", priority: 0.9 },
  { path: "/tools/url-encoder", title: "URL Encoder Tool | Free Online Tool", description: "URL Encode string. Use our free URL Encoder online without registration.", keywords: "url encoder, free seo tools", priority: 0.9 },
  { path: "/tools/url-decoder", title: "URL Decoder Tool | Free Online Tool", description: "URL Decode string. Use our free URL Decoder online without registration.", keywords: "url decoder, free seo tools", priority: 0.9 },
  { path: "/tools/regex-tester", title: "Regex Tester Tool | Free Online Tool", description: "Test Regex Patterns. Use our free Regex Tester online without registration.", keywords: "regex tester, free seo tools", priority: 0.9 },
  { path: "/tools/word-counter", title: "Word Counter Tool | Free Online Tool", description: "Count Words and characters. Use our free Word Counter online without registration.", keywords: "word counter, free seo tools", priority: 0.9 },
  { path: "/tools/character-counter", title: "Character Counter Tool | Free Online Tool", description: "Count Characters easily. Use our free Character Counter online without registration.", keywords: "character counter, free seo tools", priority: 0.9 },
  { path: "/tools/case-converter", title: "Case Converter Tool | Free Online Tool", description: "Convert text case. Use our free Case Converter online without registration.", keywords: "case converter, free seo tools", priority: 0.9 },
  { path: "/tools/text-sorter", title: "Text Sorter Tool | Free Online Tool", description: "Sort text alphabetically. Use our free Text Sorter online without registration.", keywords: "text sorter, free seo tools", priority: 0.9 },
  { path: "/tools/text-repeater", title: "Text Repeater Tool | Free Online Tool", description: "Repeat text multiple times. Use our free Text Repeater online without registration.", keywords: "text repeater, free seo tools", priority: 0.9 },
  { path: "/tools/remove-duplicate-lines", title: "Remove Duplicate Lines Tool | Free Online Tool", description: "Remove duplicates from text. Use our free Remove Duplicate Lines online without registration.", keywords: "remove duplicate lines, free seo tools", priority: 0.9 },
  { path: "/tools/text-to-speech", title: "Text to Speech Tool | Free Online Tool", description: "Convert text into voice. Use our free Text to Speech online without registration.", keywords: "text to speech, free seo tools", priority: 0.9 },
  { path: "/tools/speech-to-text", title: "Speech to Text Tool | Free Online Tool", description: "Voice dictation software. Use our free Speech to Text online without registration.", keywords: "speech to text, free seo tools", priority: 0.9 },
  { path: "/tools/text-diff-checker", title: "Text Diff Checker Tool | Free Online Tool", description: "Compare text online. Use our free Text Diff Checker online without registration.", keywords: "text diff checker, free seo tools", priority: 0.9 },
  { path: "/tools/random-text-generator", title: "Random Text Generator Tool | Free Online Tool", description: "Generate random gibberish. Use our free Random Text Generator online without registration.", keywords: "random text generator, free seo tools", priority: 0.9 },
  { path: "/tools/length-converter", title: "Length Converter Tool | Free Online Tool", description: "Convert Length units. Use our free Length Converter online without registration.", keywords: "length converter, free seo tools", priority: 0.9 },
  { path: "/tools/weight-converter", title: "Weight Converter Tool | Free Online Tool", description: "Convert Mass/Weight units. Use our free Weight Converter online without registration.", keywords: "weight converter, free seo tools", priority: 0.9 },
  { path: "/tools/temperature-converter", title: "Temperature Converter Tool | Free Online Tool", description: "Celcius, Fahrenheit, Kelvin. Use our free Temperature Converter online without registration.", keywords: "temperature converter, free seo tools", priority: 0.9 },
  { path: "/tools/currency-converter", title: "Currency Converter Tool | Free Online Tool", description: "Convert Currencies in real time. Use our free Currency Converter online without registration.", keywords: "currency converter, free seo tools", priority: 0.9 },
  { path: "/tools/speed-converter", title: "Speed Converter Tool | Free Online Tool", description: "Convert speed units. Use our free Speed Converter online without registration.", keywords: "speed converter, free seo tools", priority: 0.9 },
  { path: "/tools/time-converter", title: "Time Converter Tool | Free Online Tool", description: "Convert time variables. Use our free Time Converter online without registration.", keywords: "time converter, free seo tools", priority: 0.9 },
  { path: "/tools/energy-converter", title: "Energy Converter Tool | Free Online Tool", description: "Convert Energy & Joules. Use our free Energy Converter online without registration.", keywords: "energy converter, free seo tools", priority: 0.9 },
  { path: "/tools/data-size-converter", title: "Data Size Converter Tool | Free Online Tool", description: "MBs to Bytes to GBs. Use our free Data Size Converter online without registration.", keywords: "data size converter, free seo tools", priority: 0.9 },
  { path: "/tools/angle-converter", title: "Angle Converter Tool | Free Online Tool", description: "Degrees to Radians etc. Use our free Angle Converter online without registration.", keywords: "angle converter, free seo tools", priority: 0.9 },
  { path: "/tools/volume-converter", title: "Volume Converter Tool | Free Online Tool", description: "Gallon, Litres, Quarts. Use our free Volume Converter online without registration.", keywords: "volume converter, free seo tools", priority: 0.9 },
  { path: "/tools/age-calculator", title: "Age Calculator Tool | Free Online Tool", description: "Calculate exact age. Use our free Age Calculator online without registration.", keywords: "age calculator, free seo tools", priority: 0.9 },
  { path: "/tools/emi-calculator", title: "EMI Calculator Tool | Free Online Tool", description: "Calculate loan EMI easily. Use our free EMI Calculator online without registration.", keywords: "emi calculator, free seo tools", priority: 0.9 },
  { path: "/tools/loan-calculator", title: "Loan Calculator Tool | Free Online Tool", description: "Find personal loan interest. Use our free Loan Calculator online without registration.", keywords: "loan calculator, free seo tools", priority: 0.9 },
  { path: "/tools/bmi-calculator", title: "BMI Calculator Tool | Free Online Tool", description: "Calculate Body Mass Index. Use our free BMI Calculator online without registration.", keywords: "bmi calculator, free seo tools", priority: 0.9 },
  { path: "/tools/percentage-calculator", title: "Percentage Calculator Tool | Free Online Tool", description: "Calculate percentage %. Use our free Percentage Calculator online without registration.", keywords: "percentage calculator, free seo tools", priority: 0.9 },
  { path: "/tools/discount-calculator", title: "Discount Calculator Tool | Free Online Tool", description: "Find sales discount prices. Use our free Discount Calculator online without registration.", keywords: "discount calculator, free seo tools", priority: 0.9 },
  { path: "/tools/gst-calculator", title: "GST Calculator Tool | Free Online Tool", description: "Calculate tax margins. Use our free GST Calculator online without registration.", keywords: "gst calculator, free seo tools", priority: 0.9 },
  { path: "/tools/salary-calculator", title: "Salary Calculator Tool | Free Online Tool", description: "Take home pay calculators. Use our free Salary Calculator online without registration.", keywords: "salary calculator, free seo tools", priority: 0.9 },
  { path: "/tools/profit-loss", title: "Profit Calculator Tool | Free Online Tool", description: "Calculate product profit margin. Use our free Profit Calculator online without registration.", keywords: "profit calculator, free seo tools", priority: 0.9 },
  { path: "/tools/time-calculator", title: "Time Calculator Tool | Free Online Tool", description: "Calculate time differentials. Use our free Time Calculator online without registration.", keywords: "time calculator, free seo tools", priority: 0.9 },
  { path: "/tools/password-generator", title: "Password Generator Tool | Free Online Tool", description: "Generate secure passwords. Use our free Password Generator online without registration.", keywords: "password generator, free seo tools", priority: 0.9 },
  { path: "/tools/password-strength", title: "Password Strength Checker Tool | Free Online Tool", description: "Check Password security level. Use our free Password Strength Checker online without registration.", keywords: "password strength checker, free seo tools", priority: 0.9 },
  { path: "/tools/md5-generator", title: "MD5 Generator Tool | Free Online Tool", description: "Generate MD5 Hash. Use our free MD5 Generator online without registration.", keywords: "md5 generator, free seo tools", priority: 0.9 },
  { path: "/tools/sha256-generator", title: "SHA256 Generator Tool | Free Online Tool", description: "Generate SHA256 Hash algorithm. Use our free SHA256 Generator online without registration.", keywords: "sha256 generator, free seo tools", priority: 0.9 },
  { path: "/tools/encryption-tool", title: "Encryption Tool Tool | Free Online Tool", description: "Encrypt text AES. Use our free Encryption Tool online without registration.", keywords: "encryption tool, free seo tools", priority: 0.9 },
  { path: "/tools/decryption-tool", title: "Decryption Tool Tool | Free Online Tool", description: "Decrypt ciphered text. Use our free Decryption Tool online without registration.", keywords: "decryption tool, free seo tools", priority: 0.9 },
  { path: "/tools/ip-lookup", title: "IP Lookup Tool | Free Online Tool", description: "Find location details of an IP. Use our free IP Lookup online without registration.", keywords: "ip lookup, free seo tools", priority: 0.9 },
  { path: "/tools/whois", title: "Whois Lookup Tool | Free Online Tool", description: "Check Domain Ownership details. Use our free Whois Lookup online without registration.", keywords: "whois lookup, free seo tools", priority: 0.9 },
  { path: "/tools/ssl-checker", title: "SSL Checker Tool | Free Online Tool", description: "Check SSL Certificates validity. Use our free SSL Checker online without registration.", keywords: "ssl checker, free seo tools", priority: 0.9 },
  { path: "/tools/malware-scanner", title: "Malware Scanner Tool | Free Online Tool", description: "Check links for malwares. Use our free Malware Scanner online without registration.", keywords: "malware scanner, free seo tools", priority: 0.9 },
  { path: "/tools/seo-audit", title: "Free SEO Audit Tool", description: "Run a free SEO audit on any website. Get SEO score, on-page analysis, and actionable recommendations.", keywords: "seo audit free, website seo checker, seo analyzer", priority: 0.95 },
  { path: "/tools/page-speed", title: "Page Speed Test", description: "Test website speed for desktop and mobile. Core Web Vitals, Lighthouse scores, optimization tips.", keywords: "page speed test, website speed checker, core web vitals", priority: 0.95 },
  { path: "/tools/meta-tags", title: "Meta Tag Generator", description: "Generate Open Graph and Twitter meta tags for social sharing.", keywords: "meta tag generator, og tags, twitter cards", priority: 0.9 },
  { path: "/tools/keyword-density", title: "Keyword Density Checker", description: "Analyze keyword density and usage in your content for SEO.", keywords: "keyword density, keyword analyzer, seo keywords", priority: 0.9 },
  { path: "/tools/word-counter", title: "Word Counter", description: "Count words, characters, sentences, and paragraphs. Free online word counter.", keywords: "word counter, character counter, paragraph counter", priority: 0.9 },
  { path: "/tools/serp-preview", title: "SERP Preview Tool", description: "Preview how your page will look in Google search results.", keywords: "serp preview, google snippet preview, meta preview", priority: 0.85 },
  { path: "/tools/gst-calculator", title: "GST Calculator India", description: "Add or remove GST from any amount. Free GST calculator for India.", keywords: "gst calculator, gst calculator india, add gst, remove gst", priority: 0.95 },
  { path: "/tools/income-tax", title: "Income Tax Calculator India", description: "Calculate income tax for Old vs New regime. Free income tax calculator India.", keywords: "income tax calculator, tax calculator india, old new regime", priority: 0.95 },
  { path: "/tools/emi-calculator", title: "EMI Calculator", description: "Calculate EMI for home loan, car loan, personal loan. Free EMI calculator.", keywords: "emi calculator, loan emi, home loan calculator", priority: 0.95 },
  { path: "/tools/bmi-calculator", title: "BMI Calculator", description: "Calculate Body Mass Index. Free BMI calculator with health status.", keywords: "bmi calculator, body mass index, bmi chart", priority: 0.95 },
  { path: "/tools/age-calculator", title: "Age Calculator", description: "Calculate exact age in years, months, and days. Free age calculator.", keywords: "age calculator, calculate age, exact age", priority: 0.9 },
  { path: "/tools/compound-interest", title: "Compound Interest Calculator", description: "Calculate compound interest and investment growth. Free compound interest calculator.", keywords: "compound interest calculator, investment calculator", priority: 0.95 },
  { path: "/tools/sip-calculator", title: "SIP Calculator", description: "Calculate SIP returns for mutual funds. Free SIP calculator.", keywords: "sip calculator, mutual fund sip, sip returns", priority: 0.9 },
  { path: "/tools/traffic-checker", title: "Website Traffic Checker", description: "Check estimated website traffic and ranking. Free traffic checker.", keywords: "website traffic checker, traffic estimator, site traffic", priority: 0.95 },
  { path: "/tools/backlinks", title: "Backlink Checker", description: "Check backlinks and referring domains for any website.", keywords: "backlink checker, backlinks free, referring domains", priority: 0.95 },
  { path: "/tools/keyword-planner", title: "Keyword Planner", description: "Find SEO keyword ideas and search volume. Free keyword planner.", keywords: "keyword planner, keyword research, seo keywords", priority: 0.9 },
  { path: "/tools/qr-code", title: "QR Code Generator", description: "Create QR codes for URLs, text, and more. Free QR code generator.", keywords: "qr code generator, create qr code, free qr code", priority: 0.9 },
  { path: "/tools/password", title: "Password Generator", description: "Generate strong, secure random passwords. Free password generator.", keywords: "password generator, strong password, random password", priority: 0.9 },
  { path: "/tools/json", title: "JSON Formatter", description: "Beautify, minify, and validate JSON. Free JSON formatter online.", keywords: "json formatter, json validator, beautify json", priority: 0.9 },
  { path: "/tools/ssl-checker", title: "SSL Checker", description: "Check SSL certificate validity and expiry. Free SSL checker.", keywords: "ssl checker, ssl certificate, https check", priority: 0.85 },
  { path: "/tools/sitemap", title: "Sitemap Generator", description: "Generate XML sitemap for your website. Free sitemap generator.", keywords: "sitemap generator, xml sitemap, create sitemap", priority: 0.85 },
  { path: "/tools/robots-txt", title: "Robots.txt Generator", description: "Generate robots.txt for your website. Free robots.txt generator.", keywords: "robots txt generator, robots.txt", priority: 0.85 },
  { path: "/tools/schema", title: "Schema Generator", description: "Generate JSON-LD schema markup. Free schema generator.", keywords: "schema generator, json-ld, structured data", priority: 0.85 },
  { path: "/tools/currency-converter", title: "Currency Converter", description: "Convert currencies with real-time exchange rates. Free currency converter.", keywords: "currency converter, exchange rate, forex", priority: 0.9 },
  { path: "/tools/grammar-checker", title: "Grammar Checker", description: "Check grammar, spelling, and writing style. Free grammar checker.", keywords: "grammar checker, spell check, writing tool", priority: 0.9 },
  { path: "/tools/blog-topic-generator", title: "Blog Topic Generator", description: "Generate blog topic ideas for SEO. Free blog topic generator.", keywords: "blog topic generator, content ideas, seo blog", priority: 0.9 },
  { path: "/tools/faq-generator", title: "FAQ Generator", description: "Generate FAQ schema and questions. Free FAQ generator.", keywords: "faq generator, faq schema, faq page", priority: 0.9 },
  { path: "/tools/youtube-keyword", title: "YouTube Keyword Tool", description: "Find YouTube keywords for video SEO. Free YouTube keyword tool.", keywords: "youtube keywords, video seo, youtube seo", priority: 0.9 },
  { path: "/tools/data-analysis-tools", title: "Best Data Analysis Tools 2026 | Free Guide & Comparison", description: "Explore the best tools for data analysis in 2026. From Microsoft Excel and Tableau to AI tools for automating Python pipelines.", keywords: "data analysis tools, data analysis tool, tools for data analysis, ai tools for data analysis, microsoft excel data analysis tool", priority: 0.95 },
];

// Fallback: slug -> title for any /tools/* path
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getRouteSEO(pathname: string): RouteSEO | null {
  const exact = [...mainPages, ...toolPages].find((r) => r.path === pathname);
  if (exact) return exact;
  if (pathname.startsWith("/tools/")) {
    const slug = pathname.replace("/tools/", "");
    return {
      path: pathname,
      title: `${slugToTitle(slug)} | Free Online Tool`,
      description: `Use our free ${slugToTitle(slug).toLowerCase()} tool online. No signup required.`,
      keywords: `${slug.replace(/-/g, " ")}, free online tool`,
      priority: 0.8,
      changefreq: "monthly",
    };
  }
  return null;
}

export function getAllRoutesForSitemap(): RouteSEO[] {
  return [...mainPages, ...toolPages];
}

export function getCanonicalUrl(path: string): string {
  return path === "/" ? BASE : `${BASE}${path}`;
}
