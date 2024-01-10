import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SearchPageTaskCard from "../../components/searchPageTaskCard";
import Searchbar from "../../components/searchbar";
import Button from "../../components/button";
import Select from "../../components/select";

import Modalbox from "../../components/modalbox";
import apiService from "../../services/apiService";
import homeBubble from "../../assets/images/homepage-bg-bubble.svg";
import Swal from "sweetalert2";

export default function Searchtask() {
  const [selectedJob, setSelectedJob] = useState(0);
  const [jobToApply, setJobToApply] = useState(null);
  const [jobLists, setJobLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigateTo = useNavigate();

  const handleJobSelect = (index, job) => {
    setSelectedJob(index);
    setJobToApply(job);
  };

  async function getAllTask() {
    const response = await apiService.getAllTask();

    setJobLists(response.data);
  }

  const filteredData = jobLists.filter((item) =>
    item.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function requestTask() {
    const response = await apiService.requestTask(
      jobToApply._id,
      jobToApply.username
    );
    if (response.status === 200) {
      await Swal.fire({
        title: "Applied Successfully!",
        text: "Proceed",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigateTo("/helpertaskhistory");
      return;
    }
  }

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center min-h-screen h-content"
      >
        <div className="flex flex-col md:flex-row p-8 justify-center">
          <div className="mb-4 md:mb-0 w-full md:w-1/2">
            <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-evenly p-4">
          <div className="w-full md:w-1/4">
            {filteredData.map((card, index) => (
              <SearchPageTaskCard
                key={index}
                title={card.serviceType}
                date={new Date(card.taskDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                location={card.taskArea}
                time={card.startTime}
                price={card.budget}
                additionalInfo={card.additionalInfo}
                onClick={() => handleJobSelect(index, card)}
                selectedJob={index === selectedJob}
              />
            ))}
          </div>

          <div className="w-full md:w-1/4">
            {jobToApply && (
              <div className="flex justify-center border-4 border-[#CFF2F6] rounded-lg px-16 py-10 bg-white">
                <div>
                  <div>
                    <div className="font-bold mb-4">Job Details</div>
                    <div className="my-8">
                      Type: {jobToApply.serviceType}
                      <div className="mt-1">
                        Optional Details: {""}
                        {jobToApply.taskDescription}
                      </div>
                      <div className="mt-1">Name: {jobToApply.username}</div>
                      <div className="mt-1">
                        Additional Info: {jobToApply.additionalInfo}
                      </div>
                    </div>
                  </div>

                  <div className="my-8">
                    <div className="font-bold mb-4">Job Schedule</div>

                    <div className="my-8">
                      <div className="mt-1">
                        {`Start from ${new Date(
                          jobToApply.taskDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}, ${jobToApply.startTime}`}
                      </div>
                      <div className="mt-1">
                        Estimated budget: ${jobToApply.budget}
                      </div>
                      <div className="mt-1">*Can be discussed afterwards</div>
                    </div>

                    <div>
                      {/* {applyOpen &&
                          Swal.fire({
                            title: "Applied Successfully!",
                            text: "Proceed",
                            icon: "success",
                            confirmButtonText: "OK",
                          })} */}
                    </div>
                    <div>
                      <Button
                        buttonText="Apply"
                        onClick={() => requestTask()}
                      />
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
