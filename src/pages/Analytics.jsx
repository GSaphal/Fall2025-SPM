import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import withLayout from "../components/Layout";
import React from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { HeadingMedium } from "baseui/typography";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalysisPage = () => {
  const rewardsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Points Earned",
        data: [20, 35, 40, 50, 60, 69],
        backgroundColor: "#34D399",
        borderWidth: 0,
      },
    ],
  };
  const spendingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Actual Spending",
        data: [200, 250, 300, 280, 320, 350],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Efficient Spending",
        data: [180, 220, 280, 260, 290, 310],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const priceComparisons = [
    { item: "Milk", actual: 4.5, efficient: 3.8, platform: "Walmart" },
    { item: "Bread", actual: 2.8, efficient: 2.2, platform: "Target" },
    { item: "Eggs", actual: 5.0, efficient: 4.2, platform: "Amazon Fresh" },
    { item: "Coffee", actual: 10.5, efficient: 9.0, platform: "Costco" },
  ];
  const recommended = [
    {
      item: "Apple iPhone 15",
      platform: "Amazon",
      actual: 999.99,
      efficient: 899.99,
    },
    {
      item: "Samsung Galaxy S23",
      platform: "Best Buy",
      actual: 799.99,
      efficient: 749.99,
    },

    {
      item: "MacBook Air M2",
      platform: "Apple Store",
      actual: 1199.99,
      efficient: 1099.99,
    },

    {
      item: "Dell XPS 15",
      platform: "Dell Official Store",
      actual: 1499.99,
      efficient: 1399.99,
    },
  ];

  return (
    <div className="space-y-6 max-w-sm mx-auto">
      <HeadingMedium>Spending Overview </HeadingMedium>

      <div className="bg-white rounded-2xl shadow-md p-2">
        <p className="text-sm text-gray-500">
          Your total spending vs. efficient prices
        </p>
        <div className="h-48">
          <Line
            data={spendingData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className=" rounded-2xl p-2 mt-4">
        <HeadingMedium>Special Deals for you!</HeadingMedium>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {priceComparisons.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2  rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">{item.item}</p>
                <p className="text-xs text-gray-500">{item.platform}</p>
              </div>
              <div className="text-right">
                <p className="text-sm line-through text-red-500">
                  ${item.actual.toFixed(2)}
                </p>
                <p className="text-lg font-semibold text-green-500">
                  ${item.efficient.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HeadingMedium>Recommended for you</HeadingMedium>

      {/* Comparison Table */}
      <div className="rounded-2xl shadow-md p-2 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Item</th>
              <th className="text-right p-2">Original Price</th>
              <th className="text-right p-2">Efficient Price</th>
              <th className="text-center p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recommended.map((item, index) => (
              <tr key={index} className="">
                <td className="p-2">{item.item}</td>
                <td className="text-right p-2 text-red-500">
                  ${item.actual.toFixed(2)}
                </td>
                <td className="text-right p-2 text-green-500">
                  ${item.efficient.toFixed(2)}
                </td>
                <td className="text-center p-2">
                  {item.actual > item.efficient ? (
                    <MdArrowUpward
                      className="text-green-500 inline-block"
                      size={16}
                    />
                  ) : (
                    <MdArrowDownward
                      className="text-red-500 inline-block"
                      size={16}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <HeadingMedium>Budget Breakdown </HeadingMedium>
        <div className="w-full mt-4">
          <Bar data={rewardsData} options={{ responsive: true }} />
        </div>
      </div>
      <div className="h-10 w-10"></div>
    </div>
  );
};

export default withLayout(AnalysisPage);
