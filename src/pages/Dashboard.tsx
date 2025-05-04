
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UploadCloud, FileText, Image as ImageIcon, Clock, CheckCircle, AlertCircle, Edit, Save, X, Loader2, 
  Folder, FileCheck, FileClock, FileWarning, FileSearch // Added more icons
} from "lucide-react"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { checkStatus, fetchDocsFolders, updateDocumentTitle } from "@/services/apiService"; // Import updateDocumentTitle
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Import mutation hooks
import { useToast } from "@/components/ui/use-toast"; // Import useToast

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
      
      {/* Use a slightly different background and adjust padding */}
      <div className="flex-grow bg-slate-50 py-10"> 
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10"> {/* Increased bottom margin */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Your Documentation</h1> {/* Darker heading */}
              <p className="text-slate-500 mt-1">Manage and create your feature documentation</p> {/* Adjusted text color and margin */}
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
          
          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"> {/* Increased bottom margin */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Total Documents</CardTitle>
                <Folder className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : documents?.length || 0}
                </div>
                <p className="text-xs text-slate-400 mt-1">All uploaded items</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Completed</CardTitle>
                <FileCheck className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">
                   {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : documents?.filter(doc => doc.status === "completed").length || 0}
                </div>
                 <p className="text-xs text-slate-400 mt-1">Ready to view</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-200">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">In Progress</CardTitle>
                <FileClock className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">
                   {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : documents?.filter(doc => doc.status === "processing").length || 0}
                </div>
                 <p className="text-xs text-slate-400 mt-1">Currently processing</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-8"> {/* Increased bottom margin */}
              {/* Refined TabsList styling */}
              <TabsList className="bg-slate-200 p-1 rounded-lg"> 
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 rounded-md">All</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 rounded-md">Completed</TabsTrigger>
                <TabsTrigger value="processing" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 rounded-md">Processing</TabsTrigger>
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
                  // Skeleton Loader for 'all' tab
                  Array.from({ length: 3 }).map((_, index) => <DocumentCardSkeleton key={index} />) 
                ) : error ? (
                  <div className="col-span-full text-center py-12 text-red-600">Error loading documents</div>
                ) : filteredDocuments.length === 0 ? (
                  <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm"> {/* Added background and shadow */}
                    <FileSearch className="h-12 w-12 mx-auto text-slate-400 mb-4" /> {/* Larger icon */}
                    <p className="text-slate-500 mb-6 text-lg">No documents found</p>
                    <Button onClick={navigateToUpload} variant="default"> {/* Use default variant */}
                       <UploadCloud className="mr-2 h-4 w-4" /> Upload your first document
                    </Button>
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
                  {isLoading ? (
                     // Skeleton Loader for other tabs
                     Array.from({ length: 3 }).map((_, index) => <DocumentCardSkeleton key={index} />)
                  ) : filteredDocuments.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm"> {/* Consistent empty state */}
                       <FileSearch className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                       <p className="text-slate-500 mb-6 text-lg">No {tabValue} documents found</p>
                       <Button onClick={navigateToUpload} variant="default">
                         <UploadCloud className="mr-2 h-4 w-4" /> Upload a document
                       </Button>
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
    preview?: string; // Make preview optional as it might not always be available
  };
}

// Utility function to get status color and icon
const getStatusAttributes = (status: string) => {
  switch (status) {
    case "completed":
      return { color: "border-green-500", bgColor: "bg-green-100", textColor: "text-green-700", Icon: CheckCircle };
    case "processing":
      return { color: "border-amber-500", bgColor: "bg-amber-100", textColor: "text-amber-700", Icon: Clock };
    case "failed":
      return { color: "border-red-500", bgColor: "bg-red-100", textColor: "text-red-700", Icon: AlertCircle };
    default:
      return { color: "border-slate-300", bgColor: "bg-slate-100", textColor: "text-slate-700", Icon: FileText }; // Default case
  }
};


const DocumentCard = ({ document }: DocumentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(document.title);
  const { color: statusBorderColor, bgColor: statusBgColor, textColor: statusTextColor, Icon: StatusIcon } = getStatusAttributes(document.status);
  const queryClient = useQueryClient();
  const { toast } = useToast(); // Get toast function

  const { mutate: saveTitle, isPending: isSaving } = useMutation({
    mutationFn: (newTitle: string) => updateDocumentTitle(document.id, newTitle),
    onSuccess: () => {
      // Invalidate the documents query to refetch data with the new title
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setIsEditing(false); // Exit editing mode on success
      toast({
        title: "Title Updated",
        description: `Document title saved successfully.`,
      });
    },
    onError: (error) => {
      console.error("Failed to update title:", error);
      setIsEditing(false); // Optionally exit editing mode on error too, or keep it open
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Could not save the new title.",
        variant: "destructive",
      });
      // Optionally reset editedTitle back to original document.title here if desired
      // setEditedTitle(document.title);
    },
  });


  const handleEditClick = () => {
    setEditedTitle(document.title); // Reset to original title on edit start
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // No need to reset editedTitle here, it resets on next edit click
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() === document.title) {
      // No change, just cancel editing
      setIsEditing(false);
      return;
    }
    if (editedTitle.trim() === "") {
      toast({
        title: "Invalid Title",
        description: "Title cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    saveTitle(editedTitle.trim());
  };

  // Prevent card click navigating when clicking edit/save/cancel buttons
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };


  // Construct the thumbnail URL based on the document ID and expected path
  // Assuming keyframes are JPGs and we want the first one.
  // Adjust the base path and filename if necessary based on actual backend setup.
  const thumbnailUrl = `/${document.id}/output/keyframes/keyframe_001.jpg`; 

  return (
    // Added status border color and slightly increased hover shadow
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col border-l-4 ${statusBorderColor}`}>
      <div className="aspect-video bg-slate-100 relative flex items-center justify-center"> {/* Centered placeholder */}
        {/* Use the dynamically constructed thumbnail URL */}
        <img 
          // Use thumbnailUrl, provide a fallback or placeholder logic if needed
          src={thumbnailUrl} 
          alt={`Preview for ${document.title}`} 
          className="w-full h-full object-cover"
          // Add error handling for the image if the path is incorrect or image missing
          onError={(e) => {
            // Replace with a placeholder icon if the image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop if placeholder also fails
            // Option 1: Hide the image element (if parent handles centering)
            // target.style.display = 'none'; 
            // Option 2: Replace src with a placeholder SVG or keep the background
             target.src = '/placeholder.svg'; // Make sure placeholder.svg exists in public
             target.classList.add('p-4', 'object-contain'); // Adjust styling for placeholder
          }}
        />
        {/* Type Badge - Adjusted styling */}
        <div className="absolute top-2 right-2">
          {document.type === "video" ? (
            <div className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-200">
              <FileText className="h-3 w-3" />
              Video
            </div>
          ) : (
            <div className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-purple-200">
              <ImageIcon className="h-3 w-3" />
              Image
            </div>
          )}
        </div>
      </div>
      {/* Adjusted padding and spacing in CardHeader */}
      <CardHeader className="p-4 pb-2 flex-grow"> 
        {isEditing ? (
          <div className="flex items-center gap-2" onClick={stopPropagation}>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="h-8 text-lg flex-grow" // Match title size roughly, allow grow
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleSaveClick(); if (e.key === 'Escape') handleCancelClick(); }}
              disabled={isSaving} // Disable input while saving
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleSaveClick} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleCancelClick} disabled={isSaving}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            {/* Title and Edit Button */}
            <CardTitle className="text-base font-semibold truncate flex-grow mr-1">{document.title}</CardTitle> 
            {document.status === "completed" && !isSaving && ( 
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 flex-shrink-0 text-slate-500 hover:text-slate-700" // Smaller, subtle color
                onClick={(e) => { stopPropagation(e); handleEditClick(); }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
         {/* Date and Status Badge */}
        <div className="flex items-center justify-between mt-1">
           <CardDescription className="text-xs">{document.date}</CardDescription>
           <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusBgColor} ${statusTextColor}`}>
              <StatusIcon className="h-3 w-3" />
              {document.status.charAt(0).toUpperCase() + document.status.slice(1)} {/* Capitalize status */}
           </div>
        </div>
      </CardHeader>
      {/* Adjusted padding in CardContent */}
      <CardContent className="p-4 pt-2"> 
        <Button
          variant={document.status === "completed" ? "default" : "secondary"} // Use secondary for non-completed
          size="sm" // Slightly smaller button
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

// Skeleton component for DocumentCard loading state
const DocumentCardSkeleton = () => {
  return (
    <Card className="overflow-hidden flex flex-col border-l-4 border-slate-200">
      <Skeleton className="aspect-video w-full bg-slate-200" /> 
      <CardHeader className="p-4 pb-2 flex-grow">
        <Skeleton className="h-5 w-3/4 mb-2 bg-slate-200" /> {/* Title skeleton */}
        <div className="flex items-center justify-between mt-1">
          <Skeleton className="h-3 w-1/4 bg-slate-200" /> {/* Date skeleton */}
          <Skeleton className="h-5 w-1/3 rounded-full bg-slate-200" /> {/* Status skeleton */}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Skeleton className="h-9 w-full bg-slate-200" /> {/* Button skeleton */}
      </CardContent>
    </Card>
  );
};


export default Dashboard;
