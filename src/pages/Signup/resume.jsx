import React, { useState } from "react";
import Textfield from "../../components/formik/textfield";
import Cardbackground from "../../components/cardbackground";
import Button from "../../components/button";

import axios from "axios";
import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import resumelogo from "../../assets/images/resumelogo.svg";
import { useNavigate } from "react-router-dom";

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
    // axios.post("https://kwikhelp.bryanc12.net/api/resume", fd);
    fetch("https://kwikhelp.bryanc12.net/api/resume", {
      method: "POST",
      body: fd,
      headers: {
        "Custom-Header": "value",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        setMsg("Upload successful");
        return res.json();
        // setUploadSuccess(true);
      })
      .then((data) => console.log(data))
      .catch((err) => {
        setMsg("Upload failed");
        console.log(err);
      });
  }

  return (
    <div
      style={{ "--landingBubble": `url(${homeBubble})` }}
      className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
    >
      <div className="w-full md:w-[50%] mx-auto">
        <Cardbackground>
          {/* Updated the structure to improve responsiveness */}
          <div className="flex flex-col md:flex-row gap-6 p-8 text-center md:text-left">
            <div className="flex-1">
              <div className="text-4xl font-bold mb-4">Almost There!</div>
              <div className="mb-8">Submit Your Resume in PDF format</div>

              <div className="border-dashed border-2 border-gray-300 p-8 text-center mb-8">
                <div className="mb-8">Drop Your File Here</div>
                <div className="flex justify-center items-center">
                  <input
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                      } else {
                        setFile(null); // Handle case where no file is selected or selection is cancelled
                      }
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

            <div className="hidden md:flex md:flex-1 md:justify-end">
              {/* Hide the resume logo on small screens */}
              <img src={resumelogo} alt="resumeLogo" />
            </div>
          </div>
        </Cardbackground>
      </div>
    </div>
  );
}
