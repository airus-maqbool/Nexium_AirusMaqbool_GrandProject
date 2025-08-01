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
      console.log("Sending magic link to:", email);
      
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error("Magic link error:", error);
        
        // Handle email configuration error
        if (error.message.includes("confirmation email") || 
            error.message.includes("sending") || 
            error.message.includes("Error sending confirmation email")) {
          setError("Email service not configured. Please enable email service in your Supabase dashboard.");
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        console.log("Magic link sent successfully");
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
    <div>
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
            {error.includes("Email service not configured") && (
              <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                <div className="font-semibold text-blue-800 mb-2">🔧 Enable Email Service:</div>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Go to your Supabase Dashboard</li>
                  <li>Navigate to Authentication → Settings (not Email Templates)</li>
                  <li>Scroll down to &quot;Email Auth&quot; section</li>
                  <li>Enable &quot;Enable email confirmations&quot;</li>
                  <li>Enable &quot;Enable magic link&quot;</li>
                  <li>Save changes</li>
                  <li>Then go to Authentication → Email Templates</li>
                  <li>Click &quot;Enable built-in email service&quot; at the top</li>
                </ol>
                <div className="mt-2 text-xs text-blue-600">
                  💡 The &quot;Enable magic link&quot; toggle is in Settings, not Email Templates!
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 