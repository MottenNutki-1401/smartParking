import { useState, useEffect } from "react";
import "../styles/parking.css";
import topview from "../assets/topview.png";

function ParkingSlots() {
  const currentUser = "user";

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tick, setTick] = useState(0);

  const [extendHours, setExtendHours] = useState(0);
  const ratePerHour = 20; // ₱20/hr (change if u want)
  
  const [showPayment, setShowPayment] = useState(false);
  
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const [slots, setSlots] = useState([
    { id: 1, status: "available" },
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
    { id: 26, status: "available" },
    { id: 27, status: "available" },
    { id: 28, status: "available" },
    { id: 29, status: "available" },
    { id: 30, status: "available" },
    { id: 31, status: "available" },
    { id: 32, status: "available" },
  ]);

  const layout = [
    { type: "row", slots: [1, 2, 3, 4, null, 5, 6, 7, 8]},
    { type: "road" },

    { type: "row", slots: [9, 10, 11, 12, null, 13, 14, 15, 16] },
    { type: "road" },

    { type: "row", slots: [17, 18, 19, 20, null, 21, 22, 23, 24] },
    { type: "road" },

    { type: "row", slots: [25, 26, 27, 28, null, 29, 30, 31, 32]},
  ];

  useEffect(() => {
    const interval = setInterval(() => setTick((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (status) => {
    if (status === "occupied") return "occupied";
    if (status === "available") return "available";
    if (status === "maintenance") return "maintenance";
    return "";
  };

  const getContent = (status) => {
    if (status === "occupied")
      return <img src={topview} alt="car" className="topview" />;
    if (status === "available") return "Available SLot";
    if (status === "maintenance") return "Under Maintenance";
    return "";
  };

  const handleBooking = () => {
    const updated = slots.map((s) =>
      s.id === selectedSlot.id
        ? {
            ...s,
            status: "occupied",
            bookedBy: currentUser,
            timeIn,
            timeOut,
          }
        : s
    );

    setSlots(updated);
    setSelectedSlot(null);
  };

    const getRemainingSeconds = (slot) => {
      if (!slot.timeOut) return 0;

      const now = new Date();
      const [h, m] = slot.timeOut.split(":");

      const end = new Date();
      end.setHours(Number(h));
      end.setMinutes(Number(m));
      end.setSeconds(0);

      const diff = Math.floor((end - now) / 1000);
      return diff > 0 ? diff : 0;
    };

    const formatTime = (secs) => {
      const h = String(Math.floor(secs / 3600)).padStart(2, "0");
      const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      return `${h}:${m}:${s}`;
    };
    
    tick;
  
    return (
    <div className="parking-wrapper">
      <div className="parking-lot">
        {layout.map((item, index) => {
          if (item.type === "road") {
            return <div key={index} className="road"></div>;
          }

          return (
            <div key={index} className="parking-row">
              {item.slots.map((slotId, i) => {
                if (slotId === null)
                  return <div key={i} className="gap" />;

                const slot = slots.find((s) => s.id === slotId);

                return (
                  <div
                    key={slot.id}
                    className={`slot ${getStatusClass(slot.status)} ${
                      slot.bookedBy === currentUser ? "mine" : ""
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {getContent(slot.status)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>


      {/* MODAL */}
      {selectedSlot && (
        <div className="modal-overlay" onClick={() => setSelectedSlot(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="slotnum">
              {selectedSlot.timeIn && selectedSlot.timeOut
                ? getRemainingTime(selectedSlot)
                : `Slot #${selectedSlot.id}`}
            </div>

            {/* AVAILABLE */}
            {selectedSlot.status === "available" && (
              <>
                <p>Select time:</p>

                <label>Time In</label>
                <input
                  type="time"
                  value={timeIn}
                  onChange={(e) => setTimeIn(e.target.value)}
                />

                <label>Time Out</label>
                <input
                  type="time"
                  value={timeOut}
                  onChange={(e) => setTimeOut(e.target.value)}
                />

                <button onClick={handleBooking}>Confirm Booking</button>
              </>
            )}

            {/* YOUR SLOT */}
        {selectedSlot.status === "occupied" &&
 selectedSlot.bookedBy === currentUser && (() => {
  
  const seconds = getRemainingSeconds(selectedSlot);
  const display = formatTime(seconds);
  const billing = extendHours * ratePerHour;

  return (
    <>
      <div className="timer-box">{display}</div>

      <input
        type="number"
        placeholder="Extend Time (hrs)"
        value={extendHours}
        onChange={(e) => setExtendHours(Number(e.target.value))}
      />

      <input
        type="text"
        placeholder="Billing"
        value={`₱${billing}`}
        readOnly
      />

        <div className="btn-group">

                      <button onClick={() => setShowPayment(true)}>
                        EXTEND
                      </button>

                      <button
                        onClick={() => {
                          const updated = slots.map((s) =>
                            s.id === selectedSlot.id
                              ? { ...s, status: "available", bookedBy: null, timeIn: null, timeOut: null }
                              : s
                          );
                          setSlots(updated);
                          setSelectedSlot(null);
                        }}
                      >
                        END TIME
                      </button>

                    </div>
                  </>
                );
              })()}


            {/* OTHER */}
            {selectedSlot.status === "occupied" &&
              selectedSlot.bookedBy !== currentUser && (
                <p>Slot #{selectedSlot.id} is already occupied</p>
              )}


            {/* MAINTENANCE */}
            {selectedSlot.status === "maintenance" && (
              <p>Slot #{selectedSlot.id} is under maintenance </p>
            )}

            <button onClick={() => setSelectedSlot(null)}>Close</button>
          </div>
        </div>
      )}

      {/* 💸 GCASH POPUP */}
      {showPayment && (
        <div className="gcash-overlay">
          <div className="gcash-modal">
            <h2>GCash Payment</h2>
            <p>Amount: ₱{extendHours * ratePerHour}</p>

            <button className="btn"
              onClick={() => {
                const updated = slots.map((s) => {
                  if (s.id !== selectedSlot.id) return s;

                  const now = new Date();
                  const [h, m] = s.timeOut.split(":");

                  const end = new Date();
                  end.setHours(Number(h));
                  end.setMinutes(Number(m));

                  const base = end > now ? end : now;
                  base.setHours(base.getHours() + extendHours);

                  return {
                    ...s,
                    timeOut: `${String(base.getHours()).padStart(2, "0")}:${String(
                      base.getMinutes()
                    ).padStart(2, "0")}`,
                  };
                });

                setSlots(updated);
                setExtendHours(0);
                setShowPayment(false);
              }}
            >
              PAY
            </button>

            <button className="btn" onClick={() => setShowPayment(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ParkingSlots;