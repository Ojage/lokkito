import React from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { Document } from '../../types/chat';

interface DocumentItemProps {
  document: Document;
  onDelete: (id: string) => void;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  return (
    <div className="group flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <FileText className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{document.name}</p>
        <p className="text-xs text-gray-500">{document.size}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDelete(document.id)}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};