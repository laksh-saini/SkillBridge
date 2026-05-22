import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const ResumeUpload = ({ onFileSelect, selectedFile }: ResumeUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

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
    
    const file = e.dataTransfer.files[0];
    if (file && isValidFileType(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFileType(file)) {
      onFileSelect(file);
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = ["application/pdf"];
    return validTypes.includes(file.type);
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  const truncateFileName = (name: string, maxLength: number = 25) => {
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop();
    const baseName = name.slice(0, name.lastIndexOf('.'));
    const truncated = baseName.slice(0, maxLength - 3 - (ext?.length || 0)) + '...';
    return `${truncated}.${ext}`;
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground mb-2">
        Upload your resume
      </label>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer",
          isDragging
            ? "border-primary bg-primary-light"
            : selectedFile
            ? "border-primary/50 bg-primary-light/50"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-foreground">File uploaded!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4" title={selectedFile.name}>
                {truncateFileName(selectedFile.name)}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="inline-flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 transition-colors"
              >
                <X className="w-4 h-4" />
                Remove file
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="no-file"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">
                Drop your resume here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF only
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeUpload;
