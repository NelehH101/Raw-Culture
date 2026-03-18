import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the shape of a Product based on your existing data
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: string;
}

// Define the shape of an item inside the cart
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void; // Added for post-checkout cleanup
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cart from localStorage so items persist on refresh
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('raw_archive_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('raw_archive_cart', JSON.stringify(cart));
  }, [cart]);

  // DERIVED STATE: Calculate Total Items (e.g., 2 hoodies + 1 tee = 3)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // DERIVED STATE: Calculate Total Price
  // Strips "R" or "$" and spaces to perform math on the raw number
  const totalPrice = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + (priceNum * item.quantity);
  }, 0);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    // Optional: Auto-open cart when item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      
      if (existingItem && existingItem.quantity > 1) {
        // Decrement by 1 if multiple exist
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      // Remove entirely if only 1 remains
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('raw_archive_cart');
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart,
        isCartOpen, 
        setIsCartOpen, 
        totalItems, 
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access to the cart logic
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};