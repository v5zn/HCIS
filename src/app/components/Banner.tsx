import { Sparkles } from 'lucide-react';

export function Banner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          <p className="text-center font-medium">
            Summer Sale Coming Soon! Get ready for amazing deals
          </p>
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}