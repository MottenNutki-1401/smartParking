import "../styles/parking.css";
//import Booking from "./booking.jsx";
import { useState } from "react";
import topview from "../assets/topview.png"



function ParkingSlots({goToBooking}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const currentUser = "user";

const [timeIn, setTimeIn] = useState("");
const [timeOut, setTimeOut] = useState("");

  // fake data just for the mockup
const [slots, setSlots] = useState([
    { id: 1, status: "occupied", bookedBy: "other" },
    { id: 2, status: "occupied", bookedBy: "user" },
    { id: 3, status: "available" },
    { id: 4, status: "occupied", bookedBy: "other" },
    { id: 5, status: "occupied", bookedBy: "other" },

    { id: 6, status: "available" },
    { id: 7, status: "available" },
    { id: 8, status: "occupied", bookedBy: "other" },
    { id: 9, status: "occupied", bookedBy: "other" },
    { id: 10, status: "available" },

    { id: 11, status: "occupied", bookedBy: "other" },
    { id: 12, status: "occupied", bookedBy: "other" },
    { id: 13, status: "available" },
    { id: 14, status: "occupied", bookedBy: "other" },
    { id: 15, status: "occupied", bookedBy: "other" },
        
      { id: 16, status: "available" },  
      { id: 17, status: "available" },
      { id: 18, status: "occupied", bookedBy: "other" },
      { id: 19, status: "maintenance" },
      { id: 20, status: "occupied", bookedBy: "other" },

      { id: 21, status: "occupied", bookedBy: "other" },
      { id: 22, status: "occupied", bookedBy: "other" },
        { id: 23, status: "available" },
        { id: 24, status: "occupied", bookedBy: "other" },
        { id: 25, status: "occupied", bookedBy: "other" },
  ]);

const getStatusClass = (status) => {
    switch (status) {
      case "occupied":
        return "occupied";
      case "available":
        return "available";
      case "maintenance":
        return "maintenance";
      default:
        return "";
    }
  };

  const getContent = (status) => {
    switch (status) {
      case "occupied":
        return <img src={topview} alt="car" className="topview" />;
      case "available":
        return "✔";
      case "maintenance":
        return "⚠";
      default:
        return "";
    }
  };

          const handleBooking = () => {
        const updatedSlots = slots.map((s) =>
          s.id === selectedSlot.id
            ? { 
                ...s, 
                status: "occupied", 
                bookedBy: currentUser,
                timeIn: timeIn,
                timeOut: timeOut
              }
            : s
        );

        setSlots(updatedSlots);
        setSelectedSlot(null);
      };

//TIME BOOKING LOGIC
    const getRemainingTime = (slot) => {
      if (!slot.timeOut) return "No time set";

      const now = new Date();
      const [hours, minutes] = slot.timeOut.split(":");

      const end = new Date();
      end.setHours(hours);
      end.setMinutes(minutes);

      const diff = end - now;

      if (diff <= 0) return "Time expired";

      const mins = Math.floor(diff / 60000);
      const hrs = Math.floor(mins / 60);

      return `${hrs}h ${mins % 60}m remaining`;
    };

  return (
    <div className="parking-wrapper">
      <div className="parking-grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${getStatusClass(slot.status)}`}
       
            onClick={() => setSelectedSlot(slot)}
          >
            {getContent(slot.status)}
          </div>
        ))}
      </div>

 
     {selectedSlot && (
  <div className="modal-overlay" onClick={() => setSelectedSlot(null)}>
    
    <div className="modal" onClick={(e) => e.stopPropagation()}>

              <div className="slotnum">
        {selectedSlot.timeIn && selectedSlot.timeOut ? (
          <p>{getRemainingTime(selectedSlot)}</p>
        ) : (
          <p>Slot #{selectedSlot.id}</p>
        )}
      </div>

            {/* AVAILABLE */}
      {selectedSlot.status === "available" && (
        <>
          <p>Booking, Please select your preferred time:</p>
        
         <label> Start Time </label>
          <input 
            type="time" 
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)} 
          />
        
         <label> End Time </label>
          <input 
            type="time" 
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
          />

          <button onClick={handleBooking}>
            Confirm Booking
          </button>
        </>
      )}

      {/* OCCUPIED BY YOU */}
      {selectedSlot.status === "occupied" && selectedSlot.bookedBy === currentUser && (
        <>
          <p>You booked this slot </p>

          <button>END</button>
          <button>Extend Time</button>
          <p>Remaining Time: {getRemainingTime(selectedSlot)}</p>
        </>
      )}

      {/* OCCUPIED BY OTHERS */}
      {selectedSlot.status === "occupied" && selectedSlot.bookedBy !== currentUser && (
        <p>Slot {selectedSlot.id} is already occupied !</p>
      )}

      {/* MAINTENANCE */}
      {selectedSlot.status === "maintenance" && (
        <p>Slot {selectedSlot.id} is under maintenance !</p>
      )}

      <button onClick={() => setSelectedSlot(null)}>
        Close
      </button>

    </div>
    
  </div>
)}

    </div>
  );
}

export default ParkingSlots;