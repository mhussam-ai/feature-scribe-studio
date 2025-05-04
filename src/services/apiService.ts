/**
 * Service for communicating with the Python documentation generation API
 */

// API base URL - replace with your actual API URL when deployed
const API_BASE_URL = "http://localhost:8000"; // Default FastAPI port

/**
 * Create a feature presentation for a video
 */
export const createPresentation = async (
  videoId: string,
  language?: string
): Promise<{ presentation_path: string; download_url: string }> => {
  const response = await fetch(`${API_BASE_URL}/create-presentation/${videoId}` + (language ? `?language=${encodeURIComponent(language)}` : ''), {
    method: "POST"
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Presentation creation failed: ${errorText}`);
  }
  return await response.json();
};

/**
 * Get the download URL for a processed presentation
 */
export const getPresentationDownloadUrl = (videoId: string): string => {
  return `${API_BASE_URL}/download-presentation/${videoId}`;
};

/**
 * Fetch all documentation folders (video_ids) from the backend
 */
export const fetchDocsFolders = async () => {
  const response = await fetch(`${API_BASE_URL}/fetch_api/docs-folders`);
  if (!response.ok) {
    throw new Error("Failed to fetch documentation folders");
  }
  return await response.json();
};

/**
 * Decide localization/personalization needs using OpenAI gpt-4o-mini via backend
 */
export const shouldLocalize = async (prompt: string, persona: string) => {
  const response = await fetch(`${API_BASE_URL}/api/should-localize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, persona }),
  });
  if (!response.ok) {
    throw new Error("Failed to analyze localization/personalization");
  }
  return await response.json();
};

export interface UploadResponse {
  video_id: string;
  filename: string;
}

export interface ProcessResponse {
  status: string;
}

export interface StatusResponse {
  status: string;
}

/**
 * Upload a video file to the API
 */
export const uploadVideo = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return await response.json();
};

/**
 * Start a screen recording (video + audio + camera overlay)
 */
export const startScreenRecord = async (duration: number = 15): Promise<{status: string; recording_id: string; output_path: string}> => {
  const response = await fetch(`${API_BASE_URL}/screen_record`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ duration }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Screen record start failed: ${errorText}`);
  }
  return await response.json();
};

/**
 * Stop the ongoing screen recording
 */
export const stopScreenRecord = async (): Promise<{status: string; output_path: string}> => {
  const response = await fetch(`${API_BASE_URL}/screen_record/stop`, {
    method: "POST" });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Screen record stop failed: ${errorText}`);
  }
  return await response.json();
};

/**
 * Start processing a previously uploaded video
 */
export const processVideo = async (
  videoId: string, 
  prompt?: string, 
  persona?: string,
  companyWebsite?: string,
  language?: string  // Add language parameter
): Promise<ProcessResponse> => {
  const body: { 
    prompt?: string; 
    persona?: string;
    companyWebsite?: string;
    language?: string;  // Add to request body
  } = {};
  
  if (prompt) body.prompt = prompt;
  if (persona) body.persona = persona;
  if (companyWebsite) body.companyWebsite = companyWebsite;
  if (language) body.language = language;  // Include language in body

  const response = await fetch(`${API_BASE_URL}/process/${videoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Processing failed: ${errorText}`);
  }

  return await response.json();
};

/**
 * Check the status of video processing
 */
export const checkStatus = async (videoId: string): Promise<StatusResponse> => {
  const response = await fetch(`${API_BASE_URL}/status/${videoId}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Status check failed: ${errorText}`);
  }

  return await response.json();
};

/**
 * Update the title of a document (Placeholder for backend endpoint)
 */
export const updateDocumentTitle = async (videoId: string, newTitle: string): Promise<void> => {
  // TODO: Replace with actual API endpoint when available
  const response = await fetch(`${API_BASE_URL}/api/docs/${videoId}/update-title`, { // Hypothetical endpoint
    method: "PATCH", // Or POST, depending on backend implementation
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Handle specific errors if needed (e.g., 404 Not Found, 400 Bad Request)
    throw new Error(`Failed to update document title: ${errorText || response.statusText}`);
  }

  // No content expected on success, or handle response if backend sends one
  console.log(`Successfully sent update request for title of ${videoId}`);
};


/**
 * Get the download URL for a processed document
 */
export const getDocumentDownloadUrl = (videoId: string): string => {
  return `${API_BASE_URL}/download/${videoId}`;
};

export const getMarkdownFileUrl = (videoId: string, filePath: string): string => {
  return `${API_BASE_URL}/docs/${videoId}/${filePath}`;
};

export const listDocsDirectory = async (videoId: string, dirPath: string = ""): Promise<any[]> => {
  const url = `${API_BASE_URL}/docs-list/${videoId}/${dirPath}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to list documentation directory");
  }
  return await response.json();
};
