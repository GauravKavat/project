import React from 'react';
import { User, Bot } from 'lucide-react';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
}

export default function Message({ content, isUser, timestamp, isAnimating = false }: MessageProps) {
  return (
    <div className={`flex gap-4 p-6 ${isUser ? 'bg-gray-100' : 'bg-white'} 
                    ${isAnimating ? 'animate-fade-in' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2
                      ${isUser ? 'bg-black border-black' : 'bg-white border-black'}`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-black" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-black">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-600">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none text-black leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}