import React from 'react';
import { cn } from '../utils/cn';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <div className={cn("p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-lg bg-muted text-foreground">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {trend && (
          <span className={cn("text-sm font-medium", trend.isPositive ? "text-emerald-500" : "text-rose-500")}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
};
