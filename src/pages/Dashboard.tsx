
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Import Input
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, Image, Clock, CheckCircle, AlertCircle, Edit, Save, X, Loader2 } from "lucide-react"; // Import icons including Loader2
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(document.title);
  const queryClient = useQueryClient(); // Get query client instance
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


  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
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
      <CardHeader className="pb-2 flex-grow">
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
            <CardTitle className="text-lg truncate flex-grow">{document.title}</CardTitle>
            {document.status === "completed" && !isSaving && ( // Only allow editing completed docs & not currently saving
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={(e) => { stopPropagation(e); handleEditClick(); }}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        <CardDescription>{document.date}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2"> {/* Reduced top padding */}
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
