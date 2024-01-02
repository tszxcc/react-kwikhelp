import React, { useState } from "react";
import logoImage from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
      <div className="hidden md:flex space-x-8 items-center text-[#7EA6F4]">
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

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          {/* Add mobile menu icon */}
          <FontAwesomeIcon icon={faBars} className="text-[#7EA6F4]" />
        </button>
        {isMobileMenuOpen && (
          <div className="absolute top-14 right-0 bg-white border border-[#7EA6F4] rounded-md p-2">
            <div
              className="hover:cursor-pointer duration-150 hover:border-b-[1.5px] border-[#7EA6F4] text-[#7EA6F4] mb-2"
              onClick={() => {
                navOnClick("home");
              }}
            >
              Home
            </div>
            <div
              className="hover:cursor-pointer duration-150 hover:border-b-[1.5px] border-[#7EA6F4] text-[#7EA6F4] mb-2"
              onClick={() => {
                navOnClick("taskHistory");
              }}
            >
              Task History
            </div>
            <div
              className="hover:cursor-pointer duration-150 hover:border-b-[1.5px] border-[#7EA6F4] text-[#7EA6F4] mb-2"
              onClick={() => {
                navOnClick("profile");
              }}
            >
              Profile
            </div>
            <div
              className="hover:cursor-pointer duration-150 hover:border-b-[1.5px] border-[#7EA6F4] text-[#7EA6F4] mb-2"
              onClick={() => {
                navOnClick("signUp");
              }}
            >
              Sign Up
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
