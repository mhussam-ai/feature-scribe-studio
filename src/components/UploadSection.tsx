
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Added import
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Image, Loader2, Download } from "lucide-react";
import {
  uploadVideo,
  processVideo, 
  checkStatus, 
  getDocumentDownloadUrl 
} from "@/services/apiService";
import ProcessingStatus from "./ProcessingStatus";
import { Link } from "react-router-dom";

const UploadSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<"video" | "image" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [persona, setPersona] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [buildTarget, setBuildTarget] = useState<"user guide" | "deck">("user guide"); // Added state for build target
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

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
      setProcessingStatus("");

      try {
        // TODO: Pass prompt, persona, company website, and buildTarget to the backend
        console.log("Build Target:", buildTarget); // Log the selected build target
        console.log("Prompt:", prompt);
        console.log("Persona:", persona);
        console.log("Company Website:", companyWebsite);

        // Upload the file
        const uploadResponse = await uploadVideo(file); // Modify API call if needed
        setVideoId(uploadResponse.video_id);
        setProcessingStatus("uploaded");

        toast({
          title: "Upload successful!",
          description: "Starting document generation process...",
        });

        // Start processing
        await processVideo(uploadResponse.video_id, prompt, persona); // Modify API call if needed

        // Begin polling for status
        checkProcessingStatus(uploadResponse.video_id);
      
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const checkProcessingStatus = async (id: string) => {
    try {
      const statusResponse = await checkStatus(id);
      setProcessingStatus(statusResponse.status);
      
      if (statusResponse.status !== "done" && 
          !statusResponse.status.startsWith("error")) {
        // Continue polling every 3 seconds until done or error
        setTimeout(() => checkProcessingStatus(id), 3000);
      } else {
        setIsUploading(false);
        if (statusResponse.status === "done") {
          toast({
            title: "Success!",
            description: "Your documentation has been generated successfully.",
          });
        } else if (statusResponse.status.startsWith("error")) {
          toast({
            title: "Processing Error",
            description: statusResponse.status.replace("error: ", ""),
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Status check error:", error);
      setIsUploading(false);
      toast({
        title: "Status check failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploadType(null);
    setVideoId(null);
    setProcessingStatus("");
  };

  // Placeholder for screen recording logic
  const handleScreenRecord = async () => {
    setIsRecording(true);
    toast({
      title: "Screen Recording",
      description: "Screen recording functionality not yet implemented.",
    });
    // TODO: Implement screen recording using navigator.mediaDevices.getDisplayMedia
    // and MediaRecorder API
    console.log("Attempting to start screen recording...");
    // Example structure:
    // try {
    //   const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    //   // ... use MediaRecorder to record the stream ...
    //   // ... on stop, create a File object and call handleFile(recordedFile) ...
    // } catch (err) {
    //   console.error("Screen recording error:", err);
    //   toast({ title: "Screen Recording Failed", description: err.message, variant: "destructive" });
    // } finally {
    //   setIsRecording(false);
    // }
    setIsRecording(false); // Remove this line once implemented
  };

  return (
    <section id="upload" className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Start Creating Collaterals Now</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your UI videos or screenshots and get detailed collaterals in minutes
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Build Target Selection */}
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <Label className="text-xl font-semibold mb-6 block text-center text-gray-800">What do you want to build?</Label>
            <RadioGroup
              defaultValue="user guide"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              value={buildTarget}
              onValueChange={(value: "user guide" | "deck") => setBuildTarget(value)}
            >
              {/* User Guide Option - Corrected Label structure */}
              <Label htmlFor="r1" className={`flex flex-col items-center p-6 border rounded-lg cursor-pointer transition-all ${buildTarget === 'user guide' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'hover:bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center w-full justify-between mb-2">
                  <span className="font-medium text-lg text-gray-700">Build a User Guide</span>
                  <RadioGroupItem value="user guide" id="r1" className="shrink-0" />
                </div>
                <p className="text-sm text-gray-500 text-center w-full">Generate detailed step-by-step documentation and guides.</p>
              </Label>
              {/* Deck Option - Corrected Label structure */}
              <Label htmlFor="r2" className={`flex flex-col items-center p-6 border rounded-lg cursor-pointer transition-all ${buildTarget === 'deck' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'hover:bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center w-full justify-between mb-2">
                  <span className="font-medium text-lg text-gray-700">Build a Customer Deck</span>
                  <RadioGroupItem value="deck" id="r2" className="shrink-0" />
                </div>
                <p className="text-sm text-gray-500 text-center w-full">Create presentation slides summarizing key features or flows.</p>
              </Label>
            </RadioGroup> {/* Correctly closed RadioGroup */}
          </div>

          {/* File Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-xl p-10 
              ${file ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 hover:border-gray-400'} 
              transition-all duration-300 ease-in-out bg-white
            `}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!file ? (
              // Initial Upload View - Corrected structure and styling
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-4 shadow-sm">
                    <Upload className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">Drag & drop files here</h3>
                <p className="text-gray-500 mb-6">or click one of the options below</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 py-2 px-4 text-base hover:bg-gray-50" // Added hover effect
                    onClick={() => document.getElementById('videoInput')?.click()}
                  >
                    <FileText className="h-5 w-5" />
                    Upload Video
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 py-2 px-4 text-base hover:bg-gray-50" // Added hover effect
                    onClick={() => document.getElementById('imageInput')?.click()}
                  >
                    <Image className="h-5 w-5" />
                    Upload Image
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 py-2 px-4 text-base hover:bg-gray-50" // Added hover effect
                    onClick={handleScreenRecord}
                    disabled={isRecording}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Screen Record
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
                <p className="text-sm text-gray-500">
                  Supported formats: MP4, MOV, PNG, JPG (max 500MB)
                </p>
              </div>
            ) : (
              // File Selected View - Corrected structure and styling
              <div className="text-center py-6">
                <div className="flex justify-center mb-6"> {/* Increased margin */}
                  {uploadType === "video" ? (
                    <FileText className="h-16 w-16 text-blue-600" />
                  ) : (
                    <Image className="h-16 w-16 text-blue-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{file.name}</h3> {/* Increased bottom margin */}
                <p className="text-gray-600 mb-6"> {/* Increased bottom margin */}
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                {/* Form Fields */}
                <div className="mt-6 mb-6 text-left max-w-md mx-auto space-y-4"> {/* Adjusted margin */}
                  <div>
                    <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                      Prompt (Optional)
                    </Label>
                    <Input
                      id="prompt"
                      type="text"
                      placeholder="e.g., Focus on the new checkout flow"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="mt-1"
                      disabled={isUploading || (!!videoId && processingStatus !== "" && !processingStatus.startsWith("error"))} // Disable after upload starts
                    />
                  </div>

                  <div>
                    <Label htmlFor="persona" className="text-sm font-medium text-gray-700">
                      Select Persona
                    </Label>
                    <Select 
                      value={persona} 
                      onValueChange={setPersona}
                      disabled={isUploading || (!!videoId && processingStatus !== "" && !processingStatus.startsWith("error"))} // Disable after upload starts
                    >
                      <SelectTrigger id="persona" className="mt-1">
                        <SelectValue placeholder="Select a persona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product manager">Product Manager</SelectItem>
                        <SelectItem value="marketer">Marketer</SelectItem>
                        <SelectItem value="customer success">Customer Success</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companyWebsite" className="text-sm font-medium text-gray-700">
                      Company Website URL (Optional)
                    </Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      placeholder="e.g., https://example.com"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="mt-1"
                      disabled={isUploading || (!!videoId && processingStatus !== "" && !processingStatus.startsWith("error"))} // Disable after upload starts
                    />
                  </div>
                </div>
                
                {videoId && processingStatus && (
                  <ProcessingStatus status={processingStatus} />
                )}
                
                {/* Action Buttons - Appear after file selection and form fields */}
                <div className="flex justify-center gap-4 mt-6">
                  <Button 
                    variant="outline"
                    onClick={resetForm}
                    disabled={isUploading && processingStatus !== "done" && !processingStatus.startsWith("error")}
                  >
                    {processingStatus === "done" ? "Upload Another" : "Cancel"}
                  </Button>
                  
                  {!videoId ? (
                    <Button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload & Process
                        </>
                      )}
                    </Button>
                  ) : processingStatus === "done" ? (
                    <Button 
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={getDocumentDownloadUrl(videoId)} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                        Download Documentation
                      </a>
                    </Button>
                  ) : processingStatus.startsWith("error") ? (
                    <Button 
                      onClick={handleUpload}
                      className="flex items-center gap-2"
                    >
                      Try Again
                    </Button>
                  ) : null}
                </div>
                
                {processingStatus === "done" && (
                  <div className="mt-4">
                    <Link 
                      to={`/document/${videoId}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Documentation Online
                    </Link>
                  </div>
                )}
                
                <p className="text-sm text-gray-400 mt-4">
                  {processingStatus === "done" 
                    ? "Your documentation has been generated successfully" 
                    : "Your file will be securely processed and analyzed"}
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
                  <h4 className="font-medium">Collateral Generation</h4>
                  <p className="text-gray-600">
                    Receive complete, customizable, and exportable documentation ready to share
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section> // Correctly closed section
  );
};

export default UploadSection;
