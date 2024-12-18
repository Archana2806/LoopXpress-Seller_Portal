export interface ProductData {
    name: string;
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
  

  export const subcategorySizeMap: { [key: string]: string } = {
    "gloves": "clothing",
    "gym-towels": "none",
    "mats": "none",
    "weights": "none",
    "ropes": "none",
    "rollers": "none",
    "bags": "none",
    "reflective-vests": "clothing",
    "resistant-jackets": "clothing",
    "yoga-pants": "clothing",
    "yoga-tops": "clothing",
    "yoga-shorts": "clothing",
    "yoga-bra": "clothing",
    "yoga-mats": "none",
    "cricket-clothing": "clothing",
    "cricket-shoes": "shoes",
    "bats": "none",
    "balls": "none",
    "batting-pads": "clothing",
    "batting-gloves": "clothing",
    "protective-helmet": "clothing",
    "tennis-tops": "clothing",
    "tennis-shorts": "clothing",
    "court-shoes": "shoes",
    "swimsuits": "clothing",
    "swim-shorts": "clothing",
    "goggles": "none",
    "head-caps": "clothing",
    "cycling-jerseys": "clothing",
    "cycling-shorts": "clothing",
    "cycling-shoes": "shoes",
    "cycling-helmet": "clothing",
    "sport-uniform": "clothing",
    "winter-boots": "shoes",
    "jackets": "clothing",
    "pants": "clothing",
    "thermal-wear": "clothing",
    "kids-clothing": "clothing",
    "kids-shoes": "shoes",
    "sports-socks": "clothing",
    "sports-caps": "clothing"
  };

  export const sizeOptionsMap: { [key: string]: string[] } = {
    clothing: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    shoes: ["UK6_EU39", "UK7_EU40", "UK8_EU41", "UK9_EU42", "UK10_EU43", "UK11_EU44", "UK12_EU45"],
  };

export const categories = [
  {
    category: "outdoor-fitness",
    label: "Type of Outdoor Equipment",
    subcategories: [
      { value: "reflective-vests", label: "Reflective Vests and Bands" },
      { value: "fanny-packs", label: "Fanny Packs" },
      { value: "running-belts", label: "Running Belts" },
      { value: "sunglasses", label: "Sunglasses" },
      { value: "water-containers", label: "Portable Water Containers" },
      { value: "support-braces", label: "Knee & Elbow Support Braces" },
      { value: "cooling-towels", label: "Cooling Towels" },
      { value: "sandbags", label: "Fitness Sandbags" },
      { value: "resistant-jackets", label: "Weather-Resistant Jackets" },
    ],
  },
  {
    category: "yoga",
    label: "Yoga and Pilates",
    subcategories: [
      { value: "yoga-pants", label: "Pants and Leggings" },
      { value: "yoga-tops", label: "Tops" },
      { value: "yoga-shorts", label: "Shorts" },
      { value: "yoga-bra", label: "Sports Bras" },
      { value: "straps", label: "Yoga Blocks and Straps" },
      { value: "yoga-mats", label: "Yoga Mats" },
      { value: "bolsters", label: "Yoga Bolsters" },
      { value: "meditation-cushions", label: "Meditation Cushions" },
      { value: "yoga-wheels", label: "Yoga Wheels" },
      { value: "foam-rollers", label: "Foam Rollers" },
      { value: "yoga-bags", label: "Yoga Bags" },
    ],
  },
  {
    category: "cricket",
    label: "Cricket Equipment Type",
    subcategories: [
      { value: "bats", label: "Cricket Bats" },
      { value: "balls", label: "Cricket Balls" },
      { value: "batting-pads", label: "Batting Pads" },
      { value: "batting-gloves", label: "Batting Gloves" },
      { value: "helmets", label: "Helmets" },
      { value: "wicket-keeping", label: "Wicket Keeping Equipment" },
      { value: "cricket-clothing", label: "Cricket Clothing" },
      { value: "cricket-shoes", label: "Cricket Shoes" },
      { value: "cricket-bags", label: "Cricket Bags" },
      { value: "training-equipment", label: "Training Equipment" },
      { value: "bowling-gloves", label: "Bowling Gloves" },
      { value: "cricket-stumps", label: "Cricket Stumps" },
      { value: "cricket-pads", label: "Cricket Pads" },
      { value: "cricket-guards", label: "Cricket Guards (Thigh, Chest, etc.)" },
      { value: "cricket-grip", label: "Cricket Bat Grips" },
      { value: "cricket-caps", label: "Cricket Caps" },
      { value: "cricket-tapes", label: "Cricket Tapes" },
      { value: "cricket-arm-guards", label: "Cricket Arm Guards" },
      { value: "cricket-bowling-machines", label: "Bowling Machines" },
      { value: "cricket-protection", label: "Cricket Protective Gear" },
      { value: "cricket-accessories", label: "Cricket Accessories" },
    ],
  },
  {
    category: "squash",
    label: "Squash Equipment Type",
    subcategories: [
      { value: "rackets", label: "Squash Rackets" },
      { value: "balls", label: "Squash Balls" },
      { value: "grip", label: "Squash Grip" },
      { value: "squash-towels", label: "Squash Towels" },
      { value: "shoes", label: "Court Shoes" },
      { value: "protective-gear", label: "Protective Gear" },
      { value: "squash-shorts", label: "Skirts and Shorts" },
      { value: "compression-gear", label: "Compression Gear" },
      { value: "bags", label: "Racquet Bags" },
      { value: "accessories", label: "Accessories" },
    ],
  },
  {
    category: "golf",
    label: "Golf Equipment Type",
    subcategories: [
      { value: "shirt-polo", label: "Shirts and Polos" },
      { value: "shorts-pants", label: "Shorts and Pants" },
      { value: "hats-visors", label: "Hats and Visors" },
      { value: "clubs", label: "Golf Clubs" },
      { value: "balls", label: "Golf Balls" },
      { value: "bags", label: "Golf Bags" },
      { value: "rangefinders", label: "Rangefinders" },
      { value: "gloves", label: "Golf Gloves" },
      { value: "shoes", label: "Golf Shoes" },
      { value: "training-aids", label: "Training Aids" },
    ],
  },
  {
    category: "gymnastics",
    label: "Gymnastics Equipments",
    subcategories: [
      { value: "leotards", label: "Leotards" },
      { value: "unitards", label: "Unitards" },
      { value: "gymnastics-shorts", label: "Shorts and Tank tops" },
      { value: "warm-ups", label: "Warm-up Suits" },
      { value: "singlets", label: "Singlets" },
      { value: "compression-wear", label: "Compression Wear" },
      { value: "mats", label: "Gymnastics Mats" },
      { value: "beams", label: "Balance Beams" },
      { value: "exercise-mats", label: "Exercise Mats" },
      { value: "rhythmic-gymnastics", label: "Hoops/Ribbons/Balls/Clubs/Ropes" },
      { value: "pommel-horses", label: "Pommel Horses" },
      { value: "vault-horses", label: "Vault Horses" },
      { value: "rings", label: "Still Rings" },
    ],
  },
  {
    category: "team-sports",
    label: "Football/Soccer/Basketball Equipments",
    subcategories: [
      { value: "compression-sleeves", label: "Compression Sleeves" },
      { value: "footballs", label: "Footballs Jerseys" },
      { value: "football-shorts", label: "Football Shorts" },
      { value: "football-cleats", label: "Football Cleats" },
      { value: "soccer-jerseys", label: "Soccer Jerseys" },
      { value: "soccer-shorts", label: "Soccer Shorts" },
      { value: "soccer-cleats", label: "Soccer Cleats" },
      { value: "soccer-boots", label: "Soccer Boots" },
      { value: "basketballs", label: "Basketballs Jerseys" },
      { value: "basketball-shorts", label: "Basketball Shorts" },
      { value: "basketball-shoes", label: "Basketball Shoes" },
      { value: "goalkeeper-gloves", label: "Goalkeeper Gloves" },
      { value: "protective-gear", label: "Protective Equipment" },
      { value: "training-equipment", label: "Training Equipment" },
      { value: "hoops-nets", label: "Hoops and Nets" },
    ],
  },
  {
    category: "racquet-sports",
    label: "Tennis/Badminton Equipments",
    subcategories: [
      { value: "tennis-racquets", label: "Tennis Racquets" },
      { value: "tennis-balls", label: "Tennis Balls" },
      { value: "tennis-tops", label: "Tennis Tops" },
      { value: "tennis-shorts", label: "Tennis Shorts and Skirts" },
      { value: "badminton-racquets", label: "Badminton Racquets" },
      { value: "badminton-shuttles", label: "Badminton Shuttles" },
      { value: "shuttlecocks", label: "Shuttlecocks" },
      { value: "strings", label: "Racquet Strings" },
      { value: "court-shoes", label: "Court Shoes" },
    ],
  },
  {
    category: "swimming",
    label: "Swimming Equipments",
    subcategories: [
      { value: "swimsuits", label: "Swimsuits" },
      { value: "swim-shorts", label: "Swim Shorts" },
      { value: "goggles", label: "Swimming Goggles" },
      { value: "caps", label: "Swimming Caps" },
      { value: "training-aids", label: "Kickboards/Pull Buoys/Paddles" },
      { value: "snorkels-masks", label: "Snorkels/Masks" },
      { value: "pool-equipment", label: "Pool Equipment" },
      { value: "waterproof-watches", label: "Waterproof Watches" },
    ],
  },
  {
    category: "cycling",
    label: "Cycling Equipment",
    subcategories: [
      { value: "bikes", label: "Bicycles" },
      { value: "helmets", label: "Helmets" },
      { value: "cycling-jerseys", label: "Cycling Jerseys" },
      { value: "cycling-shorts", label: "Cycling Shorts" },
      { value: "gloves", label: "Cycling Gloves" },
      { value: "shoes", label: "Cycling Shoes" },
      { value: "lights", label: "Bike Lights" },
      { value: "locks", label: "Bike Locks" },
      { value: "maintenance", label: "Maintenance Tools" },
      { value: "accessories", label: "Cycling Accessories" },
    ],
  },
];