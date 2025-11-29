import React from 'react';
import { FaRobot, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import { HeadingSmall } from 'baseui/typography';

const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      type: 'surplus',
      title: 'Surplus Detected',
      message: 'AI detected $150 surplus this week. Automate $50 to savings?',
      action: 'Enable Auto-Save',
      icon: '💰',
    },
    {
      id: 2,
      type: 'optimization',
      title: 'Spending Optimization',
      message: 'You could save $45/month by switching grocery stores',
      action: 'View Details',
      icon: '📊',
    },
    {
      id: 3,
      type: 'pattern',
      title: 'Pattern Identified',
      message: 'Your coffee spending increased 30%. Set a budget limit?',
      action: 'Set Budget',
      icon: '☕',
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaRobot className="text-green-400" size={20} />
        <HeadingSmall>AI Recommendations</HeadingSmall>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{rec.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-green-500">{rec.title}</h4>
                  <FaLightbulb className="text-yellow-400" size={14} />
                </div>
                <p className="text-sm text-gray-700 mb-3">{rec.message}</p>
                <button className="flex items-center gap-1 text-green-400 hover:text-green-500 font-medium text-sm transition-colors">
                  {rec.action}
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;

