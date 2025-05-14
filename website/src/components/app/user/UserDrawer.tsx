"use client";

import Navigation from "@/app/user/(user)/Navigation";
import React from "react";

interface UserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default UserDrawer;
