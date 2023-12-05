import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFileLines,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import sampleImage from "../assets/images/sampleImage.jpg";
import backgroundImage from "../assets/images/resumebackground.svg";
import Button from "./button";

export default function Resumemodalbox(props) {
  const { isOpen, setIsOpen } = props;

  return (
    <>
      {isOpen && (
        <div
          className="flex justify-center items-center fixed top-0 left-0 w-full bg-black bg-opacity-70 h-screen z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white border-solid border-4 border-[#CFF2F6] rounded-xl w-1/5 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Image Overlay */}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* exit */}
            <div className="flex justify-end">
              <button className="p-2" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-[#7EA6F4]" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={sampleImage}
                alt="Profile Pic"
                className="w-24 h-24 rounded-full object-cover cursor-pointer z-10"
              ></img>

              <div className="flex items-center gap-4 mt-4">
                <div className="text-center">
                  <div>Bryan Jun</div>
                  <div className="text-[#7EA6F4]">Plumber, Kuantan</div>
                </div>
                <FontAwesomeIcon
                  icon={faFileLines}
                  size="xl"
                  className="text-[#44558F] cursor-pointer"
                />
              </div>

              <div className="my-4">A plumber with asdjaklsjdlkads....</div>

              <div className="my-4 z-10">
                <div className="flex items-center gap-4 cursor-pointer">
                  <div className="flex justify-center items-center rounded-full bg-[#44558F] w-8 h-8">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                  </div>
                  <div>bryanc12@gmail.com</div>
                </div>

                <div className="my-2">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <div className="flex justify-center items-center rounded-full bg-[#44558F] w-8 h-8">
                      <FontAwesomeIcon icon={faPhone} className="text-white" />
                    </div>
                    <div>012-3456789</div>
                  </div>
                </div>
              </div>

              <Button
                buttonType="back"
                buttonText="Back"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
