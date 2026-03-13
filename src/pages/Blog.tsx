import { Link } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { ArrowRight, BookOpen } from "lucide-react";

const Blog = () => {
    return (
        <div className="container mx-auto px-4 py-12 animate-slide-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="comic-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                    <span className="text-primary inline-block mr-3">🔥</span>
                    SEO Insights & Guides
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-bold">
                    Master Digital Marketing, boost your traffic, and learn how to use our free tools to dominate search rankings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {blogs.map((blog, index) => (
                    <div
                        key={blog.slug}
                        className="comic-card flex flex-col h-full bg-card"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="mb-4">
                            <span className="bg-primary/10 text-primary font-bold text-xs uppercase px-3 py-1 rounded-full border-2 border-primary">
                                {blog.date}
                            </span>
                        </div>

                        <h2 className="comic-heading text-2xl text-foreground mb-3 flex-grow">
                            {blog.title}
                        </h2>

                        <p className="text-muted-foreground font-bold mb-6 line-clamp-3">
                            {blog.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t-2 border-border flex items-center justify-between">
                            <span className="text-sm font-bold text-foreground">
                                By {blog.author}
                            </span>
                            <Link
                                to={`/blog/${blog.slug}`}
                                className="flex items-center gap-2 text-comic-blue font-bold hover:underline group"
                            >
                                Read Article
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))
                }
            </div >
        </div >
    );
};

export default Blog;
