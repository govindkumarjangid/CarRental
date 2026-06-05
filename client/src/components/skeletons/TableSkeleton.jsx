import React from 'react';

const TableSkeleton = ({ showAddButton = true }) => {
  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
      {/* Title Area Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-3">
          <div className="w-48 h-8.5 shimmer rounded-lg" />
          <div className="w-full max-w-md h-4 shimmer rounded-md opacity-70" />
        </div>
        {showAddButton && (
          <div className="w-32 h-10 shimmer rounded-2xl shrink-0" />
        )}
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mt-8 mb-6 items-end">
        <div className="flex-1 w-full">
          <div className="space-y-2">
            <div className="w-24 h-4.5 shimmer rounded-md opacity-50" />
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
        </div>
        <div className="w-full md:w-52">
          <div className="space-y-2">
            <div className="w-16 h-4.5 shimmer rounded-md opacity-50" />
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
        </div>
        <div className="w-full md:w-52">
          <div className="space-y-2">
            <div className="w-16 h-4.5 shimmer rounded-md opacity-50" />
            <div className="w-full h-11 shimmer rounded-xl" />
          </div>
        </div>
      </div>

      {/* Table Container Skeleton */}
      <div className="w-full bg-white transition-all duration-300 rounded-3xl border border-gray-200 flex flex-col">
        <div className="overflow-x-auto relative">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              {showAddButton ? (
                // ManageCars Headers
                <tr>
                  <th className="p-3 font-medium">Car</th>
                  <th className="p-3 font-medium max-md:hidden">Category</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium max-md:hidden">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              ) : (
                // ManageBookings Headers
                <tr>
                  <th className="p-3 font-medium">Car</th>
                  <th className="p-3 font-medium max-md:hidden">Duration</th>
                  <th className="p-3 font-medium max-md:hidden">Earnings</th>
                  <th className="p-3 font-medium max-md:hidden">Method</th>
                  <th className="p-3 font-medium max-md:hidden">Payment</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              )}
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b last:border-b-0 border-gray-100">
                  {showAddButton ? (
                    // ManageCars Columns
                    <>
                      <td className="p-3 flex md:flex-row flex-col items-start gap-3 justify-start">
                        <div className="h-11 aspect-video rounded-xl shimmer shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-4.5 shimmer rounded-md w-28" />
                          <div className="h-3.5 shimmer rounded-md w-20 opacity-60 max-md:hidden" />
                        </div>
                      </td>
                      <td className="py-3 max-md:hidden">
                        <div className="h-4.5 shimmer rounded-md w-16" />
                      </td>
                      <td className="p-3">
                        <div className="h-4.5 shimmer rounded-md w-16" />
                      </td>
                      <td className="p-3 max-md:hidden">
                        <div className="h-7 w-24 shimmer rounded-xl" />
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-4">
                          <div className="w-[18px] h-[18px] shimmer rounded-full" />
                          <div className="w-[18px] h-[18px] shimmer rounded-full" />
                          <div className="w-[18px] h-[18px] shimmer rounded-full" />
                        </div>
                      </td>
                    </>
                  ) : (
                    // ManageBookings Columns
                    <>
                      <td className="p-3 flex md:flex-row flex-col items-start gap-3 justify-start">
                        <div className="h-11 aspect-video rounded-xl shimmer shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-4.5 shimmer rounded-md w-28" />
                          <div className="h-3.5 shimmer rounded-md w-24 opacity-60 max-md:hidden" />
                        </div>
                      </td>
                      <td className="p-3 max-md:hidden">
                        <div className="flex flex-col gap-1.5">
                          <div className="h-4 shimmer rounded-md w-10" />
                          <div className="h-3 shimmer rounded-md w-20 opacity-60" />
                        </div>
                      </td>
                      <td className="p-3 max-md:hidden">
                        <div className="h-4.5 shimmer rounded-md w-14" />
                      </td>
                      <td className="p-3 max-md:hidden">
                        <div className="h-5.5 w-16 shimmer rounded-xl" />
                      </td>
                      <td className="p-3 max-md:hidden">
                        <div className="h-7 w-24 shimmer rounded-xl" />
                      </td>
                      <td className="p-3">
                        <div className="h-7 w-24 shimmer rounded-xl" />
                      </td>
                      <td className="p-3">
                        <div className="w-[18px] h-[18px] shimmer rounded-full" />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
