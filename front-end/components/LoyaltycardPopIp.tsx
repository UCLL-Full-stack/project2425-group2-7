import React from 'react';

type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

interface PopUpProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  tier: LoyaltyTier;
}

const PopUp: React.FC<PopUpProps> = ({ trigger, setTrigger, tier }) => {
  if (!trigger) return null;

  const getTierColor = (tier: LoyaltyTier) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-700';
      case 'Silver': return 'bg-gray-400';
      case 'Gold': return 'bg-yellow-500';
      case 'Platinum': return 'bg-slate-300';
    }
  };

  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="popup-inner bg-white rounded-lg p-8 relative max-w-md w-full m-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setTrigger(false)}
        >
          ✕
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Loyalty Tier</h2>
          <div className={`${getTierColor(tier)} text-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}>
            <p className="text-3xl font-bold">{tier}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;