
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, FileText, Copy, CheckCircle, Share2, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getMarkdownFileUrl, listDocsDirectory, getDocumentDownloadUrl } from "@/services/apiService";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

// Markdown parser dependency will be added
import ReactMarkdown from 'react-markdown';

interface DocNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: DocNode[];
}

const fetchMarkdownContent = async (videoId: string, filePath: string): Promise<string> => {
  const response = await fetch(getMarkdownFileUrl(videoId, filePath));
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

  // Recursive sidebar tree
  const renderTree = (nodes: DocNode[]) => (
    <ul className="pl-2">
      {nodes.map((node) => (
        <li key={node.path} className="mb-1">
          {node.type === 'file' ? (
            <button
              className={`text-left text-blue-700 hover:underline ${selectedFile === node.path ? 'font-bold underline' : ''}`}
              onClick={() => setSelectedFile(node.path)}
            >
              {node.name}
            </button>
          ) : (
            <>
              <span className="font-semibold">{node.name}</span>
              {node.children && renderTree(node.children)}
            </>
          )}
        </li>
      ))}
    </ul>
  );

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
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar with file/folder tree */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 h-full">
                <h3 className="text-lg font-medium mb-4">Documentation Files</h3>
                {tree ? renderTree(tree) : <div>Loading file tree...</div>}
              </div>
            </div>
            {/* Main content area */}
            <div className="col-span-1 md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={handleCopy}
                      disabled={isLoading || isError}
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400">{selectedFile}</div>
                </div>
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
                        <Button onClick={() => setSelectedFile(selectedFile)}>
                          Try Again
                        </Button>
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
                        <p className="text-red-500 mb-4">Failed to load markdown</p>
                        <Button onClick={() => setSelectedFile(selectedFile)}>
                          Try Again
                        </Button>
                      </div>
                    ) : (
                      <pre className="bg-gray-100 rounded p-4 overflow-x-auto whitespace-pre-wrap text-xs">
                        {markdownContent || ''}
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
