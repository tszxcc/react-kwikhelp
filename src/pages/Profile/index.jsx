import { useFormik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cardbackground from "../../components/cardbackground";
import Textfield from "../../components/formik/textfield";
import Button from "../../components/button";
import { userSchema } from "../../validation/validationProfile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faAt,
  faIdCardClip,
  faPhone,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import sampleImage from "../../assets/images/sampleImage.jpg";
import homeBubble from "../../assets/images/homepage-bg-bubble.svg";

import apiService from "../../services/apiService";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(sampleImage);
  const navigateTo = useNavigate();

  const handleFileUpload = () => {
    // Trigger the file input click event when the camera icon is clicked
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    // Handle the selected image here, you can use this to upload and display the new profile picture
    const selectedImage = e.target.files[0];

    // only JPG and PNG type allowed
    if (selectedImage.type.substr(0, 5) !== "image") {
      alert("Only JPG and PNG type allowed");
      return;
    }

    setProfilePicture(URL.createObjectURL(selectedImage));
    // Update the profile picture with the selected image

    console.log("Selected image:", selectedImage);
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      name: "",
      description: "",
      phoneNumber: "",
      email: "",
    },

    validationSchema: userSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  async function getAllProfile() {
    const response = await apiService.getAllProfile();
    console.log(response);
  }

  useEffect(() => {
    getAllProfile();
  }, []);

  return (
    <div
      style={{ "--landingBubble": `url(${homeBubble})` }}
      className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
    >
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <div className="w-full md:w-[50%] lg:w-[35%] mx-auto">
          <Cardbackground>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile Pic"
                  className="w-24 h-24 rounded-full object-cover cursor-pointer"
                  onClick={handleFileUpload}
                ></img>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <div className="absolute bottom-0 right-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer drop-shadow-lg">
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="text-[#7EA6F4]"
                      onClick={handleFileUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <Textfield
                  id="name"
                  label="Name: "
                  name="name"
                  value={values.name}
                  placeholder="Enter your name"
                  // className="input "
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                  icon={faIdCardClip}
                />

                <Textfield
                  id="description"
                  label="Description: "
                  name="description"
                  value={values.description}
                  placeholder="About me"
                  // className="input "
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                  icon={faPencil}
                />

                <Textfield
                  id="phoneNumber"
                  label="Phone Number: "
                  name="phoneNumber"
                  value={values.phoneNumber}
                  placeholder="Enter your phone number"
                  // className="input "
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                  icon={faPhone}
                />

                <Textfield
                  id="email"
                  label="Email: "
                  name="email"
                  value={values.email}
                  placeholder="Enter your email"
                  // className="input "
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                  icon={faAt}
                />

                <div>
                  <Button
                    buttonText="Cancel Changes"
                    buttonType="back"
                    className="rounded-md px-4 py-2 mt-6 mb-4"
                  />

                  <Button
                    buttonText="Save Changes"
                    buttonType={"submit"}
                    // buttonType="default"
                    className="bg-[#7EA6F4] text-white rounded-md px-4 py-2 mt-4"
                    // onClick={() => navigateTo("/")}
                  />
                </div>
              </div>
            </div>
          </Cardbackground>
        </div>
      </form>
    </div>
  );
}
