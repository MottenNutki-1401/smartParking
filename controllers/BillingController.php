<?php

require_once 'functions.php';

class BillingController {
    public function createBilling() {

        $input = getJsonInput();

        // validation
        if (
            !isset($input['booking_id']) ||
            !isset($input['rate_per_hour']) ||
            !isset($input['hours_used'])
        ) {

            errorResponse(
                "Missing fields",
                400
            );
        }

        $amount_total =
            $input['rate_per_hour']
            *
            $input['hours_used'];


        //encrypt fiels
        $rateEncrypted =
            encryptData(
                $input['rate_per_hour']
            );

        $hoursEncrypted =
            encryptData(
                $input['hours_used']
            );

        $amountEncrypted =
            encryptData(
                $amount_total
            );

        $pdo = getPDO();

        $sql = "CALL create_billing(
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )";

        $params = [

            // booking
            $input['booking_id'],

            // rate
            $rateEncrypted['data'],
            $rateEncrypted['iv'],
            $rateEncrypted['tag'],

            // hours
            $hoursEncrypted['data'],
            $hoursEncrypted['iv'],
            $hoursEncrypted['tag'],

            // total
            $amountEncrypted['data'],
            $amountEncrypted['iv'],
            $amountEncrypted['tag']
        ];

        execQuery(
            $sql,
            $params,
            $pdo
        );

        echo json_encode([

            "status" => "success",

            "message" =>
                "Billing created securely"
        ]);
    }


    public function getBilling($booking_id) {

        $pdo = getPDO();

        $sql =
            "CALL get_billing_by_booking(?)";

        $params = [$booking_id];

        $data = execQuery(
            $sql,
            $params,
            $pdo
        );


        // no billing found
        if (empty($data)) {

            errorResponse(
                "Billing not found",
                404
            );
        }


        //decrypt
        $billing = $data[0];

        $billing['rate_per_hour'] =
            decryptData(

                $billing['rate_per_hour'],

                $billing['rate_per_hour_iv'],

                $billing['rate_per_hour_tag']
            );

        $billing['hours_used'] =
            decryptData(

                $billing['hours_used'],

                $billing['hours_used_iv'],

                $billing['hours_used_tag']
            );

        $billing['amount_total'] =
            decryptData(

                $billing['amount_total'],

                $billing['amount_total_iv'],

                $billing['amount_total_tag']
            );



        echo json_encode([

            "status" => "success",

            "data" => $billing
        ]);
    }
}