import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { faAt, faLock, faWifiStrong } from "@fortawesome/free-solid-svg-icons";

import Cardbackground from "../../components/cardbackground";
import Textfield from "../../../src/components/formik/textfield";
import Button from "../../../src/components/button";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import wordlogo from "../../assets/images/logo-text.png";
import login from "../../assets/images/login.svg";

import apiService from "../../services/apiService";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Login() {
  const navigateTo = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        const response = await apiService.loginService(values);

        if (response.status === 200) {
          // If login is successful, redirect to the dashboard or another page
          if (response.data === "admin") navigateTo("/admin");
          else if (response.data === "helper") navigateTo("/searchtask");
          else navigateTo("/");
          return;
        }

        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Username or password is incorrect!",
          footer: "Please try again",
        });
        return;
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
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] mx-auto">
            <Cardbackground>
              <div className="flex flex-col items-center p-[7.5%] pb-[2%]">
                <div className="flex flex-col">
                  <img src={wordlogo} className="mb-5 self-center w-24"></img>
                  <img src={login} className="h-52"></img>
                  <h1 className="text-3xl text-center my-10">Welcome Back</h1>
                </div>
                <div className="mt-2 w-full flex justify-center">
                  <div className="w-full">
                    <Textfield
                      id="username"
                      label="Username: "
                      name="username"
                      value={values.username}
                      placeholder="Username"
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faAt}
                    />

                    <Textfield
                      id="password"
                      label="Password: "
                      name="password"
                      value={values.password}
                      placeholder="Password"
                      onChange={handleChange}
                      touched={touched}
                      errors={errors}
                      icon={faLock}
                    />
                  </div>
                </div>
                <div className="w-full text-left my-4">
                  <div
                    className="text-[#7EA6F4] font-bold text-sm hover:text-[#A8C2F7]"
                    onClick={() => navigateTo("/forgotpassword")}
                  >
                    Forgot Password?
                  </div>
                </div>
                <div className="w-full">
                  <Button buttonText="Login" buttonType="submit" />
                </div>
                <div className="flex mt-4">
                  <div className="mr-4 text-sm sm:text-base">
                    Don't have an account?
                  </div>
                  <button
                    className="text-[#7EA6F4] text-sm hover:text-[#A8C2F7]"
                    onClick={() => navigateTo("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </Cardbackground>
          </div>
        </form>
      </div>
    </>
  );
}
