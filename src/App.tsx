import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import Lookbook from "./Pages/Lookbook";
import About from "./Pages/About";
import TrackOrders from "./Pages/TrackOrders";
import Checkout from "./Pages/Checkout";
import Success from "./Pages/Success";
import Terms from './Pages/Terms';
import Privacy from './Pages/Privacy';
import Cookies from './Pages/Cookies';

// Context & Components
import { AudioProvider } from "./context/AudioContext";
import { CartProvider } from "./context/CartContext";
import GlobalPlayer from "./components/GlobalPlayer";
import CustomCursor from "./components/CustomCursor";
import CartDrawer from "./components/CartDrawer";
import FloatingCart from "./components/FloatingCart";
import AllProducts from "./Pages/AllProducts";
import AccessoriesPage from "./Pages/AccessoriesPage";
import DecksPage from "./Pages/DecksPage";
import OuterwearPage from "./Pages/OuterwearPage";
import VisualsPage from "./Pages/VisualsPage";

// 1. Create a sub-component to handle location-based rendering
const LayoutManager = () => {
  const location = useLocation();

  // Hide cart on Home ('/'), Checkout, and Success pages for a cleaner look
  const hideCartOn = ["/", "/checkout", "/success"];
  const shouldShowCart = !hideCartOn.includes(location.pathname);

  return (
    <>
      <CustomCursor />
      <CartDrawer />
      {/* 2. Conditional Rendering Logic */}
      {shouldShowCart && <FloatingCart />}
      <GlobalPlayer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<AllProducts />} />
        <Route path="/shop/decks" element={<DecksPage />} />
        <Route path="/shop/outerwear" element={<OuterwearPage />} />
        <Route path="/shop/accessories" element={<AccessoriesPage />} />
        <Route path="/shop/visuals" element={<VisualsPage />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/trackorders" element={<TrackOrders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AudioProvider>
      <CartProvider>
        <BrowserRouter>
          <LayoutManager />
        </BrowserRouter>
      </CartProvider>
    </AudioProvider>
  );
}

export default App;