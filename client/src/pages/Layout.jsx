import NavbarOwner from "../components/owner/NavbarOwner";
import Sidebar from "../components/owner/Sidebar";
import { Outlet } from "react-router-dom";

import { useState } from "react";

const Layout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="h-screen flex flex-col overflow-hidden dark:bg-main-bg dark:text-dark-text">
			{/* Navbar */}
			<NavbarOwner toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

			{/* Body */}
			<div className="flex flex-1 overflow-hidden relative">
				{/* Sidebar */}
				<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

				{/* Outlet */}
				<div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth blue-thumb-scrollbar relative h-full flex flex-col">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
