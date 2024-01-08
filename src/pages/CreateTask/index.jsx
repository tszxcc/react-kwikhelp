import React, { useState } from "react";

import Textfield from "../../components/formik/textfield";
import { useFormik } from "formik";
import Cardbackground from "../../components/cardbackground";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import apiService from "../../services/apiService";
import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function CreateTask() {
  const title = ["Professional Help", "Task Schedule", "Task Review"];
  const [step, setStep] = useState(1);
  const navigateTo = useNavigate();

  const taskSchema = Yup.object().shape({
    serviceType: Yup.string().required(),
    taskDescription: Yup.string().required(),
    taskArea: Yup.string().required(),
    thingsToBring: Yup.string().required(),
    username: Yup.string().required(),
    additionalInfo: Yup.string(),
    taskDate: Yup.string().required(),
    startTime: Yup.string().required(),
    endTime: Yup.string().required(),
    budget: Yup.string().required(),
  });

  // Only re-rendered if serviceOptions changes
  const [serviceOptions, setServiceOptions] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ]);

  const submitTask = async (values) => {
    const data = {
      ...values,
    };
    try {
      const response = await apiService.submitTask(data);
      // when error
      if (!response) {
        //if error stop here
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Please complete mandatory fields!",
        });
        return;
      }

      //when success
      navigateTo("/taskhistory");
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      serviceType: "",
      taskDescription: "",
      taskArea: "",
      thingsToBring: "",
      username: "",
      additionalInfo: "",
      taskDate: "",
      startTime: "",
      endTime: "",
      budget: "",
    },

    validationSchema: taskSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      await submitTask(values);
      Swal.fire({
        title: "Your task submitted successfully!",
        text: "You can view your requested task in Task History",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
  });

  return (
    <div
      style={{ "--landingBubble": `url(${homeBubble})` }}
      className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
    >
      <form onSubmit={handleSubmit}>
        <Cardbackground>
          <div className="text-center font-bold font-xl text-xl py-3 mb-4">
            {title[step - 1]}
          </div>

          {step === 1 && (
            <div className="flex flex-col md:flex-row justify-center my-5 mx-3 gap-6">
              <div className="w-full md:w-1/2">
                {/* <select>
                  {serviceOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> */}

                <Textfield
                  id="serviceType"
                  name="serviceType"
                  label="Service Type*"
                  value={values.serviceType}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />

                <Textfield
                  id="taskDescription"
                  name="taskDescription"
                  label="Description*"
                  value={values.taskDescription}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
                <Textfield
                  id="taskArea"
                  name="taskArea"
                  label="Area*"
                  value={values.taskArea}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
                <Textfield
                  id="thingsToBring"
                  name="thingsToBring"
                  label="Thing/s to bring*"
                  value={values.thingsToBring}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Textfield
                  id="username"
                  name="username"
                  label="Name*"
                  value={values.username}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
                <Textfield
                  id="additionalInfo"
                  name="additionalInfo"
                  label="Additional Info"
                  value={values.additionalInfo}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col md:flex-row justify-center my-5 mx-3 gap-6">
              <div className="w-full md:w-1/2">
                <Textfield
                  id="taskDate"
                  name="taskDate"
                  label="Date* (MM/DD/YYYY)"
                  value={values.taskDate}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />

                {/* <Calendar /> */}
                <Textfield
                  id="budget"
                  name="budget"
                  label="Budget* (Please provide in full amount)"
                  value={values.budget}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </div>

              <div className="w-full md:w-1/2">
                <Textfield
                  id="startTime"
                  name="startTime"
                  label="From time* (11:00 AM)"
                  value={values.startTime}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
                <Textfield
                  id="endTime"
                  name="endTime"
                  label="To time* (12:00 PM)"
                  value={values.endTime}
                  onChange={handleChange}
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex justify-center">
              <div className="flex flex-col md:flex-row w-[70%] gap-12">
                <div className="flex-1">
                  <div className="flex justify-center gap-16">
                    <div className="font-bold">Job Details</div>
                    <button
                      className="text-[#7EA6F4] text-sm hover:text-[#A8C2F7]"
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="mb-4">Type: {values.serviceType}</div>
                    <div className="mb-4">
                      Optional Details: {values.taskDescription}
                    </div>
                    <div className="mb-4">Name: {values.username}</div>
                    <div className="mb-4">
                      Additional Info: {values.additionalInfo}
                    </div>
                  </div>
                </div>

                <div className="flex-1 ">
                  <div className="flex justify-center gap-16">
                    <div className="font-bold">Job Schedule</div>
                    <button
                      className="text-[#7EA6F4] text-sm hover:text-[#A8C2F7]"
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="mb-4">Date: {values.taskDate}</div>
                    <div className="mb-4">
                      Time: {values.startTime} - {values.endTime}
                    </div>
                    <div className="mb-2">
                      Estimated Budget: {values.budget}
                    </div>
                    <div className="mb-4">*Can be discussed afterwards</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-12">
            {step > 1 && (
              <div className="mr-4 w-[25%] md:w-[10%]">
                <Button
                  buttonText={"Back"}
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(step - 1);
                  }}
                  buttonType={"back"}
                />
              </div>
            )}
            {step < 3 && (
              <div className="w-[25%] md:w-[10%]">
                <Button
                  buttonText={"Next"}
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(step + 1);
                  }}
                  buttonType={"normal"}
                />
              </div>
            )}
            {step === 3 && (
              <div className="md:w-[15%]">
                <Button buttonText={"Submit"} buttonType={"submit"} />
              </div>
            )}
          </div>
        </Cardbackground>
      </form>
    </div>
  );
}
