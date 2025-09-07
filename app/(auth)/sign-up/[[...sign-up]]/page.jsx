import { SignUp } from "@clerk/nextjs";
import { Play, Video, Sparkles, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Design/Intro */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-white/20"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full border border-white/20"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-white/20"></div>
        </div>

        {/* Main Content */}
        <div className="text-center text-white z-10 max-w-md px-8">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Play className="w-10 h-10 text-white" fill="currentColor" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            AI Short Video
            <span className="block text-yellow-400">Generator</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Transform your ideas into engaging short videos with the power of AI
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Lightning fast generation</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Video className="w-5 h-5 text-yellow-400" />
              <span>Professional quality output</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>AI-powered creativity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="flex-1 bg-gradient-to-br from-slate-200 via-gray-200 to-blue-200 flex items-center justify-center p-8 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.25]">
          <div className="absolute top-16 right-16 w-32 h-32 rounded-full bg-purple-300"></div>
          <div className="absolute bottom-24 left-12 w-20 h-20 rounded-full bg-blue-300"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-indigo-300"></div>
          <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-violet-300"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Join ClipticAI
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Create your account and start generating amazing videos
            </p>
          </div>

          {/* Sign Up Form - No outer container */}
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-xl border border-white/50 backdrop-blur-sm bg-white/80",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              },
            }}
          />

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-sm"></div>
              <span className="font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-sm"></div>
              <span className="font-medium">Fast Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-purple-400 rounded-full shadow-sm"></div>
              <span className="font-medium">Free Trial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
