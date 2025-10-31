import React from "react";
import { FaPlus } from "react-icons/fa6";
import { LuMessageSquareDot } from "react-icons/lu";
import { Avatar } from "baseui/avatar";
import { ANCHOR, Drawer } from "baseui/drawer";
import ReceiptForm from "./Receipt";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="bg-white text-black w-screen h-12 flex items-center px-4 mt-5 max-w-sm mx-auto">
        {/*User icon */}
        <Link to="/profile">
          <Avatar name={user.email} size="scale1000" />
        </Link>
        <div className="flex items-center ml-auto space-x-4">
          {/*Plus icon */}

          <div
            className="bg-slate-100 w-10 h-10 rounded-full flex justify-center items-center"
            onClick={() => setIsOpen(true)}
          >
            <FaPlus />
          </div>
          {/*Search icon */}
          <Link to="/flyers">
            <div className="bg-slate-100 w-10 h-10 rounded-full flex justify-center items-center">
              <FaSearch />
            </div>
          </Link>
        </div>
        <Drawer
          isOpen={isOpen}
          autoFocus
          anchor={ANCHOR.bottom}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <ReceiptForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </Drawer>
      </div>
    </>
  );
};

export default Header;
