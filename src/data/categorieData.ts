// src/data/categoriesData.ts
export interface Seller {
  id: string;
  name: string;
  products: string[];
  image: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  sellers: Seller[];
}

export const categories: Category[] = [
  {
    id: "grocery-essentials",
    title: "Grocery & Essentials",
    image: "https://images.unsplash.com/photo-1606788075761-62010d90d2d4",
    sellers: [
      { id: "mama-t", name: "Mama T’s Provisions", products: ["Rice", "Beans", "Garri", "Palm oil", "Spices"], image: "https://images.unsplash.com/photo-1604908177225-6e755118cd63" },
      { id: "freshmart", name: "FreshMart Groceries", products: ["Packaged food", "Snacks", "Beverages", "Toiletries"], image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38" },
      { id: "olu-market", name: "Olu’s Local Market", products: ["Locally sourced fruits", "Vegetables", "Yams"], image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc" },
      { id: "supervalue", name: "SuperValue Foods", products: ["Noodles", "Milk", "Cooking oil"], image: "https://images.unsplash.com/photo-1615485737338-613d25a17b8b" }
    ]
  },
  {
    id: "local-perishables",
    title: "Local Perishable Items",
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
    sellers: [
      { id: "mama-chi", name: "Mama Chi Veggies", products: ["Tomatoes", "Peppers", "Onions", "Okra"], image: "https://images.unsplash.com/photo-1603048297172-c92544798eb1" },
      { id: "green-basket", name: "Green Basket", products: ["Leafy vegetables", "Herbs"], image: "https://images.unsplash.com/photo-1524594081293-190a2fe0baae" },
      { id: "marketfresh-yams", name: "MarketFresh Yams", products: ["Yams", "Plantains", "Sweet potatoes"], image: "https://images.unsplash.com/photo-1592924357228-91d7f4a3bcb0" },
      { id: "fruity-delight", name: "Fruity Delight", products: ["Mangoes", "Oranges", "Pineapples", "Bananas"], image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12c" }
    ]
  },
  {
    id: "fashion-clothing",
    title: "Fashion & Clothing",
    image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455",
    sellers: [
      { id: "stylehub", name: "StyleHub Boutique", products: ["Men’s clothing", "Women’s clothing"], image: "https://images.unsplash.com/photo-1520975922071-a4d1fbc1a5e4" },
      { id: "naija-trendy", name: "Naija Trendy Wears", products: ["Ankara", "Lace", "Native fabrics"], image: "https://images.unsplash.com/photo-1602810318383-e75b34d1d593" },
      { id: "urban-fit", name: "Urban Fit Store", products: ["Sneakers", "Handbags", "Casual wear"], image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2" },
      { id: "glam-closet", name: "Glam Closet", products: ["Evening gowns", "Accessories", "Designer shoes"], image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae2437d" }
    ]
  },
  {
    id: "home-kitchen",
    title: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1616627565351-55d3ef28c7da",
    sellers: [
      { id: "elite-kitchenware", name: "Elite Kitchenware", products: ["Non-stick pans", "Blenders", "Kitchen appliances"], image: "https://images.unsplash.com/photo-1616627565335-9d859ea1f6c0" },
      { id: "comfort-living", name: "Comfort Living Stores", products: ["Bedsheets", "Curtains", "Home decor"], image: "https://images.unsplash.com/photo-1567016432779-094069958ea5" },
      { id: "cookease", name: "CookEase Mart", products: ["Cookware sets", "Cutlery", "Storage containers"], image: "https://images.unsplash.com/photo-1528731708534-816fe59f90cb" },
      { id: "rose-kitchen", name: "Rose Kitchen Equipment", products: ["Pots", "Gas cookers", "Toasting machines", "Blenders"], image: "https://images.unsplash.com/photo-1603985529862-5b9b31b7b4e4" }
    ]
  },
  {
    id: "building-hardware",
    title: "Building & Hardware",
    image: "https://images.unsplash.com/photo-1581093588401-22f636cd118f",
    sellers: [
      { id: "strongbuild", name: "StrongBuild Supplies", products: ["Cement", "Nails", "Wood", "Plumbing tools"], image: "https://images.unsplash.com/photo-1581091012184-5cdaa0a44f39" },
      { id: "fixright", name: "FixRight Tools", products: ["Hand tools", "Electrical cables", "Paint supplies"], image: "https://images.unsplash.com/photo-1604014237800-1b9c81e94fd2" },
      { id: "megahardware", name: "MegaHardware Hub", products: ["Roofing sheets", "Iron rods", "Ladders"], image: "https://images.unsplash.com/photo-1604377130690-79ebbf347f01" },
      { id: "proconstruct", name: "ProConstruct Depot", products: ["Tiles", "Doors", "Sanitary fittings"], image: "https://images.unsplash.com/photo-1600991651972-7c4b2a35d3d2" }
    ]
  },
  {
    id: "electronics-gadgets",
    title: "Electronics & Gadgets",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    sellers: [
      { id: "techie-hub", name: "Techie Hub", products: ["Mobile phones", "Chargers", "Earphones"], image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5" },
      { id: "brightvision", name: "BrightVision Electronics", products: ["TVs", "Fans", "Rechargeable lamps"], image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5" },
      { id: "gadgetmax", name: "GadgetMax", products: ["Laptops", "Power banks", "Printers"], image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
      { id: "smartworld", name: "SmartWorld Stores", products: ["Smartwatches", "Bluetooth speakers", "Cameras"], image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" }
    ]
  },
  {
    id: "auto-parts",
    title: "Auto Parts",
    image: "https://images.unsplash.com/photo-1604147706283-53be3c6c02b8",
    sellers: [
      { id: "autofix", name: "AutoFix Spares", products: ["Tyres", "Brake pads", "Car batteries"], image: "https://images.unsplash.com/photo-1598285222945-32b1abec6a38" },
      { id: "motormate", name: "MotorMate Nigeria", products: ["Motorbike spare parts", "Lubricants"], image: "https://images.unsplash.com/photo-1612210399745-1f78860caa65" },
      { id: "drivepro", name: "DrivePro Parts", products: ["Car accessories", "Replacement parts"], image: "https://images.unsplash.com/photo-1600851233759-586b9b2ccba0" },
      { id: "speedy-motors", name: "Speedy Motors Hub", products: ["Engine oil", "Filters", "Spark plugs"], image: "https://images.unsplash.com/photo-1589935447067-55355d4aa1c1" }
    ]
  }
];
