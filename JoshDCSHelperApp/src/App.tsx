import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import Dashboard from './routes/Dashboard';
import Settings from './routes/Settings';
import KnowledgeBasePage from './routes/KnowledgeBasePage';
import RoomsPage from './routes/RoomsPage';
import WorkflowsPage from './routes/WorkflowsPage';
import JournalPage from './routes/JournalPage';
import './styles/globals.css';

// Project structure summary:
// - `src/components/Layout`: Contains layout components like Sidebar and TopBar.
// - `src/routes`: Contains route components (e.g., Dashboard, Settings).
// - `src/styles`: Contains global styles (e.g., globals.css).
// - `src/data`: Placeholder for data modules (to be added for KB, workflows, rooms).
// - `src/App.tsx`: Main app entry point with routing setup.

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/kb" element={<KnowledgeBasePage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/workflows" element={<WorkflowsPage />} />
              <Route path="/journal" element={<JournalPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
