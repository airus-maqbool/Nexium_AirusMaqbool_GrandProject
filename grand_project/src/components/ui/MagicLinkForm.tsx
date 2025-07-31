"use client";
import * as React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MagicLinkForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Check if Supabase client is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Supabase configuration is missing. Please check your environment variables.");
      }

      console.log("Attempting to send magic link to:", email);
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("Supabase Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      
      const { data, error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase error details:", error);
        
        // Handle specific error types
        if (error.message.includes("rate limit") || error.message.includes("too many requests")) {
          setError("Too many requests. Please wait a few minutes before trying again, or try with a different email address.");
        } else if (error.message.includes("confirmation email") || error.message.includes("sending")) {
          setError("Email service issue. Please check your Supabase email settings or try again later.");
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        console.log("Magic link sent successfully:", data);
        setMessage("Check your email for the magic link! If you don't see it, check your spam folder.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-4",
        className
      )}
    >
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        disabled={loading}
      />
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        disabled={loading || !email}
      >
        {loading ? (
          <span className="animate-pulse">Sending magic link...</span>
        ) : (
          "Send Magic Link"
        )}
      </Button>
      {message && (
        <div className="text-green-600 text-center p-3 bg-green-50 rounded-md border border-green-200 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="text-red-600 text-center p-3 bg-red-50 rounded-md border border-red-200 text-sm">
          {error}
          {error.includes("rate limit") && (
            <div className="mt-2 text-xs text-red-500">
              💡 Try using a different email address or wait 5-10 minutes.
            </div>
          )}
          {error.includes("Email service issue") && (
            <div className="mt-2 text-xs text-red-500">
              💡 Check your Supabase email configuration in the dashboard.
            </div>
          )}
        </div>
      )}
    </form>
  );
} 