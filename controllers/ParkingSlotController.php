<?php

require_once 'functions.php';

class ParkingSlotController {

    public function index() {

    // Get database connection
    $pdo = getPDO();

     //Expire old bookings first
    execQuery(
      "CALL expire_bookings()",
       [],
        $pdo
    );

    // Then load parking slots
    $sql = "CALL get_pslots()";

    $params = [];

    $data = execQuery(
        $sql,
        $params,
        $pdo
    );

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
}
}