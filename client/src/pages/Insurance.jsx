import React from 'react';

const Insurance = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-15 py-20 text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-primary">Insurance & Protection</h1>
            <div className="space-y-6 text-lg leading-relaxed">
                <p>
                    Your peace of mind is our top priority. CarRental provides comprehensive protection plans for both renters and car owners, 
                    ensuring that every journey is safe and fully covered.
                </p>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4">Renter Protection</h2>
                    <p className="mb-2">When you book a car through CarRental, your trip includes standard physical damage protection.</p>
                    <ul className="list-disc list-inside space-y-2 text-base">
                        <li><strong>Liability Coverage:</strong> All rentals include third-party liability insurance meeting the state's minimum requirements.</li>
                        <li><strong>Physical Damage:</strong> Renters are protected against theft and physical damage to the vehicle, subject to a deductible.</li>
                        <li><strong>Roadside Assistance:</strong> 24/7 emergency roadside assistance is included for breakdowns, flat tires, and lockouts.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4">Owner Protection</h2>
                    <p className="mb-2">We protect our hosts so they can share their vehicles with confidence.</p>
                    <ul className="list-disc list-inside space-y-2 text-base">
                        <li><strong>$1M Liability Insurance:</strong> Owners are covered by a $1,000,000 third-party liability policy during active rental periods.</li>
                        <li><strong>Physical Damage Protection:</strong> In the rare event of damage, our coverage steps in to repair your vehicle up to its actual cash value.</li>
                        <li><strong>Verified Renters:</strong> Our rigorous screening process ensures only licensed and safe drivers can book your car.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4">In Case of an Accident</h2>
                    <p className="text-base">
                        If you are involved in an accident, please follow these steps immediately:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-base mt-2">
                        <li>Ensure everyone is safe and move to a secure location.</li>
                        <li>Call emergency services (police/medical) if necessary.</li>
                        <li>Exchange information with the other parties involved.</li>
                        <li>Take clear photos of the damage to all vehicles involved.</li>
                        <li>Contact CarRental support via the Help Center to report the incident within 24 hours.</li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default Insurance;
