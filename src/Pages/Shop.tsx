import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, ChevronRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import ShopHeader from '../components/ShopHeader';
import ProductCard from '../components/ProductCard';
import CurvedLoop from '../components/Loop';
import { products } from '../data/products';
import FooterSlider from '../components/FooterSlider';
import Footer from '../components/Footer';

const ShopPage = () => {
  // 1. STATE FOR SIDEBAR
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // 2. GRID LOGIC: Split products to insert orange block after index 4
  const topProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  // 3. SCROLL LOCK: Prevents background scrolling when menu is open
  useEffect(() => {
    if (isCategoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCategoryOpen]);

  return (
    <div className="bg-black min-h-screen no-scrollbar overflow-x-hidden">
      <NavBar />

      {/* --- CATEGORY SIDEBAR OVERLAY --- */}
      <div className={`fixed inset-0 z-[500] transition-all duration-700 ${isCategoryOpen ? 'visible' : 'invisible pointer-events-none'}`}>
        {/* Dark Blur Backdrop */}
        <div
          className={`absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity duration-700 ${isCategoryOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsCategoryOpen(false)}
        />

        {/* Sliding Panel */}
        <div className={`absolute right-0 top-0 h-full w-full md:w-[550px] bg-zinc-950 border-l border-white/5 p-12 shadow-2xl transform transition-transform duration-700 ease-out ${isCategoryOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-20">
            <span className="text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase">Navigation_Matrix</span>
            <button onClick={() => setIsCategoryOpen(false)} className="text-white/20 hover:text-orange-500 transition-colors">
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          <h2 className="text-white text-6xl font-black italic uppercase tracking-tighter mb-12 leading-none">
            Browse <br /> <span className="text-orange-500">Archive</span>
          </h2>

          {/* 1. Add overflow-y-auto and flex-1 to make this area fill space and scroll */}
          <div className="flex-1 overflow-y-auto no-scrollbar pr-4 -mr-4">
            <nav className="flex flex-col gap-0 pb-20">
              {['All Products', 'New Arrivals', 'Outerwear', 'Decks', 'Accessories', 'Visuals'].map((cat) => (
                <Link
                  key={cat}

                  to={`/shop/${cat.toLowerCase().replace(/\s+/g, '-')}`}

                  onClick={() => setIsCategoryOpen(false)}
                  className="group flex items-center justify-between w-full py-6 border-b border-white/5 text-left transition-all"
                >
                  <span className="text-2xl font-bold uppercase tracking-[0.2em] text-zinc-600 group-hover:text-white group-hover:italic transition-all duration-300">
                    {cat}
                  </span>

                  {/* 2. Arrow icon moves slightly on hover */}
                  <ChevronRight
                    className="text-zinc-800 group-hover:text-orange-500 transition-all transform group-hover:translate-x-2"
                    size={20}
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-12 left-12">
            <p className="text-[9px] text-zinc-800 font-black uppercase tracking-[0.5em]">RAW_CULTURE // PROTOCOL_2026</p>
          </div>
        </div>
      </div>

      <div className="pt-24">
        <ShopHeader />
      </div>

      {/* Marquee Section */}
      <div className="relative z-10 bg-black py-6">
        <CurvedLoop
          marqueeText="✦ FIND THE ✦ COLLECTION ✦ GET IT RAW ✦ "
          speed={1.5}
          curveAmount={0}
          className="italic font-black text-orange-500 uppercase tracking-[0.3em]"
        />
      </div>

      <main className="max-w-[1800px] mx-auto px-6 md:px-20 py-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-20 gap-4">
          <h2 className="text-white text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
            New <br /> Arrivals
          </h2>
          <span className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] md:pb-2">
            {products.length} Items Total
          </span>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 auto-rows-[500px]">

          {/* FEATURED VIDEO CARD */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5 group shadow-2xl">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000">
              <source src="/2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
            <div className="absolute bottom-12 left-8">
              <h3 className="text-white text-6xl font-black italic uppercase tracking-tight leading-[0.85]">
                The <br /> <span className="text-orange-500">Raw</span> <br /> Collection
              </h3>
            </div>
          </div>

          {/* FIRST 4 PRODUCTS */}
          {topProducts.map((item) => (
            <div key={item.id} className="md:col-span-1 md:row-span-1">
              <ProductCard {...item} />
            </div>
          ))}

          {/* --- THE CLICKABLE ORANGE BLOCK --- */}
          <div
            className="col-span-1 md:col-span-2 relative bg-orange-500 rounded-[40px] p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-orange-600 active:scale-[0.98] flex flex-col justify-between group shadow-[0_20px_50px_rgba(249,115,22,0.2)]"
            onClick={() => setIsCategoryOpen(true)}
          >

            <div className="relative flex justify-end z-10">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-md border border-white/10 group-hover:rotate-45 transition-transform duration-700">
                <ArrowUpRight className="text-white" size={32} strokeWidth={3} />
              </div>
            </div>

            <div className="relative z-10">
              <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-3 block italic">
                Access_Catalog // Ver. 2.0
              </span>
              <h2 className="text-white text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.75]">
                All <br /> Products
              </h2>
            </div>

            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
          </div>

          {/* REMAINING PRODUCTS */}
          {remainingProducts.map((item) => (
            <div key={item.id} className="md:col-span-1 md:row-span-1">
              <ProductCard {...item} />
            </div>
          ))}

        </div>
      </main>

      <FooterSlider />
      <Footer />
    </div>
  );
};

export default ShopPage;