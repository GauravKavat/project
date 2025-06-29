import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-4 p-6 bg-white">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center">
        <Bot className="w-4 h-4 text-black" />
      </div>

      {/* Typing Animation */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-black">AI Assistant</span>
          <span className="text-xs text-gray-600">typing...</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}