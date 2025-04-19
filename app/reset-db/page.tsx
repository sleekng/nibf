'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetDbPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClearUsers = async () => {
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const response = await fetch('/api/clear-users');
      const data = await response.json();

      if (response.ok) {
        setStatus(`Successfully cleared ${data.count} users from the database.`);
      } else {
        setError(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setError('An error occurred while clearing users.');
      console.error('Error clearing users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestUser = async () => {
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const response = await fetch('/api/create-test-user');
      const data = await response.json();

      if (response.ok) {
        setStatus(`Test user created successfully. Email: test@example.com, Password: password123`);
      } else {
        setError(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setError('An error occurred while creating test user.');
      console.error('Error creating test user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Database Reset
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Clear users and create a new test user
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {status && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{status}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              onClick={handleClearUsers}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {loading ? 'Clearing...' : 'Clear All Users'}
            </button>

            <button
              onClick={handleCreateTestUser}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Creating...' : 'Create Test User'}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 