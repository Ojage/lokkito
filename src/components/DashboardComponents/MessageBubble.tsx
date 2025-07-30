import React from 'react';
import { User } from 'lucide-react';
import lokkalokkitoLogo from '../../assets/images/LogoLoka_Lokkito.png';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-black ml-3' : 'inherit ml-0 mr-3'
          }`}>
          {message.type === 'user' ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <img
              src={lokkalokkitoLogo}
              alt="Lokka Lokkito Logo"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
        <div className={`px-4 py-3 rounded-2xl ${message.type === 'user'
            ? 'bg-black text-white'
            : 'bg-white border border-gray-200'
          }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  );
};