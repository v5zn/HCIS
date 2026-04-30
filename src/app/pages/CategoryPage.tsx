import { Sparkles } from 'lucide-react';
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
        {category === 'trending' && (
          <div className="-mt-4 mb-8 flex items-center gap-3">
            <p className="text-sm font-medium text-gray-600">Our Most Purchased Products!</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI</span>
            </div>
          </div>
        )}
      </div>
      <ProductGrid products={products} />
      <RecommendedSection />
    </div>
  );
}
