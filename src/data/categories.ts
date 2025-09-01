// src/data/categories.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Seller {
  id: string;
  name: string;
  location: string;
  reviews: number;
  image: string;
  phone: string;   // ✅ phone number
  email: string;   // ✅ email
  products: Product[];
}

export interface Category {
  id: string;
  title: string;
  sellers: Seller[];
}

export const categories: Category[] = [
  {
    id: "fashion",
    title: "Fashion",
    sellers: [
      {
        id: "seller1",
        name: "Grace Collections",
        location: "Lagos",
        reviews: 120,
        image: "https://via.placeholder.com/150",
        phone: "+2348012345678",
        email: "gracecollections@gmail.com",
        products: [
          {
            id: "p1",
            name: "Ankara Gown",
            price: 15000,
            quantity: 10,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p2",
            name: "Corporate Blazer",
            price: 25000,
            quantity: 5,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
      {
        id: "seller2",
        name: "Elite Wears",
        location: "Abuja",
        reviews: 85,
        image: "https://via.placeholder.com/150",
        phone: "+2348098765432",
        email: "elitewears@yahoo.com",
        products: [
          {
            id: "p3",
            name: "Sneakers",
            price: 18000,
            quantity: 8,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p4",
            name: "Denim Jacket",
            price: 22000,
            quantity: 6,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
    ],
  },
  {
    id: "electronics",
    title: "Electronics",
    sellers: [
      {
        id: "seller3",
        name: "Tech Hub",
        location: "Port Harcourt",
        reviews: 200,
        image: "https://via.placeholder.com/150",
        phone: "+2348076543210",
        email: "techhub@outlook.com",
        products: [
          {
            id: "p5",
            name: "Smartphone",
            price: 120000,
            quantity: 15,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p6",
            name: "Laptop",
            price: 350000,
            quantity: 7,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
      {
        id: "seller4",
        name: "Gadget World",
        location: "Abuja",
        reviews: 160,
        image: "https://via.placeholder.com/150",
        phone: "+2348088889999",
        email: "gadgetworld@gmail.com",
        products: [
          {
            id: "p7",
            name: "Bluetooth Speaker",
            price: 25000,
            quantity: 20,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p8",
            name: "Smartwatch",
            price: 45000,
            quantity: 12,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
    ],
  },
  {
    id: "food",
    title: "Food & Groceries",
    sellers: [
      {
        id: "seller5",
        name: "Fresh Market",
        location: "Ibadan",
        reviews: 95,
        image: "https://via.placeholder.com/150",
        phone: "+2348055551212",
        email: "freshmarket@yahoo.com",
        products: [
          {
            id: "p9",
            name: "Tomatoes (Basket)",
            price: 8000,
            quantity: 30,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p10",
            name: "Yam Tubers (5pcs)",
            price: 6000,
            quantity: 20,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
      {
        id: "seller6",
        name: "Green Farms",
        location: "Enugu",
        reviews: 110,
        image: "https://via.placeholder.com/150",
        phone: "+2348033334444",
        email: "greenfarms@gmail.com",
        products: [
          {
            id: "p11",
            name: "Rice (50kg)",
            price: 32000,
            quantity: 15,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p12",
            name: "Beans (50kg)",
            price: 28000,
            quantity: 18,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
    ],
  },
  {
    id: "beauty",
    title: "Beauty & Cosmetics",
    sellers: [
      {
        id: "seller7",
        name: "Glow Haven",
        location: "Kano",
        reviews: 130,
        image: "https://via.placeholder.com/150",
        phone: "+2348022223333",
        email: "glowhaven@gmail.com",
        products: [
          {
            id: "p13",
            name: "Body Lotion",
            price: 7000,
            quantity: 25,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p14",
            name: "Perfume",
            price: 15000,
            quantity: 12,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
      {
        id: "seller8",
        name: "Makeup Pro",
        location: "Lagos",
        reviews: 175,
        image: "https://via.placeholder.com/150",
        phone: "+2348044445555",
        email: "makeuppro@yahoo.com",
        products: [
          {
            id: "p15",
            name: "Eyeshadow Palette",
            price: 10000,
            quantity: 9,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p16",
            name: "Foundation",
            price: 12000,
            quantity: 11,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
    ],
  },
  {
    id: "furniture",
    title: "Furniture",
    sellers: [
      {
        id: "seller9",
        name: "Royal Furniture",
        location: "Benin City",
        reviews: 140,
        image: "https://via.placeholder.com/150",
        phone: "+2348090001111",
        email: "royalfurniture@gmail.com",
        products: [
          {
            id: "p17",
            name: "Sofa Set",
            price: 200000,
            quantity: 3,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p18",
            name: "Dining Table",
            price: 180000,
            quantity: 5,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
      {
        id: "seller10",
        name: "Comfort Home",
        location: "Jos",
        reviews: 100,
        image: "https://via.placeholder.com/150",
        phone: "+2348011112222",
        email: "comforthome@yahoo.com",
        products: [
          {
            id: "p19",
            name: "Bed Frame",
            price: 150000,
            quantity: 4,
            image: "https://via.placeholder.com/200",
          },
          {
            id: "p20",
            name: "Wardrobe",
            price: 130000,
            quantity: 2,
            image: "https://via.placeholder.com/200",
          },
        ],
      },
    ],
  },
];
