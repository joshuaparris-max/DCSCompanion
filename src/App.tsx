import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/globals.css';

// Components
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import { ProtectedRoute } from './components/ProtectedRoute';

// Auth
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ProfilePage from './pages/ProfilePage';

// Pages
import HomeDashboard from './pages/HomeDashboard';
import DcsKnowledgeBase from './pages/DcsKnowledgeBase';
import AskDcsLLM from './pages/AskDcsLLM';
import SettingsPage from './pages/SettingsPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage.kb';
import SystemsCheatSheetPage from './pages/SystemsCheatSheetPage.kb';
import EventRosterPage from './pages/EventRosterPage.kb';
import PreschoolWellingtonSupportPage from './pages/PreschoolWellingtonSupportPage.kb';
import TaskTrackerPage from './pages/TaskTrackerPage';
import ResourceBookingPage from './pages/ResourceBookingPage';
import AnnouncementsPanelPage from './pages/AnnouncementsPanelPage';
import OnboardingGuidePage from './pages/OnboardingGuidePage';
import KbDetailPage from './pages/KbDetailPage';

function AppContent() {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const savedWidth = localStorage.getItem('dcs-sidebar-width');
    return savedWidth ? parseInt(savedWidth, 10) : 260;
  });

  useEffect(() => {
    localStorage.setItem('dcs-sidebar-width', sidebarWidth.toString());
  }, [sidebarWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const newWidth = Math.min(Math.max(200, startWidth + moveEvent.clientX - startX), 420);
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div
        style={{ width: sidebarWidth }}
        className="hidden md:block bg-gray-800 text-white h-full"
      >
        <Sidebar />
      </div>
      <div
        className="hidden md:block w-1 bg-gray-700 cursor-col-resize hover:bg-gray-500 transition-colors"
        onMouseDown={handleMouseDown}
      ></div>
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<ProtectedRoute><HomeDashboard /></ProtectedRoute>} />
            <Route path="/kb" element={<ProtectedRoute><DcsKnowledgeBase /></ProtectedRoute>} />
            <Route path="/ask-dcs" element={<ProtectedRoute><AskDcsLLM /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/staff-directory" element={<ProtectedRoute><StaffDirectoryPage /></ProtectedRoute>} />
            <Route path="/systems-cheat-sheet" element={<ProtectedRoute><SystemsCheatSheetPage /></ProtectedRoute>} />
            <Route path="/event-roster" element={<ProtectedRoute><EventRosterPage /></ProtectedRoute>} />
            <Route path="/support-panel" element={<ProtectedRoute><PreschoolWellingtonSupportPage /></ProtectedRoute>} />
            <Route path="/task-tracker" element={<ProtectedRoute><TaskTrackerPage /></ProtectedRoute>} />
            <Route path="/resource-booking" element={<ProtectedRoute><ResourceBookingPage /></ProtectedRoute>} />
            <Route path="/announcements-panel" element={<ProtectedRoute><AnnouncementsPanelPage /></ProtectedRoute>} />
            <Route path="/onboarding-guide" element={<ProtectedRoute><OnboardingGuidePage /></ProtectedRoute>} />
            <Route path="/kb/:type/:id" element={<ProtectedRoute><KbDetailPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          
          {/* All other routes are protected */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
