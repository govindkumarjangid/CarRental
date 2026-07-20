import React from 'react';
import { motion } from 'motion/react';
import { Search, CalendarCheck, MessageSquareText, Key } from 'lucide-react';
import { AccordionItem } from '../index.js';

const HelpCenter = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 md:px-15 py-20 text-gray-800">
            <h1 className="text-4xl font-bold mb-4 text-primary text-center">Help Center</h1>
            <p className="text-lg mb-12 text-center text-gray-600">How can we help you today? Browse our guides and frequently asked questions below.</p>

            {/* Visual Stepper Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-semibold mb-10 text-gray-900 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary relative">
                            <Search size={32} />
                            <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px] bg-gray-200 -z-10 -translate-y-1/2 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">1. Browse Cars</h3>
                        <p className="text-gray-500 text-sm">Find your perfect ride using our smart filters.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary relative">
                            <CalendarCheck size={32} />
                            <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px] bg-gray-200 -z-10 -translate-y-1/2 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">2. Book & Pay</h3>
                        <p className="text-gray-500 text-sm">Select dates and complete secure payment.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary relative">
                            <MessageSquareText size={32} />
                            <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px] bg-gray-200 -z-10 -translate-y-1/2 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">3. Chat & Send Docs</h3>
                        <p className="text-gray-500 text-sm">Chat with the owner and securely upload your ID.</p>
                    </div>
                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <Key size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">4. Pick Up & Drive</h3>
                        <p className="text-gray-500 text-sm">Get the keys and enjoy your trip.</p>
                    </div>
                </div>
            </section>

            <div className="space-y-10 max-w-4xl mx-auto">
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Booking & Reservations</h2>
                    <div className="space-y-4">
                        <AccordionItem
                            question="How do I book a car?"
                            answer="Simply browse our available cars, select your desired dates, and click 'Book Now'. Follow the prompts to confirm your payment and reservation."
                        />
                        <AccordionItem
                            question="Can I modify or cancel my reservation?"
                            answer="Yes, you can cancel or modify your booking up to 24 hours before the pickup time for a full refund. Modifications are subject to vehicle availability."
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Payments & Fees</h2>
                    <div className="space-y-4">
                        <AccordionItem
                            question="What payment methods do you accept?"
                            answer="We accept all major credit cards (Visa, MasterCard, Amex) and digital wallets like Apple Pay and Google Pay."
                        />
                        <AccordionItem
                            question="Are there any hidden fees?"
                            answer="No. The price you see at checkout includes the rental rate, taxes, and standard insurance. Late fees only apply if the vehicle is returned past the agreed time."
                        />
                    </div>
                </section>

                <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mt-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Still need help?</h2>
                    <p className="text-gray-600 mb-6">If you couldn't find the answer to your question, our support team is available 24/7 to assist you.</p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 bg-gray-50 p-6 rounded-xl text-center">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Email Support</h3>
                            <p className="text-primary font-medium">support@carrental.com</p>
                        </div>
                        <div className="flex-1 bg-gray-50 p-6 rounded-xl text-center">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Phone Support</h3>
                            <p className="text-primary font-medium">+91-7342162313</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpCenter;
