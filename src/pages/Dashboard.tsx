import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, Image, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"; // Added Loader2
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
// Removed unused checkStatus import
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// Mock function - replace with actual API call
const fetchDocuments = async (): Promise<Document[]> => {
  console.log("Fetching documents...");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app: return await fetch('/api/documents').then(res => res.json());
  return mockDocuments;
};

// Define Document type
interface Document {
  id: string;
  title: string;
  type: "video" | "image"; // Use union type
  status: "completed" | "processing" | "failed" | "uploaded"; // Use union type
  date: string;
  preview: string;
}

// Updated mock data with more diverse statuses
const mockDocuments: Document[] = [
  { id: "1", title: "User Profile Redesign Guide", type: "video", status: "completed", date: "2023-05-01", preview: "/placeholder.svg" },
  { id: "2", title: "New Dashboard Features Deck", type: "image", status: "processing", date: "2023-05-03", preview: "/placeholder.svg" },
  { id: "3", title: "Mobile App Navigation Flow", type: "video", status: "completed", date: "2023-04-28", preview: "/placeholder.svg" },
  { id: "4", title: "Payment Flow Update Steps", type: "video", status: "failed", date: "2023-04-25", preview: "/placeholder.svg" },
  { id: "5", title: "Settings Page Screenshots", type: "image", status: "uploaded", date: "2023-04-22", preview: "/placeholder.svg" },
  { id: "6", title: "Onboarding Tutorial Video", type: "video", status: "completed", date: "2023-04-20", preview: "/placeholder.svg" },
  { id: "7", title: "API Integration Guide", type: "video", status: "processing", date: "2023-05-04", preview: "/placeholder.svg" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("all"); // Explicitly type state
  const navigate = useNavigate();

  // Use React Query for data fetching and caching
  const { data: documents = [], isLoading, isError, error } = useQuery<Document[], Error>({ // Add types
    queryKey: ['documents'],
    queryFn: fetchDocuments,
    // Optional: Add staleTime or cacheTime if needed
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredDocuments = activeTab === "all"
    ? documents
    : documents.filter(doc => doc.status === activeTab);

  const navigateToUpload = () => {
    navigate('/#upload');
  };

  // Calculate counts after data fetching
  const totalCount = documents.length;
  const completedCount = documents.filter(doc => doc.status === "completed").length;
  const processingCount = documents.filter(doc => doc.status === "processing" || doc.status === "uploaded").length; // Include uploaded

  return (
    <div className="min-h-screen flex flex-col bg-background"> {/* Use theme background */}
      <Navbar />

      <div className="flex-grow py-8 md:py-12"> {/* Adjusted padding */}
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Documentation</h1> {/* Use theme text color */}
              <p className="text-muted-foreground">Manage and create your feature documentation</p> {/* Use theme text color */}
            </div>
            <div className="mt-4 md:mt-0">
              {/* Use default Button variant */}
              <Button
                className="flex items-center gap-2"
                onClick={navigateToUpload}
              >
                <UploadCloud className="h-4 w-4" />
                New Upload
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-4"> {/* Adjusted padding */}
                <CardTitle className="text-4xl font-bold text-primary"> {/* Use theme primary color */}
                  {isLoading ? <Skeleton className="h-10 w-16" /> : totalCount}
                </CardTitle>
                <CardDescription>Total Documents</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-bold text-emerald-600"> {/* Use success color */}
                   {isLoading ? <Skeleton className="h-10 w-16" /> : completedCount}
                </CardTitle>
                <CardDescription>Completed</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-bold text-amber-600"> {/* Use warning/progress color */}
                   {isLoading ? <Skeleton className="h-10 w-16" /> : processingCount}
                </CardTitle>
                <CardDescription>In Progress</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Tabs and Document List */}
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4"> {/* Added flex-wrap */}
              {/* Ensure Tabs use theme styling */}
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="uploaded">Uploaded</TabsTrigger> {/* Added Uploaded Tab */}
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>

              {/* Optional: Sorting Dropdown could be added here */}
              {/* <div className="hidden md:block">
                <Button variant="outline" size="sm">
                  Sort by: Latest
                </Button>
              </div> */}
            </div>

            {/* Unified TabsContent for rendering */}
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  // Skeleton Loading State
                  Array.from({ length: 6 }).map((_, index) => <DocumentCardSkeleton key={index} />)
                ) : isError ? (
                  <div className="col-span-full text-center py-12 text-destructive">
                     <AlertCircle className="mx-auto h-10 w-10 mb-4" />
                     <p className="text-lg font-medium">Error loading documents</p>
                     <p className="text-sm">{error?.message || "Could not fetch data."}</p>
                  </div>
                ) : filteredDocuments.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No documents found for "{activeTab}" status.</p>
                    <Button onClick={navigateToUpload}>Upload Your First Video</Button>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Document Card Component (Redesigned)
interface DocumentCardProps {
  document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const getStatusBadge = () => {
    switch (document.status) {
      case "completed":
        return (
          <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
            <CheckCircle className="h-3 w-3" /> Complete
          </div>
        );
      case "processing":
        return (
          <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
            <Clock className="h-3 w-3 animate-spin" /> Processing
          </div>
        );
       case "uploaded":
        return (
          <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
            <UploadCloud className="h-3 w-3" /> Uploaded
          </div>
        );
      case "failed":
        return (
          <div className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
            <AlertCircle className="h-3 w-3" /> Failed
          </div>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = () => {
     return document.type === "video" ? (
        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
          <FileText className="h-3 w-3" /> Video
        </div>
      ) : (
        <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
          <Image className="h-3 w-3" /> Image
        </div>
      )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Preview Image */}
      <div className="aspect-video bg-muted relative flex items-center justify-center"> {/* Use muted background */}
        <img
          src={document.preview}
          alt={document.title}
          className="w-full h-full object-cover opacity-80" // Slightly fade image
        />
         {/* Badges Overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
           {getTypeBadge()}
           {getStatusBadge()}
        </div>
      </div>
      {/* Card Content */}
      <CardHeader className="pb-3 pt-4"> {/* Adjust padding */}
        <CardTitle className="text-base font-semibold leading-tight truncate" title={document.title}> {/* Truncate long titles */}
          {document.title}
        </CardTitle>
        <CardDescription className="text-xs pt-1">{new Date(document.date).toLocaleDateString()}</CardDescription> {/* Format date */}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end pt-0 pb-4 px-4"> {/* Adjust padding */}
        <Button
          variant={document.status === "completed" ? "default" : "outline"}
          size="sm" // Smaller button
          className="w-full mt-2"
          disabled={document.status !== "completed"}
          asChild={document.status === "completed"} // Only use asChild if it's a link
        >
          {document.status === "completed" ? (
            <Link to={`/document/${document.id}`}>View Document</Link>
          ) : (
            // Provide more informative text based on status
            <span>{document.status === 'failed' ? 'View Error' : 'Processing...'}</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

// Skeleton component for loading state
const DocumentCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full bg-muted" />
      <CardHeader className="pb-3 pt-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="pt-0 pb-4 px-4">
        <Skeleton className="h-9 w-full mt-2" />
      </CardContent>
    </Card>
  );
};


export default Dashboard;
