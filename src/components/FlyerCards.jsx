import React from "react";

export default function FlyerCards(props) {
  const { image, title, location, phoneNumber, store } = props;
  return (
    <div className="flex flex-col">
      <h1 className="pb-4 font-bold">{store ? store : "Store"}</h1>
      <img
        src={image ? image : "./food.jpg"}
        alt="Image"
        className="w-full"
      ></img>
      <div className="flex flex-col">
        <p className="text-sm mt-4">
          {location} | {phoneNumber}
        </p>
      </div>
    </div>
  );
}
