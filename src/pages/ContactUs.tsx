import { ArrowLeft, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEOHead from "@/components/SEO/SEOHead";

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("General Inquiry");
    const [message, setMessage] = useState("");

    // Build a mailto link so the form actually sends an email — fully functional & AdSense-compliant
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoSubject = encodeURIComponent(`[${subject}] - ${name}`);
        const mailtoBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:support@webinsightpro.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <SEOHead
                title="Contact Us - WebInsight Pro"
                description="Get in touch with the WebInsight Pro team. We're here to help with questions, feedback, bug reports, and partnership inquiries."
                keywords="contact webinsight pro, support, feedback, partnership"
            />
            <Link to="/" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-4 text-center">Contact Us</h1>
            <p className="text-muted-foreground text-center mb-10 text-lg">Have a question or feedback? We'd love to hear from you!</p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="comic-card space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-full border-2 border-foreground flex-shrink-0">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Email Support</h3>
                            <p className="text-muted-foreground mb-2 text-sm">For inquiries, partnerships, and technical support.</p>
                            <a
                                href="mailto:support@webinsightpro.com"
                                className="font-bold text-primary hover:underline block break-all"
                            >
                                support@webinsightpro.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary/20 rounded-full border-2 border-foreground flex-shrink-0">
                            <Clock className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Response Time</h3>
                            <p className="text-muted-foreground text-sm">We typically respond within <strong>24–48 hours</strong> on business days.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-comic-green/20 rounded-full border-2 border-foreground flex-shrink-0">
                            <MapPin className="w-6 h-6 text-comic-green" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Location</h3>
                            <p className="text-muted-foreground text-sm">We are a remote-first team providing tools globally.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-comic-blue/20 rounded-full border-2 border-foreground flex-shrink-0">
                            <MessageSquare className="w-6 h-6 text-comic-blue" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">What to Include</h3>
                            <ul className="text-muted-foreground text-sm list-disc pl-4 space-y-1 mt-1">
                                <li>Your name and the tool you're using</li>
                                <li>A clear description of your question or issue</li>
                                <li>Any relevant URLs or screenshots</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Form — opens native email client */}
                <div className="comic-card">
                    <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
                    <p className="text-sm text-muted-foreground mb-5 font-bold">
                        Fill in the form and click Send — it will open your email client with the details pre-filled.
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="contact-name">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                className="comic-input w-full"
                                placeholder="Your name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                className="comic-input w-full"
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="contact-subject">Subject</label>
                            <select
                                id="contact-subject"
                                className="comic-input w-full"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            >
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Feature Request</option>
                                <option>Bug Report</option>
                                <option>Partnership / Ads</option>
                                <option>Account Issue</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                className="comic-input w-full min-h-[120px]"
                                placeholder="How can we help you?"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="comic-btn w-full justify-center bg-primary text-primary-foreground">
                            ✉️ Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
