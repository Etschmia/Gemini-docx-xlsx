
import { useState, useCallback, useEffect } from 'react';
import { Chat, Message, MessageRole } from '../types';
import { geminiService } from '../services/geminiService';
import { fileService } from '../services/fileService';

const initialChat: Chat = {
  id: 'chat-1',
  title: 'Neuer Chat',
  messages: [],
  createdAt: new Date().toISOString(),
};

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([initialChat]);
  const [activeChatId, setActiveChatId] = useState<string | null>('chat-1');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const createNewChat = useCallback(() => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: 'Neuer Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
  }, []);

  const addMessageToChat = useCallback((chatId: string, role: MessageRole, content: string): Message => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    };

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return { ...c, messages: [...c.messages, newMessage] };
      }
      return c;
    }));
    return newMessage;
  }, []);

  const updateMessageInChat = useCallback((chatId: string, messageId: string, newContent: string) => {
      setChats(prev => prev.map(c => {
          if (c.id === chatId) {
              return {
                  ...c,
                  messages: c.messages.map(m => m.id === messageId ? { ...m, content: newContent } : m)
              };
          }
          return c;
      }));
  }, []);

  const sendMessage = useCallback(async (prompt: string) => {
    if (!activeChatId) return;

    addMessageToChat(activeChatId, 'user', prompt);
    const modelMessage = addMessageToChat(activeChatId, 'model', '...');
    
    try {
      // Analyze for file action in parallel
      const fileActionPromise = geminiService.analyzeForFileAction(prompt);

      // Get streaming response
      const stream = await geminiService.getChatStream(prompt);
      
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        updateMessageInChat(activeChatId, modelMessage.id, fullResponse);
      }

      if (activeChat?.messages.length === 1 && fullResponse.length > 0) {
        const title = await geminiService.generateTitle(prompt, fullResponse);
        setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, title } : c));
      }

      // Handle file saving
      const fileAction = await fileActionPromise;
      if (fileAction.action === 'save') {
        let contentToSave = fullResponse;
        if(fileAction.fileType === 'xlsx') {
          // If excel, ask gemini for just the table
          showToast(`Formatiere als Tabelle...`);
          contentToSave = await geminiService.getTextResponse(
            `Extrahiere die Markdown-Tabelle aus dem folgenden Text und gib nur die Tabelle zurück, ohne zusätzlichen Text:\n\n---\n${fullResponse}`
          );
        }

        if (fileAction.fileType === 'docx') {
          fileService.createDocx(contentToSave, fileAction.fileName);
          showToast(`Dokument "${fileAction.fileName}" wurde gespeichert.`);
        } else if (fileAction.fileType === 'xlsx') {
          fileService.createXlsx(contentToSave, fileAction.fileName);
          showToast(`Excel-Datei "${fileAction.fileName}" wurde gespeichert.`);
        }
      }

    } catch (error) {
      console.error("Error sending message:", error);
      updateMessageInChat(activeChatId, modelMessage.id, 'Entschuldigung, ein Fehler ist aufgetreten.');
    }
  }, [activeChatId, activeChat, addMessageToChat, updateMessageInChat]);

  const selectFolder = useCallback(() => {
    const mockFolder = "/Users/Shared/Gemini-Dateien";
    setSelectedFolder(mockFolder);
    showToast(`Ordner ausgewählt: ${mockFolder}`);
  }, []);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (chats.length === 0 || !chats.find(c => c.id === activeChatId)) {
      setActiveChatId(chats[0]?.id || null);
    }
  }, [chats, activeChatId]);

  return { chats, activeChat, setActiveChatId, createNewChat, sendMessage, selectedFolder, selectFolder, toastMessage, clearToast };
};
