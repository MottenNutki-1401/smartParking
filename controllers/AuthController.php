<?php

require_once 'functions.php';

class AuthController {

    public function login() {

        // Get input
        $data = getJsonInput();

        //Validating input......
        if (empty($data['username']) || empty($data['password'])) {
            errorResponse("username and password are required", 400);
        }

        $pdo = getPDO();

        // Call stored procedure
        $sql = "CALL login_user(?)";
        $result = execQuery($sql, [$data['username']], $pdo);

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

    // REGISTER USER
    public function register() {

        // get input
        $data = getJsonInput();

        // validation
        if (
            empty($data['full_name'])
            ||
            empty($data['username'])
            ||
            empty($data['password'])
        ) {

            errorResponse(
                "Full name, username, and password are required",
                400
            );
        }

        $pdo = getPDO();

        // hash password
        $hashedPassword = password_hash(

            $data['password'],

            PASSWORD_DEFAULT
        );

        // default role
        $role = "user";

        // procedure
        $sql = "CALL create_user(?, ?, ?, ?)";

        $params = [

            $data['full_name'],

            $data['username'],

            $hashedPassword,

            $role
        ];

        execQuery(
            $sql,
            $params,
            $pdo
        );

        // success response
        echo json_encode([

            "status" => "success",

            "message" =>
                "User registered successfully"
            ]);
        }
}