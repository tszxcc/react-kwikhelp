import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Button({
  onClick,
  buttonText,
  buttonType,
  icon,
  className,
}) {
  function getButtonStyle() {
    var css;

    switch (buttonType) {
      case "button":
        css =
          "text-[#7EA6F4] text-sm bg-[#FFFFFF] hover:bg-[#EFF2F7] duration-300 border-solid border-2 border-[#7EA6F4] rounded-lg p-3 font-bold w-full mb-4 flex justify-center items-center";
        break;
      case "back":
        css =
          "text-[#7EA6F4] text-sm bg-[#FFFFFF] hover:bg-[#EFF2F7] duration-300 border-solid border-2 border-[#7EA6F4] rounded-lg p-3 font-bold w-full mb-4 flex justify-center items-center";
        break;
      case "submit":
        css =
          "text-[white] text-sm bg-[#7EA6F4] hover:bg-[#8DB0F3] duration-300 border-solid border-2 border-[#7EA6F4] hover:border-[#8DB0F3] rounded-lg p-3 font-bold w-full mb-4 flex justify-center items-center";
        break;
      case "pay":
        css =
          "text-[white] text-sm bg-[#8DD698] hover:bg-[#8DD698] duration-300 border-solid border-2 border-[#8DD698] hover:border-[#8DB0F3] rounded-lg p-3 font-bold w-full mb-4 flex justify-center items-center";
        break;
      default:
        css =
          "text-[white] text-sm bg-[#7EA6F4] hover:bg-[#8DB0F3] duration-300 border-solid border-2 border-[#7EA6F4] hover:border-[#8DB0F3] rounded-lg p-3 font-bold w-full mb-4 flex justify-center items-center";
        break;
    }

    css = css + " " + className;

    return css;
  }

  return (
    <div>
      <button onClick={onClick} className={getButtonStyle()} type={buttonType}>
        {icon && <FontAwesomeIcon icon={icon} className="mx-2" />}
        {buttonText}
      </button>
    </div>
  );
}
