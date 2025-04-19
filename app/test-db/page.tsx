'use client';

import { useState } from 'react';

export default function TestDBPage() {
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [testUserStatus, setTestUserStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkDB = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setDbStatus(data);
    } catch (error) {
      setDbStatus({
        status: 'error',
        message: 'Failed to check database',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const createTestUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-test-user');
      const data = await response.json();
      setTestUserStatus(data);
    } catch (error) {
      setTestUserStatus({
        status: 'error',
        message: 'Failed to create test user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Database Test Page</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Database Connection Test</h2>
          <button
            onClick={checkDB}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check Database Connection'}
          </button>
          
          {dbStatus && (
            <div className={`mt-4 p-4 rounded-md ${dbStatus.status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <h3 className="font-medium">{dbStatus.message}</h3>
              {dbStatus.userCount !== undefined && (
                <p>User count: {dbStatus.userCount}</p>
              )}
              {dbStatus.users && dbStatus.users.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-medium">Users:</h4>
                  <ul className="list-disc pl-5">
                    {dbStatus.users.map((user: any) => (
                      <li key={user.id}>
                        {user.firstName} {user.lastName} ({user.email})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {dbStatus.error && (
                <p className="text-red-600 mt-2">{dbStatus.error}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold mb-4">Create Test User</h2>
          <button
            onClick={createTestUser}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Test User'}
          </button>
          
          {testUserStatus && (
            <div className={`mt-4 p-4 rounded-md ${
              testUserStatus.status === 'success' ? 'bg-green-50' : 
              testUserStatus.status === 'info' ? 'bg-blue-50' : 'bg-red-50'
            }`}>
              <h3 className="font-medium">{testUserStatus.message}</h3>
              {testUserStatus.user && (
                <p className="mt-2">
                  Created user: {testUserStatus.user.firstName} {testUserStatus.user.lastName} ({testUserStatus.user.email})
                </p>
              )}
              {testUserStatus.error && (
                <p className="text-red-600 mt-2">{testUserStatus.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 