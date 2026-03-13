import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link to="/" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-8 text-center">Terms of Service</h1>

            <div className="comic-card space-y-6 text-muted-foreground typography-base">
                <p><strong>Effective Date:</strong> March 2026</p>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">1. Agreement to Terms</h2>
                    <p>By accessing or using WebInsight Pro, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our website or use our tools.</p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">2. Description of Service</h2>
                    <p>WebInsight Pro provides various SEO, performance, and utility tools for webmasters and users. We reserve the right to modify, suspend, or discontinue any tool or feature without prior notice. Our free tools are provided "as is" and our premium tools require an active subscription.</p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">3. Acceptable Use</h2>
                    <p>When using our site, you agree not to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Use our tools for any illegal or unauthorized purpose.</li>
                        <li>Attempt to hack, destabilize, or exploit any vulnerabilities of the website.</li>
                        <li>Automate requests (scraping, bots) to our tools without explicit permission or API access.</li>
                        <li>Violate any laws in your jurisdiction (including but not limited to copyright laws).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">4. Accounts and Subscriptions</h2>
                    <p>If you create an account, you are responsible for maintaining the security of your account and password. We cannot and will not be liable for any loss or damage from your failure to comply with this security obligation. </p>
                    <p className="mt-2">Premium subscriptions are billed in advance on a monthly or annual basis and are non-refundable unless legally required.</p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">5. Disclaimer of Warranties</h2>
                    <p>The calculators, audits, and tools provided by WebInsight Pro (e.g., ad revenue estimators, SEO scores) offer estimated values based on algorithms and publicly available data. They do not constitute financial or professional advice. We make no warranties regarding the accuracy, reliability, or completeness of the expected results.</p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">6. Limitation of Liability</h2>
                    <p>In no event shall WebInsight Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">7. Changes</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">8. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us through our Contact Us page.</p>
                </section>
            </div>
        </div>
    );
};

export default TermsOfService;
