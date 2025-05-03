
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Monitor, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComingSoonFeatures = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 mb-4 px-3 py-1 border-blue-200">
            Launching Soon
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Exciting New Features on the Horizon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're constantly innovating to bring you more powerful tools for product documentation
            and onboarding experiences.
          </p>
        </div>

        <Tabs defaultValue="demo-videos" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="demo-videos" className="py-3">
              <Monitor className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">AI</span> Demo Videos
            </TabsTrigger>
            <TabsTrigger value="guided-tours" className="py-3">
              <Navigation className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Interactive</span> Guided Tours
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <TabsContent value="demo-videos" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="text-blue-600 mb-4">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Generate Custom Demo Videos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create personalized walkthrough videos for your enterprise solution that 
                    adapt to different user personas. Edit on the fly and automatically update 
                    when your UI changes.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-center">
                      <span className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Persona-based customization
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Dynamic UI updates
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Easy editing capabilities
                    </li>
                  </ul>
                  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-fit">
                    Join Waitlist
                  </Button>
                </div>
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-md aspect-video bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-8 bg-black/20 rounded-t-lg flex items-center">
                      <div className="flex space-x-2 ml-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="guided-tours" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="text-blue-600 mb-4">
                    <Navigation className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Interactive Guided Tours
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create step-by-step guided tours of your web or mobile app that help users
                    navigate your product effortlessly. Tours automatically update when your UI changes.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-center">
                      <span className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Joyride-style interactive tours
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Adapts to UI changes
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      Works with web and mobile apps
                    </li>
                  </ul>
                  <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-fit">
                    Join Waitlist
                  </Button>
                </div>
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-md aspect-video bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-2/3 h-16 bg-blue-600 text-white p-4 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center shadow-xl">
                        <div className="text-sm font-bold mb-1">Welcome to your dashboard!</div>
                        <div className="text-xs opacity-80">Click here to create your first project</div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 w-8 h-8 bg-blue-600 rotate-45"></div>
                      <div className="absolute bottom-10 right-10 h-10 w-24 bg-blue-600 opacity-30 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ComingSoonFeatures;
