import { useSearchParams } from 'react-router';
import { ProductGrid } from '../components/ProductGrid';
import { searchProducts } from '../data/products';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchProducts(query);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mb-6">
          {results.length} {results.length === 1 ? 'product' : 'products'} found
        </p>
        
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your search.
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search terms or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
