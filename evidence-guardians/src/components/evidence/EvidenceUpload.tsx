
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, FileCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const EvidenceUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  // Remove selected file
  const removeFile = () => {
    setFile(null);
  };
  
  // Upload evidence (mock function)
  const uploadEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setFile(null);
      toast.success("Evidence uploaded successfully!", {
        description: "Hash verification and audit log have been created.",
      });
    }, 2000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Evidence</CardTitle>
        <CardDescription>
          Add new evidence to the system. All uploads are securely hashed and logged.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={uploadEvidence}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="case">Case Number</Label>
              <Input id="case" placeholder="Enter case number" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Evidence Title</Label>
              <Input id="title" placeholder="Enter a descriptive title" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Evidence Type</Label>
              <Select required defaultValue="document">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide details about this evidence"
                className="resize-none"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                } ${file ? 'bg-secondary/50' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                {!file ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop file here</p>
                    <p className="text-xs text-muted-foreground mb-3">or</p>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select file
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileCheck className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!file || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Upload Evidence"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EvidenceUpload;
