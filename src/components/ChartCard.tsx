import React from 'react';
import { cn } from '../utils/cn';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, className }) => {
  return (
    <div className={cn("p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-6", className)}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};
