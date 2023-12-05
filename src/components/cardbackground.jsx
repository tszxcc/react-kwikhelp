import React from "react";

export default function cardbackground(props) {
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="bg-white border-solid border-4 border-[#CFF2F6] flex rounded-lg w-5/6">
        <div className="flex-1 p-10">{props.children}</div>
      </div>
    </div>
  );
}
