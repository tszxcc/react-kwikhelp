import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Button from "./button";

import feedbackimg from "../assets/images/starrating.svg";

const colors = {
  orange: "#FFBA5A",
  grey: "#e4e5e9",
};

export default function StarRating({ rating, onSubmit, readOnly }) {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    if (currentValue === 0) {
      setHoverValue(value);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleRateSubmit = () => {
    onSubmit(currentValue);
    setIsSubmitted(true);
  };

  return (
    <div>
      <div className="text-center">
        <img
          src={feedbackimg}
          alt="feedback"
          className="mx-auto mb-4 max-w-full w-3/4 md:w-1/3"
        />

        {isSubmitted ? (
          <div>
            <p>Thank you for submitting your rating!</p>
          </div>
        ) : (
          <>
            <div className="text-xl font-semibold mb-2">Let's Rate!</div>
            <div className="mb-4">
              How much you would like to rate this Helper?
            </div>
            {stars.map((_, index) => (
              <span key={index}>
                <FontAwesomeIcon
                  icon={faStar}
                  size={"2x"}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  className="mr-2 cursor-pointer mb-4"
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                />
              </span>
            ))}
            <div className="mb-4">Your rating is {currentValue}</div>
            <Button buttonText="Rate" onClick={handleRateSubmit} />
          </>
        )}
      </div>
    </div>
  );
}
