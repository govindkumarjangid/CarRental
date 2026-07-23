import React from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Users,
  ShieldCheck,
  Sparkles,
  Car,
  Globe2,
  CheckCircle2,
  Lock,
  Layers,
  TrendingUp
} from 'lucide-react';

const About = () => {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
            <Layers size={14} />
            <span>Multi-Owner SaaS Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Empowering Independent Vehicle Owners & Customers Worldwide
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            We operate a next-generation technology marketplace platform connecting independent car owners and rental businesses directly with customers seeking reliable transportation.
          </p>
        </motion.div>

        {/* MARKETPLACE MODEL HIGHLIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden border border-slate-800"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <Building2 size={14} />
              <span>Technology Provider Notice</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Our Software Marketplace Architecture
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-white">CarRental is an intermediary technology platform.</strong> The platform itself does not own, lease, maintain, or operate any vehicles listed on the marketplace. All vehicles are independently owned, priced, and managed by verified third-party car owners and rental fleet operators.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/60">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">For Independent Owners</h4>
                  <p className="text-xs text-slate-300">Complete software suite to manage fleets, pricing, availability, and bookings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">For Customers</h4>
                  <p className="text-xs text-slate-300">Seamless browsing, verified listings, transparent pricing, and instant bookings.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MISSION & VISION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            <div className="size-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center font-bold">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To democratize the vehicle rental industry by providing scalable, high-performance software tools that enable independent vehicle owners to run profitable rental businesses while giving customers unprecedented access to diverse, well-maintained vehicles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To create the world's most trusted multi-owner mobility marketplace, fostering a borderless ecosystem where local entrepreneurs thrive and travelers enjoy frictionless, reliable transportation wherever they go.
            </p>
          </motion.div>
        </div>

        {/* CORE MARKETPLACE PILLARS */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Built for Scale, Built for Trust</h2>
            <p className="text-slate-500 text-sm">Key pillars driving our multi-owner vehicle marketplace.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="font-bold text-base text-slate-900">Multi-Owner Ecosystem</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empowers individual car owners, rental businesses, and commercial fleet managers to operate side-by-side.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-base text-slate-900">Identity & Vehicle Vetting</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strict administrative verification procedures for owner identity, driving licenses, and vehicle compliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="size-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <Lock size={20} />
              </div>
              <h4 className="font-bold text-base text-slate-900">Secure Payments</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bank-grade online payment gateway integrations with automated payout reconciliation and transparent booking receipts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Car size={20} />
              </div>
              <h4 className="font-bold text-base text-slate-900">Diverse Fleet Options</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Customers choose from economy compacts, luxury sedans, family SUVs, and specialized vehicles directly from local owners.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="size-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <h4 className="font-bold text-base text-slate-900">Owner Autonomy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Owners maintain full control over pricing per hour/day, maintenance blackout dates, cleaning schedules, and rental rules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="size-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Building2 size={20} />
              </div>
              <h4 className="font-bold text-base text-slate-900">Platform Moderation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Centralized platform administration monitors compliance, reviews user reports, and ensures legal standards are upheld.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
