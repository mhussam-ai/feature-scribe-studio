
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, FileText, Copy, CheckCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mb-6">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">User Profile Redesign</h1>
                <p className="text-gray-600">Generated on May 1, 2023</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-1">
                  <Copy className="h-4 w-4" /> Copy
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar with source and metadata */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-medium mb-4">Source Material</h3>
                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="bg-gray-100 aspect-video flex items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium">profile_update_demo.mp4</p>
                    <p className="text-sm text-gray-500">3:24 • 14.6MB</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Document Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Completed</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Word Count</p>
                    <p className="font-medium">856 words</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Sections</p>
                    <p className="font-medium">5 sections</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Images</p>
                    <p className="font-medium">8 extracted</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Tabs defaultValue="document">
                  <TabsList className="mb-6">
                    <TabsTrigger value="document">Document</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="code">Code Samples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="document" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">User Profile Redesign Documentation</h2>
                      <p className="text-gray-600">
                        This document outlines the new user profile features and UI changes implemented in the latest update.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">1. Overview</h3>
                      <p>
                        The redesigned user profile page offers a more intuitive and personalized experience. Users can now easily update their information, manage privacy settings, and customize their profile appearance all from a single dashboard interface.
                      </p>
                      <div className="bg-gray-100 rounded-md p-4">
                        <img 
                          src="/placeholder.svg" 
                          alt="Profile Dashboard Overview" 
                          className="rounded-md w-full h-auto mb-2"
                        />
                        <p className="text-sm text-gray-500">Fig 1: The new profile dashboard interface</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">2. Key Features</h3>
                      
                      <h4 className="text-lg font-medium">2.1 Profile Customization</h4>
                      <p>
                        Users can now update their profile picture, cover photo, and display name directly from the profile header. The new drag-and-drop interface makes it easy to upload and position images.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Drag-and-drop image uploads</li>
                        <li>Image cropping and filtering options</li>
                        <li>Real-time preview of changes</li>
                      </ul>
                      
                      <h4 className="text-lg font-medium">2.2 Privacy Controls</h4>
                      <p>
                        The redesigned privacy section allows users to control visibility of their profile information with granular permissions. Users can set different visibility levels for different sections of their profile.
                      </p>
                      <div className="bg-gray-100 rounded-md p-4">
                        <img 
                          src="/placeholder.svg" 
                          alt="Privacy Controls" 
                          className="rounded-md w-full h-auto mb-2"
                        />
                        <p className="text-sm text-gray-500">Fig 2: Privacy control panel with granular settings</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">3. Navigation</h3>
                      <p>
                        The profile page now features a tabbed interface that allows users to easily switch between different sections:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Overview - Shows a summary of the user's profile and recent activity</li>
                        <li>Personal Info - For updating contact information and personal details</li>
                        <li>Privacy - Controls for profile visibility and data sharing</li>
                        <li>Notifications - Settings for email and push notifications</li>
                        <li>Connected Accounts - Manage integrations with other services</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="images">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src="/placeholder.svg" 
                          alt="Screenshot 1" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium">Profile Dashboard</p>
                          <p className="text-sm text-gray-500">Main interface overview</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src="/placeholder.svg" 
                          alt="Screenshot 2" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium">Privacy Controls</p>
                          <p className="text-sm text-gray-500">Settings panel for privacy</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src="/placeholder.svg" 
                          alt="Screenshot 3" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium">Edit Profile Modal</p>
                          <p className="text-sm text-gray-500">Popup for quick edits</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src="/placeholder.svg" 
                          alt="Screenshot 4" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium">Notification Center</p>
                          <p className="text-sm text-gray-500">Alerts and message interface</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Profile Component</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto">
                          <pre className="text-sm">
{`import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.coverPhoto} className="cover-photo" />
        <div className="profile-info">
          <img src={user.avatar} className="avatar" />
          <h1>{user.displayName}</h1>
          <p>{user.bio}</p>
        </div>
      </div>
      
      <div className="profile-tabs">
        {/* Tab navigation */}
      </div>

      <div className="profile-content">
        {/* Tab content */}
      </div>
    </div>
  );
};

export default UserProfile;`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Privacy Settings Hook</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto">
                          <pre className="text-sm">
{`import { useState, useEffect } from 'react';

export const usePrivacySettings = (userId) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user privacy settings
    const fetchSettings = async () => {
      try {
        const response = await api.get(\`/users/\${userId}/privacy\`);
        setSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch privacy settings', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [userId]);
  
  const updateSetting = async (key, value) => {
    try {
      await api.patch(\`/users/\${userId}/privacy\`, { [key]: value });
      setSettings(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (error) {
      console.error('Failed to update privacy setting', error);
      return false;
    }
  };
  
  return { settings, loading, updateSetting };
};`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocumentView;
