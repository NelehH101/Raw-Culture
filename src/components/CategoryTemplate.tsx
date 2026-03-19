import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import NavBar from './NavBar';
import Footer from './Footer';
import type { Product } from '../data/products';

interface CategoryTemplateProps {
  title: string;
  products: Product[];
}

const CategoryTemplate = ({ title, products }: CategoryTemplateProps) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <main className="max-w-[1800px] mx-auto px-6 md:px-20 pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="mb-20">
          <div className="flex gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-6 font-bold">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-orange-500 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-orange-500">{title}</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
            {title}
          </h1>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item) => (
              <div key={item.id} className="h-[550px]">
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[40vh] flex flex-col items-center justify-center border border-white/5 rounded-[40px] bg-zinc-950/30">
            <p className="text-zinc-800 uppercase tracking-[0.5em] font-black italic">
              Archive_Empty // Pending_Upload
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryTemplate;