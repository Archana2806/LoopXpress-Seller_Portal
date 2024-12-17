import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  title: string;
  brand: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  imageUrls: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch('http://localhost:5000/api/products/my-products', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-4">
        <p>No products found.</p>
        <Link to="/seller/add-product" className="text-blue-500 hover:underline">
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link 
          to="/seller/add-product"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow-lg p-4">
            <img 
              src={product.imageUrls[0]} 
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="text-green-600 font-bold">₹{product.discountedPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Category: {product.category}</span>
              <span className="text-sm text-gray-600">Stock: {product.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
