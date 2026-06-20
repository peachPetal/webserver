import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage  from './components/HomePage';
import CompanyDetail from './components/CompanyDetail'; // 중괄호 { }를 반드시 제거해야 합니다.
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} isAdminMode={false} />} />
          <Route path="/company/:id" element={<CompanyDetail isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

