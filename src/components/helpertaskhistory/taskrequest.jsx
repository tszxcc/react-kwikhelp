import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import apiService from "../../services/apiService";

export default function Taskrequestcontent() {
  const [tasks, setTasks] = useState([]);

  async function getUserTask() {
    const response = await apiService.getUserTask();
    setTasks(response.data);
  }

  async function deleteUserTask(taskId) {
    await apiService.deleteUserTask(taskId);
    getUserTask();
  }

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      {tasks.map((task, i) => {
        if (task.taskStatus === "Open") {
          return (
            <div
              id={i}
              className="flex flex-col md:flex-row items-center border-2 border-[#7EA6F4] rounded-lg justify-around md:p-2 p-4 mb-4"
              style={{ boxShadow: "0 2px 7px #D4D4D4" }}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-x-12">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  <div className="text-sm md:text-base">{task.taskDate}</div>
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
              <div className="flex items-center md:mx-1 my-1">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-[#D85751]  cursor-pointer"
                  onClick={() => deleteUserTask(task._id)}
                />
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
