// i organized everything as whole
import { useState } from "react";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Homepage from "./pages/homepage.jsx";
import Booking from "./pages/booking.jsx";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login
             onLogin={() => setPage("home")} 
             onShowRegister={() => setPage("register")}
        />
      )}

        {page === "register" && (
         <Register onRegister={() => setPage("login")} />
      )}

      {page === "home" &&  (
      <Homepage goToBooking={() => setPage("Booking")} />
      )}
    </>
    
  );
}

export default App;