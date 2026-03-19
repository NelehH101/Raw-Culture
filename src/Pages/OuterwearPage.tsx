import CategoryTemplate from '../components/CategoryTemplate';
import { products } from '../data/products';

const OuterwearPage = () => {
  const outerwearItems = products.filter(p => p.category === 'Outerwear');
  return <CategoryTemplate title="Outerwear" products={outerwearItems} />;
};

export default OuterwearPage;