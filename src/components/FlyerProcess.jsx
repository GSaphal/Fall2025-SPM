import React, { useState } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import { useEffect } from "react";
import FlyerCards from "./FlyerCards.jsx";
import JSONData from "../utils/catalogue.json";
import withLayout from "./Layout.jsx";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const FlyerSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bestDeal, setBestDeal] = useState(null);
  const [flyers, setFlyers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [adress, setAdress] = useState(null);
  const [items, setItems] = useState(21);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Request the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // On success, set the location state
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        // On error, set the error state
        setError(err.message);
      }
    );
  }, []);
  useEffect(() => {
    if (!location) return;
    const fetchCity = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
        );
        const data = await response.json();
        if (data && data.address) {
          setAdress(data.address);
        } else setError("Could not fetch address.");
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchCity();
  }, [location]);

  const [searchItems, setSearchItems] = useState([]);
  // Search for the best deal in the extracted text
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    // Normalize search term
    setSearchTerm(term);
    const results = JSONData.filter(
      (item) => item.name.toLowerCase().includes(term) // Check if the product name contains the search term
    );

    setSearchItems(results);
  };

  // let bestDealFound = null;

  // flyers.forEach((flyer) => {
  //   const lines = flyer.text.split("\n");
  //   lines.forEach((line) => {
  //     if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
  //       // Extract price using a simple regex (e.g., $2.50 or 2.50)
  //       const priceMatch = line.match(/\$\d+\.\d+/); // Match prices like $2.50
  //       if (priceMatch) {
  //         const price = parseFloat(priceMatch[0].replace("$", ""));
  //         if (!bestDealFound || price < bestDealFound.price) {
  //           bestDealFound = {
  //             item: searchTerm,
  //             price,
  //             shop: `Flyer Image`, // You can replace this with a shop name if available
  //             image: flyer.image, // Show the flyer image
  //           };
  //         }
  //       }
  //     }
  //   });
  // });

  // setBestDeal(bestDealFound)

  return (
    <div className="flex flex-col items-center p-4 min-h-screen max-w-sm mx-auto">
      {/* Search Input */}
      <div className="w-full max-w-md mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          placeholder="Search for an item (e.g., Apples)"
          clearOnEscape
        />
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <button className="relative top-2 left-3 border border-solid border-black rounded-full w-9 h-9 justify-center items-center hover:bg-slate-100 duration-200">
              <FaArrowLeft className="relative left-2" />
            </button>
          </Link>
          <h1 className="mx-auto flex text-center mt-4 ">
            Location :{" "}
            {adress
              ? `${adress.road}, ${adress.city}, ${adress.country}`
              : "No address yet"}
          </h1>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-4">
        {searchTerm !== "" && searchItems.length > 0 ? (
          searchItems.map((item, key) => (
            <div
              className="flex w-full flex-col shadow-md mb-5 p-5 space-y-1"
              key={key}
            >
              <h6 className="text-md">{item.name}</h6>

              <img
                src={item.cutout_image_url}
                alt="alt_img"
                height={160}
                width={160}
              />
              <p className="text-sm font-semibold pt-4">Price: {item.price}</p>
              <p className="text-xs font-light">
                Available Till: {item.available_to}
              </p>
              <p className="text-xs font-light"> Costco | Guy Street </p>
            </div>
          ))
        ) : (
          <FlyerCards
            store="Costco"
            image="/CostcoFlyer.png"
            title="NoName"
            location="Guy Street"
            phoneNumber="123456789"
          />
        )}
      </div>
    </div>
  );
};

export default withLayout(FlyerSearch);
