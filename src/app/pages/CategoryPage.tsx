import { ProductGrid } from '../components/ProductGrid';
import { RecommendedSection } from '../components/RecommendedSection';
import { getProductsByCategory } from '../data/products';

interface CategoryPageProps {
  category: 'men' | 'women' | 'kids' | 'accessories' | 'sale' | 'trending';
}

export function CategoryPage({ category }: CategoryPageProps) {
  const products = getProductsByCategory(category);
  const categoryTitle = category === 'sale' ? 'On Sale' : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">{categoryTitle}{category !== 'sale' && category !== 'trending' ? "'s Collection" : ""}</h1>
      </div>
      <ProductGrid products={products} />
      <RecommendedSection />
    </div>
  );
}
