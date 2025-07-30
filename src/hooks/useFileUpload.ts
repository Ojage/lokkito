import { useState } from 'react';
import { Document } from '../types';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadFiles = async (files: FileList): Promise<Document[]> => {
    setIsUploading(true);
    
    const newDocuments: Document[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newDoc: Document = {
        id: Date.now().toString() + i,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: formatFileSize(file.size),
        uploadedAt: new Date().toISOString(),
      };

      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      newDocuments.push(newDoc);
    }
    
    setIsUploading(false);
    return newDocuments;
  };

  return { uploadFiles, isUploading };
};