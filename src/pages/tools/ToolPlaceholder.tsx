import { Link } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

const ToolPlaceholder = () => {
  const location = useLocation();
  const name = location.pathname.split("/").pop()?.replace(/-/g, " ") || "Tool";

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Construction className="w-16 h-16 text-comic-orange mx-auto mb-4" strokeWidth={3} />
      <h1 className="comic-heading text-4xl text-foreground mb-3 capitalize">{name}</h1>
      <p className="text-lg text-muted-foreground font-bold mb-6">This tool is coming soon! 🚧</p>
      <Link to="/tools" className="comic-btn bg-primary text-primary-foreground">← Back to Tools</Link>
        <div className="my-8"></div>
        </div>
  );
};

export default ToolPlaceholder;
