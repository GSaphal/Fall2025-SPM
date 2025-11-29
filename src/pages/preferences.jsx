import React, { useState, useEffect } from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import withLayout from "../components/Layout";
import { Drawer, ANCHOR } from "baseui/drawer";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import SavingsGoals from "../components/SavingsGoals";
import AIRecommendations from "../components/AIRecommendations";
import FinancialLiteracy from "../components/FinancialLiteracy";
import { HeadingMedium } from "baseui/typography";

function Preferences() {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [calendarValue, setCalendarValue] = useState(dayjs());
  const [editingId, setEditingId] = useState(null); // Track the ID of the preference being edited

  useEffect(() => {
    const storedPreferences = localStorage.getItem("preferences");
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  const addPreference = () => {
    if (newPreference.trim() !== "") {
      if (editingId) {
        // Editing mode: update the existing preference
        setPreferences(
          preferences.map((pref) =>
            pref.id === editingId
              ? {
                  ...pref,
                  text: newPreference,
                  date: calendarValue.format("YYYY-MM-DD"),
                }
              : pref
          )
        );
        setEditingId(null);
      } else {
        // Adding mode: create one or multiple new preferences
        const newPreferences = newPreference
          .split(/[\n,]/)
          .map((item) => item.trim())
          .filter((item) => item !== "");

        const newPreferenceItems = newPreferences.map((preference) => ({
          date: calendarValue.format("YYYY-MM-DD"), // Store the selected date
          text: preference,
          id: Date.now() + Math.random(), // Unique ID for each preference
        }));

        setPreferences([...preferences, ...newPreferenceItems]);
      }
      setNewPreference("");
      setIsDrawerOpen(false);
    }
  };

  const deletePreferencesById = (id) => {
    setPreferences(preferences.filter((pref) => pref.id !== id));
  };

  const editPreferencesById = (id) => {
    const prefToEdit = preferences.find((pref) => pref.id === id);
    if (prefToEdit) {
      setNewPreference(prefToEdit.text);
      setCalendarValue(dayjs(prefToEdit.date));
      setEditingId(id); // Set the preference ID being edited
      setIsDrawerOpen(true); // Open the drawer for editing
    }
  };

  // Group preferences by date
  const groupedPreferences = preferences.reduce((acc, preference) => {
    const date = preference.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(preference);
    return acc;
  }, {});

  // Sort dates in ascending order
  const sortedDates = Object.keys(groupedPreferences).sort((a, b) =>
    dayjs(a).isBefore(dayjs(b)) ? -1 : 1
  );

  return (
    <div className="flex flex-col min-h-screen p-4 items-center w-full max-w-sm mx-auto pb-24">
      {/* Savings Goals Section */}
      <div className="w-full mb-6">
        <SavingsGoals />
      </div>
      
      {/* AI Recommendations Section */}
      <div className="w-full mb-6">
        <AIRecommendations />
      </div>
      
      {/* Financial Literacy Section */}
      <div className="w-full mb-6">
        <FinancialLiteracy />
      </div>
      
      {/* User Preferences Section */}
      <div className="w-full mb-6">
        <HeadingMedium className="text-gray-800 font-semibold mb-4">My Preferences</HeadingMedium>
        {sortedDates.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <p className="text-gray-500 text-sm">No preferences added yet. Tap the button below to add one!</p>
          </div>
        ) : (
          <div className="w-full">
            {sortedDates.map((date) => (
              <div key={date} className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  {dayjs(date).format("MMMM D, YYYY")}
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-4 rounded-xl mb-2 shadow-sm border border-gray-200 gap-4"
                >
              <div className="gap-4 flex flex-col">
                {groupedPreferences[date].map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-1 mt-1"
                  >
                    <p className="text-gray-700 truncate w-4/5 text-sm ">
                      {item.text}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => editPreferencesById(item.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => deletePreferencesById(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </motion.div>
            </div>
          ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center max-w-sm mx-auto px-4">
        <Button
          onClick={() => {
            // Reset editing state when adding a new preference
            setEditingId(null);
            setNewPreference("");
            setIsDrawerOpen(true);
          }}
          shape={SHAPE.pill}
          size={SIZE.large}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold w-full shadow-sm"
        >
          Add a New Preference
        </Button>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingId(null);
          setNewPreference("");
        }}
        anchor={ANCHOR.bottom}
        size="auto"
      >
        <div className="p-4 overflow-y-auto">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar", "DateCalendar"]}>
              <DemoItem label="Select Date">
                <DateCalendar
                  value={calendarValue}
                  onChange={(newValue) => setCalendarValue(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Textarea
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            placeholder="Write your preference..."
            overrides={{
              Input: {
                style: {
                  height: "50px",
                  resize: "vertical",
                },
              },
            }}
          />
          <div className="flex gap-4 w-full pt-4">
            <Button
              onClick={() => {
                setIsDrawerOpen(false);
                setEditingId(null);
                setNewPreference("");
              }}
              shape={SHAPE.pill}
              size={SIZE.compact}
              className=" text-white flex-1 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={addPreference}
              shape={SHAPE.pill}
              size={SIZE.compact}
              className="bg-green-400 text-white flex-1 text-sm"
            >
              Done
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default withLayout(Preferences);
