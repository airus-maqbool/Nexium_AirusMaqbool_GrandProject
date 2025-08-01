"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@supabase/supabase-js'; // ✅ Correct User type import

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // ✅ Replaced `any` with `User | null`
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
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
            <div className="flex space-x-4">
              <Link
                href="/home"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Resume Tailor
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Account</h2>
            <p className="text-blue-700">Email: {user?.email}</p>
            <p className="text-blue-700">User ID: {user?.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/home" className="block">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">Create New Resume</h3>
                <p className="text-blue-100">Start building your tailored resume with AI assistance.</p>
              </div>
            </Link>

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
