import React from 'react';
import { FaUtensils, FaShoppingCart, FaCar, FaHome, FaGamepad, FaHeart } from 'react-icons/fa';
import { HeadingSmall } from 'baseui/typography';

const TransactionCategories = () => {
  const categories = [
    { name: 'Groceries', amount: 450, icon: FaShoppingCart, color: 'bg-green-400', percentage: 35 },
    { name: 'Dining', amount: 280, icon: FaUtensils, color: 'bg-orange-500', percentage: 22 },
    { name: 'Transport', amount: 180, icon: FaCar, color: 'bg-blue-500', percentage: 14 },
    { name: 'Utilities', amount: 150, icon: FaHome, color: 'bg-purple-500', percentage: 12 },
    { name: 'Entertainment', amount: 120, icon: FaGamepad, color: 'bg-pink-500', percentage: 9 },
    { name: 'Health', amount: 100, icon: FaHeart, color: 'bg-red-500', percentage: 8 },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-4">
        <HeadingSmall>Spending by Category</HeadingSmall>
        <span className="text-sm text-gray-500">Total: ${total.toLocaleString()}</span>
      </div>
      
      <div className="space-y-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.name} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`${category.color} p-3 rounded-xl text-white`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <span className="font-bold text-gray-900">${category.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${category.color} h-2 rounded-full transition-all`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{category.percentage}% of total</span>
                    <span className="text-xs text-green-400 font-medium">
                      {category.percentage > 20 ? '⚠ High' : '✓ Normal'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionCategories;

