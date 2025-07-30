import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Chat } from '../../types/chat';

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: (chatId: string) => void;
  onDelete: (chatId: string) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isActive,
  onSelect,
  onDelete
}) => {
  return (
    <div className="group flex items-center">
      <button
        onClick={() => onSelect(chat.id)}
        className={`flex-1 text-left p-2 rounded-lg text-sm transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center">
          <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{chat.title}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {chat.documents.length} source{chat.documents.length !== 1 ? 's' : ''}
        </div>
      </button>
      <button
        onClick={() => onDelete(chat.id)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
