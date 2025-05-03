
import React from "react";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface ProcessingStatusProps {
  status: string;
}

const ProcessingStatus = ({ status }: ProcessingStatusProps) => {
  // Calculate progress percentage based on status
  const getProgressPercentage = () => {
    switch (status) {
      case "uploaded":
        return 10;
      case "processing":
      case "extracting_audio":
        return 25;
      case "transcribing":
        return 50;
      case "extracting_keyframes":
        return 75;
      case "generating_documentation":
        return 90;
      case "done":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "uploaded":
        return "File Uploaded";
      case "processing":
        return "Starting Process";
      case "extracting_audio":
        return "Extracting Audio";
      case "transcribing":
        return "Transcribing Audio";
      case "extracting_keyframes":
        return "Extracting Key Frames";
      case "generating_documentation":
        return "Generating Documentation";
      case "done":
        return "Documentation Complete";
      case "not_found":
        return "File Not Found";
      default:
        if (status && status.startsWith("error")) {
          return `Error: ${status.replace("error: ", "")}`;
        }
        return "Unknown Status";
    }
  };

  const isError = status && status.startsWith("error");
  const isComplete = status === "done";
  const isProcessing = !isError && !isComplete && status !== "not_found";

  return (
    <div className="mt-4 space-y-3 p-4 bg-muted/50 rounded-lg border border-border"> {/* Added container styling */}
      <div className="flex items-center justify-between">
        {/* Updated text color */}
        <span className={`text-sm font-medium ${isError ? 'text-destructive' : 'text-foreground'}`}>
          Status: {getStatusDisplay()}
        </span>
        <span>
          {/* Updated icon colors */}
          {isError && <AlertCircle className="h-5 w-5 text-destructive" />}
          {isComplete && <CheckCircle className="h-5 w-5 text-emerald-600" />} {/* Using emerald for success */}
          {isProcessing && <Clock className="h-5 w-5 text-primary animate-pulse" />} {/* Added subtle pulse */}
        </span>
      </div>
      {/* Progress bar will use primary color from theme */}
      <Progress value={getProgressPercentage()} className="w-full h-2" /> {/* Adjusted height */}
    </div>
  );
};

export default ProcessingStatus;
