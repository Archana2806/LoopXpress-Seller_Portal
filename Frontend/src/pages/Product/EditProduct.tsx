import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct: React.FC  = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/product/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        if (data.manufacturingDate) {
          data.manufacturingDate = new Date(data.manufacturingDate).toISOString().split('T')[0];
        }
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'highlights') {
      setProduct({ ...product, [name]: value.split(',').map((item) => item.trim()) });
    } else if (name.startsWith('imageUrl')) {
      const index = parseInt(name.split('-')[1], 10);
      const newImageUrls = [...product.imageUrls];
      newImageUrls[index] = value;
      setProduct({ ...product, imageUrls: newImageUrls });
    } else if (name === 'manufacturingDate') {
      setProduct({ ...product, [name]: value || null });
    } else {
      setProduct({ ...product, [name]: value || '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch(`http://localhost:5000/api/products/update-product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Failed to update product: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success('Product updated successfully!');
  
      setTimeout(() => {
        navigate(`/seller/product/${id}`);
      }, 1000);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update product');
    }
  };

  const handleCancel = () => {
    navigate(`/product/${id}`);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Create a copy of existing image URLs
    const newImageUrls = [...product.imageUrls];

    // Handle each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        newImageUrls.push(data.imageUrl); // Assuming the server returns { imageUrl: "..." }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    }

    setProduct({ ...product, imageUrls: newImageUrls });
  };

  const removeUploadedImage = (index: number) => {
    const newImageUrls = [...product.imageUrls];
    newImageUrls.splice(index, 1);
    setProduct({ ...product, imageUrls: newImageUrls });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Edit Product" />
      <div className="max-w-full">
        <div className="bg-light-theme-bg border rounded-lg p-6 shadow-lg text-light-theme-text">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-light-theme-text">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="mb-2.5 block text-light-theme-text">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Manufacturing Date</label>
                  <input
                    type="date"
                    name="manufacturingDate"
                    value={product.manufacturingDate}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={product.warranty}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                  />
                </div>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-light-theme-text">Pricing & Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="mb-2.5 block text-light-theme-text">Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={product.originalPrice}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Discounted Price</label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={product.discountedPrice}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Stock Alert Level</label>
                  <input
                    type="number"
                    name="stockAlert"
                    value={product.stockAlert}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-light-theme-text">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2.5 block text-light-theme-text">Shipping Info</label>
                  <textarea
                    name="shippingInfo"
                    value={product.shippingInfo}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-light-theme-text">Highlights</label>
                  <textarea
                    name="highlights"
                    value={product.highlights.join(', ')}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-light-theme-text">Description</h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-2.5 block text-light-theme-text">Product Description</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-light-theme-text">Product Images</h2>
              <div className="col-span-full">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
                <p className="mt-2 text-sm text-gray-300">
                  * You can upload multiple images. First image will be used as the main product image.
                </p>
                {product && (
                  <div className="flex mt-4 gap-4 overflow-auto">
                    {product.imageUrls.map((url: string, index: number) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Uploaded Preview ${index + 1}`}
                          className="h-24 w-24 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;