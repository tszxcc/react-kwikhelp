import React, { useState, useEffect, useRef } from "react";

import Swal from "sweetalert2";

import apiService from "../../services/apiService";

import Button from "../../components/button";

export default function HelperResume() {
  const [isResumeExist, setIsResumeExist] = useState(false);
  const fileInputRef = useRef(null);

  const getResume = async () => {
    const res = await apiService.getProfileResume("/profile/resume");
    if (res.status === 200) {
      setIsResumeExist(true);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("upload", file);

    const res = await apiService.updateProfileResume(formData);

    if (res.status === 200) {
      setIsResumeExist(true);

      Swal.fire({
        title: "Success!",
        text: "Resume Updated!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      return;
    }

    Swal.fire({
      title: "Error!",
      text: "Resume Update Failed!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  useEffect(() => {
    getResume();
  }, []);

  return (
    <>
      <div className="mt-5 flex gap-3">
        <Button
          buttonText={"Update Resume"}
          onClick={() => {
            fileInputRef.current.click();
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isResumeExist && (
          <Button
            buttonText={"View Resume"}
            buttonType="pay"
            onClick={() => {
              window.open(
                "https://kwikhelp.bryanc12.net/api/profile/resume",
                "_blank"
              );
            }}
          />
        )}
      </div>
    </>
  );
}
