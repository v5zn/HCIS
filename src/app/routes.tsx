import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'search', Component: SearchPage },
      { path: 'trending', Component: () => <CategoryPage category="trending" /> },
      { path: 'sale', Component: () => <CategoryPage category="sale" /> },
      { path: 'men', Component: () => <CategoryPage category="men" /> },
      { path: 'women', Component: () => <CategoryPage category="women" /> },
      { path: 'kids', Component: () => <CategoryPage category="kids" /> },
      { path: 'accessories', Component: () => <CategoryPage category="accessories" /> },
      { path: 'product/:id', Component: ProductDetailPage },
      { path: 'cart', Component: CartPage },
      { path: 'profile', Component: ProfilePage },
    ],
  },
]);