import { Link, useLocation } from 'react-router';

export function Categories() {
  const location = useLocation();
  const categories = ['Trending', 'On Sale', 'Men', 'Women', 'Kids', 'Accessories'];

  const getIsActive = (category: string) => {
    const path = location.pathname;
    const categoryLower = category.toLowerCase();

    // Home page defaults to Men
    if (path === '/' && categoryLower === 'men') return true;
    
    // Handle "On Sale" category
    if (path === '/sale' && categoryLower === 'on sale') return true;

    return path === `/${categoryLower}`;
  };

  const getPath = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    // Home page for Men
    if (categoryLower === 'men') return '/';
    
    // Handle "On Sale" category
    if (categoryLower === 'on sale') return '/sale';
    
    return `/${categoryLower}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-8 py-4">
          {categories.map((category) => {
            const isActive = getIsActive(category);
            const path = getPath(category);

            return (
              <Link
                key={category}
                to={path}
                className={`font-medium transition-colors ${
                  isActive
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}