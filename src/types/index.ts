export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  content?: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// export interface Chat {
//   id: string;
//   title: string;
//   messages: Message[];
//   createdAt: string;
//   documents: Document[];
// }

export interface AudioOverviewConfig {
  description: string;
  includeQuestions: boolean;
  includeKeyPoints: boolean;
  duration: 'short' | 'medium' | 'long';
}

export interface AppState {
  returnTo?: string;
}
