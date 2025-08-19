
import React from 'react';
import { Chat } from '../types';
import { PlusIcon, FolderIcon, MessageIcon } from './Icons';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  selectedFolder: string | null;
  onSelectFolder: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onSelectChat, onNewChat, selectedFolder, onSelectFolder }) => {
  return (
    <aside className="w-64 bg-gray-900 flex flex-col border-r border-gray-700/50 p-2">
      <div className="flex-1 overflow-y-auto">
        <button
          onClick={onNewChat}
          className="flex items-center w-full h-12 px-4 mb-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-3" />
          Neuer Chat
        </button>
        <nav className="flex flex-col space-y-1">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center px-4 py-2.5 text-left text-sm rounded-md transition-colors ${
                activeChatId === chat.id ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              <MessageIcon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="truncate flex-1">{chat.title}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-2 border-t border-gray-700/50">
        <button
          onClick={onSelectFolder}
          className="flex items-center w-full px-4 py-2.5 text-left text-sm rounded-md hover:bg-gray-800 transition-colors text-gray-300"
        >
          <FolderIcon className="w-5 h-5 mr-3" />
          <div className="truncate">
            {selectedFolder ? (
                <>
                    <span className="font-semibold block">Aktiver Ordner:</span>
                    <span className="text-xs text-gray-400 block">{selectedFolder}</span>
                </>
            ) : (
                'Ordner auswählen'
            )}
            </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
