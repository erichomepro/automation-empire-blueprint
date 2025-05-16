
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploaderProps {
  onUploadComplete?: (fileUrl: string, fileName: string) => void;
  accept?: string;
  label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onUploadComplete, 
  accept = ".pdf", 
  label = "Upload PDF"
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setFileName(file.name);
    
    setUploading(true);
    
    try {
      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const filePath = `ebooks/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('book-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        throw error;
      }
      
      // Get public URL for the file
      const { data: { publicUrl } } = supabase.storage
        .from('book-assets')
        .getPublicUrl(filePath);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
      
      // Notify parent component
      if (onUploadComplete) {
        onUploadComplete(publicUrl, file.name);
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file-upload">{label}</Label>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            id="file-upload"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            <span className="flex-1 text-left truncate">
              {fileName || "Choose file..."}
            </span>
          </Button>
        </div>
      </div>
      
      {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
    </div>
  );
};

export default FileUploader;
