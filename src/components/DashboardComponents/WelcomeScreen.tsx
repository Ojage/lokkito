import React from 'react';
import { Plus } from 'lucide-react';
import lokkalokkitoLogo from '../../assets/images/LogoLoka_Lokkito.png';

interface WelcomeScreenProps {
    onCreateNewChat: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreateNewChat }) => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="w-64 h-64 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <img
                        src={lokkalokkitoLogo}
                        alt="Lokka Lokkito Logo"
                        className="w-64 h-64 rounded-full"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Welcome to Lokka Lokkito
                </h2>
                <p className="text-gray-600 mb-8">
                    Create a new chat and upload your documents to start a conversation and get insights from your sources.
                </p>
                <button
                    onClick={onCreateNewChat}
                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center mx-auto"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Start new chat
                </button>
            </div>
        </div>
    );
};