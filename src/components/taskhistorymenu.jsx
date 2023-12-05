import React from "react";

export default function taskhistorymenu({ onItemClick, activeItem }) {
  const menuItems = [
    "Task Request",
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled",
  ];

  return (
    <div className="flex justify-center items-center gap-8 mb-8">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer menu-item transition-colors duration-300 ${
            activeItem === item ? "text-[#7EA6F4]" : "hover:text-[#7EA6F4]"
          }`}
          onClick={() => onItemClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
