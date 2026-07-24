import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorCardProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[50vh]">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8 text-rose-500" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Failed to load data</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
};
