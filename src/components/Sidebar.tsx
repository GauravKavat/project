import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Edit3, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`${isExpanded ? 'w-64' : 'w-12'} bg-gray-200 text-black flex flex-col h-screen border-r border-gray-300 transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Header with Toggle and New Chat side by side */}
      <div className="p-2 border-b border-gray-300 flex-shrink-0 flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded-lg border border-gray-300"
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <button
            onClick={onNewConversation}
            className="flex-1 flex items-center gap-3 py-3 px-4 bg-white hover:bg-gray-100 rounded-lg transition-all duration-200 group border border-gray-300 h-12"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">New Chat</span>
          </button>
        )}
      </div>

      {/* Conversations List */}
      {isExpanded && (
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
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate text-black">
                  {conversation.title}
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {conversation.lastMessage}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
      )}

      {/* Footer */}
      {isExpanded && (
        <div className="p-2 border-t border-gray-300 flex-shrink-0">
          <div className="text-xs text-gray-600 text-center">
            AI Chat Assistant
          </div>
        </div>
      )}
    </div>
  );
}
