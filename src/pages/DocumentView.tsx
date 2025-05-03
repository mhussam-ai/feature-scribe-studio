
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, FileText, Copy, CheckCircle, Share2, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getDocumentDownloadUrl } from "@/services/apiService";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

// Markdown parser dependency will be added
import ReactMarkdown from 'react-markdown';

const fetchDocumentContent = async (videoId: string): Promise<string> => {
  const response = await fetch(getDocumentDownloadUrl(videoId));
  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }
  return await response.text();
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const {
    data: markdownContent,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["document", id],
    queryFn: () => id ? fetchDocumentContent(id) : Promise.reject("No document ID"),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error fetching document",
        description: error instanceof Error ? error.message : "Failed to load document",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const handleCopy = () => {
    if (markdownContent) {
      navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Document content has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!id) {
    return <div className="p-8 text-center">Document ID not provided</div>;
  }

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
                <h1 className="text-3xl font-bold">Generated Documentation</h1>
                <p className="text-gray-600">Document ID: {id}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleCopy}
                  disabled={isLoading || isError}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  disabled={isLoading || isError}
                  asChild
                >
                  <a href={getDocumentDownloadUrl(id)} download>
                    <Download className="h-4 w-4" /> Export
                  </a>
                </Button>
                <Button 
                  className="flex items-center gap-1"
                  disabled={isLoading || isError}
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar with metadata */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-medium mb-4">Document Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Completed</span>
                    </div>
                  </div>
                  
                  {!isLoading && !isError && markdownContent && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Word Count</p>
                        <p className="font-medium">{markdownContent.split(/\s+/).length} words</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Generated On</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Tabs defaultValue="document">
                  <TabsList className="mb-6">
                    <TabsTrigger value="document">Document</TabsTrigger>
                    <TabsTrigger value="markdown">Raw Markdown</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="document" className="space-y-6 min-h-[400px]">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                          <p>Loading documentation...</p>
                        </div>
                      </div>
                    ) : isError ? (
                      <div className="text-center py-12">
                        <p className="text-red-500 mb-4">Failed to load document</p>
                        <Button>Try Again</Button>
                      </div>
                    ) : (
                      <div className="prose prose-blue max-w-none">
                        <ReactMarkdown>{markdownContent || ''}</ReactMarkdown>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="markdown" className="min-h-[400px]">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                          <p>Loading markdown...</p>
                        </div>
                      </div>
                    ) : isError ? (
                      <div className="text-center py-12">
                        <p className="text-red-500 mb-4">Failed to load document</p>
                        <Button>Try Again</Button>
                      </div>
                    ) : (
                      <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[400px] text-sm">
                        {markdownContent}
                      </pre>
                    )}
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
