<?php

require_once 'functions.php';

class BookingController {

    public function createBooking() {

        // get json input
        $input = getJsonInput();

        // validate
        if (
            !isset($input['user_id']) ||
            !isset($input['parking_slot_id'])
        ) {

            errorResponse(
                "Missing fields",
                400
            );
        }

        $pdo = getPDO();

        // stored procedure
        $sql = "CALL create_booking(?, ?)";

        $params = [
            $input['user_id'],
            $input['parking_slot_id']
        ];

        execQuery($sql, $params, $pdo);

        echo json_encode([

            "status" => "success",

            "message" =>
                "Booking created successfully"
        ]);
    }
}