
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <div className="w-full h-screen font-sans">
      {isLoggedIn ? <ChatPage /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;
