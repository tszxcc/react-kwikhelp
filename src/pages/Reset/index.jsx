import React from "react";
import { useSearchParams } from "react-router-dom";

import apiService from "../../services/apiService";

import Cardbackground from "../../components/cardbackground";
import Textfield from "../../../src/components/formik/textfield";
import Button from "../../components/button";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import wordlogo from "../../assets/images/logo-text.png";
import forgotpass from "../../assets/images/forgotpass.svg";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigateTo = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const handleSubmitReset = async (values, { resetForm }) => {
    try {
      values = { ...values, token: resetToken };
      const res = await apiService.resetPassword(values);
      if (res.status === 200) {
        await Swal.fire({
          title: "Success!",
          text: "Password updated successfully.",
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
        className="bg-[image:var(--landingBubble)] bg-cover bg-center h-conten"
      >
        <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] mx-auto">
          <Cardbackground>
            <div className="flex flex-col items-center p-[7.5%] pb-[2%]">
              <div className="flex flex-col">
                <img src={wordlogo} className="mb-5 self-center w-24"></img>
                <img src={forgotpass} className="h-52"></img>
                <h1 className="text-3xl text-center my-4">Reset Password</h1>
                <p className="mb-4">
                  Please enter new password and confirm password for your
                  account.
                </p>
              </div>
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                onSubmit={async (values, { resetForm }) =>
                  await handleSubmitReset(values, { resetForm })
                }
              >
                {({ values, touched, errors, handleChange, handleSubmit }) => (
                  <>
                    <div className="mt-2 w-full flex justify-center">
                      <Form className="w-full">
                        <Textfield
                          id="password"
                          label="Password:"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          errors={errors}
                          icon={faLock}
                          value={values.password}
                          touched={touched}
                          type="password"
                        />
                        <Textfield
                          id="confirmPassword"
                          label="Confirm Password:"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                          errors={errors}
                          icon={faLock}
                          value={values.confirmPassword}
                          touched={touched}
                          type="password"
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
            </div>
          </Cardbackground>
        </div>
      </div>
    </>
  );
}
