import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Upload, File, X, Image, FileText, AlertCircle } from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesChange: (files: File[]) => void;
  files: File[];
  error?: string;
  description?: string;
}

export function FileUpload({
  label,
  accept = "*/*",
  multiple = false,
  maxSize = 10,
  onFilesChange,
  files,
  error,
  description,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isValidFile = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      return false;
    }
    return true;
  };

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles = Array.from(selectedFiles).filter(isValidFile);

    if (multiple) {
      const combinedFiles = [...files, ...newFiles].slice(0, 5); // Max 5 files
      onFilesChange(combinedFiles);
    } else {
      onFilesChange(newFiles.slice(0, 1));
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-5 w-5 text-blue-500" />;
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <Card
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-marketplace-primary bg-marketplace-cream"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-marketplace-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        <p className="mb-2">
          Drop files here or{" "}
          <span className="text-marketplace-primary">browse</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {accept === "image/*" ? "Images" : "Files"} up to {maxSize}MB
          {multiple && " (up to 5 files)"}
        </p>
      </Card>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFileSelect(e.target.files);
          }
        }}
      />
    </div>
  );
}
