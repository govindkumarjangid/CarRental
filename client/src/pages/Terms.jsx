import React from 'react';
import { motion } from 'motion/react';
import { FileText, ShieldAlert, Scale, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

const Terms = () => {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <div className="space-y-3 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
            <Scale size={14} />
            <span>Commercial SaaS Marketplace Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service Agreement
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Last Updated: July 2026 ◉ Effective Date: Immediate upon account creation or marketplace access.
          </p>
        </div>

        {/* NOTICE CALLOUT */}
        <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <AlertTriangle size={18} className="text-amber-600 shrink-0" />
            <span>Marketplace Platform Intermediary Disclaimer</span>
          </div>
          <p className="text-xs text-amber-950/80 leading-relaxed">
            CarRental ("Platform") is an intermediary software technology provider that connects independent vehicle owners and rental businesses ("Owners") with verified individuals seeking vehicle rentals ("Customers"). The Platform does NOT own, operate, lease, or inspect any vehicles listed on the marketplace.
          </p>
        </div>

        {/* LEGAL SECTIONS */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">

          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Platform Definitions & Scope</span>
            </h2>
            <p>
              By accessing or creating an account on the Platform, you agree to comply with these Terms of Service. For the purposes of this Agreement:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Platform:</strong> The software infrastructure, website, mobile interfaces, APIs, and administrative marketplace services provided by CarRental.</li>
              <li><strong>Owner:</strong> An independent individual, commercial rental company, or fleet operator that lists vehicles on the Platform for rental.</li>
              <li><strong>Customer:</strong> A registered user who browses, reserves, or rents vehicles listed by Owners on the Platform.</li>
              <li><strong>Administrator:</strong> Authorized Platform representatives responsible for moderation, account verification, dispute resolution, and system maintenance.</li>
              <li><strong>Listing:</strong> A vehicle entry created by an Owner containing photos, pricing, location, specifications, and availability rules.</li>
            </ul>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Owner Responsibilities & Warranties</span>
            </h2>
            <p>
              Owners listing vehicles on the Platform represent, warrant, and covenant that:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>They possess lawful ownership or explicit legal authorization to list and rent out each registered vehicle.</li>
              <li>All listing data, vehicle specifications, location details, and hourly/daily rental prices are complete and accurate.</li>
              <li>Listed vehicles are legally registered, mechanically sound, roadworthy, clean, and regularly serviced in compliance with local motor vehicle regulations.</li>
              <li>They maintain valid, comprehensive commercial or rental vehicle insurance as required by law in their jurisdiction.</li>
              <li>They will honor all confirmed reservations accepted through the Platform and promptly update availability schedules to avoid double bookings.</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Customer Responsibilities & Driving Eligibility</span>
            </h2>
            <p>
              Customers reserving or operating vehicles through the Platform agree to the following obligations:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>Customers must be at least 21 years of age and hold an active, unexpired government-issued driving license.</li>
              <li>Customers must provide accurate identity verification details, including government ID and contact information upon request.</li>
              <li>Vehicles must be operated strictly in accordance with local traffic laws, and must NEVER be used for racing, off-roading, towing, illegal transport, or unauthorized third-party sub-leasing.</li>
              <li>Vehicles must be returned to the designated location at or before the agreed return time in the same condition as received.</li>
              <li>Customers are solely responsible for traffic fines, toll charges, fuel costs, and damages incurred during the active rental period.</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Platform Responsibilities & Role</span>
            </h2>
            <p>
              The Platform acts exclusively as a software marketplace facilitator. The Platform:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>Provides online account management, listing search, reservation processing, and message communication tools.</li>
              <li>Conducts basic administrative verification of Owner documents and Customer accounts.</li>
              <li>Reserves the right to moderate, unpublish, or delete listings, and suspend or terminate user accounts that violate Platform rules or applicable laws.</li>
              <li>Does NOT take custody, ownership, control, or operational management of any vehicle at any time.</li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">5</span>
              <span>Booking Rules, Cancellations & Refunds</span>
            </h2>
            <p>
              Bookings are finalized upon payment confirmation or owner acceptance through the Platform.
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Customer Cancellations:</strong> Cancellations made at least 24 hours prior to the scheduled pickup time receive a 100% full refund. Late cancellations made within 24 hours of pickup may be subject to a cancellation processing fee.</li>
              <li><strong>Owner Cancellations:</strong> If an Owner cancels a confirmed booking without valid emergency cause, the Customer receives a 100% full refund, and the Owner may be subject to platform reliability penalties or account suspension.</li>
              <li><strong>Late Returns:</strong> Unapproved late vehicle returns are subject to hourly late fees calculated at 1.5x the standard hourly rental rate.</li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">6</span>
              <span>Payments, Payouts & Disputes</span>
            </h2>
            <p>
              All financial transactions executed through the Platform are processed by authorized third-party payment gateways (including Razorpay).
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>Online booking payments are collected by the Platform gateway and disbursed to the Owner's verified bank account upon successful trip completion.</li>
              <li>Offline payment options are agreed upon directly between Customer and Owner, with the Platform serving only as the reservation booking recorder.</li>
              <li>In the event of a dispute regarding vehicle condition, payment discrepancies, or damage claims, users may submit evidence to Platform Support for administrative mediation.</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">7</span>
              <span>Limitation of Liability & Disclaimers</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CARRENTAL AND ITS OFFICERS, DIRECTORS, AND EMPLOYEES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING VEHICLE ACCIDENTS, PERSONAL INJURY, PROPERTY DAMAGE, MECHANICAL BREAKDOWNS, OR FINANCIAL LOSSES ARISING FROM THE USE OF THE PLATFORM OR VEHICLES LISTED BY THIRD-PARTY OWNERS. THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND.
            </p>
          </section>

          {/* SECTION 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">8</span>
              <span>Intellectual Property, Governing Law & Jurisdiction</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All software code, user interface designs, trademarks, brand logos, and database structures are the exclusive intellectual property of CarRental. These Terms shall be governed by and construed in accordance with local commercial and technology laws. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in the Platform's primary operating region.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Terms;
