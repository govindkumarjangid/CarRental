import React from "react";
import { Link, useLocation } from "react-router-dom";
import { iconList } from "../../assets/assets"

const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;

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

  if (pathnames[0] === "car-details")
    crumbs.push({ label: "cars", to: "/cars" });


  for (let i = 0; i < pathnames.length; i++) {
    const segment = pathnames[i];
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(segment);

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

  return (
    <nav
      aria-label="breadcrumb"
      className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-4 select-none"
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-medium tracking-wide text-gray-500">
        {/* Home Link */}
        <li className="flex items-center">
          <Link
            to="/"
            className="text-primary hover:text-primary-dull transition-colors "
          >
            Home
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.to} className="flex items-center gap-1.5 sm:gap-2">
              <iconList.ChevronRight size={16} className="text-gray-400 select-none shrink-0" />
              {isLast ? (
                <span className="text-gray-400 font-normal">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className="text-primary hover:text-primary-dull transition-colors"
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
