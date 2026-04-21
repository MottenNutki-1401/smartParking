import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";

import Header from "../assets/components/header.jsx";
import ParkingSlots from "./parkingslots.jsx";



function Homepage() {
  const navigate = useNavigate();

   //🔐 AUTH CHECK (your Home logic)
  useEffect(() => {
   const isAuth = localStorage.getItem("auth");

    if (!isAuth) {
      navigate("/");
    }
  }, [navigate]); 
   

  // 🚪 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="homepage-container">
      <Header />

      <div className="main-content">
        <ParkingSlots />

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
