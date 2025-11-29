import React from 'react';
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa';
import { HeadingSmall } from 'baseui/typography';

const GamificationBadges = () => {
  const badges = [
    {
      id: 1,
      name: 'First Saver',
      description: 'Made your first savings',
      icon: FaStar,
      unlocked: true,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 2,
      name: 'Week Warrior',
      description: 'Saved for 7 consecutive days',
      icon: FaMedal,
      unlocked: true,
      color: 'text-green-400',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      name: 'Goal Crusher',
      description: 'Completed 3 savings goals',
      icon: FaTrophy,
      unlocked: true,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 4,
      name: 'Month Master',
      description: 'Saved for 30 consecutive days',
      icon: FaAward,
      unlocked: false,
      color: 'text-gray-300',
      bgColor: 'bg-gray-50',
    },
    {
      id: 5,
      name: 'Smart Spender',
      description: 'Optimized 10 purchases',
      icon: FaStar,
      unlocked: false,
      color: 'text-gray-300',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaTrophy className="text-green-400" size={20} />
        <HeadingSmall>Achievements & Badges</HeadingSmall>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`${badge.bgColor} rounded-xl p-4 text-center border-2 ${
                badge.unlocked ? 'border-green-300' : 'border-gray-200'
              }`}
            >
              <Icon
                className={`${badge.color} mx-auto mb-2`}
                size={32}
              />
              <h5 className={`text-xs font-semibold mb-1 ${
                badge.unlocked ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {badge.name}
              </h5>
              <p className={`text-xs ${
                badge.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>
              {!badge.unlocked && (
                <div className="mt-2">
                  <span className="text-xs text-gray-400">🔒 Locked</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamificationBadges;

