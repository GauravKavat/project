import React from 'react';

interface EmptyStateProps {
  onExampleClick: (message: string) => void;
}

export default function EmptyState({ onExampleClick }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white">
      <div className="text-center">
        <p className="text-gray-400 text-lg">
          chat starts here
        </p>
      </div>
    </div>
  );
}