import React from "react";

const BannerSkeleton = () => {
    return (
        <div className="max-w-8xl m-auto w-full py-20 px-3">
            <div className="relative flex flex-col md:flex-row md:items-center justify-between px-8 py-8 max-w-6xl rounded-2xl overflow-hidden md:mx-auto bg-white border border-gray-100">
                {/* left content */}
                <div className="flex-1 space-y-3 md:max-w-lg text-left">
                    <div className="h-10 bg-gray-100 rounded mb-6 shimmer" />

                    <div className="h-3 w-full bg-gray-100 rounded shimmer" />
                    <div className="h-3 w-[80%] bg-gray-100 rounded shimmer" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded shimmer" />

                    <div className="h-10 w-32 bg-gray-100 rounded-md mt-8 shimmer"></div>
                </div>

                {/* right image */}
                <div className="w-80 h-50 bg-gray-100 rounded-lg ml-5 mt-5 md:mt-0 shimmer"></div>
            </div>
        </div>
    );
};

export default BannerSkeleton;
