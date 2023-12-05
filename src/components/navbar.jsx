import React from "react";
import logoImage from "../assets/images/logo.png";

export function Navbar() {
  const navOnClick = (nav) => {
    if (nav === "home") {
      window.location.href = "/";
    }

    if (nav === "taskHistory") {
      window.location.href = "/taskhistory";
    }

    if (nav === "profile") {
      window.location.href = "/profile";
    }

    if (nav === "signUp") {
      window.location.href = "/sign-up";
    }
  };

  return (
    <div className="bg-[#F5F5F5] px-10 py-2 flex justify-between">
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          navOnClick("home");
        }}
      >
        <img className="w-32" src={logoImage} alt="Kwikhelp" />
      </div>
      <div className="flex space-x-8 items-center text-[#7EA6F4]">
        <div
          className="hover:cursor-pointer duration-150 hover:mb-2 hover:border-b-[1.5px] border-[#7EA6F4]"
          onClick={() => {
            navOnClick("home");
          }}
        >
          Home
        </div>
        <div
          className="hover:cursor-pointer duration-150 hover:mb-2 hover:border-b-[1.5px] border-[#7EA6F4]"
          onClick={() => {
            navOnClick("taskHistory");
          }}
        >
          Task History
        </div>
        <div
          className="hover:cursor-pointer duration-150 hover:mb-2 hover:border-b-[1.5px] border-[#7EA6F4]"
          onClick={() => {
            navOnClick("profile");
          }}
        >
          Profile
        </div>
        <div
          className="hover:cursor-pointer duration-150 hover:mb-2 hover:border-b-[1.5px] border-[#7EA6F4]"
          onClick={() => {
            navOnClick("signUp");
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
