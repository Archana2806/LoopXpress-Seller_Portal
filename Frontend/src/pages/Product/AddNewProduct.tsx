import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface ProductData {
  title: string;
  brand: string;
  imageUrls: string[];
  originalPrice: string;
  discountedPrice: string;
  category: string;
  subcategory: string;
  quantity: string;
  size: string;
  description: string;
  material: string;
  weight: string;
  dimensions: string;
  manufacturingDate: string;
  warranty: string;
  shippingInfo: string;
  highlights: string[];
  stockAlert: string;
}

const AddNewProduct = () => {
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    brand: '',
    imageUrls: ['', '', '', ''],
    originalPrice: '',
    discountedPrice: '',
    category: '',
    subcategory: '',
    quantity: '',
    size: '',
    description: '',
    material: '',
    weight: '',
    dimensions: '',
    manufacturingDate: '',
    warranty: '',
    shippingInfo: '',
    highlights: [''],
    stockAlert: ''
  });

  const [highlightInput, setHighlightInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      setProductData({
        ...productData,
        category: value,
        size: '',
        subcategory: ''
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const addHighlight = () => {
    setProductData({
      ...productData,
      highlights: [...productData.highlights, '']
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = productData.highlights.filter((_, i) => i !== index);
    setProductData({
      ...productData,
      highlights: newHighlights
    });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...productData.highlights];
    newHighlights[index] = value;
    setProductData({
      ...productData,
      highlights: newHighlights
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productData.imageUrls[0]) {
      alert('Main product image is required');
      return;
    }

    try {
      const formattedData = {
        ...productData,
        originalPrice: parseFloat(productData.originalPrice),
        discountedPrice: parseFloat(productData.discountedPrice),
        quantity: parseInt(productData.quantity),
        stockAlert: parseInt(productData.stockAlert),
        imageUrls: productData.imageUrls.map(url => url.trim()).slice(0, 4),
        highlights: productData.highlights.filter(highlight => highlight.trim() !== '')
      };

      const response = await fetch('http://localhost:5000/api/products/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to add product');
      }

      const result = await response.json();
      alert('Product added successfully!');
      
      setProductData({
        title: '',
        brand: '',
        imageUrls: ['', '', '', ''],
        originalPrice: '',
        discountedPrice: '',
        category: '',
        subcategory: '',
        quantity: '',
        size: '',
        description: '',
        material: '',
        weight: '',
        dimensions: '',
        manufacturingDate: '',
        warranty: '',
        shippingInfo: '',
        highlights: [],
        stockAlert: ''
      });
    } catch (error) {
      console.error('Error submitting product:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while adding the product');
    }
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...productData.imageUrls];
    newImageUrls[index] = value;
    setProductData({
      ...productData,
      imageUrls: newImageUrls
    });
  };

  const addImageUrl = () => {
    setProductData({
      ...productData,
      imageUrls: [...productData.imageUrls, '']
    });
  };

  const removeImageUrl = (index: number) => {
    if (productData.imageUrls.length > 1) {
      const newImageUrls = productData.imageUrls.filter((_, i) => i !== index);
      setProductData({
        ...productData,
        imageUrls: newImageUrls
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add New Product" />

      <div className="max-w-full">
        <div className="bg-[#24303f] border rounded-lg p-6 shadow-lg text-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="mb-2.5 block text-white">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div className="col-span-full">
                  <label className="mb-2.5 block text-white">Product Images</label>
                  <div className="space-y-3">
                    {productData.imageUrls.map((url, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => handleImageUrlChange(index, e.target.value)}
                          className="flex-1 rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                          placeholder={index === 0 ? "Main product image URL (will be displayed in list)" : `Additional image URL ${index + 1}`}
                          required={index === 0}
                        />
                        {url && (
                          <div className="flex items-center">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="h-12 w-12 object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'placeholder-image-url';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    * First image will be displayed as the main product image in the list view
                  </p>
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Category</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="clothing">Clothing</option>
                    <option value="shoes">Shoes</option>
                    <option value="food">Food</option>
                    <option value="fitness-trackers">Fitness Trackers</option>
                    {/* Add more categories as needed */}
                  </select>
                </div>

                {/* Conditionally render subcategory field based on category */}
                {productData.category === 'clothing' && (
                  <div>
                    <label className="mb-2.5 block text-white">Type of Clothing</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="jacket">Jacket</option>
                      <option value="shirt">Shirt</option>
                      <option value="trousers">Trousers</option>
                      {/* Add more subcategories as needed */}
                    </select>
                  </div>
                )}

                {productData.category === 'food' && (
                  <div>
                    <label className="mb-2.5 block text-white">Type of Food</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="multivitamins">Multivitamins</option>
                      <option value="proteins">Protein Powder</option>
                      <option value="supplements">Supplements</option>
                      <option value="sports-nutrition">Sports Nutrition</option>
                      {/* Add more subcategories as needed */}
                    </select>
                  </div>
                )}

                {productData.category === 'shoes' && (
                  <div>
                    <label className="mb-2.5 block text-white">Type of Shoes</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="running">Running Shoes</option>
                      <option value="training">Training Shoes</option>
                      <option value="sports">Sports Shoes</option>
                      <option value="casual">Casual Shoes</option>
                      {/* Add more subcategories as needed */}
                    </select>
                  </div>
                )}

                {productData.category === 'fitness-trackers' && (
                  <div>
                    <label className="mb-2.5 block text-white">Type of Fitness Tracker</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="smartwatch">Smartwatch</option>
                      <option value="activity-band">Activity Band</option>
                      <option value="heart-rate-monitor">Heart Rate Monitor</option>
                      <option value="gps-tracker">GPS Tracker</option>
                      <option value="sleep-tracker">Sleep Tracker</option>
                      {/* Add more subcategories as needed */}
                    </select>
                  </div>
                )}

                {/* Conditionally render size field based on category */}
                {productData.category === 'clothing' && (
                  <div>
                    <label className="mb-2.5 block text-white">Size</label>
                    <select
                      name="size"
                      value={productData.size}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                )}

                {productData.category === 'shoes' && (
                  <div>
                    <label className="mb-2.5 block text-white">Size</label>
                    <select
                      name="size"
                      value={productData.size}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Size</option>
                      <option value="6">UK 6 / EU 40</option>
                      <option value="7">UK 7 / EU 41</option>
                      <option value="8">UK 8 / EU 42</option>
                      <option value="9">UK 9 / EU 43</option>
                      <option value="10">UK 10 / EU 44</option>
                      <option value="11">UK 11 / EU 45</option>
                      <option value="12">UK 12 / EU 46</option>
                    </select>
                  </div>
                )}

                {productData.category === 'food' && (
                  <div>
                    <label className="mb-2.5 block text-white">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={productData.size}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                      placeholder="Enter size (e.g., 500g, 1kg, 2L)"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Pricing & Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="mb-2.5 block text-white">Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={productData.originalPrice}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Discounted Price</label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Stock Alert Level</label>
                  <input
                    type="number"
                    name="stockAlert"
                    value={productData.stockAlert}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2.5 block text-white">Manufacturing Date</label>
                  <input
                    type="date"
                    name="manufacturingDate"
                    value={productData.manufacturingDate}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={productData.warranty}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                  />
                </div>
              </div>
            </div>

            {/* Product Highlights with original styling */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Product Highlights</h2>
              <div className="space-y-4">
                {productData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                      className="flex-1 rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlight}
                  className="w-full px-4 py-2 bg-[#dc651d] text-white rounded hover:bg-opacity-90"
                >
                  Add Highlight
                </button>
              </div>
            </div>

            {/* Description and Shipping */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Description & Shipping</h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-2.5 block text-white">Product Description</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-white">Shipping Information</label>
                  <textarea
                    name="shippingInfo"
                    value={productData.shippingInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#dc651d] text-white p-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
