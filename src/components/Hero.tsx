
import React from "react";
// Removed duplicate imports below
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react"; // Removed duplicate Chrome, kept PlayCircle

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Optional: Add a subtle background pattern or texture here if desired */}
      {/* Example: <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-5"></div> */}

      {/* Content container */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left column - Text */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <div>
              {/* Updated Badge Styling */}
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                AI-Powered Documentation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Turn UI Recordings into <span className="text-primary">Flawless Guides</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Stop writing docs manually. Upload UI videos or use our extension, and let AI generate step-by-step guides, tutorials, and SOPs instantly.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {/* Updated Buttons using Shadcn variants */}
              <Button size="lg" className="text-base flex items-center gap-2" asChild>
                <a href="#upload">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              {/* Updated Watch Demo button to be a link to #how-it-works */}
              <Button size="lg" variant="outline" className="text-base flex items-center gap-2" asChild>
                 <a href="#how-it-works">
                   <PlayCircle className="w-5 h-5" /> Watch Demo
                 </a>
              </Button>
              {/* Optional: Keep Chrome Extension button if relevant */}
              {/* <Button size="lg" variant="secondary" className="text-base flex items-center gap-2">
                <Chrome className="w-5 h-5" /> Chrome Extension
              </Button> */}
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-muted-foreground pt-4">
              <div className="flex -space-x-2">
                {/* Updated Avatar Placeholders */}
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">S</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium text-secondary-foreground">A</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">T</span>
                </div>
              </div>
              {/* Corrected structure: Moved <p> inside the flex container */}
              <p>Join <span className="font-semibold text-foreground">200+</span> startups already using AdaptiDemo Labs</p> {/* Reverted Name */}
            </div> {/* This closes the flex container */}
          </div> {/* This closes the text column */}

          {/* Right column - Image/Graphic */}
          <div className="relative mt-12 lg:mt-0">
            {/* Removed pulsing background */}
            {/* Simplified placeholder styling */}
            <div className="relative bg-card rounded-xl shadow-lg overflow-hidden border border-border">
              {/* Simplified Header */}
              <div className="bg-muted/50 h-8 border-b flex items-center px-4">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-muted rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-muted rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-muted rounded-full"></div>
                </div>
              </div>
              {/* Removed extra closing div */}
              {/* Placeholder Content */}
              <div className="p-6">
                <div className="bg-muted h-48 rounded-lg mb-4 flex items-center justify-center">
                  {/* Replace with actual product image/graphic */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-muted-foreground/50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
            {/* Removed floating badge */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
