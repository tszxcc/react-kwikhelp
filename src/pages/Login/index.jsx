import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";

import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";

import Cardbackground from "../../components/cardbackground";
import Textfield from "../../../src/components/formik/textfield";
import Button from "../../../src/components/button";

import wordlogo from "../../assets/images/logo-text.png";
import login from "../../assets/images/login.svg";

export default function Login({ errors, values, handleChange }) {
  const navigateTo = useNavigate();

  return (
    <>
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <div className="w-[35%] self-center">
          <Cardbackground>
            <div className="flex flex-col items-center p-[7.5%] pb-[2%]">
              <div className="flex flex-col">
                <img src={wordlogo} className="mb-5 self-center w-24"></img>
                <img src={login} className="h-52"></img>
                <h1 className="text-3xl text-center my-10">Welcome Back</h1>
              </div>
              <div className="mt-2 w-full flex justify-center">
                <Form className="w-full">
                  <Textfield
                    label="Email: "
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    errors={errors}
                    icon={faAt}
                  />

                  <Textfield
                    label="Password: "
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    errors={errors}
                    icon={faLock}
                  />
                </Form>
              </div>
              <div className="w-full text-left my-4">
                <button
                  className="text-[#7EA6F4] font-bold text-sm hover:text-[#A8C2F7]"
                  onClick={() => navigateTo("/forgotpassword")}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="w-full">
                <Button
                  buttonText="Login"
                  buttonType="submit"
                  onClick={() => navigateTo("/")}
                />
              </div>
              <div className="flex mt-4">
                <div className="mr-4">Don't have an account?</div>
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
      </Formik>
    </>
  );
}
