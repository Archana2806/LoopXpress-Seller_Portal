import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  title: string;
  brand: string;
  imageUrls: string[];
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  size: string;
  description: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (mounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the products to display on the current page
  const displayedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Only update UI if delete was successful
          await fetchProducts(); // Re-fetch the updated list from server
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  // Handle page change (pagination)
  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= Math.ceil(filteredProducts.length / rowsPerPage)) return;
    setPage(newPage);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/3 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div 
                className="h-48 overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.imageUrls[0]}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-2">
                  Brand: {product.brand}
                </p>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {product.title}
                </h2>
                
                {/* Price Section */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-orange-600">
                      ₹{product.discountedPrice}
                    </span>
                    {product.originalPrice > product.discountedPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    Stock: {product.quantity}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleProductClick(product._id)}
                    className="flex-1 bg-[#20651e] text-white px-3 py-1.5 rounded-md hover:bg-[#20651e] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-[#24303f] text-white px-3 py-1.5 rounded-md hover:bg-[#24303f] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="flex items-center px-4 py-2 text-base font-semibold text-white bg-[#20651e] rounded-md hover:bg-[#20651e] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150 shadow-sm"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <span className="text-base font-semibold text-gray-700">
            Page {page + 1} of {Math.ceil(filteredProducts.length / rowsPerPage)}
          </span>
          
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= Math.ceil(filteredProducts.length / rowsPerPage)}
            className="flex items-center px-4 py-2 text-base font-semibold text-white bg-[#20651e] rounded-md hover:bg-[#20651e] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150 shadow-sm"
          >
            Next
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
