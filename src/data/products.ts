// Define what a product looks like
export interface Product {
  id: number; // Changed from any to number for consistency
  name: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  { id: 1, name: "Raw Blue Hoodie", price: "R 1530.00", image: "/board-1.png" },
  { id: 2, name: "Shadow Script Tee", price: "R 810.00", image: "/board-2.png" },
  { id: 3, name: "Graffiti Deck", price: "R 2160.00", image: "/board-5.png" },
  { id: 4, name: "Crimson Streetwear", price: "R 1620.00", image: "/board-3.webp" },
  { id: 5, name: "Acid Yellow Tee", price: "R 720.00", image: "/board-5.png" },
  { id: 6, name: "Indigo Crewneck", price: "R 1350.00", image: "/board-6.png" },
  { id: 7, name: "Raw Black Hoodie", price: "R 1530.00", image: "/board-7.png" },
  { id: 8, name: "Shadow Script V2", price: "R 810.00", image: "/board-8.png" },
  { id: 9, name: "Graffiti Deck Pro", price: "R 2160.00", image: "/board-9.png" },
  { id: 10, name: "Crimson Cargo", price: "R 1620.00", image: "/board-10.png" },
  { id: 11, name: "Acid Green Tee", price: "R 720.00", image: "/board-5.png" },
  { id: 12, name: "Indigo Knit", price: "R 1350.00", image: "/board-6.png" },
  { id: 13, name: "Raw Archive Hoodie", price: "R 1530.00", image: "/board-7.png" },
  { id: 14, name: "Shadow Script Long", price: "R 810.00", image: "/board-8.png" },
  { id: 15, name: "Graffiti Deck LE", price: "R 2160.00", image: "/board-9.png" },
  { id: 16, name: "Crimson Bomber", price: "R 1620.00", image: "/board-10.png" },
  { id: 17, name: "Acid Wash Tee", price: "R 720.00", image: "/board-5.png" },
  { id: 18, name: "Indigo Fade", price: "R 1350.00", image: "/board-6.png" },
];