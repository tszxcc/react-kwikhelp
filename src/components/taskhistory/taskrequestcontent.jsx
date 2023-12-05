import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function Taskrequestcontent() {
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
        <div className="flex items-center mx-1">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-[#D85751]  cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
