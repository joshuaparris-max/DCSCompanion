import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { EmailVerificationBanner } from '../EmailVerificationBanner';

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return '?';
    }
    try {
      return name
        .trim()
        .split(/\s+/)
        .map((n) => n[0]?.toUpperCase())
        .join('')
        .slice(0, 2) || '?';
    } catch {
      return '?';
    }
  };

  return (
    <>
      <EmailVerificationBanner />
      <header className="flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="font-bold text-lg text-gray-900 dark:text-white">DCS Companion</div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/kb" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Knowledge Base
            </Link>
            <Link to="/ask-dcs" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Ask DCS
            </Link>
          </nav>

          {/* Account Menu */}
          {user && profile && (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(profile.displayName || user.email || 'User')}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{String(profile.displayName || user.email || 'User')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{String(profile.role || 'staff').toLowerCase()}</p>
                </div>
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-600">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{String(profile.displayName || user.email || 'User')}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{String(user.email || 'Email')}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-40 md:hidden">
            <Link to="/" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link to="/kb" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700" onClick={() => setOpen(false)}>Knowledge Base</Link>
            <Link to="/ask-dcs" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700" onClick={() => setOpen(false)}>Ask DCS</Link>
            <Link to="/profile" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700" onClick={() => setOpen(false)}>My Profile</Link>
            <Link to="/settings" className="block px-4 py-2 border-b border-gray-200 dark:border-gray-700" onClick={() => setOpen(false)}>Settings</Link>
            <button
              onClick={() => {
                handleSignOut();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Sign Out
            </button>
          </nav>
        )}
      </header>
    </>
  );
}

