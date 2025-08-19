
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { UserIcon, GeminiStarIcon } from './Icons';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-800">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <GeminiStarIcon className="w-16 h-16 mb-4 text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-300">Wie kann ich Ihnen helfen?</h2>
            <p className="text-gray-500">Senden Sie eine Nachricht, um ein Gespräch zu beginnen.</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-6 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            <div
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'model' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-600'}`}>
                {message.role === 'model' ? (
                  <GeminiStarIcon className="w-5 h-5 text-white" />
                ) : (
                  <UserIcon className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`p-4 rounded-xl max-w-xl prose prose-invert prose-p:my-0 prose-headings:my-2 ${
                message.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-900/50 text-gray-200 rounded-bl-none'
              }`}>
                {message.content === '...' ? (
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
