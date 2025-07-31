"use client";

import AnimatedLogo from "@/components/ui/AnimatedLogo";
import MagicLinkForm from "@/components/ui/MagicLinkForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <AnimatedLogo />
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Tailor your resume
            </h1>

            {/* Magic Link Form */}
            <MagicLinkForm className="!bg-transparent !shadow-none !border-none !p-0" />
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-8 bg-blue-200 rounded-full opacity-30"></div>
          <div className="absolute top-40 right-20 w-24 h-6 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-20 h-4 bg-blue-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-16 h-3 bg-blue-300 rounded-full opacity-40"></div>
        </div>

        {/* Main illustration */}
        <div className="relative z-10">
          <div className="text-center">
            {/* Professional transformation illustration */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              {/* Before - Casual */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Before</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* After - Professional */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-blue-600 font-medium">After</p>
              </div>
            </div>

            {/* Resume document illustration */}
            <div className="bg-white rounded-lg shadow-lg p-6 mx-auto w-64">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <div className="text-sm font-semibold text-gray-800">Resume</div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Resume content lines */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              </div>

              {/* AI enhancement indicator */}
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-blue-600 font-medium">AI Enhanced</span>
                </div>
              </div>
            </div>

            {/* Success metrics */}
            <div className="mt-6 flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24hr</div>
                <div className="text-xs text-gray-600">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 