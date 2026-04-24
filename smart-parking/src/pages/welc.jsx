import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>Welcome to Smart Parking</h1>
      <p>Find and reserve your parking slot easily and fast.</p>

      <button onClick={() => navigate("/home")}>
        Book a Slot
      </button>
    </div>
  );
}

export default WelcomePage;