import { useParams, Link, Navigate } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { ArrowLeft, ExternalLink, Calendar, User } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    // Find the blog post based on slug
    const post = blogs.find(b => b.slug === slug);

    // Scroll to top when page opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return <Navigate to="/blog" replace />; // If URL is wrong, go back to Blog list
    }

    return (
        <div className="container mx-auto px-4 py-12 animate-slide-up max-w-4xl">
            <Helmet>
                <title>{post.title} | WebInsight Pro</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`https://webinsightpro.site/blog/${post.slug}`} />
                <meta property="og:title" content={`${post.title} | WebInsight Pro`} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:url" content={`https://webinsightpro.site/blog/${post.slug}`} />
                <meta name="twitter:title" content={`${post.title} | WebInsight Pro`} />
                <meta name="twitter:description" content={post.excerpt} />
            </Helmet>

            <Link
                to="/blog"
                className="inline-flex items-center gap-2 mb-8 text-muted-foreground font-bold hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to all articles
            </Link>

            <div className="comic-card p-8 md:p-12 bg-card">
                <h1 className="comic-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mb-10 pb-6 border-b-4 border-border">
                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                        <Calendar className="w-5 h-5 text-comic-blue" />
                        <time>{post.date}</time>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                        <User className="w-5 h-5 text-comic-orange" />
                        <span>{post.author}</span>
                    </div>
                </div>

                {/* Content Section rendered from HTML string */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none font-bold text-foreground overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <style dangerouslySetInnerHTML={{
                    __html: `
          .prose h3 {
            font-family: 'Bangers', cursive;
            font-size: 2rem;
            letter-spacing: 0.05em;
            color: hsl(var(--foreground));
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .prose p {
            margin-bottom: 1.5rem;
            color: hsl(var(--muted-foreground));
          }
          .prose ul, .prose ol {
            margin-bottom: 2rem;
            padding-left: 2rem;
            color: hsl(var(--muted-foreground));
          }
          .prose li {
            margin-bottom: 0.5rem;
          }
          .prose strong {
            color: hsl(var(--foreground));
          }
        `}} />

                <div className="mt-12 pt-8 border-t-4 border-border text-center">
                    <h3 className="comic-heading text-3xl mb-4 text-foreground">
                        Try The Tool Now
                    </h3>
                    <p className="font-bold text-muted-foreground mb-6">
                        Put the reading into practice and see the results instantly for completely free.
                    </p>
                    <Link
                        to={post.toolUrl}
                        className="comic-btn bg-primary text-primary-foreground inline-flex items-center gap-3 text-lg px-8 py-4"
                    >
                        Open Related Tool
                        <ExternalLink className="w-6 h-6" strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
