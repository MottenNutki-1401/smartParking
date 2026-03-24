import { useState } from "react";
import "../styles/homepage.css"
import Header from "../assets/components/header.jsx";
import ParkingSlots from "./parkingslots.jsx";
//import Button from "./button.jsx";
//import Yellow from "./yellow.jsx";

function Homepage({ goToBooking }) {
  return (
    <div className="homepage-container">
      <Header />

      <div className="main-content">
        <ParkingSlots goToBooking={goToBooking} />

        <div className="box">
          <p>🔴 Occupied</p>
               <p>🟢 Available</p>
                    <p>🟠 Under Maintenance</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;