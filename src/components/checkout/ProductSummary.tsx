
import React from 'react';

const ProductSummary = () => {
  // Using fixed product details
  const product = {
    title: 'Automation Empire',
    description: 'The blueprints for $20K+ months using Make.com + Airtable',
    price: 9.99
  };

  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-slate-400">{product.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-slate-400">Price:</span>
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductSummary;
