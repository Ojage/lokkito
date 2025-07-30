import React from 'react';
import { Chat, Document } from '../../types/chat';
import { Header } from './Header';
import { FileUploadArea } from './FileUploadArea';
import { SearchInput } from './SearchInput';
import { DocumentList } from './DocumentList';
import { ChatList } from './ChatList';

interface SidebarProps {
    chats: Chat[];
    activeChat: Chat | null;
    isUploading: boolean;
    searchQuery: string;
    filteredDocuments: Document[];
    onFileUpload: (files: FileList) => void;
    onSearchChange: (query: string) => void;
    onSelectChat: (chatId: string) => void;
    onDeleteChat: (chatId: string) => void;
    onDeleteDocument: (docId: string) => void;
    onCreateNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    chats,
    activeChat,
    isUploading,
    searchQuery,
    filteredDocuments,
    onFileUpload,
    onSearchChange,
    onSelectChat,
    onDeleteChat,
    onDeleteDocument,
    onCreateNewChat
}) => {
    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <Header title="Lokka Lokkito" />
                <FileUploadArea
                    onFileUpload={onFileUpload}
                    isUploading={isUploading}
                    hasActiveChat={!!activeChat}
                />
            </div>

            {/* Sources Section */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">
                            Sources ({filteredDocuments.length})
                            {activeChat && <span className="text-xs text-gray-500 ml-1">for this chat</span>}
                        </h3>
                    </div>

                    {activeChat && (
                        <SearchInput
                            value={searchQuery}
                            onChange={onSearchChange}
                            placeholder="Search sources..."
                        />
                    )}
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    <DocumentList
                        documents={filteredDocuments}
                        onDeleteDocument={onDeleteDocument}
                        hasActiveChat={!!activeChat}
                    />
                </div>
            </div>

            {/* Chat History */}
            <ChatList
                chats={chats}
                activeChat={activeChat}
                onSelectChat={onSelectChat}
                onDeleteChat={onDeleteChat}
                onCreateNewChat={onCreateNewChat}
            />
        </div>
    );
};