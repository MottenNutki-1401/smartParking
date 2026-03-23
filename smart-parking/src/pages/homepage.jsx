import { useState } from "react";
import "../styles/homepage.css"
import Header from "../assets/components/header.jsx";
import ParkingSlots from "./parkingslots.jsx";

function Homepage() {
  return (
    <div className="homepage-container">
      <Header />
       
     <div>
           <ParkingSlots />
     </div>
        </div>
    
    );
     
  }

export default Homepage;