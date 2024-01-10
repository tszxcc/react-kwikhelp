import React, { useState } from "react";
import Cardbackground from "../../components/cardbackground";
import Button from "../../components/button";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import resumelogo from "../../assets/images/resumelogo.svg";
import { useNavigate } from "react-router-dom";

import apiService from "../../services/apiService";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigateTo = useNavigate();

  async function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("upload", file);

    const response = await apiService.updateProfileResume(formData);
    if (response.status === 200) {
      setUploadSuccess(true);
      return;
    }
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
              {!uploadSuccess && (
                <Button onClick={handleUpload} buttonText="Upload" />
              )}
              {uploadSuccess && (
                <>
                  <div className="text-green-500 mb-4">
                    Resume uploaded successfully, please continue!
                  </div>
                  <Button
                    buttonType="pay"
                    buttonText="Continue"
                    onClick={() => navigateTo("/profile")}
                  />
                </>
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
