import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import Card
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { ChevronLeft, Download, FileText, Copy, CheckCircle, Share2, Loader2, AlertCircle, Folder, File } from "lucide-react"; // Added icons
import { Link, useParams } from "react-router-dom";
import { getMarkdownFileUrl, listDocsDirectory, getDocumentDownloadUrl } from "@/services/apiService";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Add GFM support for tables, etc.

// Define DocNode type
interface DocNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: DocNode[];
}

// Fetch Markdown Content Function
const fetchMarkdownContent = async (videoId: string, filePath: string): Promise<string> => {
  const url = getMarkdownFileUrl(videoId, filePath);
  console.log(`Fetching markdown from: ${url}`); // Log URL
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch markdown file (${response.status})`);
  }
  return await response.text();
};

// Fetch Directory Tree Function
const fetchDirectoryTree = async (videoId: string): Promise<DocNode[]> => {
  console.log(`Fetching directory tree for ID: ${videoId}`);
  return await listDocsDirectory(videoId, "");
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [tree, setTree] = useState<DocNode[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoadingTree, setIsLoadingTree] = useState<boolean>(true);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(false);
  const [errorTree, setErrorTree] = useState<Error | null>(null);
  const [errorContent, setErrorContent] = useState<Error | null>(null);

  // Fetch folder/file tree on mount
  useEffect(() => {
    if (!id) {
      setIsLoadingTree(false);
      setErrorTree(new Error("Document ID not provided"));
      return;
    }
    setIsLoadingTree(true);
    setErrorTree(null);
    fetchDirectoryTree(id)
      .then((data) => {
        setTree(data);
        // Find README.md or first .md file to select initially
        const findFirstMd = (nodes: DocNode[]): string | null => {
          let firstMd: string | null = null;
          for (const node of nodes) {
            if (node.type === 'file' && node.name.toLowerCase() === 'readme.md') return node.path;
            if (!firstMd && node.type === 'file' && node.name.endsWith('.md')) firstMd = node.path;
          }
          if (firstMd) return firstMd;
          // If no top-level md, search folders
          for (const node of nodes) {
            if (node.type === 'folder' && node.children) {
              const found = findFirstMd(node.children);
              if (found) return found;
            }
          }
          return null;
        };
        const firstFile = findFirstMd(data);
        if (firstFile) {
          setSelectedFile(firstFile);
        } else {
          console.log("No initial .md file found in tree.");
           // Optionally select the first file of any type if no markdown found
           // if (data.length > 0 && data[0].type === 'file') setSelectedFile(data[0].path);
        }
      })
      .catch((err) => {
        console.error("Error fetching directory tree:", err);
        setErrorTree(err);
        toast({ title: "Error Loading File Tree", description: err.message, variant: "destructive" });
      })
      .finally(() => setIsLoadingTree(false));
  }, [id, toast]);

  // Fetch markdown content when selectedFile changes
  useEffect(() => {
    if (!id || !selectedFile) {
      setMarkdownContent(""); // Clear content if no file selected
      return;
    }
    setIsLoadingContent(true);
    setErrorContent(null);
    setMarkdownContent(""); // Clear previous content immediately

    fetchMarkdownContent(id, selectedFile)
      .then(setMarkdownContent)
      .catch((err) => {
        console.error(`Error fetching content for ${selectedFile}:`, err);
        setErrorContent(err);
        toast({ title: "Error Loading Document", description: err.message, variant: "destructive" });
      })
      .finally(() => setIsLoadingContent(false));
  }, [id, selectedFile, toast]);


  const handleCopy = useCallback(() => {
    if (markdownContent) {
      navigator.clipboard.writeText(markdownContent).then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard!",
          description: "Document content copied.",
        });
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
         toast({ title: "Copy Failed", description: err.message, variant: "destructive" });
      });
    }
  }, [markdownContent, toast]);

  // Recursive sidebar tree renderer
  const renderTree = useCallback((nodes: DocNode[], level = 0): React.ReactNode => (
    <ul className={level > 0 ? "pl-4" : ""}>
      {nodes.map((node) => (
        <li key={node.path} className="my-0.5">
          {node.type === 'file' ? (
            <button
              className={`flex items-center gap-2 w-full text-left text-sm px-2 py-1 rounded-md transition-colors ${selectedFile === node.path
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              onClick={() => setSelectedFile(node.path)}
              title={node.path}
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{node.name}</span>
            </button>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground px-2 py-1">
                 <Folder className="h-4 w-4 flex-shrink-0" />
                 <span>{node.name}</span>
              </div>
              {node.children && renderTree(node.children, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  ), [selectedFile]);

  // Skeleton for Tree
  const TreeSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/2 ml-4" />
      <Skeleton className="h-6 w-2/3 ml-4" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-1/2 ml-4" />
    </div>
  );

   // Skeleton for Content
  const ContentSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-20 w-full" />
       <Skeleton className="h-4 w-full" />
       <Skeleton className="h-4 w-5/6" />
    </div>
  );


  if (!id) {
    // Handle case where ID is missing more gracefully
     return (
       <div className="min-h-screen flex flex-col">
         <Navbar />
         <div className="flex-grow flex items-center justify-center text-center p-8">
           <div>
             <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
             <h1 className="text-2xl font-bold mb-2">Error</h1>
             <p className="text-muted-foreground mb-4">Document ID not found in URL.</p>
             <Button asChild>
               <Link to="/dashboard">Go to Dashboard</Link>
             </Button>
           </div>
         </div>
         <Footer />
       </div>
     );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary"> {/* Use theme background */}
      <Navbar />

      <div className="flex-grow py-8">
        <div className="container-custom">
          {/* Header Section */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4 text-muted-foreground hover:text-foreground">
              <Link to="/dashboard">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Link>
            </Button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Generated Documentation</h1>
                <p className="text-sm text-muted-foreground">Document ID: {id}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={handleCopy}
                  disabled={isLoadingContent || !markdownContent}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy Markdown"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                  asChild
                >
                  <a href={getDocumentDownloadUrl(id)} download>
                    <Download className="h-4 w-4" /> Export (.zip)
                  </a>
                </Button>
                {/* Share functionality can be implemented later */}
                {/* <Button size="sm" className="flex items-center gap-1.5">
                  <Share2 className="h-4 w-4" /> Share
                </Button> */}
              </div>
            </div>
          </div>

          {/* Main Layout: Sidebar + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Card */}
            <Card className="col-span-1 lg:h-[calc(100vh-220px)] flex flex-col"> {/* Adjust height */}
               <CardHeader className="pb-3 pt-4 px-4 border-b">
                 <CardTitle className="text-base font-semibold">Document Files</CardTitle>
               </CardHeader>
               <CardContent className="p-2 flex-grow overflow-y-auto">
                 {isLoadingTree ? (
                   <TreeSkeleton />
                 ) : errorTree ? (
                   <p className="text-xs text-destructive p-2">Error loading tree.</p>
                 ) : tree && tree.length > 0 ? (
                   renderTree(tree)
                 ) : (
                   <p className="text-xs text-muted-foreground p-2">No files found.</p>
                 )}
               </CardContent>
            </Card>

            {/* Content Card */}
            <Card className="col-span-1 lg:col-span-3 lg:h-[calc(100vh-220px)] flex flex-col"> {/* Adjust height */}
               <Tabs defaultValue="document" className="flex flex-col flex-grow">
                 <CardHeader className="px-4 pt-4 pb-0 border-b">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                       <TabsList>
                         <TabsTrigger value="document">Preview</TabsTrigger>
                         <TabsTrigger value="markdown">Markdown</TabsTrigger>
                       </TabsList>
                       <span className="text-xs text-muted-foreground truncate" title={selectedFile}>
                         {selectedFile || "No file selected"}
                       </span>
                    </div>
                 </CardHeader>
                 <CardContent className="p-4 md:p-6 flex-grow overflow-y-auto">
                    <TabsContent value="document" className="mt-0">
                      {isLoadingContent ? (
                        <ContentSkeleton />
                      ) : errorContent ? (
                        <div className="text-center py-12">
                          <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-4" />
                          <p className="text-destructive mb-4">Failed to load document content.</p>
                          <Button size="sm" onClick={() => setSelectedFile(selectedFile)}>Try Again</Button>
                        </div>
                      ) : markdownContent ? (
                        // Use prose with dark mode support
                        <article className="prose dark:prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
                        </article>
                      ) : (
                         <div className="text-center py-12 text-muted-foreground">
                            <File className="mx-auto h-10 w-10 mb-4" />
                            <p>{selectedFile ? "Empty file or invalid content." : "Select a file from the sidebar to view its content."}</p>
                         </div>
                      )}
                    </TabsContent>
                    <TabsContent value="markdown" className="mt-0">
                      {isLoadingContent ? (
                         <ContentSkeleton />
                      ) : errorContent ? (
                        <div className="text-center py-12">
                          <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-4" />
                          <p className="text-destructive mb-4">Failed to load markdown content.</p>
                           <Button size="sm" onClick={() => setSelectedFile(selectedFile)}>Try Again</Button>
                        </div>
                      ) : (
                        <pre className="bg-muted rounded p-4 overflow-x-auto whitespace-pre-wrap text-xs font-mono h-[calc(100vh-350px)]"> {/* Adjust height */}
                          {markdownContent || (selectedFile ? "Empty file." : "Select a file.")}
                        </pre>
                      )}
                    </TabsContent>
                 </CardContent>
               </Tabs>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocumentView;
