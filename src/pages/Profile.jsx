import React, { useState } from "react";
import { Card } from "baseui/card";
import { Avatar } from "baseui/avatar";
// @ts-ignore
import { Button, KIND } from "baseui/button";
// @ts-ignore
import { ProgressBar } from "baseui/progress-bar";
import { ListItem, ListItemLabel } from "baseui/list";
// @ts-ignore
import { StatefulPopover } from "baseui/popover";
import { Tag } from "baseui/tag";
import { Tabs, Tab } from "baseui/tabs-motion";
// @ts-ignore
import { Input } from "baseui/input";
import {
  // @ts-ignore
  FaPlus,
  // @ts-ignore
  FaChartLine,
  // @ts-ignore
  FaHeart,
  // @ts-ignore
  FaQrcode,
  // @ts-ignore
  FaCog,
  // @ts-ignore
  FaWallet,
  FaGift,
  // @ts-ignore
  FaDumbbell,
  // @ts-ignore
  FaShoppingCart,
  // @ts-ignore
  FaBolt,
  FaLock,
} from "react-icons/fa";
// @ts-ignore
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import withLayout from "../components/Layout";
// @ts-ignore
import { HeadingMedium, HeadingSmall } from "baseui/typography";
// @ts-ignore
import { MdMoney, MdPower, MdStorm } from "react-icons/md";
import { Logout } from "../components/Logout";
import Wallet from "../components/Wallet";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
function ProfilePage() {
  const [activeKey, setActiveKey] = useState("0");
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user);
  // Doughnut Chart Data (Spending Breakdown)
  // @ts-ignore
  const spendingData = {
    labels: ["Groceries", "Entertainment", "Utilities", "Shopping"],
    datasets: [
      {
        label: "Spending",
        data: [300, 150, 200, 350],
        backgroundColor: ["#34D399", "#60A5FA", "#FBBF24", "#F87171"],
        borderWidth: 0,
      },
    ],
  };

  // Bar Chart Data (Rewards Progress)

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto">
      {/* Profile Section */}
      <Card
        overrides={{
          Root: {
            style: {
              width: "100%",
              maxWidth: "4xl",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              textAlign: "center",
            },
          },
        }}
      >
        <Avatar
          name={
            // @ts-ignore
            userObj.email
          }
          size="scale1400"
        />
        <h3 className="text-lg font-semibold mt-2">
          {
            // @ts-ignore
            userObj.displayName || userObj.email
          }
        </h3>
        <div className="flex justify-center gap-1 mt-2 flex-wrap">
          <Tag closeable={false} variant="solid" kind="neutral">
            <div className="flex items-center gap-1">
              <MdMoney /> Money Hacker
            </div>
          </Tag>
          <Tag closeable={false} variant="solid" kind="brown">
            <div className="flex items-center gap-1">
              <MdMoney /> Wise Spender
            </div>{" "}
          </Tag>
          <Tag closeable={false} variant="solid" kind="purple">
            <div className="flex items-center gap-1">
              <MdMoney /> Future Rich
            </div>{" "}
          </Tag>
        </div>
      </Card>

      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => setActiveKey(String(activeKey))}
        overrides={{
          Root: {
            style: { width: "100%", maxWidth: "4xl", marginTop: "1.5rem" },
          },
        }}
      >
        <Tab
          title="Rewards Unlocked"
          overrides={{
            TabPanel: {
              style: { padding: "0px" },
            },
          }}
        >
          <div className="space-y-1 mb-5">
            <ListItem>
              <ListItemLabel>10% Cashback on Walmart</ListItemLabel>
              <FaGift className=" mr-2" />
            </ListItem>
            <ListItem>
              <ListItemLabel>Free Gym Membership </ListItemLabel>
              <FaGift className=" mr-2" />
            </ListItem>
          </div>
        </Tab>
        <Tab title="New Rewards">
          <div className="space-y-1 mb-5">
            <ListItem>
              <ListItemLabel>15% off on Costco</ListItemLabel>
              <FaLock className="text-gray-300 mr-2" />
            </ListItem>
            <ListItem>
              <ListItemLabel>Free Gym Membership </ListItemLabel>
              <FaLock className="text-gray-300 mr-2" />
            </ListItem>
          </div>
        </Tab>
      </Tabs>
      
      {/* Wallet Section */}
      {userObj?.email && <Wallet userEmail={userObj.email} />}
      
      <Logout />
    </div>
  );
}

export default withLayout(ProfilePage);
