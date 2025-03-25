"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Upload as UploadIcon, Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  currentImage: string | null;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

export function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Reset the selected file when the current image changes externally
  useEffect(() => {
    if (!currentImage) {
      setSelectedFile(null);
    }
  }, [currentImage]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setSelectedFile(file);

      // Convert the file to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const result = event.target.result as string;
          console.log("Image loaded, length:", result.length);
          onImageSelect(result);
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleRemove = () => {
    setSelectedFile(null);
    onImageSelect("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up mb-4">
      {!currentImage ? (
        <div
          {...getRootProps()}
          className={`min-h-[150px] p-6 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-secondary/10 transition-colors duration-200 ease-in-out ${
            isDragActive ? "bg-secondary/10" : "bg-background"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-row items-center gap-4">
            <UploadIcon className="w-8 h-8 text-primary" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drop your image here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PNG, JPG, JPEG. Max size: 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-6 rounded-lg bg-background shadow-md animate-fade-in">
          <div className="flex w-full items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-primary" />
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium truncate text-foreground">
                  {selectedFile?.name || "Uploaded Image"}
                </p>
                {selectedFile && (
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="flex-shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
          <div className="w-full overflow-hidden rounded-md">
            <img
              src={currentImage}
              alt="Selected"
              className="w-full h-auto object-contain max-h-[300px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
