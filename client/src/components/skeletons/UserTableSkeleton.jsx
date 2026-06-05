import React from 'react';

const UserTableSkeleton = () => {
  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
      {/* Title Area Skeleton */}
      <div className="mb-6">
        <div className="w-48 h-8.5 shimmer rounded-lg mb-2" />
        <div className="w-full max-w-md h-4 shimmer rounded-md opacity-70" />
      </div>

      {/* Table Container Skeleton */}
      <div className="w-full mt-6">
        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 shimmer rounded-full shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="h-5.5 shimmer rounded-md w-3/4 mb-1.5" />
                  <div className="h-4.5 shimmer rounded-md w-1/2 opacity-60 mb-3" />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full shimmer" />
                      <div className="h-4 w-16 shimmer rounded-md opacity-60" />
                    </div>
                    <div className="h-8.5 w-24 shimmer rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <table className="hidden md:table w-full border-collapse border-spacing-0 bg-white rounded-xl overflow-hidden border border-gray-200">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
            <tr className="text-left">
              <th className="py-3 px-4 w-[80px]">
                <div className="h-4 shimmer rounded-md w-12" />
              </th>
              <th className="py-3 px-4 font-semibold">
                <div className="h-4 shimmer rounded-md w-24" />
              </th>
              <th className="py-3 px-4 font-semibold w-[150px]">
                <div className="h-4 shimmer rounded-md w-16" />
              </th>
              <th className="py-3 px-4 font-semibold w-[150px]">
                <div className="h-4 shimmer rounded-md w-20" />
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="border-b last:border-b-0 border-gray-100">
                <td className="px-4 py-2 w-[80px]">
                  <div className="w-11 h-11 shimmer rounded-full shrink-0" />
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-5.5 shimmer rounded-md w-48" />
                    <div className="h-4.5 shimmer rounded-md w-36 opacity-60" />
                  </div>
                </td>
                <td className="px-4 py-2 w-[150px]">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shimmer shrink-0" />
                    <div className="h-4 w-16 shimmer rounded-md opacity-60" />
                  </div>
                </td>
                <td className="px-4 py-2 w-[150px]">
                  <div className="h-8.5 w-24 shimmer rounded-xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
