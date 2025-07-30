import React from 'react';
import { FileText } from 'lucide-react';
import { Document } from '../../types/chat';
import { DocumentItem } from './DocumentItem';

interface DocumentListProps {
  documents: Document[];
  onDeleteDocument: (id: string) => void;
  hasActiveChat: boolean;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDeleteDocument,
  hasActiveChat
}) => {
  if (!hasActiveChat) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">Select a chat to view sources</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">No documents in this chat yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <DocumentItem
          key={doc.id}
          document={doc}
          onDelete={onDeleteDocument}
        />
      ))}
    </div>
  );
};