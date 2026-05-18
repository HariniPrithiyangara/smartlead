import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ className = '', size = 20 }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={size} className="animate-spin text-[#14b8a6]" />
    </div>
  );
};

export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <Loader size={32} />
  </div>
);

