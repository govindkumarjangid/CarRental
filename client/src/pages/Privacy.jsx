import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-15 py-20 text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: October 2023</p>

            <div className="space-y-6 text-base leading-relaxed">
                <p>
                    At CarRental, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information 
                    when you use our platform.
                </p>

                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, including your name, email address, phone number, driver's license details, 
                        and payment information. We also automatically collect device information, IP addresses, and browsing activity when you use our app.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
                    <p>
                        Your information is used to:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Facilitate vehicle bookings and payments.</li>
                        <li>Verify your identity and driving eligibility.</li>
                        <li>Communicate with you regarding your reservations.</li>
                        <li>Improve our platform's security and prevent fraud.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
                    <p>
                        We only share your information with verified vehicle owners to facilitate your booking. We do not sell your personal data 
                        to third-party marketers. We may share data with legal authorities if required by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking</h2>
                    <p>
                        Our platform uses cookies and similar tracking technologies to enhance user experience, analyze traffic, and personalize content. 
                        You can manage your cookie preferences through your browser settings.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal data. If you wish to exercise these rights, please contact 
                        our privacy team at privacy@carrental.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
