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
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.amount / category.limit) * 100;
          return (
            <div key={index}>
              <div className="flex justify-between text-sm font-medium">
                <span>{category.name}</span>
                <span>
                  ${category.amount} / ${category.limit}
                </span>
              </div>
              <CircularProgress percentage={percentage} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetBreakdown;
