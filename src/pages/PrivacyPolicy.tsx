import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <SEOHead
                title="Privacy Policy - WebInsight Pro"
                description="Read the WebInsight Pro Privacy Policy to understand how we collect, use, and protect your data, including our use of Google AdSense and cookies."
                keywords="privacy policy, webinsight pro, data privacy, google adsense, cookies"
            />
            <Link to="/" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="comic-heading text-4xl md:text-5xl text-foreground mb-8 text-center">Privacy Policy</h1>

            <div className="comic-card space-y-6 text-muted-foreground typography-base">
                <p><strong>Effective Date:</strong> March 1, 2026</p>
                <p>
                    This Privacy Policy explains how <strong>WebInsight Pro</strong> ("we", "us", or "our"), operating at{" "}
                    <strong>https://webinsightpro.site/</strong>, collects, uses, and protects information when you use our website.
                    By using our website, you consent to the practices described in this policy.
                </p>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">1. Information We Collect</h2>
                    <p>Because most of our tools run entirely in your browser (client-side), we collect very little personal information:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Usage Data:</strong> We use <strong>Google Analytics</strong> to collect anonymized data about page views,
                            session duration, and interactions. This helps us improve our tools and user experience.
                        </li>
                        <li>
                            <strong>Input Data:</strong> Data you enter into our tools (such as URLs for SEO Audit or Traffic Checker) is
                            processed temporarily in your browser or via third-party APIs to return results. We do not store your input
                            persistently unless you explicitly sign up and save a report.
                        </li>
                        <li>
                            <strong>Account Data:</strong> If you create an account, we store your email address and a securely hashed
                            password via Supabase authentication services. We do not store plain-text passwords.
                        </li>
                        <li>
                            <strong>Contact Data:</strong> If you contact us via email, we retain your email address and message content
                            only for the purpose of responding to your inquiry.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">2. How We Use Your Information</h2>
                    <p>The information we collect is used solely to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Provide, operate, and maintain the website and its tools.</li>
                        <li>Improve, personalize, and expand our website's functionality based on anonymized usage patterns.</li>
                        <li>Understand and analyze how visitors use our website to fix bugs and improve UX.</li>
                        <li>Communicate with you for customer support, account notices, or updates you have requested.</li>
                        <li>Serve relevant advertisements (see Section 4 on Google AdSense below).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">3. Cookies and Web Beacons</h2>
                    <p>
                        We use cookies to enhance your browsing experience, analyze site traffic, and display
                        personalized advertisements. When you first visit our site, you will be shown a cookie consent banner.
                        You may <strong>Accept</strong> or <strong>Decline</strong> non-essential cookies.
                    </p>
                    <p className="mt-2">
                        If you decline cookies, essential site functionality will still work, but personalized ads and some analytics
                        features may be disabled.
                    </p>
                    <p className="mt-2">
                        You can also control cookies at any time through your browser settings. Most browsers allow you to refuse
                        cookies or delete existing ones. Please note that blocking all cookies may affect site functionality.
                    </p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">4. Google AdSense &amp; Advertising</h2>
                    <p>
                        We use <strong>Google AdSense</strong> to display advertisements on our site. Google AdSense is a service
                        provided by Google LLC. Through AdSense, Google and its partners may use cookies and web beacons to:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Serve ads based on your prior visits to our website or other websites on the internet.</li>
                        <li>
                            Use the <strong>DoubleClick DART cookie</strong> to serve ads to visitors based on their visit to
                            webinsightpro.site and other sites on the internet.
                        </li>
                        <li>Measure the effectiveness and performance of advertisements.</li>
                    </ul>
                    <p className="mt-3">
                        Google's use of advertising cookies enables it and its partners to serve ads to our users based on their
                        visit to our site and/or other sites on the Internet.
                    </p>
                    <p className="mt-3">
                        You may opt out of personalised advertising by visiting{" "}
                        <a
                            href="https://www.google.com/settings/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                        >
                            Google Ad Settings
                        </a>{" "}
                        or by visiting{" "}
                        <a
                            href="https://www.aboutads.info/choices/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                        >
                            aboutads.info/choices
                        </a>
                        . You may also opt out of a third-party vendor's use of cookies by visiting the{" "}
                        <a
                            href="https://optout.networkadvertising.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                        >
                            Network Advertising Initiative opt-out page
                        </a>.
                    </p>
                    <p className="mt-3">
                        For more information about how Google uses data from sites that use its advertising services, please visit:{" "}
                        <a
                            href="https://policies.google.com/technologies/partner-sites"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                        >
                            policies.google.com/technologies/partner-sites
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">5. Third-Party Services</h2>
                    <p>
                        Our website may integrate with third-party services including but not limited to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li><strong>Google Analytics</strong> – for anonymous traffic analysis.</li>
                        <li><strong>Google AdSense</strong> – for displaying advertisements.</li>
                        <li><strong>Supabase</strong> – for user authentication and report storage.</li>
                    </ul>
                    <p className="mt-3">
                        These third-party services have their own privacy policies governing how they use information. We advise you to
                        review their policies:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                                Google Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                                Supabase Privacy Policy
                            </a>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">6. Data Retention</h2>
                    <p>
                        We retain personal data (such as account email addresses) only as long as your account is active or as needed
                        to provide you services. Anonymous analytics data is retained per Google Analytics' default retention settings.
                        If you wish to delete your account and associated data, please contact us at{" "}
                        <a href="mailto:support@webinsightpro.com" className="text-primary hover:underline font-bold">
                            support@webinsightpro.com
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">7. Children's Privacy</h2>
                    <p>
                        Our website is not directed to children under the age of 13. We do not knowingly collect personally
                        identifiable information from children under 13. If you are a parent or guardian and believe your child has
                        provided us with personal information, please contact us so we can take appropriate action.
                    </p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">8. Disclaimer</h2>
                    <p>
                        The tools and calculators on WebInsight Pro (such as traffic and revenue estimates) are based on algorithmic
                        models and publicly available data. They are for <strong>informational purposes only</strong> and do not
                        constitute financial, legal, or professional advice. We do not guarantee the accuracy of any results.
                    </p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">9. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
                        effective date. We encourage you to review this page periodically. Continued use of our website after any
                        changes constitutes your acceptance of the updated policy.
                    </p>
                </section>

                <section>
                    <h2 className="comic-heading text-2xl text-foreground mb-3">10. Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data,
                        please contact us at:{" "}
                        <a href="mailto:support@webinsightpro.com" className="text-primary hover:underline font-bold">
                            support@webinsightpro.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
