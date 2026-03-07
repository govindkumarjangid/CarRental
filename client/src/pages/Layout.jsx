import NavbarOwner from "../components/owner/NavbarOwner";
import Sidebar from "../components/owner/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="h-screen flex flex-col overflow-hidden">
			{/* Navbar - fixed */}
			<NavbarOwner />

			{/* Body */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar - fixed */}
				<Sidebar />

				{/* Outlet - ONLY this scrolls */}
				<div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth blue-thumb-scrollbar">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
