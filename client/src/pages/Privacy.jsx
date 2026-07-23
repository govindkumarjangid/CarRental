import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, Database, Globe, UserCheck, Building2, CheckCircle2 } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <div className="space-y-3 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
            <Lock size={14} />
            <span>Platform Privacy & Data Protection Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Last Updated: July 2026 ◉ Applies to Customers, Independent Vehicle Owners, and Platform Visitors.
          </p>
        </div>

        {/* OVERVIEW CARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" size={22} />
            <span>Our Commitment to Privacy</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            CarRental ("Platform") is committed to protecting the privacy, security, and integrity of all data collected from Customers, independent vehicle Owners, and Administrators. This Privacy Policy describes what information we collect, how it is processed, with whom it is shared, and your legal data rights under applicable data protection laws.
          </p>
        </div>

        {/* POLICY SECTIONS */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">

          {/* SECTION 1 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Information We Collect</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We collect different categories of information depending on your user role on the marketplace:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <UserCheck size={18} />
                  <span>Customer Information</span>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Full Name, Email Address, Phone Number.</li>
                  <li>Driving License details & government ID.</li>
                  <li>Booking history, pickup locations, rental duration.</li>
                  <li>Payment transaction metadata (processed via Razorpay).</li>
                </ul>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                  <Building2 size={18} />
                  <span>Owner Information</span>
                </div>
                <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Owner Profile & Business/Individual Registration.</li>
                  <li>Government Identification & Address Proof.</li>
                  <li>Vehicle Registration Certificates (RC) & Insurance.</li>
                  <li>Bank account payout details for earnings transfers.</li>
                </ul>
              </div>
            </div>

            <div className="p-5 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
              <p className="font-bold text-slate-900">Automatically Collected Technical & Device Data:</p>
              <p>
                Device IP addresses, browser types, operating systems, session duration, referral URLs, and cookie identifiers used for security, analytics, and session persistence.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>
              Collected information is processed solely for legitimate marketplace operations, including:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>Facilitating vehicle reservations, owner-customer messaging, and key handovers.</li>
              <li>Verifying driving license validity, owner vehicle documents, and identity authenticity.</li>
              <li>Processing online payment transactions, payouts, and issuing digital booking receipts.</li>
              <li>Detecting, preventing, and investigating fraud, unauthorized listings, or security incidents.</li>
              <li>Complying with statutory, tax, and law enforcement obligations.</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Third-Party Integrations & Service Providers</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We integrate with trusted third-party technology providers to power essential platform services:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Google Authentication:</strong> Provides single sign-on (SSO) login options. We process your basic public profile (name, email, avatar image).</li>
              <li><strong>Cloudinary:</strong> Used for secure hosting and delivery of vehicle photos, identity documents, and profile avatars.</li>
              <li><strong>Razorpay / Payment Providers:</strong> Handles encrypted online payment processing. Financial data (credit card numbers, UPI PINs) is processed directly by the PCI-DSS compliant gateway and is never stored on our servers.</li>
              <li><strong>Resend / Email Services:</strong> Dispatches transactional booking confirmations, welcome notifications, and password reset instructions.</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Cookies & Analytics</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              The Platform uses essential HTTP cookies and local storage tokens to keep you logged in securely, remember your interface preferences, and collect anonymous aggregate usage statistics. You can control or disable non-essential cookies in your browser settings.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">5</span>
              <span>Data Retention, Security & User Rights</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We employ industry-standard encryption protocols (TLS/SSL), restricted database access controls, and secure password hashing algorithms (bcrypt) to protect your information against unauthorized access, loss, or alteration. We retain personal data for as long as your account remains active or as required by commercial record-keeping laws. You have the right to inspect, update, export, or request deletion of your account data by contacting privacy@carrental.com.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">6</span>
              <span>Children's Privacy & Policy Updates</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our Platform is intended strictly for individuals aged 21 and above. We do not knowingly collect personal information from minors under the age of 18. We reserve the right to modify this Privacy Policy periodically. Significant updates will be communicated via email or platform announcements.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Privacy;
