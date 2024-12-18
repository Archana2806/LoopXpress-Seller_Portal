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
  
  // export const initialProductData: ProductData = {
  //   name: '', // This will be set dynamically
  //   title: '',
  //   brand: '',
  //   imageUrls: ['', '', '', ''],
  //   originalPrice: '',
  //   discountedPrice: '',
  //   category: '',
  //   subcategory: '',
  //   quantity: '',
  //   size: '',
  //   description: '',
  //   material: '',
  //   weight: '',
  //   dimensions: '',
  //   manufacturingDate: '',
  //   warranty: '',
  //   shippingInfo: '',
  //   highlights: [''],
  //   stockAlert: ''
  // };

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
      category: "first-aid",
      label: "First Aid",
      subcategories: [
        { value: "first-aid-kits", label: "First Aid Kits" },
        { value: "bandages", label: "Bandages" },
        { value: "gauze", label: "Gauze" },
        { value: "tapes", label: "Tapes" },
        { value: "massagers", label: "Massagers" },
        { value: "disinfectants", label: "Disinfectants" },
        { value: "antiseptics", label: "Antiseptics" },
        { value: "pain-relief", label: "Pain Relief" },
        { value: "burn-care", label: "Burn Care" },
        { value: "eye-care", label: "Eye Care" },
        { value: "splints", label: "Splints" },
        { value: "cold-packs", label: "Cold Packs" },
        { value: "hot-packs", label: "Hot Packs" },
        { value: "first-aid-bags", label: "First Aid Bags" },
        { value: "medical-tape", label: "Medical Tape" },
        { value: "wound-cleaner", label: "Wound Cleaner" },
      ],
    },
    {
      category: "gym-essentials",
      label: "Gym Essentials",
      subcategories: [
        { value: "dumbbells", label: "Dumbbells" },
        { value: "kettlebells", label: "Kettlebells" },
        { value: "resistance-bands", label: "Resistance Bands" },
        { value: "yoga-mats", label: "Yoga Mats" },
        { value: "exercise-balls", label: "Exercise Balls" },
        { value: "jump-ropes", label: "Jump Ropes" },
        { value: "foam-rollers", label: "Foam Rollers" },
        { value: "barbells", label: "Barbells" },
        { value: "pull-up-bars", label: "Pull-Up Bars" },
        { value: "gym-gloves", label: "Gym Gloves" },
        { value: "gym-belts", label: "Gym Belts" },
      ],
    },
    {
      category: "outdoor-fitness",
      label: "Outdoor Equipment",
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
        { value: "hydration-packs", label: "Hydration Packs" },
        { value: "outdoor-hats", label: "Outdoor Hats" },
      ],
    },
    {
      category: "yoga",
      label: "Yoga & Meditation",
      subcategories: [
        { value: "yoga-mats", label: "Yoga Mats" },
        { value: "meditation-pillows", label: "Meditation Pillows" },
        { value: "yoga-blocks", label: "Yoga Blocks" },
        { value: "yoga-straps", label: "Yoga Straps" },
        { value: "incense", label: "Incense" },
        { value: "zafu-cushions", label: "Zafu Cushions" },
        { value: "essential-oils", label: "Essential Oils" },
        { value: "yoga-bolsters", label: "Yoga Bolsters" },
        { value: "yoga-wheels", label: "Yoga Wheels" },
      ],
    },
    {
      category: "cricket",
      label: "Cricket Essentials",
      subcategories: [
        { value: "cricket-bats", label: "Cricket Bats" },
        { value: "cricket-balls", label: "Cricket Balls" },
        { value: "cricket-pads", label: "Cricket Pads" },
        { value: "cricket-gloves", label: "Cricket Gloves" },
        { value: "cricket-helmets", label: "Cricket Helmets" },
        { value: "cricket-bags", label: "Cricket Bags" },
        { value: "cricket-stumps", label: "Cricket Stumps" },
        { value: "cricket-shoes", label: "Cricket Shoes" },
        { value: "cricket-jerseys", label: "Cricket Jerseys" },
      ],
    },
    {
      category: "squash",
      label: "Squash",
      subcategories: [
        { value: "squash-rackets", label: "Squash Rackets" },
        { value: "squash-balls", label: "Squash Balls" },
        { value: "squash-shoes", label: "Squash Shoes" },
        { value: "squash-gloves", label: "Squash Gloves" },
        { value: "squash-bags", label: "Squash Bags" },
        { value: "squash-goggles", label: "Squash Goggles" },
        { value: "squash-grips", label: "Squash Grips" },
      ],
    },
    {
      category: "golf",
      label: "Golf Equipment",
      subcategories: [
        { value: "golf-clubs", label: "Golf Clubs" },
        { value: "golf-balls", label: "Golf Balls" },
        { value: "golf-tees", label: "Golf Tees" },
        { value: "golf-bags", label: "Golf Bags" },
        { value: "golf-gloves", label: "Golf Gloves" },
        { value: "golf-shoes", label: "Golf Shoes" },
        { value: "golf-hats", label: "Golf Hats" },
        { value: "golf-towels", label: "Golf Towels" },
      ],
    },
    {
      category: "gymnastics",
      label: "Gymnastics Equipment",
      subcategories: [
        { value: "gymnastics-mats", label: "Gymnastics Mats" },
        { value: "gymnastics-bars", label: "Gymnastics Bars" },
        { value: "gymnastics-rings", label: "Gymnastics Rings" },
        { value: "gymnastics-balance-beams", label: "Gymnastics Balance Beams" },
        { value: "gymnastics-leotards", label: "Gymnastics Leotards" },
        { value: "gymnastics-grips", label: "Gymnastics Grips" },
      ],
    },
    {
      category: "team-sports",
      label: "Soccer/Football/Basketball Equipment",
      subcategories: [
        { value: "soccer-balls", label: "Soccer Balls" },
        { value: "soccer-boots", label: "Soccer Boots" },
        { value: "soccer-pads", label: "Soccer Pads" },
        { value: "basketball-hoops", label: "Basketball Hoops" },
        { value: "basketball-balls", label: "Basketball Balls" },
        { value: "basketball-shoes", label: "Basketball Shoes" },
        { value: "football-helmets", label: "Football Helmets" },
        { value: "football-jerseys", label: "Football Jerseys" },
      ],
    },
    {
      category: "racquet-sports",
      label: "Tennis & Badminton Equipment",
      subcategories: [
        { value: "tennis-rackets", label: "Tennis Rackets" },
        { value: "tennis-balls", label: "Tennis Balls" },
        { value: "badminton-rackets", label: "Badminton Rackets" },
        { value: "badminton-balls", label: "Badminton Balls" },
        { value: "racquet-bags", label: "Racquet Bags" },
        { value: "tennis-grips", label: "Tennis Grips" },
        { value: "badminton-shoes", label: "Badminton Shoes" },
      ],
    },
    {
      category: "swimming",
      label: "Swimming & Water Sports",
      subcategories: [
        { value: "swimming-goggles", label: "Swimming Goggles" },
        { value: "swimming-caps", label: "Swimming Caps" },
        { value: "swimming-paddles", label: "Swimming Paddles" },
        { value: "swimming-fins", label: "Swimming Fins" },
        { value: "water-polo", label: "Water Polo" },
        { value: "swimming-boards", label: "Swimming Boards" },
        { value: "swimming-suits", label: "Swimming Suits" },
      ],
    },
    {
      category: "cycling",
      label: "Cycling Equipment",
      subcategories: [
        { value: "cycling-bikes", label: "Cycling Bikes" },
        { value: "cycling-helmets", label: "Cycling Helmets" },
        { value: "cycling-gloves", label: "Cycling Gloves" },
        { value: "cycling-bags", label: "Cycling Bags" },
        { value: "cycling-lights", label: "Cycling Lights" },
        { value: "cycling-shoes", label: "Cycling Shoes" },
        { value: "cycling-jerseys", label: "Cycling Jerseys" },
      ],
    },
    {
      category: "combat-sports",
      label: "Combat Sports Equipment",
      subcategories: [
        { value: "boxing-gloves", label: "Boxing Gloves" },
        { value: "boxing-bags", label: "Boxing Bags" },
        { value: "mma-gloves", label: "MMA Gloves" },
        { value: "head-guards", label: "Head Guards" },
        { value: "shin-guards", label: "Shin Guards" },
        { value: "mouth-guards", label: "Mouth Guards" },
        { value: "hand-wraps", label: "Hand Wraps" },
      ],
    },
    {
      category: "winter-sports",
      label: "Winter Sports Equipment",
      subcategories: [
        { value: "snowboards", label: "Snowboards" },
        { value: "ski-gear", label: "Ski Gear" },
        { value: "ski-poles", label: "Ski Poles" },
        { value: "snow-suits", label: "Snow Suits" },
        { value: "sledges", label: "Sledges" },
        { value: "ski-boots", label: "Ski Boots" },
        { value: "snow-goggles", label: "Snow Goggles" },
      ],
    },
    {
      category: "kabaddi",
      label: "Kabaddi Equipment",
      subcategories: [
        { value: "kabaddi-balls", label: "Kabaddi Balls" },
        { value: "kabaddi-shoes", label: "Kabaddi Shoes" },
        { value: "kabaddi-pads", label: "Kabaddi Pads" },
        { value: "kabaddi-jerseys", label: "Kabaddi Jerseys" },
        { value: "kabaddi-gloves", label: "Kabaddi Gloves" },
      ],
    },
    {
      category: "kids-sports",
      label: "Kids Sports & Equipment",
      subcategories: [
        { value: "kids-balls", label: "Kids Balls" },
        { value: "kids-shoes", label: "Kids Shoes" },
        { value: "kids-pads", label: "Kids Pads" },
        { value: "kids-helmets", label: "Kids Helmets" },
        { value: "kids-gloves", label: "Kids Gloves" },
      ],
    },
    {
      category: "fitness-trackers",
      label: "Fitness Trackers",
      subcategories: [
        { value: "fitness-watches", label: "Fitness Watches" },
        { value: "fitness-bands", label: "Fitness Bands" },
        { value: "heart-rate-monitors", label: "Heart Rate Monitors" },
        { value: "gps-trackers", label: "GPS Trackers" },
      ],
    },
    {
      category: "athletic-care",
      label: "Athletic Care & Recovery",
      subcategories: [
        { value: "ice-packs", label: "Ice Packs" },
        { value: "muscle-cream", label: "Muscle Cream" },
        { value: "tape", label: "Tape" },
        { value: "compression-sleeves", label: "Compression Sleeves" },
        { value: "massage-rollers", label: "Massage Rollers" },
      ],
    },
    {
      category: "sports-nutrition",
      label: "Sports Nutrition",
      subcategories: [
        { value: "protein-powder", label: "Protein Powder" },
        { value: "energy-bars", label: "Energy Bars" },
        { value: "electrolyte-drinks", label: "Electrolyte Drinks" },
        { value: "pre-workout", label: "Pre-Workout" },
        { value: "post-workout", label: "Post-Workout" },
      ],
    },
    {
      category: "dry-fruits",
      label: "Dry Fruits",
      subcategories: [
        { value: "almonds", label: "Almonds" },
        { value: "cashews", label: "Cashews" },
        { value: "pistachios", label: "Pistachios" },
        { value: "walnuts", label: "Walnuts" },
        { value: "raisins", label: "Raisins" },
      ],
    },
    {
      category: "cooking-essentials",
      label: "Cooking Essentials",
      subcategories: [
        { value: "spices", label: "Spices" },
        { value: "oils", label: "Oils" },
        { value: "sauces", label: "Sauces" },
        { value: "herbs", label: "Herbs" },
        { value: "seasonings", label: "Seasonings" },
      ],
    },
    {
      category: "training-equipment",
      label: "Training Equipment",
      subcategories: [
        { value: "training-dummies", label: "Training Dummies" },
        { value: "sleds", label: "Sleds" },
        { value: "agility-ladders", label: "Agility Ladders" },
        { value: "training-cones", label: "Training Cones" },
        { value: "speed-chutes", label: "Speed Chutes" },
      ],
    },
    {
      category: "sports-accessories",
      label: "Sports Accessories",
      subcategories: [
        { value: "sports-bags", label: "Sports Bags" },
        { value: "sports-water-bottles", label: "Sports Water Bottles" },
        { value: "sports-wear", label: "Sports Wear" },
        { value: "sports-towels", label: "Sports Towels" },
        { value: "sports-caps", label: "Sports Caps" },
      ],
    },
  ];
