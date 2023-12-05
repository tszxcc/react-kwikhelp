import React from "react";

import Cardbackground from "../../components/cardbackground";
// import Select from "react-select";
import Select from "../../components/select";
import { Formik, Form } from "formik";
import Textfield from "../../components/formik/textfield";
import Button from "../../components/button";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function CreateTask(errors) {
  const options = [
    { value: "jack", label: "Jack" },
    { value: "rose", label: "Rose" },
    { value: "titanic", label: "Titanic" },
  ];

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
  };

  return (
    <>
      <Formik>
        <div className="w-[55%] self-center">
          <Cardbackground>
            <Form>
              <div className="flex flex-col items-center">
                <div className="flex flex-col">
                  <h1 className="text-3xl text-center mb-4">Create Task</h1>
                </div>
                <div className="flex my-8">
                  <div className="mr-12">
                    <div>
                      <Select
                        label="Select your service:"
                        options={options}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Textfield
                        as="input"
                        type="text"
                        label="Name: "
                        name="name"
                        placeholder="Enter your name"
                        className="input "
                        //   onChange={handleChange}
                        errors={errors}
                      />
                    </div>

                    <div>
                      <Select
                        label="Task Area:"
                        options={options}
                        onChnage={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <Textfield
                        as="input"
                        type="text"
                        label="Things to Bring(Optional): "
                        name="name"
                        placeholder="Enter your name"
                        className="input "
                        //   onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Textfield
                        as="input"
                        type="text"
                        label="Your Name(Optional): "
                        name="name"
                        placeholder="Enter your name"
                        className="input "
                        //   onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <Textfield
                        as="input"
                        type="text"
                        label="Additional Info(Optional): "
                        name="name"
                        placeholder="Enter your name"
                        className="input "
                        //   onChange={handleChange}
                        errors={errors}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="mr-2">
                  <Button
                    buttonText="Back"
                    buttonType="back"
                    icon={faAngleLeft}
                  />
                </div>

                <Button
                  buttonText="Next"
                  buttonType="submit"
                  icon={faAngleRight}
                  className="flex-row-reverse"
                />
              </div>
            </Form>
          </Cardbackground>
        </div>
      </Formik>
    </>
  );
}
