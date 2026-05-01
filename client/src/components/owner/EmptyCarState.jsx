import React from 'react';
import { motion } from 'framer-motion';
import { iconList } from '../../assets/assets.jsx';
import { useNavigate } from 'react-router-dom';

const EmptyCarState = () => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-second-bg rounded-xl border border-dashed border-gray-300 dark:border-dark-border m-6 md:m-10"
		>
			<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-bounce-slow">
				<iconList.CarFront size={48} />
			</div>

			<h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-dark-text mb-3">
				Your Garage is Empty
			</h3>

			<p className="text-gray-500 dark:text-dark-muted max-w-lg mb-10 leading-relaxed md:text-lg text-md">
				You haven't listed any cars yet. Start your journey as a rental owner by adding your first vehicle to the platform!
			</p>

			<button
				onClick={() => navigate('/owner/add-car')}
				className="px-5 py-3 text-md  bg-primary text-white rounded-xl font-semibold md:text-lg hover:bg-primary-dull transition-all active:scale-95 flex items-center md:gap-3 gap-2 cursor-pointer shadow-xl hover:shadow-primary/20"
			>
				<iconList.Plus size={24} />
				Add Your First Car
			</button>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl text-left">
				<div className="p-5 bg-gray-50 dark:bg-card-bg rounded-xl border border-gray-100 dark:border-dark-border">
					<div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4">
						<iconList.ClipboardList size={20} />
					</div>
					<h4 className="font-bold mb-2 dark:text-dark-text text-base">Required Documents</h4>
					<p className="text-sm text-gray-500 dark:text-dark-muted leading-snug">Have your RC, Insurance, and Permit details ready for a smooth listing process.</p>
				</div>

				<div className="p-5 bg-gray-50 dark:bg-card-bg rounded-xl border border-gray-100 dark:border-dark-border">
					<div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
						<iconList.IndianRupee size={20} />
					</div>
					<h4 className="font-bold mb-2 dark:text-dark-text text-base">Smart Pricing</h4>
					<p className="text-sm text-gray-500 dark:text-dark-muted leading-snug">Set hourly rates based on car model, year, and local market demand.</p>
				</div>

				<div className="p-5 bg-gray-50 dark:bg-card-bg rounded-xl border border-gray-100 dark:border-dark-border">
					<div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-4">
						<iconList.CloudUpload size={20} />
					</div>
					<h4 className="font-bold mb-2 dark:text-dark-text text-base">Quick Approval</h4>
					<p className="text-sm text-gray-500 dark:text-dark-muted leading-snug">Once submitted, our team reviews and approves your listing within 24 hours.</p>
				</div>
			</div>
		</motion.div>
	);
};

export default EmptyCarState;
