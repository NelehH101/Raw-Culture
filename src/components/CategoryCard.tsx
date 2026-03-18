import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  onClick: () => void;
}

const CategoryCard = ({ title, onClick }: CategoryCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full h-full bg-orange-500 rounded-[40px] p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-orange-600 active:scale-[0.98] flex flex-col justify-between"
    >
      {/* Decorative Technical Line (Inner border) */}
      <div className="absolute inset-6 border border-white/20 rounded-[30px] pointer-events-none" />
      
      <div className="relative flex justify-end z-10">
        <ArrowUpRight 
          className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" 
          size={40} 
          strokeWidth={3} 
        />
      </div>
      
      <div className="relative z-10">
        <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em] mb-3 block">
          Access Protocol
        </span>
        <h2 className="text-white text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
          {title}
        </h2>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-all duration-700" />
    </div>
  );
};

export default CategoryCard;