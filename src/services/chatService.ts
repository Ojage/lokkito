import { Message, Chat } from '../types';

export class ChatService {
  static async generateResponse(message: string, documentsCount: number, documentNames: string[]): Promise<string> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (documentsCount === 0) {
      return "I'd be happy to help you analyze your content. Please upload some documents so I can provide more specific insights based on their content.";
    }
    
    const documentList = documentNames.length > 3 
      ? `${documentNames.slice(0, 3).join(', ')} and ${documentNames.length - 3} more documents`
      : documentNames.join(', ');
    
    return `Based on your ${documentsCount} uploaded document${documentsCount !== 1 ? 's' : ''}, I can help you analyze "${message}". I've reviewed ${documentList} and can provide insights based on their content.`;
  }
  
  static generateChatTitle(firstMessage: string): string {
    const maxLength = 50;
    return firstMessage.length > maxLength 
      ? firstMessage.slice(0, maxLength) + '...'
      : firstMessage;
  }
}