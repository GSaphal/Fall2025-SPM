import { Button, SHAPE, SIZE } from "baseui/button";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineDocumentScanner } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  return (
    <div className="flex justify-center fixed bottom-2 w-full border-0" style={{ border: 'none' }}>
      <div 
        className="bg-slate-50 rounded-3xl flex justify-center items-center border-0 outline-none border-t-0" 
        style={{ 
          boxShadow: 'none',
          border: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          outline: 'none',
          borderWidth: '0px',
          borderStyle: 'none'
        }}
      >
        <Link to="/dashboard" className="no-underline">
          <div className="flex">
            <Button
              shape={SHAPE.pill}
              size={SIZE.large}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    outline: "none !important",
                    backgroundColor: "transparent",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    ":active": {
                      backgroundColor: "transparent",
                    },
                  }),
                },
              }}
            >
              <MdOutlineDashboard
                className={
                  pathname === "/dashboard" ? "text-gray-800" : "text-gray-500"
                }
                size={30}
              />
            </Button>
          </div>
        </Link>
        <Link to="/preferences" className="no-underline">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                  ":active": {
                    backgroundColor: "transparent",
                  },
                }),
              },
            }}
          >
            <FaHeart
              className={
                pathname === "/preferences" ? "text-gray-800" : "text-gray-500"
              }
              size={30}
            />
          </Button>
        </Link>
        <Link to="/camera" className="no-underline">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                  ":active": {
                    backgroundColor: "transparent",
                  },
                }),
              },
            }}
          >
            <MdOutlineDocumentScanner className={pathname === "/camera" ? "text-gray-800" : "text-gray-500"} size={30} />
          </Button>
        </Link>
        <Link to="/analytics" className="no-underline">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                  ":active": {
                    backgroundColor: "transparent",
                  },
                }),
              },
            }}
          >
            <IoMdAnalytics
              className={
                pathname === "/analytics" ? "text-gray-800" : "text-gray-500"
              }
              size={30}
            />
          </Button>
        </Link>

        <Link to="/profile" className="no-underline">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                  ":active": {
                    backgroundColor: "transparent",
                  },
                }),
              },
            }}
          >
            <CgProfile
              className={
                pathname === "/profile" ? "text-gray-800" : "text-gray-500"
              }
              size={30}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
