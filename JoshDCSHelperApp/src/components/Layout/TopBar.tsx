import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="font-bold text-lg">DCS Companion</div>
      <button className="p-2" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span className="material-icons">menu</span>
      </button>
      {open && (
        <nav className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-10">
          <Link to="/" className="block px-4 py-2" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/ict" className="block px-4 py-2" onClick={() => setOpen(false)}>ICT Desk</Link>
          <Link to="/library" className="block px-4 py-2" onClick={() => setOpen(false)}>Library Tools</Link>
          <Link to="/settings" className="block px-4 py-2" onClick={() => setOpen(false)}>Settings</Link>
        </nav>
      )}
    </header>
  );
}
