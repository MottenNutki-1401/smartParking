import "../../styles/header.css";
import { useState } from "react";
import ProfileModal from "../../pages/profile";
import AdminLoginModal from "../../pages/adminmodal.jsx";

function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="header">
        <div className="header-text">
          <h1>BOOKING SLOTS</h1>
        </div>
        <div className="header-actions">

          <button className="sidebar-button" onClick={() => setShowProfile(true)}>☰</button>
          <button className="admin-button" onClick={() => setShowAdmin(true)}>A</button>
         
        </div>
      </div>
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <AdminLoginModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
}

export default Header;