<?php

require_once 'functions.php';

class AdminController {

//GET PSLOTS
    public function getParkingSlots() {

        $pdo = getPDO();

        $sql = "CALL admin_get_parking_slots()";

        $data = execQuery(
            $sql,
            [],
            $pdo
        );

        echo json_encode([

            "status" => "success",

            "data" => $data
        ]);
    }


    //GET BOOKINS
    public function getBookings() {

    $pdo = getPDO();

    $sql = "CALL admin_get_bookings()";

    $data = execQuery(
        $sql,
        [],
        $pdo
    );

    echo json_encode([

        "status" => "success",

        "data" => $data
     ]);
    }

    //REV
    public function getRevenue() {

    $pdo = getPDO();

    $sql = "CALL report_revenue()";

    $data = execQuery(
        $sql,
        [],
        $pdo
    );

    echo json_encode([

        "status" => "success",

        "data" => $data
        ]);
    }


}
