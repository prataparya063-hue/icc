import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onRefresh, isRefreshing }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <Navbar onRefresh={onRefresh} isRefreshing={isRefreshing} />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
};
