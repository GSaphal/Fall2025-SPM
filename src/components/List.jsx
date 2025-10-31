// @ts-nocheck
import { ListHeading } from "baseui/list";
import { colors } from "baseui/tokens";
import React from "react";

const ListComponent = ({ item, category, spending }) => {
  return (
    <ListHeading
      heading={item}
      subHeading={category}
      endEnhancer={() => (
        <div className="">
          <div
            className={`text-lg ${
              spending > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {spending}$
          </div>
        </div>
      )}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            backgroundColor: `${$theme.colors.white}`,
          }),
        },
        HeadingContainer: {
          style: ({ $theme }) => ({
            padding: "0px",
            margin: "0px",
            fontSize: "18px",
            color: `${$theme.colors.gray800}`,
          }),
        },
        Content: {
          style: ({ $theme }) => ({
            padding: "0px",
            marginLeft: "0px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }),
        },
        SubHeadingContainer: {
          style: ({ $theme }) => ({
            color: `${$theme.colors.gray300}`,
            fontSize: "14px",
            margin: "0px",
            padding: "0px",
          }),
        },
      }}
      maxLines={1}
    ></ListHeading>
  );
};

export default ListComponent;
