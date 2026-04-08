import "../styles/booking.css";
import { useState } from "react";
function Booking({ toggleSidebar }) {
  return (
     <div className="header">
  
      <div className="header-text">
      <h1>BOOKING SLOTS</h1>
     
      <button className="sidebar-btn" onClick={toggleSidebar}>
      </button>
    </div>
    </div>
  );
}
export default Booking;