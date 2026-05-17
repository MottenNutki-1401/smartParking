<?php

require_once 'functions.php';

class ReportController {

    public function getOccupancy() {

        $pdo = getPDO();

        $sql = "CALL report_occupancy()";

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