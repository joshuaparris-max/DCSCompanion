import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../services/userProfileService';

export default function ProfilePage() {
  const { user, profile, refreshProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [editData, setEditData] = useState({
    displayName: profile?.displayName || '',
    department: profile?.department || '',
    focus: profile?.preferences.focus || '',
    scripture: profile?.preferences.scripture || '',
    theme: profile?.preferences.theme || 'light',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const updatePayload: { displayName?: string; department?: string; preferences?: any } = {
        displayName: editData.displayName,
        department: editData.department,
        preferences: {
          ...profile!.preferences,
          focus: editData.focus,
          scripture: editData.scripture,
          theme: editData.theme as 'light' | 'dark',
        },
      };

      await updateUserProfile(user.uid, updatePayload);
      await refreshProfile();

      setMessage({
        type: 'success',
        text: 'Profile updated successfully!',
      });
      setIsEditing(false);

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error ? error.message : 'Failed to update profile',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    if (!profile) return;

    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dcs-companion-profile-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMessage({
      type: 'success',
      text: 'Profile data exported successfully!',
    });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure? This action cannot be undone. All your data will be deleted.'
      )
    ) {
      setIsDeleting(true);
      try {
        throw new Error(
          'Account deletion is not yet implemented. Contact your administrator.'
        );
      } catch (error) {
        setMessage({
          type: 'error',
          text:
            error instanceof Error
              ? error.message
              : 'Failed to delete account',
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
          }`}
        >
          <p
            className={
              message.type === 'success'
                ? 'text-green-800 dark:text-green-300'
                : 'text-red-800 dark:text-red-300'
            }
          >
            {message.text}
          </p>
        </div>
      )}

      {/* Account Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account Information
            </h2>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
            >
              Edit Profile
            </button>
          )}
        </div>

        {!isEditing ? (
          // Display Mode
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </p>
                <p className="text-gray-900 dark:text-white mt-1">
                  {profile.email}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Display Name
                </p>
                <p className="text-gray-900 dark:text-white mt-1">
                  {String(profile.displayName || '')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Department
                </p>
                <p className="text-gray-900 dark:text-white mt-1">
                  {profile.department || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Role
                </p>
                <p className="text-gray-900 dark:text-white mt-1 capitalize">
                  {String(profile.role || 'staff').toLowerCase()}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Focus Statement
              </p>
              <p className="text-gray-900 dark:text-white mt-1">
                {profile.preferences.focus || 'Not set'}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Scripture/Verse
              </p>
              <p className="text-gray-900 dark:text-white mt-1">
                {profile.preferences.scripture || 'Not set'}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Theme Preference
              </p>
              <p className="text-gray-900 dark:text-white mt-1 capitalize">
                {profile.preferences.theme}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Account Created
              </p>
              <p className="text-gray-900 dark:text-white mt-1">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Last Login
              </p>
              <p className="text-gray-900 dark:text-white mt-1">
                {new Date(profile.lastLogin).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={editData.displayName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={editData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Focus Statement
              </label>
              <textarea
                name="focus"
                value={editData.focus}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="What is your main focus today?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Scripture/Verse
              </label>
              <textarea
                name="scripture"
                value={editData.scripture}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Your favorite verse or daily scripture"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme Preference
              </label>
              <select
                name="theme"
                value={editData.theme}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-md transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Data & Account Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Data & Account
        </h2>
        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Export My Data
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download your profile data as JSON
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="w-full px-4 py-3 text-left bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div>
              <p className="font-medium text-red-700 dark:text-red-400">
                Delete My Account
              </p>
              <p className="text-sm text-red-600 dark:text-red-300">
                Permanently delete your account and all associated data
              </p>
            </div>
            <svg className="w-5 h-5 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
