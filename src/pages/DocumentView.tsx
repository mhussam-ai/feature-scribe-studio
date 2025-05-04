
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added Card components
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"; // Added Resizable components
import { ChevronLeft, Download, FileText, Copy, CheckCircle, Share2, Loader2, Folder, PanelLeftClose, PanelLeftOpen } from "lucide-react"; // Added Folder, Panel icons
import { Link, useParams } from "react-router-dom";
import { getMarkdownFileUrl, listDocsDirectory, getDocumentDownloadUrl } from "@/services/apiService";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from 'react-markdown'; // Ensure ReactMarkdown is imported
import remarkGfm from 'remark-gfm'; // Import remark-gfm
import rehypeRaw from 'rehype-raw'; // Import rehype-raw

interface DocNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: DocNode[];
}

const fetchMarkdownContent = async (videoId: string, filePath: string): Promise<string> => {
  const url = `${getMarkdownFileUrl(videoId, filePath)}?t=${Date.now()}`; // Add timestamp for cache busting
  const response = await fetch(url, {
    cache: 'no-store', // Use no-store for stronger cache prevention
  });
  if (!response.ok) {
    throw new Error("Failed to fetch markdown file");
  }
  return await response.text();
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [tree, setTree] = useState<DocNode[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State for sidebar collapse

  // Fetch folder/file tree on mount
  useEffect(() => {
    if (!id) return;
    listDocsDirectory(id, "").then((data) => {
      setTree(data);
      // Find README.md or first .md file
      const findFirstMd = (nodes: DocNode[]): string | null => {
        for (const node of nodes) {
          if (node.type === 'file' && node.name.toLowerCase() === 'readme.md') return node.path;
        }
        for (const node of nodes) {
          if (node.type === 'file' && node.name.endsWith('.md')) return node.path;
        }
        for (const node of nodes) {
          if (node.type === 'folder' && node.children) {
            const found = findFirstMd(node.children);
            if (found) return found;
          }
        }
        return null;
      };
      const first = findFirstMd(data);
      if (first) setSelectedFile(first);
    }).catch(setError);
  }, [id]);

  // Fetch markdown content when selectedFile changes
  useEffect(() => {
    if (!id || !selectedFile) return;
    setIsLoading(true);
    setIsError(false);
    fetchMarkdownContent(id, selectedFile)
      .then(setMarkdownContent)
      .catch((err) => {
        setIsError(true);
        setError(err);
        setMarkdownContent("");
      })
      .finally(() => setIsLoading(false));
  }, [id, selectedFile]);

  useEffect(() => {
    if (isError && error) {
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

  // Recursive sidebar tree with improved styling
  const renderTree = (nodes: DocNode[], level = 0) => (
    <ul className={level > 0 ? "pl-4" : ""}>
      {nodes.map((node) => (
        <li key={node.path} className="my-0.5">
          {node.type === 'file' ? (
            <button
              className={`flex items-center w-full text-left px-2 py-1 rounded-md text-sm transition-colors duration-150 ${
                selectedFile === node.path
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedFile(node.path)}
              title={node.path}
            >
              <FileText className="h-4 w-4 mr-2 flex-shrink-0 text-gray-500" />
              <span className="truncate">{node.name}</span>
            </button>
          ) : (
            <div className="mt-1">
              <div className="flex items-center px-2 py-1 text-sm font-medium text-gray-800">
                 <Folder className="h-4 w-4 mr-2 flex-shrink-0 text-yellow-600" />
                 <span className="truncate">{node.name}</span>
              </div>
              {node.children && renderTree(node.children, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  if (!id) {
    return <div className="p-8 text-center">Document ID not provided</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      <div className="flex-grow container-custom py-6 flex flex-col">
        {/* Header Section */}
        <div className="mb-4">
          <Link to="/dashboard" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Generated Documentation</h1>
              <p className="text-xs text-gray-500 mt-0.5">Document ID: {id}</p>
            </div>
             {/* Moved Sidebar Toggle here */}
             <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="sm:hidden" // Only show on small screens initially, adjust as needed
              >
                {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              </Button>
          </div>
        </div>

        {/* Main Content Area with Resizable Panels */}
        <ResizablePanelGroup 
          direction="horizontal" 
          className="flex-grow rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
          autoSaveId={`doc-view-layout-${id}`} // Persist layout per document
        >
          {/* Sidebar Panel */}
          <ResizablePanel 
            defaultSize={25} 
            minSize={15} 
            maxSize={40} 
            collapsible 
            collapsedSize={0} // Completely hide when collapsed
            onCollapse={() => setIsSidebarCollapsed(true)}
            onExpand={() => setIsSidebarCollapsed(false)}
            className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'hidden' : ''}`} // Control visibility
          >
            <Card className="h-full border-0 border-r rounded-none shadow-none flex flex-col">
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-base font-semibold flex items-center justify-between">
                  Document Structure
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSidebarCollapsed(true)} 
                    className="hidden sm:flex h-7 w-7" // Hide on small screens, show on larger
                    title="Collapse Sidebar"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 flex-grow overflow-y-auto">
                {tree ? (
                  renderTree(tree)
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Loading...
                  </div>
                )}
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-gray-200 w-1.5 hover:bg-blue-500 transition-colors" />

          {/* Content Panel */}
          <ResizablePanel defaultSize={75} minSize={30}>
            <Card className="h-full border-0 rounded-none shadow-none flex flex-col">
              <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                 {/* Expand Button when collapsed */}
                 {isSidebarCollapsed && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsSidebarCollapsed(false)} 
                      className="h-7 w-7 mr-2"
                      title="Expand Sidebar"
                    >
                      <PanelLeftOpen className="h-4 w-4" />
                    </Button>
                  )}
                <div className="flex-grow overflow-hidden mr-4">
                   <CardTitle className="text-base font-semibold truncate" title={selectedFile || "Select a file"}>
                    {selectedFile ? selectedFile.split('/').pop() : "Select a file"} 
                  </CardTitle>
                  <p className="text-xs text-gray-500 truncate" title={selectedFile}>{selectedFile || ""}</p>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                   <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={handleCopy}
                      disabled={isLoading || isError || !markdownContent}
                      title="Copy content to clipboard"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={isLoading || isError}
                      asChild
                      title="Download documentation bundle"
                    >
                      <a href={getDocumentDownloadUrl(id)} download>
                        <Download className="h-4 w-4" /> <span className="hidden sm:inline">Export</span>
                      </a>
                    </Button>
                    <Button 
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={isLoading || isError} // Add share functionality later
                      title="Share document (coming soon)"
                    >
                      <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">Share</span>
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                {/* Tabs */}
                <Tabs defaultValue="document" className="h-full flex flex-col">
                  <TabsList className="mx-4 mt-4 mb-0 border-b-0 rounded-b-none">
                    <TabsTrigger value="document">Document</TabsTrigger>
                    <TabsTrigger value="markdown">Raw Markdown</TabsTrigger>
                  </TabsList>
                  <div className="flex-grow overflow-y-auto p-6">
                    <TabsContent value="document" className="mt-0 min-h-[300px]">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                          <div className="text-center text-gray-500">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                            <p>Loading documentation...</p>
                          </div>
                        </div>
                      ) : isError ? (
                        <div className="text-center py-12 text-red-600">
                          <p className="mb-4">Failed to load document.</p>
                          <Button size="sm" onClick={() => setSelectedFile(selectedFile)}>
                            Try Again
                          </Button>
                        </div>
                      ) : markdownContent ? (
                        // Added prose-sm for smaller base font, adjusted styles
                        <div className="prose prose-sm prose-blue max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5 prose-code:bg-gray-100 prose-code:rounded">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown> 
                        </div>
                      ) : (
                         <div className="text-center py-12 text-gray-500">Select a file from the sidebar to view its content.</div>
                      )}
                    </TabsContent>
                    <TabsContent value="markdown" className="mt-0 min-h-[300px]">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                           <div className="text-center text-gray-500">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                            <p>Loading markdown...</p>
                          </div>
                        </div>
                      ) : isError ? (
                         <div className="text-center py-12 text-red-600">
                          <p className="mb-4">Failed to load markdown.</p>
                          <Button size="sm" onClick={() => setSelectedFile(selectedFile)}>
                            Try Again
                          </Button>
                        </div>
                      ) : markdownContent ? (
                        // Improved styling for raw markdown block
                        <pre className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto whitespace-pre-wrap text-xs font-mono leading-relaxed">
                          {markdownContent}
                        </pre>
                      ) : (
                         <div className="text-center py-12 text-gray-500">Select a file to view its raw markdown content.</div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      {/* Footer remains outside the main resizable area */}
      <Footer />
    </div>
  );
};

export default DocumentView;
