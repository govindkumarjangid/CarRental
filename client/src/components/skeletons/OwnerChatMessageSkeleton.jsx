import React from 'react';

const OwnerChatMessageSkeleton = () => {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-slate-50">
      {/* HEADER */}
      <div className="h-16 shrink-0 border-b border-slate-200 bg-white">
        <div className="flex h-full items-center px-5">
          {/* Mobile Menu */}
          <div className="mr-3 shrink-0 md:hidden">
            <div className="h-9 w-9 rounded-full bg-slate-100 shimmer" />
          </div>

          {/* Avatar */}
          <div className="shrink-0">
            <div className="h-12 w-12 rounded-full border border-slate-200 bg-slate-100 shimmer" />
          </div>

          {/* User Info */}
          <div className="ml-4 flex flex-col justify-center">
            <div className="h-4 w-40 rounded-md bg-slate-100 shimmer" />
            <div className="mt-2 h-3 w-20 rounded-md bg-slate-100 shimmer" />
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="min-h-0 flex-1">
        <div
          className="h-full w-full overflow-y-auto custom-scrollbar bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]"
          style={{ backgroundSize: "16px 16px" }}>
          <div className="flex min-h-full flex-col">
            <div className="flex-1" />

            <div className="flex flex-col gap-3 p-6">
              {/* Incoming */}
              <div className="h-12 w-[42%] rounded-[28px] rounded-tl-md border border-slate-200 bg-white shimmer" />

              {/* Outgoing */}
              <div className="ml-auto h-12 w-[48%] rounded-[28px] rounded-tr-md border border-slate-200 bg-slate-100 shimmer" />

              {/* Incoming */}
              <div className="h-12 w-[36%] rounded-[28px] rounded-tl-md border border-slate-200 bg-white shimmer" />

              {/* Outgoing */}
              <div className="ml-auto h-12 w-[58%] rounded-[28px] rounded-tr-md border border-slate-200 bg-slate-100 shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t border-slate-200 bg-white p-3">
        <div className="flex items-center gap-3">
          {/* Left Button */}
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-100 shimmer" />

          {/* Input */}
          <div className="flex h-12 flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-6">
            <div className="h-4 w-48 rounded-md bg-slate-200 shimmer" />
          </div>

          {/* Right Button */}
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-100 shimmer" />
        </div>
      </div>
    </div>
  );
};

export default OwnerChatMessageSkeleton;
