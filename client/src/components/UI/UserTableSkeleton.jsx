import React from 'react';

const UserTableSkeleton = () => {
  return (
    <div className="px-4 pt-10 pb-10 md:px-10 flex-1 w-full animate-pulse">
      {/* Title Area Skeleton */}
      <div className="mb-6">
        <div className="w-48 h-8 bg-gray-200  rounded-md mb-2"></div>
        <div className="w-full max-w-md h-4 bg-gray-200  rounded-md"></div>
      </div>
      
      {/* Table Container Skeleton */}
      <div className="max-w-[1000px] w-full bg-white  shadow-sm rounded-xl overflow-hidden mt-6 border border-gray-200 ">
        <div className="w-full">
          {/* Header */}
          <div className="bg-gray-50  border-b border-gray-200  flex p-4 justify-between">
            <div className="h-4 bg-gray-200  rounded-md w-1/3 md:w-1/4"></div>
            <div className="h-4 bg-gray-200  rounded-md w-1/4 hidden md:block"></div>
            <div className="h-4 bg-gray-200  rounded-md w-1/4 hidden sm:block"></div>
          </div>
          {/* Rows */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex justify-between border-b last:border-b-0 border-gray-100  p-4 items-center">
              {/* User Column */}
              <div className="flex flex-col space-y-2 w-1/2 md:w-1/3">
                <div className="h-5 bg-gray-200  rounded-md w-3/4"></div>
                <div className="h-3 bg-gray-200  rounded-md w-1/2"></div>
                {/* Mobile Status/Actions fallback */}
                <div className="h-4 bg-gray-200  rounded-md w-1/3 mt-2 md:hidden"></div>
              </div>
              
              {/* Status Column */}
              <div className="w-1/4 hidden md:flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-300 "></div>
                <div className="h-4 bg-gray-200  rounded-md w-16"></div>
              </div>
              
              {/* Actions Column */}
              <div className="w-1/4 hidden sm:flex justify-end">
                <div className="h-8 bg-gray-200  rounded-md w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
