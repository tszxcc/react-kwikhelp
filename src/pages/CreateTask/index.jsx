import React, { useState } from "react";

import Textfield from "../../components/formik/textfield";
import { useFormik } from "formik";
import Cardbackground from "../../components/cardbackground";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import apiService from "../../services/apiService";

export default function CreateTask() {
  const title = ["Professional Help", "Task Schedule", "Task Review"];
  const [step, setStep] = useState(1);
  const navigateTo = useNavigate();

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
        return;
      }

      //when success
      navigateTo("/task");
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      taskDescription: "",
      taskArea: "",
      thingsToBring: "",
      nickname: "",
      additionalInfo: "",
      taskDate: "",
      startTime: "",
      endTime: "",
      budget: "",
    },
    onSubmit: async (values) => {
      await submitTask(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Cardbackground>
        <div className="text-center font-bold font-xl text-xl py-3 mb-4">
          {title[step - 1]}
        </div>

        {step === 1 && (
          <div className="flex justify-center align-center my-5 mx-3 gap-[10%]">
            <div className="w-[45%] px-[10%]">
              <select>
                {serviceOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Textfield
                id="taskDescription"
                name="taskDescription"
                label="Description"
                value={values.taskDescription}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
              <Textfield
                id="taskArea"
                name="taskArea"
                label="Area"
                value={values.taskArea}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
              <Textfield
                id="thingsToBring"
                name="thingsToBring"
                label="Thing/s to bring"
                value={values.thingsToBring}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="w-[45%] px-[10%]">
              <Textfield
                id="nickname"
                name="nickname"
                label="Name"
                value={values.nickname}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
              <Textfield
                id="additionalInfo"
                name="additionalInfo"
                label="Additional Info"
                value={values.additionalInfo}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex justify-center align-center my-5 mx-3 gap-[10%]">
            <div className="w-[45%] px-[10%]">
              <Textfield
                id="taskDate"
                name="taskDate"
                label="Date"
                value={values.taskDate}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />

              {/* <Calendar /> */}
              <Textfield
                id="budget"
                name="budget"
                label="Budget"
                value={values.budget}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
            </div>

            <div className="w-[45%] px-[10%]">
              <Textfield
                id="startTime"
                name="startTime"
                label="From time"
                value={values.startTime}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
              <Textfield
                id="endTime"
                name="endTime"
                label="To time"
                value={values.endTime}
                onChange={handleChange}
                touched={touched}
                error={errors}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex justify-center">
            <div className="flex w-[70%] gap-12">
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
                  <div className="mb-4">Type: {}</div>
                  <div className="mb-4">
                    Optional Details: {values.taskDescription}
                  </div>
                  <div className="mb-4">Name: {values.nickname}</div>
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
                  <div className="mb-2">Estimated Budget: {values.budget}</div>
                  <div className="mb-4">*Can be discussed afterwards</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mx-[40%] mt-12">
          {step < 3 && (
            <Button
              buttonText={"Next"}
              onClick={(e) => {
                e.preventDefault();
                setStep(step + 1);
              }}
              buttonType={"normal"}
            />
          )}
          {step === 3 && <Button buttonText={"Submit"} buttonType={"submit"} />}
        </div>
      </Cardbackground>
    </form>
  );
}
