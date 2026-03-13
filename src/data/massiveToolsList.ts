import { Bot, FileText, Image, Search, Download, Code, Type, ArrowRightLeft, Calculator, Shield, Wand2, BarChart } from "lucide-react";

export const massiveToolsList = [
    {
        title: "2️⃣ PDF Tools",
        tools: [
            { title: "Merge PDF", desc: "Combine multiple PDFs", icon: FileText, to: "/tools/merge-pdf", color: "bg-comic-red text-white" },
            { title: "Split PDF", desc: "Split PDF files easily", icon: FileText, to: "/tools/split-pdf", color: "bg-comic-blue text-white" },
            { title: "Compress PDF", desc: "Reduce PDF file size", icon: FileText, to: "/tools/compress-pdf", color: "bg-comic-green text-white" },
            { title: "PDF to Word", desc: "Convert PDF to Word format", icon: FileText, to: "/tools/pdf-to-word", color: "bg-comic-orange text-white" },
            { title: "Word to PDF", desc: "Convert Word documents to PDF", icon: FileText, to: "/tools/word-to-pdf", color: "bg-comic-purple text-white" },
            { title: "PDF to Excel", desc: "Convert PDF to Excel spreadsheet", icon: FileText, to: "/tools/pdf-to-excel", color: "bg-comic-red text-white" },
            { title: "Excel to PDF", desc: "Convert Excel sheets to PDF", icon: FileText, to: "/tools/excel-to-pdf", color: "bg-comic-blue text-white" },
            { title: "PDF to PPT", desc: "Convert PDF to PowerPoint", icon: FileText, to: "/tools/pdf-to-ppt", color: "bg-comic-green text-white" },
            { title: "PPT to PDF", desc: "Convert PowerPoint to PDF", icon: FileText, to: "/tools/ppt-to-pdf", color: "bg-comic-orange text-white" },
            { title: "PDF to JPG", desc: "Convert PDF pages to JPG", icon: FileText, to: "/tools/pdf-to-jpg", color: "bg-comic-purple text-white" },
            { title: "JPG to PDF", desc: "Convert JPG to PDF", icon: FileText, to: "/tools/jpg-to-pdf", color: "bg-comic-red text-white" },
            { title: "PNG to PDF", desc: "Convert PNG to PDF", icon: FileText, to: "/tools/png-to-pdf", color: "bg-comic-blue text-white" },
            { title: "PDF to PNG", desc: "Convert PDF pages to PNG", icon: FileText, to: "/tools/pdf-to-png", color: "bg-comic-green text-white" },
            { title: "Rotate PDF", desc: "Rotate PDF pages", icon: FileText, to: "/tools/rotate-pdf", color: "bg-comic-orange text-white" },
            { title: "Delete PDF Pages", desc: "Remove pages from PDF", icon: FileText, to: "/tools/delete-pdf-pages", color: "bg-comic-purple text-white" },
            { title: "Reorder PDF Pages", desc: "Reorder pages in a PDF", icon: FileText, to: "/tools/reorder-pdf-pages", color: "bg-comic-red text-white" },
            { title: "Protect PDF", desc: "Add password to PDF", icon: FileText, to: "/tools/protect-pdf", color: "bg-comic-blue text-white" },
            { title: "Unlock PDF", desc: "Remove password from PDF", icon: FileText, to: "/tools/unlock-pdf", color: "bg-comic-green text-white" },
            { title: "Add Watermark", desc: "Add watermark to PDF", icon: FileText, to: "/tools/add-watermark", color: "bg-comic-orange text-white" },
            { title: "Remove Watermark", desc: "Remove watermark from PDF", icon: FileText, to: "/tools/remove-watermark", color: "bg-comic-purple text-white" },
            { title: "Add Page Numbers", desc: "Add page numbers to PDF", icon: FileText, to: "/tools/add-page-numbers", color: "bg-comic-red text-white" },
            { title: "Edit PDF", desc: "Edit PDF text and images", icon: FileText, to: "/tools/edit-pdf", color: "bg-comic-blue text-white" },
            { title: "Sign PDF", desc: "Add signature to PDF", icon: FileText, to: "/tools/sign-pdf", color: "bg-comic-green text-white" },
            { title: "OCR PDF", desc: "Make scanned PDFs searchable", icon: FileText, to: "/tools/ocr-pdf", color: "bg-comic-orange text-white" },
            { title: "PDF to Text", desc: "Extract text from PDF", icon: FileText, to: "/tools/pdf-to-text", color: "bg-comic-purple text-white" }
        ]
    },
    {
        title: "3️⃣ Image Tools",
        tools: [
            { title: "Image Compressor", desc: "Compress image file size", icon: Image, to: "/tools/image-compressor", color: "bg-comic-red text-white" },
            { title: "Image Resizer", desc: "Resize dimensions of images", icon: Image, to: "/tools/image-resizer", color: "bg-comic-blue text-white" },
            { title: "Image Cropper", desc: "Crop images online", icon: Image, to: "/tools/image-cropper", color: "bg-comic-green text-white" },
            { title: "Image Converter", desc: "Convert between image formats", icon: Image, to: "/tools/image-converter", color: "bg-comic-orange text-white" },
            { title: "JPG to PNG", desc: "Convert JPG to PNG", icon: Image, to: "/tools/jpg-to-png", color: "bg-comic-purple text-white" },
            { title: "PNG to JPG", desc: "Convert PNG to JPG", icon: Image, to: "/tools/png-to-jpg", color: "bg-comic-red text-white" },
            { title: "WebP Converter", desc: "Convert images to WebP", icon: Image, to: "/tools/webp-converter", color: "bg-comic-blue text-white" },
            { title: "Image Rotator", desc: "Rotate image files", icon: Image, to: "/tools/image-rotator", color: "bg-comic-green text-white" },
            { title: "Image Watermark", desc: "Add watermark to image", icon: Image, to: "/tools/image-watermark", color: "bg-comic-orange text-white" },
            { title: "Remove Background", desc: "Remove image background", icon: Image, to: "/tools/remove-background", color: "bg-comic-purple text-white" },
            { title: "Image Upscaler", desc: "Upscale image resolution", icon: Image, to: "/tools/image-upscaler", color: "bg-comic-red text-white" },
            { title: "Image Sharpen", desc: "Sharpen blurry images", icon: Image, to: "/tools/image-sharpen", color: "bg-comic-blue text-white" },
            { title: "Image Blur Tool", desc: "Blur images or faces", icon: Image, to: "/tools/image-blur", color: "bg-comic-green text-white" },
            { title: "Meme Generator", desc: "Create funny memes", icon: Image, to: "/tools/meme-generator", color: "bg-comic-orange text-white" },
            { title: "GIF Maker", desc: "Create GIFs from images", icon: Image, to: "/tools/gif-maker", color: "bg-comic-purple text-white" }
        ]
    },
    {
        title: "4️⃣ SEO Tools",
        tools: [
            { title: "Keyword Generator", desc: "Generate SEO Keywords at scale", icon: Search, to: "/tools/keyword-generator", color: "bg-comic-red text-white" },
            { title: "Keyword Density Checker", desc: "Check keyword density of text", icon: Search, to: "/tools/keyword-density", color: "bg-comic-blue text-white" },
            { title: "Meta Tag Generator", desc: "Generate Meta Tags for SEO", icon: Search, to: "/tools/meta-tag-generator", color: "bg-comic-green text-white" },
            { title: "Meta Tag Analyzer", desc: "Analyze Meta Tags of any site", icon: Search, to: "/tools/meta-tag-analyzer", color: "bg-comic-orange text-white" },
            { title: "Robots.txt Generator", desc: "Generate robots.txt file", icon: Search, to: "/tools/robots-txt", color: "bg-comic-purple text-white" },
            { title: "Sitemap Generator", desc: "Generate XML Sitemap", icon: Search, to: "/tools/sitemap", color: "bg-comic-red text-white" },
            { title: "SEO Audit Tool", desc: "Audit your website for SEO", icon: Search, to: "/tools/seo-audit", color: "bg-comic-blue text-white" },
            { title: "Page Speed Checker", desc: "Check website load speed", icon: Search, to: "/tools/page-speed", color: "bg-comic-green text-white" },
            { title: "Backlink Checker", desc: "Check backlinks for any URL", icon: Search, to: "/tools/backlinks", color: "bg-comic-orange text-white" },
            { title: "Domain Authority Checker", desc: "Check DA of any domain", icon: Search, to: "/tools/domain-authority-checker", color: "bg-comic-purple text-white" },
            { title: "Plagiarism Checker", desc: "Check text for plagiarism", icon: Search, to: "/tools/plagiarism-checker", color: "bg-comic-red text-white" },
            { title: "Grammar Checker", desc: "Check text for grammar errors", icon: Search, to: "/tools/grammar-checker", color: "bg-comic-blue text-white" },
            { title: "Readability Checker", desc: "Check content readability", icon: Search, to: "/tools/readability", color: "bg-comic-green text-white" },
            { title: "Word Counter", desc: "Count words, characters, sentences", icon: Search, to: "/tools/word-counter", color: "bg-comic-orange text-white" },
            { title: "Character Counter", desc: "Count characters in text", icon: Search, to: "/tools/character-counter", color: "bg-comic-purple text-white" },
            { title: "SERP Preview Tool", desc: "Preview Google SERP snippet", icon: Search, to: "/tools/serp-preview", color: "bg-comic-red text-white" },
            { title: "Title Tag Checker", desc: "Check webpage title tags", icon: Search, to: "/tools/title-tag-checker", color: "bg-comic-blue text-white" },
            { title: "Broken Link Checker", desc: "Find broken links on a webpage", icon: Search, to: "/tools/broken-links", color: "bg-comic-green text-white" },
            { title: "Redirect Checker", desc: "Check URL redirects", icon: Search, to: "/tools/redirect-checker", color: "bg-comic-orange text-white" },
            { title: "Mobile Friendly Test", desc: "Test mobile friendliness", icon: Search, to: "/tools/mobile-friendly-test", color: "bg-comic-purple text-white" },
            { title: "Data Analysis Tools", desc: "Best data analysis tools guide", icon: BarChart, to: "/tools/data-analysis-tools", color: "bg-comic-red text-white" }
        ]
    },
    {
        title: "5️⃣ Downloader Tools ⚡",
        tools: [
            { title: "YouTube Video Downloader", desc: "Download YouTube Videos in 4K/MP3", icon: Download, to: "/tools/youtube-video-downloader", color: "bg-comic-red text-white" },
            { title: "Instagram Video Downloader", desc: "Download Instagram Videos & Reels", icon: Download, to: "/tools/instagram-video-downloader", color: "bg-comic-green text-white" },
        ]
    },
    {
        title: "6️⃣ Developer Tools",
        tools: [
            { title: "JSON Formatter", desc: "Format and Beautify JSON", icon: Code, to: "/tools/json", color: "bg-comic-red text-white" },
            { title: "JSON Validator", desc: "Validate JSON syntax", icon: Code, to: "/tools/json-validator", color: "bg-comic-blue text-white" },
            { title: "HTML Formatter", desc: "Format HTML Code", icon: Code, to: "/tools/html-formatter", color: "bg-comic-green text-white" },
            { title: "CSS Minifier", desc: "Minify CSS code", icon: Code, to: "/tools/css-minifier", color: "bg-comic-orange text-white" },
            { title: "CSS Beautifier", desc: "Beautify CSS Code", icon: Code, to: "/tools/css-beautifier", color: "bg-comic-purple text-white" },
            { title: "JavaScript Minifier", desc: "Minify JS code", icon: Code, to: "/tools/js-minifier", color: "bg-comic-red text-white" },
            { title: "JavaScript Beautifier", desc: "Beautify JS Code", icon: Code, to: "/tools/js-beautifier", color: "bg-comic-blue text-white" },
            { title: "SQL Formatter", desc: "Format SQL queries", icon: Code, to: "/tools/sql-formatter", color: "bg-comic-green text-white" },
            { title: "XML Formatter", desc: "Format XML Code", icon: Code, to: "/tools/xml-formatter", color: "bg-comic-orange text-white" },
            { title: "XML Validator", desc: "Validate XML syntax", icon: Code, to: "/tools/xml-validator", color: "bg-comic-purple text-white" },
            { title: "Base64 Encoder", desc: "Encode string to Base64", icon: Code, to: "/tools/base64", color: "bg-comic-red text-white" },
            { title: "Base64 Decoder", desc: "Decode Base64 string", icon: Code, to: "/tools/base64-decoder", color: "bg-comic-blue text-white" },
            { title: "URL Encoder", desc: "URL Encode string", icon: Code, to: "/tools/url-encoder", color: "bg-comic-green text-white" },
            { title: "URL Decoder", desc: "URL Decode string", icon: Code, to: "/tools/url-decoder", color: "bg-comic-orange text-white" },
            { title: "Regex Tester", desc: "Test Regex Patterns", icon: Code, to: "/tools/regex-tester", color: "bg-comic-purple text-white" }
        ]
    },
    {
        title: "7️⃣ Text Tools",
        tools: [
            { title: "Word Counter", desc: "Count Words and characters", icon: Type, to: "/tools/word-counter", color: "bg-comic-red text-white" },
            { title: "Character Counter", desc: "Count Characters easily", icon: Type, to: "/tools/character-counter", color: "bg-comic-blue text-white" },
            { title: "Case Converter", desc: "Convert text case", icon: Type, to: "/tools/case-converter", color: "bg-comic-green text-white" },
            { title: "Text Sorter", desc: "Sort text alphabetically", icon: Type, to: "/tools/text-sorter", color: "bg-comic-orange text-white" },
            { title: "Text Repeater", desc: "Repeat text multiple times", icon: Type, to: "/tools/text-repeater", color: "bg-comic-purple text-white" },
            { title: "Remove Duplicate Lines", desc: "Remove duplicates from text", icon: Type, to: "/tools/remove-duplicate-lines", color: "bg-comic-red text-white" },
            { title: "Text to Speech", desc: "Convert text into voice", icon: Type, to: "/tools/text-to-speech", color: "bg-comic-blue text-white" },
            { title: "Speech to Text", desc: "Voice dictation software", icon: Type, to: "/tools/speech-to-text", color: "bg-comic-green text-white" },
            { title: "Text Diff Checker", desc: "Compare text online", icon: Type, to: "/tools/text-diff-checker", color: "bg-comic-orange text-white" },
            { title: "Random Text Generator", desc: "Generate random gibberish", icon: Type, to: "/tools/random-text-generator", color: "bg-comic-purple text-white" }
        ]
    },
    {
        title: "8️⃣ Converter Tools",
        tools: [
            { title: "Length Converter", desc: "Convert Length units", icon: ArrowRightLeft, to: "/tools/length-converter", color: "bg-comic-red text-white" },
            { title: "Weight Converter", desc: "Convert Mass/Weight units", icon: ArrowRightLeft, to: "/tools/weight-converter", color: "bg-comic-blue text-white" },
            { title: "Temperature Converter", desc: "Celcius, Fahrenheit, Kelvin", icon: ArrowRightLeft, to: "/tools/temperature-converter", color: "bg-comic-green text-white" },
            { title: "Currency Converter", desc: "Convert Currencies in real time", icon: ArrowRightLeft, to: "/tools/currency-converter", color: "bg-comic-orange text-white" },
            { title: "Speed Converter", desc: "Convert speed units", icon: ArrowRightLeft, to: "/tools/speed-converter", color: "bg-comic-purple text-white" },
            { title: "Time Converter", desc: "Convert time variables", icon: ArrowRightLeft, to: "/tools/time-converter", color: "bg-comic-red text-white" },
            { title: "Energy Converter", desc: "Convert Energy & Joules", icon: ArrowRightLeft, to: "/tools/energy-converter", color: "bg-comic-blue text-white" },
            { title: "Data Size Converter", desc: "MBs to Bytes to GBs", icon: ArrowRightLeft, to: "/tools/data-size-converter", color: "bg-comic-green text-white" },
            { title: "Angle Converter", desc: "Degrees to Radians etc", icon: ArrowRightLeft, to: "/tools/angle-converter", color: "bg-comic-orange text-white" },
            { title: "Volume Converter", desc: "Gallon, Litres, Quarts", icon: ArrowRightLeft, to: "/tools/volume-converter", color: "bg-comic-purple text-white" }
        ]
    },
    {
        title: "9️⃣ Calculator Tools",
        tools: [
            { title: "Age Calculator", desc: "Calculate exact age", icon: Calculator, to: "/tools/age-calculator", color: "bg-comic-red text-white" },
            { title: "EMI Calculator", desc: "Calculate loan EMI easily", icon: Calculator, to: "/tools/emi-calculator", color: "bg-comic-blue text-white" },
            { title: "Loan Calculator", desc: "Find personal loan interest", icon: Calculator, to: "/tools/loan-calculator", color: "bg-comic-green text-white" },
            { title: "BMI Calculator", desc: "Calculate Body Mass Index", icon: Calculator, to: "/tools/bmi-calculator", color: "bg-comic-orange text-white" },
            { title: "Percentage Calculator", desc: "Calculate percentage %", icon: Calculator, to: "/tools/percentage-calculator", color: "bg-comic-purple text-white" },
            { title: "Discount Calculator", desc: "Find sales discount prices", icon: Calculator, to: "/tools/discount-calculator", color: "bg-comic-red text-white" },
            { title: "GST Calculator", desc: "Calculate tax margins", icon: Calculator, to: "/tools/gst-calculator", color: "bg-comic-blue text-white" },
            { title: "Salary Calculator", desc: "Take home pay calculators", icon: Calculator, to: "/tools/salary-calculator", color: "bg-comic-green text-white" },
            { title: "Profit Calculator", desc: "Calculate product profit margin", icon: Calculator, to: "/tools/profit-loss", color: "bg-comic-orange text-white" },
            { title: "Time Calculator", desc: "Calculate time differentials", icon: Calculator, to: "/tools/time-calculator", color: "bg-comic-purple text-white" }
        ]
    },
    {
        title: "🔟 Security Tools",
        tools: [
            { title: "Password Generator", desc: "Generate secure passwords", icon: Shield, to: "/tools/password-generator", color: "bg-comic-red text-white" },
            { title: "Password Strength Checker", desc: "Check Password security level", icon: Shield, to: "/tools/password-strength", color: "bg-comic-blue text-white" },
            { title: "MD5 Generator", desc: "Generate MD5 Hash", icon: Shield, to: "/tools/md5-generator", color: "bg-comic-green text-white" },
            { title: "SHA256 Generator", desc: "Generate SHA256 Hash algorithm", icon: Shield, to: "/tools/sha256-generator", color: "bg-comic-orange text-white" },
            { title: "Encryption Tool", desc: "Encrypt text AES", icon: Shield, to: "/tools/encryption-tool", color: "bg-comic-purple text-white" },
            { title: "Decryption Tool", desc: "Decrypt ciphered text", icon: Shield, to: "/tools/decryption-tool", color: "bg-comic-red text-white" },
            { title: "IP Lookup", desc: "Find location details of an IP", icon: Shield, to: "/tools/ip-lookup", color: "bg-comic-blue text-white" },
            { title: "Whois Lookup", desc: "Check Domain Ownership details", icon: Shield, to: "/tools/whois", color: "bg-comic-green text-white" },
            { title: "SSL Checker", desc: "Check SSL Certificates validity", icon: Shield, to: "/tools/ssl-checker", color: "bg-comic-orange text-white" },
            { title: "Malware Scanner", desc: "Check links for malwares", icon: Shield, to: "/tools/malware-scanner", color: "bg-comic-purple text-white" }
        ]
    }
];
