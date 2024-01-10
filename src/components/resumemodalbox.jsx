import React, { useState, useEffect } from "react";
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
import apiService from "../services/apiService";

export default function ResumeModalbox(props) {
  const { isOpen, setIsOpen, helper } = props;
  const [isProfilePicExist, setIsProfilePicExist] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  async function getProfilePic() {
    const response = await apiService.getProfilePicOther(helper);
    if (response.status === 200) {
      setIsProfilePicExist(true);
    }
  }

  async function getUserProfile() {
    const response = await apiService.getProfileOther(helper);
    if (response.status === 200) {
      setUserProfile(response.data);
    }
  }

  useEffect(() => {
    getProfilePic();
    getUserProfile();
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex justify-center items-center"
          onClick={() => setIsOpen()}
        >
          <div
            className="relative bg-white border-solid border-4 border-[#CFF2F6] rounded-xl w-80 md:w-96 overflow-hidden"
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

            <div className="flex flex-col items-center p-4">
              <img
                src={
                  isProfilePicExist
                    ? `https://kwikhelp.bryanc12.net/api/profile/image/${helper}`
                    : sampleImage
                }
                alt="Profile Pic"
                className="w-24 h-24 rounded-full object-cover cursor-pointer z-10"
              />
              <div className="flex items-center gap-4 mt-4">
                <div className="text-center">
                  <div>{userProfile?.username}</div>
                  <div className="text-[#7EA6F4]">{userProfile?.fullName}</div>
                </div>
                <FontAwesomeIcon
                  icon={faFileLines}
                  size="xl"
                  className="text-[#44558F] cursor-pointer"
                  onClick={() => {
                    window.open(
                      `https://kwikhelp.bryanc12.net/api/profile/resume/${helper}`,
                      "_blank"
                    );
                  }}
                />
              </div>
              <div className="my-4">{userProfile?.description}</div>
              <div className="my-4 z-10">
                <div className="flex items-center gap-4 cursor-pointer">
                  <div className="flex justify-center items-center rounded-full bg-[#44558F] w-8 h-8">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                  </div>
                  <div> {userProfile?.email}</div>
                </div>
                <div className="my-2">
                  <div className="flex items-center gap-4 cursor-pointer">
                    <div className="flex justify-center items-center rounded-full bg-[#44558F] w-8 h-8">
                      <FontAwesomeIcon icon={faPhone} className="text-white" />
                    </div>
                    {userProfile?.phone}
                    <div></div>
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
