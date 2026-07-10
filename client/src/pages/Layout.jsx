import NavbarOwner from "../components/owner/NavbarOwner";
import Sidebar from "../components/owner/Sidebar";
import LiveTracker from "../components/LiveTracker";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLiveTrackerOpen, setIsLiveTrackerOpen] = useState(false);
	const [trackingCarId, setTrackingCarId] = useState(null);
	const { pathname } = useLocation();
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	}, [pathname]);

	return (
		<div className="h-screen-dynamic flex flex-col overflow-hidden">
			{/* Navbar */}
			<NavbarOwner 
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
				isSidebarOpen={isSidebarOpen} 
			/>

			{/* Body */}
			<div className="flex flex-1 overflow-hidden relative">
				{/* Sidebar */}
				<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

				{/* Outlet / Content Area */}
				{/* Outlet / Content Area */}
				<div className="flex-1 relative h-full flex flex-col bg-gray-50/10 overflow-hidden">
					{/* Scrolling Container */}
					<div
						ref={scrollRef}
						className="flex-1 overflow-y-auto overflow-x-hidden custom-theme-scrollbar w-full h-full"
					>
						<Outlet context={{ setTrackingCarId, setIsLiveTrackerOpen }} />
					</div>

					{/* Live Tracker Overlay (Full content area, absolute to outer div) */}
					<AnimatePresence>
						{isLiveTrackerOpen && (
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 30 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="absolute inset-0 bg-white z-[100] flex flex-col"
							>
								<div className="p-4 md:p-8 flex-1 flex flex-col min-h-full">
									<LiveTracker carId={trackingCarId} onClose={() => setIsLiveTrackerOpen(false)} />
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Layout;

