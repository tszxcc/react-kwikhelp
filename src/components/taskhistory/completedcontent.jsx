import React, { useState } from "react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(null);

  const handleOnClick = () => {
    setModalOpen(true);
  };

  const handleRatingSubmit = (rating) => {
    setSubmittedRating(rating);

    // run after 3 seconds
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  };

  function getStar() {
    let starArray = [];

    for (let i = 0; i < 5; i++) {
      if (i < submittedRating) {
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

  return (
    <>
      <div
        className="flex items-center border-2 border-[#7EA6F4] rounded-lg justify-around p-2"
        style={{ boxShadow: "0 2px 7px #D4D4D4" }}
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-6 gap-x-12">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
            <div>24 Apr</div>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            <div>Kuantan</div>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <div>10:00 AM</div>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            <div>100</div>
          </div>
        </div>

        <div className="mx-8">
          <div className="flex items-center p-8">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            <div>Type: Pet Care</div>
          </div>
        </div>

        {submittedRating !== null ? (
          <div className="flex">{getStar()}</div>
        ) : (
          <>
            <Button buttonText="Rate" onClick={handleOnClick} />
          </>
        )}
      </div>

      {/* Modal Box */}
      {modalOpen && (
        <div>
          <Modalbox isOpen={modalOpen} setIsOpen={setModalOpen}>
            <StarRating onSubmit={handleRatingSubmit} />
            {console.log(submittedRating)}
          </Modalbox>
        </div>
      )}
    </>
  );
}
