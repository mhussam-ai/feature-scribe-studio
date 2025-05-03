
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, Image, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { checkStatus } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

import { fetchDocsFolders } from "@/services/apiService";

// Fetch folders from the backend API
const fetchDocuments = async () => {
  return await fetchDocsFolders();
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  const { data: documents, isLoading, error } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  });
  
  const filteredDocuments = !documents 
    ? [] 
    : activeTab === "all" 
      ? documents 
      : documents.filter(doc => doc.status === activeTab);

  const navigateToUpload = () => {
    navigate('/#upload');  // Navigate to the upload section on the home page
  };

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
              <Button 
                className="btn-primary flex items-center gap-2"
                onClick={navigateToUpload}
              >
                <UploadCloud className="h-4 w-4" />
                New Upload
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-blue-600">
                  {documents?.length || 0}
                </CardTitle>
                <CardDescription>Total Documents</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-green-600">
                  {documents?.filter(doc => doc.status === "completed").length || 0}
                </CardTitle>
                <CardDescription>Completed Documents</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-amber-600">
                  {documents?.filter(doc => doc.status === "processing").length || 0}
                </CardTitle>
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
                {isLoading ? (
                  <p>Loading documents...</p>
                ) : error ? (
                  <p>Error loading documents</p>
                ) : filteredDocuments.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 mb-4">No documents found</p>
                    <Button onClick={navigateToUpload}>Upload a Video or Image</Button>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))
                )}
              </div>
            </TabsContent>
            
            {["completed", "processing", "failed"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocuments.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 mb-4">No {tabValue} documents found</p>
                      <Button onClick={navigateToUpload}>Upload a Video or Image</Button>
                    </div>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <DocumentCard key={doc.id} document={doc} />
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

interface DocumentCardProps {
  document: {
    id: string;
    title: string;
    type: string;
    status: string;
    date: string;
    preview: string;
  };
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="aspect-video bg-gray-100 relative">
        <img 
          src={document.preview} 
          alt={document.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          {document.type === "video" ? (
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
          {document.status === "completed" ? (
            <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Complete
            </div>
          ) : document.status === "processing" ? (
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
        <CardTitle className="text-lg">{document.title}</CardTitle>
        <CardDescription>{document.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant={document.status === "completed" ? "default" : "outline"}
          className="w-full"
          disabled={document.status !== "completed"}
          asChild
        >
          {document.status === "completed" ? (
            <Link to={`/document/${document.id}`}>View Document</Link>
          ) : (
            <span>Processing...</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
