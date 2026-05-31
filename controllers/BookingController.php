<?php

require_once 'functions.php';

class BookingController {

    public function createBooking() {

        // get json input
        $input = getJsonInput();

        // validate
       if (
            !isset($input['user_id']) ||
            !isset($input['parking_slot_id']) ||
            !isset($input['start_datetime']) ||
            !isset($input['end_datetime']) ||
            !isset($input['total_amount'])
        )
        {

            errorResponse(
                "Missing fields",
                400
            );
        }

        $pdo = getPDO();

        // stored procedure
        $sql = "CALL create_booking(?, ?, ?, ?, ?)";

           $params = [

            $input['user_id'],

            $input['parking_slot_id'],

            $input['start_datetime'],

            $input['end_datetime'],

            $input['total_amount']
        ];

                    $result =
                        execQuery(
                            $sql,
                            $params,
                            $pdo
                        );

            $booking_id =
                $result[0]['booking_id'];

            $ratePerHour = 35;

            $hoursUsed =
                ceil(
                    $input['total_amount']
                    /
                    $ratePerHour
                );

            $rateEncrypted =
                encryptData(
                    $ratePerHour
                );

            $hoursEncrypted =
                encryptData(
                    $hoursUsed
                );

            $totalEncrypted =
                encryptData(
                    $input['total_amount']
                );

            $sqlBilling =
                "CALL create_billing(
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )";

            $paramsBilling = [

                $booking_id,

                $rateEncrypted['data'],
                $rateEncrypted['iv'],
                $rateEncrypted['tag'],

                $hoursEncrypted['data'],
                $hoursEncrypted['iv'],
                $hoursEncrypted['tag'],

                $totalEncrypted['data'],
                $totalEncrypted['iv'],
                $totalEncrypted['tag']
            ];

            execQuery(
                $sqlBilling,
                $paramsBilling,
                $pdo
            );

            echo json_encode([

                "status" => "success",

                "message" =>
                    "Booking created successfully"
            ]);
    }
}