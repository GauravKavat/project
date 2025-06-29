import React from 'react';
import Sidebar from './components/Sidebar';
import Message from './components/Message';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import EmptyState from './components/EmptyState';
import { useChat } from './hooks/useChat';

function App() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createConversation,
    deleteConversation,
    sendMessage,
    setActiveConversationId
  } = useChat();

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleNewConversation = () => {
    createConversation();
  };

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const handleDeleteConversation = (conversationId: string) => {
    deleteConversation(conversationId);
  };

  const handleExampleClick = (message: string) => {
    if (!activeConversationId) {
      createConversation();
    }
    sendMessage(message);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {activeConversation ? (
            <div className="max-w-4xl mx-auto">
              {activeConversation.messages.map((message, index) => (
                <Message
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  isAnimating={index === activeConversation.messages.length - 1}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          ) : (
            <EmptyState onExampleClick={handleExampleClick} />
          )}
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          placeholder={
            activeConversation 
              ? "Message AI Assistant..." 
              : "Start a new conversation..."
          }
        />
      </div>
    </div>
  );
}

export default App;