import React from 'react';
import "./Products.css"

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <img src={product.img_url} alt={product.title} className="w-full h-auto mb-4" />
        <p>{product.description}</p>
        <div className="ClosePrice">
        <button 
          onClick={onClose} 
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
        <p className="mt-4 bg-green-500 text-white py-2 px-4 rounded">{product.price-0.01} $ </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
