import React, { useState, useEffect } from "react";

import apiService from "../../services/apiService";
import Swal from "sweetalert2";
import Button from "../button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

export default function PendingContent() {
  const [tasks, setTasks] = useState([]);

  async function getHelperRequest() {
    const response = await apiService.getHelperRequest();
    setTasks(response.data);
  }

  useEffect(() => {
    getHelperRequest();
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

  async function completeTask(taskID) {
    const response = await apiService.completeTask(taskID);
    if (response.status === 200) {
      getHelperRequest();
    }
  }

  return (
    <>
      {tasks.length === 0 && (
        <div className="text-center text-2xl mt-20">
          No pending approval task request
        </div>
      )}
      {tasks.map((task, i) => {
        if (
          task.requestStatus === "Accepted" &&
          (taskDetail[task.taskID]?.taskStatus === "Accepted" ||
            taskDetail[task.taskID]?.taskStatus === "Completed")
        ) {
          return (
            <div
              className="flex flex-col md:flex-row items-center border-2 border-[#7EA6F4] rounded-lg justify-around md:p-2 p-4 mb-4"
              style={{ boxShadow: "0 2px 7px #D4D4D4" }}
              key={i}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-x-12">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  <div className="text-sm md:text-base">
                    {new Date(
                      taskDetail[task.taskID]?.taskDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }) || "Loading..."}
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
              <div className="flex items-center gap-10 my-1 pt-4">
                {taskDetail[task.taskID]?.taskStatus === "Accepted" && (
                  <Button
                    buttonText="Complete"
                    onClick={() => completeTask(task.taskID)}
                  />
                )}
                {taskDetail[task.taskID]?.taskStatus === "Completed" && (
                  <div className="text-sm md:text-base text-[#7EA6F4] mb-4">
                    Pending Confirmation...
                  </div>
                )}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
