import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', class: 'bg-gray-900' },
  { name: 'White', class: 'bg-white border-2 border-gray-200' },
  { name: 'Navy', class: 'bg-blue-900' },
];

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);

  useEffect(() => {
    setSelectedImage(0);
    setAdded(false);
    setSelectedSize(SIZES[1]);
    setSelectedColor(COLORS[0].name);
  }, [id]);

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // You could pass size and color to cart item, 
    // but assuming standard cart functionality works with ID for now.
    const cartItem = product.category === 'accessories' 
      ? { ...product } 
      : { ...product, size: selectedSize, color: selectedColor };
      
    addToCart(cartItem as any);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={product.category === 'men' ? '/' : `/${product.category}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {product.category === 'men' ? 'Home' : product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <ImageWithFallback
                src={displayImages[selectedImage] || displayImages[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-600 ring-2 ring-blue-100'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl font-bold text-gray-900">${product.price}</p>
              {product.originalPrice && (
                <>
                  <p className="text-xl text-gray-500 line-through decoration-gray-400">
                    ${product.originalPrice}
                  </p>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.category !== 'accessories' && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Color</h2>
                  <span className="text-sm text-gray-500">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        color.class
                      } ${
                        selectedColor === color.name
                          ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                          : 'hover:scale-105'
                      }`}
                      aria-label={`Select ${color.name} color`}
                    >
                      {selectedColor === color.name && (
                        <Check className={`w-5 h-5 ${color.name === 'White' ? 'text-gray-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.category !== 'accessories' && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Size</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white shadow-md'
                          : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Category: <span className="font-medium text-gray-900">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Free shipping on orders over $150
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Easy returns within 30 days
                </li>
              </ul>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg ${
                added
                  ? 'bg-green-600 shadow-green-200 shadow-lg'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-200 shadow-lg hover:shadow-xl'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
