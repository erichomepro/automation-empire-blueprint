
import React from 'react';

interface ProductSummaryProps {
  product: {
    title?: string;
    description?: string;
    price?: number;
  } | null;
}

const ProductSummary = ({ product }: ProductSummaryProps) => {
  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg">
      <h2 className="text-lg font-semibold">{product?.title || 'Automation Empire'}</h2>
      <p className="text-slate-400">{product?.description || 'The blueprints for $20K+ months using Make.com + Airtable'}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-slate-400">Price:</span>
        <span className="text-xl font-bold">${product?.price || '9.99'}</span>
      </div>
    </div>
  );
};

export default ProductSummary;
