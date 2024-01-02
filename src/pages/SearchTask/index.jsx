import React, { useState } from "react";

import SearchPageTaskCard from "../../components/searchPageTaskCard";
import Searchbar from "../../components/searchbar";
import Button from "../../components/button";
import Select from "../../components/select";

import { useEffect } from "react";
import apiService from "../../services/apiService";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";

export default function Searchtask() {
  const [selectedJob, setSelectedJob] = useState(0);
  const [jobLists, setJobLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //  // Function to format date in Malaysia time
  //   const formatDateInMalaysiaTime = (dateTimeString) => {
  //     return new Date(dateTimeString).toLocaleString("en-US", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     });
  //   };

  //   // Function to format time in Malaysia time
  //   const formatTimeInMalaysiaTime = (dateTimeString) => {
  //     return new Date(dateTimeString).toLocaleString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: false,
  //       timeZone: "Asia/Kuala_Lumpur",
  //     });
  //   };

  // const localStartDate =
  //   jobLists[selectedJob] && jobLists[selectedJob].taskDate
  //     ? formatDateInMalaysiaTime(jobLists[selectedJob].taskDate)
  //     : null;

  // const localStartTime =
  //   jobLists[selectedJob] && jobLists[selectedJob].startTime
  //     ? formatTimeInMalaysiaTime(jobLists[selectedJob].startTime)
  //     : null;

  const handleJobSelect = (index) => {
    setSelectedJob(index);
    console.log("Selected job: ", index);
  };

  async function getAllTask() {
    const response = await apiService.getAllTask();

    console.log(response.data);
    setJobLists(response.data);
  }

  const filteredData = jobLists.filter((item) =>
    item.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
      >
        <div className="flex flex-col md:flex-row p-8 justify-center">
          <div className="mb-4 md:mb-0 w-full md:w-1/2">
            <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          {/* <div className="flex space-x-4">
          <div>
            <Select />
          </div>
          <div>
            <Select />
          </div>
        </div> */}
        </div>

        <div className="flex flex-col md:flex-row md:justify-evenly p-4">
          <div className="w-full md:w-1/4">
            {filteredData.map((card, index) => (
              <SearchPageTaskCard
                key={index}
                title={card.serviceType}
                date={card.taskDate}
                location={card.taskArea}
                time={card.startTime}
                price={card.budget}
                additionalInfo={card.additionalInfo}
                onClick={() => handleJobSelect(index)}
                selectedJob={index === selectedJob}
              />
            ))}
          </div>

          <div className="w-full md:w-1/4 bg-white">
            {selectedJob !== null &&
              jobLists.length > 0 &&
              selectedJob < jobLists.length && (
                <div className="flex justify-center border-4 border-[#CFF2F6] rounded-lg px-16 py-10">
                  <div>
                    <div>
                      <div className="font-bold mb-4">Job Details</div>
                      <div className="my-8">
                        Type: {jobLists[selectedJob].serviceType}
                        <div className="mt-1">
                          Optional Details:{" "}
                          {jobLists[selectedJob].optionalDetails}
                        </div>
                        <div className="mt-1">
                          Name: {jobLists[selectedJob].nickname}
                        </div>
                        <div className="mt-1">
                          Additional Info:{" "}
                          {jobLists[selectedJob].additionalInfo}
                        </div>
                        {/* Add more card-specific content */}
                      </div>
                    </div>

                    <div className="my-8">
                      <div className="font-bold mb-4">Job Schedule</div>

                      <div className="my-8">
                        <div className="mt-1">
                          Start from: {jobLists[selectedJob].taskDate},{" "}
                          {jobLists[selectedJob].startTime}
                        </div>
                        <div className="mt-1">
                          Estimated budget: ${jobLists[selectedJob].budget}
                        </div>
                        <div className="mt-1">*Can be discussed afterwards</div>
                      </div>

                      <div>
                        <Button buttonText="Apply" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
