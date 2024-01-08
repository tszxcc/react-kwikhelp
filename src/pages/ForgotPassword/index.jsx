import React from "react";
import Cardbackground from "../../components/cardbackground";
import Textfield from "../../../src/components/formik/textfield";
import Button from "../../components/button";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import wordlogo from "../../assets/images/logo-text.png";
import forgotpass from "../../assets/images/forgotpass.svg";
import { faAt } from "@fortawesome/free-solid-svg-icons";

import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(errors, handleChange) {
  const navigateTo = useNavigate();

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
      >
        <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] mx-auto">
          <Cardbackground>
            <div className="flex flex-col items-center p-[7.5%] pb-[2%]">
              <div className="flex flex-col">
                <img src={wordlogo} className="mb-5 self-center w-24"></img>
                <img src={forgotpass} className="h-52"></img>
                <h1 className="text-3xl text-center my-4">Forgot Password</h1>
                <p className="mb-4">
                  Enter the username associated with your account and we’ll send
                  you a link to reset your password.
                </p>
              </div>
              <Formik>
                {({ values, touched, errors, handleChange, handleSubmit }) => (
                  <>
                    <div className="mt-2 w-full flex justify-center">
                      <Form className="w-full">
                        <Textfield
                          // as="input"
                          type="text"
                          label="Username:"
                          // name="username"
                          placeholder="Username"
                          className="input "
                          onChange={handleChange}
                          errors={errors}
                          icon={faAt}
                          value={values}
                        />
                      </Form>
                    </div>
                    <div className="w-full mt-2">
                      <Button buttonText="Continue" buttonType="default" />
                    </div>
                  </>
                )}
              </Formik>
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
      </div>
    </>
  );
}
