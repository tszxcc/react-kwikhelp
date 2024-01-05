import React from "react";

export default function Taskhistorymenu({ onItemClick, activeItem }) {
  const menuItems = [
    "Available Tasks",
    "Pending Accept",
    "In Progress",
    "Completed",
  ];

  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 mb-4">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer menu-item transition-colors duration-300 text-sm md:text-base ${
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
