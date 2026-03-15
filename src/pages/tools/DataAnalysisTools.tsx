import { useState } from "react";
import { ArrowLeft, Search, Database, BarChart, Table, Cpu, Code } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import FAQSchema from "@/components/SEO/FAQSchema";

const toolData = [
  {
    name: "Microsoft Excel",
    category: "Spreadsheet",
    description: "The most widely used microsoft excel data analysis tool for basic to advanced calculations and data visualization.",
    volume: "2,400",
    difficulty: "50",
    icon: Table,
    keywords: ["excel", "microsoft excel data analysis tool"]
  },
  {
    name: "Tableau",
    category: "Business Intelligence",
    description: "One of the top data analysis tools tableau for interactive data visualization and business intelligence reporting.",
    volume: "720",
    difficulty: "38",
    icon: BarChart,
    keywords: ["tableau", "data analysis tools tableau"]
  },
  {
    name: "Python (Pandas/NumPy)",
    category: "Programming",
    description: "Essential tools for data analysis using Python, offering powerful libraries for data manipulation and statistical analysis.",
    volume: "1,900",
    difficulty: "47",
    icon: Code,
    keywords: ["python", "tools for data analysis"]
  },
  {
    name: "AI Automation Pipelines",
    category: "AI Tools",
    description: "Advanced ai tools for automating python data analysis pipelines, reducing manual work and increasing efficiency.",
    volume: "1,300",
    difficulty: "20",
    icon: Cpu,
    keywords: ["ai", "ai tools for automating python data analysis pipelines"]
  },
  {
    name: "Power BI",
    category: "Business Intelligence",
    description: "Comprehensive analytical tools for data analysis, providing deep insights through interactive dashboards.",
    volume: "590",
    difficulty: "43",
    icon: Database,
    keywords: ["power bi", "analytical tools for data analysis"]
  }
];

const DataAnalysisTools = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = toolData.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEOHead 
        title="Best Data Analysis Tools 2026 | Free Guide & Comparison"
        description="Explore the best tools for data analysis in 2026. From Microsoft Excel and Tableau to AI tools for automating Python pipelines. Compare search volume and difficulty."
        keywords="data analysis tools, data analysis tool, tools for data analysis, ai tools for data analysis, microsoft excel data analysis tool"
      />

      <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Link>

      <div className="text-center mb-12">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-4">
          Best Data Analysis Tools 2026
        </h1>
        <p className="text-xl text-muted-foreground font-bold max-w-2xl mx-auto">
          The ultimate guide to selecting the right data analysis tool for your business, research, or personal projects.
        </p>
      </div>

      <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search for tools data analysis (e.g. Excel, Tableau, AI tools)..."
            className="w-full border-2 border-border rounded-xl pl-12 pr-4 py-4 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredTools.map((tool) => (
          <div key={tool.name} className="bg-card border-4 border-border rounded-2xl p-6 hover:border-comic-blue transition-all group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-muted rounded-xl group-hover:bg-comic-blue group-hover:text-white transition-colors">
                <tool.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-foreground">{tool.name}</h3>
                <span className="text-xs font-bold text-comic-blue uppercase">{tool.category}</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 font-medium">{tool.description}</p>
            <div className="flex gap-4">
              <div className="text-xs font-bold">
                <span className="text-muted-foreground">Volume:</span> {tool.volume}
              </div>
              <div className="text-xs font-bold">
                <span className="text-muted-foreground">KD:</span> {tool.difficulty}
              </div>
            </div>
          </div>
        ))}
      </div>

      

      <div className="prose prose-comic max-w-none mb-12">
        <h2 className="comic-heading text-3xl mb-6">Why You Need Proper Tools of Data Analysis</h2>
        <p className="font-medium text-lg mb-4">
          In 2026, the landscape of <strong>data analysis tools</strong> has evolved significantly. 
          Whether you are looking for a simple <strong>data analysis tool</strong> like Excel or complex 
          <strong>ai tools for automating python data analysis pipelines</strong>, the goal remains the same: 
          turning raw data into actionable insights.
        </p>
        
        <h3 className="text-2xl font-bold mb-4">Top Categories for Data Analysis</h3>
        <ul className="list-disc pl-6 space-y-2 font-medium">
          <li><strong>Spreadsheets:</strong> Still dominated by the <strong>microsoft excel data analysis tool</strong>, perfect for quick calculations.</li>
          <li><strong>Business Intelligence:</strong> Powerful <strong>data analysis tools tableau</strong> and Power BI for enterprise-level reporting.</li>
          <li><strong>Programming & AI:</strong> The rise of <strong>ai tools for data analysis</strong> has made Python-based workflows more accessible.</li>
          <li><strong>Analytical Suites:</strong> Specialized <strong>analytical tools for data analysis</strong> for statistical and scientific research.</li>
        </ul>
      </div>

      <SEOSection 
        title="SEO Strategy for Data Analysis Tools"
        description="Our data-driven SEO strategy focuses on high-volume keywords like 'tools for data analysis' and emerging trends like 'ai tools for automating python data analysis pipelines' to capture maximum search intent."
      />

      <FAQSchema 
        faqs={[
          {
            question: "What are the best tools for data analysis in 2026?",
            answer: "The best tools include Microsoft Excel for spreadsheets, Tableau for BI, Python for programming, and new AI-driven automation pipelines for advanced workflows."
          },
          {
            question: "Is Microsoft Excel still a good data analysis tool?",
            answer: "Yes, the microsoft excel data analysis tool remains a staple for most businesses due to its versatility and widespread use."
          },
          {
            question: "Which data analysis tools tableau is best for beginners?",
            answer: "Tableau Public is a great free version for beginners to start learning data visualization."
          }
        ]}
      />
    </div>
  );
};

export default DataAnalysisTools;
