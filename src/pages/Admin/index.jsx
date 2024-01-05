import React, { useEffect, useState } from "react";
import Chart from "../../components/chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import apiService from "../../services/apiService";
import homeBubble from "../../assets/images/homepage-bg-bubble.svg";

import {
  faPeopleCarryBox,
  faUserGear,
  faChildReaching,
  faDollarSign,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

export default function Admin() {
  const [totalTasksCount, setTotalTasksCount] = useState(0);
  const [totalTransactionsCount, setTotalTransactionsCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalHelpersCount, setTotalHelpersCount] = useState(0);

  const [totalTasks, setTotalTasks] = useState(0);

  const [userData, setUserData] = useState({
    labels: ["User", "Helper", "Transaction", "Task"],
    datasets: [
      {
        label: "Total active of User and Helper",
        data: [0, 0, 0, 0], // Initial data with 0 values
      },
    ],
  });

  async function getUserCount() {
    try {
      const response = await apiService.getUserCount();
      setTotalUsersCount(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function getHelperCount() {
    try {
      const response = await apiService.getHelperCount();
      setTotalHelpersCount(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function getTaskCount() {
    try {
      const response = await apiService.getTaskCount();
      setTotalTasksCount(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function getTransactionCount() {
    try {
      const response = await apiService.getTransactionCount();
      setTotalTransactionsCount(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    getUserCount();
    getHelperCount();
    getTaskCount();
    getTransactionCount();
  }, []);

  useEffect(() => {
    // Update the chart data when totalUsersCount and totalHelpersCount are fetched
    setUserData((prevUserData) => ({
      ...prevUserData,
      datasets: [
        {
          label: "Total active of User and Helper",
          data: [
            totalUsersCount,
            totalHelpersCount,
            totalTransactionsCount,
            totalTasksCount,
          ],
        },
      ],
    }));
  }, [
    totalUsersCount,
    totalHelpersCount,
    totalTransactionsCount,
    totalTasksCount,
  ]);

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
      >
        <div className="p-8 flex space-x-4">
          <div>Welcome Admin</div>
          <FontAwesomeIcon icon={faUserGear} size="xl" />
        </div>

        <div className="p-8 flex justify-evenly">
          {/* total user */}
          <div className="bg-[#CAD0EF] w-1/5 h-48 rounded-xl ">
            <div className="p-6 flex flex-col justify-between items-center h-[100%]">
              <div className="bg-gradient-to-tl from-[#A9AECA] w-12 h-12 rounded-full flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faChildReaching}
                  size="xl"
                  className="text-[#999CD3]"
                />
              </div>
              <div className="text-[#978CB6] text-2xl font-bold">
                {totalUsersCount}
              </div>
              <div className="text-[#978CB6]">Total User</div>
            </div>
          </div>

          {/* total helpers */}
          <div className="bg-[#E2F3F5] w-1/5 h-48 rounded-xl">
            <div className="p-6 flex flex-col justify-between items-center h-[100%]">
              <div className="bg-gradient-to-tl from-[#A6D5DB] w-12 h-12 rounded-full flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faPeopleCarryBox}
                  size="xl"
                  className="text-[#48BDE2]"
                />
              </div>
              <div className="text-[#48BDE2] text-2xl font-bold">
                {totalHelpersCount}
              </div>
              <div className="text-[#48BDE2]">Total Helpers</div>
            </div>
          </div>

          {/* total transactions */}
          <div className="bg-[#fff49b] bg-opacity-80 w-1/5 h-48 rounded-xl">
            <div className="p-6 flex flex-col justify-between items-center h-[100%]">
              <div className="bg-gradient-to-tl from-[#f3e45a] w-12 h-12 rounded-full flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="xl"
                  className="text-[#D6C212]"
                />
              </div>
              <div className="text-[#D6C212] text-2xl font-bold">
                {totalTransactionsCount}
              </div>
              <div className="text-[#D6C212]">Total Transaction</div>
            </div>
          </div>

          {/* total task request */}
          <div className="bg-[#FFBCB2] bg-opacity-70 w-1/5 h-48 rounded-xl">
            <div className="p-6 flex flex-col justify-between items-center h-[100%]">
              <div className="bg-gradient-to-tl from-[#DEA39B] w-12 h-12 rounded-full flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faFileSignature}
                  size="xl"
                  className="text-[#CA958E] translate-x-[3px]"
                />
              </div>
              <div className="text-[#CA958E] text-2xl font-bold ">
                {totalTasksCount}
              </div>
              <div className="text-[#CA958E]">Total Task Request</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center h-[50%]">
          <Chart chartData={userData} />
        </div>
      </div>
    </>
  );
}
