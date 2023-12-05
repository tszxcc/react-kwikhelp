import ReactCalendar from "react-calendar";

import React from "react";

export default function () {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <ReactCalendar
        minDate={new Date()}
        className=""
        view="month"
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
}
