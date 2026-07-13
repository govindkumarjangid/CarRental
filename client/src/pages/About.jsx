import React from 'react';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-15 py-20 text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-primary">About Us</h1>
            <div className="space-y-6 text-lg leading-relaxed">
                <p>
                    Welcome to CarRental, your premium choice for reliable and high-quality car rentals. 
                    Founded with a vision to revolutionize the car sharing and rental industry, we bridge the gap 
                    between car owners looking to earn extra income and renters needing dependable transportation.
                </p>
                <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
                <p>
                    Our mission is to provide a seamless, secure, and intuitive platform for vehicle sharing. 
                    We believe in empowering individuals with the freedom of mobility, while also promoting a sustainable 
                    and community-driven economy. By leveraging modern technology, we make finding and booking the perfect car 
                    as easy as a few taps on your screen.
                </p>
                <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Us?</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Wide Selection:</strong> From economical compacts to luxurious SUVs, our diverse fleet meets every need.</li>
                    <li><strong>Transparent Pricing:</strong> No hidden fees. What you see is what you pay.</li>
                    <li><strong>Verified Owners:</strong> Every car on our platform is carefully vetted to ensure your safety and comfort.</li>
                    <li><strong>24/7 Support:</strong> Our dedicated team is always available to help you on your journey.</li>
                </ul>
                <h2 className="text-2xl font-semibold mt-10 mb-4">Our Commitment</h2>
                <p>
                    We are deeply committed to safety, reliability, and unparalleled customer service. 
                    Whether you're exploring a new city, heading to a crucial business meeting, or just need a 
                    temporary ride, CarRental is dedicated to getting you there smoothly.
                </p>
            </div>
        </div>
    );
};

export default About;
