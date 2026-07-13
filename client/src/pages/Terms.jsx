import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-15 py-20 text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: October 2023</p>

            <div className="space-y-6 text-base leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the CarRental platform, you agree to be bound by these Terms of Service. 
                        If you do not agree to all the terms and conditions, you may not access the service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
                    <p>
                        You must be at least 21 years old and possess a valid driver's license to rent a vehicle through our platform. 
                        Users listing vehicles must be the legal owners or have the explicit legal right to rent out the vehicle.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
                    <p>
                        As a renter, you agree to return the vehicle in the same condition as it was received, excluding normal wear and tear. 
                        You are strictly prohibited from using the vehicle for illegal activities, off-roading, racing, or towing.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Booking and Cancellations</h2>
                    <p>
                        Bookings are confirmed upon successful payment. Cancellations made 24 hours prior to the trip start time will receive a full refund. 
                        Late returns are subject to a late fee calculated per hour as specified by the vehicle owner.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
                    <p>
                        CarRental acts solely as a marketplace connecting owners and renters. We do not own the vehicles and are not liable for 
                        any direct, indirect, incidental, or consequential damages arising from the use of the vehicles or the platform.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
