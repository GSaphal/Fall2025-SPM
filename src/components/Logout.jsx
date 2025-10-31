import { Button } from "baseui/button";
import { signOut, auth } from "../firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
export function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </Button>
  );
}
