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
    "gymTowels": "none",
    "mats": "none",
    "weights": "none",
    "ropes": "none",
    "rollers": "none",
    "bags": "none",
    "reflectiveVests": "clothing",
    "resistantJackets": "clothing",
    "yogaPants": "clothing",
    "yogaTops": "clothing",
    "yogaShorts": "clothing",
    "yogaBra": "clothing",
    "yogaMats": "none",
    "cricketClothing": "clothing",
    "cricketShoes": "shoes",
    "bats": "none",
    "balls": "none",
    "battingPads": "clothing",
    "battingGloves": "clothing",
    "protectiveHelmet": "clothing",
    "tennisTops": "clothing",
    "tennisShorts": "clothing",
    "courtShoes": "shoes",
    "swimsuits": "clothing",
    "swimShorts": "clothing",
    "goggles": "none",
    "headCaps": "clothing",
    "cyclingJerseys": "clothing",
    "cyclingShorts": "clothing",
    "cyclingShoes": "shoes",
    "cyclingHelmet": "clothing",
    "sportUniform": "clothing",
    "winterBoots": "shoes",
    "jackets": "clothing",
    "pants": "clothing",
    "thermalWear": "clothing",
    "kidsClothing": "clothing",
    "kidsShoes": "shoes",
    "sportsSocks": "clothing",
    "sportsCaps": "clothing"
};


  export const sizeOptionsMap: { [key: string]: string[] } = {
    clothing: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    shoes: ["UK6_EU39", "UK7_EU40", "UK8_EU41", "UK9_EU42", "UK10_EU43", "UK11_EU44", "UK12_EU45"],
  };

export const categories = [
    {
      category: "firstAid",
      label: "First Aid",
      subcategories: [
        { value: "firstAidKits", label: "First Aid Kits" },
        { value: "bandages", label: "Bandages" },
        { value: "gauze", label: "Gauze" },
        { value: "tapes", label: "Tapes" },
        { value: "massagers", label: "Massagers" },
        { value: "disinfectants", label: "Disinfectants" },
        { value: "antiseptics", label: "Antiseptics" },
        { value: "painRelief", label: "Pain Relief" },
        { value: "burnCare", label: "Burn Care" },
        { value: "eyeCare", label: "Eye Care" },
        { value: "splints", label: "Splints" },
        { value: "coldPacks", label: "Cold Packs" },
        { value: "hotPacks", label: "Hot Packs" },
        { value: "firstAidBags", label: "First Aid Bags" },
        { value: "medicalTape", label: "Medical Tape" },
        { value: "woundCleaner", label: "Wound Cleaner" },
      ],
    },
    {
      category: "gymEssentials",
      label: "Gym Essentials",
      subcategories: [
        { value: "dumbbells", label: "Dumbbells" },
        { value: "kettlebells", label: "Kettlebells" },
        { value: "resistanceBands", label: "Resistance Bands" },
        { value: "yogaMats", label: "Yoga Mats" },
        { value: "exerciseBalls", label: "Exercise Balls" },
        { value: "jumpRopes", label: "Jump Ropes" },
        { value: "foamRollers", label: "Foam Rollers" },
        { value: "barbells", label: "Barbells" },
        { value: "pullUpBars", label: "Pull-Up Bars" },
        { value: "gymGloves", label: "Gym Gloves" },
        { value: "gymBelts", label: "Gym Belts" },
      ],
    },
    {
      category: "outdoorFitness",
      label: "Outdoor Equipment",
      subcategories: [
        { value: "reflectiveVests", label: "Reflective Vests and Bands" },
        { value: "fannyPacks", label: "Fanny Packs" },
        { value: "runningBelts", label: "Running Belts" },
        { value: "sunglasses", label: "Sunglasses" },
        { value: "waterContainers", label: "Portable Water Containers" },
        { value: "supportBraces", label: "Knee & Elbow Support Braces" },
        { value: "coolingTowels", label: "Cooling Towels" },
        { value: "sandbags", label: "Fitness Sandbags" },
        { value: "resistantJackets", label: "Weather-Resistant Jackets" },
        { value: "hydrationPacks", label: "Hydration Packs" },
        { value: "outdoorHats", label: "Outdoor Hats" },
      ],
    },
    {
      category: "yogaAndMeditation",
      label: "Yoga & Meditation",
      subcategories: [
        { value: "yogaMats", label: "Yoga Mats" },
        { value: "meditationPillows", label: "Meditation Pillows" },
        { value: "yogaBlocks", label: "Yoga Blocks" },
        { value: "yogaStraps", label: "Yoga Straps" },
        { value: "incense", label: "Incense" },
        { value: "zafuCushions", label: "Zafu Cushions" },
        { value: "essentialOils", label: "Essential Oils" },
        { value: "yogaBolsters", label: "Yoga Bolsters" },
        { value: "yogaWheels", label: "Yoga Wheels" },
      ],
    },
    {
      category: "cricket",
      label: "Cricket",
      subcategories: [
        { value: "cricketBats", label: "Cricket Bats" },
        { value: "cricketBalls", label: "Cricket Balls" },
        { value: "cricketPads", label: "Cricket Pads" },
        { value: "cricketGloves", label: "Cricket Gloves" },
        { value: "cricketHelmets", label: "Cricket Helmets" },
        { value: "cricketBags", label: "Cricket Bags" },
        { value: "cricketStumps", label: "Cricket Stumps" },
        { value: "cricketShoes", label: "Cricket Shoes" },
        { value: "cricketJerseys", label: "Cricket Jerseys" },
      ],
    },
    {
      category: "Squash",
      label: "Squash",
      subcategories: [
        { value: "squashRackets", label: "Squash Rackets" },
        { value: "squashBalls", label: "Squash Balls" },
        { value: "squashShoes", label: "Squash Shoes" },
        { value: "squashGloves", label: "Squash Gloves" },
        { value: "squashBags", label: "Squash Bags" },
        { value: "squashGoggles", label: "Squash Goggles" },
        { value: "squashGrips", label: "Squash Grips" },
      ],
    },
    {
      category: "golfEquipment",
      label: "Golf Equipment",
      subcategories: [
        { value: "golfClubs", label: "Golf Clubs" },
        { value: "golfBalls", label: "Golf Balls" },
        { value: "golfTees", label: "Golf Tees" },
        { value: "golfBags", label: "Golf Bags" },
        { value: "golfGloves", label: "Golf Gloves" },
        { value: "golfShoes", label: "Golf Shoes" },
        { value: "golfHats", label: "Golf Hats" },
        { value: "golfTowels", label: "Golf Towels" },
      ],
    },
    {
      category: "gymnasticsEquipment",
      label: "Gymnastics Equipment",
      subcategories: [
        { value: "gymnasticsMats", label: "Gymnastics Mats" },
        { value: "gymnasticsBars", label: "Gymnastics Bars" },
        { value: "gymnasticsRings", label: "Gymnastics Rings" },
        { value: "gymnasticsBalanceBeams", label: "Gymnastics Balance Beams" },
        { value: "gymnasticsLeotards", label: "Gymnastics Leotards" },
        { value: "gymnasticsGrips", label: "Gymnastics Grips" },
      ],
    },
    {
      category: "teamSports",
      label: "Soccer/Football/Basketball Equipment",
      subcategories: [
        { value: "soccerBalls", label: "Soccer Balls" },
        { value: "soccerBoots", label: "Soccer Boots" },
        { value: "soccerPads", label: "Soccer Pads" },
        { value: "basketballHoops", label: "Basketball Hoops" },
        { value: "basketballBalls", label: "Basketball Balls" },
        { value: "basketballShoes", label: "Basketball Shoes" },
        { value: "footballHelmets", label: "Football Helmets" },
        { value: "footballJerseys", label: "Football Jerseys" },
      ],
    },
    {
      category: "racquetSports",
      label: "Tennis & Badminton Equipment",
      subcategories: [
        { value: "tennisRackets", label: "Tennis Rackets" },
        { value: "tennisBalls", label: "Tennis Balls" },
        { value: "badmintonRackets", label: "Badminton Rackets" },
        { value: "badmintonBalls", label: "Badminton Balls" },
        { value: "racquetBags", label: "Racquet Bags" },
        { value: "tennisGrips", label: "Tennis Grips" },
        { value: "badmintonShoes", label: "Badminton Shoes" },
      ],
    },
    {
      category: "swimming",
      label: "Swimming & Water Sports",
      subcategories: [
        { value: "swimmingGoggles", label: "Swimming Goggles" },
        { value: "swimmingCaps", label: "Swimming Caps" },
        { value: "swimmingPaddles", label: "Swimming Paddles" },
        { value: "swimmingFins", label: "Swimming Fins" },
        { value: "waterPolo", label: "Water Polo" },
        { value: "swimmingBoards", label: "Swimming Boards" },
        { value: "swimmingSuits", label: "Swimming Suits" },
      ],
    },
    {
      category: "cycling",
      label: "Cycling Equipment",
      subcategories: [
        { value: "cyclingBikes", label: "Cycling Bikes" },
        { value: "cyclingHelmets", label: "Cycling Helmets" },
        { value: "cyclingGloves", label: "Cycling Gloves" },
        { value: "cyclingBags", label: "Cycling Bags" },
        { value: "cyclingLights", label: "Cycling Lights" },
        { value: "cyclingShoes", label: "Cycling Shoes" },
        { value: "cyclingJerseys", label: "Cycling Jerseys" },
      ],
    },
    {
      category: "combatSports",
      label: "Combat Sports Equipment",
      subcategories: [
        { value: "boxingGloves", label: "Boxing Gloves" },
        { value: "boxingBags", label: "Boxing Bags" },
        { value: "mmaGloves", label: "MMA Gloves" },
        { value: "headGuards", label: "Head Guards" },
        { value: "shinGuards", label: "Shin Guards" },
        { value: "mouthGuards", label: "Mouth Guards" },
        { value: "handWraps", label: "Hand Wraps" },
      ],
    },
    {
      category: "winterSports",
      label: "Winter Sports Equipment",
      subcategories: [
        { value: "snowboards", label: "Snowboards" },
        { value: "skiGear", label: "Ski Gear" },
        { value: "skiPoles", label: "Ski Poles" },
        { value: "snowSuits", label: "Snow Suits" },
        { value: "sledges", label: "Sledges" },
        { value: "skiBoots", label: "Ski Boots" },
        { value: "snowGoggles", label: "Snow Goggles" },
      ],
    },
    {
      category: "kabaddi",
      label: "Kabaddi Equipment",
      subcategories: [
        { value: "kabaddiBalls", label: "Kabaddi Balls" },
        { value: "kabaddiShoes", label: "Kabaddi Shoes" },
        { value: "kabaddiPads", label: "Kabaddi Pads" },
        { value: "kabaddiJerseys", label: "Kabaddi Jerseys" },
        { value: "kabaddiGloves", label: "Kabaddi Gloves" },
      ],
    },
    {
      category: "kidsSports",
      label: "Kids Sports & Equipment",
      subcategories: [
        { value: "kidsBalls", label: "Kids Balls" },
        { value: "kidsShoes", label: "Kids Shoes" },
        { value: "kidsPads", label: "Kids Pads" },
        { value: "kidsHelmets", label: "Kids Helmets" },
        { value: "kidsGloves", label: "Kids Gloves" },
      ],
    },
    {
      category: "fitnessTrackers",
      label: "Fitness Trackers",
      subcategories: [
        { value: "fitnessWatches", label: "Fitness Watches" },
        { value: "fitnessBands", label: "Fitness Bands" },
        { value: "heartRateMonitors", label: "Heart Rate Monitors" },
        { value: "gpsTrackers", label: "GPS Trackers" },
      ],
    },
    {
      category: "athleticCare",
      label: "Athletic Care & Recovery",
      subcategories: [
        { value: "icePacks", label: "Ice Packs" },
        { value: "muscleCream", label: "Muscle Cream" },
        { value: "tape", label: "Tape" },
        { value: "compressionSleeves", label: "Compression Sleeves" },
        { value: "massageRollers", label: "Massage Rollers" },
      ],
    },
    {
      category: "sportsNutrition",
      label: "Sports Nutrition",
      subcategories: [
        { value: "proteinPowder", label: "Protein Powder" },
        { value: "energyBars", label: "Energy Bars" },
        { value: "electrolyteDrinks", label: "Electrolyte Drinks" },
        { value: "preWorkout", label: "Pre-Workout" },
        { value: "postWorkout", label: "Post-Workout" },
      ],
    },
    {
      category: "dryFruits",
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
      category: "cookingEssentials",
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
      category: "trainingEquipment",
      label: "Training Equipment",
      subcategories: [
        { value: "trainingDummies", label: "Training Dummies" },
        { value: "sleds", label: "Sleds" },
        { value: "agilityLadders", label: "Agility Ladders" },
        { value: "trainingCones", label: "Training Cones" },
        { value: "speedChutes", label: "Speed Chutes" },
      ],
    },
    {
      category: "sportsAccessories",
      label: "Sports Accessories",
      subcategories: [
        { value: "sportsBags", label: "Sports Bags" },
        { value: "sportsWaterBottles", label: "Sports Water Bottles" },
        { value: "sportsWear", label: "Sports Wear" },
        { value: "sportsTowels", label: "Sports Towels" },
        { value: "sportsCaps", label: "Sports Caps" },
      ],
    },
  ];
