import "../../styles/header.css";
import { useState } from "react";
import ProfileModal from "../../pages/profile";

function Header({ toggleSidebar }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header-text">
          <h1>BOOKING SLOTS</h1>

         
              <button
                className="sidebar-btn"
                onClick={() => setShowProfile(true)} > </button>
            </div>
          </div>

      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}

export default Header;