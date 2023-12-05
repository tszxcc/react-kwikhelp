import React, { useState } from "react";

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

import Resumemodalbox from "../resumemodalbox";
import Modalbox from "../modalbox";
import Button from "../button";

export default function Pendingcontent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const handleEyeClick = () => {
    setModalOpen(true);
  };

  const handleApproval = () => {
    setApproveOpen(true);
  };

  const handleYesButtonClick = () => {
    setApproveOpen(false);
    setPayModalOpen(true);
  };

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
        <div className="flex items-center gap-10">
          <FontAwesomeIcon
            icon={faEye}
            className="cursor-pointer"
            onClick={handleEyeClick}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className="text-[#27AE60] cursor-pointer"
            onClick={handleApproval}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="text-[#D85751]  cursor-pointer"
          />
        </div>
      </div>

      {/* Modal Box */}
      {modalOpen && (
        <div>
          <Resumemodalbox
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
          ></Resumemodalbox>
        </div>
      )}

      {/* Approval Box */}
      {approveOpen && (
        <div>
          <Modalbox isOpen={approveOpen} setIsOpen={setApproveOpen}>
            <div className="text-center w-96">
              <div className="mb-10 mt-4">
                Are you sure you want to approve this Helper?
              </div>
              <Button buttonText="Yes!" onClick={handleYesButtonClick}></Button>
              <Button
                buttonText="No"
                buttonType="back"
                onClick={() => setApproveOpen(false)}
              ></Button>
            </div>
          </Modalbox>
        </div>
      )}

      {/* Payment Modal Box */}
      {payModalOpen && (
        <div>
          <Modalbox isOpen={payModalOpen} setIsOpen={setPayModalOpen}>
            {/* Add your payment content here */}
            <div className="text-center w-96">
              <div className="mb-10 mt-4 text-bold text-xl">
                Let's Pay for your Helper!
              </div>
              <div className="my-10">Go go goooooooooo</div>
              <Button buttonText="Pay">Pay</Button>
              <Button
                buttonText="Close"
                buttonType="back"
                onClick={() => setPayModalOpen(false)}
              />
            </div>
          </Modalbox>
        </div>
      )}
    </>
  );
}
