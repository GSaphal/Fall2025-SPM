// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXXLarge,
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import { Button, SHAPE, SIZE } from "baseui/button";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { VscActivateBreakpoints } from "react-icons/vsc";
import ProgressBar from "@ramonak/react-progress-bar";
import { Notification, KIND } from "baseui/notification";
import { Avatar } from "baseui/avatar";
import { ListHeading } from "baseui/list";
import withLayout from "../components/Layout";
import Charts from "../components/SpendingChart";
import SpendingChart from "../components/SpendingChart";
import ListComponent from "../components/List";
import CircularProgress from "../components/CircularProgress";
import BudgetBreakdown from "../components/Budget";
import AutoSaveStatus from "../components/AutoSaveStatus";
import BlockchainVerification from "../components/BlockchainVerification";
import FinancialHealth from "../components/FinancialHealth";
import { Link, useLocation } from "react-router-dom";
import { getUserRewards } from "../services/walletService";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = user?.email;
  const [rewardsPoints, setRewardsPoints] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      if (userEmail) {
        try {
          const data = await getUserRewards(userEmail);
          setRewardsPoints(data.rewards_points || 0);
        } catch (error) {
          console.error("Error fetching rewards:", error);
          // Use demo data if backend fails
          setRewardsPoints(1250);
        }
      }
    };
    fetchRewards();
  }, [userEmail]);

  return (
    <div className="container w-full h-full max-w-sm mx-auto pb-6">
      {/* You've spent Section - Moved to top */}
      <div className="flex flex-col mb-4">
        <div className="flex justify-start flex-row items-center gap-x-2 mb-2">
          <HiOutlineRectangleStack className="text-gray-500" size={18} />
          <ParagraphSmall className="text-gray-600">You've spent</ParagraphSmall>
        </div>
        <HeadingXXLarge className="text-gray-900 font-bold mb-3">$693987</HeadingXXLarge>
        <div className="w-full">
          <div className="bg-gray-100 rounded-lg px-3 py-2">
            <p className="text-sm text-gray-700 font-medium">
              Saving 20% more than last month
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-2 mt-4 mb-4 w-full overflow-x-auto pb-2">
        <Link to="/flyers">
          <Button
            shape={SHAPE.pill}
            size={SIZE.compact}
            kind="secondary"
            className="gap-x-2 bg-white border border-gray-200 hover:bg-gray-50"
            overrides={{
              BaseButton: {
                style: {
                  minWidth: 'auto',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                },
              },
            }}
          >
            <MdSearch size={18} /> Search
          </Button>
        </Link>
        <Link to="/analytics">
          <Button
            shape={SHAPE.pill}
            size={SIZE.compact}
            className="gap-x-2 bg-gray-900 text-white hover:bg-gray-800"
            overrides={{
              BaseButton: {
                style: {
                  minWidth: 'auto',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                },
              },
            }}
          >
            <FaArrowRight size={18} /> Insights
          </Button>
        </Link>
        <Link to="/preferences">
          <Button 
            shape={SHAPE.round}
            size={SIZE.compact}
            className="bg-gray-900 text-white hover:bg-gray-800"
            overrides={{
              BaseButton: {
                style: {
                  minWidth: '40px',
                  width: '40px',
                  height: '40px',
                  padding: '0',
                },
              },
            }}
          >
            <FaHeart size={18} />
          </Button>
        </Link>
        <Link to="/camera">
          <Button
            shape={SHAPE.pill}
            size={SIZE.compact}
            kind="secondary"
            className="gap-x-2 bg-white border border-gray-200 hover:bg-gray-50"
            overrides={{
              BaseButton: {
                style: {
                  minWidth: 'auto',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                },
              },
            }}
          >
            <MdOutlineDocumentScanner size={18} /> Scanner
          </Button>
        </Link>
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex justify-between flex-row items-center gap-2 mb-2">
          <div className="flex flex-row items-center gap-x-1">
            <VscActivateBreakpoints className="text-green-500" size={18} />
            <ParagraphSmall className="text-gray-700 font-medium">
              Accumulated Points
            </ParagraphSmall>
          </div>
          <ParagraphSmall className="text-gray-700 font-bold">
            {rewardsPoints || 1250} Points
          </ParagraphSmall>
        </div>
        <div className="mt-2">
          <ProgressBar
            completed={60}
            bgColor="#4ade80"
            isLabelVisible={false}
            height="8px"
            borderRadius="4px"
          />
        </div>
      </div>
      {/* Financial Health Score */}
      <FinancialHealth />
      
      <div className="flex flex-col gap-3 mt-6">
        <HeadingMedium className="text-gray-800 font-semibold">Spending Trend</HeadingMedium>
        <SpendingChart />
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <HeadingMedium className="text-gray-800 font-semibold">Budget Breakdown</HeadingMedium>
        <BudgetBreakdown />
      </div>
      
      {/* AI Recommendations */}
      <AIRecommendations />
      
      {/* Savings Goals */}
      <SavingsGoals />
      
      <div className="mt-6 mb-4">
        <HeadingSmall className="text-gray-800 font-semibold mb-4">Today</HeadingSmall>
        <div className="space-y-3">
          <ListComponent item="Walmart" category="Grocery" spending={-20.35} />
          <ListComponent
            item="Marche Newon"
            category="Grocery"
            spending={50.35}
          />
        </div>
      </div>
    </div>
  );
};

// export default withLayout(Dashboard);
export default withLayout(Dashboard);
