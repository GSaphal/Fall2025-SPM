import React, { useState } from 'react';
import { FaBook, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { HeadingSmall } from 'baseui/typography';

const FinancialLiteracy = () => {
  const [expanded, setExpanded] = useState(null);

  const tips = [
    {
      id: 1,
      title: 'The 50/30/20 Rule',
      content: 'Allocate 50% to needs, 30% to wants, and 20% to savings. This simple framework helps balance your spending and saving goals.',
      category: 'Budgeting',
    },
    {
      id: 2,
      title: 'Emergency Fund Basics',
      content: 'Aim to save 3-6 months of expenses in an emergency fund. Start small and build gradually - even $500 can help in a pinch.',
      category: 'Savings',
    },
    {
      id: 3,
      title: 'Compound Interest Power',
      content: 'Starting early matters! Money saved and invested grows exponentially over time thanks to compound interest.',
      category: 'Investing',
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaBook className="text-green-400" size={20} />
        <HeadingSmall>Financial Literacy Tips</HeadingSmall>
      </div>
      
      <div className="space-y-2">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-xl border border-green-200 overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === tip.id ? null : tip.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-green-500 bg-green-100 px-2 py-1 rounded">
                    {tip.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900">{tip.title}</h4>
              </div>
              {expanded === tip.id ? (
                <FaChevronDown className="text-green-400" />
              ) : (
                <FaChevronRight className="text-gray-400" />
              )}
            </button>
            
            {expanded === tip.id && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialLiteracy;

