import React from 'react';

const StatCardSkeleton = () => (
  <div className="flex gap-4 items-center justify-between p-4 rounded-3xl border border-gray-200 bg-white">
    <div className="flex flex-col gap-2 flex-1">
      <div className="h-3 w-16 shimmer rounded-md opacity-60" />
      <div className="h-6 w-10 shimmer rounded-md" />
    </div>
    <div className="w-9 h-9 rounded-full shimmer shrink-0" />
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
      {/* Title Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 shimmer rounded-lg mb-2" />
        <div className="h-4 w-96 shimmer rounded-md opacity-70" />
      </div>

      {/* Fleet Overview Section */}
      <section className="mt-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
          <div className="w-5.5 h-5.5 rounded-full shimmer shrink-0 opacity-70" />
          <div className="h-5 w-32 shimmer rounded-md" />
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="p-6 border border-gray-200 rounded-3xl max-w-xl bg-white w-full">
          <div className="h-4 w-44 bg-gray-50 shimmer rounded-md mb-4" />
          <div className="h-48 flex justify-center items-center">
            <div className="w-36 h-36 rounded-full shimmer" />
          </div>
        </div>
      </section>

      {/* Booking Analytics Section */}
      <section className="mt-12">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
          <div className="w-5.5 h-5.5 rounded-full shimmer shrink-0 opacity-70" />
          <div className="h-5 w-36 shimmer rounded-md" />
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="p-6 border border-gray-200 rounded-3xl bg-white w-full">
          <div className="h-4 w-48 bg-gray-50 shimmer rounded-md mb-4" />
          <div className="h-64 flex items-end justify-between px-8 gap-4 pt-10">
            <div className="w-12 h-2/3 shimmer rounded-t-xl" />
            <div className="w-12 h-4/5 shimmer rounded-t-xl" />
            <div className="w-12 h-1/2 shimmer rounded-t-xl" />
            <div className="w-12 h-1/3 shimmer rounded-t-xl" />
          </div>
        </div>
      </section>

      {/* Financial Performance Section */}
      <section className="mt-12">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
          <div className="w-5.5 h-5.5 rounded-full shimmer shrink-0 opacity-70" />
          <div className="h-5 w-40 shimmer rounded-md" />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full mb-6">
          {[1, 2, 3, 4].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Chart */}
          <div className="p-6 border border-gray-200 rounded-3xl bg-white w-full">
            <div className="h-4 w-44 bg-gray-50 shimmer rounded-md mb-4" />
            <div className="h-64 flex items-end justify-between px-8 gap-4 pt-10">
              <div className="w-12 h-1/2 shimmer rounded-t-xl" />
              <div className="w-12 h-3/4 shimmer rounded-t-xl" />
              <div className="w-12 h-1/4 shimmer rounded-t-xl" />
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="p-6 border border-gray-200 rounded-3xl lg:col-span-2 bg-white w-full">
            <div className="h-4 w-48 bg-gray-50 shimmer rounded-md mb-4" />
            <div className="h-64 w-full bg-gray-50/50 shimmer rounded-2xl mt-4" />
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mt-12 flex items-stretch md:flex-row flex-col gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-6 border border-gray-200 rounded-3xl w-full bg-white">
          <div className="h-5.5 w-36 shimmer rounded-md mb-1.5" />
          <div className="h-4 w-48 shimmer rounded-md opacity-60 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 shimmer shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 shimmer rounded-md" />
                    <div className="h-3 w-20 shimmer rounded-md opacity-50" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="h-4 w-12 shimmer rounded-md" />
                  <div className="h-3 w-16 shimmer rounded-full opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Card */}
        <div className="p-6 border border-gray-200 rounded-3xl max-w-sm w-full flex flex-col justify-center items-center text-center bg-white shrink-0">
          <div className="w-16 h-16 rounded-full bg-purple-50 shimmer mb-4" />
          <div className="h-4 w-28 shimmer rounded-md mb-2" />
          <div className="h-8 w-36 shimmer rounded-md mb-3" />
          <div className="h-3.5 w-44 shimmer rounded-md opacity-55" />
        </div>
      </section>
    </div>
  );
};

export default DashboardSkeleton;
