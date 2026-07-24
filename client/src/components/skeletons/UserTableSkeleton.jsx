import React from 'react';

const UserTableSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      {/* Mobile Skeleton Cards */}
      <div className="md:hidden space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full shimmer shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4.5 shimmer rounded-md w-3/4" />
                <div className="h-3.5 shimmer rounded-md w-1/2 opacity-60" />
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-100">
                  <div className="h-6 w-20 shimmer rounded-full" />
                  <div className="h-8 w-24 shimmer rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Skeleton Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6"><div className="h-3.5 w-24 shimmer rounded-md opacity-60" /></th>
              <th className="py-4 px-6"><div className="h-3.5 w-16 shimmer rounded-md opacity-60" /></th>
              <th className="py-4 px-6 text-right"><div className="h-3.5 w-20 shimmer rounded-md opacity-60 ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-gray-50/50">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full shimmer shrink-0" />
                    <div className="space-y-1.5">
                      <div className="h-4.5 shimmer rounded-md w-44" />
                      <div className="h-3.5 shimmer rounded-md w-32 opacity-60" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <div className="h-6 w-20 shimmer rounded-full" />
                </td>
                <td className="px-6 py-3.5 text-right">
                  <div className="h-8.5 w-24 shimmer rounded-xl ml-auto" />
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
