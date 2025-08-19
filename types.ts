// Global libraries (docx, xlsx) are loaded from CDN in index.html and accessed via window object.

export type MessageRole = 'user' | 'model';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export interface FileAction {
    action: 'save' | 'none';
    fileType: 'docx' | 'xlsx' | 'none';
    fileName: string;
}
