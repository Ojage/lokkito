export interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface Document {
    id: string;
    name: string;
    type: string;
    size?: number;
    uploadedAt?: string;
}

export interface Chat {
    id: string; // This maps to chatId in backend
    title: string;
    messages: Message[];
    documents: Document[];
    createdAt: string;
    lastActivity?: string;
    userId?: string;
}

// Backend response types
export interface BackendChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface BackendChat {
    chatId: string;
    messages: BackendChatMessage[];
    documentNames: string[];
    lastActivity: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SendMessageRequest {
    chatId: string;
    message: string;
    documentNames?: string[];
    userId?: string;
}

export interface SendMessageResponse {
    response: string;
    chatId: string;
    messageCount: number;
}

export interface ChatStats {
    chatId: string;
    messageCount: number;
    documentCount: number;
    lastActivity: string;
    createdAt: string;
    updatedAt: string;
}

// UI State types
export interface ChatState {
    chats: Chat[];
    activeChat: Chat | null;
    loading: boolean;
    error: string | null;
}

export interface ApiError {
    message: string;
    statusCode?: number;
    error?: string;
}