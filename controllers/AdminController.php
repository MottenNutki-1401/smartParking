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
//update slots
public function updateParkingSlotStatus($slotId) {

    $input = getJsonInput();

    if (!isset($input['status'])) {

        errorResponse(
            "Status required",
            400
        );
    }

    $pdo = getPDO();

    $sql =
        "CALL update_parking_slot_status(?, ?)";

    $params = [

        $slotId,

        $input['status']
    ];

    execQuery(
        $sql,
        $params,
        $pdo
    );

    echo json_encode([

        "status" => "success",

        "message" => "Slot updated"
    ]);
}

}
