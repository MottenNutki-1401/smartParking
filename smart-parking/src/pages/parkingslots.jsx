import "../styles/parking.css";

function ParkingSlots({goToBooking}) {
  // fake data just for the mockup
  const slots = [
    { id: 1, status: "occupied" },
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
  ];

const getStatusClass = (status) => {
    switch (status) {
      case "occupied":
        return "occupied";
      case "available":
        return "available";
      case "maintenance":
        return "maintenance";
      default:
        return "";
    }
  };

  const getContent = (status) => {
    switch (status) {
      case "occupied":
        return "🚗";
      case "available":
        return "✔";
      case "maintenance":
        return "⚠";
      default:
        return "";
    }
  };

  return (
    <div className="parking-wrapper">
      <div className="parking-grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${getStatusClass(slot.status)}`}
            onClick={() => {
            if (slot.status === "available" ) {
              goToBooking(slot.id);
          }
         }}
          >
            {getContent(slot.status)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingSlots;