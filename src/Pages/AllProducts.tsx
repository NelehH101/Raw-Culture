import CategoryTemplate from '../components/CategoryTemplate';
import { products } from '../data/products';

const AllProductsPage = () => (
  <CategoryTemplate title="All Products" products={products} />
);

export default AllProductsPage;