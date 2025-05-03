
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, Image, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockDocuments = [
  {
    id: 1,
    title: "User Profile Redesign",
    type: "video",
    status: "completed",
    date: "2023-05-01",
    preview: "/placeholder.svg",
  },
  {
    id: 2,
    title: "New Dashboard Features",
    type: "image",
    status: "processing",
    date: "2023-05-03",
    preview: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Mobile App Navigation",
    type: "video",
    status: "completed",
    date: "2023-04-28",
    preview: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Payment Flow Update",
    type: "video",
    status: "completed",
    date: "2023-04-25",
    preview: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Settings Page",
    type: "image",
    status: "failed",
    date: "2023-04-22",
    preview: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Onboarding Tutorial",
    type: "video",
    status: "completed",
    date: "2023-04-20",
    preview: "/placeholder.svg",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredDocuments = activeTab === "all" 
    ? mockDocuments 
    : mockDocuments.filter(doc => doc.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Documentation</h1>
              <p className="text-gray-600">Manage and create your feature documentation</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="btn-primary flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                New Upload
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-blue-600">12</CardTitle>
                <CardDescription>Total Documents</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-green-600">9</CardTitle>
                <CardDescription>Completed Documents</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-amber-600">3</CardTitle>
                <CardDescription>In Progress</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
              
              <div className="hidden md:block">
                <Button variant="outline" size="sm">
                  Sort by: Latest
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={doc.preview} 
                        alt={doc.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {doc.type === "video" ? (
                          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Video
                          </div>
                        ) : (
                          <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            Image
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        {doc.status === "completed" ? (
                          <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Complete
                          </div>
                        ) : doc.status === "processing" ? (
                          <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Processing
                          </div>
                        ) : (
                          <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Failed
                          </div>
                        )}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>{doc.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant={doc.status === "completed" ? "default" : "outline"}
                        className="w-full"
                        disabled={doc.status !== "completed"}
                      >
                        {doc.status === "completed" ? "View Document" : "Processing..."}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={doc.preview} 
                        alt={doc.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {doc.type === "video" ? (
                          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Video
                          </div>
                        ) : (
                          <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            Image
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Complete
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>{doc.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">View Document</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="processing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={doc.preview} 
                        alt={doc.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {doc.type === "video" ? (
                          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Video
                          </div>
                        ) : (
                          <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            Image
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Processing
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>{doc.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" disabled>
                        Processing...
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="failed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={doc.preview} 
                        alt={doc.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {doc.type === "video" ? (
                          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Video
                          </div>
                        ) : (
                          <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                            <Image className="h-3 w-3" />
                            Image
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Failed
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>{doc.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
