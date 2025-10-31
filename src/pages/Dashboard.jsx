// @ts-nocheck
import React from "react";
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
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container w-full h-full max-w-sm mx-auto">
      <div className="flex flex-col ">
        <div className="flex justify-start flex-row items-center gap-x-2">
          <HiOutlineRectangleStack className=" text-green-600" size={20} />
          <ParagraphSmall>You've spent</ParagraphSmall>
        </div>
        <HeadingXXLarge>$693987</HeadingXXLarge>
        <div className="w-full py-1 ">
          <Notification
            kind={KIND.positive}
            overrides={{
              Body: {
                style: ({ $theme }) => ({
                  width: "100%",
                  margin: "0px",
                  fontSize: "14px",
                  fontWeight: "500",
                }),
              },
            }}
          >
            {() => "Saving 20% more than last month"}
          </Notification>{" "}
        </div>
      </div>
      <div className="flex flex-row gap-x-2 mt-2 w-full overflow-scroll">
        <Link to="/flyers">
          <Button
            shape={SHAPE.pill}
            size={SIZE.compact}
            kind="secondary"
            className="gap-x-2"
          >
            <MdSearch size={18} /> Search
          </Button>
        </Link>
        <Link to="/analytics">
          <Button
            shape={SHAPE.pill}
            size={SIZE.compact}
            className="gap-x-2"
            kind="primary"
          >
            <FaArrowRight size={20} /> Insights
          </Button>
        </Link>
        <Link to="/preferences">
          <Button shape={SHAPE.pill} size={SIZE.compact}>
            <FaHeart size={20} />
          </Button>
        </Link>
        <Link to="/camera">
          <Button
            shape={SHAPE.pill}
            size={SIZE.compact}
            className="gap-x-2"
            kind="secondary"
          >
            <MdOutlineDocumentScanner size={20} /> Scanner
          </Button>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-x-1">
            <VscActivateBreakpoints className="text-green-500" size={20} />
            <ParagraphSmall className="text-gray-700">
              Accumulated Points
            </ParagraphSmall>
          </div>
          <ParagraphSmall className="text-gray-700 font-bold!">
            100 Points
          </ParagraphSmall>
        </div>
        <div className="mt-2">
          <ProgressBar
            completed={60}
            bgColor="linear-gradient(90deg, #22c55e 0%, #22c55e 100%)"
            isLabelVisible={false}
          />
        </div>
      </div>
      <div className="flex flex-col  gap-2 justify-evenly mt-4">
        <HeadingMedium>Spending Trend </HeadingMedium>
        <SpendingChart />
      </div>
      <div className="flex flex-col  gap-2 justify-evenly mt-4">
        <HeadingMedium>Budget Breakdown </HeadingMedium>
        <BudgetBreakdown />
      </div>
      <div className="mt-4">
        <HeadingSmall>Today</HeadingSmall>
        <div className="mt-5">
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
