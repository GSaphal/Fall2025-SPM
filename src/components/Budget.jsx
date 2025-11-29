import React from "react";
import CircularProgress from "./CircularProgress";

const BudgetBreakdown = () => {
  const categories = [
    { name: "Groceries", amount: 300, limit: 500 },
    { name: "Entertainment", amount: 150, limit: 200 },
    { name: "Transport", amount: 80, limit: 100 },
    { name: "Shopping", amount: 250, limit: 300 },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="space-y-5">
        {categories.map((category, index) => {
          const percentage = (category.amount / category.limit) * 100;
          return (
            <div key={index} className="flex items-center gap-4">
              {/* Category Name */}
              <div className="w-24">
                <h4 className="text-sm font-semibold text-gray-900">
                  {category.name}
                </h4>
              </div>
              
              {/* Circular Progress */}
              <div className="flex-shrink-0">
                <CircularProgress 
                  percentage={percentage} 
                  size={80}
                  strokeWidth={6}
                  strokeColor="#4ade80"
                  trackColor="#e5e7eb"
                />
              </div>
              
              {/* Budget Amount */}
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-gray-700">
                  ${category.amount} / ${category.limit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetBreakdown;
