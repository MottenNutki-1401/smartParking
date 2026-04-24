<?php

require_once 'functions.php';

class UserController {
    //get endpoint /user/profile

    public function getProfile() {

    if (!isset ($_SESSION ['user_id'])) {
      errorResponse ("Unauthorized User", 401);
    } 
    
    $pdo = getPDO ();

    //CALL PROCEDURE
    $sql = "CALL get_user_by_id(?)";
    $params = [$_SESSION ['user_id']];

    $data = execQuery($sql, $params, $pdo);

    if (empty($data)) {
        errorResponse ("user not found", 404);
    }

    echo json_encode([
        "status" => "success",
        "data" => $data[0]
    ]);

    }

    //update profile put endpoint /user/profile

    public function updateProfile () {
         if (!isset($_SESSION['user_id'])) {
            errorResponse("Unauthorized", 401);
        }
        $input = getJsonInput();

        //update....
        $name = $input ['full_name'] ?? null ;
         $password = $input['password'] ?? null;

        // validation
        if ($name === null && $password === null) {
            errorResponse("Nothing to update", 400);
        }

        //  hash password if provided
        if ($password !== null) {
            $password = password_hash($password, PASSWORD_DEFAULT);
        }

        $pdo = getPDO();

        $sql = "CALL update_user_profile(?, ?, ?)";
        $params = [
            $_SESSION['user_id'],
            $name,
            $password
        ];

        execQuery($sql, $params, $pdo);

        echo json_encode([
            "status" => "success",
            "message" => "Profile updated"
        ]);
    }
    }
