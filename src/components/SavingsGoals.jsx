import React from 'react';
import { FaBullseye, FaCheckCircle } from 'react-icons/fa';
import { HeadingSmall } from 'baseui/typography';
import ProgressBar from '@ramonak/react-progress-bar';

const SavingsGoals = () => {
  const goals = [
    {
      id: 1,
      name: 'Emergency Fund',
      target: 5000,
      current: 3200,
      deadline: '2025-12-31',
      completed: false,
    },
    {
      id: 2,
      name: 'Vacation Fund',
      target: 2000,
      current: 2000,
      deadline: '2025-11-15',
      completed: true,
    },
    {
      id: 3,
      name: 'New Laptop',
      target: 1500,
      current: 850,
      deadline: '2026-01-20',
      completed: false,
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaBullseye className="text-green-400" size={20} />
        <HeadingSmall>Savings Goals</HeadingSmall>
      </div>
      
      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const isCompleted = goal.completed || progress >= 100;
          
          return (
            <div
              key={goal.id}
              className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                isCompleted ? 'border-green-400' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{goal.name}</h4>
                  {isCompleted && (
                    <FaCheckCircle className="text-green-400" size={16} />
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
              </div>
              
              <ProgressBar
                completed={Math.min(progress, 100)}
                bgColor={isCompleted ? '#4ade80' : 'linear-gradient(90deg, #4ade80 0%, #34d399 100%)'}
                height="8px"
                isLabelVisible={false}
                className="mb-2"
              />
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  {isCompleted ? 'Goal Achieved!' : `${Math.round(progress)}% Complete`}
                </span>
                <span className="text-gray-400">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 bg-gradient-to-r from-green-200 to-emerald-200 hover:from-green-300 hover:to-emerald-300 text-green-700 font-semibold py-3 rounded-xl transition-all shadow-sm border border-green-200">
        + Create New Goal
      </button>
    </div>
  );
};

export default SavingsGoals;

