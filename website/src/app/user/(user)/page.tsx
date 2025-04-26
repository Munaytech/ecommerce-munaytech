import React from "react";

const page = () => {
  return (
    <div className="w-72 p-6 bg-white rounded-2xl shadow-sm">
      <div className="text-xs text-gray-400 font-semibold mb-4">DASHBOARD</div>

      <ul className="space-y-4">
        <li className="flex items-center justify-between text-red-500 font-semibold">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🛍️</span>{" "}
            {/* Puedes cambiar a un ícono real */}
            <span>Orders</span>
          </div>
          <span>5</span>
        </li>
        <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🤍</span>
            <span>Wishlist</span>
          </div>
          <span>19</span>
        </li>
        <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎧</span>
            <span>Support Tickets</span>
          </div>
          <span>1</span>
        </li>
      </ul>

      <div className="text-xs text-gray-400 font-semibold mt-8 mb-4">
        ACCOUNT SETTINGS
      </div>

      <ul className="space-y-4">
        <li className="flex items-center text-gray-500 hover:text-black transition space-x-2">
          <span className="text-xl">👤</span>
          <span>Profile Info</span>
        </li>
        <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📍</span>
            <span>Addresses</span>
          </div>
          <span>16</span>
        </li>
        <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💳</span>
            <span>Payment Methods</span>
          </div>
          <span>4</span>
        </li>
      </ul>
    </div>
  );
};

export default page;
