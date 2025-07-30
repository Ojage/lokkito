import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadAreaProps {
  onFileUpload: (files: FileList) => void;
  isUploading: boolean;
  hasActiveChat: boolean;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  isUploading,
  hasActiveChat
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hasActiveChat) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          hasActiveChat ? 'border-gray-300 hover:border-gray-400' : 'border-gray-200 bg-gray-50'
        }`}
        onClick={handleClick}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-1">
          {hasActiveChat ? 'Upload documents to this chat' : 'Create a chat first'}
        </p>
        <p className="text-xs text-gray-500">PDF, TXT, DOCX supported</p>
        {isUploading && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
            </div>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.docx,.doc"
        className="hidden"
        onChange={(e) => e.target.files && onFileUpload(e.target.files)}
      />
    </>
  );
};