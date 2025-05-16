
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BookAssetManager from '@/components/admin/BookAssetManager';
import { ArrowLeft } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <BookAssetManager />
      </div>
    </div>
  );
};

export default Admin;
