import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 70000, category: 'Electronics', description: 'A powerful laptop.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 2, name: 'T-shirt', price: 700, category: 'Fashion', description: 'A comfortable t-shirt.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Chair', price: 3000, category: 'Home', description: 'An ergonomic chair.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Smartphone', price: 45000, category: 'Electronics', description: 'A feature-packed smartphone.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Blender', price: 2500, category: 'Home Appliances', description: 'A high-speed blender for smoothies.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 6, name: 'Running Shoes', price: 5000, category: 'Fashion', description: 'Durable and stylish running shoes.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 7, name: 'Desk Lamp', price: 1200, category: 'Home', description: 'An LED desk lamp with adjustable brightness.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 8, name: 'Wireless Earbuds', price: 3000, category: 'Electronics', description: 'Noise-canceling wireless earbuds.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 9, name: 'Backpack', price: 1500, category: 'Fashion', description: 'A durable backpack for everyday use.', imageUrl: 'https://via.placeholder.com/50' },
    { id: 10, name: 'Smartwatch', price: 8000, category: 'Electronics', description: 'A smartwatch with health tracking features.', imageUrl: 'https://via.placeholder.com/50' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the products to display on the current page
  const displayedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  // Handle product deletion
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Handle page change (pagination)
  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= Math.ceil(filteredProducts.length / rowsPerPage)) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product List</h1>
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
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">₹{product.price}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert('Edit functionality coming soon!')}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
            className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {Math.ceil(filteredProducts.length / rowsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= Math.ceil(filteredProducts.length / rowsPerPage)}
            className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
