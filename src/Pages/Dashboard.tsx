import React, { useState } from 'react';
import { AudioConfigModal } from '../components/DashboardComponents/AudioConfigModal';
import { ChatHeader } from '../components/DashboardComponents/ChatHeader';
import { MessageInput } from '../components/DashboardComponents/MessageInput';
import { MessageList } from '../components/DashboardComponents/MessageList';
import { WelcomeScreen } from '../components/DashboardComponents/WelcomeScreen';
import { useChat } from '../hooks/useChat';
import { useFileUpload } from '../hooks/useFileUpload';
import { AudioOverviewConfig } from '../types';
import { Sidebar } from '../components/DashboardComponents/Sidebar';
import { Document } from '../types/chat';

export default function Dashboard() {
  const { chats, activeChat, setActiveChat, createNewChat, updateChat, deleteChat, sendMessage } = useChat();
  const { uploadFiles, isUploading } = useFileUpload();

  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAudioConfig, setShowAudioConfig] = useState(false);
  const [audioConfig, setAudioConfig] = useState<AudioOverviewConfig>({
    description: '',
    includeQuestions: true,
    includeKeyPoints: true,
    duration: 'medium'
  });
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    if (!activeChat) {
      createNewChat();
      return;
    }

    const newDocuments = await uploadFiles(files);
    const updatedChat = {
      ...activeChat,
      documents: [...activeChat.documents, ...newDocuments as unknown as Document[]]
    };
    updateChat(updatedChat);
  };

  const handleSendMessage = async () => {
    await sendMessage(message);
    setMessage('');
  };

  const deleteDocument = (docId: string) => {
    if (!activeChat) return;

    const updatedChat = {
      ...activeChat,
      documents: activeChat.documents.filter(doc => doc.id !== docId)
    };
    updateChat(updatedChat);
  };

  const generateAudioOverview = async () => {
    if (!activeChat || activeChat.messages.length === 0) return;

    setIsGeneratingAudio(true);
    setShowAudioConfig(false);

    // Simulate audio generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsGeneratingAudio(false);

    // In a real implementation, this would trigger an actual audio download
    alert(`Audio overview generated successfully!\nConfiguration:\n- Description: ${audioConfig.description || 'Default overview'}\n- Include Questions: ${audioConfig.includeQuestions}\n- Include Key Points: ${audioConfig.includeKeyPoints}\n- Duration: ${audioConfig.duration}`);
  };

  const filteredDocuments = activeChat ? activeChat.documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        isUploading={isUploading}
        searchQuery={searchQuery}
        filteredDocuments={filteredDocuments}
        onFileUpload={handleFileUpload}
        onSearchChange={setSearchQuery}
        onSelectChat={setActiveChat}
        onDeleteChat={deleteChat}
        onDeleteDocument={deleteDocument}
        onCreateNewChat={createNewChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {!activeChat ? (
          <WelcomeScreen onCreateNewChat={createNewChat} />
        ) : (
          <>
            <ChatHeader
              chat={activeChat}
              onGenerateAudio={() => setShowAudioConfig(true)}
              isGeneratingAudio={isGeneratingAudio}
            />

            <div className="flex-1 overflow-y-auto p-4">
              <MessageList
                messages={activeChat.messages}
                documentsCount={activeChat.documents.length}
              />
            </div>

            <MessageInput
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              placeholder="Ask anything about your documents..."
            />
          </>
        )}
      </div>

      <AudioConfigModal
        isOpen={showAudioConfig}
        config={audioConfig}
        onConfigChange={setAudioConfig}
        onClose={() => setShowAudioConfig(false)}
        onGenerate={generateAudioOverview}
      />
    </div>
  );
}