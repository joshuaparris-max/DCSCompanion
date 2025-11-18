import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import HomeDashboard from './pages/HomeDashboard';
import DcsKnowledgeBase from './pages/DcsKnowledgeBase';
import AskDcsLLM from './pages/AskDcsLLM';
import SettingsPage from './pages/SettingsPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage';
import SystemsCheatSheetPage from './pages/SystemsCheatSheetPage';
import EventRosterPage from './pages/EventRosterPage';
import PreschoolWellingtonSupportPage from './pages/PreschoolWellingtonSupportPage';
import TaskTrackerPage from './pages/TaskTrackerPage';
import ResourceBookingPage from './pages/ResourceBookingPage';
import AnnouncementsPanelPage from './pages/AnnouncementsPanelPage';
import OnboardingGuidePage from './pages/OnboardingGuidePage';
import { useState, useEffect } from 'react';
import './styles/globals.css';

function App() {
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
    <Router>
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
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/kb" element={<DcsKnowledgeBase />} />
              <Route path="/ask-dcs" element={<AskDcsLLM />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/staff-directory" element={<StaffDirectoryPage />} />
              <Route path="/systems-cheat-sheet" element={<SystemsCheatSheetPage />} />
              <Route path="/event-roster" element={<EventRosterPage />} />
              <Route path="/support-panel" element={<PreschoolWellingtonSupportPage />} />
              <Route path="/task-tracker" element={<TaskTrackerPage />} />
              <Route path="/resource-booking" element={<ResourceBookingPage />} />
              <Route path="/announcements-panel" element={<AnnouncementsPanelPage />} />
              <Route path="/onboarding-guide" element={<OnboardingGuidePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
