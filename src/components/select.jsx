import React from "react";

import Select from "react-select";

export default function SelectMenu({ label, options }) {
  return (
    <>
      <div className="mb-4 flex flex-col">
        <label htmlFor="selectlabel" className="text-gray-700 text-lg mb-2">
          {label}
        </label>

        <div>
          <Select
            className="focus:outline-none w-full md:w-[100%] border rounded-lg duration-300"
            options={options}
          />
        </div>
      </div>
    </>
  );
}
