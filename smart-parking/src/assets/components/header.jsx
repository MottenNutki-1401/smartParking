import "../../styles/header.css";

function Header({ toggleSidebar }) {
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
export default Header;