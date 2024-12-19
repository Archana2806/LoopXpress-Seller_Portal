import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { categories } from '../../constant/ProductData';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSaving, setSaving] = useState(false);

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
    } else if (name === 'originalPrice' || name === 'discountedPrice') {
      // Convert price inputs to numbers
      setProduct({ ...product, [name]: value ? Number(value) : '' });
    } else {
      setProduct({ ...product, [name]: value || '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate prices before submitting
    if (Number(product.discountedPrice) > Number(product.originalPrice)) {
      toast.error('Discounted price cannot be greater than original price');
      return;
    }

    setSaving(true);
    try {
      const authToken = localStorage.getItem('authToken');
      
      const formData = new FormData();
      
      uploadedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const existingImages = product.imageUrls.filter(url => !url.startsWith('blob:'));
      formData.append('existingImageUrls', JSON.stringify(existingImages));

      const productDataToSend = { ...product };
      delete productDataToSend.imageUrls;
      delete productDataToSend.base64Images;

      Object.keys(productDataToSend).forEach(key => {
        if (productDataToSend[key] !== null && productDataToSend[key] !== undefined) {
          formData.append(key, 
            typeof productDataToSend[key] === 'object' ? 
            JSON.stringify(productDataToSend[key]) : 
            productDataToSend[key]
          );
        }
      });

      const response = await fetch(`http://localhost:5000/api/products/update-product/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const data = await response.json();
      toast.success('Product updated successfully!');
  
      setTimeout(() => {
        navigate(`/seller/product/${id}`);
      }, 1000);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/product/${id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImageUrls = [...product.imageUrls];
    const newUploadedFiles = [...uploadedFiles];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Create temporary URL for preview
      const previewUrl = URL.createObjectURL(file);
      newImageUrls.push(previewUrl);
      newUploadedFiles.push(file);
    }

    setProduct({ ...product, imageUrls: newImageUrls });
    setUploadedFiles(newUploadedFiles);
  };

  const removeUploadedImage = (index: number) => {
    const removedUrl = product.imageUrls[index];
    // Only revoke URL if it's a blob URL (temporary preview)
    if (removedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(removedUrl);
    }

    const newImageUrls = product.imageUrls.filter((_, i) => i !== index);
    const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);

    setProduct({ ...product, imageUrls: newImageUrls });
    setUploadedFiles(newUploadedFiles);
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
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="w-full rounded border-[1.5px] border-light-theme-border bg-light-theme-bg py-3 px-5 text-light-theme-text outline-none transition focus:border-light-theme-focus"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.category} value={category.category}>
                        {category.label}
                      </option>
                    ))}
                  </select>
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
                  <div className="mt-4 w-full overflow-x-auto" style={{ maxHeight: '150px' }}>
                    <div className="flex gap-4 pb-2">
                      {product.imageUrls.map((url: string, index: number) => (
                        <div key={index} className="relative flex-shrink-0">
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
                  </div>
                )}
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;