
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FileUploader from './FileUploader';
import { FileText, Trash2, Loader2 } from 'lucide-react';

const BookAssetManager: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch existing book assets
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('book_assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAssets(data || []);
    } catch (error: any) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Failed to load assets",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Save file info to database after upload
  const handleUploadComplete = async (fileUrl: string, fileName: string) => {
    try {
      const { data, error } = await supabase
        .from('book_assets')
        .insert([
          { 
            asset_name: fileName,
            asset_url: fileUrl
          }
        ]);
      
      if (error) throw error;
      
      // Refresh assets list
      fetchAssets();
    } catch (error: any) {
      console.error('Error saving asset info:', error);
      toast({
        title: "Failed to save asset information",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Delete an asset
  const handleDeleteAsset = async (id: string) => {
    setDeleting(id);
    try {
      // Find the asset first to get the URL
      const assetToDelete = assets.find(asset => asset.id === id);
      if (!assetToDelete) {
        throw new Error("Asset not found");
      }

      // Extract the file path from the URL
      const fileUrl = assetToDelete.asset_url;
      const filePath = fileUrl.split('/').pop();

      if (filePath) {
        // Remove from storage first
        const storageResult = await supabase.storage
          .from('book-assets')
          .remove([`ebooks/${filePath}`]);
          
        if (storageResult.error) {
          console.warn('Error removing from storage:', storageResult.error);
          // Continue anyway to clean up the database
        }
      }

      // Now remove from database
      const { error } = await supabase
        .from('book_assets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Asset deleted",
        description: "The asset has been removed.",
      });
      
      // Refresh assets list
      fetchAssets();
    } catch (error: any) {
      console.error('Error deleting asset:', error);
      toast({
        title: "Failed to delete asset",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Card className="border-slate-700 bg-slate-900">
      <CardHeader>
        <CardTitle>Book Assets Manager</CardTitle>
        <CardDescription>
          Upload and manage the PDF ebook and other downloadable assets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <FileUploader 
            onUploadComplete={handleUploadComplete}
            label="Upload Ebook PDF"
            accept=".pdf"
          />
        </div>
        
        <h3 className="text-lg font-medium mb-4">Current Assets</h3>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : assets.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No assets uploaded yet. Use the form above to upload your ebook PDF.
          </p>
        ) : (
          <div className="space-y-3">
            {assets.map((asset) => (
              <div 
                key={asset.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-950"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <p className="font-medium truncate max-w-[200px] md:max-w-[400px]">
                      {asset.asset_name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Added on {new Date(asset.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={asset.asset_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </a>
                  
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDeleteAsset(asset.id)}
                    disabled={deleting === asset.id}
                  >
                    {deleting === asset.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookAssetManager;
