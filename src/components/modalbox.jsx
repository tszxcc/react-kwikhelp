import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function modalbox(props) {
  const { isOpen, setIsOpen } = props;

  return (
    <>
      {isOpen && (
        <div
          className="flex justify-center items-center fixed top-0 left-0 w-full bg-black bg-opacity-70 h-screen z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white border-solid border-4 border-[#CFF2F6] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* exit */}
            <div className="flex justify-end">
              <button className="p-2" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} className="text-[#7EA6F4]" />
              </button>
            </div>
            <div className="flex-1 p-6">{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
}
