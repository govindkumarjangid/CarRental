import React from 'react';
import { AccordionItem } from '../../index.js';

const faqData = [
    {
        question: "How do I book a car on your platform?",
        answer: "Simply browse our available cars, select your desired dates, and click 'Book Now'. Follow the prompts to confirm your payment and reservation. It's fast and fully secure!"
    },
    {
        question: "Can I modify or cancel my reservation?",
        answer: "Yes! You can cancel or modify your booking up to 24 hours before the pickup time for a full refund. All modifications are subject to vehicle availability."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, Amex) and popular digital wallets like Apple Pay and Google Pay for your convenience."
    },
    {
        question: "Are there any hidden fees?",
        answer: "No hidden fees at all. The price you see at checkout includes the rental rate, taxes, and standard insurance. Late fees only apply if the vehicle is returned past the agreed time."
    },
    {
        question: "How do I verify my driver's license?",
        answer: "After booking, you can use our built-in chat system to communicate directly with the owner and securely upload photos of your ID and driver's license for quick verification."
    }
];

const FAQSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 md:px-15">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500 text-lg">Everything you need to know about booking with us.</p>
                </div>
                
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <AccordionItem 
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            className="rounded-3xl shadow-sm border border-gray-200/60"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
