import React, { useState, useEffect } from "react";

import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import Modalbox from "../modalbox";
import Button from "../button";

export default function InProgresscontent() {
  const [tasks, setTasks] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigateTo = useNavigate();

  async function getUserTask() {
    const response = await apiService.getUserTask();
    setTasks(response.data);
  }

  async function confirmTask(task) {
    await apiService.confirmTask(task._id);
    setConfirmModal(null);
    getUserTask();
  }

  async function handlePayment(task) {
    const response = await apiService.payTask(task._id, task.budget);
    const billId = response.data;
    if (billId) {
      const windowEvent = window.open(
        `https://www.billplz-sandbox.com/bills/${billId}`
      );

      const timer = setInterval(() => {
        if (windowEvent.closed) {
          clearInterval(timer);
          getUserTask();
        }
      }, 200);
    }
  }

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      {tasks.map((task, i) => {
        if (
          task.taskStatus === "Accepted" ||
          task.taskStatus === "Completed" ||
          task.taskStatus === "Confirmed"
        ) {
          return (
            <div
              id={task._id}
              className="flex flex-col md:flex-row items-center border-2 border-[#7EA6F4] rounded-lg justify-around md:p-2 p-4 mb-4"
              style={{ boxShadow: "0 2px 7px #D4D4D4" }}
              key={i}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-x-12">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  <div className="text-sm md:text-base">
                    {new Date(task.taskDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  <div className="text-sm md:text-base">{task.taskArea}</div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <div className="text-sm md:text-base">{task.startTime}</div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                  <div className="text-sm md:text-base">{task.budget}</div>
                </div>
              </div>

              <div className="md:mx-8">
                <div className="flex items-center p-4 md:p-8">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  <div className="text-sm md:text-base">{task.serviceType}</div>
                </div>
              </div>
              <div className="flex items-center justify-center md:mx-1 my-1 pt-4 text-[#7EA6F4]">
                {task.taskStatus === "Accepted" && (
                  <div className="mb-4">Pending Task...</div>
                )}
                {task.taskStatus === "Completed" && (
                  <Button
                    buttonText={"Confirm"}
                    onClick={() => setConfirmModal(task)}
                  />
                )}
                {task.taskStatus === "Confirmed" && (
                  <Button
                    buttonText={"Pay"}
                    buttonType={"pay"}
                    onClick={() => handlePayment(task)}
                  />
                )}
              </div>
            </div>
          );
        }
      })}

      {confirmModal && (
        <Modalbox isOpen={true} setIsOpen={() => setConfirmModal(null)}>
          <div className="text-center w-96">
            <div className="mb-10 mt-4">
              Are you sure you want to confirm this Helper has completed his
              task?
            </div>
            <Button
              buttonText="Yes"
              onClick={() => confirmTask(confirmModal)}
            ></Button>
            <Button
              buttonText="No"
              buttonType="back"
              onClick={() => setConfirmModal(null)}
            ></Button>
          </div>
        </Modalbox>
      )}
    </>
  );
}
