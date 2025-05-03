
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Image, Loader2 } from "lucide-react";

const UploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<"video" | "image" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (file.type.startsWith("video/")) {
      setUploadType("video");
      setFile(file);
    } else if (file.type.startsWith("image/")) {
      setUploadType("image");
      setFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video or image file",
        variant: "destructive",
      });
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful!",
        description: `Your ${uploadType} has been uploaded and is being processed.`,
      });
      
      // In a real app, we would redirect to a processing or results page
    }, 2000);
  };

  return (
    <section id="upload" className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Start Creating Documentation Now</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your UI videos or screenshots and get detailed documentation in minutes
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div 
            className={`
              border-2 border-dashed rounded-xl p-8 
              ${file ? 'border-blue-400 bg-blue-50' : 'border-gray-300'} 
              transition-all duration-200
            `}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Drag & drop files here</h3>
                <p className="text-gray-500 mb-4">or click to browse from your computer</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById('videoInput')?.click()}
                  >
                    <FileText className="h-4 w-4" />
                    Upload Video
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById('imageInput')?.click()}
                  >
                    <Image className="h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
                <input
                  id="videoInput"
                  type="file"
                  accept="video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-400">
                  Supported formats: MP4, MOV, PNG, JPG (max 500MB)
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  {uploadType === "video" ? (
                    <FileText className="h-12 w-12 text-blue-600" />
                  ) : (
                    <Image className="h-12 w-12 text-blue-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1">{file.name}</h3>
                <p className="text-gray-500 mb-4">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex justify-center gap-4 mb-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setFile(null);
                      setUploadType(null);
                    }}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload & Process
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  Your file will be securely processed and analyzed
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">How it works</h3>
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Upload your content</h4>
                  <p className="text-gray-600">
                    Upload your UI videos or screenshots showing your new features
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-gray-600">
                    Our AI analyzes your content to extract key information about features and workflows
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Documentation Generation</h4>
                  <p className="text-gray-600">
                    Receive complete, customizable, and exportable documentation ready to share
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
