import React from "react";

import Select from "react-select";

export default function SelectMenu({ label }) {
  const options = [
    { value: "jack", label: "jack" },
    { value: "rose", label: "rose" },
    { value: "titanic", label: "titanic" },
  ];

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
  };

  return (
    <>
      <div className="mb-4 flex flex-col mx-4">
        <label htmlFor="selectlabel" className="text-gray-700 text-lg mb-2">
          {label}
        </label>

        <div>
          <Select />
        </div>
      </div>
    </>
  );
}
