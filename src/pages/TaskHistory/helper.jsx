import React, { useState } from "react";

import Cardbackground from "../../components/cardbackground";
import Taskhistorymenu from "../../components/helpertaskhistorymenu";

import AvailableContent from "../../components/helpertaskhistory/availablecontent";
import PendingContent from "../../components/helpertaskhistory/pendingcontent";
import InProgressContent from "../../components/helpertaskhistory/inprogresscontent";
import CompletedContent from "../../components/helpertaskhistory/completedcontent";

import homeBubble from "../../assets/images/homepage-bg-bubble.svg";

export default function HelperTaskhistory() {
  const [activeItem, setActiveItem] = useState("Available Tasks");

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center h-screen"
      >
        <div className="w-full self center">
          <Cardbackground>
            {/* nav */}

            <Taskhistorymenu
              onItemClick={handleMenuItemClick}
              activeItem={activeItem}
            />

            {/* task history */}
            {activeItem === "Available Tasks" && <AvailableContent />}

            {/* pending */}
            {activeItem === "Pending Accept" && <PendingContent />}

            {/* in progress */}
            {activeItem === "In Progress" && <InProgressContent />}

            {/* completed */}
            {activeItem === "Completed" && <CompletedContent />}

            {/* <Calendar /> */}
            {/* <Textfield readOnly={true} /> */}
          </Cardbackground>
        </div>
      </div>
    </>
  );
}
