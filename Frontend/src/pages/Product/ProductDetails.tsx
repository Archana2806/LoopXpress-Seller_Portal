import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

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
  sku: string;
  material: string;
  weight: string;
  dimensions: string;
  manufacturingDate: string;
  warranty: string;
  shippingInfo: string;
  highlights: string[];
  stockAlert: number;
  lastRestocked: string;
  salesCount: number;
  createdAt: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/product/${id}`);
        console.log('Fetching product with ID:', id);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        console.log('Received product data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const images = product.imageUrls;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Breadcrumb pageName="Product Details" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images Section */}
            <div className="md:w-1/2 p-6">
              {/* Main Image with Navigation Arrows */}
              <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-gray-100">
                <img
                  src={images[currentImageIndex]}
                  alt={`${product.title} - View ${currentImageIndex + 1}`}
                  className="w-full h-[500px] object-contain bg-white transition-transform duration-500 ease-in-out transform hover:scale-105"
                />
                
                {/* Navigation Arrows - Only show if there are multiple images */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={previousImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dc651d]"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dc651d]"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Grid - Only show if there are multiple images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105
                        ${currentImageIndex === index 
                          ? 'border-2 border-[#dc651d] shadow-lg scale-105' 
                          : 'border-2 border-transparent hover:border-gray-300'}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-24 object-cover hover:opacity-90 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Product Information */}
            <div className="md:w-1/2 p-8">
              {/* Basic Info Section */}
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">{product.brand}</p>
                    <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.title}</h1>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-4 py-1 rounded-full ">
                    In Stock: {product.quantity}
                  </span>
                </div>
                
                {/* Remove the SKU and only keep Category */}
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <p>Category: {product.category}</p>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-orange-600">₹{product.discountedPrice}</span>
                  {product.originalPrice > product.discountedPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through ml-4">₹{product.originalPrice}</span>
                      <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Product Highlights */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Product Highlights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {product.highlights?.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Product Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Shipping Information */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
                <p className="text-gray-600">{product.shippingInfo}</p>
              </div>

              {/* Inventory Stats */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-blue-600">Stock Alert</p>
                  <p className="font-bold text-blue-700">{product.stockAlert} units</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-green-600">Last Restocked</p>
                  <p className="font-bold text-green-700">
                    {new Date(product.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-purple-600">Total Sales</p>
                  <p className="font-bold text-purple-700">{product.salesCount}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                  className="flex-1 bg-[#dc651d] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Product
                </button>
                <button
                  onClick={() => navigate('/seller/product-list')}
                  className="flex-1 bg-[#24303f] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
