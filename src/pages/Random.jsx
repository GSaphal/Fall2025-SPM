import React from "react";
import { FaBell } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import { FaStar } from "react-icons/fa";

export default function Random() {
  return (
    <div className="min-w-screen min-h-screen bg-lime-500">
      <div className="flex items-stretch justify-between px-4">
        <p className="text-gray-100 text-4xl pt-6 pl-3 font-bold">Parteners</p>
        <button className="bg-green-300 rounded-full border-none w-10 h-10 mr-4 mt-6 flex justify-center items-center">
          <FaBell className="text-gray-100 text-right size-5" />
        </button>
      </div>
      <div className="flex mx-auto justify-center mt-5 items-center bg-yellow-300 w-60 rounded-t-3xl pb-2 pt-1">
        <GiTwoCoins />
        <p className="text-black pl-2">You can pay with points</p>
      </div>
      <div className="flex items-start mx-auto bg-slate-200 w-85 h-120 rounded-4xl pt-4 flex-col z-1">
        <div className="flex items-center mx-auto bg-white w-40 h-10 rounded-4xl">
          <FaStar className=" text-green-400 ml-4 mr-3" />
          <p>Galaxy Store</p>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto mt-5">
          <p className="text-3xl font-medium">New flagships</p>
          <p className="text-3xl font-medium">Samsung S24</p>
          <p className="text-center t-4 text-slate-500">
            A huge selection of practical products for you and your home
          </p>
          <img src="../public/random.jpg" className="h-50"></img>
          <button className="bg-black w-75 h-10 text-white rounded-4xl">
            To the store
          </button>
        </div>
      </div>
      <div className="bg-slate-200/70 w-70 h-7 mx-auto flex rounded-b-4xl relative bottom-2 overflow-clip"></div>
      <div className="overflow-hidden h-8 w-55 mx-auto bottom-2 relative">
        <div className="bg-slate-200/50 w-55 h-7 rounded-b-4xl relative bottom-4 overflow-clip"></div>
      </div>
    </div>
  );
}
