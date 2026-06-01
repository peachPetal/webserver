import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage } from './components/HomePage';
import { CompanyDetail } from './components/CompanyDetail';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Sun, Moon, User, Shield } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <header className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                강원 바이오 기업 포트폴리오
              </h1>

              <div className="flex items-center gap-3">
                {/* Dark/Light Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-md transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* Admin/User Toggle */}
                <button
                  onClick={() => {
                    if (isAdminMode) {
                      setIsAdminMode(false);
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isAdminMode
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isAdminMode ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span>{isAdminMode ? '관리자' : '사용자'}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} isAdminMode={isAdminMode} />} />
          <Route path="/company/:id" element={<CompanyDetail isDarkMode={isDarkMode} />} />
        </Routes>

        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={() => setIsAdminMode(true)}
          isDarkMode={isDarkMode}
        />
      </div>
    </BrowserRouter>
  );
}
