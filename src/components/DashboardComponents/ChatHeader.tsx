import React from 'react';
import { Headphones, MoreVertical } from 'lucide-react';
import { Chat } from '../../types';

interface ChatHeaderProps {
    chat: Chat;
    onGenerateAudio: () => void;
    isGeneratingAudio: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    chat,
    onGenerateAudio,
    isGeneratingAudio
}) => {
    return (
        <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{chat.title}</h2>
                    <p className="text-sm text-gray-500">
                        {chat.documents.length} source{chat.documents.length !== 1 ? 's' : ''} • {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {chat.messages.length > 0 && (
                        <button
                            onClick={onGenerateAudio}
                            disabled={isGeneratingAudio}
                            className="flex items-center px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {isGeneratingAudio ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Headphones className="w-4 h-4 mr-2" />
                                    Audio Overview
                                </>
                            )}
                        </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};