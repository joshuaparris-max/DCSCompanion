import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function EmailVerificationBanner() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!user || user.emailVerified || !profile) {
    return null;
  }

  const handleResendEmail = async () => {
    try {
      setLoading(true);
      setMessage(null);
      await user.reload();
      if (!user.emailVerified) {
        const { resendVerificationEmail } = await import('../contexts/AuthContext').then(
          ({ useAuth }) => useAuth()
        );
        // Use the auth context resend function from parent component instead
        window.dispatchEvent(new CustomEvent('resendVerification'));
        setMessage({ type: 'success', text: 'Verification email sent!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to resend verification email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="text-yellow-600 dark:text-yellow-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Please verify your email address
          </p>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
            We've sent a verification link to {user.email}
          </p>
        </div>
        <button
          onClick={handleResendEmail}
          disabled={loading}
          className="ml-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-500 text-white text-sm rounded transition-colors"
        >
          {loading ? 'Sending...' : 'Resend'}
        </button>
      </div>
      {message && (
        <p className={`text-xs mt-2 ${message.type === 'success' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
