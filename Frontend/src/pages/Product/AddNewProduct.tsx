import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useUserInfo from '../../hooks/useUserInfo';

interface ProductData {
  name: string; // Add username field
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

type SizeType = 'clothing' | 'shoes' | 'equipment' | 'none';

const subcategorySizeMap: Record<string, SizeType> = {
  'gloves': 'clothing',
  'gym-towels': 'none',
  'mats': 'none',
  'weights': 'none',
  'ropes': 'none',
  'rollers': 'none',
  'bags': 'none',
  'reflective-vests': 'clothing',
  'resistant-jackets': 'clothing',
  'yoga-pants': 'clothing',
  'yoga-tops': 'clothing',
  'yoga-shorts': 'clothing',
  'yoga-bra': 'clothing',
  'yoga-mats': 'none',
  'cricket-clothing': 'clothing',
  'cricket-shoes': 'shoes',
  'bats': 'none',
  'balls': 'none',
  'batting-pads': 'clothing',
  'batting-gloves': 'clothing',
  'protective-helmet': 'clothing',
  'tennis-tops': 'clothing',
  'tennis-shorts': 'clothing',
  'court-shoes': 'shoes',
  'swimsuits': 'clothing',
  'swim-shorts': 'clothing',
  'goggles': 'none',
  'head-caps': 'clothing',
  'cycling-jerseys': 'clothing',
  'cycling-shorts': 'clothing',
  'cycling-shoes': 'shoes',
  'cycling-helmet': 'clothing',
  'sport-uniform': 'clothing',
  'winter-boots': 'shoes',
  'jackets': 'clothing',
  'pants': 'clothing',
  'thermal-wear': 'clothing',
  'kids-clothing': 'clothing',
  'kids-shoes': 'shoes',
  'sports-socks': 'clothing',
  'sports-caps': 'clothing',
};

interface AddNewProductProps {
  onProductAdded: () => void;
}

const AddNewProduct = ({ onProductAdded }: AddNewProductProps) => {
  const { userInfo } = useUserInfo(); // Fetch user info
  const [productData, setProductData] = useState<ProductData>({
    name: userInfo?.personalDetails?.fullName || '', // Initialize username
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
        name: userInfo?.personalDetails?.fullName || '', // Reset username
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

  const renderSizeField = () => {
    const sizeType = subcategorySizeMap[productData.subcategory] || 'none';

    if (sizeType === 'none') return null;

    return (
      <div>
        <label className="mb-2.5 block text-white">Size</label>
        {sizeType === 'clothing' && (
          <select
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
            required
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="3XL">3XL</option>
          </select>
        )}

        {sizeType === 'shoes' && (
          <select
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
            required
          >
            <option value="">Select Size</option>
            <option value="UK6_EU39">UK 6 / EU 39</option>
            <option value="UK7_EU40">UK 7 / EU 40</option>
            <option value="UK8_EU41">UK 8 / EU 41</option>
            <option value="UK9_EU42">UK 9 / EU 42</option>
            <option value="UK10_EU43">UK 10 / EU 43</option>
            <option value="UK11_EU44">UK 11 / EU 44</option>
            <option value="UK12_EU45">UK 12 / EU 45</option>
          </select>
        )}
      </div>
    );
  };

  return (
    <>
      <Breadcrumb pageName="Add New Product" />

      <div className="max-w-full">
        <div className="bg-[#24303f] border rounded-lg p-6 shadow-lg text-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userInfo?.personalDetails?.fullName ? userInfo?.personalDetails?.fullName.charAt(0).toUpperCase() + userInfo?.personalDetails?.fullName.slice(1) : 'Name not available'}
              </h3>
            </div>

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
                    <option value="first-aid">First Aid</option>
                    <option value="gym-essentials">Gym Essentials</option>
                    <option value="outdoor-fitness">Outdoor Fitness Gear</option>
                    <option value="yoga">Yoga & Meditation</option>
                    <option value="cricket">Cricket</option>
                    <option value="squash">Squash</option>
                    <option value="golf">Golf</option>
                    <option value="gymnastics">Gymnastics</option>
                    <option value="team-sports">Soccer/Football/Basketball</option>
                    <option value="racquet-sports">Tennis & Badminton</option>
                    <option value="swimming">Swimming & Water Sports</option>
                    <option value="cycling">Cycling</option>
                    <option value="combat-sports">Combat Sports</option>
                    <option value="winter-sports">Winter Sports</option>
                    <option value="kabaddi">Kabaddi</option>
                    <option value="kids-sports">Kids Sports & Equipment</option>
                    <option value="cricket">Cricket Essentials</option>
                    <option value="fitness-trackers">Fitness Trackers</option>
                    <option value="athletic-care">Athletic Care & Recovery</option>
                    <option value="sports-nutrition">Sports Nutrition</option>
                    <option value="dry-fruits">Dry Fruits</option>
                    <option value="cooking-essentials">Cooking Essentials</option>
                    <option value="training-equipment">Training Equipment</option>
                    <option value="sports-accessories">Sports Accessories</option>
                  </select>
                </div>

                {productData.category === 'first-aid' && (
                  <div>
                    <label className="mb-2.5 block text-white">First Aid Kit Type</label>
                    <select
                      name="subcategory"
                    
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="first-aid-kits">First Aid Kits</option>
                      <option value="bandages">Bandages</option>
                      <option value="gauze">Gauze</option>
                      <option value="tapes">Tapes</option>
                      <option value="massagers">Massagers</option>
                      <option value="disinfectants">Disinfectants</option>
                      <option value="antiseptics">Antiseptics</option>
                      <option value="pain-relief">Pain Relief</option>
                      <option value="burn-care">Burn Care</option>
                      <option value="eye-care">Eye Care</option>
                      <option value="splints">Splints</option>
                      <option value="cold-packs">Cold Packs</option>
                      <option value="hot-packs">Hot Packs</option>
                      <option value="first-aid-bags">First Aid Bags</option>
                    </select>
                  </div>
                )}


                {productData.category === 'gym-essentials' && (
                  <div>
                    <label className="mb-2.5 block text-white">Gym Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="gloves">Workout Gloves</option>
                      <option value="resistance">Resistance Bands</option>
                      <option value="gym-towels">Gym Towels</option>
                      <option value="mats">Yoga Mats</option>
                      <option value="weights">Free Weights</option>
                      <option value="ropes">Jumping Ropes</option>
                      <option value="rollers">Foam Rollers</option>
                      <option value="bags">Gym Bags</option>
                      <option value="kettlebells">Kettlebells</option>
                      <option value="medicine-balls">Medicine Balls</option>
                      <option value="ab-wheel">Ab Wheel</option>
                      <option value="pull-up-bars">Pull-up Bars</option>
                      <option value="stretching-tools">Stretching Tools</option>
                      <option value="balance-boards">Balance Boards</option>
                      <option value="barbells">Barbells</option>
                      <option value="dumbbells">Dumbbells</option>
                      <option value="stepper">Step Platforms</option>
                      <option value="agility-equipment">Agility Training Equipment</option>
                      <option value="plyometric-boxes">Plyometric Boxes</option>
                      <option value="sleds">Sleds</option>
                      <option value="weight-vests">Weight Vests</option>
                      <option value="jumping-jacks">Jumping Jacks</option>
                    </select>
                  </div>
                )}




                {productData.category === 'outdoor-fitness' && (
                  <div>
                    <label className="mb-2.5 block text-white">Type of Outdoor Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="reflective-vests">Reflective Vests and Bands</option>
                      <option value="fanny-packs">Fanny Packs</option>
                      <option value="running-belts">Running Belts</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="water-containers">Portable Water Containers</option>
                      <option value="support-braces">Knee & Elbow Support Braces</option>
                      <option value="cooling-towels">Cooling Towels</option>
                      <option value="sandbags">Fitness Sandbags</option>
                      <option value="resistant-jackets">Weather-Resistant Jackets</option>
                    </select>
                  </div>
                )}



                {productData.category === 'yoga' && (
                  <div>
                    <label className="mb-2.5 block text-white">Yoga and Pilates</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="yoga-pants">Pants and Leggings</option>
                      <option value="yoga-tops">Tops</option>
                      <option value="yoga-shorts">Shorts</option>
                      <option value="yoga-bra">Sports Bras</option>
                      <option value="straps">Yoga Blocks andStraps</option>
                      <option value="yoga-mats">Yoga Mats</option>
                      <option value="bolsters">Yoga Bolsters</option>
                      <option value="meditation-cushions">Meditation Cushions</option>
                      <option value="yoga-wheels">Yoga Wheels</option>
                      <option value="foam-rollers">Foam Rollers</option>
                      <option value="yoga-bags">Yoga Bags</option>
                    </select>
                  </div>
                )}


                {productData.category === 'cricket' && (
                  <div>
                    <label className="mb-2.5 block text-white">Cricket Equipment Type</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="bats">Cricket Bats</option>
                      <option value="balls">Cricket Balls</option>
                      <option value="batting-pads">Batting Pads</option>
                      <option value="batting-gloves">Batting Gloves</option>
                      <option value="helmets">Helmets</option>
                      <option value="wicket-keeping">Wicket Keeping Equipment</option>
                      <option value="cricket-clothing">Cricket Clothing</option>
                      <option value="cricket-shoes">Cricket Shoes</option>
                      <option value="cricket-bags">Cricket Bags</option>
                      <option value="training-equipment">Training Equipment</option>
                      <option value="bowling-gloves">Bowling Gloves</option>
                      <option value="cricket-stumps">Cricket Stumps</option>
                      <option value="cricket-pads">Cricket Pads</option>
                      <option value="cricket-guards">Cricket Guards (Thigh, Chest, etc.)</option>
                      <option value="cricket-grip">Cricket Bat Grips</option>
                      <option value="cricket-caps">Cricket Caps</option>
                      <option value="cricket-tapes">Cricket Tapes</option>
                      <option value="cricket-arm-guards">Cricket Arm Guards</option>
                      <option value="cricket-bowling-machines">Bowling Machines</option>
                      <option value="cricket-protection">Cricket Protective Gear</option>
                      <option value="cricket-accessories">Cricket Accessories</option>
                    </select>
                  </div>
                )}



                {productData.category === 'squash' && (
                  <div>
                    <label className="mb-2.5 block text-white">Squash Equipment Type</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="rackets">Squash Rackets</option>
                      <option value="balls">Squash Balls</option>
                      <option value="grip">Squash Grip</option>
                      <option value="squash-towels">Squash Towels</option>
                      <option value="shoes">Court Shoes</option>
                      <option value="protective-gear">Protective Gear</option>
                      <option value="squash-shorts">Skirts and Shorts</option>
                      <option value="compression-gear">Compression Gear</option>
                      <option value="bags">Racquet Bags</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                )}

                {productData.category === 'golf' && (
                  <div>
                    <label className="mb-2.5 block text-white">Golf Equipment Type</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="shirt-polo">Shirts and Polos</option>
                      <option value="shorts-pants">Shorts and Pants</option>
                      <option value="hats-visors">Hats and Visors</option>
                      <option value="clubs">Golf Clubs</option>
                      <option value="balls">Golf Balls</option>
                      <option value="bags">Golf Bags</option>
                      <option value="rangefinders">Rangefinders</option>
                      <option value="gloves">Golf Gloves</option>
                      <option value="shoes">Golf Shoes</option>
                      <option value="training-aids">Training Aids</option>
                    </select>
                  </div>
                )}

                {productData.category === 'gymnastics' && (
                  <div>
                    <label className="mb-2.5 block text-white">Gymnastics Equipments</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="leotards">Leotards</option>
                      <option value="unitards">Unitards</option>
                      <option value="gymnastics-shorts">Shorts and Tank tops</option>
                      <option value="warm-ups">Warm-up Suits</option>
                      <option value="singlets">Singlets</option>
                      <option value="compression-wear">Compression Wear</option>
                      <option value="mats">Gymnastics Mats</option>
                      <option value="beams">Balance Beams</option>
                      <option value="exercise-mats">Exercise Mats</option>
                      <option value="rhythmic-gymnastics">Hoops/Ribbons/Balls/Clubs/Ropes</option>
                      <option value="pommel-horses">Pommel Horses</option>
                      <option value="vault-horses">Vault Horses</option>
                      <option value="rings">Still Rings</option>
                    </select>
                  </div>
                )}

                {productData.category === 'team-sports' && (
                  <div>
                    <label className="mb-2.5 block text-white">Football/Soccer/Basketball Equipments</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="compression-sleeves">Compression Sleeves</option>
                      <option value="footballs">Footballs Jerseys</option>
                      <option value="football-shorts">Football Shorts</option>
                      <option value="football-cleats">Football Cleats</option>

                      <option value="soccer-jerseys">Soccer Jerseys</option>
                      <option value="soccer-shorts">Soccer Shorts</option>
                      <option value="soccer-cleats">Soccer Cleats</option>
                      <option value="soccer-boots">Soccer Boots</option>

                      <option value="basketballs">Basketballs Jerseys</option>
                      <option value="basketball-shorts">Basketball Shorts</option>
                      <option value="basketball-shoes">Basketball Shoes</option>

                      <option value="goalkeeper-gloves">Goalkeeper Gloves</option>
                      <option value="protective-gear">Protective Equipment</option>
                      <option value="training-equipment">Training Equipment</option>
                      <option value="hoops-nets">Hoops and Nets</option>
                    </select>
                  </div>
                )}

                {productData.category === 'racquet-sports' && (
                  <div>
                    <label className="mb-2.5 block text-white">Tennis/Badminton Equipments</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="tennis-racquets">Tennis Racquets</option>
                      <option value="tennis-balls">Tennis Balls</option>
                      <option value="tennis-tops">Tennis Tops</option>
                      <option value="tennis-shorts">Tennis Shorts and Skirts</option>
                      <option value="badminton-racquets">Badminton Racquets</option>
                      <option value="badminton-shuttles">Badminton Shuttles</option>
                      <option value="shuttlecocks">Shuttlecocks</option>
                      <option value="strings">Racquet Strings</option>
                      <option value="court-shoes">Court Shoes</option>
                    </select>
                  </div>
                )}

                {productData.category === 'swimming' && (
                  <div>
                    <label className="mb-2.5 block text-white">Swimming Equipments</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="swimsuits">Swimsuits</option>
                      <option value="swim-shorts">Swim Shorts</option>
                      <option value="goggles">Swimming Goggles</option>
                      <option value="caps">Swimming Caps</option>
                      <option value="training-aids">Kickboards/Pull Buoys/Paddles</option>
                      <option value="snorkels-masks">Snorkels/Masks</option>
                      <option value="pool-equipment">Pool Equipment</option>
                      <option value="waterproof-watches">Waterproof Watches</option>
                    </select>
                  </div>
                )}

                {productData.category === 'cycling' && (
                  <div>
                    <label className="mb-2.5 block text-white">Cycling Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="bikes">Bicycles</option>
                      <option value="helmets">Helmets</option>
                      <option value="cycling-jerseys">Cycling Jerseys</option>
                      <option value="cycling-shorts">Cycling Shorts</option>
                      <option value="gloves">Cycling Gloves</option>
                      <option value="shoes">Cycling Shoes</option>
                      <option value="lights">Bike Lights</option>
                      <option value="locks">Bike Locks</option>
                      <option value="maintenance">Maintenance Tools</option>
                      <option value="accessories">Cycling Accessories</option>
                    </select>
                  </div>
                )}

                {productData.category === 'combat-sports' && (
                  <div>
                    <label className="mb-2.5 block text-white">Combat Sports Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="gloves">Boxing/MMA Gloves</option>
                      <option value="protective-gear">Protective Equipment</option>
                      <option value="punching-bags">Punching Bags</option>
                      <option value="wraps">Hand Wraps</option>
                      <option value="mouthguards">Mouthguards</option>
                      <option value="uniforms">Martial Arts Uniforms</option>
                      <option value="training-pads">Training Pads</option>
                      <option value="boxing-rings">Ring Equipment</option>
                    </select>
                  </div>
                )}

                {productData.category === 'winter-sports' && (
                  <div>
                    <label className="mb-2.5 block text-white">Winter Sports Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="skis">Skis and Poles</option>
                      <option value="snowboards">Snowboards</option>
                      <option value="boots">Winter Boots</option>
                      <option value="jackets">Winter Jackets</option>
                      <option value="pants">Snow Pants</option>
                      <option value="goggles">Snow Goggles</option>
                      <option value="helmets">Winter Sports Helmets</option>
                      <option value="gloves">Winter Gloves</option>
                      <option value="thermal-wear">Thermal Wear</option>
                    </select>
                  </div>
                )}

                {productData.category === 'kabaddi' && (
                  <div>
                    <label className="mb-2.5 block text-white">Kabaddi Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="jerseys">Kabaddi Jerseys</option>
                      <option value="shorts">Kabaddi Shorts</option>
                      <option value="knee-pads">Knee Pads</option>
                      <option value="ankle-supports">Ankle Supports</option>
                      <option value="mats">Training Mats</option>
                      <option value="shoes">Kabaddi Shoes</option>
                      <option value="protective-gear">Protective Equipment</option>
                    </select>
                  </div>
                )}

                {productData.category === 'kids-sports' && (
                  <div>
                    <label className="mb-2.5 block text-white">Kids Sports Equipment</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="junior-cricket">Junior Cricket Sets</option>
                      <option value="kids-football">Kids Football Equipment</option>
                      <option value="kids-basketball">Kids Basketball Sets</option>
                      <option value="kids-tennis">Kids Tennis Equipment</option>
                      <option value="kids-swimming">Kids Swimming Gear</option>
                      <option value="kids-protective">Kids Protective Gear</option>
                      <option value="kids-clothing">Sports Clothing</option>
                      <option value="kids-shoes">Sports Shoes</option>
                      <option value="training-aids">Training Aids</option>
                      <option value="outdoor-toys">Outdoor Sports Toys</option>
                    </select>
                  </div>
                )}

                {productData.category === 'fitness-trackers' && (
                  <div>
                    <label className="mb-2.5 block text-white">Fitness Tracking Devices</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="smartwatches">Smart Watches</option>
                      <option value="activity-bands">Activity Bands</option>
                      <option value="heart-rate">Heart Rate Monitors</option>
                      <option value="pedometers">Pedometers</option>
                      <option value="sleep-trackers">Sleep Trackers</option>
                      <option value="gps-trackers">GPS Tracking Devices</option>
                      <option value="accessories">Tracker Accessories</option>
                      <option value="smart-scales">Smart Scales</option>
                    </select>
                  </div>
                )}

                {productData.category === 'athletic-care' && (
                  <div>
                    <label className="mb-2.5 block text-white">Athletic Care Products</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="compression">Compression Gear</option>
                      <option value="supports">Athletic Supports/Braces</option>
                      <option value="tape">Athletic Tape/Wraps</option>
                      <option value="massage">Massage Tools</option>
                      <option value="ice-heat">Ice/Heat Therapy</option>
                      <option value="first-aid">First Aid Kits</option>
                      <option value="pain-relief">Pain Relief Products</option>
                      <option value="recovery-tools">Recovery Tools</option>
                      <option value="foot-care">Foot Care Products</option>
                      <option value="shin-splints">Shin Splint Supports</option>
                      <option value="joint-support">Joint Support</option>
                      <option value="muscle-relief">Muscle Relaxants</option>
                      <option value="ankle-support">Ankle Supports</option>
                      <option value="knee-support">Knee Supports</option>
                      <option value="elbow-support">Elbow Supports</option>
                      <option value="wrist-support">Wrist Supports</option>
                      <option value="neck-support">Neck Supports</option>
                      <option value="stretching-tools">Stretching Tools</option>
                      <option value="orthotics">Orthotics/Insoles</option>
                      <option value="massagers">Massagers</option>
                      <option value="massage-balls">Massage Balls</option>
                      <option value="foam-rollers">Foam Rollers</option>
                      <option value="cupping">Cupping Therapy</option>
                    </select>
                  </div>
                )}


                {productData.category === 'sports-nutrition' && (
                  <div>
                    <label className="mb-2.5 block text-white">Sports Nutrition Products</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="protein">Protein Supplements</option>
                      <option value="pre-workout">Pre-Workout Supplements</option>
                      <option value="post-workout">Post-Workout Recovery</option>
                      <option value="amino-acids">Amino Acids/BCAAs</option>
                      <option value="energy-drinks">Sports Drinks/Energy Gels</option>
                      <option value="vitamins">Sports Vitamins/Minerals</option>
                      <option value="weight-gainers">Weight Gainers</option>
                      <option value="meal-replacement">Meal Replacement</option>
                      <option value="hydration">Hydration Products</option>
                      <option value="creatine">Creatine Supplements</option>
                      <option value="testosterone-boosters">Testosterone Boosters</option>
                      <option value="fat-burners">Fat Burners</option>
                      <option value="probiotics">Probiotics</option>
                      <option value="collagen">Collagen Supplements</option>
                      <option value="superfoods">Superfood Powders</option>
                      <option value="joint-support">Joint Support</option>
                      <option value="plant-based">Plant-Based Supplements</option>
                      <option value="vegan-protein">Vegan Protein</option>
                      <option value="digestive-health">Digestive Health Supplements</option>
                      <option value="detox">Detox Products</option>
                      <option value="electrolytes">Electrolyte Supplements</option>
                    </select>
                  </div>
                )}


                {productData.category === 'dry-fruits' && (
                  <div>
                    <label className="mb-2.5 block text-white">Dry Fruits and Nuts</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory} 
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                    >
                      <option value="">Select Type</option>
                      <option value="almonds">Almonds</option>
                      <option value="cashews">Cashews</option>
                      <option value="walnuts">Walnuts</option>
                      <option value="berries-nuts">Berries and Nuts</option>
                      <option value="pistachios">Pistachios</option>
                      <option value="peanuts">Peanuts</option>
                      <option value="pumpkin-seeds">Pumpkin Seeds</option>
                      <option value="sunflower-seeds">Sunflower Seeds</option>
                      <option value="chia-seeds">Chia Seeds</option>
                      <option value="flax-seeds">Flax Seeds</option>
                      <option value="seven-seeds">Seven Seeds Mix</option>
                      <option value="raisins">Raisins</option>
                      <option value="dates">Dates</option>
                      <option value="apricots">Apricots</option>
                      <option value="figs">Figs</option>
                      <option value="prunes">Prunes</option>
                      <option value="mixed">Mixed Dry Fruits</option>
                      <option value="dried-guava">Dried Guava</option>
                      <option value="dried-mango">Dried Mango</option>
                      <option value="dried-pineapple">Dried Pineapple</option>
                      <option value="dried-amia">Dried Amia</option>
                    </select>
                  </div>
                )}

                {productData.category === 'cooking-essentials' && (
                  <div>
                    <label className="mb-2.5 block text-white">Cooking Essentials</label>
                    <select
                      name="subcategory"
                      value={productData.subcategory}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                      > 
                        <option value="">Select Type</option>
                        <option value="cookware">Cookware</option>
                        <option value="cutlery">Cutlery</option>
                        <option value="baking-tools">Baking Tools</option>
                        <option value="graters">Graters</option>
                        <option value="peelers">Peelers</option>
                        <option value="choppers">Choppers</option>
                        <option value="spatulas">Spatulas</option>
                        <option value="tongs">Tongs</option>
                        <option value="spoons">Spoons</option>
                        <option value="knives">Knives</option>
                        <option value="forks">Forks</option>
                        <option value="plates">Plates</option>
                        <option value="bowls">Bowls</option>
                        <option value="cups">Cups</option>
                        <option value="peanut-butter">Peanut Butter</option>
                        <option value="butter">Butter</option>
                        <option value="cheese">Cheese</option>
                        <option value="atta">Multigrain Atta</option>
                        <option value="rice">Basmati Rice</option>
                        <option value="pulses">Pulses</option>
                        <option value="spices">Spices</option>
                        <option value="oils">Cooking Oils</option>
                        <option value="corn">Corn</option>
                        <option value="honey">Honey</option>
                        <option value="ghee">Ghee</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                      </select>
                    </div>
                  )}


                  {productData.category === 'training-equipment' && (
                    <div>
                      <label className="mb-2.5 block text-white">Training Equipment</label>
                      <select
                        name="subcategory"
                        value={productData.subcategory}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                      >
                        <option value="">Select Type</option>
                        <option value="resistance-bands">Resistance Bands</option>
                        <option value="weights">Free Weights</option>
                        <option value="kettlebells">Kettlebells</option>
                        <option value="medicine-balls">Medicine Balls</option>
                        <option value="foam-rollers">Foam Rollers</option>
                        <option value="agility">Agility Training Equipment</option>
                        <option value="balance">Balance Training Tools</option>
                        <option value="plyometric">Plyometric Equipment</option>
                        <option value="strength">Strength Training Gear</option>
                        <option value="dumbbells">Dumbbells</option>
                        <option value="barbells">Barbells</option>
                        <option value="resistance-tubes">Resistance Tubes</option>
                        <option value="jump-ropes">Jump Ropes</option>
                        <option value="pull-up-bars">Pull-Up Bars</option>
                        <option value="sleds">Sleds</option>
                        <option value="sandbags">Sandbags</option>
                        <option value="battle-ropes">Battle Ropes</option>
                        <option value="push-up-bars">Push-Up Bars</option>
                        <option value="treadmills">Treadmills</option>
                        <option value="exercise-bikes">Exercise Bikes</option>
                        <option value="rowing-machines">Rowing Machines</option>
                        <option value="stepper-machines">Stepper Machines</option>
                        <option value="ab-rollers">Ab Rollers</option>
                        <option value="stretching-straps">Stretching Straps</option>
                        <option value="strength-plates">Weight Plates</option>
                      </select>
                    </div>
                  )}


                  {productData.category === 'sports-accessories' && (
                    <div>
                      <label className="mb-2.5 block text-white">Sports Accessories</label>
                      <select
                        name="subcategory"
                        value={productData.subcategory}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-[#dc651d] bg-[#24303f] py-3 px-5 text-white outline-none transition focus:border-[#dc651d]"
                      >
                        <option value="">Select Type</option>
                        <option value="bags">Sports Bags</option>
                        <option value="water-bottles">Water Bottles</option>
                        <option value="towels">Sports Towels</option>
                        <option value="headbands">Headbands/Wristbands</option>
                        <option value="socks">Sports Socks</option>
                        <option value="caps">Sports Caps/Visors</option>
                        <option value="sunglasses">Sports Sunglasses</option>
                        <option value="watches">Sports Watches</option>
                        <option value="storage">Equipment Storage</option>
                        <option value="misc">Miscellaneous Accessories</option>
                        <option value="gloves">Sports Gloves</option>
                        <option value="knee-pads">Knee Pads/Elbow Pads</option>
                        <option value="arm-bands">Arm Bands</option>
                        <option value="shin-guards">Shin Guards</option>
                        <option value="mouthguards">Mouthguards</option>
                        <option value="compression-sleeves">Compression Sleeves</option>
                        <option value="belts">Weight Lifting Belts</option>
                        <option value="gym-straps">Gym Straps</option>
                        <option value="neck-braces">Neck Braces</option>
                        <option value="sports-tape">Sports Tape</option>
                        <option value="pumps">Ball Pumps</option>
                        <option value="protective-gear">Protective Gear</option>
                        <option value="training-accessories">Training Accessories</option>
                        <option value="hydration-packs">Hydration Packs</option>
                      </select>
                    </div>
                  )}


                {renderSizeField()}
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