import "../../styles/header.css";

function Header({ toggleSidebar }) {
  return (
    <div className="header">
  

      <div className="header-text">
      <h1>Smart Parking</h1>
      <p>test meow hi hello</p>
      
      <button className="sidebar-btn" onClick={toggleSidebar}>
       Open meow!
      </button>
    </div>
    </div>
  );
}
export default Header;