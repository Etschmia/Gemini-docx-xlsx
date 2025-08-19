
import React, { useState, useRef, KeyboardEvent } from 'react';
import { SendIcon } from './Icons';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700/50">
      <div className="max-w-4xl mx-auto flex items-end bg-gray-700/50 rounded-xl p-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Nachricht an Gemini senden..."
          className="flex-1 bg-transparent resize-none outline-none p-2 text-gray-200 placeholder-gray-400 max-h-48"
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-lg text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
