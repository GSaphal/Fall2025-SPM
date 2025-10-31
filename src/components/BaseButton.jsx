import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Button(props) {
  const { func, text, icon } = props;

  return (
    <button
      onClick={func}
      className=" flex rounded-lg border border-solid border-slate-300 bg-white w-75 mt-6 text-left pl-4 hover:bg-slate-200 duration-300 h-10 items-center"
    >
      {text === "Google" ? (
        <FcGoogle className="mt-1 mr-10 size-6" />
      ) : (
        <MdOutlineMailOutline className="mt-1 mr-10 size-6" />
      )}
      <p>{"Continue with " + text}</p>
    </button>
  );
}
