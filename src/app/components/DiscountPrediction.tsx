import { TrendingDown, Bell, X, Check } from 'lucide-react';
import { useState } from 'react';

export function DiscountPrediction() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeNotification, setActiveNotification] = useState<'default' | 'threshold' | null>(null);

  if (!isVisible) return null;

  const handleNotifyClick = (type: 'default' | 'threshold') => {
    setActiveNotification(type);
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
              {activeNotification ? 'Notification Set!' : 'Price may drop 15% in 3 days'}
            </p>
            <p className="text-xs text-gray-600">
              {activeNotification
                ? "We'll notify you when the price drops!"
                : 'Based on last year`s sales, we predict a price drop for items you`ve frequently checked.'}
            </p>
          </div>

          {/* Notify Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleNotifyClick('default')}
              disabled={activeNotification !== null}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium text-xs flex-1 justify-center ${
                activeNotification === 'default'
                  ? 'bg-green-600 text-white cursor-default'
                  : activeNotification !== null
                    ? 'bg-blue-600 text-white opacity-60 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {activeNotification === 'default' ? (
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

            <button
              onClick={() => handleNotifyClick('threshold')}
              disabled={activeNotification !== null}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium text-xs flex-1 justify-center ${
                activeNotification === 'threshold'
                  ? 'bg-green-600 text-white cursor-default'
                  : activeNotification !== null
                    ? 'bg-blue-600 text-white opacity-60 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {activeNotification === 'threshold' ? (
                <>
                  <Check className="w-3 h-3" />
                  Notification Active
                </>
              ) : (
                <>
                  <Bell className="w-3 h-3" />
                  Nofity if more than 40%
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
