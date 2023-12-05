import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSwiper } from "swiper/react";

export default function Swipernavbutton() {
  const swiper = useSwiper();

  return (
    <div className="flex w-24 justify-evenly my-4 ml-auto">
      <div
        className="bg-[#e9ecf3] w-8 h-8 rounded-full flex justify-center items-center shadow-xl cursor-pointer hover:bg-[#dee0e2] drop-shadow-xl"
        onClick={() => swiper.slidePrev()}
      >
        <button>
          <FontAwesomeIcon icon={faChevronLeft} className="text-[#7d818a]" />
        </button>
      </div>

      <div
        className="bg-[#7EA6F4] w-8 h-8 rounded-full flex justify-center items-center shadow-xl cursor-pointer hover:bg-[#8DB0F3] drop-shadow-xl"
        onClick={() => swiper.slideNext()}
      >
        <button>
          <FontAwesomeIcon icon={faChevronRight} className="text-white" />
        </button>
      </div>
    </div>
  );
}
