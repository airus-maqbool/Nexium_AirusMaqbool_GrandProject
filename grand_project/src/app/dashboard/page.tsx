"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Welcome to Resume Tailor</h1>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Account</h2>
            <p className="text-blue-700">Email: {user?.email}</p>
            <p className="text-blue-700">User ID: {user?.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Create New Resume</h3>
              <p className="text-blue-100">Start building your tailored resume with AI assistance.</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">My Resumes</h3>
              <p className="text-green-100">View and edit your existing resumes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 