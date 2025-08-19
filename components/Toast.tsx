
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './Icons';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // Auto-dismiss after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    // Allow animation to finish before calling onClose
    setTimeout(onClose, 300); 
  };

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center justify-between max-w-sm w-full p-4 bg-gray-700 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <p className="text-sm">{message}</p>
      <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-600">
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
