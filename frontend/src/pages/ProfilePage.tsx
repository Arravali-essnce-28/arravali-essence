import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading your profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-10 text-white">
          <h1 className="text-3xl font-bold">Account overview</h1>
          <p className="mt-2 text-sm text-primary-100">
            Manage your personal details and keep your account up to date.
          </p>
        </div>

        <div className="px-6 py-8 space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">Profile details</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <div className="mt-4 bg-gray-50 rounded-2xl p-6">
              <p className="text-sm text-gray-600">
                For any security or password updates, contact our support team or use the password reset link on the login page.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
