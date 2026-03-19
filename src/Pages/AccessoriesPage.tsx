import CategoryTemplate from '../components/CategoryTemplate';
import { products } from '../data/products';

const AccessoriesPage = () => {
  const items = products.filter(p => p.category === 'Accessories');
  return <CategoryTemplate title="Accessories" products={items} />;
};

export default AccessoriesPage;