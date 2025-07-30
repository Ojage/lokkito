import React from 'react';
import { Plus } from 'lucide-react';
import { Chat } from '../../types/chat';
import { ChatItem } from './ChatItem';

interface ChatListProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onCreateNewChat: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChat,
  onSelectChat,
  onDeleteChat,
  onCreateNewChat
}) => {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Chats</h3>
        <button
          onClick={onCreateNewChat}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={activeChat?.id === chat.id}
            onSelect={onSelectChat}
            onDelete={onDeleteChat}
          />
        ))}
      </div>
    </div>
  );
};