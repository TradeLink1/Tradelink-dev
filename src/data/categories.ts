// src/data/categories.ts

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Seller {
  id: string;
  name: string;
  image: string;
  location: string;
  reviews: number;
  products: Product[];
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
      {
        id: "mama-t",
        name: "Mama T’s Provisions",
        location: "Lagos",
        reviews: 120,
        image: "https://images.unsplash.com/photo-1604908177225-6e755118cd63",
        products: [
          {
            id: "rice-1",
            name: "Local Rice",
            image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
            price: 15000,
            quantity: 50,
          },
          {
            id: "beans-1",
            name: "Brown Beans",
            image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
            price: 12000,
            quantity: 80,
          },
        ],
      },
      {
        id: "freshmart",
        name: "FreshMart Groceries",
        location: "Abuja",
        reviews: 95,
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
        products: [
          {
            id: "noodles-1",
            name: "Instant Noodles",
            image: "https://images.unsplash.com/photo-1615485737338-613d25a17b8b",
            price: 500,
            quantity: 200,
          },
          {
            id: "milk-1",
            name: "Powdered Milk",
            image: "https://images.unsplash.com/photo-1604908177225-6e755118cd63",
            price: 2500,
            quantity: 40,
          },
        ],
      },
    ],
  },
  {
    id: "fashion-clothing",
    title: "Fashion & Clothing",
    image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455",
    sellers: [
      {
        id: "stylehub",
        name: "StyleHub Boutique",
        location: "Ibadan",
        reviews: 60,
        image: "https://images.unsplash.com/photo-1520975922071-a4d1fbc1a5e4",
        products: [
          {
            id: "dress-1",
            name: "Evening Dress",
            image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae2437d",
            price: 12000,
            quantity: 15,
          },
          {
            id: "shirt-1",
            name: "Men’s Shirt",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
            price: 8000,
            quantity: 30,
          },
        ],
      },
      {
        id: "naija-trendy",
        name: "Naija Trendy Wears",
        location: "Port Harcourt",
        reviews: 85,
        image: "https://images.unsplash.com/photo-1602810318383-e75b34d1d593",
        products: [
          {
            id: "ankara-1",
            name: "Ankara Fabric",
            image: "https://images.unsplash.com/photo-1602810318383-e75b34d1d593",
            price: 5000,
            quantity: 100,
          },
          {
            id: "lace-1",
            name: "Lace Fabric",
            image: "https://images.unsplash.com/photo-1520975922071-a4d1fbc1a5e4",
            price: 10000,
            quantity: 40,
          },
        ],
      },
    ],
  },
  {
    id: "electronics-gadgets",
    title: "Electronics & Gadgets",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    sellers: [
      {
        id: "techie-hub",
        name: "Techie Hub",
        location: "Kano",
        reviews: 150,
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
        products: [
          {
            id: "phone-1",
            name: "Android Phone",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            price: 95000,
            quantity: 25,
          },
          {
            id: "charger-1",
            name: "Phone Charger",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            price: 3500,
            quantity: 70,
          },
        ],
      },
      {
        id: "brightvision",
        name: "BrightVision Electronics",
        location: "Enugu",
        reviews: 110,
        image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5",
        products: [
          {
            id: "tv-1",
            name: "Flat Screen TV",
            image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5",
            price: 180000,
            quantity: 10,
          },
          {
            id: "lamp-1",
            name: "Rechargeable Lamp",
            image: "https://images.unsplash.com/photo-1612210399745-1f78860caa65",
            price: 8000,
            quantity: 50,
          },
        ],
      },
    ],
  },
];
