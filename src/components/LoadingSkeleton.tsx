import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-card rounded-2xl border border-border"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="h-[380px] lg:col-span-2 xl:col-span-2 bg-card rounded-2xl border border-border"></div>
        <div className="h-[380px] bg-card rounded-2xl border border-border"></div>
      </div>
      <div className="h-[400px] bg-card rounded-2xl border border-border"></div>
    </div>
  );
};
