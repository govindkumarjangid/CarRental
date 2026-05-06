import React from 'react';
import { motion } from 'framer-motion';
import { iconList } from '../../assets/assets.jsx';
import { useNavigate } from 'react-router-dom';

const EmptyBookingState = () => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-gray-300 m-6 md:m-10"
		>
			<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 shadow-inner">
				<iconList.CalendarX size={40} />
			</div>
			
			<h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
				No Bookings Found
			</h3>
			
			<p className="text-gray-500 max-w-md mb-8 leading-relaxed">
				Your bookings will appear here once customers start reserving your vehicles. 
				In the meantime, make sure your fleet is ready for the road!
			</p>

			<div className="flex flex-col sm:flex-row gap-4">
				<button
					onClick={() => navigate('/owner/add-car')}
					className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dull transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-md"
				>
					<iconList.Plus size={18} />
					List a New Car
				</button>
				
				<button
					onClick={() => navigate('/owner/manage-cars')}
					className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all active:scale-95 cursor-pointer shadow-sm"
				>
					Manage Your Fleet
				</button>
			</div>

			<div className="mt-12 pt-8 border-t border-gray-100 w-full max-w-2xl">
				<p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">How to get more bookings?</p>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
					<div className="space-y-2">
						<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-xs">1</div>
						<p className="text-sm font-semibold">Stunning Photos</p>
						<p className="text-xs text-gray-500">Clear, well-lit photos increase booking rates by up to 40%.</p>
					</div>
					<div className="space-y-2">
						<div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold text-xs">2</div>
						<p className="text-sm font-semibold">Fair Pricing</p>
						<p className="text-xs text-gray-500">Research local rates to ensure your pricing is competitive.</p>
					</div>
					<div className="space-y-2">
						<div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 font-bold text-xs">3</div>
						<p className="text-sm font-semibold">Instant Response</p>
						<p className="text-xs text-gray-500">Quick replies to customer queries build trust and loyalty.</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default EmptyBookingState;

