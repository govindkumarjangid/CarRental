import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ isHeader = false }) => {
  const location = useLocation();
  const { pathname } = location;

  // Do not render breadcrumbs on the homepage
  if (pathname === "/") return null;

  const pathnames = pathname.split("/").filter((x) => x);

  // Mapping segments to readable names
  const routeNameMap = {
    owner: "dashboard",
    "manage-cars": "manage cars",
    "manage-bookings": "manage bookings",
    users: "users",
    chats: "chats",
    chatpage: "chats",
    "my-bookings": "my bookings",
    cars: "cars",
    "car-details": "car details",
  };

  const crumbs = [];

  // Add the logical "cars" category to "car-details" routes so the trail makes sense:
  // e.g. Home > cars > car details : [ID]
  if (pathnames[0] === "car-details") {
    crumbs.push({ label: "cars", to: "/cars" });
  }

  for (let i = 0; i < pathnames.length; i++) {
    const segment = pathnames[i];
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(segment);

    // If segment is a MongoDB ID, merge it with the parent segment using the context pattern (e.g. "car details : 65ca873b...")
    if (isMongoId && i > 0) {
      const prevCrumb = crumbs[crumbs.length - 1];
      if (prevCrumb) {
        prevCrumb.label = `${prevCrumb.label} : ${segment}`;
        prevCrumb.to = `${prevCrumb.to}/${segment}`;
        continue;
      }
    }

    const label = routeNameMap[segment.toLowerCase()] || segment;
    const to = `/${pathnames.slice(0, i + 1).join("/")}`;
    crumbs.push({ label, to });
  }

  // Adjust container width and padding for header vs page layout vs consumer pages
  const isOwner = pathname.startsWith("/owner");
  const containerClass = isHeader
    ? "hidden md:block py-0 px-0 select-none absolute left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap"
    : isOwner
      ? "max-w-6xl mx-auto px-4 md:px-10 pt-6 pb-0 w-full select-none"
      : "max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-4 select-none";

  return (
    <nav 
      aria-label="breadcrumb"
      className={containerClass}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-medium tracking-wide text-gray-500">
        {/* Home Link */}
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors hover:underline"
          >
            Home
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.to} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight size={16} className="text-gray-400 select-none shrink-0" />
              {isLast ? (
                <span className="text-gray-400 font-normal">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.to} 
                  className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
