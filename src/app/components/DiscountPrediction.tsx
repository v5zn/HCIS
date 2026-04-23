import { TrendingDown, Bell, X, Check } from 'lucide-react';
import { useState } from 'react';

export function DiscountPrediction() {
  const [isVisible, setIsVisible] = useState(true);
  const [isNotified, setIsNotified] = useState(false);

  if (!isVisible) return null;

  const handleNotifyClick = () => {
    setIsNotified(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs">
      <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="relative rounded-xl p-4 bg-blue-50">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-0.5 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
              <TrendingDown className="w-3 h-3" />
              <span className="text-xs font-medium">Smart Discount</span>
            </div>
          </div>

          {/* Prediction */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              {isNotified ? 'Notification Set!' : 'Price may drop 15% in 3 days'}
            </p>
            <p className="text-xs text-gray-600">
              {isNotified
                ? "We'll notify you when the price drops!"
                : 'We predict a price reduction for items you`ve frequently checked.'}
            </p>
          </div>

          {/* Notify Button */}
          <button
            onClick={handleNotifyClick}
            disabled={isNotified}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium text-xs w-full justify-center ${
              isNotified
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isNotified ? (
              <>
                <Check className="w-3 h-3" />
                Notification Active
              </>
            ) : (
              <>
                <Bell className="w-3 h-3" />
                Notify Me
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
