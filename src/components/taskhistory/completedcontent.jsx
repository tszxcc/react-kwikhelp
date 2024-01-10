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

import Modalbox from "../modalbox";
import Button from "../button";
import StarRating from "../starrating";

const colors = {
  orange: "#FFBA5A",
  grey: "#e4e5e9",
};

export default function Completedcontent() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRatingSubmit = async (rating) => {
    const ratingString = String(rating);
    await apiService.reviewTask(modalOpen, ratingString);

    getUserTask();
    // run after 3 seconds
    setTimeout(() => {
      setModalOpen(false);
    }, 1000);
  };

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

  async function getUserTask() {
    const response = await apiService.getUserTask();
    setTasks(response.data);
  }

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      {tasks.map((task, i) => {
        if (task.taskStatus === "Paid" || task.taskStatus === "Reviewed") {
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
              <div className="flex items-center justify-center md:mx-1 my-1 pt-4">
                {task.taskStatus !== "Paid" ? (
                  <div className="flex mb-4">
                    {getStar(Number(task.review))}
                  </div>
                ) : (
                  <>
                    <Button
                      buttonText="Rate"
                      onClick={() => setModalOpen(task._id)}
                    />
                  </>
                )}
              </div>
            </div>
          );
        }
      })}

      {/* Modal Box */}
      {modalOpen && (
        <div>
          <Modalbox isOpen={true} setIsOpen={() => setModalOpen(null)}>
            <StarRating onSubmit={handleRatingSubmit} />
          </Modalbox>
        </div>
      )}
    </>
  );
}
