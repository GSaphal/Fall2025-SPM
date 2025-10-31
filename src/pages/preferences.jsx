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
    <div className="flex flex-col min-h-screen p-4 items-center w-full max-w-xs mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-green-500">
        Preferences
      </h1>
      <div className="w-full">
        {sortedDates.map((date) => (
          <div key={date} className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              {dayjs(date).format("MMMM D, YYYY")}
            </h2>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-100 p-3 rounded-lg mb-2 shadow-md border-l-4 border-green-400 gap-4"
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
      <div className="fixed bottom-0 w-full flex justify-center">
        <Button
          onClick={() => {
            // Reset editing state when adding a new preference
            setEditingId(null);
            setNewPreference("");
            setIsDrawerOpen(true);
          }}
          shape={SHAPE.pill}
          size={SIZE.large}
          className="bg-green-500 text-white w-70 relative bottom-25"
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
              className="bg-green-500 text-white flex-1 text-sm"
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
