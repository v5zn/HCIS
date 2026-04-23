import { ProductGrid } from '../components/ProductGrid';
import { RecommendedSection } from '../components/RecommendedSection';
import { getProductsByCategory } from '../data/products';

export function HomePage() {
  const menProducts = getProductsByCategory('men');

  return (
    <>
      <ProductGrid products={menProducts} />
      <RecommendedSection />
    </>
  );
}
