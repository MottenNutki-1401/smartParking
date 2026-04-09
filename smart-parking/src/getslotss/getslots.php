<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "smart_parking");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$sql = "SELECT slot_id, slot_number, status FROM parking_slots ORDER BY slot_number ASC";
$result = $conn->query($sql);

$slots = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $slots[] = $row;
    }
}

echo json_encode($slots);

$conn->close();
?>
// MOVE MEEE