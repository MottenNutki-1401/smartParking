<?php

require_once 'functions.php';

class ParkingSlotController {

    public function index() {

        // Get database connection
        $pdo = getPDO();

        // SQL query
        $sql = "SELECT * FROM parking_slots";

        // No parameters needed
        $params = [];

        // Execute query
        $data = execQuery($sql, $params, $pdo);

        // Return JSON response
        echo json_encode([
            "status" => "success",
            "data" => $data
        ]);
    }
}