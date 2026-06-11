import NavbarOwner from "../components/owner/NavbarOwner";
import Sidebar from "../components/owner/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Breadcrumbs from "../components/UI/Breadcrumbs";

const Layout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
			<NavbarOwner toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

			{/* Body */}
			<div className="flex flex-1 overflow-hidden relative">
				{/* Sidebar */}
				<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

				{/* Outlet */}
				<div
					ref={scrollRef}
					className="flex-1 overflow-y-auto overflow-x-hidden blue-thumb-scrollbar relative h-full flex flex-col"
				>
					<Breadcrumbs />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;

