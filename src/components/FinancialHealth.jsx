import React from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { HeadingSmall } from 'baseui/typography';

const FinancialHealth = () => {
  const metrics = [
    {
      label: 'Savings Rate',
      value: '22%',
      trend: 'up',
      change: '+5%',
      color: 'text-green-400',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Spending Efficiency',
      value: '85%',
      trend: 'up',
      change: '+3%',
      color: 'text-green-400',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Goal Progress',
      value: '68%',
      trend: 'up',
      change: '+12%',
      color: 'text-green-400',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-green-400" size={20} />
        <HeadingSmall className="text-gray-800 font-semibold">Financial Health Score</HeadingSmall>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-green-100/50 mb-4">
        <div className="text-center">
          <div className="text-6xl font-bold mb-2 text-gray-800">82</div>
          <p className="text-sm text-gray-600 mb-3">Overall Score</p>
          <div className="flex items-center justify-center gap-2">
            <MdTrendingUp className="text-green-400" size={18} />
            <span className="text-sm font-medium text-gray-700">Excellent</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${metric.bgColor} rounded-xl p-4 text-center border border-green-100 shadow-sm`}
          >
            <div className={`${metric.color} text-2xl font-bold mb-1`}>
              {metric.value}
            </div>
            <div className="text-xs text-gray-600 mb-2 font-medium">{metric.label}</div>
            <div className="flex items-center justify-center gap-1">
              {metric.trend === 'up' ? (
                <FaArrowUp className="text-green-400 text-xs" />
              ) : (
                <FaArrowDown className="text-red-400 text-xs" />
              )}
              <span className={`text-xs font-semibold ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialHealth;

