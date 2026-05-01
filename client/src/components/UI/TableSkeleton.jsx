import React from 'react';

const TableSkeleton = () => {
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
          <div className="bg-gray-50  border-b border-gray-200  flex p-4">
            <div className="h-4 bg-gray-200  rounded-md w-1/4 mr-4"></div>
            <div className="h-4 bg-gray-200  rounded-md w-1/4 mr-4 hidden md:block"></div>
            <div className="h-4 bg-gray-200  rounded-md w-1/4 mr-4 hidden md:block"></div>
            <div className="h-4 bg-gray-200  rounded-md w-1/4"></div>
          </div>
          {/* Rows */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex border-b last:border-b-0 border-gray-100  p-4 items-center">
              <div className="h-11 w-16 bg-gray-200  rounded-md mr-4 shrink-0"></div>
              <div className="flex-1 space-y-2.5">
                <div className="h-3.5 bg-gray-200  rounded-md w-1/3"></div>
                <div className="h-3 bg-gray-200  rounded-md w-1/4"></div>
              </div>
              <div className="h-8 bg-gray-200  rounded-md w-1/5 hidden md:block mx-4"></div>
              <div className="h-8 bg-gray-200  rounded-md w-1/4 mx-4 hidden md:block"></div>
              <div className="h-8 bg-gray-200  rounded-md w-12 ml-auto shrink-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
