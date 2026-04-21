import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import AdminDashboard from "./admindashboard.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <div className="header-text">
          <h1>ADMIN DASHBOARD</h1>
        </div>

        <div className="header-actions">
          <button className="logout-btn" onClick={handleLogout}>
            
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <AdminDashboard />
    </div>
  );
}

export default Dashboard;