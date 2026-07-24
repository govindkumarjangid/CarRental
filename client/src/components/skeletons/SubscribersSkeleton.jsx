import React from 'react';

export const SubscribersSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      {/* Mobile Cards Skeleton */}
      <div className="md:hidden space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl shimmer shrink-0" />
                <div className="h-4 w-40 shimmer rounded-md" />
              </div>
              <div className="w-8 h-8 rounded-xl shimmer shrink-0" />
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="h-4 w-16 shimmer rounded-full" />
              <div className="h-4 w-28 shimmer rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6"><div className="h-3.5 w-32 shimmer rounded-md opacity-60" /></th>
              <th className="py-4 px-6"><div className="h-3.5 w-20 shimmer rounded-md opacity-60" /></th>
              <th className="py-4 px-6"><div className="h-3.5 w-28 shimmer rounded-md opacity-60" /></th>
              <th className="py-4 px-6 text-right"><div className="h-3.5 w-16 shimmer rounded-md opacity-60 ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl shimmer shrink-0" />
                    <div className="h-4 w-48 shimmer rounded-md" />
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-6 w-20 shimmer rounded-full" />
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 w-32 shimmer rounded-md" />
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="w-8 h-8 rounded-xl shimmer ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersSkeleton;
