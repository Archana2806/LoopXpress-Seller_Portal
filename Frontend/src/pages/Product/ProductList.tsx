import React, { useState, useEffect } from 'react';

interface Product {
  _id: string;
  title: string;
  brand: string;
  imageUrl: string;
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

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/3 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Product Table */}
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Image</th>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Price</th>
              <th className="px-4 py-2 text-left text-gray-700">Category</th>
              <th className="px-4 py-2 text-left text-gray-700">Description</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-gray-800">{product.title}</td>
                <td className="px-4 py-2 text-gray-800">₹{product.originalPrice}</td>
                <td className="px-4 py-2 text-gray-800">{product.category}</td>
                <td className="px-4 py-2 text-gray-800">{product.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert('Edit functionality coming soon!')}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="flex items-center px-4 py-2 text-base font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150 shadow-sm"
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
            className="flex items-center px-4 py-2 text-base font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150 shadow-sm"
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
