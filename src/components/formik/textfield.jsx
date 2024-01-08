import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";

export default function Textfield({
  label,
  name,
  as,
  placeholder,
  onChange,
  icon,
  readOnly,
  value,
  touched,
  errors,
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = touched[name] && errors[name];
  const inputClasses = `focus:outline-none w-full md:w-[100%] border rounded-lg duration-300 ${
    hasError
      ? "border-red-500"
      : isFocused
      ? "ring-2 ring-[#7EA6F4] border-blue-500"
      : ""
  }`;

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={name} className="text-gray-700 text-lg mb-2">
        {label}
      </label>
      <div className={`flex items-center px-3 p-2 ${inputClasses}`}>
        {icon && (
          <FontAwesomeIcon icon={icon} className="text-[#7EA6F4] pr-3" />
        )}
        <input
          as={as}
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="flex-1 focus:outline-none"
          readOnly={readOnly}
          onClick={() => (readOnly ? setIsCalendarOpen(true) : null)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
        />
        {isCalendarOpen && readOnly && (
          <Calendar
            onChange={(date) => {
              if (date) {
                onChange({ target: { name, value: date } });
              }
              setIsCalendarOpen(false);
            }}
          />
        )}
      </div>

      {hasError && <div className="text-red-600">{errors[name]}</div>}
    </div>
  );
}
