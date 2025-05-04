
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
        return 20;
      case "transcribing":
        return 30;
      case "extracting_keyframes":
        return 50;
      case "consolidating_user_journey":
        return 80;
      case "generating_documentation_folder_structure":
        return 85;
      case "creating_markdown_skeletons":
        return 90;
      case "populating_documentation_files":
        return 95;
      case "generating_documentation":
        return 90;
      case "done":
        return 100;
      default:
        // Support progress for analyzing_keyframes: X/Y
        if (status && status.startsWith("analyzing_keyframes")) {
          const match = status.match(/analyzing_keyframes: (\d+)[/](\d+)/);
          if (match) {
            const current = parseInt(match[1], 10);
            const total = parseInt(match[2], 10);
            if (total > 0) {
              return Math.floor(50 + (current / total) * 30); // Between 75 and 85%
            }
          }
        }
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
      case "consolidating_user_journey":
        return "Consolidating User Journey";
      case "generating_documentation_folder_structure":
        return "Generating Documentation Folder Structure";
      case "creating_markdown_skeletons":
        return "Creating Markdown Skeletons";
      case "populating_documentation_files":
        return "Populating Documentation Files";
      case "generating_documentation":
        return "Generating Documentation";
      case "done":
        return "Documentation Complete";
      case "not_found":
        return "File Not Found";
      default:
        if (status && status.startsWith("analyzing_keyframes")) {
          const match = status.match(/analyzing_keyframes: (\d+)[/](\d+)/);
          if (match) {
            const current = parseInt(match[1], 10);
            const total = parseInt(match[2], 10);
            return `Analyzing Keyframes (${current}/${total})`;
          }
          return "Analyzing Keyframes";
        }
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
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Status: {getStatusDisplay()}</span>
        <span>
          {isError && <AlertCircle className="h-5 w-5 text-red-500" />}
          {isComplete && <CheckCircle className="h-5 w-5 text-green-500" />}
          {isProcessing && <Clock className="h-5 w-5 text-blue-500" />}
        </span>
      </div>

      <Progress value={getProgressPercentage()} className="w-full" />
    </div>
  );
};

export default ProcessingStatus;
