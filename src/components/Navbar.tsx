import React, { useState } from 'react';
import { Calendar, RefreshCw, User, Bell } from 'lucide-react';
import { cn } from '../utils/cn';
import { format, subDays } from 'date-fns';

interface NavbarProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onRefresh, isRefreshing }) => {
  // Mock date range for UI
  const [dateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date()
  });

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            S
          </div>
          <h1 className="text-xl font-semibold tracking-tight hidden sm:block">Sales Dashboard</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
            </span>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={cn("h-4 w-4 text-foreground", isRefreshing && "animate-spin")} />
          </button>
          
          <button className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors relative">
            <Bell className="h-4 w-4 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-card"></span>
          </button>
          
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-0.5 cursor-pointer ml-2">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center border-2 border-transparent hover:border-background transition-all overflow-hidden">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
