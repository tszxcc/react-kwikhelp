import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faDollarSign,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchPageTaskCard({
  title,
  date,
  location,
  time,
  price,
  onClick,
  selectedJob,
}) {
  const cardClass = `flex flex-col items-center justify-center border-solid border-2 rounded-lg px-8 h-1/2 my-8 shadow-md transition-colors duration-300 ${
    selectedJob ? "border-[#7EA6F4]" : "border-[#BDBDBD]"
  } hover:border-[#7EA6F4]`;

  return (
    <div onClick={onClick}>
      <div className={cardClass}>
        <div className="flex items-center justify-center p-2">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
          <div className="text-3xl">{title}</div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-6 p-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
            <div>{date}</div>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            <div>{location}</div>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <div>{time}</div>
          </div>

          <div className="flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            <div>{price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
