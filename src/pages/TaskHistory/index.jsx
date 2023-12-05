import React, { useState } from "react";

import Cardbackground from "../../components/cardbackground";
import Taskhistorymenu from "../../components/taskhistorymenu";
import TaskRequestContent from "../../components/taskhistory/taskrequestcontent";
import PendingContent from "../../components/taskhistory/pendingcontent";
import CompletedContent from "../../components/taskhistory/completedcontent";
import Calendar from "../../components/calendar";

export default function Taskhistory() {
  const [activeItem, setActiveItem] = useState("Task Request");

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="w-[85%] self center">
        <Cardbackground>
          {/* nav */}

          <Taskhistorymenu
            onItemClick={handleMenuItemClick}
            activeItem={activeItem}
          />

          {/* task history */}
          {activeItem === "Task Request" && <TaskRequestContent />}

          {/* pending */}
          {activeItem === "Pending" && <PendingContent />}

          {/* completed */}
          {activeItem === "Completed" && <CompletedContent />}

          {/* <Calendar /> */}
          {/* <Textfield readOnly={true} /> */}
        </Cardbackground>
      </div>
    </>
  );
}
