import React from "react";

import apiService from "../../services/apiService";

import Cardbackground from "../../components/cardbackground";
import Textfield from "../../../src/components/formik/textfield";
import Button from "../../components/button";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import wordlogo from "../../assets/images/logo-text.png";
import forgotpass from "../../assets/images/forgotpass.svg";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigateTo = useNavigate();

  const handleForgotSubmit = async (values, { resetForm }) => {
    try {
      const res = await apiService.requestRecover(values.username);
      if (res.status === 200) {
        await Swal.fire({
          title: "Success!",
          text: "Please check your email for the reset link.",
          icon: "success",
          confirmButtonText: "Ok",
        });

        navigateTo("/login");
        return;
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "Ok",
      });

      resetForm();
      return;
    }
  };

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center h-content"
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
              <Formik
                initialValues={{ username: "" }}
                onSubmit={async (values, { resetForm }) =>
                  await handleForgotSubmit(values, { resetForm })
                }
              >
                {({ values, touched, errors, handleChange, handleSubmit }) => (
                  <>
                    <div className="mt-2 w-full flex justify-center">
                      <Form className="w-full">
                        <Textfield
                          id="username"
                          label="Username:"
                          name="username"
                          placeholder="Username"
                          onChange={handleChange}
                          errors={errors}
                          icon={faAt}
                          value={values.username}
                          touched={touched}
                        />
                      </Form>
                    </div>
                    <div className="w-full mt-2">
                      <Button
                        buttonText="Continue"
                        buttonType="default"
                        onClick={handleSubmit}
                      />
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
