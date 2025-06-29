import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: string;
  timestamp: Date;
}

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      lastMessage: '',
      timestamp: new Date()
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (activeConversationId === conversationId) {
      const remaining = conversations.filter(c => c.id !== conversationId);
      setActiveConversationId(remaining.length > 0 ? remaining[0].id : null);
    }
  }, [activeConversationId, conversations]);

  const sendMessage = useCallback(async (content: string) => {
    if (!activeConversationId) {
      const newConversationId = createConversation();
      setActiveConversationId(newConversationId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    // Add user message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === (activeConversationId || prev[0]?.id)
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              lastMessage: content,
              timestamp: new Date(),
              title: conv.messages.length === 0 ? content.slice(0, 30) + '...' : conv.title
            }
          : conv
      )
    );

    // Simulate AI typing
    setIsTyping(true);
    
    // Mock AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(content),
        isUser: false,
        timestamp: new Date()
      };

      setConversations(prev => 
        prev.map(conv => 
          conv.id === (activeConversationId || prev[0]?.id)
            ? {
                ...conv,
                messages: [...conv.messages, aiMessage],
                lastMessage: aiMessage.content,
                timestamp: new Date()
              }
            : conv
        )
      );

      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  }, [activeConversationId, createConversation]);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createConversation,
    deleteConversation,
    sendMessage,
    setActiveConversationId
  };
}

function generateMockResponse(userMessage: string): string {
  const responses = [
    "That's an interesting question! Let me help you with that. Based on what you've asked, here are some key points to consider...",
    "I understand what you're looking for. Here's my take on this topic and some practical suggestions...",
    "Great question! This is a topic I can definitely help with. Let me break this down for you...",
    "I'd be happy to assist you with that. From my understanding, this involves several important aspects...",
    "That's a thoughtful inquiry. Based on current knowledge and best practices, here's what I recommend..."
  ];

  // Simple keyword-based responses
  if (userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('programming')) {
    return "I can help you with coding! Whether it's JavaScript, Python, React, or any other technology, I'm here to assist with code examples, debugging, best practices, and explanations. What specific programming challenge are you working on?";
  }

  if (userMessage.toLowerCase().includes('write') || userMessage.toLowerCase().includes('story')) {
    return "I'd love to help you with creative writing! I can assist with stories, articles, essays, and various forms of creative content. What kind of writing project are you working on? I can help with brainstorming, structure, character development, or any other aspect of the writing process.";
  }

  if (userMessage.toLowerCase().includes('marketing') || userMessage.toLowerCase().includes('business')) {
    return "I can definitely help with marketing and business strategy! This includes market analysis, content marketing, social media strategy, business plans, and growth tactics. What specific aspect of your marketing or business development would you like to focus on?";
  }

  return responses[Math.floor(Math.random() * responses.length)];
}