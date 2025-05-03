import React, { useState, useCallback } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Image, Loader2, Download, MonitorPlay, FileQuestion, Presentation, Sparkles, Info } from "lucide-react"; // Added icons
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Import Card components
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
  const [isDragging, setIsDragging] = useState(false); // State for drag feedback
  const [uploadType, setUploadType] = useState<"video" | "image" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [persona, setPersona] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [buildTarget, setBuildTarget] = useState<"user guide" | "deck">("user guide");
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [toast]); // Added toast dependency

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("video/")) {
      setUploadType("video");
      setFile(selectedFile);
      setVideoId(null); // Reset previous results if a new file is selected
      setProcessingStatus("");
    } else if (selectedFile.type.startsWith("image/")) {
      // Currently focusing on video, image support can be added later
      toast({
        title: "Image Upload (Coming Soon)",
        description: "Currently, only video uploads are fully supported for documentation generation.",
        variant: "default",
      });
       setUploadType("image"); // Still set type for UI feedback
       setFile(selectedFile);
       setVideoId(null);
       setProcessingStatus("");
      // Optionally disable upload button for images for now
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file (MP4, MOV, etc.)",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!file || uploadType !== 'video') { // Only allow video uploads for now
       toast({
        title: "Video Required",
        description: "Please select a video file to generate documentation.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setProcessingStatus("uploading"); // Initial status

    try {
      console.log("Build Target:", buildTarget);
      console.log("Prompt:", prompt);
      console.log("Persona:", persona);
      console.log("Company Website:", companyWebsite);

      const uploadResponse = await uploadVideo(file);
      setVideoId(uploadResponse.video_id);
      setProcessingStatus("uploaded");

      toast({
        title: "Upload successful!", // Removed duplicate title line
        description: "Starting document generation...",
      });

      // Reverted to original 3 arguments until apiService is updated
      await processVideo(uploadResponse.video_id, prompt, persona); 

      checkProcessingStatus(uploadResponse.video_id);

    } catch (error) {
      console.error("Upload error:", error);
      setProcessingStatus("error: upload failed");
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

      if (statusResponse.status !== "done" && !statusResponse.status.startsWith("error")) {
        setTimeout(() => checkProcessingStatus(id), 5000); // Poll slightly less frequently
      } else {
        setIsUploading(false); // Stop loading state once done or error
        if (statusResponse.status === "done") {
          toast({
            title: "Success!",
            description: "Your documentation is ready.",
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
      // Don't reset status here, keep showing the last known status or an error
      setIsUploading(false);
      toast({
        title: "Status check failed",
        description: "Could not retrieve processing status.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploadType(null);
    setVideoId(null);
    setProcessingStatus("");
    setPrompt("");
    setPersona("");
    setCompanyWebsite("");
    setIsUploading(false);
    setIsDragging(false);
    // Keep buildTarget as is, or reset if desired
  };

  const handleScreenRecord = async () => {
    setIsRecording(true);
    toast({
      title: "Screen Recording",
      description: "Screen recording is coming soon!",
    });
    // TODO: Implement screen recording
    console.log("Attempting to start screen recording...");
    setIsRecording(false);
  };

  const isProcessing = isUploading || (processingStatus && processingStatus !== "done" && !processingStatus.startsWith("error"));

  return (
    <section id="upload" className="py-20 sm:py-28 bg-secondary"> {/* Updated background */}
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Generate Documentation Instantly</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your output, upload a UI recording, and let AI do the heavy lifting.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Build Target Selection Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">1. What do you want to build?</CardTitle>
              <CardDescription>Select the type of documentation you need.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="user guide"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                value={buildTarget}
                onValueChange={(value: "user guide" | "deck") => setBuildTarget(value)}
                disabled={isProcessing} // Disable while processing
              >
                <Label htmlFor="r1" className={`flex flex-col items-center justify-between p-6 border rounded-lg cursor-pointer transition-all ${buildTarget === 'user guide' ? 'border-primary ring-2 ring-primary/50 bg-primary/5' : 'hover:bg-muted/50 border-border'}`}>
                  <div className="flex items-center gap-3 mb-2">
                     <FileQuestion className="w-6 h-6 text-primary" />
                     <span className="font-semibold text-lg text-foreground">User Guide</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mb-4">Detailed step-by-step instructions, perfect for support docs.</p>
                  <RadioGroupItem value="user guide" id="r1" className="shrink-0" />
                </Label>
                <Label htmlFor="r2" className={`flex flex-col items-center justify-between p-6 border rounded-lg cursor-pointer transition-all ${buildTarget === 'deck' ? 'border-primary ring-2 ring-primary/50 bg-primary/5' : 'hover:bg-muted/50 border-border'}`}>
                   <div className="flex items-center gap-3 mb-2">
                     <Presentation className="w-6 h-6 text-primary" />
                     <span className="font-semibold text-lg text-foreground">Presentation Deck</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mb-4">Key feature summaries & visuals, ideal for presentations.</p>
                  <RadioGroupItem value="deck" id="r2" className="shrink-0" />
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* File Upload Card */}
          <Card>
             <CardHeader className="text-center">
              <CardTitle className="text-2xl">2. Upload Your UI Recording</CardTitle>
              <CardDescription>Drag & drop a video file or use one of the options below.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`
                  border-2 border-dashed rounded-xl p-8 text-center
                  ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}
                  ${file ? 'border-primary bg-primary/5' : 'bg-background hover:border-muted-foreground/50'}
                  transition-all duration-200 ease-in-out
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  // Initial Upload View
                  <div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary/10 rounded-full p-4">
                        <Upload className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Drag & drop video file here</h3>
                    <p className="text-muted-foreground mb-6">or use an upload option</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => document.getElementById('videoInput')?.click()}
                        disabled={isProcessing}
                      >
                        <FileText className="h-5 w-5" />
                        Upload Video File
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={handleScreenRecord}
                        disabled={isRecording || isProcessing}
                      >
                        <MonitorPlay className="h-5 w-5" />
                        Record Screen (Soon)
                      </Button>
                    </div>
                    <input
                      id="videoInput"
                      type="file"
                      accept="video/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={isProcessing}
                    />
                     <p className="text-xs text-muted-foreground mt-6">
                      Supported formats: MP4, MOV, WEBM (max 500MB)
                    </p>
                  </div>
                ) : (
                  // File Selected / Processing View
                  <div>
                    <div className="flex justify-center mb-4">
                      {uploadType === "video" ? (
                        <FileText className="h-12 w-12 text-primary" />
                      ) : (
                        <Image className="h-12 w-12 text-primary" /> // Keep for potential image support
                      )}
                    </div>
                    <h3 className="text-lg font-medium mb-1 text-foreground">{file.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    {/* Form Fields - Only show if file is selected but not yet processing/done */}
                    {!videoId && (
                       <div className="mt-6 mb-8 text-left max-w-lg mx-auto space-y-4">
                        <div>
                          <Label htmlFor="prompt">Prompt (Optional)</Label>
                          <Input
                            id="prompt"
                            type="text"
                            placeholder="e.g., Focus on the new user onboarding flow"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="mt-1"
                            disabled={isProcessing}
                          />
                           <p className="text-xs text-muted-foreground mt-1">Guide the AI on what to focus on.</p>
                        </div>

                        <div>
                          <Label htmlFor="persona">Target Audience Persona</Label>
                          <Select
                            value={persona}
                            onValueChange={setPersona}
                            disabled={isProcessing}
                          >
                            <SelectTrigger id="persona" className="mt-1">
                              <SelectValue placeholder="Select a persona..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="end-user">End User</SelectItem>
                              <SelectItem value="product-manager">Product Manager</SelectItem>
                              <SelectItem value="customer-success">Customer Success</SelectItem>
                              <SelectItem value="developer">Developer</SelectItem>
                              <SelectItem value="sales-marketing">Sales / Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                           <p className="text-xs text-muted-foreground mt-1">Tailor the tone and technical depth.</p>
                        </div>

                        <div>
                          <Label htmlFor="companyWebsite">Company Website URL (Optional)</Label>
                          <Input
                            id="companyWebsite"
                            type="url"
                            placeholder="https://example.com"
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                            className="mt-1"
                            disabled={isProcessing}
                          />
                           <p className="text-xs text-muted-foreground mt-1">Helps AI understand context and branding.</p>
                        </div>
                      </div>
                    )}

                    {/* Processing Status */}
                    {processingStatus && processingStatus !== "uploaded" && ( // Show status component after upload starts
                      <div className="my-6">
                         <ProcessingStatus status={processingStatus} />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        disabled={isProcessing && processingStatus !== "done" && !processingStatus.startsWith("error")}
                      >
                        {processingStatus === "done" || processingStatus.startsWith("error") ? "Start Over" : "Cancel"}
                      </Button>

                      {!videoId && uploadType === 'video' && ( // Only show Upload button for videos before processing starts
                        <Button
                          onClick={handleUpload}
                          disabled={isProcessing}
                          size="lg"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Generate Documentation
                            </>
                          )}
                        </Button>
                      )}

                      {videoId && processingStatus === "done" && (
                        <Button size="lg" asChild>
                          <a href={getDocumentDownloadUrl(videoId)} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download Docs
                          </a>
                        </Button>
                      )}

                       {videoId && processingStatus.startsWith("error") && (
                         <Button onClick={handleUpload} size="lg"> {/* Allow retry on error */}
                            Try Again
                         </Button>
                       )}
                    </div>

                     {videoId && processingStatus === "done" && (
                      <div className="mt-6">
                        <Link
                          to={`/document/${videoId}`} // Assuming a route like this exists
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          View Generated Documentation Online
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* How It Works Card */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-xl text-center">How It Works in 3 Simple Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                    <span className="font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Upload or Record</h4>
                    <p className="text-muted-foreground text-sm">
                      Provide a video recording of the UI flow you want to document.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                    <span className="font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">AI Analysis & Generation</h4>
                    <p className="text-muted-foreground text-sm">
                      Our AI analyzes the video, identifies steps, and generates draft documentation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                    <span className="font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Review & Export</h4>
                    <p className="text-muted-foreground text-sm">
                      Review the generated guide or deck, make any edits, and export in your desired format.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
