import React, { useState } from "react";
import Cardbackground from "../../components/cardbackground";
import Textfield from "../../../src/components/formik/textfield";
import Button from "../../components/button";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import wordlogo from "../../assets/images/logo-text.png";

import apiService from "../../services/apiService";
import * as Yup from "yup";
import Swal from "sweetalert2";

import {
  faAt,
  faIdCardClip,
  faLock,
  faPhone,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigateTo = useNavigate();
  const [isPersonal, setIsPersonal] = useState(true);

  const registerSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        const response = await apiService.submitRegister({
          ...values,
          role: isPersonal ? "user" : "helper",
        });
        if (response.status === 200) {
          if (!isPersonal) {
            // If signup is successful, redirect to another page
            navigateTo("/resume");
          } else {
            Swal.fire({
              type: "success",
              title: "Registered successfully",
              text: "Let's complete your profile!",
            });
            navigateTo("/profile");
          }
          return;
        }

        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Please complete mandatory fields!",
        });
      } catch (error) {
        // Handle API request error
        console.error("API request failed:", error);
      }
    },
  });

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center"
      >
        <form className="" onSubmit={handleSubmit}>
          <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] mx-auto">
            <Cardbackground>
              <div className="flex flex-col items-center p-[7.5%] pb-[2%]">
                <div className="flex flex-col">
                  <img src={wordlogo} className="mb-5 self-center w-24"></img>
                  <div className="border-2 rounded-full border-[#CFF2F6] p-[3px] flex align-center w-full h-fit relative cursor-pointer">
                    <div
                      className={
                        isPersonal
                          ? "bg-[#7EA6F4] w-[50%] h-[calc(100%-6px)] rounded-full duration-300 absolute z-10"
                          : "bg-[#7EA6F4] w-[50%] h-[calc(100%-6px)] ml-[calc(50%-6px)] rounded-full duration-300 absolute z-10"
                      }
                    />
                    <div
                      onClick={() => setIsPersonal(true)}
                      className={
                        isPersonal
                          ? "text-center w-[50%] p-[5px] font-medium relative duration-300 z-20 text-white"
                          : "text-center w-[50%] p-[5px] font-medium relative duration-300 z-20 text-[#7EA6F4]"
                      }
                    >
                      Personal
                    </div>
                    <div
                      onClick={() => setIsPersonal(false)}
                      className={
                        isPersonal
                          ? "text-center w-[50%] p-[5px] font-medium relative duration-300 z-20 text-[#7EA6F4]"
                          : "text-center w-[50%] p-[5px] font-medium relative duration-300 z-20 text-white"
                      }
                    >
                      Helper
                    </div>
                  </div>

                  <h1 className="text-3xl text-center my-4 duration-300">
                    {isPersonal ? "Sign Up As Personal" : "Sign Up As Helper"}
                  </h1>
                </div>
                <div className="mt-2 w-full flex justify-center">
                  <div className="w-full">
                    <Textfield
                      id="username"
                      label="Username: "
                      name="username"
                      placeholder="Username"
                      // className="input "
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faIdCardClip}
                      value={values.username}
                    />

                    <Textfield
                      id="email"
                      label="Email Address: "
                      name="email"
                      placeholder="Email address"
                      // className="input "
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faAt}
                      value={values.email}
                    />

                    <Textfield
                      id="phoneNumber"
                      label="Phone Number: "
                      name="phoneNumber"
                      placeholder="Phone Number"
                      // className="input "
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faPhone}
                      value={values.phoneNumber}
                    />

                    <Textfield
                      id="password"
                      label="Password: "
                      name="password"
                      placeholder="Password"
                      // className="input "
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faLock}
                      value={values.password}
                    />

                    <Textfield
                      id="confirmPassword"
                      label="Confirm password: "
                      name="confirmPassword"
                      placeholder="Confirm password"
                      // className="input "
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faUserLock}
                      value={values.confirmPassword}
                    />
                  </div>
                </div>
                <div className="w-full mt-2">
                  <Button buttonText="Continue" buttonType="default" />
                </div>
                <div className="flex mt-4">
                  {/* <button
                  className="text-[#7EA6F4] text-sm hover:text-[#A8C2F7]"
                  onClick={() => navigateTo("/signup")}
                >
                  Sign Up
                </button> */}
                </div>
              </div>
            </Cardbackground>
          </div>
        </form>
      </div>
    </>
  );
}
