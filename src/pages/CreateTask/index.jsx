import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
import Select from "react-select";
import Modalbox from "../../components/modalbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default function CreateTask() {
  const { serviceType } = useParams();
  const title = ["Professional Help", "Task Schedule", "Task Review"];
  const [step, setStep] = useState(1);
  const navigateTo = useNavigate();
  const [openCalendar, setOpenCalendar] = useState(false);

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
  const serviceOptions = [
    { value: "laundry_help", label: "Laundry Help" },
    { value: "furniture_assembly", label: "Furniture Assembly" },
    { value: "translation", label: "Translation" },
    { value: "help_moving", label: "Help Moving" },
    { value: "heavy_lifting", label: "Heavy Lifting" },
    { value: "furniture_installation", label: "Furniture Installation" },
    { value: "electric_repair", label: "Electric Repair" },
    { value: "minor_plumbing_repair", label: "Minor Plumbing Repair" },
    { value: "draw_and_design", label: "Draw and Design" },
    { value: "grocery_shopping", label: "Grocery Shopping" },
    { value: "copywriting", label: "Copywriting" },
    { value: "pet_care", label: "Pet Care" },
    { value: "personal_assistant", label: "Personal Assistant" },
    { value: "story_writing", label: "Story Writing" },
  ];

  const timeOptions = [
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "12:30 PM", label: "12:30 PM" },
    { value: "1:00 PM", label: "1:00 PM" },
    { value: "1:30 PM", label: "1:30 PM" },
    { value: "2:00 PM", label: "2:00 PM" },
    { value: "2:30 PM", label: "2:30 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "3:30 PM", label: "3:30 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "4:30 PM", label: "4:30 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
    { value: "5:30 PM", label: "5:30 PM" },
    { value: "6:00 PM", label: "6:00 PM" },
    { value: "6:30 PM", label: "6:30 PM" },
    { value: "7:00 PM", label: "7:00 PM" },
    { value: "7:30 PM", label: "7:30 PM" },
    { value: "8:00 PM", label: "8:00 PM" },
  ];

  const submitTask = async (values) => {
    try {
      const response = await apiService.submitTask(values);
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

  const serviceLabel = serviceOptions.find((obj) => obj.value === serviceType);

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        serviceType: serviceLabel?.label || "",
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
      // validateOnChange: true,
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
    <>
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
                  <div className="mb-4 flex flex-col">
                    <label
                      htmlFor="selectlabel"
                      className="text-gray-700 text-lg mb-2"
                    >
                      Service Type*
                    </label>

                    <div>
                      <Select
                        id="serviceType"
                        name="serviceType"
                        onChange={(option) => {
                          setFieldValue("serviceTypeOption", option);
                          setFieldValue("serviceType", option.label);
                        }}
                        value={values?.serviceTypeOption}
                        options={serviceOptions}
                        defaultValue={serviceOptions.find(
                          (obj) => obj.value === serviceType
                        )}
                      />
                    </div>
                  </div>

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
                  {/* Date */}
                  <Modalbox isOpen={openCalendar} setIsOpen={setOpenCalendar}>
                    <Calendar
                      value={values.taskDate}
                      onChange={(date) => {
                        const dateString = new Date(date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        );
                        setFieldValue("taskDate", dateString);
                        setOpenCalendar(false);
                      }}
                    />
                  </Modalbox>
                  <div className="mb-4 flex flex-col">
                    <label
                      htmlFor="taskDate"
                      className="text-gray-700 text-lg mb-2"
                    >
                      Task Date
                    </label>
                    <div
                      className={`flex items-center px-3 p-2 focus:outline-none w-full md:w-[100%] border rounded-lg duration-300`}
                      onClick={() => setOpenCalendar(true)}
                    >
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-[#7EA6F4] pr-3"
                      />
                      <input
                        className="flex-1 focus:outline-none"
                        readOnly={true}
                        value={values.taskDate}
                      />
                    </div>
                  </div>

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
                  <div className="mb-4 flex flex-col">
                    <label
                      htmlFor="selectlabel"
                      className="text-gray-700 text-lg mb-2"
                    >
                      Start Time*
                    </label>

                    <div>
                      <Select
                        id="startTime"
                        name="startTime"
                        onChange={(option) => {
                          setFieldValue("startTimeOption", option);
                          setFieldValue("startTime", option.value);
                        }}
                        value={values?.startTimeOption}
                        options={timeOptions}
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label
                      htmlFor="selectlabel"
                      className="text-gray-700 text-lg mb-2"
                    >
                      Start Time*
                    </label>

                    <div>
                      <Select
                        id="endTime"
                        name="endTime"
                        onChange={(option) => {
                          setFieldValue("endTimeOption", option);
                          setFieldValue("endTime", option.value);
                        }}
                        value={values?.endTimeOption}
                        options={timeOptions}
                      />
                    </div>
                  </div>
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
    </>
  );
}
