import React, { useState, useEffect } from "react";

import apiService from "../../services/apiService";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
  faEye,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ResumeModalbox from "../resumemodalbox";
import Modalbox from "../modalbox";
import Button from "../button";

export default function Pendingcontent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(null);

  const handleEyeClick = () => {
    setModalOpen(true);
  };

  const handleAcceptTask = async () => {
    const response = await apiService.acceptTask(
      acceptOpen?.taskID,
      acceptOpen?.helper
    );

    getUserRequest();
    setAcceptOpen(null);
    Swal.fire({
      title: "You Have Accepted The Task Successfully!",
      text: "Now, wait for the helper to start your task.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const [tasks, setTasks] = useState([]);

  async function getUserRequest() {
    const response = await apiService.getUserRequest();
    setTasks(response.data);
  }

  useEffect(() => {
    getUserRequest();
  }, []);

  const [taskDetail, setTaskDetail] = useState({});

  const getTaskDetail = async () => {
    var temp = {};
    var counter = tasks.length;

    tasks.map(async (task) => {
      const response = await apiService.getOneTask(task.taskID);
      temp[task.taskID] = response.data;

      counter--;

      if (counter <= 0) {
        setTaskDetail(temp);
      }
    });
  };

  useEffect(() => {
    if (tasks.length === 0) return;
    getTaskDetail();
  }, [tasks]);

  return (
    <>
      {tasks.length === 0 && (
        <div className="text-center text-2xl mt-20">
          No pending approval task request
        </div>
      )}
      {tasks.map((task, i) => (
        <div
          className="flex flex-col md:flex-row items-center border-2 border-[#7EA6F4] rounded-lg justify-around md:p-2 p-4 mb-4"
          style={{ boxShadow: "0 2px 7px #D4D4D4" }}
          key={i}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-x-12">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
              <div className="text-sm md:text-base">
                {taskDetail[task.taskID]?.taskDate || "Loading..."}
              </div>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              <div className="text-sm md:text-base">
                {taskDetail[task.taskID]?.taskArea || "Loading..."}
              </div>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <div className="text-sm md:text-base">
                {taskDetail[task.taskID]?.startTime || "Loading..."}
              </div>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              <div className="text-sm md:text-base">
                {taskDetail[task.taskID]?.budget || "0"}
              </div>
            </div>
          </div>

          <div className="md:mx-8">
            <div className="flex items-center p-4 md:p-8">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              <div className="text-sm md:text-base">
                {taskDetail[task.taskID]?.serviceType || "Loading..."}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 my-1">
            <FontAwesomeIcon
              icon={faEye}
              className="cursor-pointer"
              onClick={handleEyeClick}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className="text-[#27AE60] cursor-pointer"
              onClick={() => setAcceptOpen(task)}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="text-[#D85751]  cursor-pointer"
            />
          </div>
        </div>
      ))}

      {/* Modal Box */}
      {modalOpen && (
        <div>
          <ResumeModalbox
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            // apa ni this ispending one ma, for  user to view all the applied helper's personal info and their own resume
          ></ResumeModalbox>
        </div>
      )}

      {/* Approval Box */}
      {acceptOpen && (
        <div>
          <Modalbox isOpen={true} setIsOpen={() => setAcceptOpen(null)}>
            <div className="text-center w-96">
              <div className="mb-10 mt-4">
                Are you sure you want to accept this Helper offer?
              </div>
              <Button
                buttonText="Yes"
                onClick={() => handleAcceptTask()}
              ></Button>
              <Button
                buttonText="No"
                buttonType="back"
                onClick={() => setAcceptOpen(null)}
              ></Button>
            </div>
          </Modalbox>
        </div>
      )}
    </>
  );
}
