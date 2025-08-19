
import React from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { useChat } from '../hooks/useChat';
import Toast from './Toast';

const ChatPage: React.FC = () => {
  const {
    chats,
    activeChat,
    setActiveChatId,
    createNewChat,
    sendMessage,
    selectedFolder,
    selectFolder,
    toastMessage,
    clearToast,
  } = useChat();

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar
        chats={chats}
        activeChatId={activeChat?.id || null}
        onSelectChat={setActiveChatId}
        onNewChat={createNewChat}
        selectedFolder={selectedFolder}
        onSelectFolder={selectFolder}
      />
      <main className="flex flex-col flex-1 h-screen">
        <ChatWindow messages={activeChat?.messages || []} />
        <MessageInput
          onSendMessage={sendMessage}
          disabled={!activeChat || activeChat.messages.some(m => m.role === 'model' && m.content === '...')}
        />
      </main>
      {toastMessage && <Toast message={toastMessage} onClose={clearToast} />}
    </div>
  );
};

export default ChatPage;
