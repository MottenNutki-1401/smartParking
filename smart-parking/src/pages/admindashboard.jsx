import { useState, useEffect } from "react";
import "../styles/admin.css";
import topview from "../assets/topview2.png";
import RevenueReport from "../assets/components/revenuereport";
import vector from "../assets/vector.svg";

function AdminDashboard() {
  const [savedSlots, setSavedSlots] = useState([]);

  
  const [slots, setSlots] = useState([
    { id: 1, status: "available" },
    { id: 2, status: "occupied" },
    { id: 3, status: "available" },
    { id: 4, status: "occupied" },
    { id: 5, status: "occupied" },
    { id: 6, status: "available" },
    { id: 7, status: "available" },
    { id: 8, status: "occupied" },
    { id: 9, status: "occupied" },
    { id: 10, status: "available" },
    { id: 11, status: "occupied" },
    { id: 12, status: "occupied" },
    { id: 13, status: "available" },
    { id: 14, status: "occupied" },
    { id: 15, status: "occupied" },
    { id: 16, status: "available" },
    { id: 17, status: "available" },
    { id: 18, status: "occupied" },
    { id: 19, status: "maintenance" },
    { id: 20, status: "occupied" },
    { id: 21, status: "occupied" },
    { id: 22, status: "occupied" },
    { id: 23, status: "available" },
    { id: 24, status: "occupied" },
    { id: 25, status: "occupied" },
    { id: 26, status: "available" },
    { id: 27, status: "available" },
    { id: 28, status: "available" },
    { id: 29, status: "available" },
    { id: 30, status: "available" },
    { id: 31, status: "available" },
    { id: 32, status: "available" },
  ]);

  const layout = [
    { type: "row", slots: [1, 2, 3, 4, null, 5, 6, 7, 8] },
    { type: "road" },
    { type: "row", slots: [9, 10, 11, 12, null, 13, 14, 15, 16] },
    { type: "road" },
    { type: "row", slots: [17, 18, 19, 20, null, 21, 22, 23, 24] },
    { type: "road" },
    { type: "row", slots: [25, 26, 27, 28, null, 29, 30, 31, 32] },
  ];

  
  useEffect(() => {
    const stored = localStorage.getItem("slots");
    if (stored) setSlots(JSON.parse(stored));
  }, []);

  const saveChanges = () => {
    setSavedSlots(slots);
    localStorage.setItem("slots", JSON.stringify(slots));
    alert("Changes saved!");
  };

  const updateStatus = (id, newStatus) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
  };

  return (
    <div className="parking-wrapper">

  <img src={vector} className="vector" alt="yellow" /> 

      <RevenueReport />

      <div className="parking-lot">
        {layout.map((item, i) => {
          if (item.type === "road") {
            return <div key={i} className="road" />;
          }

          return (
            <div key={i} className="parking-row">
              {item.slots.map((id, j) => {
                if (!id) return <div key={j} className="gap" />;

                const slot = slots.find((s) => s.id === id);

                return (
                  <div key={slot.id} className={`slot ${slot.status}`}>
                    {slot.status === "occupied" ? (
                      <img src={topview} className="topview2" />
                    ) : (
                      <h3>{slot.status}</h3>
                    )}

                    <div className="admin-btns">
                      <button onClick={() => updateStatus(slot.id, "available")}>
                        Available
                      </button>

                      <button onClick={() => updateStatus(slot.id, "occupied")}>
                        Occupied
                      </button>

                      <button onClick={() => updateStatus(slot.id, "maintenance")}>
                        Maintenance
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;