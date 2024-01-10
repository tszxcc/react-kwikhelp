import React, { useState, useEffect } from "react";

import apiService from "../../services/apiService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const colors = {
  orange: "#FFBA5A",
  grey: "#e4e5e9",
};

export default function Completedcontent() {
  const [tasks, setTasks] = useState([]);

  function getStar(starCount) {
    let starArray = [];

    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        starArray.push(
          <FontAwesomeIcon
            icon={faStar}
            className="mr-2"
            color={colors.orange}
          />
        );
      } else {
        starArray.push(
          <FontAwesomeIcon icon={faStar} className="mr-2" color={colors.grey} />
        );
      }
    }

    return starArray;
  }

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

  return (
    <>
      {tasks.map((task, i) => {
        if (
          task.requestStatus === "Accepted" &&
          (taskDetail[task.taskID]?.taskStatus === "Confirmed" ||
            taskDetail[task.taskID]?.taskStatus === "Paid" ||
            taskDetail[task.taskID]?.taskStatus === "Reviewed")
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
                    {new Date(
                      taskDetail[task.taskID]?.taskDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  <div className="text-sm md:text-base">
                    {taskDetail[task.taskID]?.taskArea}
                  </div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <div className="text-sm md:text-base">
                    {taskDetail[task.taskID]?.startTime}
                  </div>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                  <div className="text-sm md:text-base">
                    {taskDetail[task.taskID]?.budget}
                  </div>
                </div>
              </div>

              <div className="md:mx-8">
                <div className="flex items-center p-4 md:p-8">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  <div className="text-sm md:text-base">
                    {taskDetail[task.taskID]?.serviceType}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center md:mx-1 my-1 pt-4 text-[#7EA6F4]">
                {taskDetail[task.taskID]?.taskStatus === "Reviewed" && (
                  <div className="flex mb-4">
                    {getStar(Number(taskDetail[task.taskID]?.review))}
                  </div>
                )}
                {taskDetail[task.taskID]?.taskStatus === "Paid" && (
                  <div className="flex mb-4">Pending Review...</div>
                )}
                {taskDetail[task.taskID]?.taskStatus === "Confirmed" && (
                  <div className="flex mb-4">Pending Payment...</div>
                )}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
