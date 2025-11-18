import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function VerifyEmailPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (!loading && user && user.emailVerified) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.emailVerified) {
    return null;
  }

  const handleRefresh = async () => {
    await user.reload();
    if (user.emailVerified) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We've sent a verification link to <strong>{user.email}</strong>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          Click the link in your email to verify your account and get full access to DCS Companion.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors font-medium"
          >
            I've Verified My Email
          </button>
          <Link
            to="/login"
            className="block px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded transition-colors font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
