import React, { useState } from "react";
import Textfield from "../../components/formik/textfield";
import Cardbackground from "../../components/cardbackground";
import Button from "../../components/button";

import axios from "axios";

import resumelogo from "../../assets/images/resumelogo.svg";
import { useNavigate } from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/upload";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigateTo = useNavigate();

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("http://localhost:5000/api/resume", fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              pc: progressEvent.progress * 100,
            };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload successful");
        console.log(res.data);
        setUploadSuccess(true);
      })
      .catch((err) => {
        setMsg("Upload failed");
        console.log(err);
      });
  }

  return (
    <div className="w-[70%] self-center">
      <Cardbackground>
        <div className="flex justify-between gap-20">
          <div className="p-8 flex-1 text-center">
            <div className="text-4xl font-bold mb-4">Almost There!</div>
            <div className="mb-8">Submit Your Resume in PDF format</div>

            <div className="border-dashed border-2 border-gray-300 p-8 text-center mb-8">
              <div className="mb-8">Drop Your File Here</div>
              <div className="flex justify-center items-center">
                <input
                  className="mb-4"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  type="file"
                />
              </div>
            </div>
            <Button onClick={handleUpload} buttonText="Upload"></Button>
            {progress.started && (
              <progress max="100" value={progress.pc}></progress>
            )}
            {msg && <div className="mb-4">{msg}</div>}
            {uploadSuccess && (
              <Button
                buttonText="Continue"
                onClick={() => navigateTo("/profile")}
              />
            )}
          </div>

          <div className="p-8 flex-1">
            <img src={resumelogo} alt="resumeLogo" />
          </div>
        </div>
      </Cardbackground>
    </div>
  );
}
