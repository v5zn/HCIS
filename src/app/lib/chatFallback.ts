import { allProducts, searchProducts, type Product } from '../data/products';

type CartItem = Product & { quantity: number };

const categoryLabels: Record<Product['category'], string> = {
  men: "Men's",
  women: "Women's",
  kids: "Kids'",
  accessories: 'Accessories',
};

const routeLabels: Record<string, string> = {
  '/': 'home page',
  '/sale': 'sale page',
  '/trending': 'trending page',
  '/men': "men's page",
  '/women': "women's page",
  '/kids': "kids' page",
  '/accessories': 'accessories page',
  '/cart': 'cart page',
  '/profile': 'account page',
};

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatProductList(products: Product[]) {
  return products
    .slice(0, 3)
    .map((product) => `${product.name} (${formatCurrency(product.price)})`)
    .join(', ');
}

function getCategoryFromMessage(message: string): Product['category'] | null {
  if (message.includes('men') || message.includes("man's") || message.includes('male')) {
    return 'men';
  }
  if (message.includes('women') || message.includes("woman's") || message.includes('female')) {
    return 'women';
  }
  if (message.includes('kids') || message.includes('kid') || message.includes('children') || message.includes('child')) {
    return 'kids';
  }
  if (message.includes('accessories') || message.includes('accessory')) {
    return 'accessories';
  }

  return null;
}

function getBudgetFromMessage(message: string) {
  const matches = message.match(/\$?\d+/g);
  if (!matches?.length) {
    return null;
  }

  const values = matches
    .map((match) => Number(match.replace('$', '')))
    .filter((value) => !Number.isNaN(value));

  return values.length ? Math.max(...values) : null;
}

export function buildSiteContext(pathname: string, cartItems: CartItem[]) {
  return {
    page: pathname,
    sections: ['home', 'sale', 'trending', 'men', 'women', 'kids', 'accessories', 'product', 'cart', 'profile'],
    policies: {
      shippingThreshold: 150,
      shippingWindow: '3-5 business days',
      returnWindow: '30 days',
    },
    cart: {
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: Number(
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
      ),
    },
    catalog: allProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      description: product.description,
      onSale: Boolean(product.onSale || product.originalPrice !== null),
    })),
  };
}

export function buildLocalAssistantResponse(
  userMessage: string,
  pathname: string,
  cartItems: CartItem[]
) {
  const lowerMsg = userMessage.toLowerCase().trim();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const currentPage = routeLabels[pathname] ?? 'current page';
  const category = getCategoryFromMessage(lowerMsg);
  const budget = getBudgetFromMessage(lowerMsg);

  const saleProducts = allProducts.filter((product) => product.onSale || product.originalPrice !== null);
  const trendingProducts = [...allProducts]
    .sort((a, b) => ((b.id * 7) % 100) - ((a.id * 7) % 100))
    .slice(0, 3);

  if (!lowerMsg) {
    return 'Ask me about products, prices, sales, shipping, returns, your cart, or where to find anything on the site.';
  }

  if (/(hello|hi|hey|good morning|good evening)/.test(lowerMsg)) {
    return `Hi. I can help with shopping, cart questions, product suggestions, sale items, shipping, returns, and navigation. You're currently on the ${currentPage}.`;
  }

  if (/(who are you|what can you do|help|assist)/.test(lowerMsg)) {
    return 'I can explain what is on each page, recommend products, answer pricing and policy questions, summarize your cart, and point you to sale, trending, category, product, cart, and account areas.';
  }

  if (/(where am i|current page|what page|this page)/.test(lowerMsg)) {
    return `You're on the ${currentPage}. If you want, I can also tell you what this page is useful for.`;
  }

  if (/(navigate|go to|where can i find|find page|location|section)/.test(lowerMsg)) {
    if (lowerMsg.includes('sale')) {
      return 'Use the Sale page to browse discounted products with sale badges and markdown prices.';
    }
    if (lowerMsg.includes('trend')) {
      return 'Use the Trending page for popular picks across the catalog.';
    }
    if (lowerMsg.includes('cart')) {
      return 'Open the cart icon in the header or go to the Cart page to review items, update quantities, and check your order summary.';
    }
    if (lowerMsg.includes('account') || lowerMsg.includes('profile') || lowerMsg.includes('order')) {
      return 'Open the profile icon to reach the account page, where you can view personal details and recent orders.';
    }
    if (category) {
      return `You can browse the ${categoryLabels[category]} collection from the top navigation or the dedicated ${categoryLabels[category]} page.`;
    }

    return 'You can use the top navigation for Home, Sale, Men, Women, Kids, and Accessories, plus the header icons for Cart and Account.';
  }

  if (/(cart|basket)/.test(lowerMsg)) {
    if (/(empty|nothing|clear)/.test(lowerMsg)) {
      return cartItems.length === 0
        ? 'Your cart is currently empty.'
        : `Your cart is not empty. It has ${totalItems} item${totalItems === 1 ? '' : 's'} with a subtotal of ${formatCurrency(subtotal)}.`;
    }

    if (cartItems.length === 0) {
      return `Your cart is currently empty. A good place to start is with ${formatProductList(trendingProducts)}.`;
    }

    const cartSummary = cartItems
      .slice(0, 3)
      .map((item) => `${item.name} x${item.quantity}`)
      .join(', ');

    return `Your cart has ${totalItems} item${totalItems === 1 ? '' : 's'} worth ${formatCurrency(subtotal)}. Right now it includes ${cartSummary}.`;
  }

  if (/(free shipping|shipping|delivery)/.test(lowerMsg)) {
    if (subtotal >= 150) {
      return `You already qualify for free shipping because your cart subtotal is ${formatCurrency(subtotal)}. Standard delivery takes 3-5 business days.`;
    }

    const remaining = 150 - subtotal;
    return `We offer free shipping on orders over $150. ${cartItems.length > 0 ? `You are ${formatCurrency(remaining)} away from that threshold.` : 'Standard delivery takes 3-5 business days.'}`;
  }

  if (/(return|refund|exchange)/.test(lowerMsg)) {
    return 'We offer a 30-day return window with refunds for eligible items. If you need help after purchase, the account area is the best place to start reviewing recent orders.';
  }

  if (/(discount|sale|deal|offer|promo)/.test(lowerMsg)) {
    return `We have discounted products across the catalog. A few sale picks are ${formatProductList(saleProducts)}. You can browse the full set on the Sale page.`;
  }

  if (/(trend|popular|best seller|bestseller)/.test(lowerMsg)) {
    return `Current trending picks include ${formatProductList(trendingProducts)}. The Trending page shows more of them.`;
  }

  if (/(size|sizing|fit)/.test(lowerMsg)) {
    return 'Clothing items support size selection on the product page, while accessories skip size options. If you tell me the product type you are considering, I can point you to likely matches.';
  }

  if (/(price|cost|cheap|expensive|budget|under \$?\d+)/.test(lowerMsg)) {
    if (budget !== null) {
      const matches = allProducts.filter((product) => product.price <= budget).slice(0, 3);
      if (matches.length > 0) {
        return `Options under ${formatCurrency(budget)} include ${formatProductList(matches)}.`;
      }
      return `I couldn't find products under ${formatCurrency(budget)} in the current catalog.`;
    }

    const minPrice = Math.min(...allProducts.map((product) => product.price));
    const maxPrice = Math.max(...allProducts.map((product) => product.price));
    return `Prices in this catalog range from ${formatCurrency(minPrice)} to ${formatCurrency(maxPrice)}. If you give me a budget, I can narrow it down.`;
  }

  if (/(recommend|suggest|what should i buy|what do you recommend)/.test(lowerMsg)) {
    if (cartItems.length > 0) {
      const cartCategories = new Set(cartItems.map((item) => item.category));
      const recommendations = allProducts.filter(
        (product) => !cartItems.some((item) => item.id === product.id) && cartCategories.has(product.category)
      );

      if (recommendations.length > 0) {
        return `Based on your cart, you might like ${formatProductList(recommendations)}.`;
      }
    }

    return `A few strong starting points are ${formatProductList(trendingProducts)}.`;
  }

  if (/(men|women|kids|accessories|accessory)/.test(lowerMsg) && category) {
    const categoryProducts = allProducts.filter((product) => product.category === category).slice(0, 3);
    return `${categoryLabels[category]} collection highlights include ${formatProductList(categoryProducts)}.`;
  }

  if (/(product|item|show me|looking for|search)/.test(lowerMsg)) {
    const results = searchProducts(lowerMsg).slice(0, 3);
    if (results.length > 0) {
      return `I found these relevant products: ${formatProductList(results)}.`;
    }

    return 'I could not find an exact match from the current catalog. Try searching by category, product type, or budget.';
  }

  if (/(checkout|pay|payment)/.test(lowerMsg)) {
    return 'You can review totals and continue through checkout from the Cart page. The account page also shows saved payment-related areas in the profile UI.';
  }

  if (/(account|profile)/.test(lowerMsg)) {
    return 'The account page includes personal information, recent orders, wishlist, addresses, payment methods, and settings.';
  }

  if (/(thank|thanks)/.test(lowerMsg)) {
    return 'You can ask about products, pages, cart status, sales, or policies whenever you need.';
  }

  return 'I can help with products, recommendations, pricing, sales, cart questions, shipping, returns, and site navigation. If you tell me what you want to buy or what part of the site you mean, I can answer more precisely.';
}
