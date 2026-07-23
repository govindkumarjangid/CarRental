import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  UserCheck,
  Building2,
  HelpCircle,
  Mail,
  Phone,
  ShieldAlert,
  CreditCard,
  CalendarCheck,
  Key,
  MessageSquareText,
  CheckCircle2,
  FileCheck,
  BadgeDollarSign,
  Lock
} from 'lucide-react';
import AccordionItem from '../components/UI/AccordionItem.jsx';

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const [searchQuery, setSearchQuery] = useState('');

  const customerFaqs = [
    {
      question: "How do I register a Customer account?",
      answer: "Click the 'Login / Register' button at the top of the page. Enter your full name, email address, phone number, and password, or use Google One-Tap for instant registration. Customers must be at least 21 years old with a valid driving license."
    },
    {
      question: "How do I browse and book a vehicle from an Owner?",
      answer: "Navigate to the 'Cars' page, filter by location, vehicle category, or availability dates, and select your preferred vehicle. Choose your pickup/return times, select your payment method (Online Payment via Razorpay or Pay Offline), and confirm your reservation."
    },
    {
      question: "Can I cancel my reservation and get a refund?",
      answer: "Yes. Reservations cancelled at least 24 hours prior to the scheduled pickup time are eligible for a 100% full refund. Cancellations made within 24 hours of pickup may incur a nominal cancellation fee as defined in the Terms of Service."
    },
    {
      question: "What payment methods are supported on the platform?",
      answer: "We support secure online payments via Razorpay (Credit/Debit Cards, Net Banking, UPI, and Digital Wallets) as well as direct offline payments upon vehicle pickup, depending on the Owner's listing settings."
    },
    {
      question: "What should I do if the vehicle has an issue during my trip?",
      answer: "Contact the vehicle Owner immediately using the live in-app chat or phone support. For severe breakdowns or accidents, report the incident to Platform Support and follow our Insurance & Safety guidelines."
    }
  ];

  const ownerFaqs = [
    {
      question: "How do I register as an Owner and list my vehicle?",
      answer: "Switch your account to an Owner account or click 'Owner Dashboard'. Submit your business/individual details, upload your government-issued ID, registration documents, and vehicle photos. Once verified by Platform Administrators, your vehicle listing will go live."
    },
    {
      question: "Who sets vehicle pricing and availability?",
      answer: "Independent Owners have complete autonomy over their vehicles. You can set custom hourly rental rates, update vehicle status (Available, Cleaning, Maintenance), and block out dates whenever your car is unavailable."
    },
    {
      question: "What vehicle documents are required for approval?",
      answer: "Owners must upload a valid Vehicle Registration Certificate (RC), comprehensive commercial/rental insurance policy, pollution certificate (PUC), and fitness certificate where mandated by local motor vehicle laws."
    },
    {
      question: "How and when do Owners receive payouts?",
      answer: "For online bookings, payouts are automatically reconciled and transferred to your registered bank account following trip completion. For offline bookings, payments are collected directly by you upon key handover."
    },
    {
      question: "How do I handle booking requests and customer verification?",
      answer: "You can view all incoming reservations in your Owner Dashboard. You have direct access to verify customer identity documents and communicate via live chat prior to key handover."
    }
  ];

  const generalFaqs = [
    {
      question: "How do I reset my account password?",
      answer: "Click 'Login', select 'Forgot Password?', and enter your registered email address. You will receive an automated password reset link with step-by-step security instructions."
    },
    {
      question: "Is my personal data and document upload secure?",
      answer: "Yes. All personal information and government identity documents are encrypted in transit and stored in secure, restricted cloud environments via Cloudinary and enterprise database servers."
    },
    {
      question: "How do I report fraudulent listings or policy violations?",
      answer: "If you encounter inaccurate vehicle descriptions, unauthorized listings, or suspicious behavior, report the user or listing directly via the Help Center or email compliance@carrental.com. Platform Administrators investigate all reports within 24 hours."
    },
    {
      question: "Does the Platform own any of the listed vehicles?",
      answer: "No. The Platform provides SaaS technology and marketplace infrastructure. All vehicles are independently owned, maintained, and operated by third-party vehicle Owners and rental business operators."
    }
  ];

  const filterFaqs = (faqs) => {
    if (!searchQuery.trim()) return faqs;
    return faqs.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="w-full bg-slate-50/50 min-h-screen text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>Support & Help Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How Can We Assist You Today?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Comprehensive guides and FAQs for Customers, Independent Vehicle Owners, and Fleet Operators.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="absolute inset-y-0 left-0 pl-4 pt-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics (e.g. registration, payout, cancellation, insurance)..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium text-slate-800 transition-all"
            />
          </div>
        </div>

        {/* HOW IT WORKS STEPPER */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">How the Marketplace Works</h2>
            <p className="text-xs text-slate-500">Connecting trusted vehicle owners with verified customers in 4 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="size-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-3 font-bold">
                <Search size={22} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">1. Find a Vehicle</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Browse verified listings posted by independent owners.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="size-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 font-bold">
                <CalendarCheck size={22} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">2. Book & Pay</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Select rental dates and complete secure online or offline payment.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="size-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 font-bold">
                <MessageSquareText size={22} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">3. Chat & Verify</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Chat directly with the vehicle Owner and submit license details.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="size-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 font-bold">
                <Key size={22} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">4. Handover & Drive</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Meet the Owner, inspect the car, collect keys, and start your trip.</p>
            </div>
          </div>
        </section>

        {/* TABS SELECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-xl mx-auto w-full">
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-3 sm:py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap ${
              activeTab === 'customer'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck size={16} className="shrink-0" />
            <span>Customer Help</span>
          </button>

          <button
            onClick={() => setActiveTab('owner')}
            className={`py-3 sm:py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap ${
              activeTab === 'owner'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 size={16} className="shrink-0" />
            <span>Owner Help</span>
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 sm:py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock size={16} className="shrink-0" />
            <span>General & Legal</span>
          </button>
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="space-y-4">
          {activeTab === 'customer' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <UserCheck className="text-primary" size={20} />
                <span>Customer Help & Booking Guides</span>
              </h2>
              {filterFaqs(customerFaqs).map((item, idx) => (
                <AccordionItem key={idx} question={item.question} answer={item.answer} />
              ))}
            </motion.div>
          )}

          {activeTab === 'owner' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Building2 className="text-amber-500" size={20} />
                <span>Owner & Fleet Operator Guides</span>
              </h2>
              {filterFaqs(ownerFaqs).map((item, idx) => (
                <AccordionItem key={idx} question={item.question} answer={item.answer} />
              ))}
            </motion.div>
          )}

          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Lock className="text-emerald-500" size={20} />
                <span>Security, Privacy & Account Help</span>
              </h2>
              {filterFaqs(generalFaqs).map((item, idx) => (
                <AccordionItem key={idx} question={item.question} answer={item.answer} />
              ))}
            </motion.div>
          )}
        </div>

        {/* 24/7 SUPPORT CONTACT CARDS */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Still Need Direct Support?</h2>
            <p className="text-xs text-slate-500">Our customer and owner support team is available to assist you 24/7.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="size-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Email Support</h3>
                <p className="text-xs text-slate-500 mb-1">For general inquiries & assistance</p>
                <a href="mailto:support@carrental.com" className="text-sm font-bold text-primary hover:underline">
                  support@carrental.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="size-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Phone Support</h3>
                <p className="text-xs text-slate-500 mb-1">24/7 Helpline for urgent issues</p>
                <a href="tel:+917342162313" className="text-sm font-bold text-emerald-600 hover:underline">
                  +91-7342162313
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HelpCenter;
