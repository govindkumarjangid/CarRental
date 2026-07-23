import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, FileText, AlertTriangle, CheckCircle2, PhoneCall, Scale, Car, FileCheck } from 'lucide-react';

const Insurance = () => {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <div className="space-y-3 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 text-xs font-extrabold uppercase tracking-wider">
            <ShieldAlert size={14} />
            <span>Insurance & Vehicle Compliance Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Insurance & Safety Policy
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Mandatory disclosures regarding vehicle insurance, owner coverage, and emergency accident workflows.
          </p>
        </div>

        {/* CRITICAL DISCLAIMER BANNER */}
        <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
            <AlertTriangle size={22} className="text-rose-600 shrink-0" />
            <span>Platform Insurance Disclaimer</span>
          </div>
          <p className="text-xs sm:text-sm text-rose-950/80 leading-relaxed">
            CarRental ("Platform") is a SaaS software technology intermediary. The Platform does NOT own, operate, lease, or directly provide motor vehicle insurance policy coverage for any listed vehicle. Insurance coverage is provided solely by independent vehicle Owners or third-party commercial insurance carriers.
          </p>
        </div>

        {/* POLICY SECTIONS */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">

          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Owner Insurance Requirements</span>
            </h2>
            <p>
              Every independent Owner listing a vehicle on the Platform must maintain valid, active motor insurance coverage:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>Owners must maintain comprehensive or statutory third-party commercial/rental motor vehicle insurance as required by law in their jurisdiction.</li>
              <li>Proof of valid insurance must be uploaded to the Owner Dashboard during vehicle registration and kept up to date at all times.</li>
              <li>Vehicles with expired, canceled, or invalid insurance policies will be immediately unpublished from the marketplace.</li>
            </ul>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Customer Driving Coverage & Deductibles</span>
            </h2>
            <p>
              When a Customer reserves a vehicle through the Platform:
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>Rental coverage applies during the active booking window specified in the confirmed reservation.</li>
              <li>In the event of an accident or vehicle damage caused by Customer negligence or violation of traffic laws, the Customer is responsible for paying the policy deductible amount specified by the Owner.</li>
              <li>Damage resulting from unauthorized drivers, reckless driving, racing, driving under the influence (DUI), or off-roading voids insurance coverage completely, rendering the Customer 100% financially liable for all repair and replacement costs.</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Step-by-Step Accident & Breakdown Workflow</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              In the event of an accident, collision, breakdown, or vehicle damage during a rental trip, follow these mandatory steps immediately:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                  <PhoneCall size={18} />
                  <span>Step 1: Ensure Safety & Call Police</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Move to a safe location. If injured, call emergency services immediately. Contact local police to register an official Police FIR/Accident Report.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Car size={18} />
                  <span>Step 2: Notify Owner & Support</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Immediately notify the vehicle Owner via the Platform Chat and report the incident to Platform Support with photos of the damage and location.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                  <FileCheck size={18} />
                  <span>Step 3: Document Evidence</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Take clear photos and video recordings of all vehicle damage, license plates of involved parties, and third-party driver information.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Scale size={18} />
                  <span>Step 4: Insurance Claim Submission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Owner and their insurance provider will initiate the formal claim process using the police report, photos, and Platform trip records.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Platform Dispute Mediation</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If a dispute arises between an Owner and a Customer regarding damage responsibility, repair costs, or deductible payments, Platform Support will review the pre-trip and post-trip inspection photos, police reports, and timestamped chat logs to provide administrative mediation.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Insurance;
