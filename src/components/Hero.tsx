
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Chrome } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 opacity-60"></div>
      
      {/* Content container */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left column - Text */}
          <div className="flex flex-col space-y-8">
            <div>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                New Platform for Startups
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Turn UI Videos into <span className="text-blue-600">Detailed Documentation</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Upload your UI tutorial videos and screenshots. Our AI instantly converts them into 
              comprehensive documentation for your new features and interfaces.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary text-base flex items-center gap-2" asChild>
                <a href="#upload">
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="text-base">
                Watch Demo
              </Button>
              <Button variant="secondary" className="text-base flex items-center gap-2">
                <Chrome className="w-5 h-5" /> Chrome Extension
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-800">SK</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-green-800">AG</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-800">TM</span>
                </div>
              </div>
              <p>Join <span className="font-medium">200+</span> startups already using AdaptiDemo Labs</p>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl animate-pulse-subtle"></div>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 animate-float">
              <div className="bg-gray-50 h-8 border-b flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="bg-gray-100 h-40 rounded-md mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
