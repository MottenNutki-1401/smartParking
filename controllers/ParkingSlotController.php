<?php

require_once 'functions.php';

class ParkingSlotController {

    public function index() {

        // Get database connection
        $pdo = getPDO();

        // sql procedure
        $sql = "CALL get_pslots()";

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