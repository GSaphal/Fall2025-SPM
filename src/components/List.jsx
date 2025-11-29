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
              spending > 0 ? "text-green-400" : "text-red-400"
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
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }),
        },
        HeadingContainer: {
          style: ({ $theme }) => ({
            padding: "0px",
            margin: "0px",
            fontSize: "16px",
            fontWeight: "600",
            color: `${$theme.colors.gray900}`,
          }),
        },
        Content: {
          style: ({ $theme }) => ({
            padding: "0px",
            marginLeft: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }),
        },
        SubHeadingContainer: {
          style: ({ $theme }) => ({
            color: `${$theme.colors.gray500}`,
            fontSize: "13px",
            margin: "0px",
            padding: "0px",
            marginTop: "4px",
          }),
        },
      }}
      maxLines={1}
    ></ListHeading>
  );
};

export default ListComponent;
