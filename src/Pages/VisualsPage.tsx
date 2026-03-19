import CategoryTemplate from '../components/CategoryTemplate';
import { products } from '../data/products';

const VisualsPage = () => {
  const items = products.filter(p => p.category === 'Visuals');
  return <CategoryTemplate title="Visuals" products={items} />;
};

export default VisualsPage;