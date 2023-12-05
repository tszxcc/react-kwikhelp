import React, { useEffect, useState } from "react";
import Chart from "../../components/chart";
import { UserData } from "../../data/chartdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import apiService from "../../services/apiService";

import {
  faPeopleCarryBox,
  faUserGear,
  faChildReaching,
  faDollarSign,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

export default function Admin() {

  const [taskLists, setTaskLists] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "User Gained",
        data: UserData.map((data) => data.userGain),
      },
    ],
  });

  async function getAllTask(){ 
   try {
      const response = await apiService.getAllTask();

      console.log(response.data);
      setTaskLists(response.data);

      // Calculate total number of tasks
      const totalTasksCount = taskLists.length;
      
      // Update the state with the total number of tasks
      setTotalTasks(totalTasksCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    
  }
  


  useEffect(() => { 
    getAllTask(); 
  }, []);

  return (
    <>
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
            <div className="text-[#978CB6] text-2xl font-bold">100</div>
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
            <div className="text-[#48BDE2] text-2xl font-bold">53</div>
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
            <div className="text-[#D6C212] text-2xl font-bold">71</div>
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
            <div className="text-[#CA958E] text-2xl font-bold ">{totalTasks}</div>
            <div className="text-[#CA958E]">Total Task Request</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-[50%] h-[50%]">
        <Chart chartData={userData} />
      </div>
    </>
  );
}
