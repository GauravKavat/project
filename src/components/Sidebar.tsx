import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Edit3 } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`${isExpanded ? 'w-64' : 'w-12'} bg-gray-200 text-black flex flex-col h-screen border-r border-gray-300 transition-all duration-300 ease-in-out overflow-hidden`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-2 border-b border-gray-300 flex-shrink-0">
        <button
          onClick={onNewConversation}
          className={`${isExpanded ? 'w-full justify-start px-4' : 'w-8 justify-center px-0'} 
                     flex items-center gap-3 py-3 bg-white hover:bg-gray-100 
                     rounded-lg transition-all duration-200 group border border-gray-300 h-12`}
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200 flex-shrink-0" />
          <span className={`font-medium whitespace-nowrap transition-opacity duration-200 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}>
            New Chat
          </span>
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 mb-1 h-12
                       ${activeConversationId === conversation.id
                         ? 'bg-white border border-gray-300'
                         : 'hover:bg-gray-100'}
                     `}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <MessageSquare className="w-4 h-4 text-black flex-shrink-0" />
            <div className={`flex-1 min-w-0 transition-opacity duration-200 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-sm font-medium truncate text-black">
                {conversation.title}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {conversation.lastMessage}
              </div>
            </div>
            <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
              isExpanded ? 'block' : 'hidden'
            }`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Edit conversation title functionality
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                className="p-1 hover:bg-gray-300 rounded"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-300 flex-shrink-0">
        <div className={`text-xs text-gray-600 text-center transition-opacity duration-200 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          AI Chat Assistant
        </div>
      </div>
    </div>
  );
}