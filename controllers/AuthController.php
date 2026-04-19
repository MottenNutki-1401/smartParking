<?php

require_once 'functions.php';

class AuthController {

    public function login() {

        // Get input
        $data = getJsonInput();

        //Validating input......
        if (empty($data['full_name']) || empty($data['password'])) {
            errorResponse("Full name and password are required", 400);
        }

        $pdo = getPDO();

        // Call stored procedure
        $sql = "CALL login_user(?)";
        $result = execQuery($sql, [$data['full_name']], $pdo);

        if (empty($result)) {
            errorResponse("User not found", 404);
        }

        $user = $result[0];

        // verifying password.....
        if (!password_verify($data['password'], $user['password_hash'])) {
            errorResponse("Invalid password", 401);
        }

       //jwt logic
       $token = generateJWT($user);

       //success response 
       echo json_encode
       ([
        "status" => "success",
        "message" => "Login successful",
        "token" => $token,
        "user" => [
            "id" =>$user ['id'],
            "name" =>$user ['full_name'],
            "role" => $user ['role']
            ]
       ]);
    }
}