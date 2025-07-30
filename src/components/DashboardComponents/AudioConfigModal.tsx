import React from 'react';
import { X, Volume2 } from 'lucide-react';
import { AudioOverviewConfig } from '../../types';

interface AudioConfigModalProps {
    isOpen: boolean;
    config: AudioOverviewConfig;
    onConfigChange: (config: AudioOverviewConfig) => void;
    onClose: () => void;
    onGenerate: () => void;
}

export const AudioConfigModal: React.FC<AudioConfigModalProps> = ({
    isOpen,
    config,
    onConfigChange,
    onClose,
    onGenerate
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Audio Overview Settings</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description (optional)
                        </label>
                        <textarea
                            value={config.description}
                            onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
                            placeholder="Describe what you'd like to focus on in the audio overview..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <select
                            value={config.duration}
                            onChange={(e) => onConfigChange({ ...config, duration: e.target.value as 'short' | 'medium' | 'long' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="short">Short (2-3 minutes)</option>
                            <option value="medium">Medium (5-7 minutes)</option>
                            <option value="long">Long (10-15 minutes)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={config.includeQuestions}
                                onChange={(e) => onConfigChange({ ...config, includeQuestions: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Include discussion questions</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={config.includeKeyPoints}
                                onChange={(e) => onConfigChange({ ...config, includeKeyPoints: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Include key points summary</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onGenerate}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                    >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Generate Audio
                    </button>
                </div>
            </div>
        </div>
    );
};