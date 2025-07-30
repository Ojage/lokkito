import { useState, useEffect, useCallback } from 'react';
import { Message, Chat, BackendChat, BackendChatMessage, SendMessageRequest, SendMessageResponse, ChatStats } from '../types/chat';
import { api } from '../services/api';

export const useChat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Helper function to transform backend chat to frontend format
    const transformBackendChat = useCallback((backendChat: BackendChat): Chat => {
        return {
            id: backendChat.chatId,
            title: backendChat.messages?.[0]?.content?.slice(0, 50) +
                (backendChat.messages?.[0]?.content && backendChat.messages[0].content.length > 50 ? '...' : '') || 'New Chat',
            messages: backendChat.messages?.map((msg: BackendChatMessage, index: number) => ({
                id: `${backendChat.chatId}-${msg.timestamp}-${index}`,
                type: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content,
                timestamp: msg.timestamp,
            })) || [],
            documents: backendChat.documentNames?.map((name: string, index: number) => ({
                id: `${backendChat.chatId}-doc-${index}-${name}`,
                name,
                type: 'application/pdf', // Default type, can be enhanced
            })) || [],
            createdAt: backendChat.createdAt || backendChat.lastActivity || new Date().toISOString(),
            lastActivity: backendChat.lastActivity,
            userId: backendChat.userId,
        };
    }, []);

    // Load all chats on hook initialization
    useEffect(() => {
        loadAllChats();
    }, []);

    const loadAllChats = useCallback(async (userId?: string) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get('/chat/all', {
                params: userId ? { userId } : {},
            });

            // Transform backend data to frontend format
            const transformedChats: Chat[] = data.map((chat: BackendChat) => transformBackendChat(chat));

            setChats(transformedChats);
        } catch (error) {
            console.error('Error loading chats:', error);
            setError('Failed to load chats');
        } finally {
            setLoading(false);
        }
    }, [transformBackendChat]);

    const loadChatHistory = useCallback(async (chatId: string): Promise<Chat | null> => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get(`/chat/history/${chatId}`);

            // Assuming the API returns a BackendChat structure
            const backendChat: BackendChat = {
                chatId: data.chatId,
                messages: data.messages || [],
                documentNames: data.documentNames || [],
                lastActivity: data.lastActivity || new Date().toISOString(),
                userId: data.userId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };

            return transformBackendChat(backendChat);
        } catch (error) {
            console.error('Error loading chat history:', error);
            setError('Failed to load chat history');
            return null;
        } finally {
            setLoading(false);
        }
    }, [transformBackendChat]);

    const createNewChat = useCallback((): Chat => {
        const newChatId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newChat: Chat = {
            id: newChatId,
            title: 'New Chat',
            messages: [],
            documents: [],
            createdAt: new Date().toISOString(),
        };

        setChats(prev => [newChat, ...prev]); // Add to beginning for recent first
        setActiveChat(newChat);
        return newChat;
    }, []);

    const selectChat = useCallback(async (chatId: string) => {
        const existingChat = chats.find(chat => chat.id === chatId);
        if (existingChat) {
            setActiveChat(existingChat);
        } else {
            // Load from backend if not in local state
            const chat = await loadChatHistory(chatId);
            if (chat) {
                setActiveChat(chat);
                setChats(prev => [chat, ...prev.filter(c => c.id !== chatId)]);
            }
        }
    }, [chats, loadChatHistory]);

    const updateChat = useCallback((updatedChat: Chat) => {
        setActiveChat(prev => prev?.id === updatedChat.id ? updatedChat : prev);
        setChats(prev => prev.map(chat =>
            chat.id === updatedChat.id ? updatedChat : chat
        ));
    }, []);

    const deleteChat = useCallback(async (chatId: string) => {
        try {
            setLoading(true);
            setError(null);
            await api.delete(`/chat/${chatId}`);

            setChats(prev => prev.filter(chat => chat.id !== chatId));
            if (activeChat?.id === chatId) {
                setActiveChat(null);
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            setError('Failed to delete chat');
        } finally {
            setLoading(false);
        }
    }, [activeChat]);

    const clearChatHistory = useCallback(async (chatId: string) => {
        try {
            setLoading(true);
            setError(null);
            await api.post(`/chat/${chatId}/clear`);

            const chatToUpdate = chats.find(chat => chat.id === chatId);
            if (chatToUpdate) {
                const clearedChat: Chat = {
                    ...chatToUpdate,
                    messages: [],
                    title: 'New Chat',
                };

                updateChat(clearedChat);
            }
        } catch (error) {
            console.error('Error clearing chat history:', error);
            setError('Failed to clear chat history');
        } finally {
            setLoading(false);
        }
    }, [chats, updateChat]);

    const sendMessage = useCallback(async (content: string, userId?: string) => {
        if (!content.trim() || !activeChat) return;

        const userMessage: Message = {
            id: `${activeChat.id}-${Date.now()}-user`,
            type: 'user',
            content: content.trim(),
            timestamp: new Date().toISOString(),
        };

        // Optimistically update UI
        const updatedChatWithUserMessage: Chat = {
            ...activeChat,
            messages: [...activeChat.messages, userMessage],
            title: activeChat.messages.length === 0 ?
                content.slice(0, 50) + (content.length > 50 ? '...' : '') :
                activeChat.title,
            lastActivity: new Date().toISOString(),
        };

        updateChat(updatedChatWithUserMessage);

        try {
            setLoading(true);
            setError(null);

            const requestPayload: SendMessageRequest = {
                chatId: activeChat.id,
                message: content.trim(),
                documentNames: activeChat.documents.map(d => d.name),
                userId,
            };

            const { data }: { data: SendMessageResponse } = await api.post('/chat/message', requestPayload);

            const aiMessage: Message = {
                id: `${activeChat.id}-${Date.now()}-ai`,
                type: 'assistant',
                content: data.response,
                timestamp: new Date().toISOString(),
            };

            // Update with AI response
            const finalUpdatedChat: Chat = {
                ...updatedChatWithUserMessage,
                messages: [...updatedChatWithUserMessage.messages, aiMessage],
                lastActivity: new Date().toISOString(),
            };

            updateChat(finalUpdatedChat);

        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message');

            // Rollback optimistic update on error
            updateChat(activeChat);
        } finally {
            setLoading(false);
        }
    }, [activeChat, updateChat]);

    const addDocumentsToChat = useCallback((documents: { id: string; name: string; type: string }[]) => {
        if (!activeChat) return;

        const updatedChat: Chat = {
            ...activeChat,
            documents: [...activeChat.documents, ...documents],
            lastActivity: new Date().toISOString(),
        };

        updateChat(updatedChat);
    }, [activeChat, updateChat]);

    const removeDocumentFromChat = useCallback((documentId: string) => {
        if (!activeChat) return;

        const updatedChat: Chat = {
            ...activeChat,
            documents: activeChat.documents.filter(doc => doc.id !== documentId),
            lastActivity: new Date().toISOString(),
        };

        updateChat(updatedChat);
    }, [activeChat, updateChat]);

    const getChatStats = useCallback(async (chatId: string): Promise<ChatStats | null> => {
        try {
            setError(null);
            const { data } = await api.get(`/chat/stats/${chatId}`);
            return data as ChatStats;
        } catch (error) {
            console.error('Error getting chat stats:', error);
            setError('Failed to get chat statistics');
            return null;
        }
    }, []);

    const refreshChats = useCallback(() => {
        loadAllChats();
    }, [loadAllChats]);

    return {
        // State
        chats,
        activeChat,
        loading,
        error,

        // Actions
        createNewChat,
        selectChat,
        updateChat,
        deleteChat,
        clearChatHistory,
        sendMessage,
        addDocumentsToChat,
        removeDocumentFromChat,
        loadChatHistory,
        getChatStats,
        refreshChats,
        loadAllChats,

        // Legacy compatibility
        setActiveChat: selectChat,
    };
};