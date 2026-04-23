import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export function RecommendedSection() {
  const { cartItems } = useCart();
  const sectionTitle =
    cartItems.length === 0 ? 'Products You Might Like!' : 'Based On Your Cart';
  
  // Get smart recommendations based on cart contents
  const getRecommendations = () => {
    if (cartItems.length === 0) {
      // If cart is empty, show popular items
      return allProducts.filter((p) => [21, 7, 4].includes(p.id));
    }

    const cartCategories = cartItems.map(item => item.category);
    const cartProductIds = cartItems.map(item => item.id);
    
    // Determine the dominant category in cart
    const categoryCounts = cartCategories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantCategory = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0];

    // Smart recommendation logic
    let recommendations = [];
    
    // If cart has men's items (shirts, jeans), recommend shoes and accessories
    const hasMensClothing = cartItems.some(item => 
      item.category === 'men' && (
        item.name.toLowerCase().includes('shirt') || 
        item.name.toLowerCase().includes('jeans') ||
        item.name.toLowerCase().includes('pants')
      )
    );
    
    if (hasMensClothing) {
      // Recommend men's shoes and accessories
      recommendations = allProducts.filter(p => 
        !cartProductIds.includes(p.id) && (
          (p.category === 'men' && (p.name.toLowerCase().includes('sneakers') || p.name.toLowerCase().includes('shoes'))) ||
          (p.category === 'accessories' && (p.name.toLowerCase().includes('watch') || p.name.toLowerCase().includes('belt')))
        )
      ).slice(0, 3);
    }
    
    // If cart has women's items, recommend matching accessories and shoes
    const hasWomensClothing = cartItems.some(item => 
      item.category === 'women' && (
        item.name.toLowerCase().includes('dress') || 
        item.name.toLowerCase().includes('blouse') ||
        item.name.toLowerCase().includes('pants')
      )
    );
    
    if (hasWomensClothing) {
      recommendations = allProducts.filter(p => 
        !cartProductIds.includes(p.id) && (
          (p.category === 'women' && (p.name.toLowerCase().includes('shoes') || p.name.toLowerCase().includes('sandals'))) ||
          (p.category === 'accessories' && (p.name.toLowerCase().includes('handbag') || p.name.toLowerCase().includes('sunglasses')))
        )
      ).slice(0, 3);
    }
    
    // If cart has kids' items, recommend complementary kids items
    const hasKidsItems = cartItems.some(item => item.category === 'kids');
    
    if (hasKidsItems) {
      recommendations = allProducts.filter(p => 
        !cartProductIds.includes(p.id) && 
        p.category === 'kids'
      ).slice(0, 3);
    }
    
    // If we still don't have enough recommendations, add items from same category
    if (recommendations.length < 3 && dominantCategory) {
      const sameCategory = allProducts.filter(p => 
        !cartProductIds.includes(p.id) && 
        p.category === dominantCategory &&
        !recommendations.some(r => r.id === p.id)
      ).slice(0, 3 - recommendations.length);
      
      recommendations = [...recommendations, ...sameCategory];
    }
    
    // If still not enough, add popular items
    if (recommendations.length < 3) {
      const popular = allProducts.filter(p => 
        !cartProductIds.includes(p.id) &&
        !recommendations.some(r => r.id === p.id)
      ).slice(0, 3 - recommendations.length);
      
      recommendations = [...recommendations, ...popular];
    }
    
    return recommendations.slice(0, 3);
  };

  const recommendedProducts = getRecommendations();

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{sectionTitle}</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer block"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
