import CategoryTemplate from '../components/CategoryTemplate';
import { products } from '../data/products';

const DecksPage = () => {
  // Specifically filters for Decks
  const deckItems = products.filter(p => p.category === 'Decks');
  return <CategoryTemplate title="Decks" products={deckItems} />;
};

export default DecksPage;