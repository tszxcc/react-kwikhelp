import { useFormik } from "formik";
import { Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cardbackground from "../../components/cardbackground";
import Textfield from "../../components/formik/textfield";
import Button from "../../components/button";

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
import Swal from "sweetalert2";
import * as Yup from "yup";
import { layer } from "@fortawesome/fontawesome-svg-core";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(sampleImage);
  const navigateTo = useNavigate();

  const userSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    description: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().required(),
  });

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

  const [initialProfile, setInitialProfile] = useState(null);

  async function getProfile() {
    const response = await apiService.getProfile();
    setInitialProfile(response.data);
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function submitProfile(values) {
    const response = await apiService.updateProfile(values);
    Swal.fire({
      icon: "success",
      title: "Your profile has been saved",
      text: "You can now proceed to Homepage",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <div
      style={{ "--landingBubble": `url(${homeBubble})` }}
      className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
    >
      {initialProfile && (
        <>
          <Formik
            initialValues={{
              fullName: initialProfile?.fullName,
              description: initialProfile?.description,
              phone: initialProfile?.phone,
              email: initialProfile?.email,
            }}
            validationSchema={userSchema}
            onSubmit={(values) => {
              submitProfile(values);
            }}
          >
            {({ values, touched, errors, handleChange, handleSubmit }) => (
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
                          id="fullName"
                          label="Name: "
                          name="fullName"
                          value={values.fullName}
                          placeholder="Enter your full name"
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
                          id="phone"
                          label="Phone Number: "
                          name="phone"
                          value={values.phone}
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
            )}
          </Formik>
        </>
      )}
    </div>
  );
}
