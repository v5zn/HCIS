import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { allProducts, Product } from '../data/products';
import { useState, useEffect } from 'react';
import { buildApiUrl } from '../lib/api';

type CartPreviewItem = {
  id: number;
  name: string;
  category: Product['category'];
  price: number;
  quantity: number;
};

function getFallbackRecommendation(cartItems: CartPreviewItem[], missingForFreeShipping: number) {
  const cartItemIds = cartItems.map((item) => item.id);
  const cartCategories = new Set(cartItems.map((item) => item.category));
  const possibleItems = allProducts.filter((product) => {
    if (cartItemIds.includes(product.id)) {
      return false;
    }

    const isNearTarget = product.price >= Math.max(0, missingForFreeShipping - 10);
    const matchesCart = cartCategories.size === 0 || cartCategories.has(product.category);
    return isNearTarget && matchesCart;
  });

  if (possibleItems.length > 0) {
    return [...possibleItems].sort(
      (a, b) => Math.abs(a.price - missingForFreeShipping) - Math.abs(b.price - missingForFreeShipping)
    )[0];
  }

  return allProducts.find((product) => !cartItemIds.includes(product.id)) ?? null;
}

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, addToCart } = useCart();
  const [recommendation, setRecommendation] = useState<Product | null>(null);
  const [recommendationReason, setRecommendationReason] = useState('');
  const [recommendationCta, setRecommendationCta] = useState('Add & Get Free Shipping');
  const [refusedRecommendation, setRefusedRecommendation] = useState(false);

  const subtotal = getTotalPrice();
  const FREE_SHIPPING_THRESHOLD = 150;
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  useEffect(() => {
    if (isFreeShipping || refusedRecommendation || missingForFreeShipping <= 0) {
      setRecommendation(null);
      setRecommendationReason('');
      setRecommendationCta('Add & Get Free Shipping');
      return;
    }

    const fallbackRecommendation = getFallbackRecommendation(cartItems, missingForFreeShipping);

    if (!fallbackRecommendation) {
      setRecommendation(null);
      setRecommendationReason('');
      return;
    }

    const candidateProducts = allProducts
      .filter((product) => !cartItems.some((item) => item.id === product.id))
      .sort((a, b) => Math.abs(a.price - missingForFreeShipping) - Math.abs(b.price - missingForFreeShipping))
      .slice(0, 8);

    let isCancelled = false;

    setRecommendation(fallbackRecommendation);
    setRecommendationReason('Finding the best item to unlock free shipping...');
    setRecommendationCta('Add & Get Free Shipping');

    const fetchRecommendation = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/cart-recommendation'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subtotal,
            shippingThreshold: FREE_SHIPPING_THRESHOLD,
            cartItems: cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              price: item.price,
              quantity: item.quantity,
            })),
            candidates: candidateProducts.map((product) => ({
              id: product.id,
              name: product.name,
              category: product.category,
              price: product.price,
              description: product.description,
              onSale: Boolean(product.onSale || product.originalPrice !== null),
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Cart recommendation request failed.');
        }

        if (isCancelled) {
          return;
        }

        const selectedProduct =
          allProducts.find((product) => product.id === data.productId) ?? fallbackRecommendation;

        setRecommendation(selectedProduct);
        setRecommendationReason(
          typeof data.reason === 'string' && data.reason.trim()
            ? data.reason.trim()
            : 'This item is a strong fit for unlocking free shipping.'
        );
        setRecommendationCta(
          typeof data.cta === 'string' && data.cta.trim()
            ? data.cta.trim()
            : 'Add & Get Free Shipping'
        );
      } catch {
        if (isCancelled) {
          return;
        }

        setRecommendation(fallbackRecommendation);
        setRecommendationReason('This item is priced to get you close to the free shipping threshold.');
        setRecommendationCta('Add & Get Free Shipping');
      }
    };

    void fetchRecommendation();

    return () => {
      isCancelled = true;
    };
  }, [cartItems, isFreeShipping, missingForFreeShipping, refusedRecommendation, subtotal]);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to get started!</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 border border-gray-100"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-2xl font-bold text-gray-900">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-500 mb-4 text-sm">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    {item.category !== 'accessories' && item.color && ` - ${item.color}`}
                    {item.category !== 'accessories' && item.size && ` - Size ${item.size}`}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-sm font-semibold text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  {isFreeShipping ? (
                    <span className="font-bold text-green-600 tracking-wide">FREE</span>
                  ) : (
                    <span className="font-semibold text-gray-900">$15.00</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${(subtotal * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {!isFreeShipping && (
                <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm font-medium border border-blue-100">
                  You're just <span className="font-bold text-blue-900">${missingForFreeShipping.toFixed(2)}</span> away from Free Shipping!
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {isFreeShipping && (
                <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg text-sm font-medium border border-green-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  You've unlocked Free Shipping!
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${(subtotal * 1.08 + (isFreeShipping ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all mb-4 text-lg shadow-md shadow-blue-200">
                Proceed to Checkout
              </button>
            </div>

            {!isFreeShipping && recommendation && !refusedRecommendation && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm p-1 border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  <button onClick={() => setRefusedRecommendation(true)} className="text-indigo-400 hover:text-indigo-600 bg-white/50 rounded-full p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4 text-indigo-700">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-bold">AI Assistant Suggestion</h3>
                  </div>
                  <p className="text-sm text-indigo-900/80 mb-4">
                    {recommendationReason || 'Add this to your cart to reach free shipping.'}
                  </p>

                  <div className="flex gap-4 mb-4">
                    <ImageWithFallback
                      src={recommendation.image}
                      alt={recommendation.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{recommendation.name}</h4>
                      <p className="text-indigo-700 font-bold">${recommendation.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => addToCart(recommendation)}
                      className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      {recommendationCta}
                    </button>
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${recommendation.id}`}
                        className="flex-1 bg-white text-indigo-600 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition-colors border border-indigo-200 text-center flex items-center justify-center"
                      >
                        {recommendation.category === 'accessories' ? 'View Details' : 'Modify Size/Color'}
                      </Link>
                      <button
                        onClick={() => setRefusedRecommendation(true)}
                        className="flex-1 bg-transparent text-gray-500 py-2 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors text-center"
                      >
                        No Thanks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
