
import React from 'react';
import { GoogleIcon } from './Icons';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-bold mb-2">Gemini Local File Chat</h1>
        <p className="text-gray-400 mb-8">
          Melden Sie sich an, um mit Gemini zu chatten und auf Ihr lokales Dateisystem zuzugreifen.
        </p>
        <button
          onClick={onLogin}
          className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <GoogleIcon className="w-6 h-6 mr-3" />
          Mit Google anmelden
        </button>
         <p className="text-xs text-gray-500 mt-6">
          Diese App nutzt Ihren Gemini-Plan, der mit Ihrem Google-Konto verknüpft ist.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
