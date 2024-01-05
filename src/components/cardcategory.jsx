import React from "react";
import imageUrl from "../assets/images/logo.png";
import categoryImages from "../pages/Homepage/cardImages";

export default function cardcategory({ title, imageUrl, body, onClick }) {
  return (
    //card-container
    <div
      className="bg-[#f5f5f5] overflow-hidden shadow-[0_0_10px_-4px] duration-200 rounded-lg hover:scale-1.1 hover:shadow-[0_0_14px_-3px]"
      onClick={onClick}
    >
      <div className="">
        <img src={imageUrl} className="overflow-hidden w-full" alt="" />
      </div>

      <div className="mt-0.5 m-4 sm:mt-1 md:mt-2 lg:mt-3 flex flex-col items-center leading-6">
        <div className="font-bold">
          <h3 className="m-0 p-0">{title}</h3>
        </div>

        <div className="leading-7 break-normal">
          <p className="m-0 p-0">{body}</p>
        </div>
      </div>
    </div>
  );
}
